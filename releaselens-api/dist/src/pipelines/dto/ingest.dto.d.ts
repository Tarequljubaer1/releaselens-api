export declare class SignalsDto {
    buildPassed: boolean;
    coveragePct?: number;
}
export declare class IngestDto {
    projectName: string;
    pipelineId: string;
    commitSha: string;
    branch?: string;
    signals: SignalsDto;
}
