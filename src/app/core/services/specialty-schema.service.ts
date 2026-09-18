import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  MedicalSpecialty,
  SpecialtySchema,
  SpecialtySummary,
} from '../models/specialty.model';

@Injectable({
  providedIn: 'root',
})
export class SpecialtySchemaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/specialties`;

  // In-memory cache of resolved specialty schemas
  private readonly schemaCache = new Map<MedicalSpecialty, SpecialtySchema>();

  // Reactive state signals
  readonly specialties = signal<SpecialtySummary[]>([]);
  readonly currentSpecialty = signal<MedicalSpecialty>('GENERAL_MEDICINE');
  readonly currentSchema = signal<SpecialtySchema | null>(null);
  readonly loading = signal<boolean>(false);

  /**
   * Fetches the summary catalog of all registered medical specialties.
   */
  getSpecialties(): Observable<SpecialtySummary[]> {
    this.loading.set(true);
    return this.http.get<SpecialtySummary[]>(this.baseUrl).pipe(
      tap({
        next: (list) => {
          this.specialties.set(list);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      })
    );
  }

  /**
   * Retrieves the dynamic field schema for a given medical specialty.
   * Leverages client-side memory caching to avoid redundant roundtrips.
   */
  getSchema(specialty: MedicalSpecialty): Observable<SpecialtySchema> {
    if (this.schemaCache.has(specialty)) {
      const cached = this.schemaCache.get(specialty)!;
      this.currentSpecialty.set(specialty);
      this.currentSchema.set(cached);
      return of(cached);
    }

    this.loading.set(true);
    return this.http.get<SpecialtySchema>(`${this.baseUrl}/${specialty}/schema`).pipe(
      tap({
        next: (schema) => {
          this.schemaCache.set(specialty, schema);
          this.currentSpecialty.set(specialty);
          this.currentSchema.set(schema);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      })
    );
  }

  /**
   * Pre-validates a dynamic JSONB payload against the backend specialty schema rules.
   */
  validateSpecialtyData(
    specialty: MedicalSpecialty,
    specialtyData: Record<string, any>
  ): Observable<{ valid: boolean; specialty: string; message: string }> {
    return this.http.post<{ valid: boolean; specialty: string; message: string }>(
      `${this.baseUrl}/${specialty}/validate`,
      specialtyData
    );
  }

  /**
   * Clears the in-memory schema cache.
   */
  clearCache(): void {
    this.schemaCache.clear();
  }
}
