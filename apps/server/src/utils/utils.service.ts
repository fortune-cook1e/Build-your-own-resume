import { Injectable, Logger } from '@nestjs/common';
import { REDIS_DEFAULT_TTL } from '../constants';
import Redis from 'ioredis';
import { RedisService } from '@songkeys/nestjs-redis';
import { ConfigService } from '@nestjs/config';
import { Config } from '@/config/schema';

@Injectable()
export class UtilsService {
  public readonly redis: Redis;
  logger = new Logger(UtilsService.name);

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.redis = this.redisService.getClient(
      this.configService.getOrThrow('REDIS_NAMESPACE'),
    );
  }

  async getCacheOrSet<T>(
    key: string,
    callback: () => Promise<T> | T,
    ttl: number = REDIS_DEFAULT_TTL,
    type: 'json' | 'string' = 'json',
  ): Promise<T> {
    const start = performance.now();

    const cachedValue = await this.redis.get(key);
    const duration = Number(performance.now() - start).toFixed(0);

    if (!cachedValue) {
      this.logger.debug(`Cache miss for ${key} (${duration}ms)`);
    } else {
      this.logger.debug(`Cache hit for ${key} (${duration}ms)`);
    }

    const isString = type === 'string';

    if (cachedValue) {
      return isString ? cachedValue : JSON.parse(cachedValue);
    }

    const value = await callback();
    const valueToCache = (
      type === 'string' ? value : JSON.stringify(value)
    ) as string;

    // Tip: PX: milliseconds EX:seconds
    await this.redis.set(key, valueToCache, 'PX', ttl);

    return value;
  }
}
