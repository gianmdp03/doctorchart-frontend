import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreateSpecialtyDraftRequest, SaveWizardDefaultDraftRequest, SpecialtyDetail,
  TemplateReviewStatus, UpdateSpecialtyRequest, WizardDefaultDetail,
} from '../models/admin-specialty.model';

@Injectable({ providedIn: 'root' })
export class AdminSpecialtyService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/admin/specialties`;

  getSpecialties(): Observable<SpecialtyDetail[]> {
    return this.http.get<SpecialtyDetail[]>(this.baseUrl);
  }
  createSpecialty(request: CreateSpecialtyDraftRequest): Observable<SpecialtyDetail> {
    return this.http.post<SpecialtyDetail>(this.baseUrl, request);
  }
  updateSpecialty(id: number, request: UpdateSpecialtyRequest): Observable<SpecialtyDetail> {
    return this.http.patch<SpecialtyDetail>(`${this.baseUrl}/${id}`, request);
  }
  getWizard(id: number): Observable<WizardDefaultDetail> {
    return this.http.get<WizardDefaultDetail>(`${this.baseUrl}/${id}/wizard`);
  }
  saveWizardDraft(id: number, request: SaveWizardDefaultDraftRequest): Observable<WizardDefaultDetail> {
    return this.http.put<WizardDefaultDetail>(`${this.baseUrl}/${id}/wizard/draft`, request);
  }
  publishWizard(id: number, expectedVersion: number): Observable<WizardDefaultDetail> {
    return this.http.post<WizardDefaultDetail>(`${this.baseUrl}/${id}/wizard/publish`, { expectedVersion });
  }
  getReviewStatus(id: number, before?: number): Observable<TemplateReviewStatus> {
    return this.http.get<TemplateReviewStatus>(`${this.baseUrl}/${id}/wizard/reviews`, { params: before === undefined ? {} : { before } });
  }
  approveWizard(id: number, expectedVersion: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/wizard/reviews`, { expectedVersion });
  }
  revokeWizard(id: number, approval: number, reason: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/wizard/reviews/${approval}/revoke`, { reason });
  }
}
