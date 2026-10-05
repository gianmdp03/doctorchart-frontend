import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ClinicalEncounterDetail,
  ClinicalEncounterDashboard,
  ClinicalEncounterList,
  ClinicalEncounterRequest,
  ClinicalEncounterUpdateRequest,
} from '../models/clinical-encounter.model';
import { PagedResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ClinicalEncounterService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/encounters`;

  private generation = 0;
  clear(): void {
    this.generation++;
    this.encounters.set([]);
    this.currentEncounter.set(null);
    this.loading.set(false);
  }

  readonly encounters = signal<ClinicalEncounterList[]>([]);
  readonly currentEncounter = signal<ClinicalEncounterDetail | null>(null);
  readonly loading = signal<boolean>(false);

  getById(id: number): Observable<ClinicalEncounterDetail> {
    const generation = this.generation;
    this.loading.set(true);
    return this.http.get<ClinicalEncounterDetail>(`${this.baseUrl}/${id}`).pipe(
      tap({
        next: (detail) => {
          if (generation !== this.generation) return;
          this.currentEncounter.set(detail);
          this.loading.set(false);
        },
        error: () => { if (generation === this.generation) this.loading.set(false); },
      })
    );
  }

  getAll(
    page = 0,
    size = 50,
    sort = 'encounterDate,desc',
  ): Observable<PagedResponse<ClinicalEncounterList>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);
    return this.http.get<PagedResponse<ClinicalEncounterList>>(this.baseUrl, { params });
  }

  getDashboard(): Observable<ClinicalEncounterDashboard> {
    return this.http.get<ClinicalEncounterDashboard>(`${this.baseUrl}/dashboard`);
  }

  getByPatient(patientId: number): Observable<ClinicalEncounterList[]> {
    const generation = this.generation;
    this.loading.set(true);
    return this.http
      .get<ClinicalEncounterList[]>(`${this.baseUrl}/patient/${patientId}`)
      .pipe(
        tap({
          next: (list) => {
          if (generation !== this.generation) return;
            this.encounters.set(list);
            this.loading.set(false);
          },
          error: () => { if (generation === this.generation) this.loading.set(false); },
        })
      );
  }

  getByPatientAndSpecialty(
    patientId: number,
    specialtyId: number
  ): Observable<ClinicalEncounterList[]> {
    const generation = this.generation;
    this.loading.set(true);
    return this.http
      .get<ClinicalEncounterList[]>(
        `${this.baseUrl}/patient/${patientId}/specialty/${specialtyId}`
      )
      .pipe(
        tap({
          next: (list) => {
          if (generation !== this.generation) return;
            this.encounters.set(list);
            this.loading.set(false);
          },
          error: () => { if (generation === this.generation) this.loading.set(false); },
        })
      );
  }

  create(request: ClinicalEncounterRequest): Observable<ClinicalEncounterDetail> {
    const generation = this.generation;
    this.loading.set(true);
    return this.http.post<ClinicalEncounterDetail>(this.baseUrl, request).pipe(
      tap({
        next: (created) => {
          if (generation !== this.generation) return;
          this.currentEncounter.set(created);
          this.loading.set(false);
        },
        error: () => { if (generation === this.generation) this.loading.set(false); },
      })
    );
  }

  update(
    id: number,
    request: ClinicalEncounterUpdateRequest
  ): Observable<ClinicalEncounterDetail> {
    const generation = this.generation;
    this.loading.set(true);
    return this.http
      .put<ClinicalEncounterDetail>(`${this.baseUrl}/${id}`, request)
      .pipe(
        tap({
          next: (updated) => {
          if (generation !== this.generation) return;
            this.currentEncounter.set(updated);
            this.loading.set(false);
          },
          error: () => { if (generation === this.generation) this.loading.set(false); },
        })
      );
  }

  delete(id: number): Observable<void> {
    const generation = this.generation;
    this.loading.set(true);
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap({
        next: () => {
          if (generation !== this.generation) return;
          this.encounters.update((list) => list.filter((item) => item.id !== id));
          if (this.currentEncounter()?.id === id) {
            this.currentEncounter.set(null);
          }
          this.loading.set(false);
        },
        error: () => { if (generation === this.generation) this.loading.set(false); },
      })
    );
  }

}
