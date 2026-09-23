/**
 * 13 medical specialties supported by DoctorChart universal clinical architecture.
 */
export type MedicalSpecialty =
  | 'GENERAL_MEDICINE'
  | 'PEDIATRICS'
  | 'CARDIOLOGY'
  | 'OPHTHALMOLOGY'
  | 'GYNECOLOGY'
  | 'PSYCHIATRY'
  | 'TRAUMATOLOGY'
  | 'DERMATOLOGY'
  | 'NEUROLOGY'
  | 'ENDOCRINOLOGY'
  | 'ONCOLOGY'
  | 'UROLOGY'
  | 'GASTROENTEROLOGY';

export interface SpecialtySummary {
  specialty: MedicalSpecialty;
  displayName: string;
  description: string;
}
