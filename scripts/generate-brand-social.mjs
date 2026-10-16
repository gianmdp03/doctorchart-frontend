import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const output = resolve(process.argv[2] || 'public/social/og-default.jpg');
const site = process.argv[3] || 'doctorchart.bycode.com.ar';
if (!/^[a-z0-9.-]+$/.test(site)) throw new Error('Expected a hostname.');
const logo = await readFile(new URL('../public/doctorchart-logo.svg', import.meta.url), 'utf8');
const browser = await chromium.launch({ headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge' });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html lang="es"><meta charset="utf-8"><style>
    *{box-sizing:border-box}body{margin:0;background:#0b1420;color:#fff;font-family:Arial,sans-serif;border-top:12px solid #12a89d;padding:58px 74px;overflow:hidden}
    .mark{width:100px;height:100px;background:#fff;border-radius:26px;display:grid;place-items:center}.mark svg{width:88px;height:88px}
    h1{font-size:76px;letter-spacing:-2px;margin:30px 0}p{font-size:32px;color:#c5ced8;margin:0}footer{position:absolute;bottom:82px;font-size:26px;color:#a7d1eb}
  </style><div class="mark">${logo}</div><h1>DoctorChart</h1><p>Historias clínicas digitales y pacientes</p><footer>${site}</footer></html>`);
  await page.screenshot({ path: output, type: 'jpeg', quality: 88 });
  console.log(`Generated ${output}`);
} finally {
  await browser.close();
}
