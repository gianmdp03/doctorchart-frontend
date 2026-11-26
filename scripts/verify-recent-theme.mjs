// Export theme-visual.spec.ts with THEME_VISUAL_DIR=test-results/theme and run ng serve on 4202.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const output = path.resolve(process.env.THEME_VISUAL_DIR ?? 'test-results/theme');
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHROME_CHANNEL || 'msedge' });
try {
  const page = await browser.newPage();
  for (const theme of ['light', 'dark']) {
    await page.goto(pathToFileURL(path.join(output, `workspace-${theme}.html`)).href);
    await page.waitForFunction(() => getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-surface').trim() !== '');
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme), theme);
    await page.locator('.recent-consultation').waitFor();
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.screenshot({ path: path.join(output, `recent-${theme}-${width}.png`), fullPage: true, animations: 'disabled' });
      if (width === 1440) await page.locator('.recent-activity-card').screenshot({ path: path.join(output, `recent-feed-${theme}.png`), animations: 'disabled' });
      for (const state of ['normal', 'hover', 'focus']) {
        if (state === 'hover') await page.locator('.recent-consultation').hover();
        if (state === 'focus') await page.locator('.record-link').first().focus();
        const results = await page.locator('.recent-activity-card').evaluate(card => {
          const luminance = color => {
            const values = color.match(/[\d.]+/g).slice(0, 3).map(Number).map(v => {
              const s = v / 255; return s <= .04045 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4;
            });
            return .2126 * values[0] + .7152 * values[1] + .0722 * values[2];
          };
          const selectors = 'h2,h3,p,.text-action,.record-date span,.patient-name,.record-action,.period-bar button';
          return [...card.querySelectorAll(selectors)].filter(e => e.getBoundingClientRect().width && e.textContent.trim()).map(e => {
            let ancestor = e, background;
            do {
              background = getComputedStyle(ancestor).backgroundColor;
              ancestor = ancestor.parentElement;
            } while (ancestor && background === 'rgba(0, 0, 0, 0)');
            const a = luminance(getComputedStyle(e).color), b = luminance(background);
            return { text: e.textContent.trim().slice(0, 60), ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05) };
          });
        });
        assert.ok(results.length >= 6, 'Verify the populated feed, not just the empty state');
        assert.deepEqual(results.filter(r => r.ratio < 4.5), [], `${theme} ${width} ${state}: contrast below 4.5:1`);
        console.log(theme, width, state, 'minimum contrast', Math.min(...results.map(r => r.ratio)).toFixed(2));
      }
    }
  }
} finally { await browser.close(); }
