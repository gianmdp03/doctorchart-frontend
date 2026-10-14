// Run ng serve on 4202 and export fixtures with THEME_VISUAL_DIR=test-results/theme.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const output = path.resolve('test-results/theme');
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHROME_CHANNEL || 'msedge' });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://127.0.0.1:4202');
  await page.getByRole('button', { name: 'Activar modo oscuro' }).waitFor();
  const light = await page.locator('.login-page-card').evaluate(e => getComputedStyle(e).backgroundColor);
  await page.screenshot({ path: path.join(output, 'login-light.png'), fullPage: true, animations: 'disabled' });
  await page.getByRole('button', { name: 'Activar modo oscuro' }).click();
  assert.equal(await page.evaluate(() => localStorage.getItem('doctorchart_theme')), 'dark');
  await page.screenshot({ path: path.join(output, 'login-dark.png'), fullPage: true, animations: 'disabled' });
  const dark = await page.locator('.login-page-card').evaluate(e => getComputedStyle(e).backgroundColor);
  assert.notEqual(dark, light);
  await page.reload();
  await page.getByRole('button', { name: 'Activar modo claro' }).waitFor();
  assert.equal(await page.locator('html').getAttribute('class'), 'dark');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(output, 'login-dark-mobile.png'), fullPage: true, animations: 'disabled' });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await page.getByRole('button', { name: 'Activar modo claro' }).focus();
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: 'Activar modo oscuro' }).waitFor();
  await page.screenshot({ path: path.join(output, 'login-light-mobile.png'), fullPage: true, animations: 'disabled' });
  assert.equal(await page.locator('.login-page-card').evaluate(e => getComputedStyle(e).backgroundColor), light);
  await page.reload();
  await page.getByRole('button', { name: 'Activar modo oscuro' }).waitFor();
  assert.deepEqual(errors, []);

  for (const file of ['workspace', 'calendar']) {
    await page.setViewportSize({ width: 1440, height: 1100 });
    for (const theme of ['light', 'dark']) {
      const fixture = file === 'workspace' ? `workspace-${theme}.html` : 'calendar.html';
      await page.goto(pathToFileURL(path.join(output, fixture)).href);
      await page.evaluate(dark => document.documentElement.classList.toggle('dark', dark), theme === 'dark');
      await page.screenshot({ path: path.join(output, `${file}-${theme}.png`), fullPage: true, animations: 'disabled' });
      if (file === 'calendar') {
        const colors = await page.locator('mat-calendar').evaluate(e => {
          const style = getComputedStyle(e.closest('.mat-datepicker-content'));
          return { background: style.backgroundColor, color: style.color };
        });
        assert.notEqual(colors.background, colors.color);
        console.log(theme, 'calendar', colors);
      } else {
        const textarea = await page.locator('.notes-textarea').evaluate(e => ({
          bg: getComputedStyle(e).backgroundColor, fg: getComputedStyle(e).color,
        }));
        assert.notEqual(textarea.bg, textarea.fg);
        if (theme === 'dark') assert.notEqual(textarea.bg, 'rgb(251, 252, 253)');
        assert.equal(await page.getByRole('button', { name: theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro' }).count(), 1);
      }
    }
  }
  console.log('Both themes, persistence, keyboard, mobile layout and calendar verified. Screenshots:', output);
} finally { await browser.close(); }
