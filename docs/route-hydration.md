# Portada y sesión restaurada

La portada se prerenderiza sin sesión. El navegador puede recuperar una sesión
guardada antes de hidratar ese HTML y seleccionar directamente el área privada.
Hidratar el contenedor raíz con esas dos estructuras distintas dejaba la portada
sin reclamar debajo del área privada. Se reprodujo en el build de producción con
una sesión ficticia: un `app-private-shell` y un `app-landing` simultáneos.

`App` usa `ngSkipHydration` como límite explícito: conserva el HTML estático de la
portada para SEO y vuelve a crear el árbol de la aplicación al arrancar en el
navegador. No cambia las rutas, permisos ni las comprobaciones del backend.

La portada permanece pública aunque se restaure una sesión. Solo `/login`
redirige a una cuenta autenticada. El botón «Entrar a la app» abre el dashboard
o la administración según el rol; los controles de plan y onboarding siguen
aplicándose al entrar. El coordinador de sesión no abandona la portada al
terminar de cargar el perfil.
La cabecera también ofrece «Cerrar sesión». Al completar el cierre, la portada
permanece abierta y vuelve a mostrar «Iniciar sesión»; si falla, permite reintentar.

## Regresión en navegador

Usar un build local con configuración ficticia; no desplegar ese build:

```powershell
$env:PUBLIC_SUPABASE_URL = 'https://api.bycode.com.ar'
$env:PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_rendering_fixture'
node scripts/build-deploy.mjs
$env:PLAYWRIGHT_CHROME_CHANNEL = 'msedge'
node scripts/verify-route-hydration.mjs
```

Se puede usar `chrome` en lugar de `msedge`, o quitar la variable para usar el
Chromium de Playwright instalado. Las variables corresponden a esa terminal.

La prueba sirve los archivos estáticos en un puerto local libre, intercepta todo
el tráfico remoto y usa cuentas ficticias. Comprueba sesión de médico,
administrador, cuenta sin plan y visitante, con respuestas rápidas y demoradas,
incluyendo recarga directa y navegación pública. También verifica que el HTML
inicial siga incluyendo la portada prerenderizada, que cada cuenta permanezca
en ella hasta pulsar el botón de entrada y que pueda volver desde la app.
