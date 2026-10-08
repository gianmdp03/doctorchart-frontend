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

export interface WhoGrowthEvaluation {
  zScore: number;
  percentile: number;
  interpretation: string;
}

export interface PatientGrowthEvaluations {
  weight?: WhoGrowthEvaluation | null;
  height?: WhoGrowthEvaluation | null;
  headCircumference?: WhoGrowthEvaluation | null;
}

export interface PatientGrowthMeasurement {
  encounterId?: number;
  date: string; // ISO date string
  dateFormatted: string; // DD/MM/AAAA
  ageMonths: number; // e.g. 3.4
  ageFormatted: string; // e.g. "3 meses y 12 días"
  value: number; // e.g. 6.2
  unit: string; // e.g. "kg" or "cm"
  percentile?: number; // continuous WHO percentile e.g. 42.8
  zScore?: number; // standard deviation z-score e.g. -0.18
  interpretation?: string; // clinical category e.g. "Adecuado", "Bajo peso"
  approximatePercentile?: string; // formatted display string e.g. "P42.8% (Z: -0.18)"
}

export interface BackendGrowthMeasurement {
  source: 'BIRTH' | 'ENCOUNTER';
  encounterId: number | null;
  date: string;
  ageMonths: number;
  ageFormatted: string;
  measurements: AnthropometricMeasurements;
  evaluations?: PatientGrowthEvaluations | null;
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
