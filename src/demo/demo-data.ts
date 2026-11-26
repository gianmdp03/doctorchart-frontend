import { ClinicalEntry } from '../app/core/models/clinical-summary.model';
import {
  ConsultationType,
  DiagnosisItem,
  PrescriptionItem,
  VitalSigns,
} from '../app/core/models/clinical-encounter.model';
import {
  AnthropometricMeasurements,
  FamilyHistory,
  GuardianInfo,
  PersonalHistory,
} from '../app/core/models/clinical-records.model';
import { InsuranceInfo } from '../app/core/models/patient.model';
import { PrescriptionDocumentType } from '../app/core/models/prescription.model';
import {
  WizardDefinition,
  WizardFormDefinition,
  WizardFormValues,
  WizardFormulaResults,
  WizardStepKey,
  WizardValue,
} from '../app/core/models/wizard-definition.model';
import { PatientColumnsConfig } from '../app/core/models/workspace.model';

export const DAY = 86_400_000;
export const MAX_FILE = 12 * 1024 * 1024;
export const MAX_STUDY_BYTES = 2 * 1024 * 1024;
export const DEMO_CLINICIAN_ID = 'demo-clinician-1';

export interface DemoPatientRecord {
  id: number;
  specialtyContextId: number;
  version: number;
  workspaceVersion: number;
  fullName: string;
  birthDate: string;
  nationalId: string | null;
  gender: string | null;
  bloodType: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  insuranceInfo: InsuranceInfo | null;
  allergies: string[];
  chronicConditions: string[];
  guardianInfo: GuardianInfo | null;
  personalHistory: PersonalHistory | null;
  familyHistory: FamilyHistory | null;
  formValues: WizardFormValues;
  formulaResults: WizardFormulaResults;
  formDefinitionSnapshot: WizardFormDefinition;
  formulaContext: Record<string, WizardValue>;
  clinicalEntries: ClinicalEntry[];
  noKnownAllergiesAt?: string;
  appliedVaccines: Record<string, string | null>;
}

export interface DemoEncounterRecord {
  id: number;
  specialtyContextId: number;
  patientId: number;
  version: number;
  workspaceVersion: number;
  encounterDate: string;
  consultationType: ConsultationType;
  chiefComplaint: string | null;
  historyOfPresentIllness: string | null;
  physicalExamination: string | null;
  primaryDiagnosisCode: string | null;
  primaryDiagnosisDescription: string | null;
  secondaryDiagnoses: DiagnosisItem[] | null;
  clinicalImpression: string | null;
  treatmentPlan: string | null;
  followUpInstructions: string | null;
  followUpDate: string | null;
  diagnosticOrders: string[] | null;
  measurements: AnthropometricMeasurements | null;
  vitalSigns: VitalSigns | null;
  prescriptions: PrescriptionItem[] | null;
  formValues: WizardFormValues;
  formulaResults: WizardFormulaResults;
  formDefinitionSnapshot: WizardFormDefinition;
  formulaContext: Record<string, WizardValue>;
}

export interface DemoPrescriptionRecord {
  id: number;
  specialtyContextId: number;
  patientId: number;
  type: PrescriptionDocumentType;
  diagnosisDescription: string;
  generalInstructions: string;
  prescriptions: PrescriptionItem[];
  diagnosticOrders: string[];
  createdAt: string;
}

export interface DemoStudyRecord {
  id: number;
  specialtyContextId: number;
  patientId: number;
  name: string;
  originalFileName: string;
  contentType: string;
  fileSize: number;
  description: string | null;
  uploadedAt: string;
  dataUrl: string;
}

export interface DemoIssuedDocument {
  id: number;
  specialtyContextId: number;
  patientId: number;
  source: 'PRESCRIPTION_RECORD' | 'ENCOUNTER';
  sourceId: number;
  code: string;
  issuedAt: string;
  sourceVersion: number;
  type: PrescriptionDocumentType;
  status: 'ISSUED' | 'ANNULLED';
  reason: string | null;
}

export interface DemoRevisionRecord {
  id: number;
  specialtyContextId: number;
  patientId: number;
  entity: 'PATIENT' | 'ENCOUNTER' | 'PRESCRIPTION' | 'STUDY' | 'VACCINATION';
  entityId: number;
  occurredAt: string;
  operation: 'CORRECT' | 'ANNUL';
  previousVersion: number;
  newVersion: number;
  reason: string | null;
  previous: Record<string, unknown>;
}

