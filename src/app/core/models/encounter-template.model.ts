import { WizardFormDefinition } from './wizard-definition.model';
import { SpecialtySummary } from './specialty.model';

export interface EncounterTemplate {
  id: number;
  workspaceId: number;
  specialtyContextId: number;
  name: string;
  formDefinition: WizardFormDefinition;
  sourceDefaultCode: string | null;
  displayOrder: number;
  version: number;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DefaultEncounterTemplateInfo {
  code: string;
  name: string;
  description: string;
  installed: boolean;
}

export interface EncounterTemplatesResponse {
  specialtyContextId: number;
  specialty: SpecialtySummary;
  templates: EncounterTemplate[];
  archivedTemplates: EncounterTemplate[];
  systemDefaults: DefaultEncounterTemplateInfo[];
}

export interface CreateEncounterTemplateRequest {
  name: string;
  sourceTemplateId?: number;
  formDefinition?: WizardFormDefinition;
}

export interface UpdateEncounterTemplateRequest {
  expectedVersion: number;
  name: string;
  formDefinition: WizardFormDefinition;
}
