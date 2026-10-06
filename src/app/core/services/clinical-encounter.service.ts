import { ActivePatientService } from './active-patient.service';
import { AuthService } from './auth.service';
import { effect, inject, Injectable, signal, untracked } from '@angular/core';
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

  private readonly auth = inject(AuthService);
  private readonly activePatient = inject(ActivePatientService);
  private contextKey(): string { return JSON.stringify([this.auth.currentUser()?.id ?? null, this.activePatient.patientId()]); }
  private context = this.contextKey();
  private syncContext(): void {
    const context = this.contextKey();
    if (context !== this.context) { this.context = context; this.clear(); }
  }
  private detailRead = 0;
  private listRead = 0;
  constructor() {
    effect(() => { this.auth.currentUser(); this.activePatient.patientId(); untracked(() => this.syncContext()); });
  }
  private generation = 0;
  clear(): void {
    this.generation++; this.detailRead++; this.listRead++;
    this.encounters.set([]);
    this.currentEncounter.set(null);
    this.loading.set(false);
  }

  readonly encounters = signal<ClinicalEncounterList[]>([]);
  readonly currentEncounter = signal<ClinicalEncounterDetail | null>(null);
  readonly loading = signal<boolean>(false);

  getById(id: number): Observable<ClinicalEncounterDetail> {
    this.syncContext();
    const read = ++this.detailRead;
    const generation = this.generation;
    const context = this.context;
    const owner = this.auth.currentUser()?.id;
    this.currentEncounter.set(null);
    this.loading.set(true);
    return this.http.get<ClinicalEncounterDetail>(`${this.baseUrl}/${id}`).pipe(
      tap({
        next: (detail) => {
          if (generation !== this.generation || owner !== this.auth.currentUser()?.id || context !== this.contextKey()) return;
          if (read !== this.detailRead || detail.id !== id) return;
          this.currentEncounter.set(detail);
          this.loading.set(false);
        },
        error: () => { if (generation === this.generation && owner === this.auth.currentUser()?.id && context === this.contextKey() && read === this.detailRead) this.loading.set(false); },
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
    this.syncContext();
    const read = ++this.listRead;
    const generation = this.generation;
    const context = this.context;
    const owner = this.auth.currentUser()?.id;
    this.encounters.set([]);
    this.loading.set(true);
    return this.http
      .get<ClinicalEncounterList[]>(`${this.baseUrl}/patient/${patientId}`)
      .pipe(
        tap({
          next: (list) => {
          if (generation !== this.generation || owner !== this.auth.currentUser()?.id || context !== this.contextKey()) return;
            if (read !== this.listRead) return;
            this.encounters.set(list);
            this.loading.set(false);
          },
          error: () => { if (generation === this.generation && owner === this.auth.currentUser()?.id && context === this.contextKey() && read === this.listRead) this.loading.set(false); },
        })
      );
  }

  getByPatientAndSpecialty(
    patientId: number,
    specialtyId: number
  ): Observable<ClinicalEncounterList[]> {
    this.syncContext();
    const read = ++this.listRead;
    const generation = this.generation;
    const context = this.context;
    const owner = this.auth.currentUser()?.id;
    this.encounters.set([]);
    this.loading.set(true);
    return this.http
      .get<ClinicalEncounterList[]>(
        `${this.baseUrl}/patient/${patientId}/specialty/${specialtyId}`
      )
      .pipe(
        tap({
          next: (list) => {
          if (generation !== this.generation || owner !== this.auth.currentUser()?.id || context !== this.contextKey()) return;
            if (read !== this.listRead) return;
            this.encounters.set(list);
            this.loading.set(false);
          },
          error: () => { if (generation === this.generation && owner === this.auth.currentUser()?.id && context === this.contextKey() && read === this.listRead) this.loading.set(false); },
        })
      );
  }

  create(request: ClinicalEncounterRequest): Observable<ClinicalEncounterDetail> {
    this.syncContext();
    const generation = this.generation;
    const context = this.context;
    const owner = this.auth.currentUser()?.id;
    this.loading.set(true);
    return this.http.post<ClinicalEncounterDetail>(this.baseUrl, request).pipe(
      tap({
        next: (created) => {
          if (generation !== this.generation || owner !== this.auth.currentUser()?.id || context !== this.contextKey()) return;
          this.currentEncounter.set(created);
          this.loading.set(false);
        },
        error: () => { if (generation === this.generation && owner === this.auth.currentUser()?.id && context === this.contextKey()) this.loading.set(false); },
      })
    );
  }

  update(
    id: number,
    request: ClinicalEncounterUpdateRequest
  ): Observable<ClinicalEncounterDetail> {
    this.syncContext();
    const generation = this.generation;
    const context = this.context;
    const owner = this.auth.currentUser()?.id;
    this.loading.set(true);
    return this.http
      .put<ClinicalEncounterDetail>(`${this.baseUrl}/${id}`, request)
      .pipe(
        tap({
          next: (updated) => {
          if (generation !== this.generation || owner !== this.auth.currentUser()?.id || context !== this.contextKey()) return;
            this.currentEncounter.set(updated);
            this.loading.set(false);
          },
          error: () => { if (generation === this.generation && owner === this.auth.currentUser()?.id && context === this.contextKey()) this.loading.set(false); },
        })
      );
  }

  delete(id: number): Observable<void> {
    this.syncContext();
    const generation = this.generation;
    const context = this.context;
    const owner = this.auth.currentUser()?.id;
    this.loading.set(true);
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap({
        next: () => {
          if (generation !== this.generation || owner !== this.auth.currentUser()?.id || context !== this.contextKey()) return;
          this.encounters.update((list) => list.filter((item) => item.id !== id));
          if (this.currentEncounter()?.id === id) {
            this.currentEncounter.set(null);
          }
          this.loading.set(false);
        },
        error: () => { if (generation === this.generation && owner === this.auth.currentUser()?.id && context === this.contextKey()) this.loading.set(false); },
      })
    );
  }

}
