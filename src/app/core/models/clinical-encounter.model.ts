import { MedicalSpecialty } from './specialty.model';

export type ConsultationType =
  | 'FIRST_VISIT'
  | 'FOLLOW_UP'
  | 'ROUTINE_CHECKUP'
  | 'EMERGENCY'
  | 'INTERCONSULTATION';

export interface VitalSigns {
  systolicBloodPressure?: number | null;
  diastolicBloodPressure?: number | null;
  heartRate?: number | null;
  respiratoryRate?: number | null;
  temperatureCelsius?: number | null;
  oxygenSaturationPercent?: number | null;
  weightKg?: number | null;
  heightCm?: number | null;
  headCircumferenceCm?: number | null;
  bodyMassIndex?: number | null;
}

export interface PrescriptionItem {
  medicationName: string;
  dosage: string;
  administrationRoute: string;
  frequency: string;
  durationDays?: number | null;
  instructions?: string;
}

export interface DiagnosisItem {
  code: string;
  description: string;
  isChronic?: boolean;
}

export interface ClinicalEncounterRequest {
  patientId: number;
  encounterDate: string;
  specialty: MedicalSpecialty;
  consultationType: ConsultationType;

  // S - Subjective
  chiefComplaint?: string | null;
  historyOfPresentIllness?: string;

  // O - Objective
  vitalSigns?: VitalSigns;
  physicalExamination?: string;
  peso?: number | null;
  talla?: number | null;
  perimetroEncefalico?: number | null;

  // A - Assessment
  primaryDiagnosisCode?: string | null;
  primaryDiagnosisDescription?: string | null;
  secondaryDiagnoses?: DiagnosisItem[];
  clinicalImpression?: string;

  templateId?: number | null;
  dynamicData?: Record<string, unknown>;
  snapshotFieldLabels?: Record<string, string>;

  // P - Plan
  treatmentPlan?: string;
  prescriptions?: PrescriptionItem[];
  diagnosticOrders?: string[];
  followUpInstructions?: string;
  followUpDate?: string;
}

export interface ClinicalEncounterDetail extends ClinicalEncounterRequest {
  id: number;
  patientFullName: string;
}

export interface ClinicalEncounterList {
  id: number;
  patientId: number;
  patientFullName?: string | null;
  encounterDate: string;
  specialty: MedicalSpecialty;
  consultationType: ConsultationType;
  chiefComplaint?: string | null;
  primaryDiagnosisCode?: string | null;
  primaryDiagnosisDescription?: string | null;
  peso?: number | null;
  talla?: number | null;
  perimetroEncefalico?: number | null;
  vitalSigns?: VitalSigns | null;
  prescriptions?: PrescriptionItem[] | null;
  historyOfPresentIllness?: string | null;
  treatmentPlan?: string | null;
  followUpInstructions?: string | null;
  followUpDate?: string | null;
  dynamicData?: Record<string, unknown> | null;
  snapshotFieldLabels?: Record<string, string> | null;
}

export interface ClinicalEncounterDashboard {
  encountersThisMonth: number;
  encountersToday: number;
  recentEncounters: ClinicalEncounterList[];
}
