import { AnthropometricMeasurements } from './clinical-records.model';

export type CheckupReason = 'ROUTINE' | 'VACCINATION' | 'ILLNESS' | 'FOLLOW_UP' | 'OTHER';

export interface MedicalCheckupRequestDTO {
  patientId: number;
  checkupDate: string; // ISO format YYYY-MM-DD
  reason: CheckupReason;
  measurements?: AnthropometricMeasurements | null;
}

export interface MedicalCheckupDetailDTO {
  id: number;
  patientId: number;
  patientFullName: string;
  checkupDate: string;
  reason: CheckupReason;
  measurements?: AnthropometricMeasurements | null;
}

export interface MedicalCheckupListDTO {
  id: number;
  patientId: number;
  checkupDate: string;
  reason: CheckupReason;
}
