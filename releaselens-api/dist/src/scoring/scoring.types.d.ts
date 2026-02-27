export type ScoreCategory = 'build' | 'unit' | 'coverage' | 'e2e' | 'sonar';
export type ReasonSeverity = 'critical' | 'warning' | 'info';
export type Reason = {
    code: string;
    message: string;
    category: ScoreCategory;
    severity: ReasonSeverity;
};
export type ScoreBreakdown = {
    build: number;
    unit: number;
    coverage: number;
    e2e: number;
    sonar: number;
};
export type ScoringInput = {
    buildPassed?: boolean | null;
    lintPassed?: boolean | null;
    unitPassed?: boolean | null;
    unitTotal?: number | null;
    unitFailed?: number | null;
    unitSkipped?: number | null;
    coveragePresent?: boolean | null;
    coveragePct?: number | null;
    e2ePresent?: boolean | null;
    e2ePassed?: boolean | null;
    sonarPresent?: boolean | null;
    sonarGatePassed?: boolean | null;
};
export type ScoringOutput = {
    modelVersion: string;
    score: number;
    level: 'L0' | 'L1' | 'L2' | 'L3' | 'L4';
    readiness: 'ready' | 'risky' | 'not_ready';
    breakdown: ScoreBreakdown;
    reasons: Reason[];
    explanation: string;
};
