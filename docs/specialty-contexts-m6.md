# DoctorChart — M6: cierre del frontend e integración real

Validación: 10/11/2026. Sólo M6; se preservan decisiones definitivas y handoffs
M1–M5. El informe completo de arquitectura, PostgreSQL, migraciones, seguridad,
concurrencia y operación es [el informe backend](../../doctorchart-backend-go/docs/specialty-contexts-m6.md).
Sus [resultados y hashes](../../doctorchart-backend-go/docs/specialty-contexts-m6-results.json)
separan las categorías A–E de pruebas. No confundirlas con las tres categorías
de cierre siguientes.

## A. Implementación funcionalmente cerrada

M1–M5 conservan un workspace administrativo por médico, varios contextos,
wizard existente independiente, pacientes propios, consultorios compartidos,
bloques por especialidad y agenda global. M6 estabiliza esos contratos sin otra
reforma. El backend sigue en versión 15. No se cambian seed, catálogo de tres
especialidades, feature flags ni calculadoras deshabilitadas.

### Defectos y regresiones corregidos

- clinicsGuard exigía onboarding del contexto seleccionado para administración
  global. Con otro contexto listo bloqueaba agenda/horarios/consultorios. Ahora
  considera los contextos listos; si ninguno está listo conserva el onboarding
  inicial. Corrige /onboarding/specialty (inexistente) por
  /onboarding/select-specialty y cancela navegación si la carga falla.
- ClinicalNavigationService no detectaba edición en app-patient-form-page,
  porque el componente no tiene form nativo. Ahora protege el editor real.
- Guardar una consulta liberaba también otro borrador de ficha. La protección
  identifica editores independientes: libera sólo el guardado y preserva cambios
  escritos después de comenzar el request. No cambia la autoridad de escritura:
  cada request conserva el contexto capturado por el interceptor existente.
- calendar.guard.spec, schedules.guard.spec y public-appointments.guard.spec
  suponían flags apagados aunque la configuración aprobada los activa. Se
  corrigen expectativas, fixtures y restauración afterEach, manteniendo casos
  explícitamente desactivados. Ningún test fue borrado ni convertido a SKIP.

- La tarjeta de turno de secretaría concatenaba nombre y especialidad. CSS
  ahora muestra cada dato en su propia línea. El navegador mide las posiciones
  reales y confirma legibilidad y ausencia de overflow móvil.

Antes: tres FAIL de flags, dos regresiones de clínicas y dos de edición sin
proteger. Después: 14 PASS de guards, 8 PASS de navegación y suite completa
851 PASS / 0 FAIL en 103 archivos. Se agregan pruebas del formulario enrutado,
borrador independiente y edición durante un request.

### Recorridos verificados

El runner D usa Angular real, Go DoctorChart real, Gateway Go real y PostgreSQL
18 real. Auth/Billing son el adaptador externo de desarrollo existente. El login
normal emite JWT RS256 y Gateway valida JWKS/issuer/audience. No hay endpoints
DoctorChart simulados, inyección de cabeceras de identidad ni bypass de producto.
Conversor real y SMTP Mailpit local completan archivos/notificaciones. Esto es D,
no E ni una prueba de Supabase real.

1. Médico nuevo: login, selección Pediatría y wizard; luego Mis especialidades
   agrega General/Dermatología y termina sus wizard. Un contexto pendiente niega
   atención/publicación pero no bloquea administración ni otro contexto listo.
   Un borrador personalizado mantiene definición efectiva y otra especialidad.
2. Pacientes: tres Juan Pérez, DNI 12345678, IDs distintos, creados mediante el
   formulario dinámico. Primera consulta y seguimiento propios, búsquedas,
   resúmenes, recetas/órdenes, impresión/PDF y estudios con conversión real.
   Paciente/documento/archivo de otro contexto devuelve 404. Las reservas no
   crean pacientes ni vinculan por DNI. B amplía vacunación/crecimiento/cálculos,
   antecedentes, recursos multimedia y propietarios/contextos ajenos.
