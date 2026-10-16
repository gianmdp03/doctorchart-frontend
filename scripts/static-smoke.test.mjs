import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { createPreview } from './preview-server.mjs';
import site from '../src/app/core/config/site.config.json' with { type: 'json' };
test('static hosting serves public pages, client routes, aliases, assets and real 404s', async () => {
  const server = createPreview({ directory: resolve('dist/doctorchart-frontend/browser'), ...site });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  try {
    for (const path of site.publicPaths) { const response = await fetch(origin + path); assert.equal(response.status, 200); const html = await response.text(); assert.match(html, /index, follow/); assert.match(html, /<h1\b/); assert.equal(response.headers.get('cache-control'), 'no-cache'); }
    for (const path of ["/login","/pacientes/123","/ficha/123/editar","/admin/especialidades"]) { const response = await fetch(origin + path + '?source=test'); assert.equal(response.status, 200); assert.match(await response.text(), /<app-root\b[^>]*>\s*<\/app-root>/); assert.match(response.headers.get('x-robots-tag'), /noindex/); }
    for (const [from, to] of Object.entries(site.redirects)) { const response = await fetch(origin + from + '?x=1', { redirect: 'manual' }); assert.equal(response.status, 301); assert.equal(response.headers.get('location'), to + '?x=1'); }
    for (const path of ['/not-a-real-page','/missing.js','/missing.css']) { const response = await fetch(origin + path); assert.equal(response.status, 404); }
    const html = readFileSync('dist/doctorchart-frontend/browser/index.html', 'utf8'); const script = html.match(/<script[^>]+src="([^"]+)"/g)?.map(x => x.match(/src="([^"]+)"/)[1]).find(x => /(?:main|chunk)-/.test(x)); assert.ok(script); const response = await fetch(new URL(script, origin)); assert.equal(response.status, 200); assert.match(response.headers.get('content-type'), /javascript/); assert.match(response.headers.get('cache-control'), /immutable/); assert.equal(response.headers.get('content-encoding'), 'gzip');
  } finally { await new Promise(resolve => server.close(resolve)); }
});
