import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { generatePublicConfig, parsePublicConfig } from './public-config.mjs';

const valid = () => ({
  PUBLIC_APP_URL: 'http://localhost:4202',
  PUBLIC_API_URL: 'http://localhost:8000/api/doctorchart',
  PUBLIC_AI_GATEWAY_URL: 'http://localhost:8000/api/ai/doctorchart/chat',
  PUBLIC_SYNTAH_PLANS_URL: 'http://localhost:4200/company-panel#plans-catalog',
  PUBLIC_SUPABASE_URL: 'https://project.supabase.co',
  PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test',
});

test('every public setting is required; no embedded project or localhost fallback', () => {
  for (const key of Object.keys(valid())) {
    const env = valid(); delete env[key];
    assert.throws(() => parsePublicConfig(env), new RegExp(key));
  }
});

test('private values and malformed URLs never reach public configuration or diagnostics', () => {
  for (const [key, value] of [
    ['PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'sb_secret_sensitive-value'],
    ['PUBLIC_API_URL', 'http://user:sensitive-value@localhost:8000/api/doctorchart'],
    ['PUBLIC_AI_GATEWAY_URL', 'https://external.test/api/ai/doctorchart/chat'],
    ['PUBLIC_SUPABASE_URL', 'http://project.supabase.co'],
    ['PUBLIC_API_URL', 'http://external.test/api/doctorchart'],
  ]) {
    assert.throws(() => parsePublicConfig({ ...valid(), [key]: value }), (error) => !error.message.includes(value));
  }
  const config = parsePublicConfig({ ...valid(), GATEWAY_SHARED_SECRET: 'sensitive-value', GEMINI_API_KEY: 'sensitive-value' });
  assert.equal(JSON.stringify(config).includes('sensitive-value'), false);
});

test('build mode selects only its file and process variables take priority', () => {
  const directory = mkdtempSync(join(tmpdir(), 'doctorchart-config-'));
  try {
    mkdirSync(join(directory, 'src/environments'), { recursive: true });
    writeFileSync(join(directory, '.env.development'), Object.entries(valid()).map(([k, v]) => `${k}=${v}`).join('\n'));
    assert.equal(generatePublicConfig('development', directory, { PUBLIC_APP_URL: 'http://localhost:4203' }).appUrl, 'http://localhost:4203');
    assert.throws(() => generatePublicConfig('production', directory, {}), /PUBLIC_SUPABASE_URL/);
    assert.ok(readFileSync(join(directory, 'src/environments/environment.generated.ts'), 'utf8').includes('publicConfig'));
  } finally {
    const target = resolve(directory);
    assert.equal(dirname(target), resolve(tmpdir()));
    assert.ok(basename(target).startsWith('doctorchart-config-'));
    rmSync(target, { recursive: true, force: true });
  }
});
