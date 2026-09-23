import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SpecialtySummary } from '../models/specialty.model';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/specialties`;

  /**
   * Fetches the summary catalog of all registered medical specialties.
   */
  getSpecialties(): Observable<SpecialtySummary[]> {
    return this.http.get<SpecialtySummary[]>(this.baseUrl);
  }
}
