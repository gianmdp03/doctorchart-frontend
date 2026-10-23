# Vista compacta en celular

El directorio ofrece filas de unos 70 px con nombre, edad y documento. La fila abre la ficha; “Más datos” conserva contacto, controles y estado de vacunación. Se conserva la búsqueda y la carga incremental existente. En escritorio continúa la tabla.

Los filtros usan opciones compactas, el inicio reúne los tres indicadores en una fila y los recordatorios reducen los estados vacíos. La cabecera agrupa identidad y acciones arriba; deja de permanecer encima del contenido durante el desplazamiento. El acceso flotante de volver arriba se oculta en celular para no tapar controles o mediciones.

La ficha reduce el espacio del banner y distribuye sus pestañas en tres columnas. Las alertas clínicas siguen visibles. El selector de curvas se convierte en un desplegable en celular.

Los gráficos conservan puntos, referencias, percentiles, límites y cálculos. ResizeObserver selecciona coordenadas compactas cuando el espacio es estrecho. Se reduce la cantidad de etiquetas y líneas de grilla, sin recortar las curvas ni exigir un lienzo de 1080 px.

El calendario nacional conserva la tabla en escritorio. En celular permite elegir una edad y lista las aplicaciones publicadas para esa columna, incluidas las condiciones, referencias y advertencias de zona de riesgo. Las notas completas están disponibles en secciones desplegables. La vista se adapta automáticamente a las columnas que publique la API; no incorpora reglas clínicas nuevas.

## Verificación

638 pruebas Angular y compilación de producción satisfactorias. Las nuevas regresiones comprueban las veinte referencias de crecimiento en coordenadas compactas sin modificar datos y el filtrado de aplicaciones por edad, notas, riesgo y cambios del catálogo.

Se revisaron 216 combinaciones visuales de 18 vistas, seis anchos (320, 360, 390, 430, 768, 1440 px) y dos temas. El informe `test-results/mobile-density/audit.json` no registra desbordes de página ni controles fuera del ancho disponible. Las vistas de prueba incluyen estados vacíos o de carga; no representan una sesión contra producción. Las capturas usan datos ficticios, incluidos los ejemplos de vacunación. No se modificó el backend ni se desplegó.
