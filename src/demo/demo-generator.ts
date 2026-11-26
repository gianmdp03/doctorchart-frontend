import { ClinicalEntry } from '../app/core/models/clinical-summary.model';
import { ConsultationType, PrescriptionItem } from '../app/core/models/clinical-encounter.model';
import { WizardFormValues } from '../app/core/models/wizard-definition.model';
import {
  blankDemoSession,
  DEMO_CLINICIAN_ID,
  DemoContextRecord,
  DemoEncounterRecord,
  DemoPatientRecord,
  DemoPrescriptionRecord,
  DemoRevisionRecord,
  DemoSession,
  DemoStudyRecord,
} from './demo-data';
import { evaluateFormFormulas } from './demo-formulas';
import { generateDemoPdfBlob } from './demo-pdf';
import { DEMO_SPECIALTIES_CATALOG, findDemoSpecialty } from './demo-specialties';
import { DEMO_VACCINATION_CALENDAR } from './demo-vaccinations';

function isoDateDaysAgo(daysAgo: number, now = new Date()): string {
  const d = new Date(now.getTime() - daysAgo * 86_400_000);
  return d.toISOString().slice(0, 10);
}

function isoDateTimeDaysAgo(daysAgo: number, hour = 10, minute = 30, now = new Date()): string {
  const d = new Date(now.getTime() - daysAgo * 86_400_000);
  d.setUTCHours(hour + 3, minute, 0, 0); // Argentina UTC-3
  return d.toISOString();
}

function isoDateMonthsAgo(monthsAgo: number, extraDays = 0, now = new Date()): string {
  const d = new Date(now.getTime());
  d.setUTCMonth(d.getUTCMonth() - monthsAgo);
  d.setUTCDate(d.getUTCDate() - extraDays);
  return d.toISOString().slice(0, 10);
}

function makeSampleSvgDataUrl(title: string, subtitle: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420" viewBox="0 0 640 420">
    <rect width="640" height="420" fill="#0f172a"/>
    <rect x="24" y="24" width="592" height="372" rx="14" fill="#1e293b" stroke="#334155" stroke-width="2"/>
    <circle cx="320" cy="185" r="95" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="8 6"/>
    <path d="M250 185 Q320 115 390 185 Q320 255 250 185 Z" fill="none" stroke="#94a3b8" stroke-width="2"/>
    <text x="320" y="330" text-anchor="middle" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="600">${title}</text>
    <text x="320" y="360" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="14">${subtitle} · DemoChart</text>
  </svg>`;
  const bytes = new TextEncoder().encode(svg);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return 'data:image/svg+xml;base64,' + btoa(bin);
}

async function blobToDataUrl(blob: Blob): Promise<string> {
  const buf = await blob.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return `data:${blob.type};base64,${btoa(bin)}`;
}

function makeSyncSamplePdfDataUrl(title: string, patientName: string): string {
  const blob = generateDemoPdfBlob({
    source: 'PRESCRIPTION_RECORD',
    id: 1,
    code: 'EST-DEMO',
    issuedAt: new Date().toISOString(),
    type: 'STUDY_ORDERS',
    patient: {
      id: 1,
      fullName: patientName,
      nationalId: '54.120.890',
      birthDate: '2022-05-10',
      ageAtIssue: 'Control de laboratorio',
      insuranceInfo: { providerName: 'OSDE 310' },
    },
    author: { userId: DEMO_CLINICIAN_ID, specialtyName: title },
    primaryDiagnosisCode: null,
    primaryDiagnosisDescription: 'Informe de laboratorio de rutina (DemoChart)',
    patientInstructions: 'Hemograma: Hb 12.4 g/dL · Hto 37% · Leucocitos 7.800/mm3 · Plaquetas 295.000/mm3 · Glucemia 84 mg/dL. Valores dentro de rango esperado.',
    prescriptions: [],
    diagnosticOrders: ['Hemograma completo', 'Glucemia en ayunas', 'Ferremia y ferritina'],
  });
  void blobToDataUrl;
  // Synchronously encode the ASCII PDF bytes
  const raw = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n5 0 obj\n<< /Length 165 >>\nstream\nBT\n/F1 13 Tf 1 0 0 1 48 770 Tm (${title} - ${patientName}) Tj\n/F1 10 Tf 1 0 0 1 48 745 Tm (Hemograma completo y ferritina: valores dentro de parametros normales. DemoChart.) Tj\nET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000241 00000 n \n0000000321 00000 n \ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n538\n%%EOF`;
  return 'data:application/pdf;base64,' + btoa(raw);
}

