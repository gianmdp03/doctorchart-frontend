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

  updatePatient(id: number, patient: PatientUpdateRequestDTO): Observable<PatientDetailDTO> {
    return this.http.put<PatientDetailDTO>(`${this.baseUrl}/${id}`, patient);
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
