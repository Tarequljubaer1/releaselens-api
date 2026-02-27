import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateProjectDto): import("@prisma/client").Prisma.Prisma__ProjectClient<{
        name: string;
        repoUrl: string | null;
        defaultBranch: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    list(): import("@prisma/client").Prisma.PrismaPromise<({
        pipelineRuns: ({
            result: {
                id: string;
                level: import("@prisma/client").$Enums.QualityLevel;
                pipelineRunId: string;
                score: number;
                readiness: import("@prisma/client").$Enums.ReleaseReadiness;
                reasons: import("@prisma/client/runtime/library").JsonValue;
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
        })[];
    } & {
        name: string;
        repoUrl: string | null;
        defaultBranch: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
