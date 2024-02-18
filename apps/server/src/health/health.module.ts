import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { DatabaseHealthIndicator } from '@/server/health/database.health';
import { HttpModule } from '@nestjs/axios';
import { RedisHealthModule } from '@songkeys/nestjs-redis-health';

@Module({
  imports: [TerminusModule, HttpModule, RedisHealthModule],
  controllers: [HealthController],
  providers: [DatabaseHealthIndicator],
})
export class HealthModule {}
