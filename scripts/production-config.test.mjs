import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateProduction } from './production-config.mjs';
const fixture = { publicSiteUrl: 'https://example.com', apiGatewayOrigin: 'https://api.example.com', applicationUrls: { bycode: 'https://example.com', pointly: 'https://pointly.example.com', doctorchart: 'https://doctorchart.example.com' }, supabase: { url: 'https://api.example.com', publishableKey: 'sb_publishable_fixture_only' } };
test('requires a real gateway before deployment', () => assert.throws(() => validateProduction({ ...fixture, apiGatewayOrigin: '' }), /apiGatewayOrigin/));
test('rejects local, temporary and credential-bearing origins', () => { for (const apiGatewayOrigin of ['http://localhost:8000','https://localhost','https://123.trycloudflare.com','https://user:pass@example.com','https://api.example.com/api']) assert.throws(() => validateProduction({ ...fixture, apiGatewayOrigin })); });
test('accepts a complete public configuration', () => assert.equal(validateProduction(fixture), fixture));

import { environmentValues, validatePublicKey, readProductionConfig } from './frontend-config.mjs';
const local = { ...fixture, publicSiteUrl: 'http://localhost:4200', apiGatewayOrigin: 'https://bycode.local:7999',
 applicationUrls: { bycode: 'http://localhost:4200', pointly: 'http://localhost:4201', doctorchart: 'http://localhost:4202' },
 supabase: { url: 'https://bycode.local:7999', publishableKey: 'sb_publishable_fixture_only' } };
test('local and production generate the same endpoint shapes without mixing environments', () => {
 for(const app of ['bycode','pointly','doctorchart']) {
   const dev=environmentValues(local,app,false), prod=environmentValues(fixture,app,true);
   assert.equal(dev.production,false); assert.equal(prod.production,true);
   assert.equal(dev.apiUrl.replace(local.apiGatewayOrigin,''),prod.apiUrl.replace(fixture.apiGatewayOrigin,''));
   assert.equal(app==='pointly'?prod.supabaseUrl:prod.supabase.url,fixture.supabase.url);
   assert.throws(()=>environmentValues(local,app,true));
 }
});
test('requires a public auth origin and rejects a duplicated auth path',()=>{
 for(const url of ['', 'https://bycode.local:7999','https://api.example.com/auth/v1','https://user:pass@api.example.com']) {
   assert.throws(()=>validateProduction({...fixture,supabase:{...fixture.supabase,url}}));
 }
});
test('rejects administrative, expired and user credentials without echoing them',()=>{
 const jwt=payload=>Buffer.from('{}').toString('base64url')+'.'+Buffer.from(JSON.stringify(payload)).toString('base64url')+'.signature';
 for(const key of ['sb_secret_fixture', '',jwt({role:'service_role',exp:4102444800}),jwt({role:'authenticated',exp:4102444800}),jwt({role:'anon',exp:1})]) {
   assert.throws(()=>validatePublicKey(key),error=>!key||!error.message.includes(key));
 }
 assert.doesNotThrow(()=>validatePublicKey(jwt({role:'anon',exp:4102444800})));
});
test('production auth uses only explicit PUBLIC variables and never server secrets',()=>{
 const result=readProductionConfig(fixture,{SUPABASE_URL:'https://private.invalid',SUPABASE_KEY:'sb_secret_private',
 PUBLIC_SUPABASE_URL:'https://auth.example.com',PUBLIC_SUPABASE_PUBLISHABLE_KEY:'sb_publishable_public'});
 assert.equal(result.supabase.url,'https://auth.example.com');
 assert.equal(result.supabase.publishableKey,'sb_publishable_public');
});
