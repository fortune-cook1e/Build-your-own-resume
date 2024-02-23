import { Config } from '@/server/config/schema';
import { QiniuService } from '@/server/oss/qiniu.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OssService {
  private readonly logger = new Logger(OssService.name);

  constructor(
    private readonly config: ConfigService<Config>,
    private readonly qiniu: QiniuService,
  ) {}

  async uploadImage(file: Express.Multer.File) {
    const uploadToken = this.qiniu.getUploadToken();
    const formUploader = this.qiniu.formUploader();
    await formUploader.put(uploadToken, 'alibaba', file.buffer, null, () =>
      this.logger.log(`file ${file.filename} uploaded successfully`),
    );
    return uploadToken;
  }
}
