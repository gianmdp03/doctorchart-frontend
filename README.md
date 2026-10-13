# DoctorChart frontend

Frontend Angular con configuración clínica por especialidad. Node 24 verificado.
El backend definitivo es DoctorChart Go. La integración local está lista para
validar en staging; consultar [la guía Angular + Go](docs/angular-go-staging.md)
y [el informe de evidencias](../doctorchart-backend-go/integration/REPORT.md).
El [cierre de 13d](docs/startup-block-13d.md) conserva el contexto histórico.

## Configuración y arranque

Editar `src/environments/environment.base.ts`: es la única fuente de URLs y configuración pública para desarrollo, producción y tests. `environment.development.ts` y `environment.ts` lo importan y sólo cambian `production`.

Configurar `appUrl`, `apiUrl` (Gateway con `/api/doctorchart`), `aiGatewayUrl` (mismo Gateway con `/api/ai/doctorchart/chat`), `bycodePlansUrl` y el proyecto/clave publicable de Supabase. Para acceso desde otra computadora, usar la URL pública vigente del Gateway. Los valores `localhost` apuntan al equipo del navegador.

No incluir claves de servicio Supabase, claves Gemini, credenciales de base ni secretos internos en frontend.

Desde la raíz:

```powershell
npm ci
ng serve
```

También se puede usar `npm start`. Ambos arrancan en el puerto 4202 usando directamente el archivo base, sin generación previa. Los `.env.*` locales del frontend ya no se leen.

Antes deben estar disponibles Billing, DoctorChart Go y el Gateway; ver [la preparación del backend Go](../doctorchart-backend-go/README.md). El acceso usa cuentas reales de Supabase con roles y suscripciones administrados en servidor.

## Pruebas y build

```powershell
npm test -- --watch=false
npm run build
npm run test:ssr
```

Antes del build de producción, ajustar el archivo base con las URLs del despliegue. El bundle queda en `dist/doctorchart-frontend`; cambiar el archivo después del build requiere recompilar. El servidor SSR se ejecuta con `npm run serve:ssr:doctorchart-frontend` y acepta exclusivamente el hostname de `baseEnvironment.appUrl`.

El smoke SSR levanta el artefacto en un puerto temporal, verifica rutas públicas y protegidas sin datos clínicos en HTML, rechaza un Host ajeno y detiene el proceso. Detrás de un proxy, conservar el Host público configurado.

## Convenciones y documentación

Usar el componente compartido `app-date-picker` en todos los selectores de fecha.
Entrada y presentación: `dd/MM/aaaa`; conversión ISO solo en la frontera de datos.
Los datos clínicos persistidos pertenecen al backend. El navegador conserva las
preferencias y referencias descritas en [13c](docs/browser-storage-block-13c.md).

Consultar [el plan y estado de los bloques](docs/refactor-plan.md),
[seguridad y configuración](docs/security-configuration-block-13a.md) y
[almacenamiento privado de estudios](docs/study-storage-block-13b.md).
