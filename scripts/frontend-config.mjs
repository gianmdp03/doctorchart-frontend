import { isIP } from 'node:net';
import { readFileSync } from 'node:fs';

function origin(name, value, production) {
  let url;
  try { url = new URL(value); } catch { throw new Error(`${name}: falta una URL de origen.`); }
  const publicHost = isIP(url.hostname) === 0 && url.hostname.includes('.') &&
    !/^(localhost|127\.|0\.|\[?::1\]?$)/i.test(url.hostname) &&
    !/\.(local|invalid|test)$|trycloudflare\.com$/i.test(url.hostname);
  if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash || url.username || url.password ||
      (production && (url.protocol !== 'https:' || !publicHost))) {
    throw new Error(`${name}: se requiere un origen ${production ? 'HTTPS público definitivo' : 'HTTP(S) sin rutas ni credenciales'}.`);
  }
}

export function validatePublicKey(key) {
  if (typeof key !== 'string' || !key || key.trim() !== key) throw new Error('supabase.publishableKey: falta la clave pública.');
  if (/^sb_publishable_[A-Za-z0-9_-]+$/.test(key)) return;
  try {
    const parts = key.split('.');
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
    if (parts.length === 3 && parts.every(part => /^[A-Za-z0-9_-]+$/.test(part)) &&
        payload.role === 'anon' && Number.isFinite(payload.exp) && payload.exp * 1000 > Date.now()) return;
  } catch { /* Never include key values in errors. */ }
  throw new Error('supabase.publishableKey: usar una clave publishable o JWT anon vigente; nunca service_role, secret ni tokens de usuario.');
}

export function validatePublicConfig(site, production = false) {
  for (const [name, value] of Object.entries({ publicSiteUrl: site.publicSiteUrl, apiGatewayOrigin: site.apiGatewayOrigin, ...site.applicationUrls })) {
    origin(name, value, production);
  }
  for (const app of ['bycode', 'pointly', 'doctorchart']) origin(`applicationUrls.${app}`, site.applicationUrls?.[app], production);
  origin('supabase.url', site.supabase?.url, production);
  validatePublicKey(site.supabase?.publishableKey);
  return site;
}

export function readLocalConfig() {
  try { return validatePublicConfig(JSON.parse(readFileSync('config/local.public.json', 'utf8'))); }
  catch (error) {
    if (error instanceof SyntaxError) throw new Error('config/local.public.json: JSON inválido; no se muestra su contenido.');
    if (error.code === 'ENOENT') throw new Error('Falta config/local.public.json. Seguí docs/conexion-entornos.md; contiene sólo configuración pública.');
    throw error;
  }
}

export function readProductionConfig(site, env = process.env) {
  return { ...site, supabase: {
    url: env.PUBLIC_SUPABASE_URL || site.supabase?.url,
    publishableKey: env.PUBLIC_SUPABASE_PUBLISHABLE_KEY || site.supabase?.publishableKey,
  } };
}

export function environmentValues(site, app, production) {
  validatePublicConfig(site, production);
  const api = site.apiGatewayOrigin.replace(/\/$/, '');
  const shared = { production, appUrl: site.publicSiteUrl };
  if (app === 'pointly') return { ...shared, apiUrl: api + '/api/pointly', bycodeUrl: site.applicationUrls.bycode,
    supabaseUrl: site.supabase.url, supabaseKey: site.supabase.publishableKey };
  const supabase = { url: site.supabase.url, publishableKey: site.supabase.publishableKey };
  if (app === 'doctorchart') return { ...shared, supabase, apiUrl: api + '/api/doctorchart',
    aiGatewayUrl: api + '/api/ai/doctorchart/chat', bycodePlansUrl: site.applicationUrls.bycode + '/dashboard' };
  if (app === 'bycode') return { ...shared, supabase, apiUrl: api + '/api', aiGatewayUrl: api + '/api/ai/chat',
    applicationUrls: { pointly: site.applicationUrls.pointly, doctorchart: site.applicationUrls.doctorchart } };
  throw new Error('Aplicación no reconocida.');
}

export function environmentSource(site, app, production) {
  const values = environmentValues(site, app, production);
  return "import { baseEnvironment } from './environment.base';\nexport const environment = { ...baseEnvironment, ..." + JSON.stringify(values, null, 2) + " };\n";
}
