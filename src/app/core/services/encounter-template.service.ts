import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreateEncounterTemplateRequest,
  EncounterTemplate,
  EncounterTemplatesResponse,
  UpdateEncounterTemplateRequest,
} from '../models/encounter-template.model';

@Injectable({ providedIn: 'root' })
export class EncounterTemplateService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/workspace/encounter-templates`;

  private readonly _response = signal<EncounterTemplatesResponse | null>(null);
  readonly response = this._response.asReadonly();

  list(): Observable<EncounterTemplatesResponse> {
    return this.http.get<EncounterTemplatesResponse>(this.baseUrl).pipe(
      tap((res) => this._response.set(res)),
    );
  }

  create(payload: CreateEncounterTemplateRequest): Observable<EncounterTemplate> {
    return this.http.post<EncounterTemplate>(this.baseUrl, payload);
  }

  update(id: number, payload: UpdateEncounterTemplateRequest): Observable<EncounterTemplate> {
    return this.http.put<EncounterTemplate>(`${this.baseUrl}/${id}`, payload);
  }

  archive(id: number, expectedVersion: number): Observable<EncounterTemplate> {
    return this.http.post<EncounterTemplate>(`${this.baseUrl}/${id}/archive`, { expectedVersion });
  }

  restore(id: number, expectedVersion: number): Observable<EncounterTemplate> {
    return this.http.post<EncounterTemplate>(`${this.baseUrl}/${id}/restore`, { expectedVersion });
  }

  importDefaults(): Observable<EncounterTemplatesResponse> {
    return this.http.post<EncounterTemplatesResponse>(`${this.baseUrl}/import-defaults`, {}).pipe(
      tap((res) => this._response.set(res)),
    );
  }

  clearCache(): void {
    this._response.set(null);
  }
}
