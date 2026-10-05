import { SpecialtySummary } from './specialty.model';
import { ClinicalFormRecord, WizardFormValues } from './wizard-definition.model';

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
  workspaceVersion: number;
  encounterDate: string;
  consultationType: ConsultationType;
  values: WizardFormValues;
}
export interface ClinicalEncounterUpdateRequest {
  expectedVersion: number;
  encounterDate: string;
  consultationType: ConsultationType;
  values: WizardFormValues;
}
export interface ClinicalEncounterDetail extends ClinicalEncounterList {
  physicalExamination?: string | null;
  secondaryDiagnoses?: DiagnosisItem[] | null;
  clinicalImpression?: string | null;
  diagnosticOrders?: string[] | null;
}
export interface ClinicalEncounterList extends ClinicalFormRecord {
  id: number;
  patientId: number;
  patientFullName?: string | null;
  encounterDate: string;
  specialtyId: number;
  specialty: SpecialtySummary;
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
}

export interface ClinicalEncounterDashboard {
  encountersThisMonth: number;
  encountersToday: number;
  recentEncounters: ClinicalEncounterList[];
}
