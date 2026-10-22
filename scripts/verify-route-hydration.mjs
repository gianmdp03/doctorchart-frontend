// Run against a build made with PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_rendering_fixture.
// All remote traffic is intercepted. No real accounts, API calls or credentials are used.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { once } from 'node:events';
import { chromium } from 'playwright';
import { createPreview } from './preview-server.mjs';
import site from '../src/app/core/config/site.config.json' with { type: 'json' };

const directory = resolve('dist/doctorchart-frontend/browser');
assert.ok(readdirSync(directory).some(name => name.endsWith('.js') && readFileSync(resolve(directory, name), 'utf8').includes('sb_publishable_rendering_fixture')), 'Build with the fixture public key before running this check.');
assert.match(readFileSync(resolve(directory, 'index.html'), 'utf8'), /<app-landing[\s>]/, 'The public home must remain prerendered for SEO.');
const server = createPreview({ directory, ...site });
server.listen(0, '127.0.0.1');
await once(server, 'listening');
const origin = `http://127.0.0.1:${server.address().port}`;
const options = { headless: true };
if (process.env.PLAYWRIGHT_CHROME_CHANNEL) options.channel = process.env.PLAYWRIGHT_CHROME_CHANNEL;
if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE) options.executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
let browser;
const definition = { schemaVersion: 1, patientForm: { categories: [] }, encounterForm: { categories: [] }, modulesConfig: { MEDICATION_CATALOG: false, AI_ASSISTANT: false, GROWTH_CHARTS: false } };
const specialty = { id: 1, code: 'pediatrics', name: 'Fixture', version: 1 };
const setup = { id: 1, version: 1, specialty, experience: { specialtyId: 1, specialtyVersion: 1, navigation: ['DASHBOARD', 'PATIENTS', 'WIZARD'], patientRecordTabs: ['SUMMARY', 'ENCOUNTERS'], patientRecordActions: [] }, onboardingCompleted: true, currentStepKey: 'completed', definition, draftDefinition: null };
try {
  browser = await chromium.launch(options);
  for (const account of ['anonymous', 'doctor', 'admin', 'no-plan']) {
    for (const delay of [0, 200]) {
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('**/*', async route => {
        const url = new URL(route.request().url());
        if (url.origin === origin) return route.continue();
        if (url.origin !== 'https://api.bycode.com.ar') return route.abort();
        if (delay) await new Promise(resolve => setTimeout(resolve, delay));
        let json = [];
        if (url.pathname.endsWith('/workspace')) json = setup;
        else if (url.pathname.endsWith('/workspace/preferences')) json = { version: 1, patientColumnsConfig: {}, quickNotes: null };
        else if (url.pathname.endsWith('/doctor/profile')) json = { id: 1, specialty, isSpecialtyLocked: true };
        else if (url.pathname.endsWith('/patients')) json = { content: [{ id: 1, fullName: 'Paciente ficticio', birthDate: '2024-07-11', ageDisplay: '2 años 3m', ageInMonths: 27, ageGroup: 'EARLY_CHILDHOOD', hasPendingVaccine: false }], totalElements: 1, totalPages: 1 };
        else if (/patients|encounters/.test(url.pathname)) json = { content: [], totalElements: 0, totalPages: 0 };
        await route.fulfill({ json });
      });
      if (account !== 'anonymous') await page.addInitScript(({ account }) => {
        const user = { id: 'rendering-fixture', aud: 'authenticated', created_at: '2026-01-01T00:00:00Z', app_metadata: { role: account === 'admin' ? 'SUPER_ADMIN' : 'COMPANY', app_modules: { doctorchart: { active: account === 'doctor', tier: 'BASIC', expires_at: '2099-01-01T00:00:00Z' } } }, user_metadata: {}, email: 'fixture@example.invalid' };
        localStorage.setItem('sb-api-auth-token', JSON.stringify({ access_token: 'fixture-token', refresh_token: 'fixture-refresh', expires_at: Math.floor(Date.now()/1000)+3600, expires_in: 3600, token_type: 'bearer', user }));
      }, { account });
      try {
        await page.goto(origin);
        if (account === 'anonymous') {
          await page.locator('app-landing').waitFor();
          await page.locator('app-landing a[href="/login"]').first().click();
          await page.waitForURL('**/login');
          await page.locator('app-login-page').waitFor();
          assert.equal(await page.locator('app-landing').count(), 0);
          await page.goBack();
          await page.locator('app-landing').waitFor();
          assert.equal(await page.locator('app-landing').count(), 1);
        } else {
          const selector = account === 'doctor' ? 'app-dashboard' : account === 'admin' ? 'app-admin-specialties' : 'app-no-plan';
          await page.locator(selector).waitFor();
          // Observe beyond lazy loading and hydration cleanup, then test a direct CSR reload.
          await page.waitForTimeout(500);
          assert.equal(await page.locator('app-landing').count(), 0, `${account}: public home remained below private content`);
          assert.equal(await page.locator(selector).count(), 1);
          await page.reload();
          await page.locator(selector).waitFor();
          assert.equal(await page.locator('app-landing').count(), 0);
        }
        if (account === 'doctor') await verifyPediatricDirectory(page);
        assert.deepEqual(errors, [], `${account}: browser errors`);
        console.log(`PASS ${account}, API delay ${delay} ms`);
      } finally { await page.close(); }
    }
  }
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}

async function verifyPediatricDirectory(page) {
  await page.locator('app-sidebar a[href="/pacientes"]').first().click();
  await page.locator('app-patient-list').waitFor();
  await page.getByText('Primera infancia', { exact: true }).waitFor();
  const labels = ['Recién nacidos (0–27 días)', 'Lactantes (28 días–<1 año)', 'Primera infancia (0–8 años)', 'Niñez (1–9 años)', 'Adolescentes (10–19 años)'];
  const filters = ['NEONATAL', 'INFANT', 'EARLY_CHILDHOOD', 'CHILD', 'ADOLESCENT'];
  for (let i = 0; i < labels.length; i++) {
    const request = page.waitForRequest(request => new URL(request.url()).searchParams.get('filter') === filters[i]);
    await page.getByRole('button', { name: labels[i], exact: true }).click();
    await request;
  }
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 850 });
    // Resizing starts the existing sidebar width animation; measure settled layout.
    await page.waitForFunction(expected => Math.abs(document.querySelector('.sidebar-container').getBoundingClientRect().width - expected) < 1, width <= 768 ? 68 : 248);
    for (const label of labels) {
      const box = await page.getByRole('button', { name: label, exact: true }).boundingBox();
      assert.ok(box && box.x >= 0 && box.x + box.width <= width + 1, `${label} exceeds viewport ${width}`);
    }
  }
}