const FEMALE_FIRST = ['Sofía', 'Valentina', 'Emma', 'Martina', 'Catalina', 'Isabella', 'Camila', 'Lucía', 'Mía', 'Olivia', 'Julieta', 'Renata'];
const MALE_FIRST = ['Mateo', 'Bautista', 'Benjamín', 'Liam', 'Santiago', 'Tomás', 'Joaquín', 'Valentín', 'Lucas', 'Felipe', 'Santino', 'Bruno'];
const LAST_NAMES = ['González', 'Rodríguez', 'Fernández', 'López', 'Martínez', 'Pérez', 'Gómez', 'Sánchez', 'Díaz', 'Romero', 'Álvarez', 'Torres', 'Ruiz', 'Ramírez'];
const COVERAGES = ['OSDE 310', 'Swiss Medical SMG20', 'Galeno Azul', 'IOMA', 'Medifé Plata', 'Accord Salud', 'Particular'];
const STREETS = ['Av. Santa Fe', 'Av. Cabildo', 'Av. Corrientes', 'Calle Güemes', 'Av. Rivadavia', 'Calle Juramento', 'Av. Libertador', 'Calle Armenia'];

function pick<T>(arr: readonly T[], index: number): T {
  return arr[((index % arr.length) + arr.length) % arr.length];
}

function buildVaccinesForAge(ageMonths: number, leaveLastPending: boolean, birthDate: string): Record<string, string | null> {
  const result: Record<string, string | null> = {};
  const skipCols = new Set(['embarazadas', 'puerperas', 'personal_salud', 'adultos']);
  const eligible: Array<{ id: string; dueMonths: number }> = [];
  for (const v of DEMO_VACCINATION_CALENDAR.vacunas) {
    for (const app of v.aplicaciones) {
      if (app.columnas.every((c) => skipCols.has(c))) continue;
      const from = app.ageRule?.fromMonths ?? 0;
      if (from <= ageMonths) {
        eligible.push({ id: app.id, dueMonths: from });
      }
    }
  }
  eligible.sort((a, b) => a.dueMonths - b.dueMonths);
  const cutoff = leaveLastPending ? Math.max(0, eligible.length - 2) : eligible.length;
  for (let i = 0; i < cutoff; i++) {
    const birth = new Date(birthDate + 'T00:00:00Z');
    birth.setUTCMonth(birth.getUTCMonth() + eligible[i].dueMonths);
    const todayIso = new Date().toISOString().slice(0, 10);
    const applied = birth.toISOString().slice(0, 10);
    result[eligible[i].id] = applied <= todayIso ? applied : todayIso;
  }
  return result;
}

interface CohortResult {
  patients: DemoPatientRecord[];
  encounters: DemoEncounterRecord[];
  prescriptions: DemoPrescriptionRecord[];
  studies: DemoStudyRecord[];
  revisions: DemoRevisionRecord[];
  nextId: number;
}

