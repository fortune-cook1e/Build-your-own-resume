import { Config } from '@/config/schema';
import { QiniuService } from '@/oss/qiniu.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { callback } from 'qiniu';
import * as sharp from 'sharp';

@Injectable()
export class OssService {
  private readonly logger = new Logger(OssService.name);

  constructor(
    private readonly config: ConfigService<Config>,
    private readonly qiniu: QiniuService,
  ) {}

  async uploadImage(
    userId: string,
    file: Express.Multer.File,
    folder: string = 'default',
    name?: string,
    callback?: () => callback,
  ) {
    const buffer = await sharp(file.buffer)
      .resize({
        width: 600,
        height: 600,
        fit: sharp.fit.outside,
      })
      .png({ quality: 80 })
      .toBuffer();

    const uploadToken = this.qiniu.getUploadToken();
    const formUploader = this.qiniu.formUploader();
    const _callback = callback
      ? callback
      : () =>
          this.logger.log(`file ${file.originalname} uploaded successfully`);

    const _folder =
      process.env.NODE_ENV === 'development' ? 'test' : `${userId}/${folder}`;

    const ossUrl = this.qiniu.getDomain();
    const filePath = `${_folder}/${name || file.originalname}`;
    const fileUrl = `${ossUrl}/${filePath}`;

    await formUploader.put(uploadToken, filePath, buffer, null, _callback);

    return fileUrl;
  }
}
