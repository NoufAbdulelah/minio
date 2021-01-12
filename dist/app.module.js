"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const file_upload_module_1 = require("./file-upload/file-upload.module");
const path = require("path");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            nestjs_i18n_1.I18nModule.forRootAsync({
                useFactory: () => {
                    return {
                        fallbackLanguage: 'en',
                        parserOptions: {
                            path: path.join('src/i18n'),
                        },
                    };
                },
                parser: nestjs_i18n_1.I18nJsonParser,
                resolvers: [{ use: nestjs_i18n_1.QueryResolver, options: ['lang', 'locale', 'l'] },
                    new nestjs_i18n_1.HeaderResolver(['x-custom-lang']),
                    nestjs_i18n_1.AcceptLanguageResolver,],
            }),
            file_upload_module_1.FileUploadModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map