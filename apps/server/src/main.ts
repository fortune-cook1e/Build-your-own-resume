import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Config } from './config/schema';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
      process.env.NODE_ENV === 'development'
        ? ['debug']
        : ['error', 'warn', 'log'],
  });

  const configService = app.get(ConfigService<Config>);

  const globalApiPrefix = 'resume-api';
  app.setGlobalPrefix(globalApiPrefix);

  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);

  Logger.log(`🚀 Server is up and running on port ${port}`, 'Bootstrap');
}
bootstrap();
