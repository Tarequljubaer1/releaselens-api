export declare class IngestSignalsDto {
    buildPassed?: boolean;
    lintPassed?: boolean;
    unitPassed?: boolean;
    unitTotal?: number;
    unitFailed?: number;
    unitSkipped?: number;
    coveragePresent?: boolean;
    coveragePct?: number;
    e2ePresent?: boolean;
    e2ePassed?: boolean;
    e2eEnv?: string;
    sonarPresent?: boolean;
    sonarGatePassed?: boolean;
    rawPayload?: Record<string, any>;
}
export declare class IngestPipelineDto {
    projectName: string;
    pipelineId: string;
    commitSha?: string;
    branch?: string;
    signals: IngestSignalsDto;
}
