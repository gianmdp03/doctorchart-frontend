import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateProduction } from './production-config.mjs';
const fixture = { publicSiteUrl: 'https://example.com', apiGatewayOrigin: 'https://api.example.com', applicationUrls: { pointly: 'https://pointly.example.com' } };
test('requires a real gateway before deployment', () => assert.throws(() => validateProduction({ ...fixture, apiGatewayOrigin: '' }), /apiGatewayOrigin/));
test('rejects local, temporary and credential-bearing origins', () => { for (const apiGatewayOrigin of ['http://localhost:8000','https://localhost','https://123.trycloudflare.com','https://user:pass@example.com','https://api.example.com/api']) assert.throws(() => validateProduction({ ...fixture, apiGatewayOrigin })); });
test('accepts a complete public configuration', () => assert.equal(validateProduction(fixture), fixture));
