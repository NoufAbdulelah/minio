"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_s3_1 = require("nestjs-s3");
const translation_service_1 = require("./translation.service");
require('dotenv').config();
let FileUploadService = class FileUploadService {
    constructor(s3, trans) {
        this.s3 = s3;
        this.trans = trans;
    }
    async uploadFormData(file, lang) {
        var key = await new Date().getTime().toString() + "." + file.mimetype.substring(file.mimetype.lastIndexOf('/') + 1);
        const bucket = process.env.BUCKET_NAME;
        const params = await this.createParams(key, bucket, file.buffer, file.mimetype);
        const fileUrl = await this.uploadToS3(params);
        return this.getResult(fileUrl, lang, 'UPLOAD');
    }
    async uploadBase64(fileUploadDto, lang) {
        const { bucket, extension, file } = fileUploadDto;
        var body = await Buffer.from(file.replace(/^data:file\/\w+;base64,/, ""), 'base64');
        var key = await new Date().getTime().toString() + "." + extension;
        const params = await this.createParams(key, bucket, body, "base64");
        const fileUrl = await this.uploadToS3(params);
        return this.getResult(fileUrl, lang, 'UPLOAD');
    }
    async downloadFile(id, bucket, lang) {
        var params = { Bucket: bucket, Key: id };
        const fileUrl = await this.downloadFromS3(params);
        var message;
        if (fileUrl) {
            return fileUrl;
        }
        else {
            message = await this.trans.translation(lang, 'sheet.messages.DOWNLOAD_FAIL');
            throw new common_1.InternalServerErrorException(message);
        }
    }
    async createParams(key, bucket, body, contentEncoding) {
        return {
            Key: key,
            Bucket: bucket,
            Body: body,
            ContentEncoding: contentEncoding
        };
    }
    uploadToS3(params) {
        return new Promise((resovle, reject) => {
            this.s3.putObject(params, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    const fileUrl = process.env.IMAGE_URL + params.Bucket + "/" + params.Key;
                    resovle(fileUrl);
                }
            });
        });
    }
    downloadFromS3(params) {
        return new Promise((resolve, reject) => {
            this.s3.getObject(params, function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data.Body);
            });
        });
    }
    async getResult(fileUrl, lang, type) {
        var message;
        if (fileUrl) {
            message = await this.trans.translation(lang, `sheet.messages.${type}_SUCCESS`);
            return { fileUrl: fileUrl, message: message };
        }
        else {
            message = await this.trans.translation(lang, `sheet.messages.${type}_FAIL`);
            throw new common_1.InternalServerErrorException(message);
        }
    }
};
FileUploadService = __decorate([
    common_1.Injectable(),
    __param(0, nestjs_s3_1.InjectS3()),
    __metadata("design:paramtypes", [Object, translation_service_1.Translation])
], FileUploadService);
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=file-upload.service.js.map