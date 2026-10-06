import {
  AnthropometricMeasurements,
  FamilyHistory,
  GuardianInfo,
  ImmunizationAndNutrition,
  PerinatalHistory,
  PersonalHistory,
} from './clinical-records.model';
import { ClinicalFormRecord, WizardFormValues } from './wizard-definition.model';

export interface InsuranceInfo {
  providerName?: string | null;
  planName?: string | null;
  affiliateNumber?: string | null;
}

export interface PatientRequestDTO {
  workspaceVersion: number;
  values: WizardFormValues;
}
export interface PatientUpdateRequestDTO { expectedVersion: number; values: WizardFormValues; }

export interface PatientDetailDTO extends ClinicalFormRecord {
  id: number;
  fullName: string;
  birthDate: string;
  nationalId?: string | null;
  gender?: string | null;
  bloodType?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  emergencyContact?: any | null;
  insuranceInfo?: InsuranceInfo | null;
  allergies?: string[] | null;
  chronicConditions?: string[] | null;
  guardianInfo?: GuardianInfo | null;
  perinatalHistory?: PerinatalHistory | null;
  personalHistory?: PersonalHistory | null;
  familyHistory?: FamilyHistory | null;
  immunizationAndNutrition?: ImmunizationAndNutrition | null;
  latestMeasurements?: AnthropometricMeasurements | null;
}

export interface PatientListDTO {
  id: number;
  fullName: string;
  birthDate: string;
  nationalId?: string | null;
  phone?: string | null;
  gender?: string | null;
  totalEncounters?: number | null;
  lastEncounterDate?: string | null;
}

