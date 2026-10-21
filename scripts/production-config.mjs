import { validatePublicConfig } from './frontend-config.mjs';
export const validateProduction = site => validatePublicConfig(site, true);
