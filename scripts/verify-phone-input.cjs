// Run the Angular development server on 127.0.0.1:4202 first.
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const fixtures = require('./testing/ui-redesign-fixtures.cjs');

const base = 'http://127.0.0.1:4202';
const countrySearch = 'Buscar país, código o prefijo';
const publicPath = '/appointments/' + fixtures.publicId + '?specialtyContextId=101';

async function phoneField(page, id) {
  const field = page.locator('#' + id + '.iti__tel-input');
  await page.locator('#' + id + '.iti__tel-input:enabled').waitFor();
  return field;
}

async function expectRequest(page, isMatch, action) {
  const [request] = await Promise.all([page.waitForRequest(isMatch), action()]);
  return request.postDataJSON();
}

async function chooseCountry(page, button, query, name) {
  await button.press('Enter');
  const search = page.getByPlaceholder(countrySearch);
  await search.fill(query);
  const option = page.getByRole('option', { name, exact: true });
  await option.click();
  await search.waitFor({ state: 'hidden' });
}

async function publicBooking(page) {
  await page.goto(base + publicPath);
  await page.locator('[data-public-slot]').first().click();
  const phone = await phoneField(page, 'public-phone');
  assert.equal(await page.getByLabel('Teléfono', { exact: true }).getAttribute('id'), 'public-phone');
  const country = page.getByRole('button', { name: /país para el número/ });
  assert.match(await country.getAttribute('aria-label'), /Argentina.*\+54/);
  await country.locator('.iti__ar').waitFor();
  const flagLoaded = await country.locator('.iti__ar').evaluate(async flag => {
    const [, url] = /url\(["']?([^"')]+)["']?\)/.exec(getComputedStyle(flag).backgroundImage) || [];
    return !!url && new URL(url, location.href).origin === location.origin && (await fetch(url)).ok;
  });
  assert.equal(flagLoaded, true, 'local flag sprite is loaded');

  await country.press('Enter');
  const search = page.getByPlaceholder(countrySearch);
  await search.waitFor();
  assert.equal(await search.evaluate(element => document.activeElement === element), true);
  assert.match(await page.getByRole('listbox').getByRole('option').first().textContent(), /Argentina/);
  await search.fill('+54');
  await page.getByRole('option', { name: 'Canadá (+1)', exact: true }).waitFor({ state: 'hidden' });
  await page.getByRole('option', { name: 'Argentina (+54)', exact: true }).waitFor();
  await search.press('Escape');
  await search.waitFor({ state: 'hidden' });
  assert.equal(await country.evaluate(element => document.activeElement === element), true);
  await chooseCountry(page, country, 'ca', 'Canadá (+1)');
  await phone.fill('4165550123');
  assert.match(await country.getAttribute('aria-label'), /Canadá.*\+1/);
  await phone.fill('+12025550123');
  assert.match(await country.getAttribute('aria-label'), /Estados Unidos.*\+1/);
  assert.ok(!(await phone.inputValue()).includes('+1'));

  await chooseCountry(page, country, 'argentina', 'Argentina (+54)');
  await phone.fill('');
  await phone.pressSequentially('1123456789');
  assert.match(await phone.inputValue(), /\D/);
  assert.equal(await phone.evaluate(element => document.activeElement === element), true);
  await page.locator('#public-contact').fill('Solicitante sintético');
  await page.locator('#public-document').fill('12345678');
  await page.locator('#public-email').fill('prueba@example.test');
  await page.locator('#public-consent').check();

  const confirm = page.locator('#public-confirm');
  await phone.fill('');
  await confirm.click();
  await page.getByText('Ingresá un número de teléfono.', { exact: true }).waitFor();
  await phone.fill('123');
  await confirm.click();
  await page.getByText(/El número es demasiado corto/).waitFor();
  assert.equal(await phone.getAttribute('aria-invalid'), 'true');

  await phone.selectText();
  await phone.evaluate(element => {
    const data = new DataTransfer();
    data.setData('text/plain', '0351 15-234-5678');
    element.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }));
  });
  assert.equal(await phone.getAttribute('aria-invalid'), 'false');
  const booking = await expectRequest(page, r => r.method() === 'POST' && r.url().includes('/public/') && r.url().endsWith('/bookings'), () => confirm.click());
  assert.equal(booking.contactPhone, '+5493512345678');
  await page.getByText('reserva-sintetica', { exact: true }).waitFor();
}

async function mobile(page) {
  await page.goto(base + publicPath);
  await page.locator('[data-public-slot]').first().tap();
  const phone = await phoneField(page, 'public-phone');
  assert.equal(await phone.getAttribute('inputmode'), 'tel');
  await phone.scrollIntoViewIfNeeded();
  const country = page.getByRole('button', { name: /país para el número/ });
  await country.tap();
  const search = page.getByPlaceholder(countrySearch);
  await search.fill('España');
  await page.getByRole('option', { name: 'España (+34)', exact: true }).tap();
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  assert.ok(width <= 320, '320 px layout has no horizontal overflow');
  await page.setViewportSize({ width: 640, height: 1100 });
  await page.evaluate(() => { document.documentElement.style.zoom = '2'; });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), '200% zoom fits narrow reflow');
}

