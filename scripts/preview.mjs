import { createPreview } from './preview-server.mjs';
import site from '../src/app/core/config/site.config.json' with { type: 'json' };
import { resolve } from 'node:path';
const port = Number(process.env.PORT || 4300);
const server = createPreview({ directory: resolve('dist/doctorchart-frontend/browser'), ...site });
server.listen(port, '127.0.0.1', () => console.log('Static preview: http://127.0.0.1:' + port));
