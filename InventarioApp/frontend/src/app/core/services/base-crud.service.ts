import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export abstract class BaseCrudService<T, REQ = Partial<T>, ID = number> {
  protected readonly http = inject(HttpClient);
  protected abstract readonly endpoint: string;

  protected get url(): string {
    return `${environment.apiUrl}/${this.endpoint}`;
  }

  /** GET /recurso?filtros */
  list(filters: Record<string, string | number | null | undefined> = {}): Observable<T[]> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && `${value}`.trim() !== '') {
        params = params.set(key, `${value}`.trim());
      }
    });
    return this.http.get<T[]>(this.url, { params });
  }

  get(id: ID): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  create(body: REQ): Observable<T> {
    return this.http.post<T>(this.url, body);
  }

  update(id: ID, body: REQ): Observable<T> {
    return this.http.put<T>(`${this.url}/${id}`, body);
  }

  delete(id: ID): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}