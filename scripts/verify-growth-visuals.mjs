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
  for (const id of ['wfa06_girls', 'hfa07_boys', 'wfl06_boys', 'bmi-patient-boys']) {
    await page.goto(pathToFileURL(path.join(output, id + '.html')).href);
    const state = await page.evaluate(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
      plotScrollable:
        document.querySelector('.chart-scroll').scrollWidth >
        document.querySelector('.chart-scroll').clientWidth,
    }));
    if (state.document > state.viewport || !state.plotScrollable)
      throw new Error('Mobile: ' + JSON.stringify(state));
    await page.screenshot({ path: path.join(output, id + '-mobile.png'), fullPage: true });
    checks.push({ chart: id, mobile: state });
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
    `PASS: 20 reference charts, 3 patient views and 4 mobile layouts. Review images in ${output}`,
  );
} finally {
  await browser.close();
}
