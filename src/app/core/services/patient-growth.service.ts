import { Injectable } from '@angular/core';
import {
  BiologicalSex,
  GrowthMetricType,
  PatientGrowthMeasurement,
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
   * Extracts chronological growth measurements for a given metric across clinical encounters and checkups.
   */
  extractPatientMeasurements(
    patient: PatientGrowthSourceInfo,
    encounters: ClinicalEncounterList[] = [],
    metric: GrowthMetricType,
    checkups: MedicalCheckupDetailDTO[] = []
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

    // 2. Clinical encounters
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

    // 3. Optional medical checkups
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
        return this.parseNumeric(bm.weight);
      case 'HEIGHT':
        return this.parseNumeric(bm.height);
      case 'HEAD_CIRCUMFERENCE':
        return this.parseNumeric(bm.headCircumference);
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
          this.parseNumeric(vs?.weightKg) ??
          this.findDynamicValue(dyn, ['peso', 'weight', 'weightKg', 'pesoKg', 'peso_kg'])
        );
      case 'HEIGHT':
        return (
          this.parseNumeric(vs?.heightCm) ??
          this.findDynamicValue(dyn, [
            'talla',
            'height',
            'heightCm',
            'tallaCm',
            'talla_cm',
            'estatura',
            'longitud',
          ])
        );
      case 'HEAD_CIRCUMFERENCE':
        return this.findDynamicValue(dyn, [
          'perimetroCefalico',
          'perimetro_cefalico',
          'perimetroEncefalico',
          'perimetro_encefalico',
          'perimetroCraneal',
          'perimetro_craneal',
          'headCircumference',
          'head_circumference',
          'pc',
        ]);
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
        return this.parseNumeric(checkup.measurements.weight);
      case 'HEIGHT':
        return this.parseNumeric(checkup.measurements.height);
      case 'HEAD_CIRCUMFERENCE':
        return this.parseNumeric(checkup.measurements.headCircumference);
      default:
        return null;
    }
  }

  private findDynamicValue(data: Record<string, unknown>, candidateKeys: string[]): number | null {
    for (const key of candidateKeys) {
      if (key in data) {
        const val = this.parseNumeric(data[key]);
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
        const val = this.parseNumeric(lowerKeys[lower]);
        if (val !== null) return val;
      }
    }
    return null;
  }

  private parseNumeric(val: unknown): number | null {
    if (val === null || val === undefined || val === '') return null;
    if (typeof val === 'number') {
      return isNaN(val) ? null : val;
    }
    if (typeof val === 'string') {
      const cleaned = val.replace(/,/g, '.').replace(/[^\d.-]/g, '').trim();
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? null : parsed;
    }
    return null;
  }
}
