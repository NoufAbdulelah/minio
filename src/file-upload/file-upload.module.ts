import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { Translation } from './translation.service';
import { S3Module } from 'nestjs-s3';
import { config } from './config';

@Module({
  imports: [

    S3Module.forRoot({
      config: {
          accessKeyId: config.MINIO_ACCESSKEY,
          secretAccessKey: config.MINIO_SECRETKEY,
          endpoint: 'http://127.0.0.1:9000',
          s3ForcePathStyle: true,
          signatureVersion: 'v4',
      },
  }),


  ],
  providers: [FileUploadService,Translation],
  controllers: [FileUploadController]
})
export class FileUploadModule {}