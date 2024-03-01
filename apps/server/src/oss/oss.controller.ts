import { OssService } from '@/oss/oss.service';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Express } from 'express';

@Controller('oss')
@ApiTags('oss')
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Post('upload/image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.ossService.uploadImage(file);
  }
}
