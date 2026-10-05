import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PublishedWizard, SpecialtySummary } from '../models/specialty.model';

@Injectable({ providedIn: 'root' })
export class SpecialtyService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/specialties`;
  getSpecialties(): Observable<SpecialtySummary[]> {
    return this.http.get<SpecialtySummary[]>(this.baseUrl).pipe(timeout(6000));
  }
  getPublishedWizard(id: number): Observable<PublishedWizard> {
    return this.http.get<PublishedWizard>(`${this.baseUrl}/${id}/wizard`).pipe(timeout(6000));
  }
}
