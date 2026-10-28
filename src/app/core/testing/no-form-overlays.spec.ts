import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { routes } from '../../app.routes';

describe('Forms stay in the routed page', () => {
  it('has no application dialogs, form backdrops or browser confirmation calls', () => {
    const violations: string[] = [];
    const inspect = (directory: string) => {
      for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const file = join(directory, entry.name);
        if (entry.isDirectory()) inspect(file);
        else if (/\.(html|ts)$/.test(file) && !file.endsWith('.spec.ts')) {
          const source = readFileSync(file, 'utf8');
          if (/aria-modal\s*=|role\s*=\s*["'](?:alertdialog|dialog)["']|class\s*=\s*["'][^"']*(?:modal-backdrop|dialog-backdrop)|\b(?:window\.)?(?:confirm|alert|prompt)\s*\(|open-[\w-]*modal/.test(source)) violations.push(file);
        }
      }
    };
    inspect('src/app');
    expect(violations).toEqual([]);
  });

  it('registers guarded pages and serves their URLs on refresh', () => {
    const config = JSON.parse(readFileSync('src/app/core/config/site.config.json', 'utf8'));
    for (const [path, url] of [['encounters/:id', '/encounters/77'], ['profile', '/profile'], ['assistant', '/assistant']]) {
      const route = routes.find(route => route.path === path)!;
      expect(route.loadComponent).toBeDefined(); expect(route.canActivate?.length).toBeGreaterThan(0);
      expect(config.clientPatterns.some((pattern: string) => new RegExp(pattern).test(url))).toBe(true);
    }
  });
});
