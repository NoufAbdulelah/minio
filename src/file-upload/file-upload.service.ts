import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';
import { FileUploadDto } from './file-upload.dto';
import { Translation } from './translation.service';
require('dotenv').config();


@Injectable()
export class FileUploadService {
  constructor(
    @InjectS3() private readonly s3: S3,
    private readonly trans: Translation) { }


  async uploadFormData(file: any, lang: string): Promise<any> {
    var key = await new Date().getTime().toString() + "." + file.mimetype.substring(file.mimetype.lastIndexOf('/') + 1);
    const bucket = process.env.BUCKET_NAME;
    const params = await this.createParams(key,bucket, file.buffer, file.mimetype);

    const fileUrl = await this.uploadToS3(params);

    return this.getResult(fileUrl, lang, 'UPLOAD')

  } // end uploadFormData


  async uploadBase64(fileUploadDto: FileUploadDto, lang: string): Promise<any> {
    const { bucket, extension, file } = fileUploadDto;
    var body = await Buffer.from(file.replace(/^data:file\/\w+;base64,/, ""), 'base64')
    var key = await new Date().getTime().toString() + "." + extension;

    const params = await this.createParams(key,bucket, body, "base64");

    const fileUrl = await this.uploadToS3(params);

    return this.getResult(fileUrl, lang, 'UPLOAD')

  } // end uploadBase64 function


  async downloadFile(id: string, bucket: string, lang: string) {
    var params = { Bucket: bucket, Key: id };
    const fileUrl = await this.downloadFromS3(params);
    var message;

    if (fileUrl) {
      return fileUrl
    }
    else {
      message = await this.trans.translation(lang, 'sheet.messages.DOWNLOAD_FAIL');
      throw new InternalServerErrorException(message)
    }
  } // end downloadFile function

  async createParams(key: string, bucket: string, body:any, contentEncoding:string): Promise<any> {
    return {
      Key: key,
      Bucket: bucket,
      Body: body,
      ContentEncoding: contentEncoding
    };
  } // end createParams()

  uploadToS3(params) {
    return new Promise((resovle, reject) => {
      this.s3.putObject(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          const fileUrl = process.env.IMAGE_URL + params.Bucket + "/" + params.Key;
          resovle(fileUrl);
        }
      })
    })
  } // end uploadToS3

  downloadFromS3(params) {
    return new Promise((resolve, reject) => {
      this.s3.getObject(params, function (err, data) {
        if (err) {
          reject(err)
        }
        resolve(data.Body)
      })
    })
  } // end downloadFromS3

  async getResult(fileUrl: any, lang: string, type: string) {
    var message;

    if (fileUrl) {
      message = await this.trans.translation(lang, `sheet.messages.${type}_SUCCESS`);
      return { fileUrl: fileUrl, message: message }
    }
    else {
      message = await this.trans.translation(lang, `sheet.messages.${type}_FAIL`);
      throw new InternalServerErrorException(message)
    }
  } // end getResult()

}