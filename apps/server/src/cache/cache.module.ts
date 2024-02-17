import { Config } from './../config/schema';
import { Module } from '@nestjs/common';
import { CacheModule as CacheManager } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { REDIS_DEFAULT_TTL } from '../constants';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheManager.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Config>) => ({
        store: await redisStore({
          url: configService.getOrThrow('REDIS_URL'),
          ttl: REDIS_DEFAULT_TTL,
        }),
      }),
    }),
  ],
})
export class CacheModule {}
