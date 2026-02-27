import { ScoringInput, ScoringOutput } from './scoring.types';
export declare class ScoringService {
    private readonly MODEL_VERSION;
    private readonly WEIGHTS;
    score(input: ScoringInput): ScoringOutput;
    private mapLevel;
    private computeReadiness;
    private rankReasons;
    private buildExplanation;
}
