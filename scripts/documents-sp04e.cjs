const assert = require('node:assert/strict');

module.exports = async function runDocumentEvidence({ page, browser, state, origin, base, api, add, db, previous }) {
  async function binary(method, endpoint, scope) {
    return page.evaluate(async ({url, method}) => {
      const token = JSON.parse(localStorage.getItem(Object.keys(localStorage).find(k => k.startsWith('sb-') && k.endsWith('-auth-token')))).access_token;
      const response = await fetch(url, { method, headers: { Authorization: 'Bearer ' + token } });
      const data = new Uint8Array(await response.arrayBuffer());
      const hash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', data)), b => b.toString(16).padStart(2, '0')).join('');
      return { status: response.status, magic: new TextDecoder().decode(data.slice(0, 4)), hash };
    }, { url: base + endpoint + (endpoint.includes('?') ? '&' : '?') + 'specialtyContextId=' + scope, method });
  }

  if (previous) {
    const route = '/patients/' + previous.patient;
    const original = await binary('GET', route + '/documents/' + previous.issue + '/pdf', previous.scope);
    assert.equal(original.hash, previous.hash);
    assert.equal((await binary('GET', route + '/revisions/studies/' + previous.study + '/file', previous.scope)).hash, previous.studyHash);
    const archive = await binary('POST', route + '/export', previous.scope);
    assert.equal(archive.status, 200);
    assert.ok(archive.magic.startsWith('PK'));
    assert.ok((await api(page, 'GET', route + '/revisions', null, previous.scope)).items.length > 0);
    assert.ok((await api(page, 'GET', '/workspace/clinical-access?patientId=' + previous.patient, null, previous.scope)).items.length > 0);
    const clinics = (await api(page, 'GET', '/clinics')).items;
    let physical, slot;
    for (const candidate of clinics.filter(c => c.modality === 'IN_PERSON')) {
      const availability = await api(page, 'GET', '/clinics/' + candidate.id + '/availability?from=' + db('SELECT current_date::text') + '&days=7');
      slot = availability.days.flatMap(day => day.slots).find(slot => slot.specialtyContextId === String(previous.scope));
      if (slot) { physical = candidate; break; }
    }
    assert.ok(physical && slot, 'The restored pediatric schedule must expose an available slot');
    await api(page, 'GET', '/clinics/' + physical.id + '/schedule');
    const booking = await api(page, 'POST', '/bookings', {
      clinicId: physical.id, specialtyContextId: String(previous.scope), start: slot.start,
      contactName: 'Restauración sintética', contactPhone: '2231234567',
    }, null, 201, require('node:crypto').randomUUID());
    assert.equal(booking.specialtyContextId, String(previous.scope));
    if (previous.booking) assert.equal((await api(page, 'GET', '/bookings/' + previous.booking)).id, previous.booking);
    const otherContext = await browser.newContext();
    try {
      const other = await otherContext.newPage();
      const account = state.doctors[0];
      await other.goto(origin + '/login');
      await other.locator('#login-email').fill(account.email);
      await other.locator('#login-password').fill(account.password);
      await other.getByRole('button', { name: 'Ingresar a DoctorChart', exact: true }).click();
      await other.waitForURL(url => url.pathname !== '/login');
      await api(other, 'GET', route, null, previous.scope, 404);
      await api(other, 'GET', route + '/documents/' + previous.issue + '/pdf', null, previous.scope, 404);
      await api(other, 'POST', route + '/export', null, previous.scope, 404);
    } finally {
      await otherContext.close();
    }
    const workspace = await api(page, 'GET', '/workspace', null, previous.scope);
    await api(page, 'POST', '/patients', {
      workspaceVersion: workspace.version, values: {
        sys_firstName: 'Después', sys_lastName: 'Restauración', sys_dni: '29180944', sys_dob: '2020-01-01', sys_sex: 'MALE',
      },
    }, previous.scope, 201);
    const other = await browser.newContext();
    try {
      const doctor = await other.newPage();
      const account = state.doctors[0];
      await doctor.goto(origin + '/login');
      await doctor.locator('#login-email').fill(account.email);
      await doctor.locator('#login-password').fill(account.password);
      await doctor.getByRole('button', { name: 'Ingresar a DoctorChart', exact: true }).click();
      await doctor.waitForURL(url => url.pathname !== '/login');
      await api(doctor, 'GET', route + '/documents/' + previous.issue + '/pdf', null, previous.scope, 404);
      await api(doctor, 'POST', route + '/export', null, previous.scope, 404);
    } finally {
      await other.close();
    }
    add('SP-04E restored API verifies the PDF and historical attachment, exports the chart, reads the audit and agenda, creates a patient and booking, and denies another doctor');
    add('SP-04E restored API rejects another doctor reading the source chart, its PDF and its contextual export');
    return previous;
  }

  const catalog = await api(page, 'GET', '/specialties');
  let context = (await api(page, 'GET', '/workspace/contexts')).find(c => c.specialty.code === 'pediatrics');
  if (!context) {
    const setup = await api(page, 'PUT', '/workspace/specialty', { specialtyId: catalog.find(s => s.code === 'pediatrics').id, expectedVersion: null });
    const completed = await api(page, 'POST', '/workspace/finish-onboarding', { expectedVersion: setup.version, specialtyContextId: setup.specialtyContextId }, setup.specialtyContextId);
    context = { id: completed.specialtyContextId };
  }
  const scope = context.id;
  const workspace = await api(page, 'GET', '/workspace', null, scope);
  const patient = await api(page, 'POST', '/patients', {
    workspaceVersion: workspace.version, values: {
      sys_firstName: 'Documento', sys_lastName: 'Sintético', sys_dni: '39814252', sys_dob: '2020-01-01', sys_sex: 'MALE',
    },
  }, scope, 201);
  const route = '/patients/' + patient.id;
  const order = await api(page, 'POST', route + '/prescriptions', {
    type: 'STUDY_ORDERS', prescriptions: [], diagnosticOrders: ['Orden sintética SP-04E'],
  }, scope, 201);
  const source = route + '/prescriptions/' + order.id + '/documents';
  await api(page, 'POST', source, { doctorName: 'SP04E_ACTOR_FORGED' }, scope, 400);
  const issued = await api(page, 'POST', source + '?doctorName=SP04E_ACTOR_FORGED&clinicName=SP04E_ACTOR_FORGED&specialty=SP04E_ACTOR_FORGED', {}, scope, 201);
  const pdf = route + '/documents/' + issued.id + '/pdf';
  const original = await binary('GET', pdf, scope);
  assert.equal(original.status, 200);
  assert.equal(original.magic, '%PDF');
  assert.equal(original.hash, issued.sha256);
  const fresh = await api(page, 'POST', source, {}, scope, 201);
  assert.notEqual(fresh.sha256, issued.sha256);
  await api(page, 'POST', route + '/documents/' + issued.id + '/annul', { reason: 'Anulación documental sintética' }, scope, 204);
  assert.equal((await binary('GET', pdf, scope)).hash, original.hash);
  assert.ok(!JSON.stringify(issued).includes('SP04E_ACTOR_FORGED'));
  add('SP-04E emits from server identity, rejects client attribution, and preserves exact bytes after annulment');

  const uploaded = await page.evaluate(async ({ base, route, scope }) => {
    const token = JSON.parse(localStorage.getItem(Object.keys(localStorage).find(k => k.startsWith('sb-') && k.endsWith('-auth-token')))).access_token;
    const png = Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='), c => c.charCodeAt(0));
    const form = new FormData();
    form.set('name', 'Adjunto sintético');
    form.set('file', new File([png], 'synthetic.png', { type: 'image/png' }));
    const response = await fetch(base + route + '/studies?specialtyContextId=' + scope, { method: 'POST', headers: { Authorization: 'Bearer ' + token }, body: form });
    return { status: response.status, body: await response.json() };
  }, { base, route, scope });
  assert.equal(uploaded.status, 201, JSON.stringify(uploaded.body));
  const study = uploaded.body.id;
  await api(page, 'DELETE', route + '/studies/' + study, { reason: 'Adjunto histórico sintético' }, scope, 204);
  const history = await binary('GET', route + '/revisions/studies/' + study + '/file', scope);
  assert.equal(history.status, 200);
  const archive = await binary('POST', route + '/export', scope);
  assert.equal(archive.status, 200);
  assert.ok(archive.magic.startsWith('PK'));

  await page.goto(origin + '/records/' + patient.id + '?specialtyContextId=' + scope);
  await page.getByRole('button', { name: 'Documentos emitidos y exportación' }).click();
  await page.getByText(/Emisión anulada/).waitFor();
  await page.getByRole('heading', { name: 'Exportar ficha contextual' }).waitFor();
  const adminContext = await browser.newContext();
  try {
    const admin = await adminContext.newPage();
    await admin.goto(origin + '/login');
    await admin.locator('#login-email').fill(state.admin.email);
    await admin.locator('#login-password').fill(state.admin.password);
    await admin.getByRole('button', { name: 'Ingresar a DoctorChart', exact: true }).click();
    await admin.getByRole('heading', { name: 'Especialidades y wizard' }).waitFor();
    await api(admin, 'POST', route + '/export', null, scope, 404);
    await api(admin, 'GET', pdf, null, scope, 404);
  } finally {
    await adminContext.close();
  }
  add('SP-04E contextual export includes a historical attachment, shows scope in Angular, and blocks catalog administration');
  const booking = db("SELECT id::text FROM bookings WHERE status<>'CANCELLED' ORDER BY id LIMIT 1");
  return { patient: patient.id, scope, issue: issued.id, hash: original.hash, study, studyHash: history.hash, booking };
};
