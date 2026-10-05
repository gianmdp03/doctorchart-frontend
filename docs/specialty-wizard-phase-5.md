# Fase 5: administración de especialidades y defaults

## Resultado

La ruta `/admin/especialidades` permite al Super admin administrar el catálogo y los wizards iniciales sin un workspace, perfil u onboarding médico. La navegación administrativa muestra el panel y cerrar sesión; no requiere asignarle una especialidad al administrador. El rol administrativo de la interfaz se obtiene exclusivamente de `app_metadata`, gestionado por el servidor. `user_metadata` no concede ese permiso. El backend mantiene su propia autorización sobre cada operación.

El panel muestra todas las especialidades, incluidas las inactivas y los borradores. Permite crear una especialidad con nombre, código único y descripción, configurar categorías y campos de paciente e Historia Clínica con el editor compartido, y elegir las capacidades del contrato. El código se sugiere a partir del nombre y se puede modificar antes de crear; después conserva su identidad.

Crear deja la especialidad inactiva con un wizard en borrador. Guardar el wizard no modifica su publicación vigente. Publicar guarda primero las modificaciones visibles y utiliza la versión devuelta para publicar; el backend comprueba el núcleo obligatorio y activa la especialidad. El médico recibe esa publicación al seleccionar una especialidad o restaurar sus defaults. Publicar no sustituye sus copias personales.

Los metadatos y disponibilidad usan `Specialty.version`; el borrador y la publicación usan `WizardDefault.version`. `publishedVersion` identifica el contenido publicado y no se envía como token de escritura. Los errores de versión conservan los cambios y tokens locales hasta consultar y adoptar expresamente la copia del servidor. Cambiar de especialidad o empezar otra creación advierte cuando se descartarían cambios locales.

Activar o desactivar usa PATCH. El servidor rechaza activar un wizard sin publicación y desactivar la última especialidad seleccionable. No hay eliminación de especialidades en este contrato. Los errores se muestran en pantalla sin simular un catálogo vacío o reintentar escrituras con versiones inventadas.

## Verificación y límites

Gate final del 05/10/2026: 177 pruebas distintas aprobadas en 24 archivos, sin fallos ni omisiones. La selección de regresiones y contratos aprobó 161 pruebas en 23 archivos; el panel real aprobó sus 16 pruebas adicionales. El contrato administrativo se volvió a verificar junto al panel, sin contarlo dos veces. No se ejecutó la suite completa del proyecto.

La cobertura incluye payloads de las seis rutas administrativas, versiones independientes, creación y recuperación sin repetir POST, publicación, cambios concurrentes de otro administrador, errores de disponibilidad, validación por campos, cambios de identidad y respuestas tardías. El panel y las cuatro pruebas de contrato usan el editor real compartido. También se verificaron la entrada de App, sidebar/header, permisos de rol y las regresiones del wizard médico.

La compilación de producción para navegador y SSR pasó, al igual que el chequeo TypeScript de todas las pruebas (`npm exec tsc -- -p tsconfig.spec.json --noEmit`). La compilación mantiene la advertencia del presupuesto inicial: 1,09 MB frente a 1 MB. No se cambiaron dependencias ni se amplió ese presupuesto para ocultar la advertencia. `git diff --check` pasó.

Para reproducir la selección completa desde el frontend:

```powershell
npm.cmd test -- --watch=false --include='src/app/core/services/workspace*.spec.ts' --include='src/app/core/services/admin-specialty.service.spec.ts' --include='src/app/core/services/auth.service.spec.ts' --include='src/app/core/services/specialty.service.spec.ts' --include='src/app/core/services/doctor-*.spec.ts' --include='src/app/core/guards/super-admin.guard.spec.ts' --include='src/app/core/guards/doctor-onboarding.guard.spec.ts' --include='src/app/core/interceptors/auth.interceptor.spec.ts' --include='src/app/features/onboarding/**/*.spec.ts' --include='src/app/features/form-field-editor/*.spec.ts' --include='src/app/features/admin-specialties/*.spec.ts' --include='src/app/features/new-patient-dialog/*.spec.ts' --include='src/app/features/new-encounter-dialog/*.spec.ts' --include='src/app/features/patient-columns-config/*.spec.ts' --include='src/app/features/dashboard/*.spec.ts' --include='src/app/features/patient-list/*.spec.ts' --include='src/app/features/patient-record/patient-banner/*.spec.ts' --include='src/app/layout/header/header.component.spec.ts' --include='src/app/layout/sidebar/sidebar.component.spec.ts' --include='src/app/app.spec.ts'
npm.cmd exec tsc -- -p tsconfig.spec.json --noEmit
npm.cmd run build
```

Las pruebas utilizan HTTP simulado, componentes y jsdom. No se ejecuta una sesión real contra el gateway ni se demuestra aquí el circuito clínico completo. El navegador sigue enviando solo su Bearer a los endpoints configurados; el secreto del gateway permanece en el servidor.

No se modificó ni vació la base de trabajo en esta fase. Pediatría sigue siendo el único recurso del seeder; ninguna especialidad adicional se agregó como contenido de producción. Los contratos de altas y edición de pacientes y consultas y su renderizador continúan pendientes de su fase, como se detalla en el informe de fase 4. No se agregaron adaptadores para esas plantillas.

La ejecución se detiene al terminar esta fase y requiere autorización antes de continuar.
