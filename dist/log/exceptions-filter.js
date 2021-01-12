"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
let ExceptionsFilter = class ExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const start = Date.now();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = typeof exception.message === 'string'
            ? exception.message
            : exception.message.message;
        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            time: Date.now() - start + ' ms',
            url: request.url,
            message: message,
        };
        common_1.Logger.error(`method: ${request.method} | url: ${request.url} | status: ${status} | exception: ${exception.stack}`, '', 'ExceptionsFilter', true);
        response.status(status).json(errorResponse);
    }
};
ExceptionsFilter = __decorate([
    common_1.Catch()
], ExceptionsFilter);
exports.ExceptionsFilter = ExceptionsFilter;
//# sourceMappingURL=exceptions-filter.js.map