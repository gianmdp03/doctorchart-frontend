# Revisión individual de controles — DoctorChart

Se inventariaron las 49 plantillas Angular inline/externas con `parseTemplate`:
286 sitios de control (botón, enlace, summary, form y otros elementos con click).
42 pertenecen al módulo de calculadoras suspendido y uno a Google deshabilitado.
El banner de acceso a calculadoras también está condicionado por su flag.
Una fila de tabla repetida cuenta como un sitio, no como cada registro clínico.

El inventario JSON conserva fuente/línea, texto, handler/destino, disabled,
formulario de submit, referencias de implementación y pruebas candidatas.
Los 286 sitios se inventariaron en código; se trazaron los handlers activos y
se preservaron los suspendidos. No se encontró botón sin destino/handler
ni botones sin tipo explícito; los summaries usan comportamiento nativo.
No debe interpretarse como 286 clics ejecutados con una cuenta real.

## Fallos funcionales corregidos

- Cerrar sesión en «Sin plan» ignoraba el error de Auth y enviaba a login aunque
  la cuenta seguía abierta. Regresión DOM falló antes y pasó después: error,
  liberación y nuevo clic exitoso.
- Cerrar sesión desde perfil borraba paciente/perfil antes de confirmar el
  cierre. Regresión DOM falló antes y pasó después: un error conserva contexto.
- Los dos flujos de onboarding tenían la misma limpieza anticipada y no
  controlaban resultados de Auth. Conservan configuración/borrador al fallar,
  con pending/error y liberación; pruebas hacen clic en los botones reales.
- Guardar notas ocultaba el botón y anunciaba «Guardado» aunque el usuario
  escribiera texto nuevo durante la petición. Regresión DOM falló antes y pasó
  después: el borrador nuevo continúa pendiente. Error visible y retry probado.
- El acceso a curvas sin un listener navegaba a `/curvas`, ruta inexistente.
  Ahora abre `/patients/:id?tab=growth`; conserva permisos y contexto infantil.

## Grupos trazados y comprobación

- Público/login/plan/perfil: enlaces/router, formularios, validación, errores,
  sesión, repetición y retorno. Incluye regresiones DOM de cierres fallidos.
- Administración/wizard/editor de campos: selección, categorías/campos/opciones,
  orden, validación, borradores, publicación, conflictos/copia remota y descartes.
  Prueba DOM adicional agrega categoría/campo, aplica y cancela edición local.
- Panel/directorio/consultas: filtros, búsqueda, paginación, reintentos, selección,
  detalle y notas. Los reads usan scopes de cuenta/revisión y cancelación.
- Paciente/historia: tabs configurados, acciones del banner, nueva consulta,
  edición, conflictos, salida/retorno y borradores; fixtures sin datos reales.
- Recetas/órdenes: agregar/quitar/limpiar, historial, guardar, borrar e imprimir;
  se trazaron editor/store/servicio y salida PDF. Las APIs y window.open están
  simulados en pruebas, no equivalen a imprimir un documento clínico real.
- Estudios: selección/limpieza/upload, vista/descarga, cierre y eliminación;
  trazados estado/errores, revisión del paciente y cancelación de solicitudes.
- Vacunación/curvas/calendario: reintento, selección/confirmación, expandir,
  filtros, tooltips y summaries; preservados datos y decisiones del servidor.
- Header/sidebar/menú/perfil/tema/tamaño de letra/fecha: callbacks, destinos,
  outputs padres, comportamiento nativo y foco; sin interceptación global.

## Límite de la verificación

No hay sesión clínica real disponible: las operaciones privadas usan fixtures
y mocks con autorización simulada. No se hicieron escrituras clínicas reales,
impresiones, descargas reales ni pruebas de popup blocker con una cuenta real.
El fallo intermitente original del propietario no está reproducido en DoctorChart.
Los indicadores globales y los límites de espera no se cuentan como arreglo de
cada operación. Sin publicación, cambios de esquema ni datos reales.

Verificación final: 670 pruebas en 77 archivos aprobadas; build optimizado con
clave pública ficticia, SEO y hosting estático aprobados; `git diff --check`
sin errores. El build de ensayo no debe publicarse.
