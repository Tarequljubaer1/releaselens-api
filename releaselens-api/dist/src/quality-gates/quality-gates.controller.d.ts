import { QualityGatesService } from './quality-gates.service';
export declare class QualityGatesController {
    private service;
    constructor(service: QualityGatesService);
    getDefault(): {
        minCoverage: number;
        requireSonar: boolean;
        requireE2E: boolean;
    };
}