async function dialogAndDarkMode(page) {
  await page.goto(base + publicPath);
  const slot = page.locator('[data-public-slot]').first();
  await slot.waitFor();
  await page.locator('.booking-layout').evaluate(layout => {
    document.documentElement.classList.add('dark');
    const dialog = document.createElement('dialog');
    dialog.setAttribute('aria-label', 'Reserva de prueba');
    dialog.style.cssText = 'width: min(94vw, 64rem); max-height: 90vh; overflow: auto; margin: auto;';
    layout.replaceWith(dialog);
    dialog.append(layout);
    dialog.showModal();
  });
  await slot.click();
  const phone = await phoneField(page, 'public-phone');
  const country = page.getByRole('button', { name: /país para el número/ });
  await country.press('Enter');
  const search = page.getByPlaceholder(countrySearch);
  await search.waitFor();
  const dialog = page.getByRole('dialog', { name: 'Reserva de prueba' });
  assert.equal(await dialog.getByPlaceholder(countrySearch).count(), 1, 'country selector stays inside the dialog');
  const colors = await search.evaluate(input => {
    const selector = input.closest('.dc-phone-selector');
    return [getComputedStyle(selector).color, getComputedStyle(selector).getPropertyValue('--iti-country-selector-bg').trim()];
  });
  assert.notEqual(colors[0], colors[1]);
  await search.press('Escape');
  await search.waitFor({ state: 'hidden' });
  assert.equal(await dialog.isVisible(), true);
  assert.equal(await country.evaluate(element => document.activeElement === element), true);
  await phone.fill('+54 11 2345-6789');
  assert.equal(await phone.getAttribute('aria-invalid'), 'false');
}

async function patientEdit(page) {
  const path = '/patients/1/edit?specialtyContextId=101';
  await page.goto(base + path);
  const phone = await phoneField(page, 'field-sys_phone');
  assert.equal(await phone.inputValue(), '2231234567');
  await page.getByText(/Número histórico/).waitFor();
  await page.locator('#field-sys_firstName').fill('Paciente editado');
  const save = page.getByRole('button', { name: 'Guardar Cambios', exact: true });
  const patientPut = r => r.method() === 'PUT' && /\/patients\/1(?:\?|$)/.test(r.url());
  const old = await expectRequest(page, patientPut, () => save.click());
  assert.equal(old.values.sys_phone, '2231234567');

  await page.goto(base + path);
  await phoneField(page, 'field-sys_phone');
  await phone.fill('123');
  await save.click();
  await page.getByText(/Revisá los campos marcados/).waitFor();
  await phone.fill('+34 612 345 678');
  const updated = await expectRequest(page, patientPut, () => save.click());
  assert.equal(updated.values.sys_phone, '+34612345678');
}

async function ownerBooking(page) {
  await page.goto(base + '/calendar?specialtyContextId=101');
  await page.locator('.day-header button').filter({ hasText: String(Number(fixtures.tomorrow.slice(-2))) }).click();
  await page.locator('.slot').first().click();
  await page.locator('#booking-contact').fill('Contacto sintético');
  await page.locator('#booking-document').fill('12345678');
  await page.locator('#booking-email').fill('reserva@example.test');
  const phone = await phoneField(page, 'booking-phone');
  await phone.fill('0223 495-1234');
  const saved = await expectRequest(page, r => r.method() === 'POST' && r.url().endsWith('/bookings'), () => page.locator('#booking-create').click());
  assert.equal(saved.contactPhone, '+542234951234');
}

async function staffBooking(page) {
  await page.goto(base + '/staff/calendar');
  await page.locator('.slot').first().click();
  await page.locator('#booking-contact').fill('Contacto sintético');
  await page.locator('#booking-document').fill('12345678');
  await page.locator('#booking-email').fill('reserva@example.test');
  await page.getByRole('checkbox', { name: 'El turno es para otra persona' }).check();
  await page.locator('input[name=attendee]').fill('Persona sintética');
  const phone = await phoneField(page, 'booking-phone');
  await phone.fill('+44 20 7946 0018');
  const saved = await expectRequest(page, r => r.method() === 'POST' && /\/staff\/owners\/[^/]+\/bookings$/.test(r.url()), () => page.getByRole('button', { name: 'Confirmar turno', exact: true }).click());
  assert.equal(saved.contactPhone, '+442079460018');
}

async function invitation(page) {
  await page.goto(base + '/secretaries?specialtyContextId=101');
  await page.getByRole('button', { name: 'Invitar a Secretaría', exact: true }).click();
  await page.locator('input[name=name]').fill('Secretaria de prueba');
  await page.locator('input[name=email]').fill('secretaria@example.test');
  await page.getByRole('group', { name: '¿Qué agendas puede usar?' }).getByRole('checkbox').first().check();
  const phone = await phoneField(page, 'staff-invitation-phone');
  await phone.fill('011 15-2345-6789');
  const saved = await expectRequest(page, r => r.method() === 'POST' && r.url().endsWith('/secretaries/invitations'), () => page.getByRole('button', { name: 'Crear invitación' }).click());
  assert.equal(saved.phone, '+5491123456789');
}

(async () => {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHROME_CHANNEL || 'msedge' });
  try {
    const cases = [
      ['reserva pública, teclado, búsqueda y pegado', publicBooking, false],
      ['selector dentro de diálogo y tema oscuro', dialogAndDarkMode, false],
      ['móvil y zoom', mobile, false, { viewport: { width: 320, height: 740 }, isMobile: true, hasTouch: true }],
      ['edición clínica e históricos', patientEdit, true],
      ['agenda médica', ownerBooking, true],
      ['agenda de secretaría', staffBooking, false],
      ['invitación de secretaría', invitation, true],
    ];
    for (const [name, check, authenticated, options] of cases) {
      const context = await browser.newContext(options);
      try {
        await fixtures.install(context, { authenticated });
        const page = await context.newPage();
        page.setDefaultTimeout(12000);
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await check(page);
        assert.deepEqual(errors, []);
        console.log('PASS ' + name);
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

