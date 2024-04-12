import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from './mail.controller';
import { MailService } from '@/mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@/config/config.module';
import { ConfigService } from '@nestjs/config';
import { Config } from '@/config/schema';
import { Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

const emptyTransporter = nodemailer.createTransport({});

describe('MailController', () => {
  let controller: MailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [MailService],
      imports: [
        ConfigModule,
        MailerModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService<Config>) => {
            const from = configService.get('MAIL_FROM');
            const smtpUrl = configService.get('SMTP_URL');

            if (!smtpUrl) {
              Logger.warn('SMTP_URL is not set. Mailer will not work.');
            }

            return {
              defaults: { from },
              transport: smtpUrl || emptyTransporter,
            };
          },
        }),
      ],
    }).compile();

    controller = module.get<MailController>(MailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
