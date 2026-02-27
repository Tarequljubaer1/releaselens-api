"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const ingest_dto_1 = require("../src/pipelines/dto/ingest.dto");
const file = process.argv[2];
if (!file) {
    console.error('Usage: node validate-ingest-payload.js <path-to-json>');
    process.exit(1);
}
const full = path.resolve(process.cwd(), file);
const raw = fs.readFileSync(full, 'utf8');
const json = JSON.parse(raw);
const dto = (0, class_transformer_1.plainToInstance)(ingest_dto_1.IngestDto, json);
const errors = (0, class_validator_1.validateSync)(dto, { whitelist: true, forbidNonWhitelisted: true });
if (errors.length) {
    console.error('❌ Invalid payload:\n' + JSON.stringify(errors, null, 2));
    process.exit(2);
}
console.log('✅ Payload valid');
//# sourceMappingURL=validate-ingest-payload.js.map