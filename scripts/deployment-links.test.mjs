import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import site from '../src/app/core/config/site.config.json' with { type: 'json' };

test('production application links point to the definitive domains', () => {
  assert.equal(site.apiGatewayOrigin, 'https://api.bycode.com.ar');
  assert.equal(site.supabase.url, 'https://api.bycode.com.ar');
  assert.deepEqual(site.applicationUrls, {
    bycode:'https://bycode.com.ar', pointly:'https://pointly.bycode.com.ar', doctorchart:'https://doctorchart.bycode.com.ar'
  });
});

test('application source has no hard-coded loopback URL fallbacks', () => {
  const scan = directory => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (['testing','__snapshots__'].includes(entry.name)) continue;
      const file = join(directory, entry.name);
      if (entry.isDirectory()) scan(file);
      else if (/\.(ts|html|json)$/.test(entry.name) && !entry.name.endsWith('.spec.ts')) {
        assert.doesNotMatch(readFileSync(file,'utf8'), /https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?=[:/"'])/i, file);
      }
    }
  };
  scan(resolve('src/app'));
});
