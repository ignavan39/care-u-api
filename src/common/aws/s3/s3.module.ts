import { S3 } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Service } from './s3.service';

@Module({
  imports: [S3],
  providers: [{ provide: 'S3', useClass: S3 }, S3, S3Service, ConfigService],
  exports: [S3Service],
})
export class AwsModule {}
