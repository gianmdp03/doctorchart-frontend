import { baseEnvironment } from '../environments/environment.base';

export const environment = {
  ...baseEnvironment,
  production: true,
  appUrl: 'https://demochart.invalid',
  apiUrl: 'https://demochart.invalid/api/doctorchart',
  aiGatewayUrl: 'https://demochart.invalid',
  supabase: {
    url: 'https://demochart.invalid',
    publishableKey: 'demochart-local-only',
  },
  bycodePlansUrl: 'https://demochart.invalid',
};
