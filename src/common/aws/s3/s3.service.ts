import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UploadFileInterface } from './types';

import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  constructor(
    @Inject('S3') private readonly s3: S3,
    private readonly configService: ConfigService,
  ) {}

  async uploadFile(
    dataBuffer: Buffer,
    filename: string,
  ): Promise<UploadFileInterface> {
    const uploadResult = await this.s3
      .upload({
        Bucket: this.configService.get('aws.publicBucket'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    return { url: uploadResult.Location, key: uploadResult.Key };
  }

  async deleteFile(key: string) {
    await this.s3
      .deleteObject({
        Bucket: this.configService.get('aws.publicBucket'),
        Key: key,
      })
      .promise();
  }

  async downloadFile(key: string) {
    return await this.s3
      .getObject({
        Bucket: this.configService.get('aws.publicBucket'),
        Key: key,
      })
      .promise();
  }
}
