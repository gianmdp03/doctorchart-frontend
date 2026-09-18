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

/**
 * Data types supported for the 20% dynamic JSONB specialty payload fields.
 */
export type SpecialtyFieldType =
  | 'TEXT'
  | 'NUMBER'
  | 'SELECT'
  | 'MULTI_SELECT'
  | 'BOOLEAN'
  | 'DATE'
  | 'TEXTAREA';

export interface FieldOption {
  label: string;
  value: string;
}

export interface SpecialtyFieldDefinition {
  key: string;
  label: string;
  type: SpecialtyFieldType;
  required: boolean;
  placeholder?: string;
  unit?: string;
  minValue?: number;
  maxValue?: number;
  options?: FieldOption[];
  group?: string;
}

export interface SpecialtySchema {
  specialty: MedicalSpecialty;
  displayName: string;
  description: string;
  version: string;
  fields: SpecialtyFieldDefinition[];
}

export interface SpecialtySummary {
  specialty: MedicalSpecialty;
  displayName: string;
  description: string;
  fieldCount: number;
}
