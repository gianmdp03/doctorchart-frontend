import {
  FormCategoryGroup,
  FormCategoryKey,
  FormFieldDefinition,
  FormTemplate,
  FormTemplateSchema,
  OnboardingStep,
} from '../models/workspace.model';

export interface OnboardingWizardStepDefinition {
  id: string;
  onboardingStep: Exclude<OnboardingStep, 'COMPLETED'>;
  title: string;
  description: string;
}

export interface PatientFormSectionDefinition {
  onboardingStep: Extract<OnboardingStep, 'PATIENT_PERSONAL_DATA' | 'PATIENT_FAMILY_HISTORY' | 'PATIENT_GUARDIANS'>;
  categoryKey: FormCategoryKey;
  title: string;
  fields: readonly FormFieldDefinition[];
}

/**
 * Single source of truth for the setup flow. Adding a new wizard screen means
 * adding one entry here and, when it is a form section, one below.
 */
export const ONBOARDING_WIZARD_STEPS: readonly OnboardingWizardStepDefinition[] = [
  {
    id: 'specialty',
    onboardingStep: 'SPECIALTY',
    title: 'Especialidad médica',
    description: 'Elegí la especialidad principal con la que vas a atender.',
  },
  {
    id: 'personal-data',
    onboardingStep: 'PATIENT_PERSONAL_DATA',
    title: 'Datos personales',
    description: 'Definí los datos que pedirás al crear un paciente.',
  },
  {
    id: 'family-history',
    onboardingStep: 'PATIENT_FAMILY_HISTORY',
    title: 'Antecedentes familiares',
    description: 'Agregá los antecedentes que necesitás registrar.',
  },
  {
    id: 'guardians',
    onboardingStep: 'PATIENT_GUARDIANS',
    title: 'Datos del tutor/tutores',
    description: 'Configurá los datos de las personas responsables del paciente.',
  },
  {
    id: 'encounter-form',
    onboardingStep: 'ENCOUNTER_FORM',
    title: 'Formulario de consulta',
    description: 'Personalizá la información clínica que registrarás en cada consulta.',
  },
];

/**
 * Default patient sections. Empty sections are intentional: the clinician
 * chooses which fields are clinically useful for their practice.
 */
export const PATIENT_FORM_SECTIONS: readonly PatientFormSectionDefinition[] = [
  {
    onboardingStep: 'PATIENT_PERSONAL_DATA',
    categoryKey: 'CORE_DEMOGRAPHICS',
    title: 'DATOS PERSONALES',
    fields: [
      { key: 'firstName', label: 'Nombre', type: 'TEXT', required: true },
      { key: 'lastName', label: 'Apellido', type: 'TEXT', required: true },
      { key: 'nationalId', label: 'DNI', type: 'TEXT', required: true },
      { key: 'birthDate', label: 'Fecha de nacimiento', type: 'DATE', required: true },
      {
        key: 'gender',
        label: 'Sexo',
        type: 'SELECT',
        required: true,
        options: [
          { value: 'MALE', label: 'Hombre' },
          { value: 'FEMALE', label: 'Mujer' },
          { value: 'OTHER', label: 'Otro' },
        ],
      },
      { key: 'address', label: 'Dirección', type: 'TEXT' },
      { key: 'phone', label: 'Número de teléfono', type: 'TEXT' },
      { key: 'nationality', label: 'Nacionalidad', type: 'TEXT' },
    ],
  },
  {
    onboardingStep: 'PATIENT_FAMILY_HISTORY',
    categoryKey: 'BACKGROUND_FAMILY',
    title: 'ANTECEDENTES FAMILIARES',
    fields: [],
  },
  {
    onboardingStep: 'PATIENT_GUARDIANS',
    categoryKey: 'PATIENT_GUARDIANS',
    title: 'DATOS DEL TUTOR/TUTORES',
    fields: [],
  },
];

export function createDefaultPatientFormSchema(): FormTemplateSchema {
  return {
    categories: PATIENT_FORM_SECTIONS.map(createCategory),
  };
}

export function createDefaultPatientFormTemplate(
  specialtyId?: number | null,
  specialtyDisplayName?: string | null,
): FormTemplate {
  return {
    specialtyId: specialtyId ?? null,
    specialtyDisplayName: specialtyDisplayName ?? null,
    name: 'Formulario de paciente',
    templateType: 'PATIENT_EXTRA',
    isDefault: true,
    schemaDefinition: createDefaultPatientFormSchema(),
  };
}

function createCategory(section: PatientFormSectionDefinition): FormCategoryGroup {
  return {
    categoryKey: section.categoryKey,
    title: section.title,
    enabled: true,
    fields: section.fields.map((field) => ({
      ...field,
      options: field.options?.map((option) => ({ ...option })),
    })),
  };
}
