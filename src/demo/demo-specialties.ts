import rawCatalog from './data/specialties-catalog.json';
import { SpecialtySummary } from '../app/core/models/specialty.model';
import {
  ClinicalNavigationId,
  PatientRecordActionId,
  PatientRecordModuleId,
  SpecialtyExperience,
} from '../app/core/models/specialty-experience.model';
import { WizardDefinition } from '../app/core/models/wizard-definition.model';

export interface DemoSpecialtyCatalogEntry {
  id: number;
  code: string;
  name: string;
  description: string;
  navigation: ClinicalNavigationId[];
  patientRecordTabs: PatientRecordModuleId[];
  patientRecordActions: PatientRecordActionId[];
  definition: WizardDefinition;
}

export const DEMO_SPECIALTIES_CATALOG = rawCatalog as DemoSpecialtyCatalogEntry[];

export function getDemoSpecialtySummaries(): SpecialtySummary[] {
  return DEMO_SPECIALTIES_CATALOG.map(({ id, code, name, description }) => ({
    id,
    code,
    name,
    description,
  }));
}

export function findDemoSpecialty(idOrCode: number | string): DemoSpecialtyCatalogEntry {
  const found =
    typeof idOrCode === 'number'
      ? DEMO_SPECIALTIES_CATALOG.find((s) => s.id === idOrCode)
      : DEMO_SPECIALTIES_CATALOG.find((s) => s.code === idOrCode);
  return found ?? DEMO_SPECIALTIES_CATALOG[0];
}

export function demoSpecialtyExperience(entry: DemoSpecialtyCatalogEntry): SpecialtyExperience {
  return {
    specialtyId: entry.id,
    specialtyVersion: 1,
    navigation: [...entry.navigation],
    patientRecordTabs: [...entry.patientRecordTabs],
    // DemoChart disables manual patient demographic editing & annulment.
    patientRecordActions: entry.patientRecordActions.filter((action) => action !== 'EDIT_PATIENT'),
  };
}
