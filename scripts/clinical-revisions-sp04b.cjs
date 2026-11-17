const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');

module.exports = async function clinicalRevisions({ page, staff, origin, base, context, otherContext, api, add, patientUI }) {
  const patientId = await patientUI(page, context, 'Revisiones');
  const correctedName = 'Ficha corregida ' + randomUUID().slice(0, 8);
  const patientPath = '/patients/' + patientId;
  const study = await page.evaluate(async ({ base, patientPath, context }) => {
    const key = Object.keys(localStorage).find(name => name.startsWith('sb-') && name.endsWith('-auth-token'));
    const token = JSON.parse(localStorage.getItem(key)).access_token;
    const bytes = Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='), c => c.charCodeAt(0));
    const form = new FormData();
    form.set('name', 'Estudio histórico SP-04B');
    form.set('file', new Blob([bytes], { type: 'image/png' }), 'historical.png');
    const response = await fetch(base + patientPath + '/studies?specialtyContextId=' + context, {
      method: 'POST', headers: { Authorization: 'Bearer ' + token }, body: form,
    });
    if (response.status !== 201) throw new Error('Synthetic upload failed with HTTP ' + response.status);
    return response.json();
  }, { base, patientPath, context });
  const activeFile = patientPath + '/studies/' + study.id + '/file';
  const original = await api(page, 'GET', activeFile, null, context);
  const patient = await api(page, 'GET', patientPath, null, context);
  await api(page, 'PUT', patientPath, {
    expectedVersion: patient.version,
    values: { ...patient.formValues, sys_firstName: correctedName },
    reason: 'Identificación verificada',
  }, context);
  const setup = await api(page, 'GET', '/workspace', null, context);
  const first = await api(page, 'POST', '/encounters', {
    patientId, workspaceVersion: setup.version, consultationType: 'FIRST_VISIT',
    values: { chiefComplaint: 'Motivo inicial SP-04B', weightKg: 20, heightCm: 100 },
  }, context, 201);
  const encounterPath = '/encounters/' + first.id;
  await api(page, 'PUT', encounterPath, {
    expectedVersion: first.version, consultationType: first.consultationType,
    values: { ...first.formValues, chiefComplaint: 'Motivo corregido SP-04B' },
    reason: 'Corrección de transcripción SP-04B',
  }, context);

  await page.goto(origin + encounterPath + '?specialtyContextId=' + context);
  await page.getByRole('button', { name: 'Historial de revisiones' }).click();
  await page.locator('app-clinical-revisions summary').filter({ hasText: 'Corrección · Consulta' }).click();
  await page.getByText('Corrección de transcripción SP-04B', { exact: false }).waitFor();
  await page.getByText('Motivo inicial SP-04B', { exact: true }).first().waitFor();
  add('SP-04B shows an earlier encounter and its reason in the scoped Angular revision history');

  await page.goto(origin + patientPath + '?specialtyContextId=' + context);
  await page.getByRole('button', { name: 'Anular ficha', exact: true }).click();
  const prompt = page.locator('app-annulment-prompt');
  const confirmation = prompt.getByRole('button', { name: 'Confirmar anulación' });
  assert.equal(await confirmation.isDisabled(), true);
  await prompt.getByRole('textbox', { name: 'Motivo de anulación' }).fill('Ficha duplicada SP-04B');
  const pending = page.waitForResponse(response =>
    new URL(response.url()).pathname === base + patientPath && response.request().method() === 'DELETE');
  await confirmation.click();
  assert.equal((await pending).status(), 204);
  await page.waitForURL(/\/patients(?:\?|$)/);
  await api(page, 'GET', patientPath, null, context, 404);
  await api(page, 'GET', encounterPath, null, context, 404);
  await page.getByRole('button', { name: 'Fichas anuladas', exact: true }).click();
  await page.getByRole('button', { name: correctedName + ' Pérez', exact: true }).click();
  const archive = page.locator('app-clinical-revisions section');
  await archive.getByText('Ficha anulada', { exact: true }).waitFor();
  const patientAnnulment = archive.locator('details').filter({
    has: page.locator('summary').filter({ hasText: 'Anulación · Ficha clínica' }),
  });
  await patientAnnulment.locator('summary').first().click();
  await patientAnnulment.getByText('Ficha duplicada SP-04B', { exact: false }).waitFor();
  const history = await api(page, 'GET', patientPath + '/revisions', null, context);
  assert.deepEqual(history.items.map(item => [item.entity, item.operation]), [
    ['PATIENT', 'ANNUL'], ['STUDY', 'ANNUL'], ['ENCOUNTER', 'ANNUL'], ['ENCOUNTER', 'CORRECT'], ['PATIENT', 'CORRECT'],
  ]);
  assert.ok(history.items.every(item => item.actorUserId && item.occurredAt));
  await api(page, 'GET', patientPath + '/revisions', null, otherContext, 404);
  await api(staff, 'GET', patientPath + '/revisions', null, context, 401);
  add('SP-04B requires confirmation and reason, then keeps the patient and dependent encounter reachable only from history');
  await api(page, 'GET', activeFile, null, context, 404);
  const archivedFile = patientPath + '/revisions/studies/' + study.id + '/file';
  assert.equal(await api(page, 'GET', archivedFile, null, context), original);
  await api(page, 'GET', archivedFile, null, otherContext, 404);
  await api(staff, 'GET', archivedFile, null, context, 401);
  await archive.locator('summary').filter({ hasText: 'Anulación · Estudio' }).click();
  const download = page.waitForEvent('download');
  await archive.getByRole('button', { name: 'Descargar adjunto histórico' }).click();
  assert.match((await download).suggestedFilename(), /^historical\./);
  add('SP-04B retains the attachment bytes and exposes download only through authorized historical access');
};
