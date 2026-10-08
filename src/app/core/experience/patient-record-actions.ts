import { PatientRecordActionId } from '../models/specialty-experience.model';

export interface RecordActionPresentation {
  id: PatientRecordActionId;
  primary?: { label: string; icon: string; css: string; title?: string };
}

/** Implemented presentation only; the backend selects and orders actions. */
export const PATIENT_RECORD_ACTIONS: Record<PatientRecordActionId, RecordActionPresentation> = {
  EDIT_PATIENT: {
    id: 'EDIT_PATIENT',
    primary: {
      label: 'Editar datos',
      icon: 'lucideUser',
      css: 'btn-secondary-edit',
      title: 'Editar datos filiatorios y clínicos del paciente',
    },
  },
  NEW_ENCOUNTER: {
    id: 'NEW_ENCOUNTER',
    primary: { label: 'Nueva historia clínica', icon: 'lucidePlus', css: 'btn-primary-soap' },
  },
  VIEW_GROWTH: {
    id: 'VIEW_GROWTH',
  },
  PRINT_DOCUMENT: {
    id: 'PRINT_DOCUMENT',
  },
};
