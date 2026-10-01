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
    title: 'Datos familiares y tutores',
    description: 'Configurá los datos de los padres, hermanos y responsables del paciente.',
  },
  {
    id: 'encounter-form',
    onboardingStep: 'ENCOUNTER_FORM',
    title: 'Historia Clínica',
    description: 'Personalizá la información clínica que registrarás en cada consulta e historia clínica.',
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
    fields: [
      { key: 'maternalDiseases', label: 'Enfermedades de la madre', type: 'TEXT' },
      { key: 'paternalDiseases', label: 'Enfermedades del padre', type: 'TEXT' },
      { key: 'siblingDiseases', label: 'Enfermedades de hermanos', type: 'TEXT' },
    ],
  },
  {
    onboardingStep: 'PATIENT_GUARDIANS',
    categoryKey: 'PATIENT_GUARDIANS',
    title: 'DATOS FAMILIARES Y TUTORES',
    fields: [
      {
        key: 'primaryGuardian',
        label: 'Quién es el tutor / responsable principal',
        type: 'SELECT',
        options: [
          { value: 'Madre', label: 'Madre' },
          { value: 'Padre', label: 'Padre' },
          { value: 'Ambos', label: 'Ambos' },
          { value: 'Abuelo/a', label: 'Abuelo/a' },
          { value: 'Tutor Legal / Otro', label: 'Tutor Legal / Otro' },
        ],
      },
      { key: 'motherFullName', label: 'Nombre de la madre', type: 'TEXT' },
      { key: 'fatherFullName', label: 'Nombre del padre', type: 'TEXT' },
      { key: 'primaryContactPhone', label: 'Teléfono de contacto principal', type: 'TEXT' },
      { key: 'hasSiblings', label: '¿Tiene hermanos?', type: 'BOOLEAN' },
      { key: 'siblingsCount', label: 'Cantidad de hermanos', type: 'NUMBER' },
      { key: 'siblingOrder', label: 'Lugar que ocupa entre hermanos', type: 'NUMBER' },
      {
        key: 'livingArrangement',
        label: 'Convivencia / Con quién vive',
        type: 'SELECT',
        options: [
          { value: 'Ambos padres', label: 'Ambos padres' },
          { value: 'Solo con la madre', label: 'Solo con la madre' },
          { value: 'Solo con el padre', label: 'Solo con el padre' },
          { value: 'Cuidado compartido', label: 'Cuidado compartido' },
          { value: 'Otros familiares', label: 'Otros familiares' },
        ],
      },
    ],
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
