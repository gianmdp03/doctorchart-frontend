# M1 de especialidades

La especificación, modelo PostgreSQL, contratos, validación y límites están en
[M1 del backend](../../doctorchart-backend-go/docs/specialty-contexts-m1.md).
Corresponde al rediseño de especialidades de noviembre de 2026, no a la etapa
anterior de consultorios/agenda ya implementada.

La UI actual conserva su experiencia. `WorkspaceSetup.id` es el workspace
administrativo; `specialtyContextId` identifica su único contexto clínico y
`version` es la concurrencia del wizard. `WorkspacePreferences.version` es
independiente. El store envía el ID del contexto en selección/guardado/aplicación/
reset/discard, y lo limpia con la sesión. El backend valida siempre pertenencia
por usuario autenticado. No hay selector ni alta de una segunda especialidad.

El `workspaceVersion` de escrituras clínicas sigue siendo el token de la
definición efectiva actual; no usar para él la versión de preferencias. Los
guards, formularios, editor y renderer siguen consumiendo el store existente.

El backend prepara el esquema 11 mediante migración incremental, conservando
el baseline productivo. Se requiere coordinar ambas versiones y autorizar por
separado cualquier aplicación sobre bases reales. No ejecutar el backend nuevo
contra una base real sólo para probar la UI.

## Validación del 10/11/2026

- `npx tsc -p tsconfig.spec.json --noEmit`: PASS.
- Tests de workspace, onboarding, formulario de pacientes, formulario de
  consultas e historia clínica: 16 archivos, 228 pruebas, PASS.
- Suite completa: 809 PASS, 3 FAIL. Los fallos están en
  `calendar.guard.spec.ts`, `schedules.guard.spec.ts` y
  `public-appointments.guard.spec.ts`: esperan flags apagados y el repositorio
  ya los tiene encendidos. Esos archivos y `feature-flags.ts` son idénticos a
  HEAD; M1 no los modificó ni apagó las funciones implementadas.
- `npx ng build --configuration development`: PASS, con prerender de dos rutas.
- `npm run build` de producción: BLOCKED por falta de
  `supabase.publishableKey` en la configuración de build. No se inventó una
  clave ni se modificó la configuración para eludir el validador.

Node instalado: 26.13.0. Los tests se ejecutaron con
`NODE_OPTIONS=--no-experimental-webstorage`, sólo en el proceso de validación:
sin esa opción, el localStorage nativo de Node sin archivo interfiere con
jsdom y causa 44 fallos adicionales ajenos a M1. No se cambió código del
producto ni configuración de tests para ocultarlos.

No se probó login Supabase ni navegación con servicios reales. El backend se
compiló y probó en Linux para evitar nuevas solicitudes del firewall de Windows.
Los cambios permanecen en `main`, sin staged/commit/push/deploy, preservando
los archivos locales previos.
