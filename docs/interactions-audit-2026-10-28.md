# Respuesta de controles y esperas — 28/10/2026

Revisión transversal de los 226 enlaces de eventos `click`/`ngSubmit` de las
plantillas y de los mecanismos compartidos de navegación, sesión, HTTP y estado.
No equivale a ejecutar cada acción clínica con una cuenta real.

## Problemas comprobados y corrección

- La sesión anunciada por Auth podía quedar disponible mientras `authReady`
  seguía esperando `getSession`. Los guards ahora pueden continuar con el evento
  de sesión. Una regresión simula `getSession` que nunca responde.
- Inicialización, login, renovación de plan y cierre de sesión no tenían límite
  de espera en la integración SDK. Terminan a los 15 segundos con error visible;
  un cierre fallido conserva la sesión en pantalla.
- El transporte Auth también aborta conexiones/cuerpos de respuesta a los 12 s,
  preservando la señal de cancelación del llamador. Se prueba conexión atascada,
  cancelación y plazo activo después de recibir cabeceras; no solo el spinner.
- El transporte fetch del SDK también se aborta a los 12 segundos, manteniendo
  las señales de cancelación del llamador y del Request. El límite sigue activo
  al leer el cuerpo de la respuesta; no se limita a ocultar el spinner mientras
  queda una conexión colgada.
- Las peticiones de las pantallas podían dejar `loading`/`saving` indefinidos
  cuando la conexión no respondía. El interceptor común limita la inactividad
  a 20 segundos (60 para FormData), propaga el error y libera el indicador.
- Los guards que rechazaban una navegación no explicaban el clic fallido. El
  estado global muestra carga, cancelación rechazada y error. Una navegación
  que no termina se aborta a los 15 segundos, evitando abrir la página tarde.
- Login descarta envíos repetidos mientras procesa. Los controles sin petición
  tienen respuesta visual al presionar. Los formularios conservan sus estados
  y validaciones específicas.

El indicador no intercepta los clics ni oculta el documento. No se reintentan
escrituras automáticamente: un timeout no demuestra que el servidor no guardó.
El aviso pide comprobar el resultado antes de repetir una operación incierta.
Se mantienen contratos, autorización, historial y módulos suspendidos.

## Verificación

- Suite completa final: 663 pruebas aprobadas, incluyendo inicialización y
  aborto del transporte Auth.
- Build optimizado, SEO y hosting estático aprobados, con clave pública ficticia
  de ensayo. No publicar ese build.
- Navegador: portada, FAQ, acceso a login y validaciones; vistas 390 px y 1440 px,
  sin errores de consola. Sin credenciales reales ni escrituras remotas.
- Angular 22 ya habilita hidratación incremental por defecto: no se agregó una
  segunda configuración de replay ni se atribuye el problema a falta de replay.

Queda por contrastar el fallo intermitente del propietario en su sesión y red
reales. La revisión y las pruebas no permiten afirmar que el 100% de las acciones
clínicas se ejecutó de punta a punta en navegador.
