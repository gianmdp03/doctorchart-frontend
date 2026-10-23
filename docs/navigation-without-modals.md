# Navegación sin formularios superpuestos

La consulta se carga desde `/consultas/:id`, con lectura y edición en la página. El enlace funciona al abrirlo directamente y al recargar. El perfil vive en `/perfil`; el asistente dispone de `/asistente`, sujeto al flag y módulo existentes (no se habilita la función).

La configuración de campos utiliza toda el área de la página de configuración o administración. Aplicar/cancelar conserva el borrador del formulario principal. El catálogo de calculadoras es una vista de la misma página, identificada por `?vista=catalogo`, para conservar los cálculos de la sesión. Su flag continúa deshabilitado.

Se retiraron los componentes antiguos de detalle, perfil y asistente y los componentes sin uso de login, nuevo paciente, nueva consulta y columnas de pacientes. Crear/editar pacientes y crear consultas conservan sus flujos existentes dentro de la página. Los borrados de estudios, consultas e historial de cálculos requieren confirmación en la sección correspondiente. Los errores de impresión se muestran dentro de la página.

Los menús de navegación, listas de selección y calendario del selector de fechas siguen siendo controles; no contienen formularios superpuestos. La impresión sigue generando el documento PDF.

## Backend y comprobación

La navegación utiliza las API existentes de pacientes y consultas. No cambia el esquema, los contratos, la propiedad de los registros ni el control de versión al guardar. El detalle solicita el registro indicado por la URL y descarta datos previos ante cambio de URL/cuenta, error o respuesta que no corresponde al identificador.

Las pruebas de navegación cubren enlaces directos, volver entre páginas y la eliminación de datos visibles ante una respuesta denegada. La regresión estática detecta formularios dialog, backdrops y llamadas a las confirmaciones nativas. Las capturas en `test-results/theme/pagina-*.png` se generaron a partir de componentes Angular con datos ficticios y se verificaron en cinco anchos y ambos temas.

La comprobación integral local del backend sigue limitada por `bycode-image-email-service-go/pkg/media`, disponible únicamente en producción. No se accedió al VPS ni se ejecutaron migraciones o despliegues.
