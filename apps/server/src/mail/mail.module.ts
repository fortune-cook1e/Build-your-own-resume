import { Logger, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Config } from '../config/schema';
import { MailController } from './mail.controller';
import * as nodemailer from 'nodemailer';

const emptyTransporter = nodemailer.createTransport({});

@Module({
  imports: [
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
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
