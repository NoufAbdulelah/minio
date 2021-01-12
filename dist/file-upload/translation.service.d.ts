import { I18nService } from "nestjs-i18n";
export declare class Translation {
    private readonly i18n;
    constructor(i18n: I18nService);
    translation(lang: string, message: string): Promise<any>;
}
