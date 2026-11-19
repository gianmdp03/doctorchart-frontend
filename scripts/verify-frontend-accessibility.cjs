// Run ng serve on 127.0.0.1:4202 before this check. All API traffic is synthetic.
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const fixtures = require('./testing/ui-redesign-fixtures.cjs');

const base = 'http://127.0.0.1:4202';
const contextId = '?specialtyContextId=101';

async function press(locator, key) {
  await locator.focus();
  await locator.press(key);
}

async function expectFocus(locator) {
  await locator.and(locator.page().locator(':focus')).waitFor();
}

async function expectUniqueIds(page) {
  const duplicates = await page.locator('[id]').evaluateAll(elements => {
    const ids = elements.map(element => element.id);
    return [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  });
  assert.deepEqual(duplicates, []);
}

async function expectNoPageOverflow(page) {
  const { viewport, documentWidth } = await page.evaluate(() => ({
    viewport: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
  }));
  assert.ok(documentWidth <= viewport + 1, `Document is ${documentWidth}px wide at ${viewport}px`);
}

(async () => {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHROME_CHANNEL || 'msedge' });
  try {
    const publicContext = await browser.newContext({ reducedMotion: 'reduce' });
    const publicBoundary = await fixtures.install(publicContext, { authenticated: false });
    const publicPage = await publicContext.newPage();
    await publicPage.goto(base + '/login');
    await press(publicPage.getByRole('button', { name: 'Ingresar a DoctorChart' }), 'Enter');
    await expectFocus(publicPage.locator('#login-email[aria-invalid="true"]'));
    assert.equal(await publicPage.locator('#login-email').getAttribute('aria-describedby'), 'login-email-error');
    await publicPage.goto(base + '/register');
    await press(publicPage.getByRole('button', { name: 'Crear cuenta' }), 'Enter');
    await expectFocus(publicPage.getByRole('textbox', { name: 'Nombre completo' }));
    await publicPage.locator('#signup-name-error').waitFor();
    assert.equal(await publicPage.locator('#signup-name').getAttribute('aria-invalid'), 'true');
    console.log('PASS login and registration validation');

    await publicPage.goto(base + '/appointments/' + fixtures.publicId + contextId);
    await press(publicPage.locator('[data-public-slot]').first(), 'Space');
    await expectFocus(publicPage.locator('#public-form-title'));
    await press(publicPage.locator('#public-confirm'), 'Enter');
    await expectFocus(publicPage.locator('#public-contact'));
    assert.ok(!publicBoundary.writes.some(write => write.path.endsWith('/bookings')));
    await expectUniqueIds(publicPage);
    console.log('PASS public booking slot, validation and focus');

    const doctorContext = await browser.newContext({
      reducedMotion: 'reduce',
      viewport: { width: 1280, height: 900 },
    });
    await fixtures.install(doctorContext, {});
    const page = await doctorContext.newPage();
    await page.goto(base + '/dashboard' + contextId);
    await press(page.getByRole('link', { name: 'Ir al contenido' }), 'Enter');
    await expectFocus(page.locator('#workspace-content'));
    const account = page.getByRole('button', { name: /Opciones de cuenta/ });
    await press(account, 'Space');
    await page.locator('#account-options').waitFor();
    await page.keyboard.press('Tab');
    await expectFocus(page.getByRole('link', { name: 'Editar perfil en Bycode' }));
    await page.keyboard.press('Escape');
    await expectFocus(account);
    await account.and(page.locator('[aria-expanded=false]')).waitFor();
    const patients = page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Pacientes', exact: true });
    await press(patients, 'Enter');
    await expectFocus(page.getByRole('heading', { name: 'Directorio de Pacientes' }));
    assert.equal(await page.locator('main').count(), 1);
    console.log('PASS skip link, account disclosure and routed focus');

    await page.goto(base + '/dashboard' + contextId);
    await page.locator('.notes-textarea').fill('Borrador sintético para verificar el cambio de especialidad.');
    const specialty = page.getByRole('combobox', { name: 'Especialidad actual' });
    const chooseNextSpecialty = async () => {
      await press(specialty, 'Enter');
      await page.getByRole('listbox').waitFor();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
    };
    await chooseNextSpecialty();
    const decision = page.getByRole('alertdialog', { name: 'Tenés cambios sin guardar' });
    await expectFocus(decision.getByRole('button', { name: 'Cancelar', exact: true }));
    await page.keyboard.press('Escape');
    await decision.waitFor({ state: 'hidden' });
    assert.equal(new URL(page.url()).searchParams.get('specialtyContextId'), '101');
    await expectFocus(specialty);
    await chooseNextSpecialty();
    await press(decision.getByRole('button', { name: 'Descartar y continuar' }), 'Enter');
    await page.waitForURL('**/dashboard?specialtyContextId=202');
    await page.locator('main h1:focus').waitFor();
    console.log('PASS keyboard context switch, cancel and discard decisions');

    await page.goto(base + '/clinics/103/schedule' + contextId);
    const start = page.getByRole('button', { name: 'Elegir hora: Inicio del nuevo bloque' });
    await press(start, 'Enter');
    const time = page.getByRole('dialog', { name: 'Elegir hora: Inicio del nuevo bloque' });
    const hour = time.getByRole('radiogroup', { name: 'Hora', exact: true });
    await expectFocus(hour.getByRole('radio', { checked: true }));
    const initialHour = await hour.getByRole('radio', { checked: true }).inputValue();
    await page.keyboard.press('ArrowDown');
    assert.notEqual(await hour.getByRole('radio', { checked: true }).inputValue(), initialHour);
    await page.keyboard.press('Tab');
    await expectFocus(time.getByRole('radiogroup', { name: 'Minutos' }).getByRole('radio', { checked: true }));
    await page.keyboard.press('Escape');
    await time.waitFor({ state: 'hidden' });
    await expectFocus(start);
    const date = page.locator('app-date-picker').first().getByRole('button', { name: /Abrir calendario/ });
    await press(date, 'Enter');
    await page.getByRole('dialog', { name: 'Semana desde' }).waitFor();
    await page.keyboard.press('Escape');
    await expectFocus(date);
    await expectUniqueIds(page);
    console.log('PASS date and time dialogs, arrow keys and focus restoration');

    await page.goto(base + '/records/1' + contextId);
    const management = page.getByRole('button', { name: 'Más opciones de la ficha' });
    await press(management, 'Enter');
    const dialog = page.getByRole('dialog', { name: 'Gestión de la ficha' });
    await dialog.waitFor();
    await expectFocus(dialog.getByRole('button', { name: 'Cerrar', exact: true }));
    for (let index = 0; index < 8; index++) {
      await page.keyboard.press('Tab');
      assert.ok(await dialog.evaluate(element => element.contains(document.activeElement)));
    }
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'hidden' });
    await expectFocus(management);
    await page.goto(base + '/encounters/501' + contextId);
    const revisions = page.getByRole('button', { name: 'Ver revisiones' });
    await press(revisions, 'Enter');
    await expectFocus(page.getByRole('dialog', { name: 'Revisiones de la consulta' }).getByRole('button', { name: 'Cerrar', exact: true }));
    await page.keyboard.press('Shift+Tab');
    assert.ok(await page.getByRole('dialog', { name: 'Revisiones de la consulta' }).evaluate(element => element.contains(document.activeElement)));
    await page.keyboard.press('Escape');
    await expectFocus(revisions);
    await page.goto(base + '/records/1' + contextId);
    await page.setViewportSize({ width: 320, height: 720 });
    await page.getByRole('button', { name: 'Activar modo oscuro' }).click();
    await press(page.getByRole('button', { name: /Recetas y Órdenes/ }), 'Space');
    await page.getByRole('group', { name: 'Tipo de indicación médica' }).waitFor();
    await expectNoPageOverflow(page);
    await expectUniqueIds(page);
    await page.emulateMedia({ forcedColors: 'active' });
    const mode = page.getByRole('button', { name: /Solicitar Estudios/ });
    await page.keyboard.press('Tab');
    await mode.focus();
    const outline = await mode.evaluate(element => getComputedStyle(element).outlineStyle);
    assert.notEqual(outline, 'none');
    console.log('PASS record dialog, focus containment and dark 320px layout');
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
