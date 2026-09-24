import {
  AnthropometricMeasurements,
  FamilyHistory,
  GuardianInfo,
  ImmunizationAndNutrition,
  PerinatalHistory,
  PersonalHistory,
} from './clinical-records.model';
import { MedicalCheckupListDTO } from './checkup.model';
import { FormTemplateSchema } from './workspace.model';

export interface InsuranceInfo {
  providerName?: string | null;
  planName?: string | null;
  affiliateNumber?: string | null;
}

export interface PatientRequestDTO {
  fullName: string;
  birthDate: string; // ISO format YYYY-MM-DD
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
  patientExtraData?: Record<string, any> | null;
  patientFormData?: Record<string, any> | null;
  patientTemplateSnapshot?: FormTemplateSchema | null;
  guardianInfo?: GuardianInfo | null;
  perinatalHistory?: PerinatalHistory | null;
  personalHistory?: PersonalHistory | null;
  familyHistory?: FamilyHistory | null;
  immunizationAndNutrition?: ImmunizationAndNutrition | null;
  latestMeasurements?: AnthropometricMeasurements | null;
}

export interface PatientDetailDTO {
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
  patientExtraData?: Record<string, any> | null;
  patientFormData?: Record<string, any> | null;
  patientTemplateSnapshot?: FormTemplateSchema | null;
  guardianInfo?: GuardianInfo | null;
  perinatalHistory?: PerinatalHistory | null;
  personalHistory?: PersonalHistory | null;
  familyHistory?: FamilyHistory | null;
  immunizationAndNutrition?: ImmunizationAndNutrition | null;
  latestMeasurements?: AnthropometricMeasurements | null;
  checkups?: MedicalCheckupListDTO[];
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

