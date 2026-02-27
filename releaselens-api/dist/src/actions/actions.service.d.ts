import { ProjectsService } from '../projects/projects.service';
type Impact = 'High' | 'Medium' | 'Low';
type Effort = 'S' | 'M' | 'L';
type NextBestAction = {
    id: string;
    projectId: string;
    title: string;
    impact: Impact;
    effort: Effort;
    etaHours: number;
};
export declare class ActionsService {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    getNextBestActions(limit?: number): Promise<NextBestAction[]>;
}
export {};
