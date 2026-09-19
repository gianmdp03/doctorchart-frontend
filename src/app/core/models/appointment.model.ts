import { ConsultationType } from './clinical-encounter.model';
import { MedicalSpecialty } from './specialty.model';

export type AppointmentStatus =
  | 'SCHEDULED'
  | 'WAITING_ROOM'
  | 'IN_CONSULTATION'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW';

export interface AppointmentRequest {
  patientId: number;
  scheduledAt: string; // ISO date-time string
  durationMinutes?: number;
  specialty?: MedicalSpecialty;
  consultationType?: ConsultationType;
  reason?: string;
  notes?: string;
  status?: AppointmentStatus;
}

export interface AppointmentDetail {
  id: number;
  patientId: number;
  patientFullName: string;
  patientNationalId?: string | null;
  patientPhone?: string | null;
  doctorUserId: string;
  specialty: MedicalSpecialty;
  scheduledAt: string;
  durationMinutes: number;
  status: AppointmentStatus;
  consultationType: ConsultationType;
  reason?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

export interface AppointmentList {
  id: number;
  patientId: number;
  patientFullName: string;
  patientNationalId?: string | null;
  patientPhone?: string | null;
  doctorUserId: string;
  specialty: MedicalSpecialty;
  scheduledAt: string;
  durationMinutes: number;
  status: AppointmentStatus;
  consultationType: ConsultationType;
  reason?: string | null;
}

export interface AppointmentMetrics {
  waitingRoom: number;
  inConsultation: number;
  completed: number;
  scheduled: number;
}
