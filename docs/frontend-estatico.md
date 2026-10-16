# Frontend estático y configuración

Node 24. Las presentaciones comerciales se generan como HTML durante el build; la aplicación funcional se renderiza en el navegador. No se necesita un servidor Angular/Express para atender las páginas. Angular conserva sus herramientas de prerenderizado e hidratación.

| Aplicación | HTML prerenderizado | Cliente |
|---|---|---|
| ByCode | `/`, `/pointly`, `/doctorchart`, `/pricing` | Login, registro, panel, administración y soporte |
| Pointly | `/` | Login, registro, puntos, comercios, asociaciones y panel |
| DoctorChart | `/` | Login, onboarding y aplicación clínica/administrativa |

## Desarrollo y validación local

```powershell
npm ci
npm start
npm test -- --watch=false
npm run build
npm run test:seo
npm run test:static
npm run test:config
npm run preview
```

`preview` sirve el resultado de `dist/<nombre-del-proyecto>/browser` en `http://127.0.0.1:4300`; se puede cambiar el puerto con `PORT`. Es un servidor de archivos para revisión local. Los builds locales usan las URLs existentes de `src/environments/environment.base.ts`; no son artefactos autorizados para subir a producción. Los tests estáticos levantan y cierran su propio servidor temporal.

## Preparación de un despliegue futuro

Cada proyecto usa `src/app/core/config/site.config.json` como configuración pública para SEO, rutas de hosting y enlaces de despliegue. `publicSiteUrl` es su dominio; `applicationUrls` contiene los tres dominios relacionados. `apiGatewayOrigin` es el origen HTTPS del backend común, sin `/api`. Actualmente está vacío porque todavía no existe una URL pública. No hay secretos en este archivo.

Cuando exista el backend público, completar `apiGatewayOrigin` en los tres proyectos y confirmar los dominios. Ejecutar `npm run build:deploy`: valida que las URLs sean HTTPS públicas, rechaza valores locales/temporales y genera un environment de despliegue temporal. Se elimina al terminar, incluso si falla el build. Las rutas específicas `/api/pointly`, `/api/doctorchart` y las de IA se construyen a partir del origen configurado. El valor de DoctorChart sigue siendo provisional y se puede cambiar.

Si se cambia un dominio, actualizar el `publicSiteUrl` del proyecto y ese dominio en `applicationUrls` de los tres repositorios. Recompilar actualiza canonical, sitemap, Open Graph y enlaces. Las tarjetas de compartir incluyen el dominio en la imagen: regenerarlas con `node tools/frontend-audit/assets.mjs` desde Pointly, con los tres repositorios hermanos disponibles. Los originales de capturas/logos se conservan en `design/source`, fuera del directorio publicado.

Solo se publica el contenido de `dist/<nombre-del-proyecto>/browser`. `hosting/nginx.conf` se genera como referencia para un hosting estático: páginas públicas primero, shell cliente para rutas funcionales conocidas, aliases con 301 y 404 real para archivos/URLs inexistentes. HTML y archivos sin hash revalidan; JS/CSS con hash usan caché immutable. El postbuild genera `.gz` y `.br`. La referencia usa gzip estándar y `gzip_static`; Brotli requiere soporte del proveedor o módulo correspondiente. Revisar/adaptar root, TLS y nombre del servidor al hosting elegido y validar con su herramienta antes de usarla. La sintaxis y el contrato HTTP de las tres referencias se validaron localmente con Nginx en Docker: rutas, 301, 404, MIME, gzip y caché. Eso no valida la configuración TLS/DNS del futuro hosting.

Las páginas privadas y el shell llevan `noindex`; eso no protege información. La autorización, las suscripciones y el acceso a datos siguen siendo responsabilidad del backend. El HTML comercial se comprueba sin JavaScript, con un H1, título/descripción, canonical, JSON-LD y tarjeta social. `/pricing` prerenderiza información estable; los precios reales se cargan desde el catálogo del backend, sin inventar ni congelar importes.

## Pendientes que requieren servicios publicados

- Confirmar URL del backend y dominio de DoctorChart.
- Configurar CORS/orígenes públicos en el backend y URLs de retorno permitidas en Supabase, tomando las rutas realmente utilizadas por cada aplicación. Verificar confirmación de correo, acceso y retorno entre aplicaciones con servicios reales.
- Configurar hosting, DNS y HTTPS; comprobar que conserva el contrato de redirecciones, compresión y 404.
- Comprobar previews sociales externos, Search Console, indexación y Core Web Vitals de usuarios reales.

Estas acciones externas no se realizaron. La CI local del repositorio verifica tests, build, SEO, hosting estático y validador de configuración; no publica nada. Las auditorías Lighthouse/axe/Playwright están en `pointly-frontend/tools/frontend-audit` y la evidencia conjunta en `pointly-frontend/docs/audit`.
