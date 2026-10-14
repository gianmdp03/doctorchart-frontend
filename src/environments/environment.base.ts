// Configuración pública compartida. Editar aquí las URLs y la clave publicable.
export const baseEnvironment = {
  "appUrl": "http://localhost:4202",
  "apiUrl": "https://legacy-burlington-dairy-combining.trycloudflare.com/api/doctorchart",
  "aiGatewayUrl": "https://legacy-burlington-dairy-combining.trycloudflare.com/api/ai/doctorchart/chat",
  "bycodePlansUrl": "http://localhost:4200/company-panel",
  "supabase": {
    "url": "https://jpwwsfkwwsxtmwjvzyva.supabase.co",
    "publishableKey": "sb_publishable_ze73ouvlA0aRFAggWg6YPw_6TfLjpA5"
  }
} as const;
