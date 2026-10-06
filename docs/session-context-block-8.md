# Bloque 8 — Contexto de sesión

Estado: cumplido. Corresponde al bloque 8 del plan acordado; el siguiente es el 9, mediciones.

La persistencia local de calculadoras y de la selección del paciente descrita en
este cierre histórico se revisó posteriormente en [13c](browser-storage-block-13c.md):
historial clínico exclusivamente en backend, cálculos sin paciente en memoria e ID
de selección por cuenta y pestaña en `sessionStorage`.

## Comportamiento

El contexto clínico se identifica por cuenta autenticada y paciente seleccionado. Cambiar cualquiera de ellos invalida el estado anterior. Actualizar datos del mismo paciente y renovar la sesión de la misma cuenta conservan el contexto.

- La selección del paciente guarda solamente su ID, con una clave por cuenta. Al restaurarla se consulta el backend antes de mostrar la ficha. Se eliminó la lectura de la ficha clínica completa y la detección de autenticación por claves de Supabase en localStorage.
- Al seleccionar otro paciente se retira la ficha anterior mientras carga la nueva. Las respuestas anteriores se cancelan y se verifica cuenta, generación e ID. Una denegación de acceso no deja visible la ficha anterior.
- El chat limpia mensajes, borrador, avisos y solicitud pendiente al cambiar de contexto. Limpiar la conversación también cancela una respuesta pendiente. El borrador anterior no puede enviarse al paciente nuevo, incluso antes de ejecutar los efectos de Angular.
- Las calculadoras limpian todos sus formularios, resultados, avisos y filtros al cambiar de contexto. Historial, autocompletado, guardado y vista previa no incorporan respuestas de otro contexto. El historial local pertenece a una cuenta y la interfaz muestra y borra solamente la selección del paciente actual; los cálculos sin paciente forman un contexto separado.
- Recetas y órdenes limpian borradores e historial al cambiar de contexto. Las respuestas de otra cuenta no disparan impresión ni avisos. Las consultas, estudios y aplicaciones de vacunas rechazan respuestas tardías; los estudios limpian el archivo seleccionado y liberan URLs de previsualización.
- Los diálogos de consulta e impresión se cierran al cambiar de paciente o cuenta y bloquean acciones inmediatamente. Los eventos de consultas incluyen patientId y solamente refrescan la ficha correspondiente.
- La vista de la aplicación se vuelve a crear cuando cambia la identidad o el acceso administrativo. El dashboard y los listados cancelan sus lecturas al destruirse, y el directorio también cancela su búsqueda diferida. Refrescar el token o metadatos de la misma cuenta conserva la pantalla y sus borradores.

## Límites del bloque

Se mantienen formularios, estilos, formatos de impresión y fechas del flujo pediátrico. Las pruebas de presentación de las ocho calculadoras y de A4/A5 continúan pasando. No se cambian definiciones ni reglas del wizard.

El backend no requirió modificaciones: continúa autorizando cada paciente y persistiendo consultas, recetas, estudios, vacunas y cálculos mediante los contratos existentes. Cancelar una solicitud del navegador evita actualizar un contexto posterior; no revierte una escritura que el servidor ya haya recibido.

El asistente utiliza el gateway externo ya configurado y conserva su contrato {message}. Este bloque aísla la conversación del frontend; no agrega persistencia ni un protocolo de conversaciones en ese servicio externo.

Las nuevas claves locales no leen ni convierten las anteriores. No se incorporan migraciones ni adaptadores. La unificación de mediciones corresponde al bloque 9; calendario y reglas de vacunación, al 10; filtros y agregados completos del backend, al 11.

## Evidencia

- Antes del bloque: 438 pruebas frontend en 53 archivos aprobadas.
- Después: npm test -- --watch=false, **478 pruebas en 53 archivos aprobadas**, incluidas 40 nuevas. Se prueban cambios de cuenta/paciente, logout, restauración autorizada, cancelaciones, respuestas antes de efectos, orden de lecturas, limpieza de borradores y recreación del componente en una ruta real.
- npm run build: compilación de producción del navegador y servidor aprobada. Continúa el aviso de tamaño inicial de aproximadamente 1,25 MB frente al presupuesto de 1 MB, ya presente antes de este bloque.
- git diff --check: sin errores de espacios.

Los cambios quedan sin commit para mantener el esquema de un commit por bloque elegido por el usuario.
