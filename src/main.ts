import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as sourceMapSupport from 'source-map-support';
import { ExceptionsFilter } from './log/exceptions-filter';
import { LoggingInterceptor } from './log/logging.Interceptor';
sourceMapSupport.install();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new ExceptionsFilter())
  
  await app.listen(3001);
}
bootstrap();
