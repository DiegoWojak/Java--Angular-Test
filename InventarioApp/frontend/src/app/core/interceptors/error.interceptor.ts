import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { throwError, catchError, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { LoggerService } from '../services/logger.service';
import { ApiError } from '../models/api-error.model';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private messages: MessageService,
    private auth: AuthService,
    private logger: LoggerService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        const apiError = err.error as ApiError | null;
        const esLogin = request.url.endsWith('/auth/login');

        if (err.status === 0) {
          this.toast('Sin conexión', 'No se pudo contactar al servidor');
        } else if (err.status === 401 && !esLogin) {
          this.toast('Sesión expirada', 'Vuelve a iniciar sesión');
          this.auth.logout();
        } else {
          this.toast(`Error ${err.status}`, apiError?.message ?? 'Ocurrió un error inesperado');
        }

        this.logger.error(`HTTP ${err.status} en ${request.method} ${request}`, apiError ?? err.message);
        return throwError(() => err);
      })
    );
  }

  //Notificación de error
  private toast(summary: string, detail: string): void {
    this.messages.add({ severity: 'error', summary, detail, life: 5000 });
  }
}
