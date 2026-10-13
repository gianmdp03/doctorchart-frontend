// Configuración pública compartida. Editar aquí las URLs y la clave publicable.
export const baseEnvironment = {
  "appUrl": "http://localhost:4202",
  "apiUrl": "http://localhost:8000/api/doctorchart",
  "aiGatewayUrl": "http://localhost:8000/api/ai/doctorchart/chat",
  "bycodePlansUrl": "http://localhost:4200/company-panel",
  "supabase": {
    "url": "https://jpwwsfkwwsxtmwjvzyva.supabase.co",
    "publishableKey": "sb_publishable_ze73ouvlA0aRFAggWg6YPw_6TfLjpA5"
  }
} as const;
