import { Config } from '@/server/config/schema';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as qiniu from 'qiniu';

@Injectable()
export class QiniuService {
  private bucket: string;
  private accessKey: string;
  private secretKey: string;
  // private zone: string;
  private domain: string;

  constructor(private readonly configService: ConfigService<Config>) {
    this.bucket = this.configService.getOrThrow('QINIU_BUCKET');
    this.accessKey = this.configService.getOrThrow('QINIU_ACCESS_KEY');
    this.secretKey = this.configService.getOrThrow('QINIU_SECRET_KEY');
    // this.zone = this.configService.getOrThrow('QINIU_ZONE');
    this.domain = this.configService.getOrThrow('QINIU_DOMAIN');
  }

  getOptions() {
    return {
      bucket: this.bucket,
      accessKey: this.accessKey,
      secretKey: this.secretKey,
      // zone: this.zone,
    };
  }

  initQiniu() {}

  mac() {
    return new qiniu.auth.digest.Mac(this.accessKey, this.secretKey);
  }

  cdnManager() {
    return new qiniu.cdn.CdnManager(this.mac());
  }

  putPolicy(options: qiniu.rs.PutPolicyOptions) {
    return new qiniu.rs.PutPolicy(options);
  }

  config(config?: qiniu.conf.ConfigOptions) {
    return new qiniu.conf.Config(config);
  }

  getDomain() {
    return this.domain;
  }

  formUploader(config?: qiniu.conf.ConfigOptions) {
    return new qiniu.form_up.FormUploader({
      ...this.config(),
      ...config,
    });
  }

  bucketManager(config?: qiniu.conf.ConfigOptions) {
    return new qiniu.rs.BucketManager(this.mac(), {
      ...this.config(),
      config,
    });
  }

  putExtra() {
    return new qiniu.form_up.PutExtra();
  }

  operationManager(config?: qiniu.conf.ConfigOptions) {
    return new qiniu.fop.OperationManager(this.mac(), {
      ...this.config(),
      config,
    });
  }

  getUploadToken(options?: qiniu.rs.PutPolicyOptions): string {
    return this.putPolicy({
      scope: this.bucket,
      expires: 60,
      ...options,
    }).uploadToken(this.mac());
  }

  /**
   * get public bucket download url
   * @param key
   */
  getPublicDownloadUrl(key: string): string {
    return this.bucketManager().publicDownloadUrl(this.getDomain(), key);
  }

  // get private bucket download url
  getPrivateDownloadUrl(key: string, expires: number): string {
    return this.bucketManager().privateDownloadUrl(
      this.getDomain(),
      key,
      expires,
    );
  }
}
