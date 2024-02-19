import { Config } from '@/server/config/schema';
import { DatabaseHealthIndicator } from '@/server/health/database.health';
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisHealthIndicator } from '@songkeys/nestjs-redis-health';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import { RedisService } from '@songkeys/nestjs-redis';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly database: DatabaseHealthIndicator,
    private readonly redisService: RedisService,
    private readonly redis: RedisHealthIndicator,
    private readonly config: ConfigService<Config>,
  ) {}

  private run() {
    return this.health.check([
      () => this.database.checkHealth(),
      () => {
        return this.redis.checkHealth('redis', {
          type: 'redis',
          timeout: 1000,
          client: this.redisService.getClient(
            this.config.getOrThrow('REDIS_NAMESPACE'),
          ),
        });
      },
    ]);
  }

  @Get()
  @HealthCheck()
  async check() {
    return this.run();
  }
}
