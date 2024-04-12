import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from '../config/schema';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly mailerService: MailerService,
  ) {}

  async sendEmail(options: ISendMailOptions) {
    const smtpUrl = this.configService.get('SMTP_URL');
    if (!smtpUrl) {
      return Logger.log(options, 'MailService#sendEmail');
    }
    return await this.mailerService.sendMail(options);
  }
}
