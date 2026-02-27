"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestDto = exports.SignalsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class SignalsDto {
    buildPassed;
    coveragePct;
}
exports.SignalsDto = SignalsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the build stage completed successfully.',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SignalsDto.prototype, "buildPassed", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Test coverage percentage (0–100). Include when available.',
        example: 78.4,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], SignalsDto.prototype, "coveragePct", void 0);
class IngestDto {
    projectName;
    pipelineId;
    commitSha;
    branch;
    signals;
}
exports.IngestDto = IngestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Project identifier in org/repo format (or any stable unique key).',
        example: 'acme/payments-service',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], IngestDto.prototype, "projectName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'CI pipeline ID as a string (keeps compatibility across systems).',
        example: '22242945827',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], IngestDto.prototype, "pipelineId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Git commit SHA that triggered the pipeline.',
        example: '26ecf066d8cbdd090172561b7468b84f56f632bd',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], IngestDto.prototype, "commitSha", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Git branch name (if known).',
        example: 'main',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], IngestDto.prototype, "branch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Signals collected from the pipeline run.',
        type: () => SignalsDto,
        example: {
            buildPassed: true,
            coveragePct: 78.4,
        },
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SignalsDto),
    __metadata("design:type", SignalsDto)
], IngestDto.prototype, "signals", void 0);
//# sourceMappingURL=ingest.dto.js.map