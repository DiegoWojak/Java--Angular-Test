import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoggerService {
    debug(message: string, ...data: unknown[]): void {
        if (!environment.production) {
         console.debug(`[DEBUG] ${message}`, ...data);
        }
    }

    info(message: string, ...data: unknown[]): void {
    console.info(`[INFO] ${message}`, ...data);
    }

    warn(message: string, ...data: unknown[]): void {
        console.warn(`[WARN] ${message}`, ...data);
    }

    error(message: string, ...data: unknown[]): void {
        console.error(`[ERROR] ${message}`, ...data);
    }
}