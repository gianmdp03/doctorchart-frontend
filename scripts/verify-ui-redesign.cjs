// Real Angular UI with an explicitly synthetic network boundary; no live writes.
// Run ng serve on 127.0.0.1:4202 first. Uses the existing Playwright dependency.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const fixtures = require('./testing/ui-redesign-fixtures.cjs');
const checkAccessibility = require('./testing/ui-accessibility-check.cjs');

const out = path.resolve('.impeccable/review');
fs.mkdirSync(out, { recursive: true });
const base = 'http://127.0.0.1:4202';
const selected = new Set((process.env.UI_CASES || '').split(',').filter(Boolean));
const previous = selected.size && fs.existsSync(path.join(out, 'results.json')) ? JSON.parse(fs.readFileSync(path.join(out, 'results.json'))) : null;
const belongs = name => [...selected].some(id => name === id || name.startsWith(id + '-'));
const report = previous ? { ...previous, cases: previous.cases.filter(c => !belongs(c.name)), captures: previous.captures.filter(c => !belongs(c.file.replace(/\.png$/, ''))) } : { boundary: 'Synthetic API responses, real Angular components; no backend or database writes.', cases: [], captures: [], browserErrors: [], unexpected: [] };
const persist = () => fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2));

(async () => {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHROME_CHANNEL || 'msedge', headless: true });
  try {
    async function context(options) {
      const c = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
      const boundary = await fixtures.install(c, options);
      c.on('page', p => p.on('pageerror', e => report.browserErrors.push({ message: e.message, url: p.url() })));
      c.setDefaultTimeout(12000);
      return { c, boundary, p: await c.newPage() };
    }
    const doctor = await context({});
    const anonymous = await context({ authenticated: false });
    const admin = await context({ role: 'SUPER_ADMIN' });
    const staff = await context({ authenticated: false });
    const noPlan = await context({ hasPlan: false });
    const newDoctor = await context({ initialSetup: true });

    async function capture(p, name) {
      await p.evaluate(() => { scrollTo(0, 0); });
      const overflow = await p.evaluate(() => ({ width: innerWidth, document: document.documentElement.scrollWidth, offenders: [...document.querySelectorAll('body *')].filter(e => {
        const r = e.getBoundingClientRect(), s = getComputedStyle(e);
        return r.width > 0 && r.right > innerWidth + 2 && s.position !== 'fixed' && !e.closest('.week-strip, .flattened-tabs-nav, .step-navigation, [class*="table-responsive"], [class*="table-wrap"]');
      }).slice(0, 8).map(e => e.tagName + '.' + String(e.className).slice(0, 100)) }));
      const file = name + '.png';
      await p.screenshot({ path: path.join(out, file), fullPage: true, animations: 'disabled' });
      report.captures.push({ file, url: p.url().replace(base, ''), theme: await p.locator('html').getAttribute('class'), overflow, accessibility: await checkAccessibility(p) });
      if (overflow.document > overflow.width + 1) report.cases.push({ name: name + '-overflow', status: 'FAIL', detail: overflow });
      persist();
    }

    async function setTheme(p, theme) {
      const action = p.getByRole('button', { name: theme === 'dark' ? 'Activar modo oscuro' : 'Activar modo claro', exact: true });
      if (await action.count() && await action.first().isVisible()) await action.first().click();
      else await p.evaluate(t => document.documentElement.classList.toggle('dark', t === 'dark'), theme);
      await p.waitForFunction(t => document.documentElement.classList.contains('dark') === (t === 'dark'), theme);
      await p.evaluate(t => localStorage.setItem('doctorchart_theme', t), theme);
    }

    async function variants(p, name) {
      for (const [viewport, size] of [['desktop', { width: 1440, height: 1000 }], ['tablet', { width: 834, height: 1112 }], ['mobile', { width: 390, height: 844 }]]) {
        await p.setViewportSize(size);
        for (const theme of ['light', 'dark']) {
          await setTheme(p, theme);
          await capture(p, `${name}-${viewport}-${theme}`);
        }
      }
      await p.setViewportSize({ width: 1440, height: 1000 });
      await setTheme(p, 'light');
    }

    async function run(name, target, route, ready, action) {
      if (selected.size && !selected.has(name)) return;
      try {
        await target.p.goto(base + route);
        await target.p.locator(ready).first().waitFor();
        await target.p.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
        if (action) await action(target.p, target.boundary);
        await variants(target.p, name);
        report.cases.push({ name, status: 'PASS' });
        console.log('PASS', name);
      } catch (e) {
        report.cases.push({ name, status: 'FAIL', error: e.stack });
        console.log('FAIL', name, e.message);
        await target.p.screenshot({ path: path.join(out, name + '-failure.png'), fullPage: true }).catch(() => {});
      }
      persist();
    }

    await run('public-directory', anonymous, '/appointments', '.clinic-card');
    await run('login', anonymous, '/login', '#login-email', async p => {
      await p.locator('#login-email').fill('correo-invalido');
      await p.locator('#login-password').focus();
      await p.locator('#login-password').fill('123');
      await p.getByRole('button', { name: 'Ingresar a DoctorChart', exact: true }).click();
      assert.equal(await p.locator('#login-email').getAttribute('aria-invalid'), 'true');
      await capture(p, 'login-validation');
      await p.locator('#login-email').fill('');
      await p.locator('#login-password').fill('');
    });
    await run('register', anonymous, '/register', '.register-card');
    await run('register-confirmed', anonymous, '/register/confirmed', '.register-card');
    await run('pricing', anonymous, '/pricing', '.pricing');
    await run('plan-required', noPlan, '/plan-required', '.plan-card');
    await run('professionals', anonymous, '/professionals', '.hero');
    await run('public-booking', anonymous, '/appointments/' + fixtures.publicId + '?specialtyContextId=101', '[data-public-slot]', async p => {
      await p.locator('[data-public-slot]').first().click();
      await p.locator('#public-contact').fill('Solicitante de prueba');
      await p.locator('#public-document').fill('12345678');
      await p.locator('#public-phone').fill('2231234567');
      await p.locator('#public-email').fill('prueba@example.test');
      await p.locator('#public-consent').check();
      assert.equal(await p.locator('#public-confirm').isEnabled(), true);
    });
    await run('public-conflict', anonymous, '/appointments/' + fixtures.publicId + '?specialtyContextId=101', '[data-public-slot]', async (p, boundary) => {
      await p.locator('[data-public-slot]').first().click();
      await p.locator('#public-contact').fill('Solicitante de prueba');
      await p.locator('#public-document').fill('12345678');
      await p.locator('#public-phone').fill('2231234567');
      await p.locator('#public-email').fill('prueba@example.test');
      await p.locator('#public-consent').check();
      boundary.state.failBooking = true;
      await p.locator('#public-confirm').click();
      await p.locator('.reservation-form [role="alert"]').waitFor();
      assert.equal(await p.locator('#public-contact').inputValue(), 'Solicitante de prueba');
      assert.ok(boundary.writes.some(w => w.path.endsWith('/bookings')), 'Conflict must reach the booking API boundary');
      boundary.state.failBooking = false;
    });
    await run('public-success', anonymous, '/appointments/' + fixtures.publicId + '?specialtyContextId=101', '[data-public-slot]', async (p, boundary) => {
      await p.locator('[data-public-slot]').first().click();
      await p.locator('#public-contact').fill('Solicitante de prueba');
      await p.locator('#public-document').fill('12345678');
      await p.locator('#public-phone').fill('2231234567');
      await p.locator('#public-email').fill('prueba@example.test');
      await p.locator('#public-consent').check();
      await p.locator('#public-confirm').click();
      await p.getByText('reserva-sintetica', { exact: true }).waitFor();
      assert.ok(boundary.writes.some(w => w.path.endsWith('/bookings') && w.body.specialtyContextId === '101' && !w.body.patientId));
    });
    await run('confirmation', anonymous, '/appointments/confirmation', '#confirmation-code', async p => {
      await p.locator('#confirmation-code').fill('a'.repeat(43));
      await p.getByRole('button', { name: 'Consultar turno', exact: true }).click();
      await p.locator('.constancia').waitFor();
    });
    await run('dashboard', doctor, '/dashboard?specialtyContextId=101', '.notes-textarea', async p => {
      await p.locator('.notes-textarea').fill('Recordatorio de prueba para esta especialidad.');
      await p.getByRole('button', { name: 'Guardar', exact: true }).click();
      await p.getByText('Guardado', { exact: true }).waitFor();
    });
    await run('account-menu', doctor, '/dashboard?specialtyContextId=101', '.profile-avatar-btn', async p => {
      await p.locator('.profile-avatar-btn').click();
      await p.locator('#account-options').waitFor();
      assert.equal(await p.locator('.profile-avatar-btn').getAttribute('aria-expanded'), 'true');
      await p.getByRole('button', { name: 'Perfil Profesional', exact: true }).waitFor();
    });
    await run('mobile-navigation', doctor, '/dashboard?specialtyContextId=101', '.notes-textarea', async p => {
      await p.setViewportSize({ width: 390, height: 844 });
      const toggle = p.getByRole('button', { name: 'Menú', exact: true });
      await toggle.focus();
      await p.keyboard.press('Enter');
      await p.getByRole('link', { name: 'Agenda de turnos', exact: true }).waitFor();
      await capture(p, 'mobile-navigation-expanded');
      await p.getByRole('link', { name: 'Agenda de turnos', exact: true }).click();
      await p.locator('.calendar-page').waitFor();
      assert.equal(await p.locator('.mobile-nav-toggle').getAttribute('aria-expanded'), 'false');
    });
    await run('patients', doctor, '/patients?specialtyContextId=101', '.patient-row');
    await run('patients-empty', doctor, '/patients?specialtyContextId=101', '.patient-row', async (p, boundary) => {
      boundary.state.emptyPatients = true;
      await p.reload();
      await p.locator('.empty-state').waitFor();
      boundary.state.emptyPatients = false;
    });
    await run('patient-form', doctor, '/patients/new?specialtyContextId=101', '#field-sys_firstName', async p => {
      await p.locator('#field-sys_firstName').fill('Paciente de prueba');
      await p.locator('#field-sys_lastName').fill('Pérez');
      await p.locator('#field-sys_dni').fill('12345678');
      await p.locator('#field-sys_dob').fill('12/04/1990');
      await p.locator('#field-sys_dob').press('Tab');
      await p.locator('#field-sys_sex').selectOption('FEMALE');
      assert.equal(await p.locator('#field-sys_firstName').inputValue(), 'Paciente de prueba');
    });
    await run('patient-edit', doctor, '/patients/1/edit?specialtyContextId=101', '#field-sys_firstName', async p => {
      assert.equal(await p.locator('#field-sys_firstName').inputValue(), 'Paciente de prueba');
    });
    await run('patient-record', doctor, '/records/1?specialtyContextId=101', '.patient-clinical-banner');
    await run('pediatric-growth', doctor, '/records/1?specialtyContextId=303', '.flat-tab-btn', async p => {
      await p.locator('.flat-tab-btn').filter({ hasText: 'Evolución y Curvas' }).click();
      await p.locator('app-growth-chart').first().waitFor();
    });
    await run('vaccination-calendar-error', doctor, '/vaccination-calendar?specialtyContextId=303', '.status-error', async (p, boundary) => {
      const before = boundary.requests.filter(r => r.path.endsWith('/vaccination-calendar')).length;
      await p.getByRole('button', { name: 'Reintentar carga', exact: true }).click();
      await p.locator('.status-error').waitFor();
      assert.ok(boundary.requests.filter(r => r.path.endsWith('/vaccination-calendar')).length > before);
    });
    await run('vaccination-calendar', doctor, '/vaccination-calendar?specialtyContextId=303', '.status-error', async (p, boundary) => {
      boundary.state.calendarAvailable = true;
      await p.getByRole('button', { name: 'Reintentar carga', exact: true }).click();
      await p.locator('.header-card').waitFor();
    });
    for (const [name, label] of [['clinical-history', 'Historia Clínica'], ['prescriptions', 'Recetas y Órdenes'], ['studies', 'Estudios realizados'], ['vaccinations', 'Vacunas']]) {
      await run(name, doctor, '/records/1?specialtyContextId=101', '.flat-tab-btn', async p => {
        await p.locator('.flat-tab-btn').filter({ hasText: label }).click();
        await p.waitForTimeout(200);
        assert.equal(await p.locator('.flat-tab-btn.active').getAttribute('aria-pressed'), 'true');
      });
    }
    await run('encounter-form', doctor, '/records/1?specialtyContextId=101', '.patient-clinical-banner', async p => {
      await p.getByRole('button', { name: 'Nueva historia clínica', exact: true }).first().click();
      await p.locator('#field-chiefComplaint').fill('Registro sintético para verificar formularios.');
      await p.locator('#field-heartRate').fill('72');
      await p.locator('#field-temperature').fill('36,5');
      await p.locator('#field-weightKg').fill('65');
      await p.locator('#field-heightCm').fill('165');
      assert.equal(await p.locator('#field-heartRate').inputValue(), '72');
    });
    await run('encounters', doctor, '/encounters?specialtyContextId=101', '.consultas-page');
    await run('encounter-detail', doctor, '/encounters/501?specialtyContextId=101', '.encounter-page');
    await run('specialties', doctor, '/specialties?specialtyContextId=101', '.specialty-card');
    await run('wizard', doctor, '/onboarding/setup?specialtyContextId=101', '.step-button');
    await run('onboarding-selection', newDoctor, '/onboarding/select-specialty', '.onboarding-card');
    await run('field-editor', doctor, '/onboarding/setup?specialtyContextId=101', '.step-button', async p => {
      await p.locator('.step-button').filter({ hasText: 'Historia Clínica' }).click();
      await p.locator('article[data-field-key="chiefComplaint"]').getByRole('button', { name: 'Editar', exact: true }).click();
      await p.getByLabel('Etiqueta', { exact: true }).waitFor();
    });
    await run('clinics', doctor, '/clinics?specialtyContextId=101', '.clinics-page');
    await run('clinic-form', doctor, '/clinics/new?specialtyContextId=101', '.clinic-form-page');
    await run('clinic-edit', doctor, '/clinics/103/edit?specialtyContextId=101', '.clinic-form-page');
    await run('teleconsultation', doctor, '/clinics/new?specialtyContextId=101&modality=teleconsultation', '.clinic-form-page');
    await run('schedules', doctor, '/clinics/103/schedule?specialtyContextId=101', '#schedule-notice');
    await run('calendar', doctor, '/calendar?specialtyContextId=101', '.week-day', async p => {
      const day = p.locator('.week-day').filter({ hasText: String(Number(fixtures.tomorrow.slice(-2))) });
      if (await day.count() === 1) await day.click();
    });
    await run('booking-detail', doctor, '/calendar?specialtyContextId=101', '.week-day', async p => {
      const day = p.locator('.week-day').filter({ hasText: String(Number(fixtures.tomorrow.slice(-2))) });
      if (await day.count() === 1) await day.click();
      await p.locator('[data-booking-id="1"]').click();
      await p.locator('#booking-detail-heading').waitFor();
    });
    await run('booking-reschedule', doctor, '/calendar?specialtyContextId=101', '.week-day', async p => {
      await p.locator('.week-day').filter({ hasText: String(Number(fixtures.tomorrow.slice(-2))) }).click();
      await p.locator('[data-booking-id="1"]').click();
      await p.locator('#booking-move').click();
      await p.locator('#move-slot').selectOption({ index: 1 });
      assert.equal(await p.locator('#move-confirm').isEnabled(), true);
    });
    await run('manual-booking', doctor, '/calendar?specialtyContextId=101', '.week-day', async p => {
      await p.locator('.week-day').filter({ hasText: String(Number(fixtures.tomorrow.slice(-2))) }).click();
      await p.locator('.slot').first().click();
      await p.locator('#booking-contact').fill('Solicitante de prueba');
      assert.equal(await p.locator('#booking-create').isEnabled(), true);
    });
    await run('profile', doctor, '/profile?specialtyContextId=101', '.profile-identity');
    await run('publication', doctor, '/booking-publication?specialtyContextId=101', '.publication-page');
    await run('secretaries', doctor, '/secretaries?specialtyContextId=101', '.secretaries');
    await run('staff-login', staff, '/staff/login', '.auth-page');
    await run('staff-activation', staff, '/staff/activate', '.auth-page');
    await run('staff-recovery', staff, '/staff/recover', '.auth-page');
    await run('staff-calendar', staff, '/staff/calendar', '[aria-label="Consultorio asignado"]', async p => {
      await p.getByLabel('Consultorio asignado', { exact: true }).selectOption({ index: 1 });
      await p.locator('.booking').first().waitFor();
    });
    await run('admin', admin, '/admin/specialties', '.admin-specialties', async p => {
      await p.getByRole('button', { name: /Medicina General general_medicine/ }).click();
      await p.getByText('Revisión 1 · Publicada', { exact: true }).waitFor();
    });
    await run('not-found', doctor, '/route-that-does-not-exist', '.not-found');

    for (const target of [doctor, anonymous, admin, staff, noPlan, newDoctor]) {
      report.unexpected.push(...target.boundary.unexpected);
      await target.c.close();
    }
    persist();
    const failures = report.cases.filter(c => c.status === 'FAIL');
    console.log(JSON.stringify({ cases: report.cases.length, failures: failures.map(c => c.name), captures: report.captures.length, browserErrors: report.browserErrors, unexpected: report.unexpected }, null, 2));
    if (failures.length || report.browserErrors.length) process.exitCode = 1;
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
