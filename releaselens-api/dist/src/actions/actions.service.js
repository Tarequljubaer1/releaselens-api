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
exports.ActionsService = void 0;
const common_1 = require("@nestjs/common");
const projects_service_1 = require("../projects/projects.service");
let ActionsService = class ActionsService {
    projectsService;
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    async getNextBestActions(limit = 20) {
        const projects = await this.projectsService.list();
        const actions = [];
        for (const p of projects) {
            const projectId = p.id?.toString?.() ??
                p.slug ??
                p.name ??
                p.projectName ??
                'unknown-project';
            const latestRun = p.pipelineRuns?.[0];
            const result = latestRun?.result ?? {};
            const coveragePct = Number(latestRun?.signals?.coveragePct ?? result.coveragePct ?? result.coverage_pct ?? result.coverage ?? 0) || 0;
            const flakeRatePct = Number(result.flakeRatePct ?? result.flake_rate_pct ?? result.flakeRate ?? 0) || 0;
            const gates = result.gates ?? result.qualityGates ?? null;
            if (coveragePct > 0 && coveragePct < 70) {
                actions.push({
                    id: `cov-${projectId}`,
                    projectId,
                    title: `Raise coverage (current ${coveragePct}%) to meet quality gate`,
                    impact: 'High',
                    effort: 'L',
                    etaHours: 8,
                });
            }
            else if (coveragePct > 0 && coveragePct < 80) {
                actions.push({
                    id: `cov-warn-${projectId}`,
                    projectId,
                    title: `Add unit tests to reach coverage threshold (current ${coveragePct}%)`,
                    impact: 'Medium',
                    effort: 'M',
                    etaHours: 3,
                });
            }
            if (flakeRatePct >= 5) {
                actions.push({
                    id: `flake-${projectId}`,
                    projectId,
                    title: `Stabilize flaky tests (quarantine + retry policy + root-cause fixes)`,
                    impact: 'High',
                    effort: 'M',
                    etaHours: 4,
                });
            }
            const contractStatus = gates?.contract?.status ?? gates?.contract ?? gates?.CONTRACT ?? null;
            if (contractStatus === 'skip' || contractStatus === 'missing') {
                actions.push({
                    id: `contract-${projectId}`,
                    projectId,
                    title: `Add contract tests for critical endpoints (prevent breaking changes)`,
                    impact: 'Medium',
                    effort: 'M',
                    etaHours: 5,
                });
            }
            if (!latestRun?.result) {
                actions.push({
                    id: `onboard-${projectId}`,
                    projectId,
                    title: `Connect CI signals (tests + coverage + artifacts) to unlock scoring`,
                    impact: 'Medium',
                    effort: 'S',
                    etaHours: 2,
                });
            }
        }
        const weight = { High: 3, Medium: 2, Low: 1 };
        actions.sort((a, b) => weight[b.impact] - weight[a.impact]);
        const seen = new Set();
        const deduped = actions.filter((a) => (seen.has(a.id) ? false : (seen.add(a.id), true)));
        return deduped.slice(0, limit);
    }
};
exports.ActionsService = ActionsService;
exports.ActionsService = ActionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ActionsService);
//# sourceMappingURL=actions.service.js.map