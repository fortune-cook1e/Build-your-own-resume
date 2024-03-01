import { Config } from '@/config/schema';
import { QiniuService } from '@/oss/qiniu.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { callback } from 'qiniu';

@Injectable()
export class OssService {
  private readonly logger = new Logger(OssService.name);

  constructor(
    private readonly config: ConfigService<Config>,
    private readonly qiniu: QiniuService,
  ) {}

  async uploadImage(
    file: Express.Multer.File,
    name?: string,
    callback?: () => callback,
  ) {
    const uploadToken = this.qiniu.getUploadToken();
    const formUploader = this.qiniu.formUploader();
    const _callback = callback
      ? callback
      : () => this.logger.log(`file ${file.filename} uploaded successfully`);
    await formUploader.put(
      uploadToken,
      name || file.filename,
      file.buffer,
      null,
      _callback,
    );
    return uploadToken;
  }
}
