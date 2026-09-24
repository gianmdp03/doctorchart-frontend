/**
 * Supported field input types for dynamic clinical templates.
 */
export type FormFieldType = 'TEXT' | 'NUMBER' | 'DATE' | 'SELECT' | 'BOOLEAN' | 'TEXTAREA';

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormFieldDefinition {
  key: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string;
  options?: FormFieldOption[];
  unit?: string;
}

export type FormCategoryKey =
  | 'CORE_DEMOGRAPHICS'
  | 'CONTACT_AND_LOGISTICS'
  | 'BACKGROUND_FAMILY'
  | 'BACKGROUND_PERSONAL'
  | 'ALLERGIES_AND_TOXICS'
  | 'REASON_AND_ANAMNESIS'
  | 'VITAL_SIGNS_AND_SOMATOMETRY'
  | 'PHYSICAL_EXAMINATION'
  | 'DIAGNOSTIC_ASSESSMENT'
  | 'TREATMENT_AND_PRESCRIPTIONS'
  | 'SPECIALTY_SPECIFIC';

export interface FormCategoryGroup {
  categoryKey: FormCategoryKey | string;
  title: string;
  enabled: boolean;
  fields: FormFieldDefinition[];
}

export interface FormTemplateSchema {
  categories: FormCategoryGroup[];
}

export type TemplateType = 'PATIENT_EXTRA' | 'ENCOUNTER';

export interface FormTemplate {
  id?: number;
  userId?: string | null;
  specialtyId?: number | null;
  specialtyDisplayName?: string | null;
  name: string;
  templateType: TemplateType;
  isDefault: boolean;
  isSystem?: boolean;
  schemaDefinition: FormTemplateSchema;
  version?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChartSlotDefinition {
  slot: string;
  label: string;
  type: 'DATE' | 'NUMBER' | 'TEXT';
  suggestions?: string[];
}

export interface ChartDefinition {
  id: number;
  chartCode: string;
  title: string;
  chartType: 'LINE' | 'BAR' | 'PIE';
  description?: string;
  requiredSlots: ChartSlotDefinition[];
  isSystem: boolean;
}

export interface DoctorChartConfig {
  id?: number;
  chartCode: string;
  fieldMappings: Record<string, string>;
  isActive: boolean;
}

export interface ModuleConfig {
  APPOINTMENTS?: boolean;
  MEDICATION_CATALOG?: boolean;
  AI_ASSISTANT?: boolean;
  GROWTH_CHARTS?: boolean;
  [key: string]: boolean | undefined;
}

export type PatientColumnsConfig = Record<string, boolean>;

export interface WorkspaceSetup {
  id?: number | null;
  userId: string;
  specialtyId?: number | null;
  specialtyCode?: string | null;
  specialtyDisplayName?: string | null;
  onboardingCompleted: boolean;
  patientColumnsConfig: PatientColumnsConfig;
  modulesConfig: ModuleConfig;
  defaultEncounterTemplate?: FormTemplate | null;
  chartConfigs: DoctorChartConfig[];
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface FinishOnboardingRequest {
  specialtyId: number;
  patientColumnsConfig?: PatientColumnsConfig;
  modulesConfig?: ModuleConfig;
  defaultTemplateId?: number;
  customTemplateSchema?: FormTemplateSchema;
  chartConfigs?: DoctorChartConfig[];
}

export interface WorkspaceUpdateRequest {
  specialtyId?: number;
  patientColumnsConfig?: PatientColumnsConfig;
  modulesConfig?: ModuleConfig;
}
