# Revisión de celular

- En la presentación, el pie duplicado se oculta hasta 768 px y queda un único enlace de acceso a la cuenta en la cabecera. Escritorio conserva sus accesos.
- La navegación clínica se coloca arriba en celular y libera todo el ancho del contenido. Los nombres siguen visibles aunque la preferencia de escritorio sea menú colapsado.
- Directorio e historial muestran cada registro como ficha vertical hasta 768 px. Se conservan todos los datos y acciones.
- La cabecera del paciente distribuye nombre, identificación, cobertura, antecedentes y acciones sin cortar botones. Las pestañas se distribuyen en dos columnas y los filtros de fechas se apilan en pantallas pequeñas.
- La selección de especialidad adapta el espaciado y sus tarjetas a pantallas de 320 px.

## Validación

630 pruebas de Angular y compilación de producción satisfactorias. `scripts/verify-landing.mjs` comprueba presentación en claro/oscuro a 320, 360, 390, 430, 768 y 1440 px, un solo acceso móvil en la cabecera, pie oculto, login, controles, recarga y navegación protegida.

Las capturas en `test-results/mobile` proceden de componentes Angular con datos ficticios. Se comprobaron 190 combinaciones: 19 vistas, cinco anchos (320, 360, 390, 430 y 768 px) y dos temas. Incluyen inicio, pacientes, consultas, registro de paciente, seis secciones de la ficha, detalle/edición de consulta, perfil, edición de campos, especialidad, vacunación, sin plan y administración. El informe `audit.json` no registra desbordes de página ni controles fuera del ancho disponible. Las tablas clínicas amplias que requieren comparación por columnas mantienen su desplazamiento interno.

La comprobación visual utiliza datos de prueba, incluidos estados vacíos; no equivale a una sesión contra producción. No se modificó el backend ni se desplegó.