export interface DemoAccessEvent {
  id: number;
  specialtyContextId: number;
  patientId: number | null;
  occurredAt: string;
  operation: string;
  entityId: number | null;
  recordVersion: number | null;
}

export interface DemoContextRecord {
  specialtyContextId: number;
  specialtyId: number;
  version: number;
  onboardingCompleted: boolean;
  currentStepKey: WizardStepKey;
  definition: WizardDefinition;
  draftDefinition: WizardDefinition | null;
  patientColumnsConfig: PatientColumnsConfig;
  quickNotes: string | null;
  preferencesVersion: number;
}

export interface DemoSession {
  workspaceId: number;
  activeContextId: number;
  nextId: number;
  contexts: DemoContextRecord[];
  patients: DemoPatientRecord[];
  encounters: DemoEncounterRecord[];
  prescriptions: DemoPrescriptionRecord[];
  studies: DemoStudyRecord[];
  documents: DemoIssuedDocument[];
  revisions: DemoRevisionRecord[];
  accessEvents: DemoAccessEvent[];
}

export const blankDemoSession = (): DemoSession => ({
  workspaceId: 1,
  activeContextId: 0,
  nextId: 1000,
  contexts: [],
  patients: [],
  encounters: [],
  prescriptions: [],
  studies: [],
  documents: [],
  revisions: [],
  accessEvents: [],
});

export function newDemoUuid(): string {
  return crypto.randomUUID();
}

function invalid(detail: string): never {
  throw new Error(`El archivo de DemoChart tiene ${detail}.`);
}

function asObject(value: unknown, label = 'datos incompletos'): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) invalid(label);
  return value as Record<string, unknown>;
}

function asInt(value: unknown, min = 0, max = Number.MAX_SAFE_INTEGER): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < min || value > max) {
    invalid('identificadores o contadores numéricos inválidos');
  }
  return value;
}

function asString(value: unknown, maxLen: number, required = false): string {
  if (typeof value !== 'string' || value.length > maxLen || (required && !value.trim())) {
    invalid('textos con formato inválido');
  }
  return value;
}

function asOptionalString(value: unknown, maxLen = 4000): string | null {
  if (value === null || value === undefined) return null;
  return asString(value, maxLen, false);
}

function asDataUrl(value: unknown): string {
  const data = asString(value, 3_200_000, true);
  if (!/^data:(?:image\/(?:png|jpeg|webp|svg\+xml)|application\/pdf);base64,[A-Za-z0-9+/]+={0,2}$/.test(data)) {
    invalid('un archivo adjunto con formato no permitido');
  }
  return data;
}

export function encodeDemoSession(session: DemoSession): string {
  return JSON.stringify({ format: 'demochart', version: 1, ...session }, null, 2);
}

