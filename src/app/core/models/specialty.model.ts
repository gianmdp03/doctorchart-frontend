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
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  isSystem?: boolean;
  active?: boolean;
  specialty?: MedicalSpecialty | string;
  displayName?: string;
}

export interface CreateSpecialtyRequest {
  code?: string;
  name: string;
  description?: string;
}

export interface SpecialtyOption {
  value: MedicalSpecialty;
  label: string;
}

export const SPECIALTY_OPTIONS: SpecialtyOption[] = [
  { value: 'GENERAL_MEDICINE', label: 'Medicina General / Familiar' },
  { value: 'PEDIATRICS', label: 'Pediatría y Puericultura' },
  { value: 'CARDIOLOGY', label: 'Cardiología' },
  { value: 'OPHTHALMOLOGY', label: 'Oftalmología' },
  { value: 'GYNECOLOGY', label: 'Ginecología y Obstetricia' },
  { value: 'PSYCHIATRY', label: 'Salud Mental y Psiquiatría' },
  { value: 'TRAUMATOLOGY', label: 'Traumatología y Ortopedia' },
  { value: 'DERMATOLOGY', label: 'Dermatología' },
  { value: 'NEUROLOGY', label: 'Neurología' },
  { value: 'ENDOCRINOLOGY', label: 'Endocrinología y Metabolismo' },
  { value: 'ONCOLOGY', label: 'Oncología Clínica' },
  { value: 'UROLOGY', label: 'Urología' },
  { value: 'GASTROENTEROLOGY', label: 'Gastroenterología' },
];

