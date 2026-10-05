# Fase 4: wizard del frontend conectado al backend

## Resultado

El catálogo proviene de GET /specialties. La única opción se preselecciona por cantidad, sin reconocer su nombre o código; seleccionar confirma su ID con expectedVersion explícitamente null cuando todavía no existe workspace. El médico no crea especialidades desde esta pantalla. Pediatría sigue siendo el único recurso inicial del seeder del backend.

La configuración usa las definiciones patientForm y encounterForm recibidas del backend. Cada categoría habilitada de paciente determina un paso por su clave; Historia Clínica contiene las categorías de consulta de cualquier especialidad. El organizador permite acceder también a categorías deshabilitadas. Se pueden crear, renombrar, ordenar, desactivar y quitar categorías y campos. Etiquetas y orden conservan claves; cambiar tipo o binding reemplaza el campo por una clave nueva.

El editor utiliza bindings explícitos, opciones, límites numéricos, condiciones y entradas de fórmulas del contrato v1. No infiere especialidades a partir de nombres ni categorías reservadas. La configuración aplicada debe conservar nombre y nacimiento obligatorios, incondicionales y habilitados, como exige el backend. Las definiciones enviadas siguen sujetas a la validación autoritativa del servidor.

Guardar avance y salir conservando borrador no aplican cambios. Finalizar guarda primero el borrador y luego aplica usando la versión devuelta. Descartar y restaurar requieren acciones explícitas: restaurar copia la publicación al borrador y conserva la definición efectiva hasta aplicar. Los conflictos VERSION_CONFLICT conservan la edición local y su versión; consultar el servidor no sustituye esa copia hasta elegirlo expresamente.

Workspace, preferencias y perfil usan sus contratos nuevos. Las preferencias tienen su propia copia del token; actualizar notas o columnas recarga el workspace completo y no atribuye versiones nuevas a contenido viejo. El editor de columnas captura su versión al abrir. Las respuestas tardías de una sesión anterior se descartan y las escrituras concurrentes se rechazan en el store.

El navegador envía únicamente su token Bearer a la API configurada y al endpoint configurado del asistente. No envía secretos del gateway, identidad inventada ni bypass de desarrollo. El servidor requiere el gateway autenticado descrito en el contrato de la fase 3.

## Límite de esta fase

No se vació la base de trabajo ni se ejecutó un seeder contra ella. Tampoco se agregó el panel administrativo del frontend.

Los contratos clínicos de pacientes y consultas y su renderizador siguen pendientes de su fase. Ya no reciben defaults locales ni plantillas fabricadas a partir del wizard nuevo. Por eso las altas de pacientes y consultas quedan temporalmente indisponibles hasta conectar esos consumidores. Las vistas existentes que poseen un snapshot clínico conservan su renderizador anterior; esto no constituye una migración ni un adaptador del wizard.

La verificación Angular usa HTTP simulado y componentes en jsdom. No demuestra una sesión real pasando por el gateway ni un recorrido completo de altas clínicas. La especialidad ficticia del fixture aparece exclusivamente en las pruebas.

## Verificación

Gate final del 05/10/2026: 102 pruebas aprobadas en 17 archivos, sin fallos ni omisiones. Incluye servicios HTTP, store, perfil, capacidades, guards, interceptor, selector, wizard, editor real de campos, preferencias y consumidores afectados. Los tests del wizard aíslan el editor con un componente de prueba; el editor real se verifica por separado. No se ejecutó la suite completa del proyecto.

La compilación de producción pasó para browser y SSR. El compilador conserva una advertencia de presupuesto: bundle inicial de 1,09 MB frente al presupuesto de 1 MB. También pasó el chequeo TypeScript de todas las pruebas (`npm exec tsc -- -p tsconfig.spec.json --noEmit`). El fixture frontend se comparó con el archivo canónico del backend y coincide exactamente. `git diff --check` pasó.

Para repetir la selección de pruebas desde el frontend:

```powershell
npm.cmd test -- --watch=false --include='src/app/core/services/workspace*.spec.ts' --include='src/app/core/services/specialty.service.spec.ts' --include='src/app/core/services/doctor-*.spec.ts' --include='src/app/core/guards/doctor-onboarding.guard.spec.ts' --include='src/app/core/interceptors/auth.interceptor.spec.ts' --include='src/app/features/onboarding/**/*.spec.ts' --include='src/app/features/form-field-editor/*.spec.ts' --include='src/app/features/new-patient-dialog/*.spec.ts' --include='src/app/features/new-encounter-dialog/*.spec.ts' --include='src/app/features/patient-columns-config/*.spec.ts' --include='src/app/features/dashboard/*.spec.ts' --include='src/app/features/patient-list/*.spec.ts' --include='src/app/features/patient-record/patient-banner/*.spec.ts' --include='src/app/app.spec.ts'
npm.cmd run build
```

La ejecución se detiene al terminar esta fase y requiere autorización del usuario antes de la siguiente.
