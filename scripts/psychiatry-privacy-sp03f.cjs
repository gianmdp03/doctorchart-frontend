// Specific exposure checks, called by the shared owned-lab specialty journey.
const assert = require('node:assert/strict');

module.exports = async function psychiatryPrivacy({ page, browser, staff, api, db, origin, base,
  contextId, patient, first, inPerson, medication, delegated, clinic, bookingDay, report, clinicalMarkers }) {
  const assertAdministrative = (value, surface) => {
    const text = typeof value === 'string' ? value : JSON.stringify(value);
    for (const marker of [...clinicalMarkers, 'PSY_DOCUMENT_DIAGNOSIS', 'PSY_DOCUMENT_INSTRUCTIONS']) {
      assert.ok(!text.includes(marker), surface + ' exposed clinical content: ' + marker);
    }
    if (value && typeof value === 'object') {
      for (const key of ['formValues', 'formDefinitionSnapshot', 'mentalStatusExam', 'safetyAssessment', 'diagnosis', 'primaryDiagnosisDescription']) {
        assert.equal(key in value, false, surface + ': ' + key);
      }
    }
  };
  const booking = await api(page, 'GET', '/bookings/' + inPerson.id);
  assert.equal(booking.specialty.name, 'Psiquiatría');
  assert.equal(booking.patientId, String(patient));
  assertAdministrative(booking, 'Doctor agenda');
  assert.equal(delegated.specialty.name, 'Psiquiatría');
  assert.equal('patientId' in delegated, false);
  assertAdministrative(delegated, 'Staff agenda');
  await api(staff, 'GET', '/patients/' + patient + '/clinical-summary', null, contextId, 401);
  await api(staff, 'GET', '/encounters/' + first.id, null, contextId, 401);
  await api(staff, 'GET', '/patients/' + patient + '/prescriptions/' + medication.id + '/pdf', null, contextId, 401);
  const original = await api(page, 'GET', '/encounters/' + first.id, null, contextId);
  assert.equal(original.formValues.mentalStatusExam, 'PSY_MENTAL_TEST_ONLY');
  assert.equal(original.formValues.safetyAssessment, 'PSY_SAFETY_TEST_ONLY');
  assert.equal(original.formValues.physicalExam, undefined);
  const summary = await api(page, 'GET', '/patients/' + patient + '/clinical-summary', null, contextId);
  assert.equal(summary.lastEncounter.diagnosis, 'Diagnóstico sintético');
  assert.equal(summary.lastEncounter.followUp, 'Seguimiento sintético');
  for (const marker of clinicalMarkers) assert.ok(!JSON.stringify(summary).includes(marker));
  const printable = await api(page, 'GET', '/patients/' + patient + '/prescriptions/' + medication.id + '/print', null, contextId);
  assert.equal(printable.author.specialtyName, 'Psiquiatría');
  assert.equal(printable.primaryDiagnosisDescription, 'PSY_DOCUMENT_DIAGNOSIS');
  assert.equal(printable.patientInstructions, 'PSY_DOCUMENT_INSTRUCTIONS');
  assert.equal(printable.prescriptions[0].medicationName, 'Medicamento ficticio SP-02B');
  for (const marker of clinicalMarkers) assert.ok(!JSON.stringify(printable).includes(marker));
  assert.ok((await api(page, 'GET', '/patients/' + patient + '/prescriptions/' + medication.id + '/pdf', null, contextId)).startsWith('%PDF'));
  report('Clinical detail stays owner-scoped; staff sees specialty/contact metadata, while summary and printable documents expose their explicit clinical projections without copying mental-status or safety narratives');

  const previous = await api(page, 'GET', '/booking-publication');
  const visitorContext = await browser.newContext();
  let published = false;
  try {
    const publication = await api(page, 'PUT', '/booking-publication', {
      expectedVersion: previous.version, name: previous.name || 'Profesional ficticio', description: 'Oferta de laboratorio',
      published: true, clinics: [{ clinicId: clinic, enabled: true, address: 'Dirección pública ficticia' }],
      questions: [], specialtyContextIds: [String(contextId)],
    });
    published = true;
    const visitor = await visitorContext.newPage();
    visitor.setDefaultTimeout(20000);
    const profile = await api(page, 'GET', '/public/appointments/doctors/' + publication.publicId);
    assert.ok(profile.specialties.some(item => item.name === 'Psiquiatría'));
    assertAdministrative(profile, 'Public offer');
    await visitor.goto(origin + '/appointments/' + publication.publicId);
    await visitor.locator('#public-date').fill(bookingDay.split('-').reverse().join('/'));
    await visitor.locator('#public-date').press('Tab');
    await visitor.locator('[data-public-slot]').first().click();
    await visitor.locator('#public-contact').fill('Visitante ficticio SP-03F');
    await visitor.locator('#public-document').fill('12345678');
    await visitor.locator('#public-phone').fill('2234951234');
    const recipient = 'psychiatry-public-sp03f@local.test';
    await visitor.locator('#public-email').fill(recipient);
    await visitor.locator('#public-consent').check();
    const response = visitor.waitForResponse(r => new URL(r.url()).pathname.endsWith('/bookings') && r.request().method() === 'POST');
    const patientCount = db('SELECT count(*) FROM patients');
    await visitor.locator('#public-confirm').click();
    const saved = await response;
    assert.equal(saved.status(), 201);
    const receipt = await saved.json();
    assertAdministrative(receipt, 'Public booking receipt');
    assert.equal(db('SELECT count(*) FROM patients'), patientCount);
    assert.ok(receipt.verificationRequestId);
    await api(visitor, 'GET', '/patients/' + patient, null, contextId, 401);
    await api(visitor, 'GET', '/encounters/' + first.id, null, contextId, 401);

    let message;
    const deadline = Date.now() + 60000;
    while (Date.now() < deadline) {
      const list = await (await fetch('http://127.0.0.1:18029/api/v1/messages')).json();
      const match = list.messages.find(item => item.Subject === 'Tu código de DoctorChart' && item.To?.some(to => to.Address === recipient));
      if (match) { message = await (await fetch('http://127.0.0.1:18029/api/v1/message/' + match.ID)).json(); break; }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    assert.ok(message, 'Mailpit did not receive the synthetic public-booking notification');
    const code = message.Text.match(/^\s*(\d{6})\s*$/m)?.[1];
    assert.ok(code);
    assert.doesNotMatch(message.Text, /https:\/\/|Psiquiatría/);
    assert.ok(!message.Text.includes(receipt.reference));
    assertAdministrative(message.Text, 'Mailpit message body');
    assert.ok(message.To.every(to => to.Address.endsWith('@local.test')));
    const identity = { documentCountry: 'AR', documentType: 'DNI', document: '12345678', email: recipient, requestId: receipt.verificationRequestId };
    const proof = await visitor.request.post(base + '/public/appointments/access/verify', { headers: { Origin: origin }, data: { ...identity, code } });
    assert.equal(proof.status(), 204);
    const listed = await visitor.request.post(base + '/public/appointments/my-bookings', { headers: { Origin: origin }, data: {} });
    assert.equal(listed.status(), 200);
    const { items } = await listed.json();
    const confirmation = items.find(item => item.reference === receipt.reference);
    assert.equal(confirmation.specialtyName, 'Psiquiatría');
    assertAdministrative(confirmation, 'Verified booking portal');
    assert.equal('patientId' in confirmation, false);
    report('The verified portal shows booking metadata. The Mailpit email contains only the access code and administrative instructions.');
  } finally {
    if (published) {
      const latest = await api(page, 'GET', '/booking-publication');
      await api(page, 'PUT', '/booking-publication', {
        expectedVersion: latest.version, name: previous.name, description: previous.description, published: previous.published,
        clinics: previous.clinics, questions: previous.questions, specialtyContextIds: previous.specialtyContextIds,
      });
    }
    await visitorContext.close();
  }
};
