import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, Param, Res, Req, Get, Body, HttpService, UseFilters } from '@nestjs/common';
import { Request, Response } from 'express';
import { FileUploadService } from './file-upload.service';
import { FileUploadDto } from './file-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { I18nLang } from 'nestjs-i18n';


@Controller('file-upload')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) { }


  @Post('form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFormData(
    @UploadedFile() file,
    @I18nLang() lang: string) {
    return await this.fileUploadService.uploadFormData(file, lang);
  }

  
  @Post("base64")
  async uploadBase64(@Body('fileUploadDto') fileUploadDto: FileUploadDto,
    @I18nLang() lang: string) {
    return await this.fileUploadService.uploadBase64(fileUploadDto, lang);
  }


  @Get('/:bucket/:id')
  async downloadFile(@Param('id') id: string, @Param('bucket') bucket: string, @Res() res: Response, @I18nLang() lang: string) {
    res.send(await this.fileUploadService.downloadFile(id, bucket, lang))
  }
}