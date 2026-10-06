# Bloque 10: vacunación

## Resultado

El backend controla el catálogo versionado, los identificadores de dosis,
las reglas de edad, el día argentino y los estados del calendario.
Las aplicaciones se guardan por dosis en tablas relacionadas con paciente
y calendario, con permisos y control de concurrencia.

Se eliminaron la dependencia del Gist, los IDs construidos con columnas,
la interpretación de edades desde etiquetas y el reemplazo de toda la lista
de vacunas desde frontend. No se agregaron migraciones ni adaptadores.

## Experiencia conservada

La tabla general conserva vacunas, columnas, textos, notas, estilos y controles.
La ficha conserva los cuatro grupos pediátricos, el orden de sus tarjetas,
la acción de marcar/desmarcar y la edición de fechas con app-date-picker.
Las fechas visibles mantienen dd/MM/aaaa; YYYY-MM-DD se usa en el contrato.
La edad y clasificación llegan resueltas por el servidor.

Checkbox y fecha muestran el valor confirmado hasta que se acepta el guardado.
Un error no deja aplicaciones aparentes ni fechas sin guardar. Los errores
permiten actualizar la ficha y reintentar. Durante una escritura se bloquean
acciones simultáneas; ante un cambio de paciente, cuenta, versión o destrucción
de la pestaña, se cancelan solicitudes y se descartan respuestas anteriores.
Al guardar, se publica la versión nueva de la ficha para las siguientes acciones.

Las reglas conservan el criterio previo; no se agregaron recurrencia anual
ni decisiones clínicas por embarazo o riesgo. Las aplicaciones confirmadas de
versiones anteriores permanecen visibles y usan su propio calendarId al editar.

## Persistencia y límites

[Contrato backend](../../doctorchart-backend/docs/vaccination.md).

El esquema nuevo relaciona calendarios, dosis y aplicaciones. No se reinició
ni modificó la base de trabajo; las pruebas usan PostgreSQL descartable.
El reset de desarrollo sigue previsto para el bloque 13.
No se avanzó sobre listados/estadísticas (11) ni composición de experiencias
por especialidad (12). Los formularios y el motor del wizard se conservaron.

## Evidencia

- Frontend completo: 483 pruebas aprobadas en 55 archivos.
- Pruebas del flujo: guardar, corregir fecha, desmarcar, reabrir pestaña,
  fallos y reintentos, selector de fecha confirmado, conflictos de versión,
  aplicaciones de versiones anteriores y aislamiento de paciente/cuenta.
- Servicios HTTP: contrato por dosis, catálogo backend, caché, cancelación y reintento.
- PostgreSQL descartable: catálogo original conservado, reglas, relaciones,
  permisos, inmutabilidad, historial de versiones y escrituras concurrentes.
- Gate backend completo: 543 pruebas aprobadas, excluyendo el smoke general
  sobre H2 como en los bloques anteriores.
- npm run build: producción del navegador y servidor aprobada. Permanece
  el aviso existente de bundle inicial de 1,25 MB frente al presupuesto de 1 MB.
- git diff --check en ambos repositorios: sin errores de espacios.

Sin commit para mantener un commit por bloque realizado por el usuario.
