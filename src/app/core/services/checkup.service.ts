import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  MedicalCheckupDetailDTO,
  MedicalCheckupListDTO,
  MedicalCheckupRequestDTO,
} from '../models/checkup.model';
import { PagedResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class CheckupService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/checkups`;

  getCheckups(
    page = 0,
    size = 10,
    sort = 'checkupDate,desc'
  ): Observable<PagedResponse<MedicalCheckupListDTO>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<PagedResponse<MedicalCheckupListDTO>>(this.baseUrl, { params });
  }

  getCheckupById(id: number): Observable<MedicalCheckupDetailDTO> {
    return this.http.get<MedicalCheckupDetailDTO>(`${this.baseUrl}/${id}`);
  }

  getCheckupsByPatientId(patientId: number): Observable<MedicalCheckupDetailDTO[]> {
    return this.http.get<MedicalCheckupDetailDTO[]>(`${this.baseUrl}/patient/${patientId}`);
  }

  createCheckup(checkup: MedicalCheckupRequestDTO): Observable<MedicalCheckupDetailDTO> {
    return this.http.post<MedicalCheckupDetailDTO>(this.baseUrl, checkup);
  }

  updateCheckup(
    id: number,
    checkup: MedicalCheckupRequestDTO
  ): Observable<MedicalCheckupDetailDTO> {
    return this.http.put<MedicalCheckupDetailDTO>(`${this.baseUrl}/${id}`, checkup);
  }

  deleteCheckup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
