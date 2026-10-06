# Bloque 12, paso A: composición de navegación

Actualización posterior: la disponibilidad backend se completó en [12e](record-availability-block-12e.md). Las referencias a pendientes de este documento describen el cierre de ese paso.

Actualización posterior: las pestañas se completaron en [12c](record-tabs-block-12c.md).
Las acciones comunes se completaron en [12d](record-actions-block-12d.md).
El estado vigente del bloque está en [el plan](refactor-plan.md).

## Alcance terminado

El menú consume los identificadores y su orden desde la especialidad
persistida en el backend. Un registro de pantallas implementadas traduce
los IDs a rutas, etiquetas e iconos; no contiene defaults por especialidad.
Pediatría conserva las cinco entradas existentes, textos, iconos, estilos,
orden, comportamiento del menú colapsado y acceso al wizard.

Las especialidades nuevas arrancan con Inicio, Pacientes y Personalizar
Fichas. Las opciones adicionales se configuran por API administrativa;
no se inventaron funciones de cardiología ni de otras especialidades.

Las rutas de calculadoras y calendario comprueban la composición al entrar
por URL. El acceso rápido a calculadoras usa la misma configuración.
Las comprobaciones de sesión y carga preceden la apertura de pantallas.
El store descarta una configuración desconocida o perteneciente a otra
especialidad antes de reemplazar el workspace actual. La limpieza de sesión
también elimina esta navegación.

[Persistencia y API backend](../../doctorchart-backend/docs/specialty-experiences.md).

## Pendiente dentro del bloque 12

Este paso no termina el bloque 12. La separación del estado y componentes
de PatientRecordComponent se completó posteriormente en [12b](record-modules-block-12b.md).
Faltan la composición de pestañas y acciones, y la disponibilidad de funciones
en los servicios backend. La navegación es selección de pantallas, no un permiso de datos:
omitir el calendario aún no oculta la pestaña de vacunas ni deshabilita su API.
No se comenzó el bloque 13.

El wizard, sus formularios y las funciones clínicas pediátricas conservan
sus contratos. La nueva API administrativa todavía no tiene editor visual.

## Verificación

- Antes de editar: 497 pruebas frontend y 36 backend focalizadas aprobadas.
- Frontend completo: 507 pruebas aprobadas en 56 archivos.
- Compilación de producción del navegador y servidor aprobada; persiste
  el aviso de presupuesto inicial (aproximadamente 1,26 MB frente a 1 MB).
- Backend focalizado: 40 pruebas aprobadas, con PostgreSQL descartable y
  HTTP real para composición, permisos, aislamiento y escritura concurrente.
- Gate backend completo: 555 pruebas aprobadas con Java 25 y
  `./mvnw test -Dtest=*,!DoctorchartApplicationTests`. Se excluye el smoke
  de H2, como en los bloques anteriores; las integraciones usan PostgreSQL
  descartable. Cero fallos, errores o pruebas omitidas en ese gate.
- `git diff --check` aprobado en ambos repositorios.

La base de trabajo quedó intacta. El nuevo campo obligatorio de persistencia
requiere recrear la base de desarrollo con el esquema nuevo; no se escribió
código de migración, adaptación ni carga de datos antiguos. No se hizo commit.
