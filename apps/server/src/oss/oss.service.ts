import { Config } from '@/config/schema';
import { QiniuService } from '@/oss/qiniu.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createId } from '@paralleldrive/cuid2';
import { callback } from 'qiniu';

@Injectable()
export class OssService {
  private readonly logger = new Logger(OssService.name);

  constructor(
    private readonly config: ConfigService<Config>,
    private readonly qiniu: QiniuService,
  ) {}

  async uploadBuffer(
    userId: string,
    buffer: Buffer,
    folder: string = 'default',
    name: string = createId(),
    callback?: () => callback,
  ) {
    const uploadToken = this.qiniu.getUploadToken();
    const formUploader = this.qiniu.formUploader();
    const _callback = callback
      ? callback
      : () => this.logger.log(`file ${name} uploaded successfully`);

    const _folder =
      process.env.NODE_ENV === 'development' ? 'test' : `${userId}/${folder}`;

    const ossUrl = this.qiniu.getDomain();
    const filePath = `${_folder}/${encodeURIComponent(name)}`;
    const fileUrl = `${ossUrl}/${filePath}`;

    await formUploader.put(uploadToken, filePath, buffer, null, _callback);

    return fileUrl;
  }
}