export function generateCohortForContext(
  context: DemoContextRecord,
  startId: number,
  seedOffset = 0,
  now = new Date(),
): CohortResult {
  const entry = findDemoSpecialty(context.specialtyId);
  const isPediatrics = entry.code === 'pediatrics';
  let idSeq = startId;
  const nextId = () => idSeq++;

  const patients: DemoPatientRecord[] = [];
  const encounters: DemoEncounterRecord[] = [];
  const prescriptions: DemoPrescriptionRecord[] = [];
  const studies: DemoStudyRecord[] = [];
  const revisions: DemoRevisionRecord[] = [];

  if (isPediatrics) {
    const profiles = [
      {
        sex: 'FEMALE' as const,
        monthsAgo: 0,
        daysExtra: 14,
        leaveVaccinePending: false,
        allergy: null,
        condition: null,
        medication: null,
        birthW: 3.25,
        birthH: 49.5,
        birthHC: 34.2,
        visits: [
          { daysAgo: 0, type: 'FIRST_VISIT' as ConsultationType, w: 3.55, h: 50.8, hc: 35.1, complaint: 'Control neonatal de los 14 días', dx: 'Recién nacido sano. Aumento ponderal adecuado.', plan: 'Lactancia materna exclusiva a libre demanda. Próximo control al mes.' },
        ],
      },
      {
        sex: 'MALE' as const,
        monthsAgo: 4,
        daysExtra: 8,
        leaveVaccinePending: false,
        allergy: null,
        condition: null,
        medication: null,
        birthW: 3.45,
        birthH: 50.5,
        birthHC: 35.0,
        visits: [
          { daysAgo: 95, type: 'FIRST_VISIT' as ConsultationType, w: 4.3, h: 54.0, hc: 37.2, complaint: 'Control del primer mes', dx: 'Crecimiento y neurodesarrollo acorde a edad.', plan: 'Continuar lactancia. Vitamina D 400 UI/día.' },
          { daysAgo: 62, type: 'ROUTINE_CHECKUP' as ConsultationType, w: 5.5, h: 58.2, hc: 39.1, complaint: 'Control de los 2 meses', dx: 'Lactante eutrófico. Vacunación de 2 meses indicada.', plan: 'Pautas de alarma y control de peso en 30 días.' },
          { daysAgo: 3, type: 'ROUTINE_CHECKUP' as ConsultationType, w: 7.0, h: 63.5, hc: 41.4, complaint: 'Control de los 4 meses', dx: 'Sostén cefálico completo. Curva p50.', plan: 'Mantener lactancia. Control a los 6 meses para alimentación complementaria.' },
        ],
      },
      {
        sex: 'FEMALE' as const,
        monthsAgo: 10,
        daysExtra: 5,
        leaveVaccinePending: true,
        allergy: 'Proteína de leche de vaca (APLV leve)',
        condition: 'Bronquiolitis a los 6 meses (resuelta)',
        medication: null,
        birthW: 3.1,
        birthH: 49.0,
        birthHC: 34.0,
        visits: [
          { daysAgo: 210, type: 'FIRST_VISIT' as ConsultationType, w: 5.9, h: 60.5, hc: 39.8, complaint: 'Control de los 3 meses', dx: 'Lactante sano.', plan: 'Seguimiento mensual.' },
          { daysAgo: 120, type: 'ROUTINE_CHECKUP' as ConsultationType, w: 7.4, h: 66.2, hc: 42.3, complaint: 'Control de los 6 meses', dx: 'Inicio de alimentación complementaria sin lácteos.', plan: 'Dieta materna/lactante libre de PLV. Hierro preventivo.' },
          { daysAgo: 0, type: 'EMERGENCY' as ConsultationType, w: 8.8, h: 71.5, hc: 44.6, complaint: 'Tos seca y sibilancias leves de 24 hs', dx: 'Síndrome bronquial obstructivo leve.', plan: 'Salbutamol 2 disparos con aerocámara cada 6 hs. Pautas de alarma.', rx: [{ medicationName: 'Salbutamol 100mcg aerosol', dosage: '2 disparos (200 mcg)', administrationRoute: 'Inhalatoria', frequency: 'Cada 6 horas con aerocámara', durationDays: 5, instructions: 'Control en 48 horas o ante tiraje.' }] as PrescriptionItem[] },
        ],
      },
      {
        sex: 'MALE' as const,
        monthsAgo: 19,
        daysExtra: 12,
        leaveVaccinePending: true,
        allergy: null,
        condition: null,
        medication: null,
        birthW: 3.35,
        birthH: 50.0,
        birthHC: 34.8,
        visits: [
          { daysAgo: 450, type: 'FIRST_VISIT' as ConsultationType, w: 6.8, h: 63.0, hc: 41.5, complaint: 'Control de 4 meses', dx: 'Lactante eutrófico.', plan: 'Vacunas del calendario.' },
          { daysAgo: 300, type: 'ROUTINE_CHECKUP' as ConsultationType, w: 8.9, h: 72.0, hc: 44.8, complaint: 'Control de 9 meses', dx: 'Deambulación asistida, sedestación estable.', plan: 'Alimentación variada.' },
          { daysAgo: 180, type: 'ROUTINE_CHECKUP' as ConsultationType, w: 10.2, h: 77.5, hc: 46.5, complaint: 'Control del año', dx: 'Crecimiento armónico. Camina con apoyo.', plan: 'Aplicar vacunas de los 12 meses.' },
          { daysAgo: 18, type: 'ROUTINE_CHECKUP' as ConsultationType, w: 11.6, h: 83.0, hc: 47.9, complaint: 'Control de los 18 meses', dx: 'Desarrollo del lenguaje adecuado. Pendiente refuerzo de calendario.', plan: 'Completar esquema de 15-18 meses.' },
        ],
      },
      {
        sex: 'FEMALE' as const,
        monthsAgo: 42,
        daysExtra: 3,
        leaveVaccinePending: false,
        allergy: 'Penicilina (rash cutáneo)',
        condition: null,
        medication: null,
        birthW: 3.2,
        birthH: 49.8,
        birthHC: 34.5,
        visits: [
          { daysAgo: 900, type: 'FIRST_VISIT' as ConsultationType, w: 9.6, h: 75.5, hc: 45.6, complaint: 'Control del año', dx: 'Desarrollo normal.', plan: 'Seguimiento semestral.' },
          { daysAgo: 540, type: 'ROUTINE_CHECKUP' as ConsultationType, w: 12.1, h: 87.0, hc: 48.0, complaint: 'Control de los 2 años', dx: 'Transición a talla de pie.', plan: 'Pautas de control de esfínteres.' },
          { daysAgo: 160, type: 'ROUTINE_CHECKUP' as ConsultationType, w: 14.3, h: 95.5, hc: 49.1, complaint: 'Control de los 3 años', dx: 'Niña sana. Peso y talla en P50.', plan: 'Control odontológico anual.' },
          { daysAgo: 9, type: 'FOLLOW_UP' as ConsultationType, w: 15.2, h: 99.0, hc: 49.5, complaint: 'Fiebre y odinofagia de 48 hs', dx: 'Faringoamigdalitis aguda.', plan: 'Azitromicina (por alergia a penicilina) + antitérmicos.', rx: [{ medicationName: 'Azitromicina 200mg/5ml susp.', dosage: '3.5 ml', administrationRoute: 'Vía Oral', frequency: 'Cada 24 horas', durationDays: 3, instructions: 'Tomar 1 hora antes o 2 horas después de las comidas.' }] as PrescriptionItem[] },
        ],
      },
      {
        sex: 'MALE' as const,
        monthsAgo: 76,
        daysExtra: 10,
        leaveVaccinePending: false,
        allergy: null,
        condition: null,
        medication: null,
        birthW: 3.5,
        birthH: 51.0,
        birthHC: 35.2,
        visits: [
          { daysAgo: 730, type: 'FIRST_VISIT' as ConsultationType, w: 17.2, h: 105.0, hc: null, complaint: 'Control de los 4 años', dx: 'Crecimiento dentro de parámetros normales.', plan: 'Control anual.' },
          { daysAgo: 365, type: 'ROUTINE_CHECKUP' as ConsultationType, w: 19.4, h: 111.5, hc: null, complaint: 'Control ingreso escolar (5 años)', dx: 'Apto físico escolar. Vacunación de 5 años completa.', plan: 'Control visual y auditivo.' },
          { daysAgo: 14, type: 'ROUTINE_CHECKUP' as ConsultationType, w: 21.3, h: 117.2, hc: null, complaint: 'Control anual de 6 años', dx: 'Apto para actividad física escolar.', plan: 'Mantener hábitos saludables y deporte.' },
        ],
      },
      {
        sex: 'FEMALE' as const,
        monthsAgo: 110,
        daysExtra: 4,
        leaveVaccinePending: false,
        allergy: 'Ácaros ambientales',
        condition: 'Asma leve intermitente',
        medication: 'Budesonida 200mcg aerosol (1 disparo/día)',
        birthW: 3.3,
        birthH: 50.0,
        birthHC: 34.6,
        visits: [
          { daysAgo: 340, type: 'FIRST_VISIT' as ConsultationType, w: 27.5, h: 129.0, hc: null, complaint: 'Control de asma bronquial', dx: 'Asma controlada con corticoide inhalado.', plan: 'Continuar Budesonida 200 mcg 1 puff/día.' },
          { daysAgo: 22, type: 'FOLLOW_UP' as ConsultationType, w: 30.1, h: 134.5, hc: null, complaint: 'Control semestral respiratorio', dx: 'Buena evolución clínica. Espirometría normal.', plan: 'Mantener tratamiento preventivo y control en 6 meses.' },
        ],
      },
      {
        sex: 'MALE' as const,
        monthsAgo: 168,
        daysExtra: 15,
        leaveVaccinePending: true,
        allergy: null,
        condition: null,
        medication: null,
        birthW: 3.6,
        birthH: 51.2,
        birthHC: 35.5,
        visits: [
          { daysAgo: 380, type: 'FIRST_VISIT' as ConsultationType, w: 48.0, h: 158.0, hc: null, complaint: 'Control adolescente 13 años', dx: 'Desarrollo puberal acorde.', plan: 'Solicitar laboratorio de rutina.' },
          { daysAgo: 6, type: 'ROUTINE_CHECKUP' as ConsultationType, w: 53.5, h: 164.5, hc: null, complaint: 'Control clínico y apto deportivo', dx: 'Adolescente sano. TA 110/70 mmHg.', plan: 'Completar refuerzo de calendario pendiente.' },
        ],
      },
    ];

    profiles.forEach((prof, idx) => {
      const pId = nextId();
      const first = prof.sex === 'FEMALE' ? pick(FEMALE_FIRST, idx + seedOffset) : pick(MALE_FIRST, idx + seedOffset);
      const last = pick(LAST_NAMES, idx * 2 + seedOffset);
      const fullName = `${first} ${last}`;
      const birthDate = isoDateMonthsAgo(prof.monthsAgo, prof.daysExtra, now);
      const dni = String(51_200_000 + ((idx + 1) * 417_931 + seedOffset * 13_579) % 9_500_000);
      const phone = `+54911${String(4200_0000 + ((idx + 1) * 731_911 + seedOffset * 41_213) % 57_000_000)}`;
      const coverage = pick(COVERAGES, idx + seedOffset);
      const isParticular = coverage === 'Particular';
      const guardianFirst = prof.sex === 'FEMALE' ? pick(FEMALE_FIRST, idx + 3) : pick(FEMALE_FIRST, idx + 5);
      const appliedVaccines = buildVaccinesForAge(prof.monthsAgo, prof.leaveVaccinePending, birthDate);

      const clinicalEntries: ClinicalEntry[] = [];
      if (prof.allergy) {
        clinicalEntries.push({
          id: `ce-${pId}-1`,
          kind: 'ALLERGY',
          text: prof.allergy,
          details: 'Registrada en ficha inicial',
          date: birthDate,
          certainty: 'CONFIRMED',
          status: 'ACTIVE',
          recordedAt: isoDateTimeDaysAgo(30, 9, 0, now),
          authorUserId: DEMO_CLINICIAN_ID,
        });
      }
      if (prof.condition) {
        clinicalEntries.push({
          id: `ce-${pId}-2`,
          kind: 'PROBLEM',
          text: prof.condition,
          details: 'En seguimiento ambulatorio',
          date: isoDateDaysAgo(90, now),
          certainty: 'CONFIRMED',
          status: 'ACTIVE',
          recordedAt: isoDateTimeDaysAgo(30, 9, 0, now),
          authorUserId: DEMO_CLINICIAN_ID,
        });
      }
      if (prof.medication) {
        clinicalEntries.push({
          id: `ce-${pId}-3`,
          kind: 'MEDICATION',
          text: prof.medication,
          details: 'Tratamiento habitual indicado',
          date: isoDateDaysAgo(30, now),
          certainty: 'CONFIRMED',
          status: 'ACTIVE',
          recordedAt: isoDateTimeDaysAgo(30, 9, 0, now),
          authorUserId: DEMO_CLINICIAN_ID,
        });
      }

      const formValues: WizardFormValues = {
        sys_firstName: first,
        sys_lastName: last,
        sys_dni: dni,
        sys_dob: birthDate,
        sys_sex: prof.sex,
        sys_phone: phone,
        sys_email: `${first.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}.${last.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}@ejemplo.com`,
        sys_insurance: isParticular ? 'Particular' : coverage,
        address: `${pick(STREETS, idx + seedOffset)} ${1200 + idx * 145}, CABA`,
        nationality: 'Argentina',
        sys_allergyStatus: prof.allergy ? 'PRESENT' : 'NONE',
        sys_allergies: prof.allergy ?? '',
        sys_conditionStatus: prof.condition ? 'PRESENT' : 'NONE',
        sys_conditions: prof.condition ?? '',
        sys_medicationStatus: prof.medication ? 'PRESENT' : 'NONE',
        sys_medications: prof.medication ?? '',
        sys_historySource: 'CONFIRMED',
        primaryGuardian: 'Madre',
        motherFullName: `${guardianFirst} ${last}`,
        primaryContactPhone: phone,
        hasSiblings: idx % 2 === 0,
        siblingsCount: idx % 2 === 0 ? 1 : null,
        siblingOrder: idx % 2 === 0 ? 1 : null,
        livingArrangement: 'Ambos padres',
      };

      const patient: DemoPatientRecord = {
        id: pId,
        specialtyContextId: context.specialtyContextId,
        version: 1,
        workspaceVersion: context.version,
        fullName,
        birthDate,
        nationalId: dni,
        gender: prof.sex,
        bloodType: idx % 3 === 0 ? '0+' : idx % 3 === 1 ? 'A+' : 'B+',
        phone,
        email: String(formValues['sys_email']),
        address: String(formValues['address']),
        insuranceInfo: isParticular ? null : { providerName: coverage, affiliateNumber: `40${pId}92` },
        allergies: prof.allergy ? [prof.allergy] : [],
        chronicConditions: prof.condition ? [prof.condition] : [],
        guardianInfo: {
          primaryGuardian: 'Madre',
          motherFullName: `${guardianFirst} ${last}`,
          primaryContactPhone: phone,
          hasSiblings: idx % 2 === 0,
          livingArrangement: 'Ambos padres',
        },
        personalHistory: {
          birthMeasurements: {
            weightKg: prof.birthW,
            heightCm: prof.birthH,
            headCircumferenceCm: prof.birthHC,
          },
          habitualMedication: prof.medication ? [prof.medication] : [],
        },
        familyHistory: {
          maternalDiseases: idx === 6 ? ['Rinitis alérgica'] : ['Sin antecedentes de relevancia'],
          paternalDiseases: ['Sin antecedentes de relevancia'],
        },
        formValues,
        formulaResults: {},
        formDefinitionSnapshot: structuredClone(context.definition.patientForm),
        formulaContext: {},
        clinicalEntries,
        noKnownAllergiesAt: prof.allergy ? undefined : isoDateTimeDaysAgo(30, 9, 0, now),
        appliedVaccines,
      };
      patients.push(patient);

      prof.visits.forEach((v, vIdx) => {
        const encId = nextId();
        const encIso = isoDateTimeDaysAgo(v.daysAgo, 9 + (vIdx % 7), 15, now);
        const encValues: WizardFormValues = {
          chiefComplaint: v.complaint,
          presentIllness: vIdx === 0 ? 'Control programado, sin intercurrencias.' : 'Evolución favorable desde la última consulta.',
          weightKg: v.w,
          heightCm: v.h,
          headCircumferenceCm: v.hc,
          physicalExam: 'Buen estado general, normohidratado, auscultación cardiopulmonar normal, abdomen blando depresible.',
          meetsMilestones: true,
          diagnosis: v.dx,
          treatment: v.plan,
          followUpDate: v.daysAgo === 0 || v.daysAgo === 3 ? isoDateDaysAgo(-14, now) : null,
        };
        const enc: DemoEncounterRecord = {
          id: encId,
          specialtyContextId: context.specialtyContextId,
          patientId: pId,
          version: 1,
          workspaceVersion: context.version,
          encounterDate: encIso,
          consultationType: v.type,
          chiefComplaint: v.complaint,
          historyOfPresentIllness: String(encValues['presentIllness']),
          physicalExamination: String(encValues['physicalExam']),
          primaryDiagnosisCode: null,
          primaryDiagnosisDescription: v.dx,
          secondaryDiagnoses: null,
          clinicalImpression: v.dx,
          treatmentPlan: v.plan,
          followUpInstructions: v.plan,
          followUpDate: encValues['followUpDate'] as string | null,
          diagnosticOrders: null,
          measurements: {
            weightKg: v.w,
            heightCm: v.h,
            headCircumferenceCm: v.hc,
          },
          vitalSigns: {
            heartRate: 98 + (idx % 15),
            temperatureCelsius: v.type === 'EMERGENCY' ? 37.9 : 36.5,
            oxygenSaturationPercent: 98,
          },
          prescriptions: ('rx' in v ? v.rx : undefined) ?? null,
          formValues: encValues,
          formulaResults: evaluateFormFormulas(context.definition.encounterForm.categories, encValues, {
            'patient.ageYears': Math.floor(prof.monthsAgo / 12),
            'patient.gender': prof.sex,
            'patient.latestWeightKg': v.w,
            'patient.latestHeightCm': v.h,
          }),
          formDefinitionSnapshot: structuredClone(context.definition.encounterForm),
          formulaContext: {},
        };
        encounters.push(enc);

        const visitRx = 'rx' in v ? v.rx : undefined;
        if (visitRx?.length) {
          prescriptions.push({
            id: nextId(),
            specialtyContextId: context.specialtyContextId,
            patientId: pId,
            type: 'PRESCRIPTION',
            diagnosisDescription: v.dx,
            generalInstructions: v.plan,
            prescriptions: visitRx,
            diagnosticOrders: [],
            createdAt: encIso,
          });
        }
      });

      if (idx === 4) {
        studies.push({
          id: nextId(),
          specialtyContextId: context.specialtyContextId,
          patientId: pId,
          name: 'Hemograma y ferritina de control',
          originalFileName: 'laboratorio-rutina.pdf',
          contentType: 'application/pdf',
          fileSize: 642,
          description: 'Laboratorio de control anual — valores normales.',
          uploadedAt: isoDateTimeDaysAgo(8, 11, 20, now),
          dataUrl: makeSyncSamplePdfDataUrl('Pediatría', fullName),
        });
      }
      if (idx === 6) {
        studies.push({
          id: nextId(),
          specialtyContextId: context.specialtyContextId,
          patientId: pId,
          name: 'Espirometría basal y post-broncodilatador',
          originalFileName: 'espirometria-control.svg',
          contentType: 'image/svg+xml',
          fileSize: 580,
          description: 'Curva flujo-volumen sin obstrucción significativa.',
          uploadedAt: isoDateTimeDaysAgo(21, 16, 10, now),
          dataUrl: makeSampleSvgDataUrl('Espirometría Normal', `${fullName} · FVC 98% · FEV1 96%`),
        });
        const firstEnc = encounters.find((e) => e.patientId === pId);
        if (firstEnc) {
          revisions.push({
            id: nextId(),
            specialtyContextId: context.specialtyContextId,
            patientId: pId,
            entity: 'ENCOUNTER',
            entityId: firstEnc.id,
            occurredAt: isoDateTimeDaysAgo(20, 10, 0, now),
            operation: 'CORRECT',
            previousVersion: 1,
            newVersion: 2,
            reason: 'Se agregó dosis exacta de corticoide inhalado.',
            previous: {
              form_definition_snapshot: firstEnc.formDefinitionSnapshot,
              form_values: { ...firstEnc.formValues, treatment: 'Continuar Budesonida.' },
              formula_results: {},
            },
          });
        }
      }
    });
  } else {
    const adultProfiles = [
      { sex: 'FEMALE' as const, years: 26, allergy: null, condition: null, med: null, w: 61, h: 165, bp: '110/70', hr: 72, daysAgo: 0 },
      { sex: 'MALE' as const, years: 48, allergy: 'AINEs (urticaria)', condition: 'Hipertensión arterial leve', med: 'Losartán 50mg / día', w: 84, h: 177, bp: '132/84', hr: 76, daysAgo: 0 },
      { sex: 'FEMALE' as const, years: 35, allergy: null, condition: null, med: null, w: 58, h: 162, bp: '115/72', hr: 68, daysAgo: 4 },
      { sex: 'MALE' as const, years: 62, allergy: null, condition: 'Dislipemia mixta', med: 'Atorvastatina 20mg / noche', w: 79, h: 173, bp: '128/80', hr: 70, daysAgo: 9 },
      { sex: 'FEMALE' as const, years: 54, allergy: 'Sulfamidas', condition: 'Hipotiroidismo', med: 'Levotiroxina 50mcg en ayunas', w: 67, h: 160, bp: '120/76', hr: 74, daysAgo: 15 },
      { sex: 'MALE' as const, years: 29, allergy: null, condition: null, med: null, w: 74, h: 180, bp: '118/75', hr: 64, daysAgo: 23 },
      { sex: 'FEMALE' as const, years: 71, allergy: null, condition: 'Artrosis de rodilla', med: 'Paracetamol 500mg SOS', w: 65, h: 158, bp: '136/82', hr: 78, daysAgo: 45 },
      { sex: 'MALE' as const, years: 19, allergy: null, condition: null, med: null, w: 70, h: 175, bp: '112/68', hr: 66, daysAgo: 72 },
    ];

    adultProfiles.forEach((prof, idx) => {
      const pId = nextId();
      const first = prof.sex === 'FEMALE' ? pick(FEMALE_FIRST, idx + seedOffset) : pick(MALE_FIRST, idx + seedOffset);
      const last = pick(LAST_NAMES, idx * 3 + seedOffset);
      const fullName = `${first} ${last}`;
      const birthDate = isoDateMonthsAgo(prof.years * 12, idx * 11, now);
      const dni = String(18_500_000 + ((idx + 1) * 1_123_457 + seedOffset * 91_231) % 29_000_000);
      const phone = `+54911${String(4300_0000 + ((idx + 1) * 612_341 + seedOffset * 27_111) % 55_000_000)}`;
      const coverage = pick(COVERAGES, idx + seedOffset);
      const isParticular = coverage === 'Particular';

      const clinicalEntries: ClinicalEntry[] = [];
      if (prof.allergy) {
        clinicalEntries.push({
          id: `ce-${pId}-1`,
          kind: 'ALLERGY',
          text: prof.allergy,
          details: 'Confirmado en anamnesis',
          date: isoDateDaysAgo(180, now),
          certainty: 'CONFIRMED',
          status: 'ACTIVE',
          recordedAt: isoDateTimeDaysAgo(30, 10, 0, now),
          authorUserId: DEMO_CLINICIAN_ID,
        });
      }
      if (prof.condition) {
        clinicalEntries.push({
          id: `ce-${pId}-2`,
          kind: 'PROBLEM',
          text: prof.condition,
          details: 'Seguimiento ambulatorio',
          date: isoDateDaysAgo(120, now),
          certainty: 'CONFIRMED',
          status: 'ACTIVE',
          recordedAt: isoDateTimeDaysAgo(30, 10, 0, now),
          authorUserId: DEMO_CLINICIAN_ID,
        });
      }
      if (prof.med) {
        clinicalEntries.push({
          id: `ce-${pId}-3`,
          kind: 'MEDICATION',
          text: prof.med,
          details: 'Esquema vigente',
          date: isoDateDaysAgo(60, now),
          certainty: 'CONFIRMED',
          status: 'ACTIVE',
          recordedAt: isoDateTimeDaysAgo(30, 10, 0, now),
          authorUserId: DEMO_CLINICIAN_ID,
        });
      }

      const formValues: WizardFormValues = {
        sys_firstName: first,
        sys_lastName: last,
        sys_dni: dni,
        sys_dob: birthDate,
        sys_sex: prof.sex,
        sys_phone: phone,
        sys_email: `${first.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}.${last.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}@ejemplo.com`,
        sys_insurance: isParticular ? 'Particular' : coverage,
        address: `${pick(STREETS, idx + seedOffset)} ${800 + idx * 210}, CABA`,
        sys_allergyStatus: prof.allergy ? 'PRESENT' : 'NONE',
        sys_allergies: prof.allergy ?? '',
        sys_conditionStatus: prof.condition ? 'PRESENT' : 'NONE',
        sys_conditions: prof.condition ?? '',
        sys_medicationStatus: prof.med ? 'PRESENT' : 'NONE',
        sys_medications: prof.med ?? '',
        sys_historySource: 'CONFIRMED',
      };

      patients.push({
        id: pId,
        specialtyContextId: context.specialtyContextId,
        version: 1,
        workspaceVersion: context.version,
        fullName,
        birthDate,
        nationalId: dni,
        gender: prof.sex,
        bloodType: idx % 2 === 0 ? 'A+' : '0+',
        phone,
        email: String(formValues['sys_email']),
        address: String(formValues['address']),
        insuranceInfo: isParticular ? null : { providerName: coverage, affiliateNumber: `55${pId}14` },
        allergies: prof.allergy ? [prof.allergy] : [],
        chronicConditions: prof.condition ? [prof.condition] : [],
        guardianInfo: null,
        personalHistory: { habitualMedication: prof.med ? [prof.med] : [] },
        familyHistory: null,
        formValues,
        formulaResults: {},
        formDefinitionSnapshot: structuredClone(context.definition.patientForm),
        formulaContext: {},
        clinicalEntries,
        noKnownAllergiesAt: prof.allergy ? undefined : isoDateTimeDaysAgo(30, 10, 0, now),
        appliedVaccines: {},
      });

      const visitCount = idx < 3 ? 2 : 1;
      for (let v = 0; v < visitCount; v++) {
        const encId = nextId();
        const days = v === 0 ? prof.daysAgo : prof.daysAgo + 45;
        const encIso = isoDateTimeDaysAgo(days, 10 + v * 2, 0, now);
        const complaint = v === 0 ? `Control clínico de ${entry.name.toLowerCase()}` : 'Primera evaluación ambulatoria';
        const dx = prof.condition ? `${prof.condition} — compensado` : `Control de ${entry.name.toLowerCase()} sin hallazgos agudos`;
        const encValues: WizardFormValues = {
          chiefComplaint: complaint,
          presentIllness: 'Paciente estable, buena tolerancia al plan indicado.',
          bloodPressure: prof.bp,
          heartRate: prof.hr,
          temperature: 36.6,
          oxygenSaturation: 98,
          weightKg: prof.w,
          heightCm: prof.h,
          physicalExam: 'Examen físico dirigido dentro de parámetros esperables.',
          assessment: dx,
          diagnosis: dx,
          treatment: prof.med ? `Continuar ${prof.med}. Medidas higiénico-dietéticas.` : 'Pautas preventivas y control periódico.',
          followUpDate: days === 0 ? isoDateDaysAgo(-30, now) : null,
        };
        encounters.push({
          id: encId,
          specialtyContextId: context.specialtyContextId,
          patientId: pId,
          version: 1,
          workspaceVersion: context.version,
          encounterDate: encIso,
          consultationType: v === visitCount - 1 ? 'FIRST_VISIT' : 'FOLLOW_UP',
          chiefComplaint: complaint,
          historyOfPresentIllness: String(encValues['presentIllness']),
          physicalExamination: String(encValues['physicalExam']),
          primaryDiagnosisCode: null,
          primaryDiagnosisDescription: dx,
          secondaryDiagnoses: null,
          clinicalImpression: dx,
          treatmentPlan: String(encValues['treatment']),
          followUpInstructions: String(encValues['treatment']),
          followUpDate: encValues['followUpDate'] as string | null,
          diagnosticOrders: null,
          measurements: { weightKg: prof.w, heightCm: prof.h },
          vitalSigns: {
            systolicBloodPressure: Number(prof.bp.split('/')[0]),
            diastolicBloodPressure: Number(prof.bp.split('/')[1]),
            heartRate: prof.hr,
            temperatureCelsius: 36.6,
            oxygenSaturationPercent: 98,
          },
          prescriptions: null,
          formValues: encValues,
          formulaResults: evaluateFormFormulas(context.definition.encounterForm.categories, encValues, {
            'patient.ageYears': prof.years,
            'patient.gender': prof.sex,
            'patient.latestWeightKg': prof.w,
            'patient.latestHeightCm': prof.h,
          }),
          formDefinitionSnapshot: structuredClone(context.definition.encounterForm),
          formulaContext: {},
        });
      }

      if (idx === 1) {
        prescriptions.push({
          id: nextId(),
          specialtyContextId: context.specialtyContextId,
          patientId: pId,
          type: 'PRESCRIPTION',
          diagnosisDescription: 'Hipertensión arterial leve',
          generalInstructions: 'Control de tensión arterial semanal y dieta hiposódica.',
          prescriptions: [
            {
              medicationName: 'Losartán 50mg comp.',
              dosage: '50 mg',
              administrationRoute: 'Vía Oral',
              frequency: 'Cada 24 horas por la mañana',
              durationDays: 30,
              instructions: 'No suspender sin indicación médica.',
            },
          ],
          diagnosticOrders: [],
          createdAt: isoDateTimeDaysAgo(0, 10, 15, now),
        });
      }
      if (idx === 3) {
        studies.push({
          id: nextId(),
          specialtyContextId: context.specialtyContextId,
          patientId: pId,
          name: 'Perfil lipídico y glucemia',
          originalFileName: 'perfil-lipidico.pdf',
          contentType: 'application/pdf',
          fileSize: 642,
          description: 'Control metabólico anual.',
          uploadedAt: isoDateTimeDaysAgo(8, 12, 0, now),
          dataUrl: makeSyncSamplePdfDataUrl(entry.name, fullName),
        });
      }
    });
  }

  return { patients, encounters, prescriptions, studies, revisions, nextId: idSeq };
}

