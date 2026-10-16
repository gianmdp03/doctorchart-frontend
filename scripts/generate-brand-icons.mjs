import { readFile, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

// Rasterize the actual SVG, then store compressed PNG frames in the ICO.
const logo = await readFile(new URL('../public/doctorchart-logo.svg', import.meta.url), 'utf8');
const browser = await chromium.launch({ headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge' });
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  const frames = [];
  for (const size of [16, 32, 48]) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block;width:100vw;height:100vh}</style>${logo.replace('<title>', '<rect width="64" height="64" rx="10" fill="#fff"/><title>')}`);
    frames.push({ size, png: await page.screenshot({ omitBackground: true }) });
  }
  const header = Buffer.alloc(6 + frames.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);
  let offset = header.length;
  for (const [index, { size, png }] of frames.entries()) {
    const entry = 6 + index * 16;
    header[entry] = size;
    header[entry + 1] = size;
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(png.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += png.length;
  }
  const ico = Buffer.concat([header, ...frames.map(frame => frame.png)]);
  await writeFile(new URL('../public/favicon.ico', import.meta.url), ico);
  console.log(`Generated favicon.ico: ${ico.length} bytes (16, 32, 48 px).`);
} finally {
  await browser.close();
}
