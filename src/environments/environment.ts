// Type contract only. Angular replaces this file for development and production.
import { baseEnvironment } from './environment.base';
export const environment = { ...baseEnvironment, ...{
  "production": false,
  "appUrl": "",
  "apiUrl": "",
  "aiGatewayUrl": "",
  "supabase": {
    "url": "",
    "publishableKey": ""
  },
  "bycodePlansUrl": ""
} };
