"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestTokenGuard = void 0;
const common_1 = require("@nestjs/common");
let IngestTokenGuard = class IngestTokenGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        const expectedToken = process.env.RELEASELENS_INGEST_TOKEN;
        if (!expectedToken)
            return true;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Missing Authorization header');
        }
        const providedToken = authHeader.replace('Bearer ', '').trim();
        if (providedToken !== expectedToken) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return true;
    }
};
exports.IngestTokenGuard = IngestTokenGuard;
exports.IngestTokenGuard = IngestTokenGuard = __decorate([
    (0, common_1.Injectable)()
], IngestTokenGuard);
//# sourceMappingURL=ingest-token.guard.js.map