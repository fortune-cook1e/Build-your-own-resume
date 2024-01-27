import { Module, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  providePrismaClientExceptionFilter,
  PrismaModule,
  loggingMiddleware,
  PrismaService,
} from 'nestjs-prisma';
import { Config } from '../config/schema';

@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Config>) => ({
        prismaOptions: {
          datasourceUrl: configService.get('DATABASE_URL'),
        },
        middlewares: [
          loggingMiddleware({
            logLevel: 'debug',
            logger: new Logger(PrismaService.name),
            logMessage: (query) =>
              `[Query] ${query.model}.${query.action} - ${query.executionTime}ms`,
          }),
        ],
      }),
    }),
  ],
  providers: [providePrismaClientExceptionFilter()],
})
export class DatabaseModule {}
