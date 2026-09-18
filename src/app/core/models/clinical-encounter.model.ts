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
  chiefComplaint: string;
  historyOfPresentIllness?: string;

  // O - Objective
  vitalSigns?: VitalSigns;
  physicalExamination?: string;

  // A - Assessment
  primaryDiagnosisCode?: string | null;
  primaryDiagnosisDescription: string;
  secondaryDiagnoses?: DiagnosisItem[];
  clinicalImpression?: string;

  // P - Plan
  treatmentPlan?: string;
  prescriptions?: PrescriptionItem[];
  diagnosticOrders?: string[];
  followUpInstructions?: string;
  followUpDate?: string;

  // 20% Dynamic Specialty Payload
  specialtyData?: Record<string, any>;
}

export interface ClinicalEncounterDetail extends ClinicalEncounterRequest {
  id: number;
  patientFullName: string;
}

export interface ClinicalEncounterList {
  id: number;
  patientId: number;
  encounterDate: string;
  specialty: MedicalSpecialty;
  consultationType: ConsultationType;
  chiefComplaint: string;
  primaryDiagnosisCode?: string | null;
  primaryDiagnosisDescription: string;
}
