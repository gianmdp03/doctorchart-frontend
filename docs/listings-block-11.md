# Bloque 11: listados y estadísticas

## Resultado

El backend filtra y cuenta todos los pacientes/consultas antes de paginar.
El directorio envía búsqueda y filtro juntos; el total corresponde al conjunto
filtrado. Nombre, DNI y teléfono participan en la búsqueda.
Vacunación pendiente ya usa los estados y aplicaciones del catálogo backend,
en lugar del valor false fijo que volvía vacío ese filtro.

El historial busca en toda la base del médico y permite continuar a las páginas
siguientes. El dashboard consume los totales completos y las ocho consultas
recientes con sus datos de paciente en una sola respuesta.
Se eliminaron las descargas de 50 pacientes/100 consultas, las llamadas
adicionales por paciente, las mezclas de listas y el cálculo local de estadísticas.

## Experiencia conservada

Se mantienen tarjetas, filtros, tablas, columnas, estilos, notas rápidas y
acciones de apertura de ficha/detalle. Los datos y resúmenes del wizard conservan
su renderizado. El directorio conserva el scroll incremental; el historial
carga páginas al desplazarse y también ofrece Cargar más consultas.
Las fechas se presentan en dd/MM/aaaa.

La edad y grupo de cada tarjeta proceden del servidor. El navegador conserva
la tarea de presentar etiquetas, colores, fechas y resúmenes clínicos.
Los números pueden corregirse donde antes se calculaban sobre un conjunto
incompleto; un filtro ya no pierde coincidencias por la página descargada.

AccountReadScope cancela lecturas anteriores y descarta respuestas de otra
cuenta, incluso antes de que se ejecute el efecto de cambio de usuario.
Se aplica al directorio, historial, métricas, acceso rápido y búsqueda global.
Los temporizadores se cancelan al limpiar, recargar o destruir la pantalla.
Los errores se muestran con reintento; una estadística fallida no se convierte
en cero atenciones.

## Límites y verificación

[Contrato backend](../../doctorchart-backend/docs/listings.md).

No se agregaron tablas ni columnas; se incorpora un índice de consultas por
paciente. La base de trabajo quedó intacta, sin migraciones de datos,
adaptadores ni un commit. No se avanzó al bloque 12 de experiencias por
especialidad ni al bloque 13 de configuración y almacenamiento.

- Antes de editar: 17 pruebas frontend y 37 backend focalizadas aprobadas.
- Frontend completo: 497 pruebas aprobadas en 55 archivos.
- Producción del navegador y servidor compilada. Permanece el aviso existente
  de bundle inicial de aproximadamente 1,25 MB frente al presupuesto de 1 MB.
- PostgreSQL descartable: búsqueda y filtros completos, permisos, totales,
  calendario, límites temporales, orden estable y ausencia de consultas por tarjeta.
- Gate backend completo: 551 pruebas aprobadas con
  ./mvnw test -Dtest=*,!DoctorchartApplicationTests (Java 25). Se excluye el smoke
  sobre H2, como en los bloques anteriores.
- Verificación final del índice y lectura de 20 tarjetas: prueba específica
  aprobada en PostgreSQL descartable después de agregar el índice.
- git diff --check en ambos repositorios: sin errores de espacios.
