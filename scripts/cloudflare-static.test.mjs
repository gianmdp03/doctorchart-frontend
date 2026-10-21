import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8');
const rules = read('public/_redirects').trim().split(/\r?\n/).map(line => line.split(/\s+/));
const site = JSON.parse(read('src/app/core/config/site.config.json'));
const name = JSON.parse(read('package.json')).name;
test('Workers publishes only the Angular browser output with real 404s', () => {
 const config = JSON.parse(read('wrangler.json'));
 assert.equal(config.name, name);
 assert.equal(config.assets.directory, './dist/' + name + '/browser');
 assert.equal(config.assets.not_found_handling, '404-page');
 assert.equal(config.assets.run_worker_first, false);
 assert.equal(config.main, undefined);
 assert.match(read('public/404.html'), /noindex/);
});
test('every Angular application route has an explicit rewrite or canonical redirect', () => {
 const routes = [...read('src/app/app.routes.ts').matchAll(/path:\s*['"]([^'"]*)['"]/g)].map(match => '/' + match[1]);
 for (const route of routes.filter(route => route !== '/' && route !== '/**')) {
  assert.deepEqual(rules.find(rule => rule[0] === route), site.redirects[route] ? [route, site.redirects[route], '301'] : [route, '/index.csr', '200'], route);
 }
 for (const route of site.publicPaths) assert.equal(rules.find(rule => rule[0] === route), undefined);
 assert.equal(rules.some(rule => rule[0] === '/*'), false);
 assert.match(read('public/_headers'), /\/index\.csr\s+X-Robots-Tag: noindex, follow/);
});
