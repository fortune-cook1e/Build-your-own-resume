import { JwtGuard } from '@/auth/guards/jwt.guard';
import { OssService } from '@/oss/oss.service';
import { UseUser } from '@/user/decorators/user.decorator';
import {
  Controller,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import * as sharp from 'sharp';

@Controller('oss')
@ApiTags('oss')
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Post('upload')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UseUser('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new InternalServerErrorException('no file');
    if (!userId) throw new InternalServerErrorException('no userId');

    const isImg = file.mimetype.startsWith('image/');
    let buffer: Buffer = file.buffer;
    if (isImg) {
      buffer = await sharp(file.buffer)
        .resize({
          width: 600,
          height: 600,
          fit: sharp.fit.outside,
        })
        .png({ quality: 80 })
        .toBuffer();
    }

    return this.ossService.uploadBuffer(userId, buffer);
  }
}
