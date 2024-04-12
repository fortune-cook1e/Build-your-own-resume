import { Config } from '@/config/schema';
import { REDIS_DEFAULT_TTL } from '@/constants';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from '@songkeys/nestjs-redis';

@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => ({
        config: {
          namespace: configService.getOrThrow('REDIS_NAMESPACE'),
          url: configService.getOrThrow('REDIS_URL'),
          ttl: REDIS_DEFAULT_TTL,
        },
      }),
    }),
  ],
})
export class CacheModule {}
