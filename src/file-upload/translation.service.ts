import { Injectable } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";

@Injectable()
export class Translation {

    constructor(private readonly i18n: I18nService) { }

    async translation(lang: string, message: string) {
        const translation = await this.i18n.translate(
          message,
          {
            lang: lang
          });
        return translation;
      }
    
}