import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { CacheModule } from './cache/cache.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    // core
    ConfigModule,
    CacheModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
