"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const util_1 = require("util");
let LoggingInterceptor = class LoggingInterceptor {
    intercept(context, next) {
        const start = Date.now();
        return next.handle().pipe(operators_1.tap((response) => {
            const ctx = context.switchToHttp();
            const request = ctx.getRequest();
            const headers = ctx.getRequest().headers;
            common_1.Logger.log(util_1.format('%s %s %s %s%dms %s', 'method: ' + request.method, '| host: ' + headers.host, '| url: ' + request.url, '| time: ', Date.now() - start, '| response: ' + JSON.stringify(response)), "LoggingInterceptor");
        }));
    }
};
LoggingInterceptor = __decorate([
    common_1.Injectable()
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=logging.Interceptor.js.map