import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  BiologicalSex,
  GrowthMetricType,
  PatientGrowthMeasurement,
  BackendGrowthMeasurement,
} from '../models/growth-chart.model';
import { getOmsPercentiles, OMS_METRIC_CONFIGS } from '../constants/oms-growth-data';

@Injectable({
  providedIn: 'root',
})
export class PatientGrowthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/patients`;

  /**
   * Normalizes gender strings into 'MALE' | 'FEMALE'.
   * Defaults to 'MALE' if unrecognized or missing.
   */
  normalizeGender(gender?: string | null): BiologicalSex {
    if (!gender) return 'MALE';
    const normalized = gender.trim().toUpperCase();
    if (
      normalized === 'FEMALE' ||
      normalized === 'F' ||
      normalized === 'FEMENINO' ||
      normalized === 'MUJER' ||
      normalized === 'GIRL' ||
      normalized === 'NIÑA'
    ) {
      return 'FEMALE';
    }
    return 'MALE';
  }

  /**
   * Formats a date string (ISO YYYY-MM-DD...) into standard DD/MM/YYYY display.
   */
  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = this.businessDay(dateStr);
    if (Number.isNaN(date.getTime())) return dateStr;
    const cleanDate = date.toISOString().slice(0, 10);
    const parts = cleanDate.split('-');
    if (parts.length === 3 && parts[0].length === 4) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  }

  private businessDay(value: string): Date {
    if (!value.includes('T')) return new Date(`${value}T00:00:00Z`);
    const instant = new Date(value);
    if (Number.isNaN(instant.getTime())) return instant;
    const day = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Argentina/Buenos_Aires',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(instant);
    return new Date(`${day}T00:00:00Z`);
  }

  /**
   * Fallback: Estimates approximate WHO percentile bracket when backend evaluation is unavailable.
   */
  estimatePercentile(
    ageMonths: number,
    value: number,
    sex: BiologicalSex,
    metric: GrowthMetricType
  ): string {
    const percentiles = getOmsPercentiles(sex, metric);
    if (!percentiles || percentiles.length === 0) return '';

    const roundedMonth = Math.min(60, Math.max(0, Math.round(ageMonths)));
    const ref = percentiles.find((p) => p.ageMonths === roundedMonth) ?? percentiles[0];
    if (!ref) return '';

    const isClose = (target: number) => Math.abs(value - target) <= target * 0.02;

    if (isClose(ref.p50)) return '~P50';
    if (isClose(ref.p3)) return '~P3';
    if (isClose(ref.p15)) return '~P15';
    if (isClose(ref.p85)) return '~P85';
    if (isClose(ref.p97)) return '~P97';

    if (value < ref.p3) return '< P3';
    if (value < ref.p15) return 'P3 - P15';
    if (value < ref.p50) return 'P15 - P50';
    if (value < ref.p85) return 'P50 - P85';
    if (value <= ref.p97) return 'P85 - P97';
    return '> P97';
  }

  /**
   * Fetches patient growth measurements historically persisted in the backend.
   */
  getPatientGrowthCurves(patientId: number): Observable<BackendGrowthMeasurement[]> {
    return this.http.get<BackendGrowthMeasurement[]>(`${this.baseUrl}/${patientId}/measurements`);
  }

  /**
   * Transforms raw backend measurements into PatientGrowthMeasurement items,
   * prioritizing exact WHO evaluations computed by the backend.
   */
  transformBackendMeasurements(
    backendData: BackendGrowthMeasurement[],
    metric: GrowthMetricType,
    sex: BiologicalSex
  ): PatientGrowthMeasurement[] {
    const unit = OMS_METRIC_CONFIGS[metric].unit;
    const measurements: PatientGrowthMeasurement[] = [];

    for (const item of backendData) {
      let rawVal: number | null = null;
      let evaluation = null;
      switch (metric) {
        case 'WEIGHT':
          rawVal = item.measurements.weightKg ?? null;
          evaluation = item.evaluations?.weight ?? null;
          break;
        case 'HEIGHT':
          rawVal = item.measurements.heightCm ?? null;
          evaluation = item.evaluations?.height ?? null;
          break;
        case 'HEAD_CIRCUMFERENCE':
          rawVal = item.measurements.headCircumferenceCm ?? null;
          evaluation = item.evaluations?.headCircumference ?? null;
          break;
      }

      const value = typeof rawVal === 'number' && Number.isFinite(rawVal) ? rawVal : null;

      if (value !== null && value > 0) {
        const percentile = evaluation?.percentile;
        const zScore = evaluation?.zScore;
        const interpretation = evaluation?.interpretation;

        let displayPercentile: string;
        if (percentile !== undefined && percentile !== null) {
          const zStr =
            zScore !== undefined && zScore !== null
              ? ` (Z: ${zScore >= 0 ? '+' : ''}${zScore.toFixed(2)})`
              : '';
          displayPercentile = `P${percentile.toFixed(1)}%${zStr}`;
        } else {
          displayPercentile = this.estimatePercentile(item.ageMonths, value, sex, metric);
        }

        measurements.push({
          encounterId: item.encounterId ?? undefined,
          date: item.date,
          dateFormatted: this.formatDate(item.date),
          ageMonths: item.ageMonths,
          ageFormatted: item.ageFormatted || `${item.ageMonths} meses`,
          value,
          unit,
          percentile,
          zScore,
          interpretation,
          approximatePercentile: displayPercentile,
        });
      }
    }

    return measurements.sort((a, b) => a.ageMonths - b.ageMonths);
  }
}
