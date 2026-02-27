import { PrismaService } from '../prisma/prisma.service';
import { ScoringService } from '../scoring/scoring.service';
import { IngestPipelineDto } from './dto';
import { Prisma } from '@prisma/client';
export declare class PipelinesService {
    private prisma;
    private scoring;
    constructor(prisma: PrismaService, scoring: ScoringService);
    ingest(dto: IngestPipelineDto): Promise<{
        message: string;
        data: {
            modelVersion: string;
            score: number;
            level: "L0" | "L1" | "L2" | "L3" | "L4";
            readiness: "ready" | "risky" | "not_ready";
            breakdown: import("../scoring/scoring.types").ScoreBreakdown;
            reasons: import("../scoring/scoring.types").Reason[];
            explanation: string;
            projectId: string;
            pipelineRunId: string;
        };
    }>;
    getRunResult(pipelineRunId: string): Promise<({
        signals: {
            buildPassed: boolean | null;
            coveragePct: number | null;
            id: string;
            createdAt: Date;
            lintPassed: boolean | null;
            unitPassed: boolean | null;
            unitTotal: number | null;
            unitFailed: number | null;
            unitSkipped: number | null;
            coveragePresent: boolean | null;
            e2ePresent: boolean | null;
            e2ePassed: boolean | null;
            e2eEnv: string | null;
            sonarPresent: boolean | null;
            sonarGatePassed: boolean | null;
            rawPayload: Prisma.JsonValue | null;
            pipelineRunId: string;
            vulnPresent: boolean | null;
            vulnGatePassed: boolean | null;
        } | null;
        project: {
            name: string;
            repoUrl: string | null;
            defaultBranch: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        result: {
            id: string;
            level: import("@prisma/client").$Enums.QualityLevel;
            pipelineRunId: string;
            score: number;
            readiness: import("@prisma/client").$Enums.ReleaseReadiness;
            reasons: Prisma.JsonValue;
            explanation: string;
            computedAt: Date;
        } | null;
    } & {
        pipelineId: string;
        commitSha: string | null;
        branch: string | null;
        id: string;
        createdAt: Date;
        projectId: string;
        ciProvider: import("@prisma/client").$Enums.CiProvider;
        status: import("@prisma/client").$Enums.PipelineStatus;
        startedAt: Date | null;
        finishedAt: Date | null;
    }) | null>;
    listProjectRuns(projectId: string, limit?: number): Promise<({
        result: {
            id: string;
            level: import("@prisma/client").$Enums.QualityLevel;
            pipelineRunId: string;
            score: number;
            readiness: import("@prisma/client").$Enums.ReleaseReadiness;
            reasons: Prisma.JsonValue;
            explanation: string;
            computedAt: Date;
        } | null;
    } & {
        pipelineId: string;
        commitSha: string | null;
        branch: string | null;
        id: string;
        createdAt: Date;
        projectId: string;
        ciProvider: import("@prisma/client").$Enums.CiProvider;
        status: import("@prisma/client").$Enums.PipelineStatus;
        startedAt: Date | null;
        finishedAt: Date | null;
    })[]>;
}
