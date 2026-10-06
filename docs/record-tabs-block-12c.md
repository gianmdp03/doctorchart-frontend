# Bloque 12c: pestañas de la ficha por especialidad

Actualización posterior: la disponibilidad backend se completó en [12e](record-availability-block-12e.md). Las referencias a pendientes de este documento describen el cierre de ese paso.

Actualización posterior: las acciones comunes se completaron en [12d](record-actions-block-12d.md).
El estado vigente está en [el plan](refactor-plan.md).

Este paso completa la composición de pestañas. El bloque 12 continúa abierto:
faltan las acciones y la disponibilidad de funciones en los servicios backend.

## Composición persistida

Cada especialidad guarda `patientRecordTabs` como una lista JSONB obligatoria y
ordenada. El workspace devuelve la composición vigente de su especialidad;
no la copia al wizard personal, a los pacientes ni a las consultas. La revisión
`specialtyVersion` protege tanto cambios de navegación como de pestañas.

Los módulos implementados son `SUMMARY`, `ENCOUNTERS`, `VACCINATION`, `GROWTH`,
`PRESCRIPTIONS` y `STUDIES`. Datos del paciente y Consultas son comunes y
obligatorios; los demás son opcionales. Una especialidad nueva comienza con
los dos comunes. La semilla de pediatría declara explícitamente los seis en
su orden actual. No se deducen funciones del código o nombre de especialidad.

Para configurar una especialidad existente, el administrador consulta su
experiencia y revisión, y reemplaza únicamente las pestañas mediante:

```http
PUT /api/doctorchart/admin/specialties/{id}/experience/patient-record-tabs
```

```json
{
  "expectedVersion": 0,
  "patientRecordTabs": ["SUMMARY", "ENCOUNTERS", "STUDIES"]
}
```

El catálogo está en `GET /api/doctorchart/admin/specialties/experience-record-tabs`.
Ambos endpoints requieren `SUPER_ADMIN`. Se rechazan IDs desconocidos,
duplicados, tipos incorrectos, módulos comunes faltantes, campos ajenos y
versiones faltantes o vencidas. La navegación se edita en su endpoint propio;
ninguna de esas escrituras sobrescribe la otra composición. No se agregó un
panel de administración visual en este paso.

## Ficha frontend

`patient-record-modules.ts` registra componentes, presentación y conexiones de
entradas/salidas. La ficha compone los botones a partir de la lista recibida y
monta el componente seleccionado mediante `PatientRecordModuleDirective`.
Agregar un módulo no requiere otra cadena de condiciones en el HTML de la ficha.

Pediatría conserva los textos, orden, contadores, formularios y operaciones de
sus seis pestañas. La numeración usa la posición configurada antes de aplicar
el interruptor personal `GROWTH_CHARTS`: cuando se apagan las curvas siguen
siendo «5. Recetas y Órdenes» y «6. Estudios realizados», como antes.

Una pestaña omitida no se monta ni se abre mediante `?tab=...`. Si la
composición cambia mientras está seleccionada, la ficha muestra Datos del
paciente. Los enlaces actuales en español se conservan. Los stores siguen
perteneciendo a la instancia de la ficha, por lo que desmontar un componente
al cambiar de pestaña conserva borradores y selección de curvas. Las entradas
dinámicas se actualizan cuando cambia el paciente y las salidas conservan
las acciones de edición, nueva consulta y actualización de vacunas.

Las curvas requieren simultáneamente la pestaña configurada y el interruptor
del wizard. Al omitirlas se descarta una respuesta pendiente y no se solicitan
nuevas mediciones. Los módulos de estudios y vacunas sólo se crean cuando se
abre su pestaña. El historial de consultas y el store de recetas conservan
su alcance de ficha porque todavía alimentan las acciones del banner.

## Límites al cierre de 12c

La composición de pestañas controla la interfaz. Todavía no configura las
acciones del banner ni impide invocar APIs de un módulo omitido; esos son los
dos pasos pendientes del bloque 12. Los permisos de propiedad existentes
siguen vigentes. La experiencia se actualiza al recargar el workspace, sin
notificaciones automáticas entre navegadores.

El esquema requiere una base de desarrollo nueva. No hay migraciones,
backfills, adaptadores ni reparación de filas existentes. No se reinició ni
modificó la base de trabajo. Se conservaron los cambios previos sin commit
de 12a y 12b y no se hizo commit.

## Verificación

- Baseline frontend: 510 pruebas aprobadas en 56 archivos.
- Baseline backend del circuito afectado: 26 pruebas aprobadas; después de
  conectar el contrato, 40 incluyendo bootstrap HTTP sobre PostgreSQL.
- Frontend final: 518 pruebas aprobadas en 56 archivos. Cubren orden/textos
  pediátricos, otra composición, enlaces directos, módulos omitidos, cambio
  de configuración, entradas/salidas dinámicas y conservación de borradores.
- Backend final: 559 pruebas aprobadas en la suite del gate habitual,
  excluyendo el smoke H2 `DoctorchartApplicationTests`. Pruebas HTTP con PostgreSQL 17 descartable
  verifican JSONB, aislamiento entre especialidades, independencia del
  wizard/workspace, validación, permisos y conflictos concurrentes.
- Build de producción del navegador y servidor aprobado. Se conserva el aviso
  existente del presupuesto de bundle inicial (aproximadamente 1,26 MB/1 MB).

Comandos: `npm test -- --watch=false`, `npm run build` y
`mvnw.cmd test -Dtest=*,!DoctorchartApplicationTests` con Java 25.
La verificación visual de este paso se limita a las pruebas DOM de componentes
y la conservación de estilos; no se comparó en un navegador.
