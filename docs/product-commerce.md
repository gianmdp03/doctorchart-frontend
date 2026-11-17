# Registro y contratación desde el producto

Las pantallas `/register` y `/pricing` permanecen en DoctorChart.
La identidad se registra e inicia sesión en el mismo Supabase Auth que Bycode.
Nombre y DNI viajan como `full_name` y `dni`, sin asignar roles ni planes desde el navegador.

Los planes usan los mismos endpoints que Bycode bajo `/api/billing`:
`GET /plans`, `GET /plans/contextual`, `GET /proration-preview`,
`POST /checkout` y `POST /checkout/upgrade`.
La página filtra el catálogo del producto, pero Billing decide precios, períodos,
renovaciones, mejoras, prorrateo, titularidad y acreditación. No se duplicaron esas reglas
en los backends de los productos.

El navegador conserva el intento y su Idempotency-Key para reintentar la misma
solicitud cuando el resultado es incierto. Un reintento no genera una nueva identidad
de compra. No descartar manualmente un intento incierto para repetir un cobro.

El checkout incorpora `returnApp: "doctorchart"`. El servidor central valida ese
identificador y resuelve la URL de retorno; no acepta una URL arbitraria del navegador.
Mercado Pago cobra y vuelve a `/pricing`. Los parámetros de regreso no acreditan
ni activan el plan: eso sigue dependiendo del webhook central verificado.

Antes de publicar: autorizar `/register/confirmed` en Auth y en el hook de correo
compartido según conexion-entornos.md; revisar CORS del origen del producto y configurar
el retorno de Mercado Pago desde Billing para el entorno correspondiente.
La confirmación elimina el fragmento del correo y exige un acceso explícito,
conservando cualquier sesión previa. Los enlaces históricos mantienen su compatibilidad.

Validación local: compilación de desarrollo y pruebas unitarias de registro,
confirmación y autenticación; navegador con Auth/Billing/Mercado Pago simulados para
registro, login, catálogo contextual, prorrateo y reintento tras recargar con la misma
clave y cuerpo. No se crearon cuentas ni cobros reales. Queda verificar la configuración
y el recorrido con Auth, correo y Mercado Pago del entorno de publicación.

El plan gratuito queda fuera de este cambio.
