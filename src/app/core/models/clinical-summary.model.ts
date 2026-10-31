import { PatientVaccinationSchedule } from './vaccination.model';

export type ClinicalEntryKind = 'ALLERGY' | 'PROBLEM' | 'MEDICATION' | 'PENDING';
export interface ClinicalEntry {
  id: string;
  kind: ClinicalEntryKind;
  text: string;
  details: string;
  date: string;
  certainty: 'CONFIRMED' | 'REPORTED';
  status: 'ACTIVE' | 'RESOLVED' | 'HISTORICAL';
  recordedAt: string;
  resolvedAt?: string;
  verifiedAt?: string;
  authorUserId: string;
}
export interface ClinicalSummary {
  patientId: number;
  patientVersion: number;
  asOfDate: string;
  profile: { entries: ClinicalEntry[]; noKnownAllergiesAt?: string };
  historical: ClinicalEntry[];
  lastEncounter: {
    id: number;
    date: string;
    complaint: string | null;
    diagnosis: string | null;
    followUp: string | null;
    followUpDate: string | null;
  } | null;
  vaccinations: PatientVaccinationSchedule | null;
  recentMedications: {
    recordId: number;
    date: string;
    name: string;
    dosage: string;
    frequency: string;
  }[];
}
export type ClinicalProfileChange =
  | {
      operation: 'ADD';
      kind: ClinicalEntryKind;
      text: string;
      details: string;
      date: string;
      certainty: 'CONFIRMED' | 'REPORTED';
    }
  | { operation: 'RESOLVE' | 'CONFIRM'; entryId: string }
  | { operation: 'NO_KNOWN_ALLERGIES' };
