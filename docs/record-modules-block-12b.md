# Bloque 12, paso B: módulos de la ficha

Actualización posterior: las pestañas se completaron en [12c](record-tabs-block-12c.md).
Las acciones comunes se completaron en [12d](record-actions-block-12d.md).
El estado vigente del bloque está en [el plan](refactor-plan.md).

## Resultado

PatientRecordComponent compone la ficha, selecciona la pestaña, atiende la
ruta y abre los diálogos comunes. Las operaciones y campos de consultas,
curvas y recetas dejaron de pertenecer al componente principal.

| Módulo | Responsabilidad |
| --- | --- |
| patient-summary | Renderizar el snapshot del formulario del paciente y solicitar su edición. |
| patient-encounters | Historial de consultas, carga, detalle, eliminación e impresión desde la consulta. |
| patient-growth | Lectura de mediciones backend, transformación para gráficos, selección de métrica y reintento. |
| patient-prescriptions | Editor, borradores, historial persistido, guardado, eliminación e impresión de recetas y órdenes. |
| patient-vaccinations | Componente y estado de vacunación ya separados; contrato conservado. |
| patient-studies | Componente y estado de archivos ya separados; contrato conservado. |

Los módulos nuevos tienen sus propias plantillas y estilos. La lógica de
recetas se divide entre PatientPrescriptionEditorStore y el historial HTTP
PatientPrescriptionStore, que ahora vive en la carpeta del módulo, junto
con sus pruebas. No quedó un archivo anterior que reexporte o adapte ese store.

## Estado y comunicación

Los stores de consultas, crecimiento y recetas se proporcionan por instancia
de ficha, no como singletons globales. Cambiar una pestaña destruye su vista,
pero conserva el borrador, historial y selección de métricas del registro
actual. Cerrar la ficha destruye sus stores y cancela sus suscripciones.
Abrir otra ficha crea estado independiente.

Cada store observa paciente y cuenta y conserva las comprobaciones de
respuestas tardías. Los borradores se limpian al cambiar de contexto; una
respuesta de guardado anterior no puede abrir la impresión ni agregar un
documento al historial del paciente nuevo. La ficha conserva únicamente
la limpieza del estado de sus diálogos y la selección de pestaña.

Resumen y consultas solicitan la apertura de diálogos mediante outputs.
El módulo de recetas recibe la consulta más reciente como input para
conservar el comportamiento de impresión cuando no hay borrador ni una
receta guardada. No importa ni utiliza el store del módulo de consultas.
El banner comunica la misma acción mediante la composición de la ficha.
La impresión sigue enviando referencias de documentos persistidos; no se
construye una identidad de documento en el navegador.

Cada módulo carga sus propios datos. Se retiró la carga duplicada en
ngOnInit y cambiar la habilitación de curvas ya no recarga consultas ni
reinicia el editor de recetas. Los contadores siguen procediendo de los
stores correspondientes, incluso cuando su pestaña no está abierta.

## Comportamiento conservado

Se mantienen las seis pestañas, su orden y etiquetas, la condición actual
de curvas, formularios, textos, iconos, acciones y eventos de apertura de
documentos y diálogos. El wizard y las altas/ediciones siguen usando los
componentes comunes existentes. No se cambió el contrato HTTP ni el esquema
de persistencia durante este paso.

Se eliminaron helpers de información y antecedentes que ya no participaban
en ninguna plantilla, interfaces sin consumidores y estado de un menú y
herramientas pediátricas que la ficha ya no renderizaba. Sus comprobaciones
de implementación se sustituyeron por pruebas de la vista vigente, sus
inputs/outputs y el aislamiento de estado. Los datos clínicos se siguen
mostrando mediante su snapshot y los componentes actuales.

## Verificación

- Antes de editar: 507 pruebas frontend aprobadas en 56 archivos.
- Suite frontend final: 510 pruebas aprobadas en 56 archivos.
- Casos de regresión: formulario readonly con snapshot, acciones de edición
  y consulta, borrador al cambiar de pestaña, ficha nueva con estado propio,
  cancelación al cerrar, cambio de paciente/cuenta, errores y reintentos,
  guardado previo a impresión, documentos persistidos y consulta como origen.
- Comprobación de valores y orden de declaraciones de 169 selectores CSS
  trasladados, incluidas reglas responsive y de impresión. Cada componente
  nuevo conserva los estilos que utiliza y tiene un host de bloque.
- Build de producción del navegador y servidor aprobado. Se conserva el
  aviso existente del bundle inicial: aproximadamente 1,26 MB frente a 1 MB.
- git diff --check sin errores de espacios.

No se realizó comparación visual en un navegador. La evidencia de este paso
es la suite de componentes, la compilación y la comprobación de estilos.
No se modificó código backend en 12b ni se volvió a ejecutar su suite:
la última comprobación del paso 12a fue de 555 pruebas aprobadas.

## Próximo alcance

El bloque 12 permanece en curso. Siguen pendientes la composición de
pestañas por especialidad, la configuración de acciones y la disponibilidad
de funciones en sus servicios backend. No se empezó el bloque 13.

No se modificó la base de trabajo ni se hizo commit. Al iniciar 12b seguían
presentes los cambios sin commit de 12a; se conservaron. El requisito de
esquema nuevo documentado en 12a corresponde a ese paso anterior.
