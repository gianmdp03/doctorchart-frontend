import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const base = process.env.LANDING_URL || 'http://127.0.0.1:4202';
const output = 'test-results/landing';
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(base);
  await page.getByRole('heading', { level: 1 }).waitFor();
  assert.equal(await page.locator('.feature-card').count(), 6);
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await page.getByRole('button', { name: /Activar modo oscuro/ }).click();
    for (const width of [1440, 768, 430, 390, 360, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.screenshot({ path: `${output}/${theme}-${width}.png`, fullPage: true });
      assert.ok(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `Overflow at ${theme} ${width}`,
      );
      const login = page.locator('.header-actions a');
      assert.ok(await login.isVisible());
      if (width <= 768) {
        assert.equal(await page.locator('a[href="/login"]:visible').count(), 1, 'Only the header offers login on mobile');
        assert.equal(await page.locator('.landing-footer').isVisible(), false);
        await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
        assert.equal(await page.locator('.landing-footer a[href="/login"]:visible').count(), 0);
        await page.screenshot({ path: `${output}/footer-${theme}-${width}.png` });
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: `${output}/header-${theme}-${width}.png` });
      }
    }
  }
  await page
    .locator('summary').filter({ hasText: '¿Todas las especialidades tienen los mismos módulos?' })
    .click();
  assert.ok(await page.locator('details[open]').isVisible());
  await page.locator('.header-actions a').click();
  await page.waitForURL('**/login');
  await page.locator('#login-email').waitFor();
  await page.reload();
  await page.locator('#login-email').waitFor();
  await page.getByRole('link', { name: '← Volver a DoctorChart' }).click();
  await page.getByRole('heading', { level: 1 }).waitFor();
  await page.goto(`${base}/pacientes/42`);
  await page.waitForURL('**/login?returnUrl=*');
  assert.equal(new URL(page.url()).searchParams.get('returnUrl'), '/pacientes/42');
  await page.locator('#login-email').waitFor();
  assert.deepEqual(errors, []);
  console.log(
    'Verified: light/dark at 1440, 768, 430, 390, 360, 320px; single mobile header login, no mobile footer; login controls at five mobile widths; FAQ; login; reload; return link; protected patient redirect; no browser errors.',
  );
} finally {
  await browser.close();
}
