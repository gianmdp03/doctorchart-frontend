# Bloque 7: impresión vinculada al documento

## Resultado y presentación

Se conserva la vista previa con receta y orden de estudios, A4 doble vía
(original y duplicado), A5 simple, cierre por Escape y botón de impresión del
navegador. Se eliminaron matrículas y datos de clínica de ejemplo, IDs y fechas
sustituidos por valores inventados, QR decorativo, firma digital registrada,
vencimiento fijo y leyendas de validación sin una implementación que las respalde.
El pie conserva la referencia del documento y el espacio para firma y sello.

La fecha visible usa dd/MM/aaaa y zona America/Argentina/Buenos_Aires. La edad
corresponde a la fecha de emisión o consulta guardada, calculada en backend.
El DNI es el del paciente; ya no se sustituye por el del responsable.
La ausencia de cobertura se muestra como «No informada», sin asumir «Particular».

## Fuentes de datos

ClinicalDocumentPrintService del backend arma una proyección de un registro
persistido y verifica paciente, documento y propietario. Proporciona contenido,
fecha, referencia, datos del paciente e identidad del autor.

Nombre y matrícula usan los campos full_name y license de la cuenta autenticada,
y se capturan solamente cuando su ID coincide con el autor devuelto por backend.
Son datos declarados en la cuenta, sin una afirmación de validación de matrícula
ni de firma digital. Si faltan, se indica «Nombre no informado» o «Matrícula no
informada». También se eliminó la matrícula de ejemplo del diálogo de perfil.
Los campos opcionales clinic_name, clinic_address y clinic_phone se imprimen
solamente si existen como texto en esa cuenta; no se agregó un formulario de
configuración. Sin nombre de clínica se conserva DoctorChart como marca del software.

La especialidad de una consulta viene de la relación guardada en esa consulta.
Para un registro independiente de receta, viene del workspace actual de su autor:
el bloque 6 no guardó una especialidad ni una copia histórica de las credenciales.
Este bloque tampoco introduce ese snapshot ni lo reconstruye a partir de datos
viejos. La vinculación de experiencias y documentos por especialidad sigue en el
bloque 12. Los datos del paciente provienen de su ficha actual relacionada al registro.

Una vez abierta la vista previa, los datos quedan capturados para ese documento;
cambiar el paciente activo o los metadatos de la cuenta no mezcla la hoja con otros
datos. Cambiar de usuario, cerrar la vista previa o abrir otro documento cancela
la lectura pendiente y limpia el estado. La impresión se invalida inmediatamente
cuando cambia la identidad autenticada, incluso antes de renderizar.

## Circuito

Los emisores de eventos mandan solamente source, patientId, id y, opcionalmente,
el tipo de hoja que se quiere ver. El modal obtiene el contenido desde:

| Fuente | GET |
| --- | --- |
| Receta u orden independiente | /api/doctorchart/patients/{patientId}/prescriptions/{id}/print |
| Consulta | /api/doctorchart/patients/{patientId}/encounters/{id}/print |

source distingue identificadores numéricos iguales de tablas diferentes. El código
RX-{id}-{patientId} o HC-{id}-{patientId} se genera desde los IDs persistidos;
es una referencia interna y no un código de verificación pública.

Emitir primero guarda el borrador y luego abre la referencia persistida. Reimprimir
abre la misma referencia. Se eliminó la lectura redundante del store de historial,
pues el endpoint de impresión recupera contenido y contexto juntos. Los errores
muestran un mensaje y dejan la impresión deshabilitada. El modal comprueba que
fuente, paciente, documento, autor y fecha correspondan a la solicitud.

Una consulta se imprime con sus medicamentos y estudios registrados. Si no tiene
contenido, el backend responde EMPTY_DOCUMENT. El botón general ya no arma recetas
con dosis, vía o frecuencia deducidas de la medicación habitual ni usa Date.now().
Se conserva el agregado explícito de medicación habitual al borrador visible.
Los tipos sin medicamentos o estudios se deshabilitan en la vista previa.

## Evidencia

Antes del refactor se aprobaron cuatro pruebas de estructura y contenido para
receta y orden en A4 y A5. Las mismas comprobaciones de hojas, secciones, controles
e ítems pasan con el nuevo circuito. No son una comparación de píxeles ni una prueba
con impresora física.

Después: 24 pruebas de modal e integración con HttpClient, y 16 pruebas HTTP/JPA
contra PostgreSQL descartable. Incluyen errores, suplantación de IDs y autor,
permisos, consultas vacías, datos faltantes y cancelación de respuestas pendientes.

Suites completas: 438 pruebas frontend en 53 archivos y 531 backend aprobadas.
Backend conserva la exclusión previa de DoctorchartApplicationTests (smoke H2).
Build de producción aprobado; permanece el aviso de tamaño del bundle inicial
(~1,25 MB frente a 1 MB). La limpieza final de bindings y estilos del modal se
verificó nuevamente con las 24 pruebas de impresión.

No se ejecutaron cambios contra la base de aplicación, migraciones de datos,
adaptadores del evento anterior ni commits. El siguiente bloque es el 8, para el
resto del contexto de sesión, pacientes, borradores y conversaciones.
