import { Config } from '@/server/config/schema';
import { DatabaseHealthIndicator } from '@/server/health/database.health';
import { UtilsService } from '@/server/utils/utils.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly database: DatabaseHealthIndicator,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly utils: UtilsService,
    private readonly config: ConfigService<Config>,
  ) {}

  private run() {
    return this.health.check([
      // Todo: check redis health
      () => this.database.checkHealth(),
    ]);
  }

  @Get()
  @HealthCheck()
  async check() {
    return this.run();
  }
}
