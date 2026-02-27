"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const prisma_module_1 = require("./prisma/prisma.module");
const projects_module_1 = require("./projects/projects.module");
const pipelines_module_1 = require("./pipelines/pipelines.module");
const scoring_module_1 = require("./scoring/scoring.module");
const auth_module_1 = require("./auth/auth.module");
const health_module_1 = require("./health/health.module");
const analytics_module_1 = require("./analytics/analytics.module");
const config_module_1 = require("./config/config.module");
const providers_module_1 = require("./providers/providers.module");
const quality_gates_module_1 = require("./quality-gates/quality-gates.module");
const actions_module_1 = require("./actions/actions.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            actions_module_1.ActionsModule,
            config_module_1.ConfigModule,
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            providers_module_1.ProvidersModule,
            projects_module_1.ProjectsModule,
            pipelines_module_1.PipelinesModule,
            scoring_module_1.ScoringModule,
            analytics_module_1.AnalyticsModule,
            quality_gates_module_1.QualityGatesModule,
            health_module_1.HealthModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map