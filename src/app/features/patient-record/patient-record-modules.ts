import { Type } from '@angular/core';
import { PatientRecordModuleId } from '../../core/models/specialty-experience.model';
import { PatientSummaryComponent } from './patient-summary/patient-summary.component';
import { PatientEncountersComponent } from './patient-encounters/patient-encounters.component';
import { PatientGrowthComponent } from './patient-growth/patient-growth.component';
import { PatientPrescriptionsComponent } from './patient-prescriptions/patient-prescriptions.component';
import { PatientVaccinationsComponent } from './patient-vaccinations/patient-vaccinations.component';
import { PatientStudiesComponent } from './patient-studies/patient-studies.component';

export type PatientRecordTab =
  'resumen' | 'historia' | 'vacunas' | 'curvas' | 'recetas' | 'estudios';
export interface PatientRecordModule {
  id: PatientRecordModuleId;
  tab: PatientRecordTab;
  label: string;
  component: Type<unknown>;
  panel?: boolean;
  patientInput?: string;
  patientIdInput?: string;
  encounterInput?: string;
  editOutput?: string;
  encounterOutput?: string;
  patientUpdatedOutput?: string;
}

/** Presentation and implemented components only. Specialty selection comes from the server. */
export const PATIENT_RECORD_MODULES: Record<PatientRecordModuleId, PatientRecordModule> = {
  SUMMARY: {
    id: 'SUMMARY',
    tab: 'resumen',
    label: 'Datos del paciente',
    component: PatientSummaryComponent,
    editOutput: 'editPatient',
  },
  ENCOUNTERS: {
    id: 'ENCOUNTERS',
    tab: 'historia',
    label: 'Historia Clínica',
    component: PatientEncountersComponent,
    encounterOutput: 'newEncounter',
  },
  VACCINATION: {
    id: 'VACCINATION',
    tab: 'vacunas',
    label: 'Vacunas',
    component: PatientVaccinationsComponent,
    panel: true,
    patientInput: 'patient',
    patientUpdatedOutput: 'patientUpdated',
  },
  GROWTH: {
    id: 'GROWTH',
    tab: 'curvas',
    label: 'Evolución y Curvas',
    component: PatientGrowthComponent,
  },
  PRESCRIPTIONS: {
    id: 'PRESCRIPTIONS',
    tab: 'recetas',
    label: 'Recetas y Órdenes',
    component: PatientPrescriptionsComponent,
    encounterInput: 'latestEncounter',
  },
  STUDIES: {
    id: 'STUDIES',
    tab: 'estudios',
    label: 'Estudios realizados',
    component: PatientStudiesComponent,
    panel: true,
    patientIdInput: 'patientId',
  },
};
