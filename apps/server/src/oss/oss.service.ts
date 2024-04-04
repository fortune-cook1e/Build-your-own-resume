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
    const uploadToken = this.qiniu.getUploadToken({
      returnBody:
        '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
    });
    const formUploader = this.qiniu.formUploader();
    const _callback = callback
      ? callback
      : () =>
          this.logger.log(`file ${file.originalname} uploaded successfully`);
    const result = await formUploader.put(
      uploadToken,
      name || file.originalname,
      file.buffer,
      null,
      _callback,
    );
    console.log({ result, uploadToken });
    return uploadToken;
  }
}
