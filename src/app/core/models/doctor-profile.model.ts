import { SpecialtySummary } from './specialty.model';

export interface DoctorProfile {
  id: number;
  userId: string;
  specialty: SpecialtySummary;
  isSpecialtyLocked: boolean;
  createdAt: string;
}
