import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  PatientDetailDTO,
  PatientListDTO,
  PatientDirectoryFilter,
  PatientRequestDTO,
  PatientUpdateRequestDTO,
} from '../models/patient.model';
import { PagedResponse } from '../models/api-response.model';
import { ArchivedCalculation, ArchivedPatient, ClinicalAccessEvent, PatientRevisions, RevisionPage } from '../models/clinical-revision.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/patients`;

  getPatients(
    page = 0,
    size = 10,
    sort = 'fullName,asc',
    search?: string,
    filter: PatientDirectoryFilter = 'ALL'
  ): Observable<PagedResponse<PatientListDTO>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort)
      .set('filter', filter);

    if (search && search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<PagedResponse<PatientListDTO>>(this.baseUrl, { params });
  }


  getPatientById(id: number): Observable<PatientDetailDTO> {
    return this.http.get<PatientDetailDTO>(`${this.baseUrl}/${id}`);
  }

  createPatient(patient: PatientRequestDTO): Observable<PatientDetailDTO> {
    return this.http.post<PatientDetailDTO>(this.baseUrl, patient);
  }

  checkDni(nationalId: string): Observable<{ patientId: number | null }> {
    return this.http.post<{ patientId: number | null }>(`${this.baseUrl}/check-dni`, { nationalId });
  }

  updatePatient(id: number, patient: PatientUpdateRequestDTO): Observable<PatientDetailDTO> {
    return this.http.put<PatientDetailDTO>(`${this.baseUrl}/${id}`, patient);
  }

  deletePatient(id: number, reason: string, expectedVersion: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { body: { reason, expectedVersion } });
  }

  getArchivedPatients(before?: number): Observable<RevisionPage<ArchivedPatient>> {
    return this.http.get<RevisionPage<ArchivedPatient>>(`${this.baseUrl}/archived`, {
      params: before ? { before } : {},
    });
  }

  getRevisions(patientId: number, before?: number, encounterId?: number): Observable<PatientRevisions> {
    let params = new HttpParams();
    if (before) params = params.set('before', before);
    if (encounterId) params = params.set('encounterId', encounterId);
    return this.http.get<PatientRevisions>(`${this.baseUrl}/${patientId}/revisions`, { params });
  }

  getArchivedStudy(patientId: number, studyId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${patientId}/revisions/studies/${studyId}/file`, { responseType: 'blob' });
  }

  getArchivedCalculations(patientId: number, before?: number): Observable<RevisionPage<ArchivedCalculation>> {
    return this.http.get<RevisionPage<ArchivedCalculation>>(`${this.baseUrl}/${patientId}/revisions/calculations`, {
      params: before ? { before } : {},
    });
  }
  listClinicalAccess(patientId?: number, before?: number): Observable<RevisionPage<ClinicalAccessEvent>> {
    let params = new HttpParams();
    if (patientId !== undefined) params = params.set('patientId', patientId);
    if (before !== undefined) params = params.set('before', before);
    return this.http.get<RevisionPage<ClinicalAccessEvent>>(`${environment.apiUrl}/workspace/clinical-access`, { params });
  }
}
