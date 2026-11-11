# DoctorChart frontend — handoff M5

10/11/2026. Alcance: habilitar las tres especialidades autorizadas dentro de un
workspace. Se leyeron AGENTS.md y handoffs M1–M4 de ambos repositorios y la
solicitud M5. M6 no está implementado ni autorizado por esta entrega.

El modelo y la migración están documentados en
`../../doctorchart-backend-go/docs/specialty-contexts-m5.md`. Ese documento
incluye contratos, PostgreSQL, conservación, seguridad, operación y límites.

## Pantallas y estado

`/specialties` ofrece Mis especialidades: estado, entrar, continuar configuración,
personalizar y agregar opciones del catálogo todavía no incorporadas. El alta
usa POST `/workspace/contexts` y abre el wizard existente con su ID explícito.
No duplica usuarios, workspaces, editor ni wizard predeterminado.

Un contexto nuevo tiene borrador y onboarding propios, sin definición efectiva.
Sólo los completos con definición pueden atender. Un contexto efectivo puede
editar un borrador sin quedar inutilizable. Los contextos listos y la
administración global siguen disponibles mientras otro está pendiente.

El selector del encabezado muestra contextos y pendientes, incluso a 390 px.
El sidebar incluye Mis especialidades y mantiene administración global aunque
el seleccionado esté pendiente y otro esté listo. No hay quotas nuevas de plan
ni opciones de eliminar, fusionar o archivar historias/contextos.

## Ruta, solicitudes y formularios

Las rutas clínicas usan `?specialtyContextId=<id>`: dashboard, pacientes,
fichas, consultas, herramientas y `/onboarding/setup`. La URL explícita prevalece
sobre sessionStorage por workspace y pestaña. No hay selección clínica global
persistida en el servidor ni localStorage compartido entre pestañas.

`clinical-context.guard.ts` verifica pertenencia/aptitud y activa la definición.
`app.routes.ts` ejecuta guards en orden explícito; un array canActivate de Angular
puede evaluar guards concurrentemente y no debe usarse para dependencias entre
ellos. La restauración de sesión conserva query/hash de la entrada y returnUrl.

`ClinicalReuseStrategy` recrea pantallas clínicas al cambiar contexto; conserva
pantallas administrativas y sus filtros. WorkspaceStore invalida lecturas
anteriores, separa preferencias y captura la identidad de las mutaciones.
El interceptor clínico y AccountReadScope existentes rechazan respuestas tardías
por cuenta/contexto. La segunda pestaña conserva su ruta y sus solicitudes.

`ClinicalNavigationService`, guard de salida e interceptor de interacción
protegen cambios locales: guardar primero mantiene el formulario y explica que
debe usarse su botón de guardado; descartar permite continuar y cancelar conserva
la edición. Un guardado en curso bloquea el cambio. El diálogo tiene foco
atrapado, teclado/Escape y etiquetas accesibles; no contiene otro editor.
Cambiar desde una ficha abre el dashboard de destino para no arrastrar IDs.

No se cambió el catálogo ni los tres defaults. Se reutilizan borradores,
validadores, renderer, fórmulas, configuración aplicada y versiones. Las notas
rápidas y columnas visibles son por contexto, con versión propia en backend.

## Pacientes, horarios y agenda

M2 mantiene pacientes/DNI independientes y drafts de ficha por cuenta/contexto/
paciente. Impresión, archivos, recetas e historias siguen autorizándose en el
backend y viajan con contexto capturado; no hay copia ni matching automático.

Mis horarios carga la lista de contextos propios listos. Selección automática
si hay uno, elección explícita si hay varios. Los bloques y excepciones mantienen
su identidad, especialidad y duración; la validación admite varios contextos en
una agenda. Un contexto pendiente no aparece en el compositor.

La agenda sigue global. Filtros por consultorio, especialidad y estado son
independientes del selector clínico y sobreviven a su cambio. Los slots incluyen
`specialtyContextId`. Buscar/vincular paciente exige el contexto del slot/turno;
la acción explícita cambia a su especialidad. Los links a ficha y nueva ficha
incluyen el contexto persistido de la reserva. Reprogramación ofrece slots de
esa especialidad; snapshots y eventos históricos se conservan.

