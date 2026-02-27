import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private service;
    constructor(service: AnalyticsService);
    getTrend(id: string): Promise<{
        createdAt: Date;
        result: {
            level: import("@prisma/client").$Enums.QualityLevel;
            score: number;
            readiness: import("@prisma/client").$Enums.ReleaseReadiness;
        } | null;
    }[]>;
}
