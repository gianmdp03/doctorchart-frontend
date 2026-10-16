import http from 'node:http';
import { readFileSync, existsSync, statSync, realpathSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { brotliCompressSync, gzipSync } from 'node:zlib';

const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };

export function createPreview({ directory, clientPatterns = [], redirects = {}, publicPaths = ['/'], shell = 'index.csr.html' }) {
  const root = realpathSync(directory);
  const patterns = clientPatterns.map(pattern => new RegExp(pattern));
  return http.createServer((req, res) => {
    let pathname;
    try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
    catch { res.writeHead(400); res.end(); return; }
    const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
    if (pathname !== normalized) { res.writeHead(301, { Location: normalized + new URL(req.url, 'http://localhost').search }); res.end(); return; }
    if (redirects[normalized]) { res.writeHead(301, { Location: redirects[normalized] + new URL(req.url, 'http://localhost').search }); res.end(); return; }
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    let status = 200;
    if (publicPaths.includes(normalized)) file = resolve(root, '.' + normalized, 'index.html');
    else if (patterns.some(pattern => pattern.test(normalized))) file = resolve(root, shell);
    else if (!extname(file) || !existsSync(file) || statSync(file).isDirectory()) {
      file = resolve(root, '404.html'); status = 404;
    }
    if (!existsSync(file)) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found'); return; }
    const actual = realpathSync(file);
    if (!actual.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    let body = readFileSync(actual);
    const mime = types[extname(file)] ?? 'application/octet-stream';
    res.setHeader('Content-Type', mime);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Cache-Control', /[-.][A-Za-z0-9_-]{8,}\.(js|css)$/.test(file) ? 'public, max-age=31536000, immutable' : 'no-cache');
    res.setHeader('Vary', 'Accept-Encoding');
    if (extname(file) === '.html' && !publicPaths.includes(normalized)) res.setHeader('X-Robots-Tag', 'noindex, follow');
    const accept = req.headers['accept-encoding'] ?? '';
    if (/^(text\/|application\/(json|xml))/.test(mime) || mime === 'image/svg+xml') {
      if (accept.includes('br')) { body = brotliCompressSync(body); res.setHeader('Content-Encoding', 'br'); }
      else if (accept.includes('gzip')) { body = gzipSync(body); res.setHeader('Content-Encoding', 'gzip'); }
    }
    res.setHeader('Content-Length', body.length);
    res.writeHead(status);
    res.end(req.method === 'HEAD' ? undefined : body);
  });
}
