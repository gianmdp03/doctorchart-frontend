import { ClinicalFormRecord } from './wizard-definition.model';

/** Test records must use the same persisted contract as the server. */
export const clinicalFormFixture = (): ClinicalFormRecord => ({
  version: 0, workspaceVersion: 4, formValues: {}, formulaResults: {},
  formDefinitionSnapshot: { categories: [] }, formulaContext: {},
});
