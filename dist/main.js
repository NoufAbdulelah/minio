"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const sourceMapSupport = require("source-map-support");
const exceptions_filter_1 = require("./log/exceptions-filter");
const logging_Interceptor_1 = require("./log/logging.Interceptor");
sourceMapSupport.install();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalInterceptors(new logging_Interceptor_1.LoggingInterceptor());
    app.useGlobalFilters(new exceptions_filter_1.ExceptionsFilter());
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map