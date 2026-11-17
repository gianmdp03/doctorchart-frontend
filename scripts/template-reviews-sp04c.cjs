const assert = require('node:assert/strict');

module.exports = async function runTemplateReviews({ page, browser, state, origin, base, api, add }) {
  const adminContext = await browser.newContext();
  try {
    const admin = await adminContext.newPage();
    await admin.goto(origin + '/login');
    await admin.locator('#login-email').fill(state.admin.email);
    await admin.locator('#login-password').fill(state.admin.password);
    await admin.getByRole('button', { name: 'Ingresar a DoctorChart', exact: true }).click();
    await admin.getByRole('heading', { name: 'Especialidades y wizard' }).waitFor();
    const available = await api(page, 'GET', '/specialties');
    const general = available.find(item => item.code === 'general_medicine');
    const { definition } = await api(page, 'GET', '/specialties/' + general.id + '/wizard');
    const specialty = await api(admin, 'POST', '/admin/specialties', {
      code: 'sp04c_approval_fixture', name: 'Aprobación de prueba SP-04C', definition,
    }, null, 201);
    const root = '/admin/specialties/' + specialty.id + '/wizard';
    const blocked = await api(admin, 'POST', root + '/publish', { expectedVersion: 0 }, null, 409);
    assert.equal(blocked.code, 'TEMPLATE_APPROVAL_REQUIRED');
    await api(page, 'POST', root + '/reviews', { expectedVersion: 0 }, null, 403);

    await admin.reload();
    await admin.getByRole('button', { name: /Aprobación de prueba SP-04C/ }).click();
    await admin.getByText('Revisión 0 · Pendiente de aprobación', { exact: true }).waitFor();
    assert.equal(await admin.getByRole('button', { name: 'Publicar revisión aprobada' }).count(), 0);
    const approved = admin.waitForResponse(response => new URL(response.url()).pathname === base + root + '/reviews' && response.request().method() === 'POST');
    await admin.getByRole('button', { name: 'Registrar aprobación' }).click();
    assert.equal((await approved).status(), 204);
    const published = admin.waitForResponse(response => new URL(response.url()).pathname === base + root + '/publish' && response.request().method() === 'POST');
    await admin.getByRole('button', { name: 'Publicar revisión aprobada' }).click();
    assert.equal((await published).status(), 200);
    await admin.getByText('Revisión 1 · Publicada', { exact: true }).waitFor();
    add('SP-04C direct publish and doctor approval are denied; Angular approves and publishes the saved synthetic revision');

    const contexts = await api(page, 'GET', '/workspace/contexts');
    const context = contexts.length === 0
      ? await api(page, 'PUT', '/workspace/specialty', { specialtyId: specialty.id, expectedVersion: null })
      : await api(page, 'POST', '/workspace/contexts', { specialtyId: specialty.id }, null, 201);
    const id = context.specialtyContextId;
    const workspace = await api(page, 'POST', '/workspace/finish-onboarding', { specialtyContextId: id, expectedVersion: context.version }, id);
    const patient = await api(page, 'POST', '/patients', {
      workspaceVersion: workspace.version, values: {
        sys_firstName: 'Paciente', sys_lastName: 'Laboratorio', sys_dni: '31415926', sys_dob: '1980-01-01', sys_sex: 'MALE',
      },
    }, id, 201);
    const encounter = await api(page, 'POST', '/encounters', {
      workspaceVersion: workspace.version, patientId: patient.id, consultationType: 'FIRST_VISIT', values: { chiefComplaint: 'Registro sintético' },
    }, id, 201);
    await admin.getByText('Huella e historial de decisiones').click();
    await admin.getByText(/Aprobación sintética de laboratorio/).waitFor();
    await admin.getByRole('button', { name: 'Revocar aprobación de revisión 0' }).click();
    await admin.getByLabel('Motivo de revocación').fill('Cierre del ensayo de publicación');
    await admin.getByRole('button', { name: 'Confirmar revocación' }).click();
    await admin.getByText(/Revocada por .*Cierre del ensayo de publicación/).waitFor();
    assert.ok(!(await api(page, 'GET', '/specialties')).some(item => item.id === specialty.id));
    await api(page, 'GET', '/specialties/' + specialty.id + '/wizard', null, null, 404);
    const after = await api(page, 'GET', '/encounters/' + encounter.id, null, id);
    assert.deepEqual(after.formDefinitionSnapshot, encounter.formDefinitionSnapshot);
    assert.deepEqual(after.formValues, encounter.formValues);
    const preserved = await api(page, 'GET', '/workspace', null, id);
    assert.deepEqual(preserved.definition, workspace.definition);
    await api(admin, 'GET', '/encounters/' + encounter.id, null, id, 404);
    add('SP-04C revocation removes new eligibility while retaining the personal definition and encounter snapshot for its owner');
  } finally {
    await adminContext.close();
  }
};
