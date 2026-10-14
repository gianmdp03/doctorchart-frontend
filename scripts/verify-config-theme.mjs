// Export theme-config-visual.spec.ts with THEME_VISUAL_DIR=test-results/theme first.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const output = path.resolve('test-results/theme');
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHROME_CHANNEL || 'msedge' });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  for (const fixture of ['configuration', 'configuration-dialog']) {
    await page.goto(pathToFileURL(path.join(output, fixture + '.html')).href);
    for (const theme of ['light', 'dark']) {
      await page.evaluate(dark => document.documentElement.classList.toggle('dark', dark), theme === 'dark');
      await page.screenshot({ path: path.join(output, `${fixture}-${theme}.png`), fullPage: true, animations: 'disabled' });
      const results = await page.evaluate(() => {
        const luminance = color => {
          const channels = color.match(/[\d.]+/g).slice(0, 3).map(Number).map(v => {
            const s = v / 255; return s <= .04045 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4;
          });
          return .2126 * channels[0] + .7152 * channels[1] + .0722 * channels[2];
        };
        const selectors = '.category-manager h3, .hint, .category-name, .binding, .field-summary strong, .control';
        return [...document.querySelectorAll(selectors)].filter(e => e.getBoundingClientRect().width).map(e => {
          let ancestor = e, background;
          do {
            background = getComputedStyle(ancestor).backgroundColor;
            ancestor = ancestor.parentElement;
          } while (ancestor && (background === 'rgba(0, 0, 0, 0)' || background === 'transparent'));
          const foreground = getComputedStyle(e).color;
          const l1 = luminance(foreground), l2 = luminance(background);
          return { text: e.textContent.trim().slice(0, 65), ratio: (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05) };
        });
      });
      assert.ok(results.length > 5);
      assert.deepEqual(results.filter(r => r.ratio < 4.5), [], `${fixture} ${theme}: text contrast must be at least 4.5:1`);
      console.log(fixture, theme, 'minimum text contrast:', Math.min(...results.map(r => r.ratio)).toFixed(2));
    }
  }
  console.log('Configuration panels and dialog are readable in both themes.');
} finally { await browser.close(); }
