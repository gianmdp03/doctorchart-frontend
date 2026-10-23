# Formularios e historias clínicas

Los formularios de paciente y consulta conservan la validación desde su apertura, pero muestran los errores de campo sólo después de intentar guardar. El botón permite ese intento sin enviar datos inválidos y enfoca el primer campo que requiere corrección. Los avisos desaparecen a medida que se corrigen los valores. Abrir otra edición reinicia el estado visual.

El mismo criterio se aplica a agregar medicamentos/estudios, emitir documentos, crear categorías/campos, editar metadatos de especialidades e ingresar a la cuenta. Cada acción tiene su propio estado de validación. Agregar correctamente un medicamento o estudio limpia los avisos para el siguiente elemento.

Las historias de un paciente empiezan colapsadas. El encabezado compacto muestra nombre del paciente y fecha/hora; no deja un cuerpo o pie vacío. Se puede abrir una, expandir todas o colapsar todas. Una actualización de la lista conserva las elecciones explícitas y no vuelve a abrir historias cerradas.

Desde el detalle, el enlace de regreso apunta a `/pacientes/:id?tab=historia`, usando el paciente del registro cargado. El breadcrumb también regresa a ese paciente.

## Verificación

636 pruebas de Angular, compilación de producción y prueba de hosting estático satisfactorias. Las regresiones cubren errores después del intento, ausencia de envío inválido, corrección y reinicio de avisos, estado de las historias y destino del enlace de regreso.

Se revisaron 60 variantes visuales (seis estados, cinco anchos, dos temas) con componentes Angular y datos ficticios. Las capturas y el informe están en `test-results/validation`. No se modificó el backend ni se desplegó.