3. Mis horarios: autoselección 1×1; Centro con las tres especialidades; Centro,
   Norte y Sur con las tres. Bloques de ejemplo de la misión, varios días,
   duraciones 20/30, edición, eliminación, IDs persistentes, cierre por
   date-picker dd/MM/aaaa y preview. Conflicto entre sedes/contextos devuelve 409
   sin alterar versión. B cubre 1 especialidad × 3 consultorios, excepciones
   especiales, zonas/DST, cambios concurrentes y reservas existentes.
4. Agenda global: ambos contextos visibles, filtro de especialidad independiente
   del selector, ficha abierta con contexto persistido, vínculo correcto,
   reprogramación compatible y rechazo de contexto/paciente incompatible,
   snapshots y CHECKED_IN/COMPLETED. B amplía filtros sede/estado, cancelaciones,
   eventos, ocupación global e idempotencia.
5. Público móvil: enlace directo Dermatología, cambio de oferta con respuesta
   real demorada, selección de sede/horario, datos administrativos, proof real,
   reserva y constancia 201. Reintento mismo body/key devuelve la misma constancia;
   una sola oferta se autoselecciona y despublicar conserva recibos previos.
   SQL comprueba contexto/bloque/30 min y paciente null. B cubre sede inactiva,
   ocupación, simultaneidad y carreras publicación/agenda.
6. Secretaría móvil: activación real, recuperación, sesión cookie/CSRF, una sede
   asignada, disponibilidad, creación/reprogramación/cancelación. Otra sede 404,
   acceso clínico rechazado y DTO sin patientId/provenance/dirección privada.
   B amplía permisos/estados, expiración, revocación y varios propietarios.
7. Dos pestañas con consultas en edición: borradores propios General/Dermatología,
   POST real demorado sin reemplazar respuesta, cambio bloqueado mientras guarda,
   escritura en origen y otro borrador intacto. Cancelar/guardar antes de cambiar/
   descartar también en el formulario real de paciente. URLs explícitas conservan
   contexto; la agenda permanece administrativa.

D termina con versión 15, 1 workspace, 3 contextos, 3 pacientes, 4 reservas,
3 estudios y 3 outbox. Observación posterior: dos mensajes SENT y un recordatorio
futuro PENDING. Sólo acredita entrega SMTP local.

Escritorio 1440×1000 y móvil 390×844; capturas de horarios (incluido móvil completo),
público y secretaría revisadas. No se detectó overflow horizontal en los checks.
Se conserva identidad visual, rutas en inglés, UI española y date-picker común.
No se añaden pasos, librerías UI ni pantallas de producto.

### Gates y evidencia

| Control | Resultado |
| --- | --- |
| TypeScript app/spec | PASS ambos |
| Angular completo | PASS: 851 tests / 103 archivos |
| Build desarrollo | PASS |
| Build opt-in m6-lab | PASS |
| test:config | PASS: 7 tests; fixtures, sin acreditar proyecto Supabase |
| C: navegador con API simulada | PASS: runner M5 reejecutado después de fixes |
| D: navegador con Go/PostgreSQL reales | PASS: 17 flujos; 87 llamadas auxiliares más las de Angular |
| Go build/vet/full/race PostgreSQL 17/18 | PASS en Linux; límites opt-in en informe backend |
| Producción / smoke productivo | BLOCKED por configuración legítima ausente |
| E: Supabase/Billing reales | BLOCKED; no configurados/autorizados |

Logs: %TEMP%/doctorchart-m6-{angular,ts-app,ts-spec,dev-build,lab-frontend-build,
config,production,mocked,real}.log. Capturas y real-results.json:
%TEMP%/doctorchart-specialty-m6-20261110/browser/. Los hashes de logs y resultados
quedan en el JSON backend enlazado. Los seis tests Go opt-in SKIP se enumeran
expresamente allí; no se presentan como PASS ni como cobertura de S3 completa.

En Node 26 se ejecuta la suite con NODE_OPTIONS=--no-experimental-webstorage,
heredado también por los workers. Sin ese entorno, el WebStorage nativo de Node
sombrea el almacenamiento de jsdom y 46 tests fallan antes de sus assertions
por localStorage undefined. Pasar sólo la opción al CLI no llega a esos workers.
Se conservaron ambos logs fallidos de diagnóstico; la ejecución final completa
con el entorno correcto pasa 851/851. No se cambian flags de DoctorChart ni se
omiten pruebas. Para PowerShell, definir esa variable sólo durante el comando
ng test --watch=false y restaurarla al terminar.

