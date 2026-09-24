import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateSpecialtyRequest, SpecialtySummary } from '../models/specialty.model';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/specialties`;

  /**
   * Fetches the summary catalog of all registered medical specialties (system + custom).
   */
  getSpecialties(): Observable<SpecialtySummary[]> {
    return this.http.get<SpecialtySummary[]>(this.baseUrl).pipe(
      map((list) =>
        (list || []).map((s) => ({
          ...s,
          code: s.code || (s as any).specialty || '',
          specialty: (s.code || (s as any).specialty || '') as any,
          name: s.name || s.displayName || '',
          displayName: s.displayName || s.name || '',
        }))
      )
    );
  }

  /**
   * Creates a new custom medical specialty for the doctor.
   */
  createCustomSpecialty(request: CreateSpecialtyRequest): Observable<SpecialtySummary> {
    const payload = {
      ...request,
      code: request.code || this.toSlug(request.name),
    };
    return this.http.post<SpecialtySummary>(this.baseUrl, payload).pipe(
      map((s) => ({
        ...s,
        code: s.code || (s as any).specialty || '',
        specialty: (s.code || (s as any).specialty || '') as any,
        name: s.name || s.displayName || '',
        displayName: s.displayName || s.name || '',
      }))
    );
  }

  private toSlug(name: string): string {
    return name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .toUpperCase()
      .trim()
      .replace(/\s+/g, '_');
  }
}
