"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeScore = normalizeScore;
function normalizeScore(score) {
    if (score < 0)
        return 0;
    if (score > 100)
        return 100;
    return Math.round(score);
}
//# sourceMappingURL=score.util.js.map