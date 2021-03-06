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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translation = void 0;
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
let Translation = class Translation {
    constructor(i18n) {
        this.i18n = i18n;
    }
    async translation(lang, message) {
        const translation = await this.i18n.translate(message, {
            lang: lang
        });
        return translation;
    }
};
Translation = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nService])
], Translation);
exports.Translation = Translation;
//# sourceMappingURL=translation.service.js.map