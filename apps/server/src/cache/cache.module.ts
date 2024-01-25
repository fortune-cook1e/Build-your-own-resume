import { Config } from './../config/schema';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule as CacheManager } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheManager.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<Config>,
      ): Promise<any> => {
        const store = await redisStore({
          url: configService.getOrThrow('REDIS_URL'),
          ttl: configService.getOrThrow('REDIS_DEFAULT_TTL'),
        });
        return {
          store: () => store,
        };
      },
    }),
  ],
})
export class CacheModule {}
