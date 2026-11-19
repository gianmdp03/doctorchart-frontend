// Synthetic browser-only boundary. Never imported by the application build.
const defaults = require('../../src/app/features/onboarding/testing/default-specialties.json');
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const ts = require('typescript');
const growthSource = path.resolve(__dirname, '../../src/app/core/testing/growth.fixture.ts');
const growthModule = { exports: {} };
new Function('exports', 'require', ts.transpileModule(fs.readFileSync(growthSource, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText)(growthModule.exports, createRequire(growthSource));
const growth = growthModule.exports.patientGrowthFixture(1);
const vaccinationCalendar = {
  calendarId: 'ui-test', metadata: { titulo: 'Calendario de vacunación de prueba', bajada: 'Datos sintéticos de ensayo; no usar como guía clínica.', pais: 'Argentina', organismo: 'Fuente de ensayo', telefono: '', sitio_web: '', ano_vigencia: 2026 },
  grupos_etarios_columnas: [{ grupo: 'Edades de prueba', columnas: [{ id: 'first', nombre: 'Edad inicial', orden: 1 }, { id: 'later', nombre: 'Edad posterior', orden: 2 }] }],
  referencias_patologias: {}, notas_aplicacion: {},
  vacunas: [{ id: 'test-one', nombre: 'Vacuna de prueba A', categoria: 'calendario_regular', referencia_patologia: { numero: 1, descripcion: 'Referencia de prueba' }, aplicaciones: [{ id: 'dose-a', ageRule: null, columnas: ['first'], dosis: 'Dosis de prueba A', tipo: 'dosis_primaria', notas: [{ letra: 'A', condicion: 'Condición de prueba A' }] }] }, { id: 'test-risk', nombre: 'Vacuna de prueba B', categoria: 'exclusivo_zonas_de_riesgo', referencia_patologia: null, aplicaciones: [{ id: 'dose-b', ageRule: null, columnas: ['later'], dosis: 'Dosis de prueba B', tipo: 'riesgo', notas: [] }] }],
};
const zone = 'America/Argentina/Buenos_Aires';
const today = new Intl.DateTimeFormat('en-CA', { timeZone: zone }).format(new Date());
const addDays = (date, n) => new Date(Date.parse(date + 'T12:00:00Z') + n * 86400000).toISOString().slice(0, 10);
const tomorrow = addDays(today, 1);
const publicId = '22222222-2222-4222-8222-222222222222';
const userId = '11111111-1111-4111-8111-111111111111';
const clinic = { id: '103', name: 'Consultorio de prueba Centro', modality: 'IN_PERSON', country: 'Argentina', province: 'Buenos Aires', city: 'Mar del Plata', address: 'Dirección sintética de ensayo', timezone: zone, status: 'ACTIVE', version: '1', createdAt: today, updatedAt: today, futureBookings: 3 };
const virtual = { ...clinic, id: '104', name: 'Agenda virtual de prueba', modality: 'TELECONSULTATION', address: '', city: '' };
const assignedClinic = { ...clinic, specialtyContextIds: ['101', '202'] };
const specialties = defaults.map(({ id, code, name }) => ({ id, code, name }));
specialties.push({ id: 1, code: 'pediatrics', name: 'Pediatría' });
const definition = structuredClone(defaults[0].definition);
definition.modulesConfig.AI_ASSISTANT = false;
const contextSpecialty = id => specialties[id === 202 ? 1 : id === 303 ? 2 : 0];
const setup = id => ({ id: 1, specialtyContextId: id, version: 1, specialty: contextSpecialty(id), experience: { specialtyId: contextSpecialty(id).id, specialtyVersion: 1, navigation: ['DASHBOARD', 'PATIENTS', 'VACCINATION', 'WIZARD'], patientRecordTabs: ['SUMMARY', 'ENCOUNTERS', 'PRESCRIPTIONS', 'STUDIES', 'VACCINATION', ...(id === 303 ? ['GROWTH'] : [])], patientRecordActions: ['EDIT_PATIENT', 'NEW_ENCOUNTER', 'PRINT_DOCUMENT', ...(id === 303 ? ['VIEW_GROWTH'] : [])] }, sourceWizardVersion: 1, draftSourceWizardVersion: null, onboardingCompleted: true, currentStepKey: 'completed', definition: { ...definition, modulesConfig: { ...definition.modulesConfig, GROWTH_CHARTS: id === 303 } }, draftDefinition: null });
const contexts = [101, 202, 303].map(id => ({ id, workspaceId: 1, version: 1, specialty: contextSpecialty(id), onboardingCompleted: true, ready: true, hasDraft: false }));
const formValues = { sys_firstName: 'Paciente de prueba', sys_lastName: 'Pérez', sys_dni: '12345678', sys_dob: '1990-04-12', sys_sex: 'FEMALE', sys_phone: '2231234567', sys_email: 'paciente@example.test', sys_insurance: 'Cobertura de prueba', address: 'Dirección de ensayo', sys_allergyStatus: 'PRESENT', sys_allergies: 'Alergia registrada de prueba', sys_conditionStatus: 'PRESENT', sys_conditions: 'Antecedente de prueba', sys_medicationStatus: 'NONE', sys_historySource: 'PATIENT', physicalActivity: 'Información sintética para verificar texto largo y lectura clínica.', smoking: 'Sin información registrada.', familyHistory: 'Información de ensayo, sin datos reales.' };
formValues.sys_historySource = definition.patientForm.categories.flatMap(c => c.fields).find(f => f.key === 'sys_historySource').options[0].value;
const patient = (id = 101, number = 1) => ({ id: number, specialtyContextId: id, fullName: number === 1 ? 'Paciente de prueba Pérez' : 'Paciente de prueba García', birthDate: '1990-04-12', nationalId: '12345678', gender: 'FEMALE', bloodType: 'A+', phone: '2231234567', email: 'paciente@example.test', version: 1, workspaceVersion: 1, formValues, formulaResults: {}, formulaContext: {}, formDefinitionSnapshot: definition.patientForm, allergies: ['Alergia registrada de prueba'], chronicConditions: ['Antecedente de prueba'], insuranceInfo: { providerName: 'Cobertura de prueba', affiliateNumber: '123456' } });
const patients = id => Array.from({ length: 6 }, (_, index) => ({ ...patient(id, index + 1), ageInMonths: 439, ageDisplay: '36 años', ageGroup: 'ADULT', hasPendingVaccine: false, totalEncounters: 3, lastEncounterDate: today }));
const encounter = (id = 101, number = 501) => ({ ...patient(id), id: number, patientId: 1, patientFullName: patient(id).fullName, encounterDate: today + 'T14:30:00Z', specialtyId: contextSpecialty(id).id, specialty: contextSpecialty(id), consultationType: 'FOLLOW_UP', chiefComplaint: 'Consulta de seguimiento de prueba', formValues: { chiefComplaint: 'Consulta de seguimiento de prueba', presentIllness: 'Contenido sintético para verificar la jerarquía del registro y la legibilidad de textos clínicos extensos.', bloodPressure: '120/80', heartRate: 72, temperature: 36.5, oxygenSaturation: 98, weightKg: 65, heightCm: 165, physicalExam: 'Registro de prueba para validación de presentación.', assessment: 'Evaluación sintética.', diagnosis: 'Diagnóstico de ensayo', treatment: 'Texto de prueba, sin recomendaciones clínicas.', followUp: 'Control de prueba', followUpDate: tomorrow }, formDefinitionSnapshot: definition.encounterForm, followUpDate: tomorrow, primaryDiagnosisDescription: 'Registro de prueba' });
const bookings = () => [
  { id: '1', clinicId: clinic.id, patientId: 1, start: tomorrow + 'T12:00:00Z', end: tomorrow + 'T12:20:00Z', status: 'CONFIRMED', version: '1', contactName: 'Solicitante de prueba', attendeeName: 'Paciente de prueba Pérez', contactPhone: '2231234567', specialtyContextId: '101', specialty: specialties[0], clinicSnapshot: { name: clinic.name, timezone: zone, modality: 'IN_PERSON' }, provenance: { kind: 'SCHEDULE_BLOCK', blockId: '1', slotMinutes: 20 } },
  { id: '2', clinicId: virtual.id, patientId: null, start: tomorrow + 'T13:00:00Z', end: tomorrow + 'T13:30:00Z', status: 'CHECKED_IN', version: '1', contactName: 'Solicitante de prueba', attendeeName: 'Paciente de prueba García', contactPhone: '2231234567', specialtyContextId: '202', specialty: specialties[1], clinicSnapshot: { name: virtual.name, timezone: zone, modality: 'TELECONSULTATION' }, provenance: { kind: 'SCHEDULE_BLOCK', blockId: '2', slotMinutes: 30 } },
  { id: '3', clinicId: clinic.id, patientId: null, start: tomorrow + 'T14:00:00Z', end: tomorrow + 'T14:20:00Z', status: 'CANCELLED', version: '2', contactName: 'Solicitante de prueba', attendeeName: 'Turno cancelado de prueba', contactPhone: '', specialtyContextId: '101', specialty: specialties[0], clinicSnapshot: { name: clinic.name, timezone: zone, modality: 'IN_PERSON' }, provenance: { kind: 'SCHEDULE_BLOCK', blockId: '1', slotMinutes: 20 } },
];
const slots = date => [15, 16, 17, 18].flatMap(hour => [0, 30].map(minute => ({ start: `${date}T${hour}:${minute === 0 ? '00' : minute}:00Z`, end: `${date}T${hour}:${minute === 0 ? '20' : '50'}:00Z`, specialtyContextId: '101', specialty: specialties[0], provenance: { kind: 'SCHEDULE_BLOCK', blockId: '1', slotMinutes: 20 } })));
const publicClinic = { ...clinic, id: '33333333-3333-4333-8333-333333333333' };
const profile = { id: publicId, name: 'Profesional de prueba', description: 'Perfil sintético para la revisión visual. No corresponde a una persona real.', specialty: 'Medicina General', specialtyCode: 'general_medicine', specialties: [{ id: '101', code: 'general_medicine', name: 'Medicina General', clinics: [publicClinic] }, { id: '202', code: 'dermatology', name: 'Dermatología', clinics: [publicClinic] }], clinics: [publicClinic], form: { version: '1', questions: [] } };
const page = (content, size = 20) => ({ content, totalElements: content.length, totalPages: 1, size, number: 0, page: { totalElements: content.length, totalPages: 1, size, number: 0 } });

async function install(context, { role = 'COMPANY', authenticated = true, hasPlan = true, initialSetup = false, state = {} } = {}) {
  const requests = [], writes = [], unexpected = [];
  const teleconsultations = contexts.map(context => ({
    specialtyContextId: String(context.id), specialty: context.specialty.name,
    clinicId: virtual.id, enabled: context.id === 101,
  }));
  let portalVerified = false;
  const user = { id: userId, aud: 'authenticated', email: 'profesional@example.test', role: 'authenticated', app_metadata: { role, app_modules: { doctorchart: { active: true, tier: 'PRO', expires_at: '2099-01-01T00:00:00Z' } } }, user_metadata: { full_name: 'Profesional de prueba' } };
  if (!hasPlan) user.app_metadata.app_modules = {};
  const token = 'eyJhbGciOiJIUzI1NiJ9.' + Buffer.from(JSON.stringify({ sub: userId, exp: 4070908800, role: 'authenticated' })).toString('base64url') + '.synthetic';
  if (authenticated) await context.addInitScript(session => { try { localStorage.setItem('sb-localhost-auth-token', JSON.stringify(session)); } catch {} }, { access_token: token, refresh_token: 'synthetic', token_type: 'bearer', expires_in: 3600, expires_at: 4070908800, user });
  await context.route('**/*', async route => {
    const request = route.request(), url = new URL(request.url()), p = url.pathname, method = request.method();
    if (url.origin === 'http://127.0.0.1:4202' && !p.startsWith('/api/')) return route.continue();
    const id = Number(url.searchParams.get('specialtyContextId')) || 101;
    requests.push({ method, path: p, context: id });
    if (!['GET', 'OPTIONS'].includes(method)) writes.push({ method, path: p, body: request.postDataJSON() });
    const headers = { 'access-control-allow-origin': 'http://127.0.0.1:4202', 'access-control-allow-credentials': 'true', 'access-control-allow-headers': request.headers()['access-control-request-headers'] || '*' };
    const fulfill = (data, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(data), headers });
    if (method === 'OPTIONS') return fulfill({});
    if (p.startsWith('/auth/v1/')) return fulfill(p.endsWith('/user') ? user : { user, access_token: token, refresh_token: 'synthetic', expires_in: 3600 });
    if (state.failPatients && p.endsWith('/patients')) return fulfill({ message: 'Error de red de ensayo' }, 503);
    if (state.failBooking && p.endsWith('/bookings') && method === 'POST') return fulfill({ code: 'SLOT_UNAVAILABLE', message: 'El horario se ocupó. Elegí otro horario.' }, 409);
    if (p.endsWith('/account/profile')) return fulfill({ fullName: 'Profesional de prueba', hasAvatar: false });
    if (p.endsWith('/doctor/profile')) return fulfill({ id: 1, userId, specialty: null, isSpecialtyLocked: true });
    if (p.endsWith('/workspace/contexts')) return fulfill(initialSetup ? [] : contexts);
    if (p.endsWith('/workspace')) return fulfill(initialSetup ? null : setup(id));
    if (p.endsWith('/workspace/wizard/draft')) { const body = request.postDataJSON(); return fulfill({ ...setup(id), version: body.expectedVersion + 1, currentStepKey: body.currentStepKey, draftDefinition: body.definition, draftSourceWizardVersion: 1 }); }
    if (p.endsWith('/workspace/preferences')) return fulfill({ version: 1, patientColumnsConfig: {}, quickNotes: '' });
    if (p.endsWith('/workspace/quick-notes')) return fulfill({ version: 2, patientColumnsConfig: {}, quickNotes: request.postDataJSON()?.content || '' });
    if (p.endsWith('/admin/specialties')) return fulfill(defaults.map(d => ({ ...d, active: true, version: 1, publishedVersion: 1, hasDraft: false })));
    if (p.includes('/admin/specialties/') && p.endsWith('/wizard/reviews')) return fulfill({
      revision: 1, fingerprint: 'a'.repeat(64), draftState: 'PUBLISHED', publicationState: 'APPROVED',
      canApprove: false, canPublish: false, canActivate: true, publishedApprovalId: 1, history: [], nextBefore: null,
    });
    if (p.includes('/admin/specialties/') && /wizard|versions/.test(p)) return fulfill({ specialtyId: 2, version: 1, publishedVersion: 1, publishedDefinition: definition, draftDefinition: definition });
    if (p.endsWith('/billing/plans')) return fulfill({ message: 'El catálogo de planes no está disponible en este ensayo visual.' }, 503);
    if (p.endsWith('/specialties')) return fulfill(specialties);
    if (p.endsWith('/encounters/dashboard')) return fulfill({ totalPatients: 6, asOfDate: today, encountersThisMonth: 12, encountersToday: 3, recentEncounters: [{ encounter: encounter(id), patientAgeLabel: '36 años', patientNationalId: '12345678', encounterLocalDate: today }], upcomingFollowUps: [{ encounterId: 501, patientId: 1, patientFullName: patient(id).fullName, followUpDate: tomorrow }] });
    if (p.endsWith('/patients') && method === 'GET') return fulfill(page(state.emptyPatients ? [] : patients(id)));
    if (p.endsWith('/patients') && method === 'POST') return fulfill({ ...patient(id, 7), formValues: request.postDataJSON().values }, 201);
    if (/\/patients\/\d+$/.test(p)) return fulfill(id === 303 ? { ...patient(id), birthDate: growth.birthDate, gender: 'MALE', formValues: { ...formValues, sys_dob: growth.birthDate, sys_sex: 'MALE' } } : patient(id, Number(p.split('/').at(-1))));
    if (p.endsWith('/encounters')) return fulfill(page([encounter(id)], 5));
    if (/\/encounters\/patient\/\d+$/.test(p)) return fulfill([encounter(id)]);
    if (p.endsWith('/clinical-summary')) return fulfill({ patientId: 1, patientVersion: 1, asOfDate: today, profile: { entries: [{ id: 'allergy-1', kind: 'ALLERGY', text: 'Alergia registrada de prueba', details: '', date: today, certainty: 'REPORTED', status: 'ACTIVE', recordedAt: today, authorUserId: userId }] }, historical: [], lastEncounter: { id: 501, date: today, complaint: 'Consulta de seguimiento de prueba', diagnosis: 'Registro de prueba', followUp: 'Control de prueba', followUpDate: tomorrow }, vaccinations: null, recentMedications: [], recordedDiagnoses: [], history: { ALLERGY: { status: 'PRESENT', items: ['Alergia registrada de prueba'], certainty: 'REPORTED', date: today, source: 'PATIENT', sourceId: 1 } } });
    if (/\/encounters\/\d+$/.test(p)) return fulfill(encounter(id));
    if (p.endsWith('/growth')) return fulfill(growth);
    if (p.endsWith('/vaccination-calendar')) return state.calendarAvailable ? fulfill(vaccinationCalendar) : fulfill({ message: 'Fuente de calendario no disponible en el ensayo.' }, 503);
    if (p.endsWith('/studies') || p.endsWith('/prescriptions') || p.endsWith('/medications')) return fulfill([]);
    if (p.endsWith('/vaccinations')) return fulfill({ patientId: 1, patientVersion: 1, calendarId: '2026', asOfDate: today, ageInMonths: 439, ageLabel: '36 años', doses: [] });
    if (p.endsWith('/follow-ups')) return fulfill({ items: [] });
    if (p.endsWith('/clinics/capabilities')) return fulfill({ entitlements: { status: 'VERIFIED', revision: 'fixture', validUntil: '2099-01-01T00:00:00Z', clinicManagement: true, max_clinics: 3 }, usage: { counted: 1 }, actions: { create: true, edit: true, activate: true, deactivate: true, archive: true, restore: true }, reason: null });
    if (/\/clinics\/(103|104)$/.test(p)) return fulfill(p.endsWith('104') ? virtual : assignedClinic);
    if (p.endsWith('/teleconsultations')) return fulfill(teleconsultations);
    if (/\/teleconsultations\/\d+$/.test(p) && method === 'PUT') {
      const setting = teleconsultations.find(item => item.specialtyContextId === p.split('/').at(-1));
      if (!setting) return fulfill({ code: 'SPECIALTY_CONTEXT_NOT_FOUND' }, 404);
      setting.enabled = request.postDataJSON().enabled;
      return fulfill(setting);
    }
    if (p.endsWith('/clinics')) return fulfill({ items: [assignedClinic, virtual], page: 0, size: 20, totalElements: 2 });
    if (p.endsWith('/schedule/occupied')) {
      const date = url.searchParams.get('from') || today;
      const next = addDays(date, 1);
      const other = { ...clinic, id: '105', name: 'Consultorio de prueba Norte' };
      const [first, second] = p.endsWith('/104/schedule/occupied') ? [clinic, other] : [other, virtual];
      return fulfill({ timezone: zone, items: [
        { ...first, clinicId: first.id, start: date + 'T12:00:00Z', end: date + 'T14:00:00Z' },
        { ...first, clinicId: first.id, start: date + 'T14:00:00Z', end: date + 'T17:00:00Z' },
        { ...second, clinicId: second.id, start: next + 'T19:00:00Z', end: next + 'T21:00:00Z' },
      ] });
    }
    if (p.endsWith('/schedule')) return fulfill({ clinicId: '103', version: '1', configured: true, minNoticeMinutes: 0, maxAdvanceDays: 30, weekly: Array.from({ length: 7 }, (_, i) => ({ weekday: i + 1, ranges: i < 5 ? [{ id: String(i + 1), specialtyContextId: '101', start: '09:00', end: '12:00', slotMinutes: 20 }] : [] })), exceptions: [] });
    if (p.endsWith('/public/appointments/challenge')) return fulfill({ token: 'm6-fixture-355947', difficulty: 18 });
    if (p.endsWith('/public/appointments/access/request')) return fulfill({ requestId: 'solicitud-sintetica' }, 202);
    if (p.endsWith('/public/appointments/access/verify')) {
      portalVerified = true;
      return route.fulfill({ status: 204 });
    }
    if (p.endsWith('/public/appointments/my-bookings')) {
      if (!portalVerified) return fulfill({code: 'BOOKING_ACCESS_DENIED'}, 403);
      return fulfill({ hasMore: false, items: [{ reference: 'confirmacion-sintetica', status: 'CONFIRMED', start: tomorrow + 'T15:00:00Z', end: tomorrow + 'T15:20:00Z', doctorName: profile.name, clinicName: clinic.name, address: clinic.address, timezone: zone, version: '1', canChange: false }] });
    }
    if (p.endsWith('/public/appointments/doctors')) return fulfill({ items: [profile, { ...profile, id: '44444444-4444-4444-8444-444444444444', name: 'Profesional de prueba García' }, { ...profile, id: '55555555-5555-4555-8555-555555555555', name: 'Profesional de prueba López' }], specialties: specialties.map(s => ({ code: s.code, name: s.name })), hasMore: false });
    if (p.includes('/public/appointments/doctors/') && !/availability|bookings/.test(p)) return fulfill(profile);
    if (p.endsWith('/availability')) { const from = url.searchParams.get('from') || today; const count = Number(url.searchParams.get('days')) || 7; return fulfill({ clinicId: '103', timezone: zone, days: Array.from({ length: count }, (_, i) => ({ date: addDays(from, i), slots: slots(addDays(from, i)) })) }); }
    if (p.endsWith('/bookings') && method === 'POST' && p.includes('/public/')) return fulfill({ reference: 'reserva-sintetica', status: 'CONFIRMED', start: request.postDataJSON().start, end: tomorrow + 'T15:20:00Z', doctorName: profile.name, clinicName: clinic.name, specialtyName: 'Medicina General', address: clinic.address, timezone: zone, contactName: request.postDataJSON().contactName, attendeeName: request.postDataJSON().attendeeName || request.postDataJSON().contactName }, 201);
    if (p.endsWith('/public-details')) return fulfill(null);
    if (p.endsWith('/bookings/form') || p.endsWith('/booking-form')) {
      return fulfill({version: '1', questions: [{key: 'insurance', label: 'Obra social', required: false}]});
    }
    if (p.endsWith('/workspace/clinical-access') || p.endsWith('/patients/archived')) {
      return fulfill({items: []});
    }
    if (p.endsWith('/events')) return fulfill({ items: [] });
    if (/\/bookings\/[123]$/.test(p)) return fulfill(bookings().find(b => b.id === p.split('/').at(-1)));
    if (p.endsWith('/bookings')) return fulfill({ items: bookings(), totalElements: 3, hasMore: false });
    if (p.endsWith('/booking-publication')) return fulfill({ version: '1', name: profile.name, description: profile.description, published: true, publicId, specialtyContextIds: ['101', '202'], clinics: [{ clinicId: clinic.id, enabled: true, address: clinic.address }], questions: [] });
    if (p.endsWith('/staff/session')) return fulfill({ email: 'secretaria@example.test', name: 'Secretaría de prueba', csrfToken: 'synthetic', expiresAt: '2099-01-01T00:00:00Z' });
    if (p.endsWith('/staff/assignments')) return fulfill({ items: [{ ownerId: userId, accessId: '10', clinicId: clinic.id, clinicName: clinic.name, doctorName: profile.name, modality: 'IN_PERSON', timezone: zone, permissions: ['view', 'create', 'cancel', 'reschedule', 'status'], validUntil: '2099-01-01T00:00:00Z' }] });
    if (p.endsWith('/secretaries')) return fulfill({ items: [{ id: '10', email: 'secretaria@example.test', name: 'Secretaría de prueba', version: '1', active: true, activated: true, permissions: ['view', 'create', 'cancel', 'reschedule', 'status'], clinicIds: [clinic.id] }], capabilities: { manage: true, reason: null, validUntil: '2099-01-01T00:00:00Z' } });
    if (/meet|google/.test(p)) return fulfill({ connected: false, status: 'DISCONNECTED' });
    unexpected.push({ method, path: p });
    return fulfill({ message: 'Endpoint sin fixture: ' + p }, 501);
  });
  return { requests, writes, unexpected, state };
}
module.exports = { install, today, tomorrow, zone, publicId, definition, contexts, patient, encounter };
