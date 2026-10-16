import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import site from '../src/app/core/config/site.config.json' with { type: 'json' };
const PUBLIC_SITE_URL = site.publicSiteUrl;
const PUBLIC_SEO_PATHS = site.publicPaths;

const origin = new URL(PUBLIC_SITE_URL);
if (origin.protocol !== 'https:' || origin.pathname !== '/' || origin.search || origin.hash || origin.username || origin.password) {
  throw new Error('PUBLIC_SITE_URL must be a public HTTPS origin.');
}
const output = resolve('dist/doctorchart-frontend/browser');
const escapeXml = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const locations = PUBLIC_SEO_PATHS.map(path => '<url><loc>' + escapeXml(new URL(path, origin).href) + '</loc></url>').join('');
writeFileSync(resolve(output, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + locations + '</urlset>\n');
writeFileSync(resolve(output, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: ' + new URL('/sitemap.xml', origin).href + '\n');
console.log('Generated sitemap and robots for ' + origin.origin);
