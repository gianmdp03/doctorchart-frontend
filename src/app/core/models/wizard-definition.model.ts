import historyCategory from './clinical-history-category.json';
/** Canonical v1 JSON contract in backend docs/specialty-wizard. No specialty-specific defaults. */
export type WizardFieldType =
  'TEXT' | 'TEXTAREA' | 'NUMBER' | 'DATE' | 'SELECT' | 'BOOLEAN' | 'FORMULA';
export type WizardFormulaKind =
  'IMC' | 'BSA' | 'TFGE' | 'COCKCROFT' | 'CALCIO_CORREGIDO' | 'CUSTOM';
export type WizardFormulaOperation = 'ADD' | 'SUBTRACT' | 'MULTIPLY' | 'DIVIDE' | 'AVERAGE';
export type WizardFormulaContext =
  'patient.ageYears' | 'patient.gender' | 'patient.latestWeightKg' | 'patient.latestHeightCm';
export type WizardFormulaInput =
  | { fieldKey: string; context?: never; constant?: never }
  | { context: WizardFormulaContext; fieldKey?: never; constant?: never }
  | { constant: number; fieldKey?: never; context?: never };
export interface WizardFormulaDefinition {
  kind: WizardFormulaKind;
  inputs: Record<string, WizardFormulaInput>;
  operation?: WizardFormulaOperation;
}
export interface WizardFieldOption {
  value: string;
  label: string;
}
export interface WizardFieldDefinition {
  key: string;
  label: string;
  type: WizardFieldType;
  required: boolean;
  system?: boolean;
  placeholder?: string | null;
  unit?: string;
  options?: WizardFieldOption[];
  minimum?: number;
  maximum?: number;
  visibleWhen?: { fieldKey: string; equals: boolean };
  formula?: WizardFormulaDefinition;
}
export interface WizardCategoryDefinition {
  key: string;
  title: string;
  enabled: boolean;
  system?: boolean;
  fields: WizardFieldDefinition[];
}
export interface WizardFormDefinition {
  categories: WizardCategoryDefinition[];
}
export interface WizardModulesConfig {
  MEDICATION_CATALOG: boolean;
  AI_ASSISTANT: boolean;
  GROWTH_CHARTS: boolean;
}
export interface WizardDefinition {
  schemaVersion: 1;
  patientForm: WizardFormDefinition;
  encounterForm: WizardFormDefinition;
  modulesConfig: WizardModulesConfig;
}
export type WizardStepKey = 'specialty' | 'encounter' | 'completed' | `patient:${string}`;
export type WizardSection = 'patientForm' | 'encounterForm';
export type WizardValue = string | number | boolean | null;
export type WizardFormValues = Record<string, WizardValue>;
export interface WizardFormulaResult {
  value: number | null;
  status: 'READY' | 'MISSING_INPUT' | 'DIVISION_BY_ZERO' | 'NOT_APPLICABLE' | 'INVALID_INPUT';
}
export type WizardFormulaResults = Record<string, WizardFormulaResult>;
export interface ClinicalFormRecord {
  version: number;
  workspaceVersion: number;
  formValues: WizardFormValues;
  formulaResults: WizardFormulaResults;
  formDefinitionSnapshot: WizardFormDefinition;
  formulaContext: Record<string, WizardValue>;
}

export const createSystemPatientProfileCategory = (): WizardCategoryDefinition => ({
  key: 'sys_patient_profile',
  title: 'Datos Personales',
  enabled: true,
  system: true,
  fields: [
    {
      key: 'sys_firstName',
      label: 'Nombre',
      type: 'TEXT',
      required: true,
      system: true,
    },
    {
      key: 'sys_lastName',
      label: 'Apellido',
      type: 'TEXT',
      required: true,
      system: true,
    },
    {
      key: 'sys_dni',
      label: 'DNI',
      type: 'TEXT',
      required: true,
      system: true,
    },
    {
      key: 'sys_dob',
      label: 'Fecha de nacimiento',
      type: 'DATE',
      required: true,
      system: true,
    },
    {
      key: 'sys_sex',
      label: 'Sexo',
      type: 'SELECT',
      required: true,
      system: true,
      options: [
        { value: 'MALE', label: 'Masculino' },
        { value: 'FEMALE', label: 'Femenino' },
        { value: 'OTHER', label: 'Otro' },
        { value: 'UNKNOWN', label: 'Sin información' },
      ],
    },
    {
      key: 'sys_phone',
      label: 'Teléfono',
      type: 'TEXT',
      required: false,
      system: true,
    },
    {
      key: 'sys_email',
      label: 'Email',
      type: 'TEXT',
      required: false,
      system: true,
    },
    {
      key: 'sys_insurance',
      label: 'Obra social / Cobertura',
      type: 'TEXT',
      required: false,
      system: true,
    },
  ],
});

export const createDefaultWizardDefinition = (): WizardDefinition => ({
  schemaVersion: 1,
  patientForm: {
    categories: [createSystemPatientProfileCategory(), createClinicalHistoryCategory()],
  },
  encounterForm: {
    categories: [createClinicalHistoryCategory()],
  },
  modulesConfig: {
    MEDICATION_CATALOG: false,
    AI_ASSISTANT: false,
    GROWTH_CHARTS: false,
  },
});

export const createClinicalHistoryCategory = (): WizardCategoryDefinition =>
  structuredClone(historyCategory) as WizardCategoryDefinition;
export const withClinicalHistory = (form: WizardFormDefinition): WizardFormDefinition => ({
  ...form,
  categories: form.categories.some((c) => c.key === 'sys_clinical_history')
    ? form.categories
    : [...form.categories, createClinicalHistoryCategory()],
});
export const CLINICAL_HISTORY_GROUPS = [
  {
    status: 'sys_allergyStatus',
    details: 'sys_allergies',
    kind: 'ALLERGY',
    title: 'Alergias',
    icon: 'lucideShieldAlert',
    hint: 'Sustancias y reacciones conocidas.',
  },
  {
    status: 'sys_conditionStatus',
    details: 'sys_conditions',
    kind: 'PROBLEM',
    title: 'Problemas de salud',
    icon: 'lucideHeartPulse',
    hint: 'Enfermedades o condiciones en seguimiento.',
  },
  {
    status: 'sys_medicationStatus',
    details: 'sys_medications',
    kind: 'MEDICATION',
    title: 'Medicación habitual',
    icon: 'lucidePill',
    hint: 'Tratamientos que utiliza actualmente.',
  },
] as const;
export const clinicalHistoryValid = (values: WizardFormValues): boolean =>
  CLINICAL_HISTORY_GROUPS.every((g) => {
    const details = String(values[g.details] ?? '').trim();
    return details.length <= 4000 && (values[g.status] === 'PRESENT' ? !!details : !details);
  });
