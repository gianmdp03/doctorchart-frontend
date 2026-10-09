export type BiologicalSex = 'MALE' | 'FEMALE';
export type MeasurementMode = 'RECUMBENT' | 'STANDING' | 'UNKNOWN';
export type GrowthMetricType =
  'WEIGHT' | 'LENGTH' | 'HEIGHT' | 'HEAD_CIRCUMFERENCE' | 'WEIGHT_LENGTH' | 'WEIGHT_HEIGHT' | 'BMI';
export interface GrowthAxis {
  variable: 'AGE' | 'LENGTH' | 'HEIGHT' | 'WEIGHT' | 'HEAD_CIRCUMFERENCE' | 'BMI';
  unit: string;
  min: number;
  max: number;
  step: number;
  minorStep: number;
}
export interface GrowthChartDefinition {
  id: string;
  pdfNumber: number;
  pdfPage: number;
  indicator: GrowthMetricType;
  title: string;
  sex: BiologicalSex;
  ageMinMonths: number;
  ageMaxMonths: number;
  reference: 'WHO 2006' | 'WHO 2007';
  dataset: string;
  measurementMode: string;
  x: GrowthAxis;
  y: GrowthAxis;
  percentiles: number[];
  source: string;
}
export interface GrowthEvaluation {
  zScore: number;
  percentile: number | null;
  percentileLimit?: '<0.135' | '>99.865';
}
export interface GrowthObservation {
  source: 'BIRTH' | 'ENCOUNTER';
  encounterId: number | null;
  date: string;
  ageDays: number;
  ageFormatted: string;
  weightKg: number | null;
  heightCm: number | null;
  headCircumferenceCm: number | null;
  measurementMode: MeasurementMode;
}
export interface PatientGrowthPoint extends GrowthObservation {
  x: number;
  value: number;
  evaluation: GrowthEvaluation | null;
  adjustmentCm?: number;
  note?: string;
}
export interface GrowthCurvePoint {
  x: number;
  values: number[];
}
export interface GrowthReferenceChart {
  definition: GrowthChartDefinition;
  curves: GrowthCurvePoint[];
  provenance: Record<string, unknown>;
}
export interface PatientGrowthChart extends GrowthReferenceChart {
  applicable: boolean;
  points: PatientGrowthPoint[];
  omitted: number;
}
export interface PatientGrowthResponse {
  patientId: number;
  birthDate: string;
  asOfDate: string;
  ageDays: number;
  ageFormatted: string;
  referenceSex: BiologicalSex | '';
  sexSource: 'SYSTEM_SEX' | 'VIEW_CONFIRMATION' | '';
  status: 'READY' | 'INVALID_BIRTH_DATE' | 'REFERENCE_SEX_REQUIRED';
  observations: GrowthObservation[];
  charts: PatientGrowthChart[];
}
