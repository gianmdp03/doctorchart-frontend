/** Implemented navigation IDs; specialty composition and ordering come from the backend. */
export type ClinicalNavigationId = 'DASHBOARD' | 'PATIENTS' | 'CALCULATORS' | 'VACCINATION' | 'WIZARD';
export const PATIENT_RECORD_MODULE_IDS = ['SUMMARY', 'ENCOUNTERS', 'VACCINATION', 'GROWTH', 'PRESCRIPTIONS', 'STUDIES'] as const;
export type PatientRecordModuleId = typeof PATIENT_RECORD_MODULE_IDS[number];
export const PATIENT_RECORD_ACTION_IDS = ['EDIT_PATIENT', 'NEW_ENCOUNTER', 'VIEW_GROWTH', 'PRINT_DOCUMENT'] as const;
export type PatientRecordActionId = typeof PATIENT_RECORD_ACTION_IDS[number];
export interface SpecialtyExperience {
  specialtyId: number;
  specialtyVersion: number;
  navigation: ClinicalNavigationId[];
  patientRecordTabs: PatientRecordModuleId[];
  patientRecordActions: PatientRecordActionId[];
}
