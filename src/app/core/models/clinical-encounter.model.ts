import { AnthropometricMeasurements } from './clinical-records.model';
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
  consultationType: ConsultationType;
  values: WizardFormValues;
}
export interface ClinicalEncounterUpdateRequest {
  expectedVersion: number;
  encounterDate?: string;
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
  measurements?: AnthropometricMeasurements | null;
  vitalSigns?: VitalSigns | null;
  prescriptions?: PrescriptionItem[] | null;
  historyOfPresentIllness?: string | null;
  treatmentPlan?: string | null;
  followUpInstructions?: string | null;
  followUpDate?: string | null;
}

export interface DashboardRecentEncounter {
  encounter: ClinicalEncounterList;
  patientAgeLabel: string;
  patientNationalId: string | null;
  encounterLocalDate: string;
}
export interface ClinicalEncounterDashboard {
  totalPatients: number;
  asOfDate: string;
  encountersThisMonth: number;
  encountersToday: number;
  recentEncounters: DashboardRecentEncounter[];
  upcomingFollowUps: UpcomingFollowUp[];
}

export interface UpcomingFollowUp {
  encounterId: number;
  patientId: number;
  patientFullName: string;
  followUpDate: string;
}
