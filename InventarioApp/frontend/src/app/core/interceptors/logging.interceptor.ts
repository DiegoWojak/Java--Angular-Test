import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor(private logger: LoggerService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const inicio = Date.now();
    return next.handle(req).pipe(
      tap({
        next: event => {
          if (event instanceof HttpResponse) {
            this.logger.debug(`${req.method} ${req.urlWithParams} -> ${event.status} (${Date.now() - inicio} ms)`);
          }
        },
        error: err => this.logger.warn(`${req.method} ${req.urlWithParams} -> ${err.status} (${Date.now() - inicio} ms)`)
      })
    );
  }
}
