import { writeFileSync } from 'node:fs';
import { readLocalConfig, environmentSource } from './frontend-config.mjs';
try {
 writeFileSync('src/environments/environment.local.generated.ts', environmentSource(readLocalConfig(), 'doctorchart', false));
 console.log('Configuración pública local preparada.');
} catch (error) { console.error(error.message); process.exitCode = 1; }
