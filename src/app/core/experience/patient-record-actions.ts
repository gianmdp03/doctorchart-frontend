import { PatientRecordActionId } from '../models/specialty-experience.model';

export interface RecordActionPresentation {
  id: PatientRecordActionId;
  primary?: { label: string; icon: string; css: string; title?: string };
  menu?: { label: string; icon: string; iconCss: string };
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
    menu: { label: 'Editar datos del paciente', icon: 'lucideUser', iconCss: 'text-slate-500' },
  },
  NEW_ENCOUNTER: {
    id: 'NEW_ENCOUNTER',
    primary: { label: 'Nueva consulta', icon: 'lucidePlus', css: 'btn-primary-soap' },
  },
  VIEW_GROWTH: {
    id: 'VIEW_GROWTH',
    menu: {
      label: 'Ver Curvas de Crecimiento OMS',
      icon: 'lucideTrendingUp',
      iconCss: 'text-indigo-500',
    },
  },
  PRINT_DOCUMENT: {
    id: 'PRINT_DOCUMENT',
    menu: {
      label: 'Imprimir Resumen de Historia Clínica',
      icon: 'lucidePrinter',
      iconCss: 'text-slate-500',
    },
  },
};
