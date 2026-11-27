export interface ArchivedPatient {
  id: number;
  fullName: string;
  annulledAt: string | null;
}

export interface ClinicalRevision {
  id: number;
  entity: 'PATIENT' | 'ENCOUNTER' | 'PRESCRIPTION' | 'STUDY' | 'VACCINATION' | 'WHATSAPP_CONSULTATION';
  entityId: number;
  actorUserId: string;
  occurredAt: string;
  operation: 'CORRECT' | 'ANNUL';
  previousVersion: number;
  newVersion: number;
  reason: string | null;
  previous: Record<string, unknown>;
  derivedProjections?: Record<string, unknown>;
  firstRecorded?: boolean;
}

export interface RevisionPage<T> {
  items: T[];
  nextBefore: number | null;
}

export interface PatientRevisions extends RevisionPage<ClinicalRevision> {
  patient: ArchivedPatient;
  calculationsEnabled?: boolean;
}

export interface ArchivedCalculation {
  id: number;
  encounterId: number | null;
  calculationName: string;
  inputSnapshot: unknown;
  formattedResult: string;
  resultInterpretation: string | null;
  plainTextEvolution: string | null;
  createdAt: string;
}

export interface ClinicalAccessEvent {
  id: number;
  occurredAt: string;
  actor: string;
  actorKind: 'DOCTOR' | 'CATALOG_ADMIN';
  operation: string;
  entityId: number | null;
  patientId: number | null;
  recordVersion: number | null;
  outcome: 'AUTHORIZED' | 'ARTIFACT_READY' | 'REJECTED' | 'FAILED';
  requestId: string;
}
