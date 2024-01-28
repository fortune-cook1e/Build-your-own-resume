import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { CacheModule } from './cache/cache.module';
import { UtilsModule } from './utils/utils.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [
    // core
    ConfigModule,
    CacheModule,
    UtilsModule,
    DatabaseModule,

    // Features
    AuthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
