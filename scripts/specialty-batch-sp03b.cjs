// Owned M6 lab only. The same fixture journey covers Cardiology and this batch.
const assert = require('node:assert/strict');
const runSpecialty = require('./cardiology-sp02b.cjs');

module.exports = async function batch(args, milestone = 'sp03b') {
  const { page, browser, api, add, origin, state } = args;
  const previousCodes = ['cardiology', 'endocrinology', 'gastroenterology', 'pulmonology',
    ...(milestone !== 'sp03b' ? ['urology', 'otolaryngology', 'gynecology', 'allergy_immunology'] : []),
    ...(['sp03d', 'sp03f'].includes(milestone) ? ['neurology', 'rheumatology', 'traumatology_orthopedics', 'geriatrics'] : [])];
  const codes = [...(milestone === 'sp03f' ? ['internal_medicine', 'ophthalmology', 'psychiatry', 'obstetrics'] : []), ...previousCodes];
  const contextsBefore = await api(page, 'GET', '/workspace/contexts');
  const retained = [];
  for (const context of contextsBefore) {
    const setup = await api(page, 'GET', '/workspace', null, context.id);
    retained.push({ contextId: context.id, definition: setup.definition, sourceWizardVersion: setup.sourceWizardVersion });
  }
  const created = [];
  const expectedContexts = contextsBefore.length + codes.length;
  for (const [index, templateCode] of codes.entries()) {
    created.push(await runSpecialty({ ...args, templateCode,
      slotStart: milestone === 'sp03b' ? 8 + index * 2 : 6 + (index % 8) * 2,
      scheduleDay: index < 8 ? 'Sábado' : 'Domingo', keepActive: true }));
    for (const snapshot of [...retained, ...created]) {
      const setup = await api(page, 'GET', '/workspace', null, snapshot.contextId);
      assert.deepEqual(setup.definition, snapshot.definition, templateCode + ' changed another context');
      assert.equal(setup.sourceWizardVersion, snapshot.sourceWizardVersion);
    }
  }
  assert.equal((await api(page, 'GET', '/specialties')).length, expectedContexts);
  const contexts = await api(page, 'GET', '/workspace/contexts');
  assert.equal(contexts.length, expectedContexts);
  assert.equal(new Set(contexts.map(context => context.specialty.code)).size, expectedContexts);
  for (const record of created) {
    for (const context of contexts.filter(context => context.id !== record.contextId)) {
      await api(page, 'GET', '/patients/' + record.patient, null, context.id, 404);
      await api(page, 'GET', '/encounters/' + record.first, null, context.id, 404);
    }
  }
  add(milestone.toUpperCase().replace('SP03', 'SP-03') + ': ' + expectedContexts + ' active specialties coexist in one doctor account; personalization and historical forms stay independent after every new configuration');

  const adminContext = await browser.newContext();
  try {
    const admin = await adminContext.newPage();
    await admin.goto(origin + '/login');
    await admin.locator('#login-email').fill(state.admin.email);
    await admin.locator('#login-password').fill(state.admin.password);
    await admin.getByRole('button', { name: 'Ingresar a DoctorChart', exact: true }).click();
    await admin.getByRole('heading', { name: 'Especialidades y wizard' }).waitFor();
    for (const record of created) {
      const path = '/admin/specialties/' + record.specialtyId;
      const before = await api(page, 'GET', '/specialties');
      const latest = await api(admin, 'GET', path + '/experience');
      await api(admin, 'PATCH', path, { expectedVersion: latest.specialtyVersion, active: false });
      assert.deepEqual(await api(page, 'GET', '/specialties'), before.filter(specialty => specialty.id !== record.specialtyId));
      await api(page, 'GET', '/specialties/' + record.specialtyId + '/wizard', null, null, 404);
      assert.equal((await api(page, 'GET', '/patients/' + record.patient, null, record.contextId)).id, record.patient);
      assert.equal((await api(page, 'GET', '/encounters/' + record.first, null, record.contextId)).id, record.first);
      assert.equal((await api(page, 'GET', '/bookings/' + record.booking)).patientId, String(record.patient));
      assert.deepEqual((await api(page, 'GET', '/workspace', null, record.contextId)).definition, record.definition);
      add(record.code + ': deactivation hides the catalog entry and preserves the clinical file, original encounter snapshot, personal configuration and linked booking');
    }
    assert.equal((await api(page, 'GET', '/workspace/contexts')).length, expectedContexts);
  } finally {
    await adminContext.close();
  }
  return created.map(({ code, contextId, patient, first, booking }) => ({ code, contextId, patient, first, booking }));
};
