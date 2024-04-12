import { Module, Logger } from '@nestjs/common';
import {
  PrismaModule,
  providePrismaClientExceptionFilter,
  loggingMiddleware,
  PrismaService,
} from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [providePrismaClientExceptionFilter()],
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<any>) => ({
        prismaOptions: {
          datasourceUrl: configService.get('DATABASE_URL'),
          log: ['warn', 'error'],
        },
        middlewares: [
          loggingMiddleware({
            logLevel: 'debug', // only in development
            logger: new Logger(PrismaService.name),
            logMessage: (query) =>
              `[Query] ${query.model}.${query.action} - ${query.executionTime}ms`,
          }),
        ],
      }),
    }),
  ],
})
export class DatabaseModule {}
