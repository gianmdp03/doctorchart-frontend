import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PrescriptionRequest, SavedPrescriptionRecord } from '../models/prescription.model';

@Injectable({ providedIn: 'root' })
export class PatientPrescriptionService {
  private readonly http = inject(HttpClient);
  private url(patientId: number): string { return `${environment.apiUrl}/patients/${patientId}/prescriptions`; }
  list(patientId: number): Observable<SavedPrescriptionRecord[]> { return this.http.get<SavedPrescriptionRecord[]>(this.url(patientId)); }
  get(patientId: number, id: number): Observable<SavedPrescriptionRecord> { return this.http.get<SavedPrescriptionRecord>(`${this.url(patientId)}/${id}`); }
  create(patientId: number, request: PrescriptionRequest): Observable<SavedPrescriptionRecord> { return this.http.post<SavedPrescriptionRecord>(this.url(patientId), request); }
  delete(patientId: number, id: number): Observable<void> { return this.http.delete<void>(`${this.url(patientId)}/${id}`); }
}
