# DoctorChart frontend

Frontend Angular con configuración clínica por especialidad. Node 24 verificado.
El backend definitivo es DoctorChart Go. La integración local está lista para
validar en staging; consultar [la guía Angular + Go](docs/angular-go-staging.md)
y [el informe de evidencias](../doctorchart-backend-go/integration/REPORT.md).
El [cierre de 13d](docs/startup-block-13d.md) conserva el contexto histórico.

## Configuración local

Desde la raíz del repositorio:

```powershell
npm ci
Copy-Item .env.development.example .env.development
```

Completar los valores públicos del archivo privado: proyecto y clave publicable
Supabase, URL del frontend, URL clínica del API gateway, URL de chat DoctorChart
del mismo gateway y URL real del catálogo de planes. No usar claves de servicio
Supabase, claves Gemini ni secretos internos en frontend.

La configuración se genera y valida antes de iniciar Angular:

```powershell
npm start
```

Abrir `http://localhost:4202/`. Antes deben estar disponibles PostgreSQL, Billing,
backend DoctorChart, AI gateway y API gateway; ver
[la preparación del backend Go](../doctorchart-backend-go/README.md).
El acceso utiliza cuentas reales de Supabase con sus roles y suscripciones
administrados en servidor. Las cuentas y contraseñas de prueba no se versionan.

## Pruebas y build

Para tests, crear `.env.test` con los mismos valores públicos de desarrollo:

```powershell
Copy-Item .env.development .env.test
npm test -- --watch=false
npm run test:config
```

Para producción, completar `.env.production` a partir de su ejemplo o proporcionar
las variables `PUBLIC_*` en el proceso de build:

```powershell
Copy-Item .env.production.example .env.production
npm run build
```

El build no toma automáticamente valores de desarrollo. Sus archivos quedan en
`dist/doctorchart-frontend`. El servidor SSR se ejecuta con
`npm run serve:ssr:doctorchart-frontend`; las URLs públicas del bundle deben
corresponder al entorno donde se desplegará. Los cambios en variables requieren
generar otra vez la configuración y reconstruir el bundle.

El servidor de producción acepta exclusivamente el hostname de `PUBLIC_APP_URL`.
Después del build, comprobar el servidor real con esa misma URL; por ejemplo,
para un build local:

```powershell
$env:PUBLIC_APP_URL = 'http://localhost:4202'
npm run test:ssr
```

Esta prueba levanta el artefacto en un puerto temporal, verifica rutas públicas
y protegidas sin datos clínicos en el HTML, rechaza un Host ajeno y detiene el
proceso. Detrás de un proxy, conservar el Host público configurado; el servidor
no habilita confianza general en cabeceras reenviadas.

## Convenciones y documentación

Usar el componente compartido `app-date-picker` en todos los selectores de fecha.
Entrada y presentación: `dd/MM/aaaa`; conversión ISO solo en la frontera de datos.
Los datos clínicos persistidos pertenecen al backend. El navegador conserva las
preferencias y referencias descritas en [13c](docs/browser-storage-block-13c.md).

Consultar [el plan y estado de los bloques](docs/refactor-plan.md),
[seguridad y configuración](docs/security-configuration-block-13a.md) y
[almacenamiento privado de estudios](docs/study-storage-block-13b.md).