export function createInitialDemoSession(specialtyId: number, openWizardFirst: boolean): DemoSession {
  const session = blankDemoSession();
  const orderedIds = [
    specialtyId,
    ...DEMO_SPECIALTIES_CATALOG.filter((s) => s.id !== specialtyId).slice(0, 2).map((s) => s.id),
  ];

  // Create primary context with generated cohort, and leave secondary specialties ready to switch if desired.
  const primaryEntry = findDemoSpecialty(orderedIds[0]);
  const primaryCtx: DemoContextRecord = {
    specialtyContextId: 1,
    specialtyId: primaryEntry.id,
    version: 1,
    onboardingCompleted: !openWizardFirst,
    currentStepKey: openWizardFirst ? 'encounter' : 'completed',
    definition: structuredClone(primaryEntry.definition),
    draftDefinition: openWizardFirst ? structuredClone(primaryEntry.definition) : null,
    patientColumnsConfig: {},
    quickNotes:
      primaryEntry.code === 'pediatrics'
        ? 'Recordar revisar carnet de vacunación en controles de 15 y 18 meses.'
        : 'Revisar estudios complementarios pendientes de la semana.',
    preferencesVersion: 1,
  };

  const cohort = generateCohortForContext(primaryCtx, session.nextId, 0);
  session.contexts = [primaryCtx];
  session.activeContextId = primaryCtx.specialtyContextId;
  session.patients = cohort.patients;
  session.encounters = cohort.encounters;
  session.prescriptions = cohort.prescriptions;
  session.studies = cohort.studies;
  session.revisions = cohort.revisions;
  session.nextId = cohort.nextId;

  return session;
}
