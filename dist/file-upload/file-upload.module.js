"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadModule = void 0;
const common_1 = require("@nestjs/common");
const file_upload_service_1 = require("./file-upload.service");
const file_upload_controller_1 = require("./file-upload.controller");
const translation_service_1 = require("./translation.service");
const nestjs_s3_1 = require("nestjs-s3");
const config_1 = require("./config");
let FileUploadModule = class FileUploadModule {
};
FileUploadModule = __decorate([
    common_1.Module({
        imports: [
            nestjs_s3_1.S3Module.forRoot({
                config: {
                    accessKeyId: config_1.config.MINIO_ACCESSKEY,
                    secretAccessKey: config_1.config.MINIO_SECRETKEY,
                    endpoint: 'http://127.0.0.1:9000',
                    s3ForcePathStyle: true,
                    signatureVersion: 'v4',
                },
            }),
        ],
        providers: [file_upload_service_1.FileUploadService, translation_service_1.Translation],
        controllers: [file_upload_controller_1.FileUploadController]
    })
], FileUploadModule);
exports.FileUploadModule = FileUploadModule;
//# sourceMappingURL=file-upload.module.js.map