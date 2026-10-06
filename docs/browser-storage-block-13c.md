# Almacenamiento del navegador — bloque 13c

El historial clínico de cálculos se consulta y guarda exclusivamente mediante el
backend. Se eliminó la segunda copia de nombres, pacientes, entradas y resultados
que `MedicalCalculatorsService` escribía en `localStorage`. El guardado clínico sigue
esperando la confirmación del servidor y usando sus resultados oficiales.

## Qué se conserva y dónde

| Información | Ubicación y duración |
| --- | --- |
| Tamaño de letra | `localStorage`, preferencia visual del navegador; admite normal, grande y muy grande |
| Paciente seleccionado | `sessionStorage`, sólo ID positivo por cuenta y pestaña; se vuelve a consultar al backend antes de mostrar la ficha |
| Historial clínico y favoritos de calculadoras | Backend, con los permisos y relaciones existentes |
| Cálculos sin paciente | Memoria de la aplicación, hasta 50 resultados recientes; sobreviven a la navegación dentro de la misma app |
| Formularios, resultados de vista previa y conversaciones | Memoria, con la invalidación de contexto ya implementada en los bloques anteriores |
| Sesión de autenticación | Continúa administrada por el SDK de Supabase con `persistSession`; este bloque no reemplaza el circuito de autenticación |

`BrowserUiStorageService` concentra los usos explícitos del almacenamiento de la
aplicación. Su interfaz admite exclusivamente tamaño de letra e ID de selección;
no ofrece almacenamiento de objetos clínicos o JSON arbitrario. Valida lo leído y
tolera excepciones de lectura/escritura, cuotas y almacenamiento bloqueado. Durante
SSR no accede a los objetos del navegador. Supabase conserva su almacenamiento de
sesión separado de esta interfaz; su token sigue autorizándose en el gateway.

`CalculatorSessionHistoryService` administra solamente resultados temporales sin
paciente. No accede a `localStorage`, `sessionStorage` ni backend. Su modelo no
contiene ID ni nombre de paciente y no copia campos adicionales recibidos. Los
resultados anteriores dejan de ser visibles inmediatamente al cambiar la cuenta,
se limpian al procesar el cambio o cerrar sesión y no reaparecen al volver a la
cuenta anterior. Una renovación de la misma cuenta conserva la sesión actual.

## Comportamiento de la interfaz

Se conservan las calculadoras, estilos, resultados, copia al portapapeles, guardado
clínico, filtros, historial y controles de accesibilidad. Con paciente, el historial
usa los registros del servidor. Sin paciente, se puede guardar, consultar, copiar
y vaciar los cálculos recientes de la sesión. El botón dice **Guardar en la sesión**
y su ayuda aclara que esos resultados se pierden al recargar o cerrar sesión.
No se agregó una nueva pantalla ni se modificaron las especialidades o el wizard.

Recargar la misma pestaña conserva el ID del paciente seleccionado y vuelve a
validarlo con el backend. La selección deja de persistir entre sesiones cerradas
del navegador y se retira al cerrar sesión. Otra pestaña administra su propia
selección; una pestaña duplicada puede heredar inicialmente el `sessionStorage` de
su origen, pero los cambios posteriores quedan separados. Si falla la carga de un
paciente diferente, no queda guardada la selección anterior para restaurarla por
error. Denegaciones, respuestas de otro paciente y respuestas tardías siguen sin
incorporarse a la ficha.

Las peticiones al API clínico y a IA usan `transferCache: false`, también cuando no
hay token: Angular no incorpora esas respuestas al estado de hidratación del HTML.
No se incorporan service workers, IndexedDB ni caches persistentes para datos
clínicos. Esto no elimina la memoria necesaria para mostrar la ficha durante su uso.

## Verificación y alcance

- Antes del cambio: 59 pruebas aprobadas en las cuatro áreas afectadas.
- Después: 85 pruebas específicas aprobadas en siete archivos, incluidos cambios
  de cuenta, logout, respuestas tardías, fallo temporal al seleccionar otro paciente,
  almacenamiento bloqueado, validación de IDs, SSR y conservación de la experiencia
  de calculadoras. La prueba de guardado clínico comprueba que no crea otra copia
  de historial en la sesión temporal.
- Suite completa: **565 pruebas en 58 archivos**, sin fallos.
- Compilación de producción de navegador y servidor aprobada usando explícitamente
  los valores públicos locales. Continúa el aviso previo de bundle inicial de
  aproximadamente 1,26 MB. Pruebas de configuración: 3 aprobadas.
- Revisión de fuentes: las lecturas y escrituras explícitas del almacenamiento del
  navegador quedan únicamente en `BrowserUiStorageService`; no queda lectura ni
  escritura de historial clínico local. No se modificó el backend ni los gateways.

No se migraron, recuperaron ni adaptaron historiales o selecciones del almacenamiento
anterior. Los valores ya existentes en un navegador antiguo no se borran mediante
código de compatibilidad; se debe usar almacenamiento limpio para la verificación
de base nueva prevista en 13d. Este bloque no vació la base de trabajo ni hizo
commits. El arranque completo y el recorrido conectado quedan para 13d.
