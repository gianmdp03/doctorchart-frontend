# DoctorChart — M3: Mis horarios

Fecha: 10/11/2026. Continuación de [M1](specialty-contexts-m1.md) y
[M2](specialty-contexts-m2.md). Modelo SQL, migración 13, motor, operación y
dependencias completas en el repositorio backend: docs/specialty-contexts-m3.md.

## Flujo implementado

«Mis horarios» conserva los componentes, tokens, permisos y servicios del editor
existente. Se entra desde Consultorios o `/schedules`; si hay un único consultorio
se navega automáticamente a `/clinics/:id/schedule`. Con varios, se elige uno y
se conserva el selector del consultorio. La especialidad única se obtiene del
WorkspaceStore y se muestra en texto, sin un selector innecesario.

Un formulario permite seleccionar varios días y completar inicio, fin y minutos
por turno. «Agregar a los días seleccionados» valida todos los días antes de
incorporar bloques: si alguno se superpone, no deja una creación parcial.
«Guardar agenda» confirma el conjunto usando la versión actual. No hay una
duración general editable: cada tarjeta tiene su duración, hora, especialidad,
consultorio y acciones de edición/quitar. La identidad del bloque se conserva.
El formulario valida franjas del mismo día, límites 5–480 minutos, solapamientos
y hasta 16 bloques por día. Los huecos entre bloques representan las pausas.

Las excepciones conservan fechas inclusivas y motivo; sin bloques cierran la
agenda, con bloques reemplazan la semana habitual. Se reutiliza app-date-picker
y se muestra formato argentino. La vista previa consulta al backend sobre la
agenda guardada, incluyendo duraciones, excepciones y ocupaciones. Angular sólo
formatea los slots recibidos en la zona del consultorio.

Se conservan borradores por cuenta/consultorio, control de versiones, descarte,
fences de cuenta y generación para respuestas tardías, permisos comerciales,
lectura de consultorios inactivos/archivados y reintentos. Los borradores con
bloques de otro contexto o previos al formato M3 sin contexto no se restauran.
Los errores del backend se muestran sin perder los campos ingresados.

Las tarjetas y el formulario pasan a una columna en pantallas pequeñas. Se
mantienen labels, fieldsets/legend, mensajes role=alert, textos de especialidad
y botones con nombre accesible. No se agregó una librería de calendario ni tema.

## Contrato y rutas

ScheduleRange incorpora id opcional, specialtyContextId y slotMinutes propios.
ScheduleException incorpora id opcional. Los IDs del DTO de horarios son strings
decimales: el ID numérico del setup se adapta a string al construir el bloque.
PUT envía expectedVersion, reglas administrativas, weekly y exceptions;
conserva IDs al editar y omite IDs al crear. Omitir un bloque lo quita del conjunto.
La duración raíz antigua sólo permanece tipada para compatibilidad y el cliente
M3 no la envía ni la usa como fuente de verdad.

El backend devuelve 409 si hay conflicto temporal, versión desactualizada o una
reserva futura cuyo bloque/duración/contexto resultaría alterado. El contexto
de un bloque se comprueba contra el workspace autenticado: el cliente no es
autoridad. La reserva sigue calculando su fin en el servidor; sus contratos
públicos y la exclusión global por workspace no cambian.

La nueva ruta `/schedules` usa los mismos guards del editor existente. Se agrega
a la lista de rutas privadas del hosting y site.config, sin indexarla. Se conserva
`/clinics/:id/schedule`. No se modificaron feature flags, guards, calendario global,
reservas públicas, onboarding o selectores clínicos. Sigue un contexto por médico
y únicamente Pediatría, Medicina General y Dermatología.

La actualización debe coordinarse con el backend 13. Un editor anterior no puede
editar de forma completa duraciones mixtas y un backend 12 no entiende bloques.
El backend documenta un puente limitado de PUT antiguo para el contexto único;
no es una solución multiespecialidad ni debe extenderse ambiguamente en M5.

## Validación y límites del entorno

- 17 tests de horarios PASS: DTO/servicio, contexto y consultorio únicos,
  creación multidiaria, identidad estable, edición/quitar, límites y conflictos,
  excepciones, borradores, permisos y preview.
- Suite completa: 822 PASS, 3 fallos previos (calendar.guard, schedules.guard,
  public-appointments.guard por expectativas de flags). No se ocultaron ni se
  cambiaron esos tests/flags/guards.
- TypeScript y build development PASS; build production BLOCKED por la clave
  pública Supabase ausente. No se inventaron credenciales.
- Smoke estático adicional: fallo de búsqueda de asset con hash al usar el build
  development (main.js sin hash). No se verificó un paquete productivo; las rutas
  privadas anteriores respondieron correctamente y /schedules se probó en Chrome.
- Chrome con sesión y HTTP sintéticos: carga autenticada, autoselección,
  creación de varios días, guardado de DTO sin duración raíz y ausencia de
  errores JS/desborde a 390 px. Capturas revisadas a 1440×1000 y 390×844.
  No se probó E2E contra Supabase/Gateway reales.
- Go y PostgreSQL se verifican en Linux Docker para evitar ejecutar binarios Go
  en Windows; ver resultados finales y SKIP externos en el informe backend.

Comandos usados: `npx tsc --noEmit -p tsconfig.app.json`,
`npx ng test --watch=false`,
`npx ng test --watch=false --include='src/app/features/schedules/**/*.spec.ts'`,
`npx ng build --configuration development`, `npm run build`.
Se mantuvo el workaround de tests NODE_OPTIONS=--no-experimental-webstorage
cuando corresponde, sin cambiar configuración de producto.

## Handoff

M4 debe persistir contexto/procedencia de reservas y coordinar sus DTO,
reprogramaciones, canales público/staff, notificaciones e idempotencia sin
romper el ámbito global del tiempo. M3 sólo aporta metadatos internos del slot;
no hay procedencia durable ni cambios clínicos automáticos.

M5 definirá múltiples contextos, selector y filtros; entonces deben probarse
varias especialidades reales en un mismo consultorio y retirarse los fallbacks
de contexto único. No se habilitó ese escenario durante M3.

Frontend main HEAD ff14f0c, backend main HEAD 6869461. Cambios anteriores, M1 y M2
sin commits preservados; el diff completo contra HEAD mezcla esas etapas y no
representa sólo M3. Sin commits, pushes, worktrees, despliegues ni bases reales.
M3 termina aquí y no inicia M4.
