import { ActionsService } from './actions.service';
export declare class ActionsController {
    private readonly actionsService;
    constructor(actionsService: ActionsService);
    getActions(limit?: string): Promise<{
        id: string;
        projectId: string;
        title: string;
        impact: "High" | "Medium" | "Low";
        effort: "S" | "M" | "L";
        etaHours: number;
    }[]>;
}
