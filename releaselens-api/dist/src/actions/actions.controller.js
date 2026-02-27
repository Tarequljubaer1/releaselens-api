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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const actions_service_1 = require("./actions.service");
let ActionsController = class ActionsController {
    actionsService;
    constructor(actionsService) {
        this.actionsService = actionsService;
    }
    async getActions(limit) {
        const n = limit ? Number(limit) : 20;
        return this.actionsService.getNextBestActions(Number.isFinite(n) ? n : 20);
    }
};
exports.ActionsController = ActionsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        example: 20,
        description: 'Max number of actions to return',
    }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActionsController.prototype, "getActions", null);
exports.ActionsController = ActionsController = __decorate([
    (0, swagger_1.ApiTags)('Actions'),
    (0, common_1.Controller)('v1/actions'),
    __metadata("design:paramtypes", [actions_service_1.ActionsService])
], ActionsController);
//# sourceMappingURL=actions.controller.js.map