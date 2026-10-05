/** Canonical v1 JSON contract in backend docs/specialty-wizard. No specialty-specific defaults. */
export type WizardFieldType = 'TEXT' | 'TEXTAREA' | 'NUMBER' | 'DATE' | 'SELECT' | 'BOOLEAN' | 'FORMULA';
export type WizardBinding =
  | 'patient.fullName'
  | 'patient.firstName'
  | 'patient.lastName'
  | 'patient.birthDate'
  | 'patient.nationalId'
  | 'patient.gender'
  | 'patient.bloodType'
  | 'patient.phone'
  | 'patient.email'
  | 'patient.address'
  | 'patient.guardianInfo.fatherFullName'
  | 'patient.guardianInfo.motherFullName'
  | 'patient.guardianInfo.primaryGuardian'
  | 'patient.guardianInfo.primaryContactPhone'
  | 'patient.guardianInfo.hasSiblings'
  | 'patient.guardianInfo.siblingsCount'
  | 'patient.guardianInfo.siblingOrder'
  | 'patient.guardianInfo.livingArrangement'
  | 'patient.familyHistory.paternalDiseases'
  | 'patient.familyHistory.maternalDiseases'
  | 'patient.familyHistory.siblingDiseases'
  | 'encounter.chiefComplaint'
  | 'encounter.historyOfPresentIllness'
  | 'encounter.physicalExamination'
  | 'encounter.primaryDiagnosisDescription'
  | 'encounter.treatmentPlan'
  | 'encounter.followUpInstructions'
  | 'encounter.followUpDate'
  | 'encounter.weightKg'
  | 'encounter.heightCm'
  | 'encounter.headCircumferenceCm';
export type WizardFormulaKind = 'IMC' | 'BSA' | 'TFGE' | 'COCKCROFT' | 'CALCIO_CORREGIDO' | 'CUSTOM';
export type WizardFormulaOperation = 'ADD' | 'SUBTRACT' | 'MULTIPLY' | 'DIVIDE' | 'AVERAGE';
export type WizardFormulaContext = 'patient.ageYears' | 'patient.gender' | 'patient.latestWeightKg' | 'patient.latestHeightCm';
export type WizardFormulaInput =
  | { fieldKey: string; context?: never; constant?: never }
  | { context: WizardFormulaContext; fieldKey?: never; constant?: never }
  | { constant: number; fieldKey?: never; context?: never };
export interface WizardFormulaDefinition {
  kind: WizardFormulaKind;
  inputs: Record<string, WizardFormulaInput>;
  operation?: WizardFormulaOperation;
}
export interface WizardFieldOption { value: string; label: string; }
export interface WizardFieldDefinition {
  key: string;
  label: string;
  type: WizardFieldType;
  required: boolean;
  placeholder?: string | null;
  binding?: WizardBinding | null;
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
  fields: WizardFieldDefinition[];
}
export interface WizardFormDefinition { categories: WizardCategoryDefinition[]; }
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
