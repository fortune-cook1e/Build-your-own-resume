import { OssController } from '@/oss/oss.controller';
import { OssService } from '@/oss/oss.service';
import { QiniuService } from '@/oss/qiniu.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [QiniuService, OssService],
  exports: [QiniuService, OssService],
  controllers: [OssController],
})
export class OssModule {}
