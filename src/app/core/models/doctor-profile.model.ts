import { SpecialtySummary } from './specialty.model';

export interface DoctorProfile {
  id: number;
  userId: string;
  specialty: SpecialtySummary;
  isSpecialtyLocked: boolean;
  createdAt: string;
  professionalLicense?: string;
  licenseConfigured?: boolean;
  hasClinicLogo?: boolean;
  clinicLogoSha256?: string | null;
}

export interface PrintIdentity {
  professionalLicense: string;
  licenseConfigured: boolean;
  hasLogo: boolean;
  logoSha256: string | null;
  logoWidth: number | null;
  logoHeight: number | null;
  updatedAt: string | null;
}
