import { writeFileSync, unlinkSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import site from '../src/app/core/config/site.config.json' with { type: 'json' };
import { validateProduction } from './production-config.mjs';
try { validateProduction(site); } catch (error) { console.error(error.message); process.exit(1); }
const source = "import { baseEnvironment } from './environment.base';\nimport site from '../app/core/config/site.config.json';\nconst api = site.apiGatewayOrigin.replace(/\\/$/, '');\nexport const environment = { ...baseEnvironment, production: true, appUrl: site.publicSiteUrl, apiUrl: api + '/api/doctorchart', aiGatewayUrl: api + '/api/ai/doctorchart/chat', bycodePlansUrl: site.applicationUrls.bycode + '/panel' };\n";
writeFileSync('src/environments/environment.deploy.ts', source);
try {
  const build = spawnSync(process.execPath, ['node_modules/@angular/cli/bin/ng.js', 'build', '--configuration', 'production,deployment'], { stdio: 'inherit', windowsHide: true });
  if (build.status !== 0) process.exitCode = build.status || 1;
  else { const post = spawnSync(process.execPath, ['scripts/generate-seo.mjs'], { stdio: 'inherit', windowsHide: true }); process.exitCode = post.status ?? 1; if (!process.exitCode) { const hosting=spawnSync(process.execPath, ['scripts/generate-hosting.mjs'], { stdio: 'inherit', windowsHide: true }); process.exitCode=hosting.status ?? 1; } }
} finally { unlinkSync('src/environments/environment.deploy.ts'); }
