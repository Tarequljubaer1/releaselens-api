import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getProjectTrend(projectId: string): Promise<{
        createdAt: Date;
        result: {
            level: import("@prisma/client").$Enums.QualityLevel;
            score: number;
            readiness: import("@prisma/client").$Enums.ReleaseReadiness;
        } | null;
    }[]>;
}
