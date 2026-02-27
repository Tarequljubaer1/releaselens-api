export declare class QualityGatesService {
    getDefaultGate(): {
        minCoverage: number;
        requireSonar: boolean;
        requireE2E: boolean;
    };
}
