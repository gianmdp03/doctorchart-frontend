import { writeFileSync, unlinkSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import site from '../src/app/core/config/site.config.json' with { type: 'json' };
import { validateProduction } from './production-config.mjs';
import { readProductionConfig, environmentSource } from './frontend-config.mjs';
const config = readProductionConfig(site);
try { validateProduction(config); } catch (error) { console.error(error.message); process.exit(1); }
const source = environmentSource(config, 'doctorchart', true);
writeFileSync('src/environments/environment.deploy.ts', source);
try {
  const build = spawnSync(process.execPath, ['node_modules/@angular/cli/bin/ng.js', 'build', '--configuration', 'production,deployment'], { stdio: 'inherit', windowsHide: true });
  if (build.status !== 0) process.exitCode = build.status || 1;
  else {
    for (const script of ['generate-seo.mjs', 'verify-seo.mjs', 'generate-hosting.mjs']) {
      const result = spawnSync(process.execPath, ['scripts/' + script], { stdio: 'inherit', windowsHide: true });
      process.exitCode = result.status ?? 1;
      if (process.exitCode) break;
    }
  }
} finally { unlinkSync('src/environments/environment.deploy.ts'); }
