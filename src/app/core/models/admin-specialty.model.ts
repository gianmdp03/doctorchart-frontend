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

export interface TemplateReviewDecision {
  id: number;
  revision: number;
  fingerprint: string;
  actor: string;
  kind: 'CLINICAL' | 'SYNTHETIC';
  reference: string;
  occurredAt: string;
  revokedBy: string | null;
  revokedAt: string | null;
  revocationReason: string | null;
}
export interface TemplateReviewStatus {
  revision: number;
  fingerprint: string;
  draftState: 'PENDING' | 'APPROVED' | 'PUBLISHED' | 'BLOCKED';
  publicationState: 'UNPUBLISHED' | 'LEGACY' | 'APPROVED' | 'REVOKED' | 'BLOCKED';
  canApprove: boolean;
  canPublish: boolean;
  canActivate: boolean;
  publishedApprovalId: number | null;
  history: TemplateReviewDecision[];
  nextBefore: number | null;
}
