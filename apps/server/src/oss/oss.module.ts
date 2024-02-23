import { OssController } from '@/server/oss/oss.controller';
import { OssService } from '@/server/oss/oss.service';
import { QiniuService } from '@/server/oss/qiniu.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [QiniuService, OssService],
  exports: [QiniuService, OssService],
  controllers: [OssController],
})
export class OssModule {}
