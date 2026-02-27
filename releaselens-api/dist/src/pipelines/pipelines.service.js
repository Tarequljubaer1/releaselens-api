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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelinesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const scoring_service_1 = require("../scoring/scoring.service");
let PipelinesService = class PipelinesService {
    prisma;
    scoring;
    constructor(prisma, scoring) {
        this.prisma = prisma;
        this.scoring = scoring;
    }
    async ingest(dto) {
        const project = await this.prisma.project.upsert({
            where: { name: dto.projectName },
            update: { isActive: true },
            create: { name: dto.projectName },
        });
        const run = await this.prisma.pipelineRun.upsert({
            where: {
                ciProvider_pipelineId: {
                    ciProvider: 'github',
                    pipelineId: dto.pipelineId,
                },
            },
            update: {
                projectId: project.id,
                commitSha: dto.commitSha,
                branch: dto.branch,
                status: 'success',
                ciProvider: 'github',
            },
            create: {
                projectId: project.id,
                ciProvider: 'github',
                pipelineId: dto.pipelineId,
                commitSha: dto.commitSha,
                branch: dto.branch,
                status: 'success',
            },
        });
        await this.prisma.qualitySignal.upsert({
            where: { pipelineRunId: run.id },
            update: {
                ...dto.signals,
                rawPayload: dto.signals.rawPayload,
            },
            create: {
                pipelineRunId: run.id,
                ...dto.signals,
                rawPayload: dto.signals.rawPayload,
            },
        });
        const out = this.scoring.score({
            buildPassed: dto.signals.buildPassed,
            lintPassed: dto.signals.lintPassed,
            unitPassed: dto.signals.unitPassed,
            unitTotal: dto.signals.unitTotal,
            unitFailed: dto.signals.unitFailed,
            unitSkipped: dto.signals.unitSkipped,
            coveragePresent: dto.signals.coveragePresent,
            coveragePct: dto.signals.coveragePct,
            e2ePresent: dto.signals.e2ePresent,
            e2ePassed: dto.signals.e2ePassed,
            sonarPresent: dto.signals.sonarPresent,
            sonarGatePassed: dto.signals.sonarGatePassed,
        });
        await this.prisma.qualityResult.upsert({
            where: { pipelineRunId: run.id },
            update: {
                score: out.score,
                level: out.level,
                readiness: out.readiness,
                reasons: out.reasons,
                explanation: out.explanation,
            },
            create: {
                pipelineRunId: run.id,
                score: out.score,
                level: out.level,
                readiness: out.readiness,
                reasons: out.reasons,
                explanation: out.explanation,
            },
        });
        return {
            message: 'Pipeline ingested successfully',
            data: {
                projectId: project.id,
                pipelineRunId: run.id,
                ...out,
            },
        };
    }
    async getRunResult(pipelineRunId) {
        return this.prisma.pipelineRun.findUnique({
            where: { id: pipelineRunId },
            include: { project: true, signals: true, result: true },
        });
    }
    async listProjectRuns(projectId, limit = 20) {
        return this.prisma.pipelineRun.findMany({
            where: { projectId },
            orderBy: { createdAt: 'desc' },
            take: limit,
            include: { result: true },
        });
    }
};
exports.PipelinesService = PipelinesService;
exports.PipelinesService = PipelinesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        scoring_service_1.ScoringService])
], PipelinesService);
//# sourceMappingURL=pipelines.service.js.map