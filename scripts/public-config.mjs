import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));

// Only these public values can enter the browser bundle. No process.env spread.
export function parsePublicConfig(env) {
  const required = (name) => {
    const value = env[name]?.trim();
    if (!value) throw new Error(`${name} es obligatorio.`);
    return value;
  };
  const url = (name, { fragment = false } = {}) => {
    const value = required(name);
    let parsed;
    try { parsed = new URL(value); } catch { throw new Error(`${name} debe ser una URL HTTP(S).`); }
    if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password
        || parsed.search || (!fragment && parsed.hash)) {
      throw new Error(`${name} debe ser una URL HTTP(S) sin credenciales ni parámetros.`);
    }
    if (parsed.protocol !== 'https:' && !['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname)) {
      throw new Error(`${name} requiere HTTPS fuera del equipo local.`);
    }
    return value.replace(/\/$/, '');
  };
  const supabaseUrl = url('PUBLIC_SUPABASE_URL');
  if (!supabaseUrl.startsWith('https://')) throw new Error('PUBLIC_SUPABASE_URL requiere HTTPS.');
  const publishableKey = required('PUBLIC_SUPABASE_PUBLISHABLE_KEY');
  if (!publishableKey.startsWith('sb_publishable_')) {
    throw new Error('PUBLIC_SUPABASE_PUBLISHABLE_KEY debe ser una clave publicable de Supabase. Nunca uses una clave secreta.');
  }
  const apiUrl = url('PUBLIC_API_URL');
  const aiGatewayUrl = url('PUBLIC_AI_GATEWAY_URL');
  const api = new URL(apiUrl);
  const ai = new URL(aiGatewayUrl);
  if (api.origin !== ai.origin || api.pathname !== '/api/doctorchart' || ai.pathname !== '/api/ai/doctorchart/chat') {
    throw new Error('PUBLIC_API_URL y PUBLIC_AI_GATEWAY_URL deben usar las rutas de DoctorChart en el mismo API gateway.');
  }
  return {
    appUrl: url('PUBLIC_APP_URL'),
    apiUrl,
    aiGatewayUrl,
    bycodePlansUrl: url('PUBLIC_BYCODE_PLANS_URL', { fragment: true }),
    supabase: { url: supabaseUrl, publishableKey },
  };
}

export function generatePublicConfig(mode, directory = root, environment = process.env) {
  if (!['development', 'production', 'test'].includes(mode)) throw new Error('Modo de configuración inválido.');
  const file = resolve(directory, `.env.${mode}`);
  const local = existsSync(file) ? parseEnv(readFileSync(file, 'utf8')) : {};
  const config = parsePublicConfig({ ...local, ...environment });
  const output = resolve(directory, 'src/environments/environment.generated.ts');
  mkdirSync(resolve(directory, 'src/environments'), { recursive: true });
  writeFileSync(output, `// Generated public configuration. Do not edit or commit.\nexport const publicConfig = ${JSON.stringify(config, null, 2)} as const;\n`);
  return config;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    generatePublicConfig(process.argv[2] || 'development');
    console.log('Configuración pública validada.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
