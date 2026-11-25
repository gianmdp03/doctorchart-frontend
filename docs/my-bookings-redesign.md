# Mis turnos: implementación y verificación

## Comportamiento

El panel conserva DNI, prueba de trabajo, código por correo, sesión del navegador,
cookies, versiones e idempotencia de las operaciones existentes. No modifica el
backend ni PostgreSQL.

Agrupa los registros cargados en próximos, anteriores y cancelados; ordena los
próximos en forma ascendente y los anteriores en forma descendente. Los contadores
corresponden a esos registros, con aviso cuando queda paginación pendiente.

Antes de verificar el correo, el API sólo proporciona fecha y permisos. El panel
no revela profesional, centro, especialidad ni estado de cancelación en ese paso.
La clasificación por estado y las tarjetas completas aparecen con acceso verificado.
Sólo se muestran campos entregados por el API; la duración se deriva del inicio y
fin. El API del portal no entrega fecha de creación, motivo, contacto del centro ni
indicaciones para asistir.

Las fechas se evalúan en Buenos Aires, independientemente de la zona del equipo.
Con hora disponible, los detalles vencen al comenzar el turno. Con fecha sola,
vencen al terminar ese día argentino. Se rechazan fechas inválidas. El reloj de la
vista se actualiza cada segundo y los métodos comprueban nuevamente la hora al
actuar. Los detalles abiertos desaparecen al vencer el horario. Cancelado conserva
su estado real; una fecha pasada nunca se convierte automáticamente en Atendido.

La cancelación conserva motivo obligatorio y confirmación explícita. Reprogramar
usa el selector compartido y los horarios reales del servicio de disponibilidad.
El panel muestra horas de Buenos Aires; el selector de reprogramación conserva las
horas del consultorio, indicadas en el formulario existente.

## Verificación local

- 32 pruebas pasan: sección de reservas y guards públicos; incluyen identidad,
  rechazo del código, sesión, cancelación versionada, agrupación, límites de fecha,
  fechas inválidas, bloqueo programático y cierre de detalles vencidos.
- `npx ng build --configuration development`: correcto.
- `node scripts/verify-my-bookings.mjs`: correcto, contra Angular local en 4203.
  Intercepta todos los datos del API en el navegador; no envía correos ni cambia
  reservas reales. Verifica DNI/código, detalles con teclado, reprogramación,
  confirmación de cancelación, vencimiento, estados vacío/error y navegación activa.
- Capturas en `test-results/my-bookings`, temas claro/oscuro y anchos de 1440, 834,
  390 y 320 px, sin desbordamiento horizontal ni excepciones de página. El equipo
  simulado usa Asia/Tokyo para comprobar la independencia de zona horaria.
- Se conservan los tokens y archivos del sistema visual existente. El detector
  emitió avisos de tamaños tipográficos y radios respecto de la documentación;
  no se cambió el sistema compartido para silenciarlos.

`npm run build` de producción queda pendiente: la configuración local no tiene
`supabase.publishableKey`. No se generaron credenciales ficticias para superarlo.
`npm run test:static` tampoco pasó contra el build de desarrollo: espera el
JavaScript con hash y los artefactos del pipeline de producción pendiente.
La integración con un backend real y la entrega real de correos no se probaron en
esta revisión. No se hicieron commits, pushes ni despliegues.
