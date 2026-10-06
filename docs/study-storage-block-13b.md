# Archivos de estudios — bloque 13b

La experiencia de subir, listar, abrir, descargar y eliminar estudios se conserva.
El servicio clínico delega los archivos en `StudyFileStorage`; `LocalStudyFileStorage`
implementa el almacenamiento privado local. Cambiar de proveedor de almacenamiento
no requiere volver a introducir operaciones de disco en el servicio de pacientes.
Los permisos por médico, paciente y módulo de especialidad siguen en backend.

## Almacenamiento y configuración

- `STUDIES_STORAGE_DIR` es obligatorio: directorio absoluto, escribible, fuera del
  repositorio, sin enlaces simbólicos ni junctions. No publicarlo mediante un servidor
  de archivos estáticos. En un despliegue debe montarse como volumen persistente.
- La configuración local privada del backend ya apunta a
  `%LOCALAPPDATA%/DoctorChart/medical-studies`, desde `secrets.properties` en su raíz.
  Reiniciar el backend para cargarla. El ejemplo versionado deja el valor vacío.
- En POSIX el directorio requiere permisos `700`; los objetos usan `600`. En Windows
  se heredan las ACL de la carpeta: limitar el acceso al usuario del servicio y
  administradores. La aplicación no configura ni verifica esas ACL de Windows.
- El nombre físico es un UUID generado por el servidor. El nombre original se guarda
  como metadato; se rechazan rutas, caracteres de control y nombres ambiguos.
- `/uploads/` está excluido de Git y del contexto Docker. Se retiró del índice el
  estudio que estaba versionado, conservando su copia física. No se reescribió el
  historial de Git: el archivo sigue presente en commits anteriores.

## Validación y contrato

El servidor verifica el contenido del archivo sin confiar en el MIME del navegador:
PDF sin cifrar y con páginas válidas, o imágenes JPEG, PNG, WebP, GIF, BMP y TIFF.
La extensión debe corresponder al formato reconocido. SVG y archivos disfrazados
se rechazan. Esta inspección de formato no constituye un análisis antivirus ni
sanitiza los contenidos internos de un PDF.

El máximo por archivo es **25 MiB**; la petición multipart admite **26 MiB** para
incluir sus campos y delimitadores. Se controla también el tamaño real del flujo
copiado. Las imágenes admiten hasta 40 millones de píxeles y se decodifican con
muestreo; hay dos validaciones simultáneas por instancia. La descripción admite
4000 caracteres. Los rechazos usan códigos y mensajes controlados, incluidos 413
por tamaño y 415 por formato.

La lista y el detalle usan `uploadedAt` y `originalFileName`. El nombre físico
`storedFileName` deja de salir en el DTO. El frontend muestra la fecha real del
backend como `dd/MM/aaaa`, conserva las acciones existentes y muestra los errores
de carga sin repetir mensajes técnicos del servidor. La apertura de la vista
previa usa `noopener,noreferrer`; la respuesta del archivo incluye `no-store`,
`nosniff` y una política de contenido restringida.

La lectura de PDF usa [PDFBox 3.0.8](https://pdfbox.apache.org/download.cgi) y la de
WebP usa [TwelveMonkeys 3.15.0](https://github.com/haraldk/TwelveMonkeys/releases/tag/twelvemonkeys-3.15.0).
La muestra WebP de pruebas proviene de ese proyecto y conserva su licencia junto
al archivo. Las pruebas no dependen de descargas de imágenes durante su ejecución.

## Consistencia entre base y archivos

- Si falla el alta o se revierte su transacción, se elimina el archivo ya escrito.
  Una carga fallida antes de guardar sus metadatos también limpia su copia parcial.
- Una baja guarda una intención en `study_file_deletions` dentro de la misma
  transacción que elimina el registro. El archivo se borra después del commit;
  un rollback conserva tanto el archivo como el registro.
- Un fallo del disco conserva la intención para reintentar. El trabajo continúa
  con las siguientes entradas, en lotes de 100 y con bloqueo de cada intención.
  También se recuperan intenciones pendientes tras reiniciar el proceso.
- Eliminar un paciente aplica el mismo circuito a todos sus adjuntos, aunque el
  módulo de estudios esté deshabilitado para su especialidad.
- El mantenimiento comienza a los 30 segundos y se repite cada cinco minutos
  mientras el backend esté ejecutándose. Además revisa objetos de más de 24 horas
  con claves generadas por el servidor y sin referencia en la base. Conserva los
  referenciados, recientes y archivos desconocidos. Si no puede consultar la base,
  no continúa con el borrado de huérfanos.

El almacenamiento y la base deben respaldarse juntos. Un volumen ausente o perdido
no se reconstruye desde los metadatos de un estudio.

## Verificación y alcance

- Backend: `mvnw.cmd clean package -Dtest=*,!DoctorchartApplicationTests`; 642 pruebas,
  incluidas transacciones PostgreSQL reales, rollback de altas y bajas, eliminación
  de pacientes, recuperación de pendientes, continuidad ante errores, permisos,
  formatos reales y rechazo de junctions en Windows.
- Frontend: 544 pruebas Angular y 3 de configuración aprobadas; compilación de producción aprobada,
  inyectando explícitamente la configuración pública local. Se conserva el aviso
  previo de bundle inicial de aproximadamente 1,26 MB.
- El JAR no incorpora secretos ni el almacenamiento de estudios.

El smoke antiguo de contexto H2 permanece fuera del gate; la base nueva y el
recorrido conectado completo corresponden a 13d. No se migraron archivos ni
registros anteriores, no hay adaptadores para claves antiguas, no se reinició ni
vació la base de trabajo y no se hicieron commits. Los estudios con las claves
antiguas no pertenecen al contrato nuevo; se usarán registros nuevos en la base
prevista para 13d. El almacenamiento del navegador corresponde a 13c.
