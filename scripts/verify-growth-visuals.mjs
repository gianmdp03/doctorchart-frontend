// Real Angular TestBed SVG output, rendered in Chromium; no screenshot curves.
import { chromium } from 'playwright';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const project = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const output = path.resolve(project, process.env.GROWTH_VISUAL_DIR || 'test-results/growth');
const test = spawnSync(
  process.execPath,
  [
    path.join(project, 'node_modules/@angular/cli/bin/ng.js'),
    'test',
    '--watch=false',
    '--include=src/app/features/patient-record/growth-chart/growth-chart.component.spec.ts',
  ],
  {
    cwd: project,
    env: { ...process.env, GROWTH_VISUAL_DIR: output },
    stdio: 'inherit',
  },
);
if (test.error) throw test.error;
if (test.status !== 0) process.exit(test.status || 1);
const catalog = JSON.parse(
  fs
    .readFileSync(path.join(project, 'src/app/core/testing/growth-catalog.json'), 'utf8')
    .replace(/^\uFEFF/, ''),
);
if (catalog.length !== 20) throw new Error('Expected all 20 PDF definitions');
const options = { headless: true };
if (process.env.PLAYWRIGHT_CHROME_CHANNEL) options.channel = process.env.PLAYWRIGHT_CHROME_CHANNEL;
if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE)
  options.executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
