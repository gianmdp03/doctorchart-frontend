import { AnthropometricMeasurements } from './clinical-records.model';

export type GrowthMetricType = 'WEIGHT' | 'HEIGHT' | 'HEAD_CIRCUMFERENCE';
export type BiologicalSex = 'MALE' | 'FEMALE';

export interface OmsPercentilePoint {
  ageMonths: number;
  p3: number;
  p15: number;
  p50: number;
  p85: number;
  p97: number;
}

export interface PatientGrowthMeasurement {
  encounterId?: number;
  date: string; // ISO date string
  dateFormatted: string; // DD/MM/AAAA
  ageMonths: number; // e.g. 3.4
  ageFormatted: string; // e.g. "3 meses y 12 días"
  value: number; // e.g. 6.2
  unit: string; // e.g. "kg" or "cm"
  approximatePercentile?: string; // e.g. "~P50", "P15-P50", ">P97", "<P3"
}

export interface BackendGrowthMeasurement {
  source: 'BIRTH' | 'ENCOUNTER';
  encounterId: number | null;
  date: string;
  ageMonths: number;
  ageFormatted: string;
  measurements: AnthropometricMeasurements;
}

export interface GrowthMetricConfig {
  type: GrowthMetricType;
  title: string;
  shortTitle: string;
  unit: string;
  yAxisLabel: string;
  minY?: number;
  maxY?: number;
  stepSize?: number;
}
