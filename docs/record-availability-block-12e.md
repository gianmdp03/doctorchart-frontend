# Bloque 12, paso E: disponibilidad en backend

La composición persistida ahora gobierna las operaciones del servidor además
de la interfaz. `ClinicalFeature` define la política y `ClinicalRecordSupport`
resuelve el workspace del usuario autenticado en cada comprobación, con la
especialidad vigente y la definición personal efectiva. No usa el borrador,
el código de pediatría, una especialidad enviada por el cliente ni la
especialidad histórica de una consulta para habilitar funciones.

No se agregó otra lista persistida de permisos que pueda contradecir la
composición. La relación entre configuración y funciones es explícita:

| Función | Condición vigente | Operaciones controladas |
| --- | --- | --- |
| Calculadoras | Navegación `CALCULATORS` | Catálogo, favoritos, reinicio, preview, ejecución, historial y autocompletado |
| Calendario | Navegación `VACCINATION` | Lectura del calendario general |
| Vacunas del paciente | Pestaña `VACCINATION` | Calendario resuelto del paciente y registro de dosis |
| Curvas | Pestaña `GROWTH` y módulo personal `GROWTH_CHARTS` | Mediciones para curvas, catálogo y configuración de gráficos |
| Estudios | Pestaña `STUDIES` | Listado, carga, detalle, descarga y eliminación de archivos |
| Recetas y órdenes | Pestaña `PRESCRIPTIONS` | Listado, lectura, creación y eliminación de documentos |
| Editar paciente | Acción `EDIT_PATIENT` | Actualización del paciente |
| Crear consulta | Acción `NEW_ENCOUNTER` | Creación de consulta |
| Imprimir | Acción `PRINT_DOCUMENT` | Proyección de documentos persistidos de recetas y consultas |
| Catálogo de medicamentos | Módulo personal `MEDICATION_CATALOG` | Catálogo completo y búsqueda |
| Asistente de IA | Módulo personal `AI_ASSISTANT` | Inicio del chat clínico y uso de herramientas que consultan DoctorChart |

La ausencia de una función devuelve `403 FEATURE_UNAVAILABLE`. Un workspace
ausente o sin onboarding terminado devuelve `409 ONBOARDING_REQUIRED`.
Los permisos de propietario y la relación paciente–consulta siguen vigentes;
ser administrador no concede acceso a pacientes ajenos. Los catálogos de
gráficos y medicamentos dejaron de ser lecturas anónimas. Se eliminó el
cache global del método autorizado de catálogo de gráficos para que no omita
la política del usuario actual.

## Independencia de módulos y acciones

El calendario general y las vacunas de la ficha se habilitan por separado.
Retirar el acceso rápido `VIEW_GROWTH` no retira la pestaña de curvas.
La impresión de un registro de receta requiere también `PRESCRIPTIONS`;
la impresión de documentos ya guardados en una consulta funciona sin esa
pestaña. La edición y eliminación de consultas existentes siguen siendo
operaciones del módulo obligatorio de consultas: retirar `NEW_ENCOUNTER`
no convierte toda la ficha en solo lectura. Crear pacientes sigue usando
el circuito común y el wizard correspondiente.

El editor de recetas deja de cargar historial cuando su módulo está omitido,
cancela sus lecturas y limpia los borradores al retirarlo. Conserva la
impresión de documentos de consultas cuando corresponde. El asistente se
presenta únicamente cuando su módulo está habilitado y limpia/cancela la
conversación al cambiar cuenta, paciente, especialidad o disponibilidad.

## Gateway de IA

Se revisó y modificó el repositorio hermano `ai-gateway`. DoctorChart consume
`POST /api/ai/doctorchart/chat`; el gateway comprueba identidad procedente
del API gateway mediante el secreto compartido y consulta
`GET /api/doctorchart/workspace/ai-access` antes de invocar el modelo.
Solo un `204` habilita el chat: denegaciones, respuestas inesperadas o fallos
de conexión no permiten continuar. Se transmiten cabeceras de identidad
validadas al backend, sin obtener el usuario del mensaje ni de un ID de
especialidad enviado por el cliente.

El chat compartido de otras aplicaciones mantiene su ruta. Sus dos
herramientas de DoctorChart también exigen identidad validada y consultan
la disponibilidad antes de leer pacientes; esa ruta no evita el control.
No se hicieron llamadas reales al proveedor de IA durante las pruebas.

Las comprobaciones backend se hacen al autorizar cada operación. Una
operación ya autorizada puede finalizar si la configuración cambia después;
no se prometen revocaciones retroactivas. El frontend se actualiza al cargar
el workspace, sin notificaciones entre navegadores.

## Extensión y estado

Con 12a–12e quedan separados navegación, módulos de ficha, estado, acciones
y disponibilidad backend. Una especialidad nueva utiliza IDs implementados
y seleccionados en su propia configuración. Una función nueva requiere su
módulo, registro de presentación, persistencia/servicio y política backend;
no requiere condiciones por código de especialidad dentro de la ficha común.
No se inventaron funciones de cardiología ni se añadió un editor visual
administrativo para la composición.

Se conserva el seed pediátrico: una prueba usa el JSON real y comprueba que
las funciones existentes siguen habilitadas. Se mantuvieron formularios,
textos y estilos pediátricos. No se compararon capturas en un navegador ni
se probó el proveedor de IA real.

No hubo migraciones, adaptadores, cambios en la base de trabajo ni commits.
Los cambios de 12a–12d permanecen conservados. El esquema de esos pasos
requiere una base de desarrollo nueva; su preparación corresponde al 13.

Al revisar la conexión externa se identificaron dos asuntos para el 13:
`api-gateway/main.go` acepta `X-Dev-Bypass` en rutas protegidas, y
`ai-gateway/config.go` mantiene un valor predeterminado fijo para el secreto
compartido. No se corrigieron en este paso. La fase 1 verificada en
DoctorChart no demuestra la seguridad completa de esos gateways externos.

## Verificación

- Baseline: 533 pruebas frontend, 563 backend y suite Go aprobadas.
- Frontend: 540 pruebas aprobadas en 56 archivos; compilación de navegador
  y servidor aprobada. Permanece el aviso de bundle inicial: 1,26 MB / 1 MB.
- Backend: 599 pruebas aprobadas en el gate habitual con Java 25 y PostgreSQL 17 descartable; los casos
  nuevos cubren retiradas, configuración vigente, aislamiento, no escritura
  ante denegaciones, permisos HTTP, preview, catálogos y seed pediátrico.
- IA gateway: 30 pruebas principales Go aprobadas, incluidos casos de
  denegación, identidad falsificada, backend caído, cambios de configuración
  y herramientas; `go vet ./...` aprobado.
- Comandos: `npm test -- --watch=false`, `npm run build`,
  `./mvnw test -Dtest=*,!DoctorchartApplicationTests`, `go test ./...`,
  `go vet ./...` y `git diff --check`.
- Se excluye el smoke H2 `DoctorchartApplicationTests`, como en las fases
  anteriores; las integraciones de persistencia usan bases descartables.
