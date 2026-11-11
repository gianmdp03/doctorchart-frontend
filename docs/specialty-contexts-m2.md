# M2 — pacientes por contexto de especialidad

Modelo, constraints, autorización, recursos, pruebas y handoff de M3–M5:
[M2 del backend](../../doctorchart-backend-go/docs/specialty-contexts-m2.md).
Esta etapa es el rediseño de especialidades, no la antigua M2 de consultorios.

Cada paciente/listado/consulta devuelve `specialtyContextId`. Todas las peticiones
clínicas lo envían en query, obtenido del setup autenticado. `workspaceVersion`
sigue siendo el token de configuración clínica de M1, distinto de preferencias.
No enviar IDs de contexto en el cuerpo para cambiar la pertenencia del paciente.

`clinicalContextInterceptor` cubre pacientes, consultas, cálculos, medicamentos,
vacunación, charts y workspace/charts. Captura cuenta/contexto, valida el setup y
descarta respuestas si cambian. No retargetea una escritura a otro ámbito ni
agrega scope a rutas administrativas/externas. Sigue usando auth/timeZone.

La selección de paciente se revalida y comprueba el contexto de la respuesta.
Browser UI storage utiliza `doctorchart_active_patient:<owner>:<context>` y no
restaura claves anteriores sin contexto. No almacena historias clínicas.
Directorio, dashboard, consultas, ficha, borradores, vacunas, curvas y previews
incluyen contexto en sus barreras frente a respuestas tardías. Se conservan la
apariencia actual y el wizard existente.

Se mantiene un único contexto por workspace; no hay selector ni alta de segunda
especialidad. M5 necesitará retirar la restricción por migración y reabrir las
pantallas dentro del scope elegido. No probar múltiples contextos reales del
mismo workspace alterando la base en M2. Los tests unitarios de transición de
estado sólo simulan el cambio de identidad para comprobar aislamiento.

Backend nuevo requiere coordinar la actualización del cliente: peticiones
clínicas sin `specialtyContextId` reciben 400 y recursos fuera de ámbito 404.
Ninguna aplicación sobre bases reales ni despliegue fue autorizada o realizada.

## Validación final del 10/11/2026

- TypeScript: PASS.
- Scope de peticiones, selección, borradores y respuestas tardías: 22 PASS.
- Cadena de interceptores scope/auth/timeZone: 5 PASS.
- Suite completa: 818 PASS y los tres fallos preexistentes de expectativas de
  flags (calendar, schedules, public appointments). Sus tests/flags no cambiaron.
- Build de desarrollo: PASS, con dos rutas prerenderizadas.
- Build de producción: BLOCKED por la clave pública Supabase ausente.

Node 26.13.0; `NODE_OPTIONS=--no-experimental-webstorage` sólo para los procesos
de tests, conservando el workaround de M1 para jsdom. No se inventaron claves ni
se cambiaron guards o flags para esconder resultados. Servicios reales de
Supabase/Gateway/conversor/Billing no se validaron de extremo a extremo; ver los
SKIP y resultados PostgreSQL/Go reales en el informe del backend.

Repositorio `main`, HEAD `ff14f0c`, sin staged ni commits nuevos. Cambios de M1 y
anteriores preservados. Sin push/deploy, selector ni segunda especialidad. M2
termina aquí y M3 requiere revisión posterior.
