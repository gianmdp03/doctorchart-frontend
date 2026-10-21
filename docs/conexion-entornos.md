# Conexión local y producción

El código de las pantallas y servicios es el mismo en ambos entornos. Cambian únicamente los valores públicos usados durante la compilación.

## Desarrollo con Docker

1. Iniciar Docker Desktop y bycode-stack en Ubuntu.
2. En esta computadora ya se creó config/local.public.json, ignorado por Git. Contiene el origen del Gateway, el origen raíz de Supabase (sin /auth/v1), las direcciones de las tres apps y una clave JWT anon pública del Auth local. La firma privada no se copia al frontend. Esta clave anon local vence en un año.
3. Una sola vez, ejecutar PowerShell como administrador y correr:

   & 'C:\Users\gcast\Documents\bycode-stack\scripts\setup-local-browser.ps1'

   Agrega exclusivamente 127.0.0.1 bycode.local al archivo hosts y confía en la CA local para el usuario actual. Reabrir el navegador. Windows exige administrador para hosts; el script no modifica entradas que apunten a otra dirección.
4. En este repositorio ejecutar npm start. Su prestart valida el JSON y genera environment.local.generated.ts, también ignorado por Git.

Bycode usa http://localhost:4200, Pointly http://localhost:4201 y DoctorChart http://localhost:4202. El Gateway y Auth están en https://bycode.local:7999. Usar localhost en el navegador, de acuerdo con las direcciones permitidas; cambiar a 127.0.0.1 implica actualizar también callbacks y CORS.

Para cambiar una dirección o la clave pública, editar config/local.public.json y volver a ejecutar npm start. No editar el archivo TS generado. Un clon nuevo puede copiar config/local.public.example.json a config/local.public.json y completar únicamente la clave anon pública. En esta computadora, el helper node C:/Users/gcast/Documents/bycode-stack/scripts/configure-local-frontends.mjs prepara los tres JSON desde Auth sin abrir dotenv ni imprimir credenciales; no sobrescribe archivos existentes.

La configuración local anterior (Supabase Cloud, puerto 8000 y túneles temporales) no se usa. No se trasladaron usuarios del proyecto Cloud al Auth local: sus bases de usuarios son distintas.

## Producción / VPS

En src/app/core/config/site.config.json completar apiGatewayOrigin con el dominio HTTPS definitivo del Gateway y revisar publicSiteUrl y applicationUrls. Los frontends pueden alojarse fuera del VPS.

Completar supabase.url con el origen raíz público del Supabase del VPS y supabase.publishableKey con su clave anon o publishable. También pueden suministrarse durante la compilación las variables PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_PUBLISHABLE_KEY, por ejemplo desde el panel del hosting. El frontend no lee las variables privadas SUPABASE_KEY ni SUPABASE_SERVICE_ROLE_KEY.

Ejecutar npm run build (o npm run build:deploy). Ambos validan los orígenes definitivos y la clave pública, generan una configuración de producción temporal, compilan y preparan SEO y hosting; la configuración temporal se retira al terminar. La compilación falla si faltan valores, se usan orígenes locales/túneles temporales o se entrega una clave administrativa o JWT de usuario. No se heredan las claves locales ni las del Supabase Cloud anterior.

La configuración se incorpora al JavaScript: si cambia, hay que volver a compilar. Publicar dist/doctorchart-frontend/browser con el hosting elegido. Nunca publicar .angular/production-check: contiene únicamente fixtures de verificación.

El VPS debe permitir los orígenes reales en CORS; Supabase Auth y el servicio de correo deben autorizar los destinos reales de confirmación, recuperación y acceso. Los certificados locales y hosts de Windows no se trasladan al VPS. Mantener HTTPS público válido en producción.

## Autenticación y archivos

Los registros vuelven a /login en la app desde la que se hicieron. Pointly usa su /dashboard para Google y enlaces de acceso; esos destinos también deben autorizarse. Bycode envía la recuperación a /reset-password, donde la sesión obtenida del enlace permite cambiar la contraseña. Google requiere habilitar su proveedor en Supabase y configurar sus credenciales y callback; cambiar la URL del frontend por sí solo no lo habilita.

Las apps envían las imágenes a sus backends. Los backends las comprimen y guardan en R2; no se necesitan claves de R2 en el navegador.

## Comprobación

npm run test:config comprueba la separación entre entornos, los endpoints y el rechazo de claves privadas. Las pruebas de autenticación usan mocks y no envían correos. Las compilaciones de desarrollo y producción se probaron por separado; producción con dominios y claves ficticias, sin publicar nada.

Falta la prueba con una cuenta real desde el navegador (registro, correo de confirmación, login, recuperación, permisos y subida/consulta de imágenes). No se enviaron correos, se registraron usuarios ni se hicieron pagos durante la preparación. La entrega SMTP y Google son integraciones independientes de la compilación.

## Política de acceso inicial

Google está oculto y bloqueado en `src/app/auth-policy.ts`. El registro de
cuentas se hace exclusivamente desde la interfaz de Bycode. Pointly y
DoctorChart conservan login con email/contraseña y enlaces al registro de
Bycode usando su URL del entorno; no contienen un formulario de alta activo.
Esta política de interfaz no es una restricción de seguridad del endpoint
público de Supabase. No se deshabilita el alta en Supabase porque Bycode la usa.
