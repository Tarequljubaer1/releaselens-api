"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoringService = void 0;
const common_1 = require("@nestjs/common");
let ScoringService = class ScoringService {
    MODEL_VERSION = '1.0.0';
    WEIGHTS = {
        build: 15,
        unit: 25,
        coverage: 20,
        e2e: 25,
        sonar: 15,
    };
    score(input) {
        const reasons = [];
        const breakdown = {
            build: 0,
            unit: 0,
            coverage: 0,
            e2e: 0,
            sonar: 0,
        };
        if (input.buildPassed === false || input.lintPassed === false) {
            reasons.push({
                code: 'BUILD_FAILED',
                message: 'Build or lint failed.',
                category: 'build',
                severity: 'critical',
            });
            breakdown.build = 0;
        }
        else if (input.buildPassed === true && input.lintPassed === true) {
            breakdown.build = this.WEIGHTS.build;
        }
        if (input.unitPassed === false || (input.unitFailed ?? 0) > 0) {
            reasons.push({
                code: 'UNIT_FAILED',
                message: 'Unit tests failed.',
                category: 'unit',
                severity: 'critical',
            });
            breakdown.unit = 0;
        }
        else if (input.unitPassed === true) {
            breakdown.unit = this.WEIGHTS.unit;
        }
        if ((input.unitSkipped ?? 0) > 2) {
            reasons.push({
                code: 'UNIT_SKIPS_HIGH',
                message: 'High number of skipped unit tests.',
                category: 'unit',
                severity: 'warning',
            });
            breakdown.unit -= 5;
        }
        if (!input.coveragePresent) {
            reasons.push({
                code: 'COVERAGE_MISSING',
                message: 'Coverage data missing.',
                category: 'coverage',
                severity: 'warning',
            });
        }
        else {
            const pct = input.coveragePct ?? 0;
            if (pct >= 85)
                breakdown.coverage = this.WEIGHTS.coverage;
            else if (pct >= 70)
                breakdown.coverage = 15;
            else if (pct >= 50)
                breakdown.coverage = 10;
            else {
                breakdown.coverage = 5;
                reasons.push({
                    code: 'COVERAGE_LOW',
                    message: `Low coverage (${pct}%).`,
                    category: 'coverage',
                    severity: 'warning',
                });
            }
        }
        if (input.e2ePresent) {
            if (input.e2ePassed === false) {
                reasons.push({
                    code: 'E2E_FAILED',
                    message: 'E2E tests failed.',
                    category: 'e2e',
                    severity: 'critical',
                });
            }
            else if (input.e2ePassed === true) {
                breakdown.e2e = this.WEIGHTS.e2e;
            }
        }
        else {
            reasons.push({
                code: 'E2E_MISSING',
                message: 'E2E tests missing.',
                category: 'e2e',
                severity: 'info',
            });
            breakdown.e2e = 10;
        }
        if (input.sonarPresent) {
            if (input.sonarGatePassed === true) {
                breakdown.sonar = this.WEIGHTS.sonar;
            }
            else {
                reasons.push({
                    code: 'SONAR_FAILED',
                    message: 'Sonar quality gate failed.',
                    category: 'sonar',
                    severity: 'critical',
                });
            }
        }
        else {
            reasons.push({
                code: 'SONAR_MISSING',
                message: 'Sonar results missing.',
                category: 'sonar',
                severity: 'info',
            });
            breakdown.sonar = 5;
        }
        const score = Math.max(0, Math.min(100, Object.values(breakdown).reduce((sum, val) => sum + val, 0)));
        const level = this.mapLevel(score);
        const readiness = this.computeReadiness(score, reasons);
        const explanation = this.buildExplanation(readiness, reasons, score, level);
        return {
            modelVersion: this.MODEL_VERSION,
            score,
            level,
            readiness,
            breakdown,
            reasons: this.rankReasons(reasons),
            explanation,
        };
    }
    mapLevel(score) {
        if (score <= 19)
            return 'L0';
        if (score <= 39)
            return 'L1';
        if (score <= 59)
            return 'L2';
        if (score <= 79)
            return 'L3';
        return 'L4';
    }
    computeReadiness(score, reasons) {
        const hasCritical = reasons.some(r => r.severity === 'critical');
        if (hasCritical)
            return 'not_ready';
        if (score >= 60)
            return 'ready';
        return 'risky';
    }
    rankReasons(reasons) {
        const order = { critical: 0, warning: 1, info: 2 };
        return reasons.sort((a, b) => order[a.severity] - order[b.severity]);
    }
    buildExplanation(readiness, reasons, score, level) {
        const top = reasons.slice(0, 3).map(r => r.message).join(' ');
        return `${readiness.toUpperCase()} (Score ${score}, ${level}). ${top}`;
    }
};
exports.ScoringService = ScoringService;
exports.ScoringService = ScoringService = __decorate([
    (0, common_1.Injectable)()
], ScoringService);
//# sourceMappingURL=scoring.service.js.map