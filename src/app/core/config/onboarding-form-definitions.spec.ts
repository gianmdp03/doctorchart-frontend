import { describe, expect, it } from 'vitest';
import {
  createDefaultPatientFormSchema,
  createDefaultPatientFormTemplate,
  ONBOARDING_WIZARD_STEPS,
  PATIENT_FORM_SECTIONS,
} from './onboarding-form-definitions';

describe('onboarding form definitions', () => {
  it('provides the five configured wizard steps in their intended order', () => {
    expect(ONBOARDING_WIZARD_STEPS.map((step) => step.onboardingStep)).toEqual([
      'SPECIALTY',
      'PATIENT_PERSONAL_DATA',
      'PATIENT_FAMILY_HISTORY',
      'PATIENT_GUARDIANS',
      'ENCOUNTER_FORM',
    ]);
  });

  it('creates the requested default patient fields and configured sections', () => {
    const categories = createDefaultPatientFormSchema().categories;

    expect(categories[0].fields.map((field) => field.key)).toEqual([
      'firstName',
      'lastName',
      'nationalId',
      'birthDate',
      'gender',
      'address',
      'phone',
      'nationality',
    ]);
    expect(categories[1].fields.map((field) => field.key)).toEqual([
      'maternalDiseases',
      'paternalDiseases',
      'siblingDiseases',
    ]);
    expect(categories[2].fields.map((field) => field.key)).toEqual([
      'primaryGuardian',
      'motherFullName',
      'fatherFullName',
      'primaryContactPhone',
      'hasSiblings',
      'siblingsCount',
      'siblingOrder',
      'livingArrangement',
    ]);
    expect(PATIENT_FORM_SECTIONS).toHaveLength(3);
  });

  it('returns independent schemas so editing a draft cannot mutate defaults', () => {
    const firstDraft = createDefaultPatientFormSchema();
    firstDraft.categories[0].fields[0].label = 'Nombre editado';

    const secondDraft = createDefaultPatientFormTemplate(7, 'Pediatría');
    expect(secondDraft.schemaDefinition.categories[0].fields[0].label).toBe('Nombre');
    expect(secondDraft.specialtyId).toBe(7);
  });
});
