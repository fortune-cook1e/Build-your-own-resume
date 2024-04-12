import { JwtGuard } from '@/auth/guards/jwt.guard';
import { OssService } from '@/oss/oss.service';
import { UseUser } from '@/user/decorators/user.decorator';
import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
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
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UseUser('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.ossService.uploadImage(userId, file);
  }
}