export function parseDemoSession(value: unknown): DemoSession {
  const doc = asObject(value, 'una estructura inválida');
  if (doc['format'] !== 'demochart' || doc['version'] !== 1) {
    invalid('un formato o versión desconocidos');
  }

  const workspaceId = asInt(doc['workspaceId'], 1);
  const activeContextId = asInt(doc['activeContextId'], 0);
  const nextId = asInt(doc['nextId'], 1);

  if (!Array.isArray(doc['contexts']) || doc['contexts'].length === 0 || doc['contexts'].length > 25) {
    invalid('una lista de especialidades inválida');
  }
  const contexts = doc['contexts'].map((raw) => {
    const c = asObject(raw);
    const specialtyContextId = asInt(c['specialtyContextId'], 1);
    const specialtyId = asInt(c['specialtyId'], 1);
    const version = asInt(c['version'], 1);
    const onboardingCompleted = typeof c['onboardingCompleted'] === 'boolean' ? c['onboardingCompleted'] : true;
    const currentStepKey = asString(c['currentStepKey'] ?? 'completed', 80, true) as WizardStepKey;
    const definition = asObject(c['definition'], 'una definición de wizard inválida') as unknown as WizardDefinition;
    if (definition.schemaVersion !== 1 || !definition.patientForm?.categories || !definition.encounterForm?.categories) {
      invalid('una configuración de formularios inválida');
    }
    const draftDefinition = c['draftDefinition']
      ? (asObject(c['draftDefinition']) as unknown as WizardDefinition)
      : null;
    const patientColumnsConfig = asObject(c['patientColumnsConfig'] ?? {}) as PatientColumnsConfig;
    const quickNotes = asOptionalString(c['quickNotes'], 10_000);
    const preferencesVersion = asInt(c['preferencesVersion'] ?? 1, 1);
    return {
      specialtyContextId,
      specialtyId,
      version,
      onboardingCompleted,
      currentStepKey,
      definition,
      draftDefinition,
      patientColumnsConfig,
      quickNotes,
      preferencesVersion,
    };
  });

  const contextIds = new Set(contexts.map((c) => c.specialtyContextId));
  if (contextIds.size !== contexts.length) invalid('especialidades duplicadas');
  if (activeContextId !== 0 && !contextIds.has(activeContextId)) {
    invalid('una especialidad activa inexistente');
  }

  const checkArray = <T>(key: string, max: number, mapFn: (row: Record<string, unknown>) => T): T[] => {
    const raw = doc[key];
    if (!Array.isArray(raw) || raw.length > max) invalid(`una lista de ${key} inválida`);
    return raw.map((item) => mapFn(asObject(item)));
  };

  const patients = checkArray<DemoPatientRecord>('patients', 500, (p) => {
    const id = asInt(p['id'], 1);
    const specialtyContextId = asInt(p['specialtyContextId'], 1);
    if (!contextIds.has(specialtyContextId)) invalid('un paciente de una especialidad inexistente');
    return {
      ...(p as unknown as DemoPatientRecord),
      id,
      specialtyContextId,
      version: asInt(p['version'] ?? 1, 1),
      workspaceVersion: asInt(p['workspaceVersion'] ?? 1, 1),
      fullName: asString(p['fullName'], 200, true),
      birthDate: asString(p['birthDate'], 20, true),
    };
  });
  const patientIds = new Set(patients.map((p) => p.id));
  if (patientIds.size !== patients.length) invalid('pacientes duplicados');

  const encounters = checkArray<DemoEncounterRecord>('encounters', 5000, (e) => {
    const id = asInt(e['id'], 1);
    const patientId = asInt(e['patientId'], 1);
    const specialtyContextId = asInt(e['specialtyContextId'], 1);
    if (!patientIds.has(patientId) || !contextIds.has(specialtyContextId)) {
      invalid('una consulta con referencias inválidas');
    }
    return {
      ...(e as unknown as DemoEncounterRecord),
      id,
      patientId,
      specialtyContextId,
      version: asInt(e['version'] ?? 1, 1),
      workspaceVersion: asInt(e['workspaceVersion'] ?? 1, 1),
      encounterDate: asString(e['encounterDate'], 60, true),
    };
  });

  const prescriptions = checkArray<DemoPrescriptionRecord>('prescriptions', 2000, (r) => {
    const id = asInt(r['id'], 1);
    const patientId = asInt(r['patientId'], 1);
    if (!patientIds.has(patientId)) invalid('una receta con paciente inexistente');
    return { ...(r as unknown as DemoPrescriptionRecord), id, patientId };
  });

  const studies = checkArray<DemoStudyRecord>('studies', 500, (s) => {
    const id = asInt(s['id'], 1);
    const patientId = asInt(s['patientId'], 1);
    if (!patientIds.has(patientId)) invalid('un estudio con paciente inexistente');
    return {
      ...(s as unknown as DemoStudyRecord),
      id,
      patientId,
      name: asString(s['name'], 200, true),
      originalFileName: asString(s['originalFileName'], 255, true),
      dataUrl: asDataUrl(s['dataUrl']),
    };
  });

  const documents = checkArray<DemoIssuedDocument>('documents', 2000, (d) => ({
    ...(d as unknown as DemoIssuedDocument),
    id: asInt(d['id'], 1),
    patientId: asInt(d['patientId'], 1),
  }));

  const revisions = checkArray<DemoRevisionRecord>('revisions', 5000, (r) => ({
    ...(r as unknown as DemoRevisionRecord),
    id: asInt(r['id'], 1),
    patientId: asInt(r['patientId'], 1),
  }));

  const accessEvents = checkArray<DemoAccessEvent>('accessEvents', 5000, (a) => ({
    ...(a as unknown as DemoAccessEvent),
    id: asInt(a['id'], 1),
  }));

  return {
    workspaceId,
    activeContextId,
    nextId,
    contexts,
    patients,
    encounters,
    prescriptions,
    studies,
    documents,
    revisions,
    accessEvents,
  };
}
