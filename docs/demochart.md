# DemoChart — Entorno de demostración local (sin backend)

DemoChart es la variante interactiva, 100% estática y sin backend de DoctorChart. Permite que cualquier usuario pruebe la experiencia real de la historia clínica de DoctorChart directamente en su navegador usando IndexedDB.

## Comandos locales

- Servidor de desarrollo (puerto `4204`):
  ```bash
  npm run demo
  # o
  npm run start:demo
  ```
- Compilación estática de producción para DemoChart (`dist/demochart/`):
  ```bash
  npm run build:demo
  ```
- Despliegue en Cloudflare Workers (usando [wrangler.demochart.json](../wrangler.demochart.json)):
  - **Build command:** `npm run build:demo`
  - **Deploy command:** `npx wrangler deploy --config wrangler.demochart.json`
  - **Variable de entorno:** `NODE_VERSION=24`
- Producción normal de DoctorChart (sin cambios):
  ```bash
  npm run build
  ```

## Aislamiento respecto de DoctorChart

- Todo el código de DemoChart vive fuera de `src/app/` (en `src/demo/`, `src/main.demo.ts`, `src/index.demo.html`, `tsconfig.demo.json` y `hosting/demochart/`).
- `tsconfig.app.json` excluye `src/main.demo.ts` y `src/demo/**/*.ts`, por lo que `npm run build` y `ng serve` mantienen intacta la aplicación de producción.
- `src/index.demo.html` y `hosting/demochart/_headers` aplican una CSP estricta con `connect-src 'none'`, `frame-src blob:`, `object-src blob:`, `X-Robots-Tag: noindex, nofollow` y `frame-ancestors 'none'`.

## Persistencia y ciclo de vida de sesión

- Los datos se almacenan exclusivamente en el navegador mediante IndexedDB (base `demochart`, store `session`, clave `current`).
- Cada sesión expira automáticamente a las **24 horas** de su creación.
- El usuario puede exportar la sesión a un archivo JSON (`demochart-sesion.json`, `format: 'demochart'`, `version: 1`, tamaño máximo 12 MB) e importarlo luego para continuar exactamente donde dejó.

## Generador de pacientes y especialidades

- En la pantalla inicial (y desde `/patients/new`, `/patients/:id/edit`, `/records/:id/edit`), el usuario elige una especialidad (Pediatría seleccionada por defecto entre las 19 especialidades configuradas) y opcionalmente abre el asistente de personalización (`/onboarding/setup`).
- No se permite crear ni editar pacientes manualmente: el generador crea una cohorte realista de pacientes hombres y mujeres de distintas edades, con consultas en múltiples fechas (incluyendo hoy y el mes actual), signos vitales, fórmulas clínicas, curvas de crecimiento OMS 2006/2007 y Myrelid 2002, calendario de vacunación 2026, recetas y estudios médicos.
- Los PDFs generados localmente para recetas y estudios incluyen la marca visible `DEMOCHART — DOCUMENTO DE DEMOSTRACIÓN — Sin validez clínica ni legal`.

## Historia clínica vs. Turnos y Teleconsulta

- **Historia clínica (100% interactiva):** crear, editar y anular consultas, fórmulas, curvas de crecimiento, esquema de vacunación, recetas, estudios, perfil clínico y personalización del asistente.
- **Turnos y Teleconsulta (solo visual):** `/calendar`, `/clinics`, `/schedules`, `/booking-publication` y `/secretaries` muestran datos demostrativos de agenda, consultorios y teleconsultas. Cualquier operación de escritura devuelve HTTP `400` con el mensaje de modo demostración.
