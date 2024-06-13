import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { CacheModule } from './cache/cache.module';
import { UtilsModule } from './utils/utils.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { MailModule } from './mail/mail.module';
import { AllExceptionsFilter } from './filters/exception.filter';
import { HealthModule } from '@/health/health.module';
import { OssController } from './oss/oss.controller';
import { OssService } from './oss/oss.service';
import { OssModule } from './oss/oss.module';
import { UserModule } from '@/user/user.module';
import { ResumeModule } from './resume/resume.module';

@Module({
  imports: [
    // core
    ConfigModule,
    CacheModule,
    UtilsModule,
    DatabaseModule,
    MailModule,
    HealthModule,
    OssModule,

    // Features
    AuthModule,
    UserModule,
    ResumeModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    OssService,
  ],
  controllers: [OssController],
})
export class AppModule {}
