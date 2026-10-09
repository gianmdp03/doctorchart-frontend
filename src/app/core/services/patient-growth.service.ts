import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  BiologicalSex,
  MeasurementMode,
  PatientGrowthResponse,
} from '../models/growth-chart.model';

/** Transport only. Reference selection, LMS and derived measurements belong to the backend. */
@Injectable({ providedIn: 'root' })
export class PatientGrowthService {
  private readonly http = inject(HttpClient);
  getPatientGrowthCurves(
    patientId: number,
    referenceSex: BiologicalSex | null = null,
    measurementModes: Record<string, Exclude<MeasurementMode, 'UNKNOWN'>> = {},
  ): Observable<PatientGrowthResponse> {
    let params = new HttpParams();
    if (referenceSex) params = params.set('referenceSex', referenceSex);
    if (Object.keys(measurementModes).length)
      params = params.set('measurementModes', JSON.stringify(measurementModes));
    return this.http.get<PatientGrowthResponse>(
      `${environment.apiUrl}/patients/${patientId}/growth`,
      { params },
    );
  }
  formatDate(value: string): string {
    if (!value) return '';
    let day = value;
    if (value.includes('T')) {
      const instant = new Date(value);
      if (!Number.isFinite(instant.getTime())) return value;
      day = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Argentina/Buenos_Aires',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(instant);
    }
    return /^\d{4}-\d{2}-\d{2}$/.test(day) ? day.split('-').reverse().join('/') : value;
  }
}
