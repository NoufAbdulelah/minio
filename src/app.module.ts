import { Module } from '@nestjs/common';
import { AcceptLanguageResolver, HeaderResolver, I18nJsonParser, I18nModule, QueryResolver } from 'nestjs-i18n';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import * as path from 'path';


@Module({
  imports: [
    I18nModule.forRootAsync({
      useFactory: () => {
        return {
          fallbackLanguage: 'en',
          parserOptions: {
            path: path.join('src/i18n'),
          },
        };
      },
      parser: I18nJsonParser,
      resolvers: [{ use: QueryResolver, options: ['lang', 'locale', 'l'] },
      new HeaderResolver(['x-custom-lang']),
        AcceptLanguageResolver,],
    }),
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
