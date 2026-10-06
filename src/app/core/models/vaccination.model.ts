import { PatientDetailDTO } from './patient.model';
export type VaccinationStatus = 'APLICADA' | 'PENDIENTE' | 'ACTUAL' | 'FUTURA';
export interface PatientVaccinationDose {
  id: string;
  calendarId: string;
  vaccineId: string;
  vaccineName: string;
  doseLabel: string;
  dueFrom: number;
  dueTo: number;
  dueAgeLabel: string;
  status: VaccinationStatus;
  appliedAt: string | null;
}
export interface PatientVaccinationSchedule {
  patientId: number;
  patientVersion: number;
  calendarId: string;
  asOfDate: string;
  ageInMonths: number;
  ageLabel: string;
  doses: PatientVaccinationDose[];
}
export interface VaccinationUpdateRequest {
  expectedVersion: number;
  calendarId: string;
  applied: boolean;
  appliedAt?: string | null;
}
export interface SavedPatientVaccination {
  patient: PatientDetailDTO;
  schedule: PatientVaccinationSchedule;
}
