import { SpecialtySummary } from './specialty.model';
import { WizardDefinition } from './wizard-definition.model';

/** Admin catalog identity version is independent of its wizard resource version. */
export interface SpecialtyDetail extends SpecialtySummary {
  active: boolean;
  version: number;
}
export interface WizardDefaultDetail {
  specialtyId: number;
  version: number;
  publishedVersion: number;
  draftDefinition: WizardDefinition;
  publishedDefinition: WizardDefinition | null;
}
export interface CreateSpecialtyDraftRequest {
  code: string;
  name: string;
  description?: string | null;
  definition: WizardDefinition;
}
export interface UpdateSpecialtyRequest {
  expectedVersion: number;
  name?: string;
  description?: string | null;
  active?: boolean;
}
export interface SaveWizardDefaultDraftRequest {
  expectedVersion: number;
  definition: WizardDefinition;
}
