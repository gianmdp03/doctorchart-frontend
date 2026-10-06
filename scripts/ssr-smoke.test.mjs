import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { request as httpRequest } from 'node:http';
import { createServer } from 'node:net';
import { resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { test } from 'node:test';

// Run after the production build, with the same PUBLIC_APP_URL used by that build.
test('production server accepts its configured host and rejects foreign hosts', { timeout: 20_000 }, async (t) => {
  assert.ok(process.env.PUBLIC_APP_URL, 'Provide the PUBLIC_APP_URL used for the production build.');
  const hostname = new URL(process.env.PUBLIC_APP_URL).hostname;
  const reservation = createServer();
  reservation.listen(0, '127.0.0.1');
  await once(reservation, 'listening');
  const port = reservation.address().port;
  await new Promise((done) => reservation.close(done));

  const server = spawn(process.execPath, [resolve('dist/doctorchart-frontend/server/server.mjs')], {
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  });
  let output = '';
  server.stdout.on('data', (chunk) => { output += chunk; });
  server.stderr.on('data', (chunk) => { output += chunk; });
  const exited = once(server, 'exit');
  const request = (path, host = hostname) => new Promise((done, reject) => {
    const req = httpRequest({ hostname: '127.0.0.1', port, path, headers: { Host: host } }, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => { body += chunk; });
      response.on('end', () => done({ status: response.statusCode, contentType: response.headers['content-type'], location: response.headers.location, body }));
      response.on('error', reject);
    });
    req.setTimeout(2_000, () => req.destroy(new Error('SSR response timeout.')));
    req.on('error', reject);
    req.end();
  });
  try {
    const deadline = Date.now() + 10_000;
    while (true) {
      assert.equal(server.exitCode, null, output);
      try { await request('/'); break; }
      catch (error) {
        if (Date.now() >= deadline) throw error;
        await delay(100);
      }
    }
    await t.test('configured host serves the public shell including protected routes', async () => {
      const root = await request('/');
      assert.equal(root.status, 302);
      assert.equal(new URL(root.location, `http://${hostname}`).pathname, '/dashboard');
      for (const path of ['/dashboard', '/pacientes/1']) {
        const response = await request(path);
        assert.equal(response.status, 200, `${path}: ${output}`);
        assert.match(response.contentType, /text\/html/);
        assert.match(response.body, /<app-root\b[^>]*>\s*<\/app-root>/);
      }
    });
    await t.test('a fabricated Host does not reach application rendering', async () => {
      const response = await request('/pacientes/1', 'untrusted.invalid');
      assert.equal(response.status, 400);
    });
  } finally {
    server.kill();
    await exited;
  }
});
