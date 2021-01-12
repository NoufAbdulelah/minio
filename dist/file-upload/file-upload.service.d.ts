import { S3 } from 'nestjs-s3';
import { FileUploadDto } from './file-upload.dto';
import { Translation } from './translation.service';
export declare class FileUploadService {
    private readonly s3;
    private readonly trans;
    constructor(s3: S3, trans: Translation);
    uploadFormData(file: any, lang: string): Promise<any>;
    uploadBase64(fileUploadDto: FileUploadDto, lang: string): Promise<any>;
    downloadFile(id: string, bucket: string, lang: string): Promise<unknown>;
    createParams(key: string, bucket: string, body: any, contentEncoding: string): Promise<any>;
    uploadToS3(params: any): Promise<unknown>;
    downloadFromS3(params: any): Promise<unknown>;
    getResult(fileUrl: any, lang: string, type: string): Promise<{
        fileUrl: any;
        message: any;
    }>;
}
