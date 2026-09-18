import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ClinicalEncounterDetail,
  ClinicalEncounterList,
  ClinicalEncounterRequest,
} from '../models/clinical-encounter.model';
import { MedicalSpecialty } from '../models/specialty.model';

@Injectable({
  providedIn: 'root',
})
export class ClinicalEncounterService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/encounters`;

  readonly encounters = signal<ClinicalEncounterList[]>([]);
  readonly currentEncounter = signal<ClinicalEncounterDetail | null>(null);
  readonly loading = signal<boolean>(false);

  getById(id: number): Observable<ClinicalEncounterDetail> {
    this.loading.set(true);
    return this.http.get<ClinicalEncounterDetail>(`${this.baseUrl}/${id}`).pipe(
      tap({
        next: (detail) => {
          this.currentEncounter.set(detail);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      })
    );
  }

  getByPatient(patientId: number): Observable<ClinicalEncounterList[]> {
    this.loading.set(true);
    return this.http
      .get<ClinicalEncounterList[]>(`${this.baseUrl}/patient/${patientId}`)
      .pipe(
        tap({
          next: (list) => {
            this.encounters.set(list);
            this.loading.set(false);
          },
          error: () => this.loading.set(false),
        })
      );
  }

  getByPatientAndSpecialty(
    patientId: number,
    specialty: MedicalSpecialty
  ): Observable<ClinicalEncounterList[]> {
    this.loading.set(true);
    return this.http
      .get<ClinicalEncounterList[]>(
        `${this.baseUrl}/patient/${patientId}/specialty/${specialty}`
      )
      .pipe(
        tap({
          next: (list) => {
            this.encounters.set(list);
            this.loading.set(false);
          },
          error: () => this.loading.set(false),
        })
      );
  }

  create(request: ClinicalEncounterRequest): Observable<ClinicalEncounterDetail> {
    this.loading.set(true);
    return this.http.post<ClinicalEncounterDetail>(this.baseUrl, request).pipe(
      tap({
        next: (created) => {
          this.currentEncounter.set(created);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      })
    );
  }

  update(
    id: number,
    request: ClinicalEncounterRequest
  ): Observable<ClinicalEncounterDetail> {
    this.loading.set(true);
    return this.http
      .put<ClinicalEncounterDetail>(`${this.baseUrl}/${id}`, request)
      .pipe(
        tap({
          next: (updated) => {
            this.currentEncounter.set(updated);
            this.loading.set(false);
          },
          error: () => this.loading.set(false),
        })
      );
  }

  delete(id: number): Observable<void> {
    this.loading.set(true);
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap({
        next: () => {
          this.encounters.update((list) => list.filter((item) => item.id !== id));
          if (this.currentEncounter()?.id === id) {
            this.currentEncounter.set(null);
          }
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      })
    );
  }

  migratePediatricCheckups(): Observable<{
    totalFound: number;
    alreadyMigrated: number;
    migratedNow: number;
    status: string;
  }> {
    return this.http.post<{
      totalFound: number;
      alreadyMigrated: number;
      migratedNow: number;
      status: string;
    }>(`${this.baseUrl}/migrate-pediatric`, {});
  }
}
