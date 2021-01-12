import { Response } from 'express';
import { FileUploadService } from './file-upload.service';
import { FileUploadDto } from './file-upload.dto';
export declare class FileUploadController {
    private fileUploadService;
    constructor(fileUploadService: FileUploadService);
    uploadFormData(file: any, lang: string): Promise<any>;
    uploadBase64(fileUploadDto: FileUploadDto, lang: string): Promise<any>;
    downloadFile(id: string, bucket: string, res: Response, lang: string): Promise<void>;
}