### Laboratorio reproducible

Se añade scripts/specialty-contexts-m6-real.cjs y una configuración opt-in
m6-lab en angular.json. Reemplaza únicamente environment.ts por
src/environments/environment.m6.generated.ts, ignorado por Git y marcado como
propiedad del laboratorio. Es desarrollo (production:false); no altera
config/local.public.json, environment.local.generated.ts ni site.config.

El backend prepara/compila/arranca con ops/testing/specialty-m6-lab.mjs
(prepare, build, up); exige Docker Linux, Gateway/media hermanos, imagen local
del conversor, dependencias frontend/Chrome y configuración local existente.
Después, desde frontend:

```
node node_modules/@angular/cli/bin/ng.js build --configuration m6-lab
node scripts/specialty-contexts-m6-real.cjs
```

El preview HTTPS sólo escucha loopback4353, envía API al Gateway real18087 y
Auth al adaptador19447; valida CA propia y Chrome confía sólo en el certificado
SPKI del laboratorio. El script de navegador usa usuarios/datos de ensayo y no
se conecta a servicios productivos. Demorar una respuesta conserva el request/
response real: no es route.fulfill ni un mock DoctorChart.

Para repetir, reset-e2e del script backend recrea exclusivamente su base literal
identificada. Al cerrar, down retira sólo recursos Docker propios verificados;
se elimina el TS generado comprobando marcador. Go/tests se ejecutan en Linux,
sin desactivar firewall ni lanzar binarios Go nativos en Windows.

## B. Validación de integración pendiente

Faltan Supabase/Billing reales autorizados para categoría E, flujos reales de
confirmación/refresh/recuperación, integración comercial y correo externo.
R2/S3 y opt-in especializados requieren fixtures propios. D incluye Gateway
real pero no equivale a E. No se usaron usuarios reales ni servicios productivos.
No quedan defectos conocidos sin resolver en los recorridos M6 ejecutados.

## C. Preparación para producción pendiente

npm run build se ejecutó y devuelve «supabase.publishableKey: falta la clave
pública.» No hay clave legítima accesible ni PUBLIC_SUPABASE_* en el proceso.
Se necesita URL HTTPS pública y publishable/anon de un proyecto autorizado,
por site.config o PUBLIC_SUPABASE_URL/PUBLIC_SUPABASE_PUBLISHABLE_KEY. El
identificador del adaptador local no es una clave Supabase productiva. No se
inventaron claves ni se relajó el validador.

El smoke productivo espera correctamente bundles con hash, gzip e immutable
producidos por build-deploy/generate-hosting. Un build de desarrollo no satisface
ese formato. No se declara smoke PASS sin artefacto válido. Se corrigió
[conexion-entornos.md](conexion-entornos.md) para distinguir fixtures de
configuración, build real y laboratorio. Con configuración legítima: build,
test:static sobre esa salida y validación de CORS/callbacks/dominios/certificados.

Despliegue y migraciones reales requieren autorización independiente, backup de
base/medios y prueba de recuperación, siguiendo docs/vps-operations.md backend.
No hay DOWN automático después de 15 ni degradación autorizada. M6 no despliega.

Frontend main HEAD ff14f0c; backend main HEAD6869461, sin cambios de HEAD ni
staged. Se preservaron 108 archivos backend y 112 frontend previamente sucios;
sólo clinical-navigation.service.ts de esos 112 recibe el ajuste M6 descrito.
El resto de M6 son archivos antes limpios/nuevos. Baseline, SQL, seed, flags y
AGENTS mantienen hashes. No atribuir el diff total previo/M1–M5 a M6. Sin commits,
pushes, worktrees, resets ni bases reales modificadas.

La cuarta especialidad futura requiere decisión de producto, catálogo/definición/
experiencia y pruebas de capacidades/aislamiento; módulos avanzados pueden
necesitar desarrollo propio. No requiere otro workspace ni otra reforma de
identidad, y no se implementa durante M6.

M6 termina aquí. No iniciar otra etapa ni publicar automáticamente.