## Publicación, directorio y secretaría

Publication añade `specialtyContextIds`; el editor ofrece checkboxes sólo para
contextos listos y links por especialidad. PublicDoctor añade
`specialties:[{id,code,name,clinics}]`. El directorio conserva identidad principal
del médico y los filtros existentes. El perfil público selecciona oferta antes
de consultorio/slot; una única oferta se elige automáticamente. Un link
`/appointments/:publicId?specialtyContextId=...` la preselecciona. La disponibilidad
y reserva llevan el contexto, sin crear pacientes. Cambiar oferta invalida slots
tardíos, turno seleccionado y consentimiento, conservando datos administrativos.
También se observan cambios de query en una ruta pública ya abierta.

Secretaría mantiene su UI y permisos administrativos por sede. No incorpora
buscador clínico, historias ni permisos por especialidad. Ocupación global intacta.

## Validación ejecutada

| Gate | Resultado |
| --- | --- |
| `npx tsc --noEmit -p tsconfig.app.json` y spec | PASS |
| `npx ng build --configuration development` | PASS |
| `NODE_OPTIONS=--no-experimental-webstorage npx ng test --watch=false` | 841 PASS / 3 FAIL antiguos, 844 tests; sin errores no manejados |
| Chrome, API simulada | PASS: dos pestañas, cambio de contexto, guardar/descartar/cancelar, contexto de escritura, agenda y filtros, horarios, alta/wizard pendiente, link y reserva pública, selector móvil |
| Go build/vet/suites completas/race, PostgreSQL 17.11 y 18.6 | PASS en Linux; detalle en handoff backend |

Regresiones nuevas en WorkspaceStore, guards clínicos, Mis especialidades,
horarios y reserva pública multiespecialidad. Tests existentes adaptados a los
contratos nuevos; las expectativas de flags antiguas no se ocultaron.

Smoke reproducible: después del build de desarrollo, ejecutar
`node scripts/specialty-contexts-m5-browser.cjs`. Requiere Playwright instalado y
Chrome; crea sólo un preview loopback 4352 y cierra browser/servidor. Usa respuestas
sintéticas y prueba el formulario público con proof fixture, **no un backend real**.
Capturas en `%TEMP%/doctorchart-specialty-m5-browser` o
`DOCTORCHART_M5_BROWSER_OUTPUT`. Se inspeccionó diseño desktop y móvil.

Los tres fallos conocidos son calendar.guard.spec, schedules.guard.spec y
public-appointments.guard.spec por flags preexistentes. Build de producción:
BLOCKED por `supabase.publishableKey` ausente. Smoke estático completo no aprobado:
con desarrollo falla la expectativa de bundle productivo (`assert.ok(script)`),
tras verificar las rutas. No se agregaron credenciales ni se alteraron flags.
E2E con backend/servicios productivos, Billing/converter opt-in y smoke productivo
siguen pendientes; no se presentan mocks como integración real.

Router, links, clientPatterns, `_redirects`, `_headers` y Nginx incluyen la ruta
inglesa `/specialties`, con noindex. No se desplegó ningún artefacto.

## Estado y siguiente etapa

Frontend main HEAD `ff14f0c`, backend main HEAD `6869461`. Cambios anteriores y
M1–M4 seguían sin commit al comenzar; se preservaron. El diff total mezcla esas
etapas. M5 añade archivos y modificaciones descritos aquí y en el backend.
No hubo commit, push, worktree, reset, despliegue ni operación contra bases reales.

M6 debe comenzar con una solicitud propia, los handoffs M1–M5 y esquema 15;
mantener rutas/contratos, aislamiento entre pestañas/contextos, agenda global,
frontera de secretaría y catálogo limitado a las tres especialidades. No asumir
cuotas, nuevas especialidades, archivos/downgrades ni nuevos módulos.
Revisar primero los bloqueos preexistentes y obtener configuración autorizada
para validación productiva. **Detenerse en M5; no ejecutar M6 automáticamente.**
