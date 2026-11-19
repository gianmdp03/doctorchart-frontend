// Exercised only by the owned M6 laboratory runner.
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const verifyPsychiatryPrivacy = require('./psychiatry-privacy-sp03f.cjs');

const png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
const calendarDate = iso => iso.split('-').reverse().join('/');
const fields = form => form.categories.flatMap(category => category.fields);
const byKey = (form, key) => fields(form).find(field => field.key === key);

async function login(page, origin, account) {
  page.setDefaultTimeout(20000);
  await page.goto(origin + '/login');
  await page.locator('#login-email').fill(account.email);
  await page.locator('#login-password').fill(account.password);
  await page.getByRole('button', { name: 'Ingresar a DoctorChart', exact: true }).click();
}

module.exports = async function provisionalSpecialty({
  page, browser, state, origin, base, api, db, add, finishWizard, patientUI, scheduleUI, chooseClinicalContext,
  clinic, originalContext, originalPatient, templateCode = 'cardiology', slotStart = 16, scheduleDay = 'Sábado', keepActive = false,
}) {
  const artifact = resolve(__dirname, '../../doctorchart-backend-go/templates/' + templateCode + '.provisional.json');
  const template = JSON.parse(readFileSync(artifact, 'utf8'));
  const name = template.createSpecialty.name;
  const report = message => add(name + ': ' + message);
  const numeric = {
    cardiology: { systolicBloodPressure: 120, diastolicBloodPressure: 80, heartRate: 70 },
    endocrinology: { weightKg: 70, heightCm: 170 },
    gastroenterology: {}, pulmonology: { oxygenSaturation: 95 }, rheumatology: { stiffnessDurationMinutes: 15 },
    internal_medicine: { heartRate: 70 }, ophthalmology: { intraocularPressureRight: 15 },
  }[templateCode] ?? {};
  const clinicalSpecific = {
    urology: { urinarySymptoms: 'Síntoma urinario sintético', urologicPainAndLocation: 'Localización sintética' },
    otolaryngology: { evaluatedRegion: 'Región sintética', laterality: 'UNKNOWN' },
    gynecology: { gynecologicSymptoms: 'Síntoma sintético' },
    ophthalmology: { visualAcuityRight: '20/40', visualAcuityMethodRight: 'Método, notación y distancia sintéticos', visualCorrectionRight: 'Corrección informada de prueba', tonometryMethodRight: 'Método sintético', ocularMeasurementConditions: 'Condiciones documentadas de prueba' },
    psychiatry: { mentalStatusExam: 'PSY_MENTAL_TEST_ONLY', dailyFunctioning: 'PSY_FUNCTION_TEST_ONLY', treatmentResponse: 'PSY_RESPONSE_TEST_ONLY', safetyAssessment: 'PSY_SAFETY_TEST_ONLY' },
    obstetrics: { pregnancyReference: 'Referencia ficticia A', documentedGestationalAge: 'Expresión documentada A sin conversión', gestationalAgeSource: 'Fuente ficticia A', obstetricDateNotes: 'Fechas desconocidas en este registro' },
    neurology: { symptomTimeline: 'Episodio inicial sin fecha de inicio conocida', neurologicManifestations: 'Manifestación sintética', functionalImpact: 'Repercusión inicial sintética' },
    rheumatology: { symptomDistribution: 'Región A y región B sintéticas', stiffnessDescription: 'Descripción sintética de la rigidez', functionalImpact: 'Repercusión inicial sintética' },
    traumatology_orthopedics: { evaluatedRegion: 'Región A y región B sintéticas', laterality: 'UNKNOWN', eventMechanism: 'Mecanismo sintético', painAndFunctionalLimitations: 'Limitación inicial descrita' },
    geriatrics: { functionalChanges: 'Cambio inicial descrito', mobilityAndFalls: 'Descripción de movilidad informada', cognitiveObservations: 'Observación sintética informada', visitInformationSource: 'Persona informante de prueba' },
    allergy_immunology: { suspectedExposure: 'Exposición sospechada sintética', allergicHypothesisCertainty: 'SUSPECTED',
      exposureSymptomTiming: 'Relación temporal sintética', clinicalManifestations: 'Manifestación sintética' },
  }[templateCode] ?? {};
  const bookingsBefore = db('SELECT count(*) FROM bookings');
  const secondDoctor = state.doctors?.find(account => account.email === 'doctor-sp02b@local.test');
  const permissionCounts = 'SELECT json_build_array((SELECT count(*) FROM doctor_workspaces),(SELECT count(*) FROM doctor_specialty_contexts),(SELECT count(*) FROM staff_accounts),(SELECT count(*) FROM staff_access),(SELECT count(*) FROM staff_invitations),(SELECT count(*) FROM staff_sessions))::text';
  assert.equal(template.status, 'PROVISIONAL_TEST_ONLY');
  assert.ok(state.admin && secondDoctor, 'Prepare the owned lab with --sp02b');
  const adminContext = await browser.newContext();
  const otherContext = await browser.newContext();
  const staffContext = await browser.newContext();
  try {
    const admin = await adminContext.newPage();
    await login(admin, origin, state.admin);
    await admin.getByRole('heading', { name: 'Especialidades y wizard' }).waitFor();
    const before = await api(page, 'GET', '/specialties');
    assert.ok(!before.some(s => s.code === templateCode));
    const created = await api(admin, 'POST', '/admin/specialties', template.createSpecialty, null, 201);
    assert.equal(created.active, false);
    assert.deepEqual(await api(page, 'GET', '/specialties'), before);
    await api(page, 'GET', '/specialties/' + created.id + '/wizard', null, null, 404);
    const adminPath = '/admin/specialties/' + created.id;
    let experience = await api(admin, 'GET', adminPath + '/experience');
    for (const [key, route] of Object.entries({
      navigation: '/experience',
      patientRecordTabs: '/experience/patient-record-tabs',
      patientRecordActions: '/experience/patient-record-actions',
    })) {
      experience = await api(admin, 'PUT', adminPath + route, {
        expectedVersion: experience.specialtyVersion,
        [key]: template.experience[key],
      });
    }
    const pending = await api(admin, 'GET', adminPath + '/wizard/reviews');
    assert.equal(pending.draftState, 'PENDING');
    await api(admin, 'POST', adminPath + '/wizard/publish', { expectedVersion: pending.revision }, null, 409);
    await api(admin, 'POST', adminPath + '/wizard/reviews', { expectedVersion: pending.revision }, null, 204);
    const publication = await api(admin, 'POST', adminPath + '/wizard/publish', { expectedVersion: pending.revision });
    assert.equal(publication.publishedVersion, 1);
    assert.equal((await api(page, 'GET', '/specialties')).length, before.length + 1);
    report('Draft, experience and publication use the normal admin API; initial seeds are unchanged');

    await page.goto(origin + '/specialties');
    await page.getByRole('button', { name: 'Agregar especialidad', exact: true }).click();
    await page.getByRole('button', { name, exact: true }).click();
    await page.waitForURL(/\/onboarding\/setup\?specialtyContextId=/);
    const contextId = Number(new URL(page.url()).searchParams.get('specialtyContextId'));
    await finishWizard(page);
    const initial = await api(page, 'GET', '/workspace', null, contextId);
    assert.equal(initial.specialty.code, templateCode);
    assert.equal(initial.sourceWizardVersion, 1);
    assert.deepEqual(initial.experience.patientRecordTabs, template.experience.patientRecordTabs);
    if (chooseClinicalContext) {
      await chooseClinicalContext(page, 'Pediatría');
      await page.waitForURL(url => url.searchParams.get('specialtyContextId') === String(originalContext));
      await chooseClinicalContext(page, name);
      await page.waitForURL(url => url.searchParams.get('specialtyContextId') === String(contextId));
      report('The global context selector switches to Pediatrics and back without mixing contexts');
    }
    const specificPatientField = initial.definition.patientForm.categories
      .find(c => c.key !== 'sys_patient_profile' && c.key !== 'sys_clinical_history').fields[0].key;
    const patientValues = { [specificPatientField]: 'Antecedente sintético de ' + name,
      ...(templateCode === 'gynecology' ? { menstrualDataStatus: 'UNKNOWN' } : {}),
      ...(templateCode === 'geriatrics' ? { informantName: 'Informante de prueba', informantRelationship: 'Persona de apoyo informada', informantContact: secondDoctor.email, informationSourceNotes: 'Fuente descriptiva de prueba' } : {}) };
    const permissionsBefore = templateCode === 'geriatrics' ? db(permissionCounts) : null;
    const patient = await patientUI(page, contextId, 'Prueba ' + name, patientValues);
    assert.notEqual(patient, originalPatient);
    const patientRecord = await api(page, 'GET', '/patients/' + patient, null, contextId);
    assert.equal(patientRecord.formValues.sys_allergyStatus, null);
    assert.equal(patientRecord.formValues.sys_medicationStatus, null);
    for (const [key, value] of Object.entries(patientValues)) assert.equal(patientRecord.formValues[key], value);
    if (templateCode === 'geriatrics') {
      assert.equal(db(permissionCounts), permissionsBefore, 'Recording an informant must not create workspaces, contexts, staff accounts, grants, invitations or sessions');
      assert.equal(patientRecord.formValues.baselineFunction, null);
      assert.equal(patientRecord.formValues.supportNetwork, null);
    }
    if (templateCode === 'gynecology') {
      for (const key of ['reproductiveHistory', 'contraceptionHistory', 'menstrualHistory']) assert.equal(patientRecord.formValues[key], null);
    }
    const forbidden = await api(page, 'GET', '/patients/' + patient, null, originalContext, 404);
    assert.equal(forbidden.code, 'PATIENT_NOT_FOUND');
    assert.equal((await api(page, 'GET', '/patients?search=12345678', null, originalContext)).content[0].id, originalPatient);

    await page.getByRole('button', { name: 'Nueva historia clínica', exact: true }).first().click();
    await page.locator('#field-chiefComplaint').fill('Primera consulta sintética');
    const eventDateKey = { neurology: 'symptomOnsetDate', traumatology_orthopedics: 'injuryEventDate' }[templateCode];
    if (eventDateKey) assert.equal(await page.locator('#field-' + eventDateKey).inputValue(), '');
    for (const [key, value] of Object.entries(numeric)) await page.locator('#field-' + key).fill(String(value));
    for (const [key, value] of Object.entries(clinicalSpecific)) {
      const input = page.locator('#field-' + key);
      if (byKey(initial.definition.encounterForm, key).type === 'SELECT') {
        assert.equal(await input.locator('option:checked').innerText(), 'Seleccionar');
        await input.selectOption(value);
      } else await input.fill(value);
    }
    if (templateCode === 'pulmonology') {
      await page.locator('[data-field-key="oxygenSaturation"] .number-with-unit').getByText('%', { exact: true }).waitFor();
    }
    if (templateCode === 'rheumatology') {
      await page.locator('[data-field-key="stiffnessDurationMinutes"] .number-with-unit').getByText('min', { exact: true }).waitFor();
    }
    if (templateCode === 'ophthalmology') {
      await page.locator('[data-field-key="intraocularPressureRight"] .number-with-unit').getByText('mmHg', { exact: true }).waitFor();
      assert.equal(await page.locator('#field-visualAcuityLeft').inputValue(), '');
      assert.equal(await page.locator('#field-intraocularPressureLeft').inputValue(), '');
    }
    if (templateCode === 'obstetrics') {
      assert.equal(await page.locator('#field-obstetricRelevantDate').inputValue(), '');
      assert.equal(await page.locator('#field-gestationalAgeReferenceDate').inputValue(), '');
    }
    if (templateCode !== 'allergy_immunology') {
      await page.locator('#field-sys_allergyStatus').selectOption('PRESENT');
      await page.locator('#field-sys_allergies').fill('Alergia sintética de prueba');
      await page.locator('#field-sys_historySource').selectOption('REPORTED');
    }
    const firstResponse = page.waitForResponse(r =>
      new URL(r.url()).pathname === base + '/encounters' && r.request().method() === 'POST');
    await page.getByRole('button', { name: 'Guardar historia clínica', exact: true }).click();
    const savedFirst = await firstResponse;
    assert.equal(savedFirst.status(), 201);
    const first = await savedFirst.json();
    assert.equal(first.consultationType, 'FIRST_VISIT');
    assert.equal(first.specialtyContextId, contextId);
    for (const [key, value] of Object.entries(numeric)) assert.equal(first.formValues[key], value);
    for (const [key, value] of Object.entries(clinicalSpecific)) assert.equal(first.formValues[key], value);
    if (templateCode === 'allergy_immunology') {
      assert.equal(first.formValues.sys_allergyStatus, null);
      assert.equal((await api(page, 'GET', '/patients/' + patient + '/clinical-summary', null, contextId)).history.ALLERGY, undefined);
    }
    report('The existing Angular wizard persists independent patient fields and a first visit, including optional specialty values without preselection');

    const personal = structuredClone(initial.definition);
    const reason = personal.encounterForm.categories.find(c => c.key === 'reason');
    const originalLabel = byKey(personal.encounterForm, 'chiefComplaint').label;
    byKey(personal.encounterForm, 'chiefComplaint').label = 'Motivo personalizado';
    reason.fields.unshift({
      key: 'pilotNote', label: 'Nota personal de prueba', type: 'TEXT', required: true,
    });
    reason.fields = reason.fields.filter(field => field.key !== 'presentIllness');
    reason.fields.push(
      { key: 'pilotShowDetails', label: 'Mostrar detalle de prueba', type: 'BOOLEAN', required: false },
      { key: 'pilotDetails', label: 'Detalle de prueba', type: 'TEXT', required: false,
        visibleWhen: { fieldKey: 'pilotShowDetails', equals: true } },
    );
    const examKey = byKey(personal.encounterForm, 'physicalExam') ? 'physicalExam' : 'mentalStatusExam';
    assert.ok(byKey(personal.encounterForm, examKey), 'A real editable narrative field is needed for this fixture');
    byKey(personal.encounterForm, examKey).visibleWhen = { fieldKey: 'pilotShowDetails', equals: true };
    personal.encounterForm.categories.push({ key: 'pilotHiddenSection', title: 'Sección de prueba oculta', enabled: false,
      fields: [{ key: 'pilotHiddenValue', label: 'Dato de prueba', type: 'TEXT', required: false }] });
    byKey(personal.patientForm, 'sys_historySource').options.find(option => option.value === 'CONFIRMED').label = 'Revisado';
    personal.encounterForm.categories.unshift(personal.encounterForm.categories.pop());
    const draft = await api(page, 'PUT', '/workspace/wizard/draft', {
      specialtyContextId: contextId, expectedVersion: initial.version, definition: personal, currentStepKey: 'encounter',
    });
    assert.deepEqual((await api(page, 'GET', '/workspace', null, contextId)).draftDefinition, personal);
    const applied = await api(page, 'POST', '/workspace/finish-onboarding', {
      specialtyContextId: contextId, expectedVersion: draft.version,
    });
    assert.deepEqual(applied.definition, personal);
    const next = { patientId: patient, workspaceVersion: applied.version, consultationType: 'FOLLOW_UP' };
    await api(page, 'POST', '/encounters', { ...next, values: { chiefComplaint: 'Control' } }, contextId, 400);
    await api(page, 'POST', '/encounters', { ...next, values: { pilotNote: 'Prueba', presentIllness: 'Campo quitado' } }, contextId, 400);
    const follow = await api(page, 'POST', '/encounters', {
      ...next,
      values: { chiefComplaint: 'Seguimiento remoto', pilotNote: 'Prueba',
        pilotShowDetails: false, pilotDetails: 'Oculto', [examKey]: 'Oculto', pilotHiddenValue: 'Oculto',
        diagnosis: 'Diagnóstico sintético', treatment: 'Plan sintético', followUpInstructions: 'Seguimiento sintético', followUpDate: '2099-01-15',
        ...(templateCode === 'otolaryngology' ? { laterality: 'NOT_APPLICABLE' } : {}),
        ...(templateCode === 'allergy_immunology' ? { ...clinicalSpecific, allergicHypothesisCertainty: 'CONFIRMED' } : {}),
        ...(templateCode === 'neurology' ? { symptomOnsetDate: '2026-01-15', symptomTimeline: 'Cronología actualizada de prueba', functionalImpact: 'Cambio funcional documentado' } : {}),
        ...(templateCode === 'rheumatology' ? { functionalImpact: 'Cambio funcional documentado' } : {}),
        ...(templateCode === 'traumatology_orthopedics' ? { laterality: 'BILATERAL', evaluatedRegion: 'Región C y región D sintéticas', injuryEventDate: '2026-01-15', painAndFunctionalLimitations: 'Cambio funcional documentado' } : {}),
        ...(templateCode === 'geriatrics' ? { functionalChanges: 'Cambio posterior documentado', visitInformationSource: 'Paciente e informante de prueba' } : {}),
        ...(templateCode === 'ophthalmology' ? { visualAcuityLeft: 'Valor literal izquierdo sin conversión', visualAcuityMethodLeft: 'Método izquierdo documentado', visualCorrectionLeft: 'Corrección izquierda informada', intraocularPressureLeft: 16, tonometryMethodLeft: 'Método izquierdo sintético' } : {}),
        ...(templateCode === 'obstetrics' ? { pregnancyReference: 'Referencia ficticia B', documentedGestationalAge: 'Expresión documentada B sin conversión', gestationalAgeSource: 'Fuente ficticia B', gestationalAgeReferenceDate: '2026-01-15' } : {}) },
    }, contextId, 201);
    for (const key of ['systolicBloodPressure', 'diastolicBloodPressure', 'heartRate', 'weightKg', 'heightCm', 'oxygenSaturation', 'pilotDetails', 'presentIllness', examKey, 'pilotHiddenValue']) {
      assert.equal(follow.formValues[key] ?? null, null, key);
    }
    assert.equal(byKey(follow.formDefinitionSnapshot, 'chiefComplaint').label, 'Motivo personalizado');
    if (templateCode === 'internal_medicine') {
      assert.equal(follow.followUpInstructions, 'Seguimiento sintético');
      assert.equal(byKey(initial.definition.encounterForm, 'followUp'), undefined);
      report('Internal Medicine uses canonical follow-up keys and its own context while General Medicine retains its existing configuration');
    }
    if (templateCode === 'ophthalmology') {
      assert.equal(first.formValues.visualAcuityLeft, null); assert.equal(first.formValues.intraocularPressureLeft, null);
      assert.equal(follow.formValues.visualAcuityRight, null); assert.equal(follow.formValues.intraocularPressureRight, null);
      assert.equal(follow.formValues.visualAcuityLeft, 'Valor literal izquierdo sin conversión');
      assert.equal(follow.formValues.intraocularPressureLeft, 16);
      assert.equal(follow.formValues.visualAcuityMethodLeft, 'Método izquierdo documentado');
      report('Right-only and left-only measurements retain literal acuity, methods, correction and mmHg without conversion or inferred values in the other eye');
    }
    if (templateCode === 'obstetrics') {
      assert.equal(first.formValues.obstetricRelevantDate, null); assert.equal(first.formValues.gestationalAgeReferenceDate, null);
      assert.equal(follow.consultationType, 'FOLLOW_UP');
      assert.equal(follow.formValues.pregnancyReference, 'Referencia ficticia B');
      assert.equal(follow.formValues.documentedGestationalAge, 'Expresión documentada B sin conversión');
      assert.equal(follow.formValues.gestationalAgeSource, 'Fuente ficticia B');
      await api(page, 'POST', '/encounters', { ...next, consultationType: 'FIRST_VISIT', values: { pilotNote: 'Prueba', pregnancyReference: 'Referencia ficticia B' } }, contextId, 400);
      report('Two pregnancy references coexist in one patient as independent visits; dates may remain unknown and FIRST_VISIT stays a patient-level rule');
    }
    if (eventDateKey) {
      assert.equal(first.formValues[eventDateKey], null);
      assert.equal(follow.formValues[eventDateKey], '2026-01-15');
      if (templateCode === 'neurology') assert.notEqual(first.formValues.symptomTimeline, follow.formValues.symptomTimeline);
      report('The first visit keeps an unknown event date blank; a later visit records a known date and updated narrative independently');
    }
    if (templateCode === 'rheumatology') {
      assert.equal(first.formValues.stiffnessDurationMinutes, 15);
      assert.equal(follow.formValues.stiffnessDurationMinutes, null);
      assert.equal(follow.formValues.stiffnessDescription, null);
      assert.notEqual(first.formValues.functionalImpact, follow.formValues.functionalImpact);
      report('Stiffness duration displays minutes and remains optional; missing follow-up data stays unknown while functional changes are recorded separately');
    }
    if (templateCode === 'traumatology_orthopedics') {
      assert.equal(first.formValues.laterality, 'UNKNOWN');
      assert.equal(follow.formValues.laterality, 'BILATERAL');
      assert.equal(first.formValues.evaluatedRegion, clinicalSpecific.evaluatedRegion);
      assert.equal(byKey(first.formDefinitionSnapshot, 'evaluatedRegion').type, 'TEXTAREA');
      report('Multiple regions are captured as narrative and laterality remains explicit, without body maps or inferred sides');
    }
    if (templateCode === 'geriatrics') {
      assert.notEqual(first.formValues.functionalChanges, follow.formValues.functionalChanges);
      assert.equal(follow.formValues.cognitiveObservations, null);
      assert.equal(follow.formValues.moodObservations, null);
      report('Informants and functional changes remain descriptive; absent cognitive or mood information is not inferred from age');
    }
    const summary = await api(page, 'GET', '/patients/' + patient + '/clinical-summary', null, contextId);
    assert.equal(summary.lastEncounter.followUpDate, '2099-01-15');
    assert.equal(summary.lastEncounter.followUp, 'Seguimiento sintético');
    assert.equal(summary.lastEncounter.diagnosis, 'Diagnóstico sintético');
    if (templateCode === 'allergy_immunology') {
      assert.equal(summary.history.ALLERGY, undefined);
      assert.equal(follow.formValues.sys_allergyStatus, null);
      const confirmed = await api(page, 'POST', '/encounters', { ...next, values: {
        pilotNote: 'Confirmación manual sintética', sys_allergyStatus: 'PRESENT', sys_allergies: 'Alergia confirmada sintética',
        sys_historySource: 'CONFIRMED', allergicHypothesisCertainty: 'CONFIRMED',
      } }, contextId, 201);
      const confirmedSummary = await api(page, 'GET', '/patients/' + patient + '/clinical-summary', null, contextId);
      assert.deepEqual(confirmedSummary.history.ALLERGY.items, ['Alergia confirmada sintética']);
      assert.equal(confirmedSummary.history.ALLERGY.certainty, 'CONFIRMED');
      assert.equal(confirmedSummary.history.ALLERGY.sourceId, confirmed.id);
      const original = await api(page, 'GET', '/encounters/' + first.id, null, contextId);
      assert.equal(original.formValues.allergicHypothesisCertainty, 'SUSPECTED');
      assert.equal(original.formValues.sys_allergyStatus, null);
      report('Suspected exposure and hypothesis certainty never populate known allergies; only explicit common-history entry produces a confirmed allergy in the summary');
    } else {
      assert.equal(summary.history.ALLERGY.status, 'PRESENT');
      assert.deepEqual(summary.history.ALLERGY.items, ['Alergia sintética de prueba']);
      assert.equal(summary.history.ALLERGY.sourceId, first.id);
    }
    if (templateCode === 'otolaryngology') {
      assert.equal(first.formValues.laterality, 'UNKNOWN');
      assert.equal(follow.formValues.laterality, 'NOT_APPLICABLE');
      report('Unknown and not-applicable laterality remain distinct across visit snapshots');
    }
    assert.equal(db('SELECT count(*) FROM bookings'), bookingsBefore);
    report('Personalization adds, removes, hides and reorders fields and sections, changes options and validates a personal required field; follow-up accepts no vitals or exam');

    const revised = structuredClone(template.createSpecialty.definition);
    byKey(revised.encounterForm, 'chiefComplaint').label = 'Motivo publicado v2';
    const revisedDraft = await api(admin, 'PUT', adminPath + '/wizard/draft', {
      expectedVersion: publication.version, definition: revised,
    });
    await api(admin, 'POST', adminPath + '/wizard/reviews', { expectedVersion: revisedDraft.version }, null, 204);
    const versionTwo = await api(admin, 'POST', adminPath + '/wizard/publish', {
      expectedVersion: revisedDraft.version,
    });
    assert.equal(versionTwo.publishedVersion, 2);
    const afterPublish = await api(page, 'GET', '/workspace', null, contextId);
    assert.equal(afterPublish.sourceWizardVersion, 1);
    assert.deepEqual(afterPublish.definition, personal);
    const historical = await api(page, 'GET', '/encounters/' + first.id, null, contextId);
    assert.equal(byKey(historical.formDefinitionSnapshot, 'chiefComplaint').label, originalLabel);
    for (const [key, value] of Object.entries(numeric)) assert.equal(historical.formValues[key], value);
    assert.deepEqual(historical.formDefinitionSnapshot, first.formDefinitionSnapshot);
    assert.deepEqual(historical.formValues, first.formValues);
    const other = await otherContext.newPage();
    await login(other, origin, secondDoctor);
    await other.waitForURL(url => !url.pathname.endsWith('/login'));
    const otherContexts = await api(other, 'GET', '/workspace/contexts');
    if (otherContexts.length) {
      await other.goto(origin + '/specialties');
      await other.getByRole('button', { name: 'Agregar especialidad', exact: true }).click();
      await other.getByRole('button', { name, exact: true }).click();
    } else {
      await other.getByRole('heading', { name: 'Elegí tu especialidad médica' }).waitFor();
      await other.getByRole('button', { name: new RegExp(name) }).click();
      await other.getByRole('button', { name: 'Continuar', exact: true }).click();
    }
    await finishWizard(other);
    const otherId = Number(new URL(other.url()).searchParams.get('specialtyContextId'));
    const otherSetup = await api(other, 'GET', '/workspace', null, otherId);
    assert.notEqual(otherSetup.specialtyContextId, contextId);
    assert.equal(otherSetup.sourceWizardVersion, 2);
    assert.equal(byKey(otherSetup.definition.encounterForm, 'chiefComplaint').label, 'Motivo publicado v2');
    const otherPatient = await patientUI(other, otherSetup.specialtyContextId, 'Paciente de otro médico');
    assert.notEqual(otherPatient, patient);
    await api(other, 'GET', '/patients/' + patient, null, otherSetup.specialtyContextId, 404);
    await api(other, 'GET', '/encounters/' + first.id, null, contextId, 404);
    await api(page, 'GET', '/patients/' + otherPatient, null, otherSetup.specialtyContextId, 404);
    if (templateCode === 'geriatrics') {
      await api(other, 'GET', '/patients/' + patient, null, contextId, 404);
      await api(other, 'GET', '/patients/' + patient + '/clinical-summary', null, contextId, 404);
      await api(other, 'GET', '/staff/assignments', null, null, 401);
      report('The authenticated doctor named as informant receives no access to this patient, clinical summary or delegated staff assignments');
    }
    report('Republishing preserves existing customization, encounter values and snapshots; the second doctor receives version 2 and cannot read the first doctor’s records');

    const medication = await api(page, 'POST', '/patients/' + patient + '/prescriptions', {
      type: 'PRESCRIPTION', diagnosisDescription: templateCode === 'psychiatry' ? 'PSY_DOCUMENT_DIAGNOSIS' : 'Diagnóstico ficticio',
      generalInstructions: templateCode === 'psychiatry' ? 'PSY_DOCUMENT_INSTRUCTIONS' : 'Documento sintético de prueba',
      prescriptions: [{
        medicationName: 'Medicamento ficticio SP-02B', dosage: 'Dosis de prueba',
        administrationRoute: 'Vía de prueba', frequency: 'Frecuencia de prueba',
        durationDays: 1, instructions: 'Datos ficticios para verificación técnica',
      }],
      diagnosticOrders: [],
    }, contextId, 201);
    const savedMedication = await api(page, 'GET', '/patients/' + patient + '/prescriptions/' + medication.id, null, contextId);
    assert.equal(savedMedication.prescriptions[0].medicationName, 'Medicamento ficticio SP-02B');
    const medicationSummary = await api(page, 'GET', '/patients/' + patient + '/clinical-summary', null, contextId);
    assert.equal(medicationSummary.recentMedications[0].recordId, medication.id);
    await api(page, 'GET', '/patients/' + patient + '/prescriptions/' + medication.id, null, originalContext, 404);
    const prescription = await api(page, 'POST', '/patients/' + patient + '/prescriptions', {
      type: 'STUDY_ORDERS', diagnosisDescription: 'Diagnóstico ficticio',
      generalInstructions: 'Prueba de impresión', prescriptions: [], diagnosticOrders: ['Estudio sintético'],
    }, contextId, 201);
    const pdf = await api(page, 'GET', '/patients/' + patient + '/prescriptions/' + prescription.id + '/pdf', null, contextId);
    assert.ok(pdf.startsWith('%PDF'));
    const study = await page.evaluate(async ({ base, patient, contextId, png, name }) => {
      const key = Object.keys(localStorage).find(key => key.startsWith('sb-') && key.endsWith('-auth-token'));
      const token = JSON.parse(localStorage.getItem(key)).access_token;
      const form = new FormData();
      form.set('file', new File([Uint8Array.from(atob(png), c => c.charCodeAt(0))], 'synthetic.png', { type: 'image/png' }));
      form.set('name', 'Informe sintético de ' + name);
      const response = await fetch(base + '/patients/' + patient + '/studies?specialtyContextId=' + contextId, {
        method: 'POST', headers: { Authorization: 'Bearer ' + token }, body: form,
      });
      return { status: response.status, body: await response.json() };
    }, { base, patient, contextId, png, name });
    assert.equal(study.status, 201, JSON.stringify(study.body));
    const studyPath = '/patients/' + patient + '/studies/' + study.body.id + '/file';
    assert.ok((await api(page, 'GET', studyPath, null, contextId)).length > 0);
    await api(page, 'GET', studyPath, null, originalContext, 404);
    report('Existing printable orders, authorized study upload and download');

    const hour = value => String(value).padStart(2, '0') + ':00';
    await scheduleUI(page, clinic, contextId, [scheduleDay], hour(slotStart), hour(slotStart + 1), 20);
    const existingClinics = await api(page, 'GET', '/clinics');
    const virtual = existingClinics.items.find(c => c.modality === 'TELECONSULTATION') ?? await api(page, 'POST', '/clinics', {
      name: 'Teleconsulta de prueba', timezone: 'America/Argentina/Buenos_Aires', modality: 'TELECONSULTATION',
    }, null, 201);
    await scheduleUI(page, virtual.id, contextId, [scheduleDay], hour(slotStart + 1), hour(slotStart + 2), 20);
    const bookingDay = db('SELECT (current_date+(' + (scheduleDay === 'Domingo' ? 13 : 12) + '-extract(isodow FROM current_date)::integer)%7+1)::text');
    async function book(clinicId) {
      const availability = await api(page, 'GET', '/clinics/' + clinicId + '/availability?from=' + bookingDay + '&days=1');
      const slot = availability.days.flatMap(day => day.slots).find(item => item.specialtyContextId === String(contextId));
      assert.ok(slot);
      return api(page, 'POST', '/bookings', {
        clinicId, start: slot.start, contactName: 'Reserva ' + name,
        specialtyContextId: String(contextId),
      }, null, 201, randomUUID());
    }
    const inPerson = await book(clinic);
    const remote = await book(virtual.id);
    assert.equal(inPerson.clinicSnapshot.modality, 'IN_PERSON');
    assert.equal(remote.clinicSnapshot.modality, 'TELECONSULTATION');
    assert.equal(inPerson.specialtyContextId, String(contextId));
    assert.equal(remote.specialtyContextId, String(contextId));
    await api(other, 'GET', '/bookings/' + inPerson.id, null, null, 404);
    await page.goto(origin + '/calendar?specialtyContextId=' + originalContext);
    await page.locator('#calendar-date').fill(calendarDate(bookingDay));
    await page.locator('#calendar-date').press('Tab');
    await page.locator('[data-booking-id="' + remote.id + '"]').click();
    await page.getByRole('heading', { name: 'Reserva ' + name }).waitFor();
    assert.equal(await page.getByRole('link', { name: /Abrir ficha/ }).count(), 0);
    await page.locator('[data-booking-id="' + inPerson.id + '"]').click();
    await page.getByRole('button', { name: 'Reprogramar', exact: true }).waitFor();
    assert.equal(await page.getByRole('link', { name: /Abrir ficha/ }).count(), 0);
    report('Both calendar modalities book the right context and provide administrative actions without linking to clinical records');

    const invitation = await api(page, 'POST', '/secretaries/invitations', {
      email: 'staff-' + templateCode + '@local.test', name: 'Secretaría SP-02B', clinicIds: [clinic], permissions: ['view'],
    }, null, 201);
    const staff = await staffContext.newPage();
    await staff.goto(origin + '/staff/activate');
    await staff.getByLabel('Correo electrónico', { exact: true }).fill('staff-' + templateCode + '@local.test');
    await staff.getByLabel('Código de invitación', { exact: true }).fill(invitation.invitationCode);
    await staff.getByLabel('Contraseña nueva', { exact: true }).fill(state.password);
    await staff.getByRole('button', { name: 'Entrar a la agenda', exact: true }).click();
    await staff.getByRole('heading', { name: 'Agenda de consultorios', exact: true }).waitFor();
    const assignment = (await api(staff, 'GET', '/staff/assignments')).items[0];
    await staff.getByLabel('Consultorio asignado').selectOption(assignment.ownerId + '|' + clinic);
    await staff.locator('#staff-date').fill(calendarDate(bookingDay));
    await staff.locator('#staff-date').press('Tab');
    await staff.locator('.booking').filter({ hasText: 'Reserva ' + name }).first().click();
    assert.equal(await staff.getByRole('link', { name: /Abrir ficha/ }).count(), 0);
    const administrative = await api(staff, 'GET', '/staff/owners/' + assignment.ownerId + '/clinics/' + clinic +
      '/bookings?from=' + bookingDay + 'T00:00:00Z&to=' + bookingDay + 'T23:59:59Z');
    const delegated = administrative.items.find(item => item.id === inPerson.id);
    assert.ok(delegated && !('patientId' in delegated));
    await api(staff, 'GET', '/patients/' + patient, null, contextId, 401);
    report('Secretary sees the linked booking on the assigned agenda without a clinical link or patient ID; clinical API is denied');
    if (templateCode === 'psychiatry') {
      await verifyPsychiatryPrivacy({ page, browser, staff, api, db, origin, base, contextId, patient, first,
        inPerson, medication, delegated, clinic, bookingDay, report, clinicalMarkers: Object.values(clinicalSpecific) });
    }

    const result = { code: templateCode, contextId, patient, first: first.id, booking: inPerson.id,
      specialtyId: created.id, definition: personal, sourceWizardVersion: 1 };
    if (keepActive) return result;
    const latest = await api(admin, 'GET', adminPath + '/experience');
    await api(admin, 'PATCH', adminPath, { expectedVersion: latest.specialtyVersion, active: false });
    assert.deepEqual(await api(page, 'GET', '/specialties'), before);
    await api(other, 'GET', '/specialties/' + created.id + '/wizard', null, null, 404);
    assert.equal((await api(page, 'GET', '/patients/' + patient, null, contextId)).id, patient);
    assert.equal((await api(page, 'GET', '/encounters/' + first.id, null, contextId)).id, first.id);
    assert.equal('patientId' in await api(page, 'GET', '/bookings/' + inPerson.id), false);
    report('Deactivation removes the specialty from the available catalog while its clinical history and linked bookings remain readable');
    return result;
  } catch (error) {
    throw new Error(name + ': ' + error.message, { cause: error });
  } finally {
    await Promise.all([adminContext.close(), otherContext.close(), staffContext.close()]);
  }
};
