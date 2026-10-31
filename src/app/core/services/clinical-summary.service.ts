import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ClinicalProfileChange, ClinicalSummary } from '../models/clinical-summary.model';
import { PatientDetailDTO } from '../models/patient.model';

@Injectable({ providedIn: 'root' })
export class ClinicalSummaryService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl + '/patients';
  get(id: number) {
    return this.http.get<ClinicalSummary>(`${this.base}/${id}/clinical-summary`);
  }
  save(id: number, expectedVersion: number, change: ClinicalProfileChange) {
    return this.http.put<PatientDetailDTO>(`${this.base}/${id}/clinical-profile`, {
      ...change,
      expectedVersion,
    });
  }
}
