import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PatientMedicalStudy } from '../models/patient-medical-study.model';

@Injectable({
  providedIn: 'root',
})
export class PatientMedicalStudyService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/patients`;

  getStudies(patientId: number): Observable<PatientMedicalStudy[]> {
    return this.http.get<PatientMedicalStudy[]>(`${this.baseUrl}/${patientId}/studies`);
  }

  uploadStudy(patientId: number, file: File, description?: string, name?: string): Observable<PatientMedicalStudy> {
    const formData = new FormData();
    // Persist the chosen study name through the existing attachment contract.
    // Keep the extension so server-side content validation remains unchanged.
    const extension = file.name.match(/\.[^.]+$/)?.[0] ?? '';
    if (name?.trim()) formData.append('file', file, `${name.trim()}${extension}`);
    else formData.append('file', file);
    if (description && description.trim()) {
      formData.append('description', description.trim());
    }
    return this.http.post<PatientMedicalStudy>(`${this.baseUrl}/${patientId}/studies`, formData);
  }

  getStudy(patientId: number, studyId: number): Observable<PatientMedicalStudy> {
    return this.http.get<PatientMedicalStudy>(`${this.baseUrl}/${patientId}/studies/${studyId}`);
  }

  getStudyFileBlob(patientId: number, studyId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${patientId}/studies/${studyId}/file`, {
      responseType: 'blob',
    });
  }

  deleteStudy(patientId: number, studyId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${patientId}/studies/${studyId}`);
  }
}
