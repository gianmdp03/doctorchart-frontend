const assert = require('node:assert/strict');

module.exports = async function runClinicalAccess({ page, browser, state, origin, api, add }) {
  const catalog = await api(page, 'GET', '/specialties');
  const specialty = catalog.find(item => item.code === 'pediatrics');
  const contexts = await api(page, 'GET', '/workspace/contexts');
  let scope = contexts.find(item => item.specialty.code === 'pediatrics');
  if (!scope) {
    const setup = await api(page, 'PUT', '/workspace/specialty', { specialtyId: specialty.id, expectedVersion: null });
    const ready = await api(page, 'POST', '/workspace/finish-onboarding', {
      expectedVersion: setup.version, specialtyContextId: setup.specialtyContextId,
    }, setup.specialtyContextId);
    scope = { id: ready.specialtyContextId };
  }
  const workspace = await api(page, 'GET', '/workspace', null, scope.id);
  const marker = 'SP04D_MARCADOR_CLINICO_SINTETICO';
  const patient = await api(page, 'POST', '/patients', {
    workspaceVersion: workspace.version, values: {
      sys_firstName: marker, sys_lastName: 'Laboratorio', sys_dni: '38579321', sys_dob: '2020-01-01', sys_sex: 'MALE',
    },
  }, scope.id, 201);
  const path = '/patients/' + patient.id;
  await api(page, 'GET', path, null, scope.id);
  await api(page, 'GET', path + '/revisions', null, scope.id);
  const result = await api(page, 'GET', '/workspace/clinical-access?patientId=' + patient.id, null, scope.id);
  assert.ok(result.items.some(event => event.operation === 'PATIENT_READ' && event.patientId === patient.id && event.outcome === 'AUTHORIZED'));
  assert.ok(result.items.some(event => event.operation === 'CLINICAL_REVISIONS'));
  assert.ok(!JSON.stringify(result).includes(marker));

  await page.goto(origin + '/records/' + patient.id + '?specialtyContextId=' + scope.id);
  await page.getByRole('button', { name: 'Accesos a la ficha', exact: true }).click();
  const audit = page.getByRole('region', { name: 'Auditoría de accesos', exact: true });
  await audit.getByText(/Lectura de ficha/).first().waitFor();
  await audit.getByText(/Revisiones clínicas/).first().waitFor();
  assert.ok(!(await audit.innerText()).includes(marker));
  add('SP-04D records authorized patient and revision reads through the Go API; Angular displays only scoped access metadata');

  const adminContext = await browser.newContext();
  try {
    const admin = await adminContext.newPage();
    await admin.goto(origin + '/login');
    await admin.locator('#login-email').fill(state.admin.email);
    await admin.locator('#login-password').fill(state.admin.password);
    await admin.getByRole('button', { name: 'Ingresar a DoctorChart', exact: true }).click();
    await admin.getByRole('heading', { name: 'Especialidades y wizard' }).waitFor();
    await api(admin, 'GET', path, null, scope.id, 404);
    await api(admin, 'GET', '/workspace/clinical-access', null, scope.id, 404);
  } finally {
    await adminContext.close();
  }
  add('SP-04D catalog administration cannot read another account’s clinical records or access audit');
};
