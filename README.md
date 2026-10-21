# DoctorChart frontend

Frontend Angular con configuración clínica por especialidad. Node 24 verificado.
El backend definitivo es DoctorChart Go. La integración local está lista para
validar en staging; consultar [la guía Angular + Go](docs/angular-go-staging.md)
y [el informe de evidencias](../doctorchart-backend-go/integration/REPORT.md).
El [cierre de 13d](docs/startup-block-13d.md) conserva el contexto histórico.

## Configuración y arranque

Editar `src/environments/environment.base.ts`: contiene las URLs locales y configuración pública para desarrollo y tests; el despliegue utiliza site.config.json. `environment.development.ts` y `environment.ts` lo importan y sólo cambian `production`.

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
npm run test:seo
npm run test:static
npm run test:config
```

Para revisar localmente usar `npm run build` y `npm run preview`. Para un despliegue futuro usar `npm run build:deploy` después de completar la configuración pública; ver [la guía estática](docs/frontend-estatico.md). No se publica nada desde estos comandos.

## Convenciones y documentación

Usar el componente compartido `app-date-picker` en todos los selectores de fecha.
Entrada y presentación: `dd/MM/aaaa`; conversión ISO solo en la frontera de datos.
Los datos clínicos persistidos pertenecen al backend. El navegador conserva las
preferencias y referencias descritas en [13c](docs/browser-storage-block-13c.md).

Consultar [el plan y estado de los bloques](docs/refactor-plan.md),
[seguridad y configuración](docs/security-configuration-block-13a.md) y
[almacenamiento privado de estudios](docs/study-storage-block-13b.md).

## SEO y salida estática

Las páginas comerciales se prerenderizan; las rutas funcionales se renderizan en cliente. No hay runtime SSR en producción. Ver [la guía de configuración, comandos y pendientes](docs/frontend-estatico.md). El dominio de DoctorChart es provisional y la URL pública del backend todavía está pendiente.

## UTC y zonas horarias

Los instantes se muestran en la zona del dispositivo; el backend asigna la fecha de creación y los documentos conservan su zona de emisión. Ver [implementación, pruebas y requisitos del backend](docs/zonas-horarias.md).

## Docker local y VPS

Ver [configuración de entornos y autenticación](docs/conexion-entornos.md). `npm start` usa la configuración pública local y `npm run build` requiere la configuración pública definitiva de producción.
