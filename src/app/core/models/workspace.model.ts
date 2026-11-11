import { SpecialtyExperience } from './specialty-experience.model';
import { SpecialtySummary } from './specialty.model';
import { WizardDefinition, WizardStepKey } from './wizard-definition.model';

export interface WorkspaceSetup {
  id: number;
  specialtyContextId: number;
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
export interface SpecialtyContextSummary {id:number;workspaceId:number;version:number;specialty:SpecialtySummary;onboardingCompleted:boolean;ready:boolean;hasDraft:boolean;}
export interface SelectSpecialtyRequest { specialtyId: number; expectedVersion: number | null; specialtyContextId?: number; }
export interface VersionRequest { expectedVersion: number; }
export interface ContextVersionRequest extends VersionRequest { specialtyContextId?: number; }
export interface SaveOnboardingDraftRequest extends ContextVersionRequest {
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