const browser = await chromium.launch(options);
const checks = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 850 },
    deviceScaleFactor: 1,
  });
  for (const { definition } of catalog) {
    const file = path.join(output, definition.id + '.html');
    await page.goto(pathToFileURL(file).href);
    const state = await page.evaluate(() => {
      const svg = document.querySelector('svg').getBoundingClientRect();
      const clip = document.querySelector('clipPath');
      const paths = [...document.querySelectorAll('.reference-curve')];
      return {
        chart: document.querySelector('article').dataset.chartId,
        paths: paths.length,
        invalid: paths.some((p) => /NaN|Infinity/.test(p.getAttribute('d'))),
        horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
        colors: paths.map((p) => p.getAttribute('stroke')),
        clipping: paths.every(
          (p) => p.parentElement.getAttribute('clip-path') === `url(#${clip.id})`,
        ),
        clippedLabels: [
          ...document.querySelectorAll(
            '.tick-label,.year-label,.axis-title,.percentile-label,.bmi-period-label',
          ),
        ].some((p) => {
          const b = p.getBoundingClientRect();
          return (
            b.left < svg.left || b.right > svg.right || b.top < svg.top || b.bottom > svg.bottom
          );
        }),
      };
    });
    if (
      state.chart !== definition.id ||
      state.paths !== 5 ||
      state.invalid ||
      state.horizontalOverflow ||
      state.clippedLabels ||
      !state.clipping ||
      JSON.stringify(state.colors) !==
        JSON.stringify(['#dc2626', '#ea580c', '#16a34a', '#ea580c', '#dc2626'])
    )
      throw new Error(JSON.stringify(state));
    await page.screenshot({ path: path.join(output, definition.id + '.png'), fullPage: true });
    checks.push(state);
  }
  for (const [id, color] of [
    ['wfa06_girls-markers', 'rgb(236, 72, 153)'],
    ['wfa06_boys-markers', 'rgb(37, 99, 235)'],
    ['bmi-patient-boys', 'rgb(37, 99, 235)'],
  ]) {
    await page.goto(pathToFileURL(path.join(output, id + '.html')).href);
    const state = await page.evaluate(() => ({
      markers: [...document.querySelectorAll('.patient-point')].map((point) => {
        const bounds = point.getBBox();
        const style = getComputedStyle(point);
        return {
          width: bounds.width,
          height: bounds.height,
          fill: style.fill,
          stroke: style.stroke,
          unconfirmed: point.classList.contains('unconfirmed-point'),
          focusable: point.getAttribute('tabindex') === '0',
          labeled: Boolean(point.getAttribute('aria-label')),
        };
      }),
      bmiPeriods: document.querySelectorAll('.bmi-period-label').length,
      referenceSegments: [...document.querySelectorAll('.reference-curve')].map(
        (curve) => (curve.getAttribute('d').match(/M/g) || []).length,
      ),
      patientSegments: (document.querySelector('.patient-line').getAttribute('d').match(/M/g) || [])
        .length,
    }));
    if (
      state.markers.length !== 2 ||
      state.markers.some(
        (marker) =>
          Math.abs(marker.width - 9) > 0.01 ||
          Math.abs(marker.height - 9) > 0.01 ||
          !marker.focusable ||
          !marker.labeled ||
          (marker.unconfirmed
            ? marker.stroke !== color || marker.fill !== 'rgb(255, 255, 255)'
            : marker.fill !== color),
      )
    )
      throw new Error('Markers: ' + id + ' ' + JSON.stringify(state));
    if (
      id === 'bmi-patient-boys' &&
      (state.bmiPeriods !== 2 ||
        state.patientSegments !== 2 ||
        state.referenceSegments.some((n) => n !== 2))
    )
      throw new Error('BMI transition: ' + JSON.stringify(state));
    await page.screenshot({ path: path.join(output, id + '.png'), fullPage: true });
    checks.push({ chart: id, ...state });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const id of ['wfa06_girls', 'hfa07_boys', 'wfl06_boys', 'bfa06_boys']) {
    await page.goto(pathToFileURL(path.join(output, id + '-compact.html')).href);
    const state = await page.evaluate(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
      plotScrollable:
        document.querySelector('.chart-scroll').scrollWidth >
        document.querySelector('.chart-scroll').clientWidth,
    }));
    if (state.document > state.viewport || state.plotScrollable)
      throw new Error('Mobile: ' + JSON.stringify(state));
    await page.screenshot({ path: path.join(output, id + '-mobile.png'), fullPage: true });
    checks.push({ chart: id, mobile: state });
  }
  // Fractional chart sizes previously dropped subpixel grid lines with crispEdges.
  for (const width of [1440, 834, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const theme of ['light', 'dark']) {
      for (const { definition } of catalog) {
        await page.goto(pathToFileURL(path.join(output, definition.id + '.html')).href);
        await page.evaluate(theme => document.documentElement.classList.toggle('dark', theme === 'dark'), theme);
        const grid = await page.locator('.grid-line').evaluateAll(lines => lines.map(line => {
          const style = getComputedStyle(line);
          return { width: style.strokeWidth, effect: style.vectorEffect, stroke: style.stroke };
        }));
        if (!grid.length || grid.some(line => line.width !== '1px' || line.effect !== 'non-scaling-stroke' || line.stroke === 'none'))
          throw new Error(`Grid: ${definition.id}, ${width}, ${theme}`);
        if (['hfa07_boys', 'bfa07_boys'].includes(definition.id))
          await page.screenshot({ path: path.join(output, `${definition.id}-${theme}-${width}.png`), fullPage: true });
      }
      for (const sex of ['girls', 'boys']) {
        await page.goto(pathToFileURL(path.join(output, `consultation-${sex}.html`)).href);
        await page.evaluate(theme => document.documentElement.classList.toggle('dark', theme === 'dark'), theme);
        const contrast = await page.locator('.consultation-tooltip').evaluate(tooltip => {
          const luminance = color => {
            const channels = color.match(/[\d.]+/g).slice(0, 3).map(Number).map(value => {
              const s = value / 255;
              return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
            });
            return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
          };
          const background = luminance(getComputedStyle(tooltip).backgroundColor);
          return [tooltip, ...tooltip.querySelectorAll('header strong, header span, p')].map(element => {
            const foreground = luminance(getComputedStyle(element).color);
            return (Math.max(background, foreground) + 0.05) / (Math.min(background, foreground) + 0.05);
          });
        });
        if (contrast.some(ratio => ratio < 4.5))
          throw new Error(`Tooltip contrast: ${sex}, ${theme}, ${contrast}`);
        await page.screenshot({ path: path.join(output, `consultation-${sex}-${theme}-${width}.png`), fullPage: true });
      }
    }
  }
  fs.writeFileSync(
    path.join(output, 'checks.json'),
    JSON.stringify(
      { generated: new Date().toISOString(), desktop: 20, markers: 3, mobile: 4, checks },
      null,
      2,
    ) + '\n',
  );
  console.log(
    `PASS: 20 reference charts, 3 patient views, 4 mobile layouts; grid and tooltip contrast in both themes at 1440, 834 and 390px. Review images in ${output}`,
  );
} finally {
  await browser.close();
}
