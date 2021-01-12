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
exports.FileUploadController = void 0;
const common_1 = require("@nestjs/common");
const file_upload_service_1 = require("./file-upload.service");
const file_upload_dto_1 = require("./file-upload.dto");
const file_interceptor_1 = require("@nestjs/platform-express/multer/interceptors/file.interceptor");
const nestjs_i18n_1 = require("nestjs-i18n");
let FileUploadController = class FileUploadController {
    constructor(fileUploadService) {
        this.fileUploadService = fileUploadService;
    }
    async uploadFormData(file, lang) {
        return await this.fileUploadService.uploadFormData(file, lang);
    }
    async uploadBase64(fileUploadDto, lang) {
        return await this.fileUploadService.uploadBase64(fileUploadDto, lang);
    }
    async downloadFile(id, bucket, res, lang) {
        res.send(await this.fileUploadService.downloadFile(id, bucket, lang));
    }
};
__decorate([
    common_1.Post('form-data'),
    common_1.UseInterceptors(file_interceptor_1.FileInterceptor('file')),
    __param(0, common_1.UploadedFile()),
    __param(1, nestjs_i18n_1.I18nLang()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "uploadFormData", null);
__decorate([
    common_1.Post("base64"),
    __param(0, common_1.Body('fileUploadDto')),
    __param(1, nestjs_i18n_1.I18nLang()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_upload_dto_1.FileUploadDto, String]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "uploadBase64", null);
__decorate([
    common_1.Get('/:bucket/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Param('bucket')), __param(2, common_1.Res()), __param(3, nestjs_i18n_1.I18nLang()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, String]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "downloadFile", null);
FileUploadController = __decorate([
    common_1.Controller('file-upload'),
    __metadata("design:paramtypes", [file_upload_service_1.FileUploadService])
], FileUploadController);
exports.FileUploadController = FileUploadController;
//# sourceMappingURL=file-upload.controller.js.map