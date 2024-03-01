import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import {
  RedisHealthIndicator,
  RedisHealthModule,
} from '@songkeys/nestjs-redis-health';
import { DatabaseHealthIndicator } from '@/health/database.health';
import { DatabaseModule } from '@/database/database.module';

import { ConfigModule } from '@/config/config.module';
import { CacheModule } from '@/cache/cache.module';
describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      imports: [
        TerminusModule,
        HttpModule,
        RedisHealthModule,
        ConfigModule,
        DatabaseModule,
        CacheModule,
      ],
      providers: [DatabaseHealthIndicator, RedisHealthIndicator],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
