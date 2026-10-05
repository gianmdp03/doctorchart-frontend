import { WizardDefinition } from './wizard-definition.model';

export interface SpecialtySummary {
  id: number;
  code: string;
  name: string;
  description: string | null;
}
export interface PublishedWizard {
  specialty: SpecialtySummary;
  publishedVersion: number;
  definition: WizardDefinition;
}
