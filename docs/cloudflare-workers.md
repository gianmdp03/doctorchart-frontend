# Cloudflare Workers: doctorchart-frontend

Publicación de archivos estáticos, sin servidor SSR. La portada se genera al compilar y las demás pantallas se ejecutan en el navegador.

- Repositorio y nombre del Worker: doctorchart-frontend.
- Rama de producción: main.
- Build command: npm run build.
- Deploy command: npx wrangler deploy.
- Root directory: raíz del repositorio.
- Build variables and secrets (no variables de runtime): NODE_VERSION=24.20.0, PUBLIC_SUPABASE_URL=https://api.bycode.com.ar y PUBLIC_SUPABASE_PUBLISHABLE_KEY con la misma clave pública anon del VPS usada en Bycode. Nunca service_role ni secretos de backend.
- Desactivar Preview builds si no se necesitan.
- Settings > Domains & Routes > Custom Domain: doctorchart.bycode.com.ar.

wrangler.json publica exclusivamente dist/doctorchart-frontend/browser. public/_redirects conserva las rutas de Angular y los alias sin enviar archivos inexistentes a la aplicación. El destino /index.csr sin extensión evita redirecciones de la URL original. public/_headers evita indexar las pantallas de la aplicación; no reemplaza autenticación ni autorización.

Comprobar portada, /login, una ruta con parámetros y una URL inexistente (404). Los enlaces de Auth y CORS están configurados para el dominio definitivo.
