import { baseEnvironment } from './environment.base';

export const environment = {
  ...baseEnvironment,
  production: false,
  apiUrl: 'http://localhost:8000/api/doctorchart',
  aiGatewayUrl: 'http://localhost:8000/api/ai/doctorchart/chat',
};

