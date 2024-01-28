import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Config } from './config/schema';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
      process.env.NODE_ENV === 'development'
        ? ['debug']
        : ['error', 'warn', 'log'],
  });

  const env = process.env.NODE_ENV;

  console.log('current NODE_ENV', { env });

  const configService = app.get(ConfigService<Config>);

  const globalApiPrefix = 'resume-api';
  app.setGlobalPrefix(globalApiPrefix);

  const documentConfig = new DocumentBuilder()
    .setTitle('Resume Generator Api')
    .build();

  app.use(cookieParser());

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  Logger.log(`🚀 Server is up and running on port ${port}`, 'Bootstrap');
}
bootstrap();
