import { writeFileSync, readdirSync, readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { gzipSync, brotliCompressSync } from 'node:zlib';
import site from '../src/app/core/config/site.config.json' with { type: 'json' };
const config = [
  '# Reference static hosting configuration. TLS is configured by the deployment owner.',
  'server {', '  listen 80;', '  server_name ' + new URL(site.publicSiteUrl).hostname + ' localhost;',
  '  root /usr/share/nginx/html;', '  include /etc/nginx/mime.types;', '  charset utf-8;',
  '  add_header X-Content-Type-Options nosniff always;', '  add_header Referrer-Policy strict-origin-when-cross-origin always;',
  '  add_header Cache-Control no-cache always;', '  gzip on;', '  gzip_static on;', '  gzip_vary on;',
  '  gzip_types text/css application/javascript application/json image/svg+xml application/xml text/plain;',
  '  error_page 404 /404.html;',
  '  location = /404.html { add_header X-Robots-Tag "noindex, follow" always; }',
  ...site.publicPaths.map(path => '  location = ' + path + ' { try_files ' + (path === '/' ? '/index.html' : path + '/index.html') + ' =404; }'),
  ...Object.entries(site.redirects).map(([from,to]) => '  location = ' + from + ' { return 301 ' + to + '$is_args$args; }'),
  '  location ~ (?:' + site.clientPatterns.join('|') + ') {',
  '    add_header Cache-Control no-cache always;', '    add_header X-Content-Type-Options nosniff always;',
  '    add_header X-Robots-Tag "noindex, follow" always;', '    try_files /index.csr.html =404;', '  }',
  '  location ~ "[-.][A-Za-z0-9_-]{8,}\\.(js|css)$" { add_header Cache-Control "public, max-age=31536000, immutable" always; add_header X-Content-Type-Options nosniff always; try_files $uri =404; }',
  '  location ~ ^(.+)/$ { return 301 $1$is_args$args; }', '  location / { try_files $uri =404; }', '}', '',
].join('\n');
writeFileSync('hosting/nginx.conf', config);
const root = resolve('dist/doctorchart-frontend/browser');
function compress(directory) { for (const entry of readdirSync(directory, { withFileTypes: true })) { const file=resolve(directory,entry.name); if (entry.isDirectory()) compress(file); else if (['.html','.js','.css','.svg','.json','.xml','.txt'].includes(extname(file))) { const bytes=readFileSync(file); writeFileSync(file+'.gz',gzipSync(bytes,{level:9})); writeFileSync(file+'.br',brotliCompressSync(bytes)); } } }
compress(root);
console.log('Generated Nginx reference and compressed static assets.');
