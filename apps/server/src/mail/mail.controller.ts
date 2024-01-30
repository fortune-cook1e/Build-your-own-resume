import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { ISendMailOptions } from '@nestjs-modules/mailer';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Post('')
  @UseGuards(JwtGuard)
  async send(@Body() data: ISendMailOptions) {
    return await this.mailService.sendEmail(data);
  }
}
