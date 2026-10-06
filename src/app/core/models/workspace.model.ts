import { SpecialtyExperience } from './specialty-experience.model';
import { SpecialtySummary } from './specialty.model';
import { WizardDefinition, WizardStepKey } from './wizard-definition.model';

export interface WorkspaceSetup {
  id: number;
  version: number;
  specialty: SpecialtySummary;
  experience: SpecialtyExperience;
  sourceWizardVersion: number | null;
  draftSourceWizardVersion: number | null;
  onboardingCompleted: boolean;
  currentStepKey: WizardStepKey;
  definition: WizardDefinition | null;
  draftDefinition: WizardDefinition | null;
}
export interface SelectSpecialtyRequest { specialtyId: number; expectedVersion: number | null; }
export interface VersionRequest { expectedVersion: number; }
export interface SaveOnboardingDraftRequest extends VersionRequest {
  definition: WizardDefinition;
  currentStepKey: Exclude<WizardStepKey, 'completed'>;
}
export interface WorkspacePreferences {
  version: number;
  patientColumnsConfig: PatientColumnsConfig;
  quickNotes: string | null;
}
export type PatientColumnsConfig = Record<string, boolean>;
export interface WorkspaceUpdateRequest extends VersionRequest { patientColumnsConfig: PatientColumnsConfig; }
export interface QuickNotesUpdateRequest { content: string | null; }
