# DoctorChart — M4: especialidad persistida en la agenda

Fecha: 10/11/2026. Continúa M1–M3. Modelo SQL, clasificación legacy, seguridad,
operación y dependencias completas en
[M4 del backend](../../doctorchart-backend-go/docs/specialty-contexts-m4.md).

## Contrato y visualización

Booking incorpora specialtyContextId string decimal, specialty {id,code,name},
clinicSnapshot {name,address,publicAddress,timezone} y provenance. Las reservas
nuevas tienen SCHEDULE_BLOCK con bloque/versión/duración; las anteriores se
clasifican LEGACY_CONTEXT_ONLY y no afirman un bloque histórico. Esos campos son
opcionales en el tipo de lectura exclusivamente para recibos pre-14 preservados.
El detalle vigente nuevo siempre permite obtenerlos de la reserva persistida.

El calendario global conserva su estructura y sus acciones de crear, ver detalle,
cambiar estado, cancelar y reprogramar. Las tarjetas y el detalle muestran
especialidad y consultorio históricos en texto. Horarios y agrupación civil usan
la zona del snapshot, con fallback de compatibilidad para recibos antiguos. No
se usa el setup actual para rellenar una especialidad histórica desconocida.
No hay estilos por códigos fijos de especialidad ni librerías nuevas de calendario.

La creación y reprogramación conservan sus servicios, encabezados y claves de
reintento. El servidor deriva el contexto del bloque y el fin de su duración;
rechaza contexto/paciente incompatible y cambio de especialidad al mover un turno.
Cambiar de especialidad requiere cancelar/crear. El snapshot de especialidad se
conserva y la procedencia del destino se registra con el evento de reprogramación.

## Vinculación desde el detalle del médico

Para una reserva sin patientId se ofrece «Vincular ficha clínica». El médico busca
por nombre mediante PatientService, selecciona una ficha y confirma el vínculo.
El contexto clínico cargado debe coincidir con specialtyContextId de la reserva;
los resultados se filtran/verifican y una respuesta tardía de otra cuenta,
contexto o editor se descarta. Cambiar el contexto activo limpia la selección
clínica, sin renombrar ni filtrar arbitrariamente las reservas administrativas.

PUT /bookings/{id}/patient envía expectedVersion y patientId decimal con
Idempotency-Key. Mantiene el recibo al reintentar después de un error de red.
El backend verifica propietario/contexto, incrementa versión y registra
PATIENT_LINKED; Angular muestra «Ficha clínica vinculada» en el historial.
No se cambia el nombre administrativo del atendido ni se crea una consulta.

El enlace a /patients/new reutiliza el alta existente. Crear una ficha no la
asocia automáticamente: se vuelve al turno para elegirla y confirmar. Un vínculo
existente no se reemplaza ni se elimina; correcciones requieren otro alcance.
El endpoint no recibe la especialidad activa como autoridad ni deduplica por DNI.

## Secretaría, público y horarios

Secretaría muestra nombre de especialidad y consultorio/zona persistidos.
AdministrativeBooking excluye patientId, provenance y direcciones del snapshot.
No se agregaron rutas delegadas ni controles para buscar/vincular fichas. Sus
sesiones/CSRF/permisos y sedes siguen iguales; la ocupación global protege también
frente a turnos de sedes no visibles. El backend evita nombres de sedes ajenas en
errores de disponibilidad de los canales limitados.

Las confirmaciones públicas inmediata y recuperada incorporan specialtyName de
la reserva. Se conserva formulario, verificación, enlace directo y código privado;
no se solicita un selector ni contexto nuevo. Se muestran dirección pública y
zona del snapshot, sin exponer la dirección privada, patientId o procedencia.
Notificaciones administrativas usan la misma información persistida.

«Mis horarios», sus 17 pruebas, fechas compartidas, bloques multidiarios,
preview, duraciones y validaciones M3 se conservan. No se reescribió el calendario,
se cambiaron rutas/flags/guards, habilitaron contextos múltiples o agregaron
especialidades. Sólo Pediatría, Medicina General y Dermatología durante M1–M6.

## Verificación

- TypeScript app/spec PASS.
- Calendar/staff/público/schedules: 61 pruebas PASS en 11 archivos.
- Suite completa: 827 PASS, 3 FAIL preexistentes por expectativas de flags en
  calendar.guard, schedules.guard y public-appointments.guard. No se ocultaron.
- Desarrollo PASS con 2 rutas prerenderizadas. Producción BLOCKED por
  supabase.publishableKey ausente; no se inventaron claves ni se cambió el validador.
- Chrome con sesión/API sintéticas: calendario con nombres históricos distintos
  de los actuales, búsqueda con scope y vínculo explícito, staff sin búsqueda
  clínica y constancia pública con especialidad histórica. Capturas revisadas en
  1440×1000 y 390×844; sin overflow ni errores JS.
- No hubo E2E con Supabase/Gateway reales. El smoke estático productivo sigue
  condicionado al artefacto que no puede generarse sin la clave pública.
- Go/PG17/PG18 se ejecutan en Linux Docker; resultados y SKIP externos en backend.

Comandos: npx tsc --noEmit -p tsconfig.app.json y tsconfig.spec.json;
npx ng test --watch=false (NODE_OPTIONS=--no-experimental-webstorage sólo para
jsdom); npx ng build --configuration development; npm run build.
Las pruebas nuevas verifican DTO idempotente/versionado, etiquetas persistidas,
rechazo/filtrado de fichas ajenas y descarte por cambio de contexto. Los tests
existentes siguen cubriendo crear/reprogramar/cancelar/estado, conflictos y M3.

## Handoff M5 y estado de Git

Coordinar cliente/backend 14 para el endpoint y los campos nuevos. M5 deberá
definir selección de contexto, filtros administrativos y publicación pública,
revisando todos los fallbacks de contexto único antes de quitar su UNIQUE en SQL.
El calendario no debe relabelar turnos por el selector clínico. Al habilitar varios
contextos se requieren pruebas reales de ficha/turno concordantes, cambios de
ámbito durante búsquedas y movimientos entre bloques de igual/diferente contexto.
La procedencia desconocida legacy nunca se debe resolver por similitud horaria.

Frontend main HEAD ff14f0c, backend main HEAD 6869461. Trabajo previo/M1–M3
sin commits preservado; el diff contra HEAD mezcla etapas y no es sólo M4.
Sin commits, push, worktrees, deploy, credenciales nuevas o bases reales. M4 se
detiene aquí; no se comenzó M5.
