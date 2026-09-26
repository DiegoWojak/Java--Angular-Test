import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { LoggerService } from './logger.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    readonly username = signal<string | null>(null);
    
    constructor(
        private http: HttpClient,
        private storage: TokenStorageService,
        private router: Router,
        private logger: LoggerService
    ){
        if (this.storage.hasValidToken()) {
            this.username.set(this.storage.getUsername());
        }
    }

    login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
        tap(session => {
            this.storage.save(session);
            this.username.set(session.username);
            this.logger.info(`Sesión iniciada: ${session.username}`);
        })
        );
    }

    logout(): void {
        this.storage.clear();
        this.username.set(null);
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return this.storage.hasValidToken();
    }
}