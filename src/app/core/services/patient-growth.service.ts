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
import { ClinicalEncounterList } from '../models/clinical-encounter.model';
import { MedicalCheckupDetailDTO } from '../models/checkup.model';
import { PersonalHistory } from '../models/clinical-records.model';
import { getOmsPercentiles, OMS_METRIC_CONFIGS } from '../constants/oms-growth-data';

export interface PatientGrowthSourceInfo {
  birthDate?: string | null;
  gender?: string | null;
  personalHistory?: PersonalHistory | null;
}

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
   * Calculates the exact age in decimal months between birthDate and a given date.
   * Returns a value with 1 decimal place (e.g., 3.4 months). Returns 0 if invalid or target < birth.
   */
  calculateExactAgeInMonths(birthDateStr: string, targetDateStr: string): number {
    const birth = new Date(birthDateStr);
    const target = new Date(targetDateStr);

    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || target < birth) {
      return 0;
    }

    const diffMs = target.getTime() - birth.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    // 365.25 days / 12 months = 30.4375 days per month average
    const months = diffDays / 30.4375;
    return Math.round(months * 10) / 10;
  }

  /**
   * Formats exact age into a human-friendly pediatric string (e.g. "3 meses y 12 días", "2 años y 1 mes").
   */
  formatAge(birthDateStr: string, targetDateStr: string): string {
    const birth = new Date(birthDateStr);
    const target = new Date(targetDateStr);

    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || target < birth) {
      return '0 días';
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years >= 2) {
      if (months === 0) {
        return `${years} ${years === 1 ? 'año' : 'años'}`;
      }
      return `${years} ${years === 1 ? 'año' : 'años'} y ${months} ${months === 1 ? 'mes' : 'meses'}`;
    }

    const totalMonths = years * 12 + months;
    if (totalMonths === 0) {
      if (days === 0) return 'Recién nacido';
      return `${days} ${days === 1 ? 'día' : 'días'}`;
    }

    if (days === 0) {
      return `${totalMonths} ${totalMonths === 1 ? 'mes' : 'meses'}`;
    }

    return `${totalMonths} ${totalMonths === 1 ? 'mes' : 'meses'} y ${days} ${days === 1 ? 'día' : 'días'}`;
  }

  /**
   * Formats a date string (ISO YYYY-MM-DD...) into standard DD/MM/YYYY display.
   */
  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const cleanDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
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

  /**
   * Estimates approximate WHO percentile bracket for a specific measurement.
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
    return this.http.get<BackendGrowthMeasurement[]>(`${this.baseUrl}/${patientId}/curvas`);
  }

  /**
   * Transforms raw backend measurements into PatientGrowthMeasurement items.
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
      switch (metric) {
        case 'WEIGHT':
          rawVal = item.peso ?? null;
          break;
        case 'HEIGHT':
          rawVal = item.talla ?? null;
          break;
        case 'HEAD_CIRCUMFERENCE':
          rawVal = item.perimetroEncefalico ?? null;
          break;
      }

      const value = this.parseNumeric(rawVal, metric);

      if (value !== null && value > 0) {
        measurements.push({
          encounterId: item.consultaId,
          date: item.fechaConsulta,
          dateFormatted: this.formatDate(item.fechaConsulta),
          ageMonths: item.edadMeses,
          ageFormatted: item.edadLegible || `${item.edadMeses} meses`,
          value,
          unit,
          approximatePercentile: this.estimatePercentile(item.edadMeses, value, sex, metric),
        });
      }
    }

    return measurements.sort((a, b) => a.ageMonths - b.ageMonths);
  }

  /**
   * Extracts chronological growth measurements for a given metric across backend curves, encounters, and checkups.
   */
  extractPatientMeasurements(
    patient: PatientGrowthSourceInfo,
    encounters: ClinicalEncounterList[] = [],
    metric: GrowthMetricType,
    checkups: MedicalCheckupDetailDTO[] = [],
    backendCurves: BackendGrowthMeasurement[] = []
  ): PatientGrowthMeasurement[] {
    if (!patient || !patient.birthDate) {
      return [];
    }

    const birthDate = patient.birthDate;
    const sex = this.normalizeGender(patient.gender);
    const unit = OMS_METRIC_CONFIGS[metric].unit;
    const measurements: PatientGrowthMeasurement[] = [];

    // 1. Birth measurements from personal history (Age = 0)
    const birthVal = this.extractBirthMeasurement(patient.personalHistory, metric);
    if (birthVal !== null && birthVal > 0) {
      measurements.push({
        date: birthDate,
        dateFormatted: this.formatDate(birthDate),
        ageMonths: 0,
        ageFormatted: 'Al nacer',
        value: birthVal,
        unit,
        approximatePercentile: this.estimatePercentile(0, birthVal, sex, metric),
      });
    }

    // 2. If backend curves are provided, prefer persisted measurements from database
    if (backendCurves && backendCurves.length > 0) {
      for (const item of backendCurves) {
        let rawVal: number | null = null;
        switch (metric) {
          case 'WEIGHT':
            rawVal = item.peso ?? null;
            break;
          case 'HEIGHT':
            rawVal = item.talla ?? null;
            break;
          case 'HEAD_CIRCUMFERENCE':
            rawVal = item.perimetroEncefalico ?? null;
            break;
        }
        const value = this.parseNumeric(rawVal, metric);
        if (value !== null && value > 0) {
          measurements.push({
            encounterId: item.consultaId,
            date: item.fechaConsulta,
            dateFormatted: this.formatDate(item.fechaConsulta),
            ageMonths: item.edadMeses,
            ageFormatted: item.edadLegible || this.formatAge(birthDate, item.fechaConsulta),
            value,
            unit,
            approximatePercentile: this.estimatePercentile(item.edadMeses, value, sex, metric),
          });
        }
      }
    } else {
      // 3. Fallback: extract from clinical encounters
      for (const encounter of encounters) {
        if (!encounter.encounterDate) continue;
        const value = this.extractFromEncounter(encounter, metric);
        if (value !== null && value > 0) {
          const ageMonths = this.calculateExactAgeInMonths(birthDate, encounter.encounterDate);
          measurements.push({
            encounterId: encounter.id,
            date: encounter.encounterDate,
            dateFormatted: this.formatDate(encounter.encounterDate),
            ageMonths,
            ageFormatted: this.formatAge(birthDate, encounter.encounterDate),
            value,
            unit,
            approximatePercentile: this.estimatePercentile(ageMonths, value, sex, metric),
          });
        }
      }

      // 4. Fallback: extract from optional medical checkups
      for (const checkup of checkups) {
        if (!checkup.checkupDate) continue;
        const value = this.extractFromCheckup(checkup, metric);
        if (value !== null && value > 0) {
          const ageMonths = this.calculateExactAgeInMonths(birthDate, checkup.checkupDate);
          // Avoid duplicate measurement if an encounter was on the same date with same value
          const alreadyExists = measurements.some(
            (m) => m.date.startsWith(checkup.checkupDate) && Math.abs(m.value - value) < 0.01
          );
          if (!alreadyExists) {
            measurements.push({
              date: checkup.checkupDate,
              dateFormatted: this.formatDate(checkup.checkupDate),
              ageMonths,
              ageFormatted: this.formatAge(birthDate, checkup.checkupDate),
              value,
              unit,
              approximatePercentile: this.estimatePercentile(ageMonths, value, sex, metric),
            });
          }
        }
      }
    }

    // Chronological sort: by ageMonths ascending, then by date
    return measurements.sort((a, b) => {
      if (a.ageMonths !== b.ageMonths) {
        return a.ageMonths - b.ageMonths;
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }

  private extractBirthMeasurement(
    history?: PersonalHistory | null,
    metric?: GrowthMetricType
  ): number | null {
    if (!history?.birthMeasurements) return null;
    const bm = history.birthMeasurements;
    switch (metric) {
      case 'WEIGHT':
        return this.parseNumeric(bm.weight, 'WEIGHT');
      case 'HEIGHT':
        return this.parseNumeric(bm.height, 'HEIGHT');
      case 'HEAD_CIRCUMFERENCE':
        return this.parseNumeric(bm.headCircumference, 'HEAD_CIRCUMFERENCE');
      default:
        return null;
    }
  }

  private extractFromEncounter(
    encounter: ClinicalEncounterList,
    metric: GrowthMetricType
  ): number | null {
    const dyn = encounter.dynamicData || {};
    const vs = encounter.vitalSigns;

    switch (metric) {
      case 'WEIGHT':
        return (
          this.parseNumeric(encounter.peso, 'WEIGHT') ??
          this.parseNumeric(vs?.weightKg, 'WEIGHT') ??
          this.findDynamicValue(dyn, ['peso', 'weight', 'weightKg', 'pesoKg', 'peso_kg'], 'WEIGHT')
        );
      case 'HEIGHT':
        return (
          this.parseNumeric(encounter.talla, 'HEIGHT') ??
          this.parseNumeric(vs?.heightCm, 'HEIGHT') ??
          this.findDynamicValue(
            dyn,
            [
              'talla',
              'height',
              'heightCm',
              'tallaCm',
              'talla_cm',
              'estatura',
              'longitud',
            ],
            'HEIGHT'
          )
        );
      case 'HEAD_CIRCUMFERENCE':
        return (
          this.parseNumeric(encounter.perimetroEncefalico, 'HEAD_CIRCUMFERENCE') ??
          this.parseNumeric(vs?.headCircumferenceCm, 'HEAD_CIRCUMFERENCE') ??
          this.findDynamicValue(
            dyn,
            [
              'perimetroCefalico',
              'perimetro_cefalico',
              'perimetroEncefalico',
              'perimetro_encefalico',
              'perimetroCraneal',
              'perimetro_craneal',
              'headCircumference',
              'head_circumference',
              'pc',
            ],
            'HEAD_CIRCUMFERENCE'
          )
        );
      default:
        return null;
    }
  }

  private extractFromCheckup(
    checkup: MedicalCheckupDetailDTO,
    metric: GrowthMetricType
  ): number | null {
    if (!checkup.measurements) return null;
    switch (metric) {
      case 'WEIGHT':
        return this.parseNumeric(checkup.measurements.weight, 'WEIGHT');
      case 'HEIGHT':
        return this.parseNumeric(checkup.measurements.height, 'HEIGHT');
      case 'HEAD_CIRCUMFERENCE':
        return this.parseNumeric(checkup.measurements.headCircumference, 'HEAD_CIRCUMFERENCE');
      default:
        return null;
    }
  }

  private findDynamicValue(
    data: Record<string, unknown>,
    candidateKeys: string[],
    metric?: GrowthMetricType
  ): number | null {
    for (const key of candidateKeys) {
      if (key in data) {
        const val = this.parseNumeric(data[key], metric);
        if (val !== null) return val;
      }
    }
    // Check case-insensitive
    const lowerKeys = Object.keys(data).reduce<Record<string, unknown>>((acc, k) => {
      acc[k.toLowerCase()] = data[k];
      return acc;
    }, {});

    for (const key of candidateKeys) {
      const lower = key.toLowerCase();
      if (lower in lowerKeys) {
        const val = this.parseNumeric(lowerKeys[lower], metric);
        if (val !== null) return val;
      }
    }
    return null;
  }

  private parseNumeric(val: unknown, metric?: GrowthMetricType): number | null {
    if (val === null || val === undefined || val === '') return null;
    let n: number | null = null;
    if (typeof val === 'number') {
      n = isNaN(val) ? null : val;
    } else if (typeof val === 'string') {
      const cleaned = val.replace(/,/g, '.').replace(/[^\d.-]/g, '').trim();
      const parsed = parseFloat(cleaned);
      n = isNaN(parsed) ? null : parsed;
    }
    if (n === null) return null;

    // Pediatric normalization:
    // If WEIGHT >= 100, it was recorded in grams: convert to kg
    if (metric === 'WEIGHT' && n >= 100) {
      return Math.round((n / 1000) * 100) / 100;
    }
    // If HEIGHT or HEAD_CIRCUMFERENCE > 250, it was recorded in mm: convert to cm
    if ((metric === 'HEIGHT' || metric === 'HEAD_CIRCUMFERENCE') && n > 250 && n <= 1500) {
      return Math.round((n / 10) * 10) / 10;
    }
    return n;
  }
}
