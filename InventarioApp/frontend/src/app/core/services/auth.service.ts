import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { LoginRequest, LoginResponse } from '../../models/auth.model';
import { LoggerService } from './logger.service';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    readonly username = signal<string | null>(null);
    
    constructor(
        private http: HttpClient,
        private storage: TokenStorageService,
        private router: Router,
        private logger: LoggerService
    ){
       
    }

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials);
    }

    logout(): void {

    }

    isAuthenticated(): boolean {
        return true;
    }
}