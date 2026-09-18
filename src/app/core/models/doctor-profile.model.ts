import { MedicalSpecialty } from './specialty.model';

export interface DoctorProfile {
  id: number;
  userId: string;
  specialty: MedicalSpecialty;
  isSpecialtyLocked: boolean;
  createdAt: string;
}

export interface DoctorSpecialtyRequest {
  specialty: MedicalSpecialty;
}
