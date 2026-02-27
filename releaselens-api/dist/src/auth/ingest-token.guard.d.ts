import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class IngestTokenGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
