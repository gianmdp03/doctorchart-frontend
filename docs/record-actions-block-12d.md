# Bloque 12d: acciones comunes de la ficha por especialidad

Actualización posterior: la disponibilidad backend se completó en [12e](record-availability-block-12e.md). Las referencias a pendientes de este documento describen el cierre de ese paso.

Este paso configura las acciones comunes de la ficha y sus accesos repetidos.
El bloque 12 sigue abierto: falta aplicar la disponibilidad de módulos y
acciones en los servicios backend. No se inició el bloque 13.

## Persistencia y administración

`specialties.patient_record_actions` es una lista JSONB obligatoria y ordenada,
independiente de navegación, pestañas y wizard personal. El workspace devuelve
la configuración vigente de su especialidad. Las tres listas usan la revisión
optimista `specialtyVersion`; editar una conserva las otras dos.

Acciones implementadas:

| ID | Alcance frontend |
| --- | --- |
| EDIT_PATIENT | Edición del paciente desde cabecera, menú y Datos del paciente. |
| NEW_ENCOUNTER | Nueva consulta desde cabecera e historial, incluido el estado vacío. |
| VIEW_GROWTH | Acceso del menú a la pestaña de curvas. |
| PRINT_DOCUMENT | Impresión desde cabecera, recetas, detalle de consulta y vista previa del documento. |

Una especialidad nueva comienza con `EDIT_PATIENT` y `NEW_ENCOUNTER`.
Pediatría declara explícitamente las cuatro acciones en su orden actual.
No se deducen funciones del código o nombre de especialidad. Se permite una
lista vacía: retira estas acciones sin retirar las pestañas de lectura.

Endpoints exclusivos de `SUPER_ADMIN`, protegidos también en el servicio:

- `GET /api/doctorchart/admin/specialties/experience-record-actions`: catálogo de IDs.
- `GET /api/doctorchart/admin/specialties/{id}/experience`: configuración y revisión.
- `PUT /api/doctorchart/admin/specialties/{id}/experience/patient-record-actions`: reemplazo de acciones.

```json
{
  "expectedVersion": 0,
  "patientRecordActions": ["NEW_ENCOUNTER", "EDIT_PATIENT", "PRINT_DOCUMENT"]
}
```

Se rechazan tipos incorrectos, IDs desconocidos, duplicados, listas demasiado
largas, campos ajenos y versiones faltantes. `INVALID_EXPERIENCE` devuelve 400;
una revisión vencida, `VERSION_CONFLICT`/409; una especialidad inexistente, 404.
Dos cambios simultáneos de acciones/pestañas/navegación no se sobrescriben.
No se agregó un editor visual para esta API ni se alteró el editor del wizard.

## Interfaz y ejecución

El registro `patient-record-actions.ts` contiene presentación y ubicaciones
implementadas. `PatientRecordActionsService` usa selección y orden del workspace.
La cabecera compone sus botones y menú desde ese registro. Editar mantiene sus
dos ubicaciones actuales; Nueva consulta sigue como botón principal; Curvas e
Imprimir siguen en el menú. Dentro de cada grupo se respeta el orden configurado.
Los textos, iconos y clases CSS pediátricos se conservan.

La acción de curvas requiere además la pestaña `GROWTH` y el interruptor personal
`GROWTH_CHARTS`. El menú conserva su condición pediátrica de paciente menor de
18 años. Retirar el acceso rápido no retira una pestaña de curvas configurada:
ambas composiciones tienen responsabilidades independientes.

Los handlers de cabecera/ficha comprueban la selección vigente al ejecutarse.
Los accesos repetidos de edición y nueva consulta usan la misma selección.
Retirar esas acciones cierra sus diálogos abiertos. Retirar impresión elimina
sus botones y bloquea apertura, descarga del documento y `window.print()` desde
la vista previa. Una respuesta pendiente o un guardado previamente iniciado
no puede abrir la impresión después de retirar la acción. Un guardado aceptado
previamente puede terminar; no se revierte ni se elimina su documento.

Guardar recetas en historial sigue siendo una operación distinta de imprimir:
retirar impresión conserva el borrador y permite ese guardado dentro del módulo
de recetas. Los permisos de propiedad y paciente–consulta existentes se conservan.

La cabecera ahora observa cambios en su entrada de paciente para actualizar sus
datos y la condición de edad del acceso a curvas. La prueba del historial vacío
detectó también una lista de consultas memorizada por un computed con una entrada
no reactiva; esa entrada conserva su API y ahora invalida el resultado al cambiar.

## Límites

Esta lista gobierna las cuatro acciones comunes; las operaciones internas de
cada módulo (por ejemplo editar/eliminar una consulta, guardar/eliminar recetas,
adjuntar estudios o registrar vacunas) conservan su implementación y permisos
actuales. No es un sistema nuevo de roles o permisos individuales por operación.
Para una acción común nueva se implementa su operación, se registra su ID en
backend y su presentación/handler frontend, y luego se selecciona por especialidad.

Todavía se pueden invocar directamente las APIs clínicas de una función omitida:
la disponibilidad en servicios backend es el paso 12e pendiente. Esta selección
frontend no sustituye autorización backend. La configuración se refresca al
recargar el workspace; no hay notificaciones automáticas entre navegadores.

El esquema requiere una base de desarrollo nueva. No hay migraciones, backfills
ni adaptadores. No se modificó ni reinició la base de trabajo. Se conservaron
los cambios anteriores sin commit y no se hizo commit.

## Verificación

- Baseline: 518 pruebas frontend y 44 backend del circuito afectado aprobadas.
- Frontend final: 533 pruebas aprobadas en 56 archivos. Incluye selección/orden,
  textos pediátricos, acciones vacías, accesos repetidos, handlers, cierre de
  diálogos, cambios de paciente, historial vacío y respuestas tardías de impresión.
- Backend final: 563 pruebas aprobadas en el gate habitual, con PostgreSQL 17
  descartable para integración,
  excluyendo `DoctorchartApplicationTests` (smoke H2). Casos nuevos verifican JSONB,
  selección/orden, lista vacía, aislamiento por especialidad, independencia del
  wizard, validación estricta, permisos y conflicto concurrente de acciones/pestañas.
- Build de producción del navegador y servidor aprobado. Se conserva el aviso
  de bundle inicial existente: aproximadamente 1,26 MB frente al presupuesto de 1 MB.
- No se realizó comparación visual en navegador; se verificaron los elementos
  y textos mediante pruebas de componentes y se conservaron sus clases/estilos.

Comandos: `npm test -- --watch=false`, `npm run build` y
`mvnw.cmd test -Dtest=*,!DoctorchartApplicationTests` con Java 25.
