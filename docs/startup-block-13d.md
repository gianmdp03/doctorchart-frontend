# Cierre de 13d — base nueva, arranque y verificación conectada

Nota actual (13/10/2026): el frontend volvió a `src/environments/environment.base.ts` como fuente única de configuración pública. Los pasos `.env.*`, `PUBLIC_*` y `test:config` de este informe son históricos y ya no aplican; ver el README actual.

Fecha de verificación: 06/10/2026. Se conserva la experiencia pediátrica y la
configuración de especialidades y wizard. No se migraron datos, se agregaron
adaptadores ni se hicieron commits.

## Cambios

- PostgreSQL 17 de desarrollo en `doctorchart-backend/compose.dev.yml`, con volumen
  persistente propio, credenciales externas obligatorias y puerto `127.0.0.1:5443`.
  El ejemplo público `.env.database.example` deja la contraseña vacía.
- El backend crea el esquema completo solamente con el perfil explícito
  `initialize` sobre una base vacía. Los arranques normales usan `validate` y
  detienen el proceso si el esquema no corresponde. Se eliminó la actualización
  automática del esquema; no hay migradores ni reconstrucciones parciales.
- Se reemplazó el smoke antiguo con H2 por una prueba de arranque completo con
  PostgreSQL 17 descartable, servidor HTTP y los inicializadores reales. Se
  eliminó H2 y el archivo de tests que ocultaba la configuración principal.
- READMEs y guía de ejecución documentan configuración externa, orden de arranque,
  primer inicio, reinicios, almacenamiento, pruebas y requisitos de despliegue.
  Las instrucciones antiguas de borrado parcial de tablas se reemplazaron por
  el procedimiento de base nueva.
- Se corrigió el arranque del servidor Angular de producción: la lista de hosts
  permitidos estaba vacía y rechazaba las solicitudes. Ahora toma exclusivamente
  el hostname de `PUBLIC_APP_URL`, sin comodines ni confianza general en cabeceras
  de proxy. El comportamiento de la protección se describe en
  [la documentación de seguridad de Angular](https://angular.dev/best-practices/security#preventing-server-side-request-forgery-ssrf).

## Preparación y arranque

Requisitos comprobados: Node 24, Java 25, Docker Desktop con Compose y Go según
el `go.mod` de cada gateway. Instalar dependencias frontend con `npm ci`.

1. Preparar la base vacía, credenciales y directorio privado según
   [la guía del backend](../../doctorchart-backend/docs/runtime-configuration.md).
2. Levantar Billing con su configuración externa y base propia. Comprobar su
   endpoint `GET /api/billing/limits/DOCTORCHART`.
3. Arrancar DoctorChart con `initialize` únicamente la primera vez. Después,
   detenerlo y arrancarlo normalmente, sin ese perfil.
4. Completar `.env` en [AI gateway](../../ai-gateway/README.md) y ejecutar `go run .`
   desde su raíz. La clave Gemini queda exclusivamente en ese servicio.
5. Completar `.env` en [API gateway](../../api-gateway/README.md) y ejecutar
   `go run .` desde su raíz. El emisor, JWKS y audiencia deben coincidir con
   Supabase; configurar el origen `http://localhost:4202` explícitamente.
6. Completar `.env.development` a partir del ejemplo frontend y ejecutar
   `npm start`. Abrir `http://localhost:4202` e iniciar sesión con una cuenta
   Supabase válida; la cuenta médica requiere acceso activo a DoctorChart.

| Servicio local | Puerto | Configuración |
| --- | --- | --- |
| PostgreSQL nuevo | 5443, solo loopback | Backend `.env.database` y volumen `doctorchart-dev_database` |
| Billing | 8081 | Servicio externo, configuración y base independientes |
| DoctorChart backend | 8083 | `secrets.properties` externo, en su raíz |
| AI gateway | 3001 | `.env` privado en su raíz |
| API gateway | 8000 | `.env` privado en su raíz |
| Frontend | 4202 | `.env.development`, solo configuración pública |

La API clínica pública del frontend es `http://localhost:8000/api/doctorchart`
y el chat es `http://localhost:8000/api/ai/doctorchart/chat`. Backend e IA reciben
la identidad validada del gateway y su secreto interno; el navegador no utiliza
ese secreto ni se conecta directamente al backend.

Las URLs de otros productos deben corresponder a los servicios habilitados.
El recorrido de esta fase verifica DoctorChart; no acredita la operación de
Pointly, Stock Store, cobros ni administración externa de suscripciones.

## Entorno local utilizado

Se creó `doctorchart_refactor` en un volumen nuevo. La configuración privada del
backend ahora apunta a `jdbc:postgresql://127.0.0.1:5443/doctorchart_refactor` y a
`%LOCALAPPDATA%/DoctorChart/doctorchart_refactor/medical-studies` para adjuntos.
La configuración anterior se respaldó fuera del repositorio, bajo
`%LOCALAPPDATA%/DoctorChart/config-backups/13d-1791291473914`.
La base anterior y su directorio de archivos no se modificaron ni se copiaron.

Para verificar la dependencia real, se levantó el código existente de Billing
sin modificarlo, sobre otra base nueva `billing_refactor`. Solo se cargaron sus
catálogos locales; no se realizaron pagos ni cambios de acceso en Supabase.
Al reiniciar DoctorChart, cargó los tiers `BASIC`, `PRO` y `UNLIMITED` desde Billing
en el primer intento.

La base clínica quedó con un paciente y registros ficticios creados durante la
verificación. El primer arranque comprobado tenía **cero pacientes**; los datos
de prueba se agregaron después mediante el frontend. Las credenciales de login
se usaron para autenticar y no se incorporaron al código ni a esta documentación.

## Evidencia automatizada

| Proyecto | Gate | Resultado |
| --- | --- | --- |
| Backend | `mvnw.cmd clean package` | 643 tests, cero fallos, errores u omitidos; JAR compilado |
| Frontend | `npm test -- --watch=false` | 565 tests en 58 archivos aprobados |
| Configuración frontend | `npm run test:config` | 3 tests aprobados |
| Frontend producción | `npm run build`, variables públicas locales proporcionadas explícitamente | Browser y SSR compilados |
| Servidor frontend de producción | `npm run test:ssr`, con el mismo `PUBLIC_APP_URL` del build | 3 tests aprobados: arranque y dos escenarios HTTP |
| API gateway | `go test ./...`, `go vet ./...`, build | Aprobados; 29 tests principales más casos por tabla |
| AI gateway | `go test ./...`, `go vet ./...`, build | Aprobados; 33 tests principales más casos por tabla |

El gate backend ya no excluye `DoctorchartApplicationTests`. Su PostgreSQL aislado
verifica esquema completo, una especialidad, un wizard, ocho calculadoras, cuatro
selecciones iniciales y cero pacientes. El almacenamiento temporal y las
conexiones de las pruebas no usan la base clínica local.

La compilación frontend conserva la advertencia previa del bundle inicial:
1,26 MB frente al presupuesto de aviso de 1 MB. No hubo errores de compilación.
El smoke del artefacto inicia un servidor temporal: `/` redirige a `/dashboard`,
las rutas clínica y dashboard entregan el shell vacío para renderizado en cliente
con el Host configurado, y un Host ajeno recibe 400. No inserta datos clínicos
en HTML ni utiliza la sesión del navegador.

## Recorrido conectado

Se utilizaron sesiones reales de las dos cuentas de prueba proporcionadas por el
usuario, sin bypass ni identidades inventadas en cabeceras:

- Administrador: login, catálogo pediátrico y wizard publicado cargados desde el
  backend. No se modificaron las definiciones publicadas.
- Cuenta médica: primer acceso, selección de pediatría, wizard con sus valores
  existentes, finalización y dashboard vacío.
- Alta de un paciente ficticio desde el formulario actual, con fecha argentina;
  recuperación del paciente en directorio y ficha.
- Consulta ficticia guardada con 18 kg y 110 cm, recuperada en historia y fuente
  de mediciones. La vista de curvas reconoce las mediciones y respeta su rango
  de edad de 0–24 meses; este paciente ficticio de cuatro años queda fuera de él.
- Catálogo de ocho calculadoras, cuatro favoritos iniciales, autocompletado desde
  la consulta, resultado oficial y guardado en historial clínico. El historial
  se recupera del servidor tras navegar y reiniciar el backend.
- Receta y orden de estudios ficticias persistidas. Las vistas de impresión
  muestran el documento correcto, paciente, autor y fecha reales del registro.
  Se comprobaron A4 doble vía y A5 simple; no se enviaron documentos a una
  impresora física.
- PDF vacío de prueba subido desde la ficha. La descarga autenticada por API
  devolvió exactamente los 431 bytes originales, `application/pdf` y `no-store`.
  El control de descarga del navegador integrado no produjo un evento observable
  para la automatización; la integridad del archivo se comprobó por la API.
- Calendario nacional cargado desde backend y aplicación ficticia de BCG guardada
  en el carnet. No se cambiaron reglas ni recomendaciones del calendario.
- Chat pediátrico real: una consulta técnica sin finalidad clínica recibió
  «Conexión verificada.» desde Gemini, atravesando ambos gateways y la comprobación
  de disponibilidad del backend.
- Dashboard agregado desde backend: un paciente, una consulta del mes y una
  consulta de hoy, coherentes con los registros creados.
- Cierre de sesión y segundo login: la cuenta recupera su workspace confirmado
  y sus registros desde backend, sin repetir la configuración inicial.

Se reinició el backend sin `initialize` después de guardar paciente, consulta,
receta, cálculo y archivo. Los registros siguieron accesibles y el catálogo no
se duplicó. Un intento de repetir `initialize` sobre el esquema existente falló
con salida 1 por tabla existente, sin recrear ni borrar las tablas.

## Permisos comprobados sobre los servicios reales

| Petición | Resultado |
| --- | --- |
| API clínica sin JWT | 401 |
| API clínica sin JWT, con `X-Dev-Bypass` | 401 |
| Cuenta médica al catálogo administrativo | 403 |
| Administrador al paciente de la cuenta médica | 403 |
| Administrador al archivo de ese paciente | 403 |
| Cuenta médica propietaria al paciente y archivo | 200 |
| Backend directo sin secreto del gateway | 401 |
| Guardar cálculo con consulta inexistente | 404 |
| Guardar cálculo enviando un resultado fabricado | 400 |

Las peticiones inválidas no agregaron cálculos al historial. Los escenarios de
relación entre pacientes y consultas, aislamiento por especialidad, limpieza de
archivos y cambios de cuenta también están cubiertos por las suites automatizadas.

El JAR final se inspeccionó: no contiene archivos `secrets.properties` ni `.env`.

## Alcance del cierre

13d acredita el arranque de la configuración nueva, la persistencia y los circuitos
enumerados. Los documentos anteriores conservan los resultados históricos de cada
bloque; la exclusión de H2 mencionada en ellos dejó de ser necesaria en esta fase.
La puesta en producción, dominios finales y políticas comerciales requieren su
entorno real; no se desplegó la aplicación públicamente.

Quedan como decisiones separadas observadas durante la verificación: la política
de límites fijos cuando Billing no está disponible y para `FREE_TRIAL`, y el texto
del login que afirma cifrado de extremo a extremo, que este refactor no implementa.
El cierre del bloque 13 no equivale a una auditoría exhaustiva de seguridad de
todos los productos externos ni a una garantía de ausencia de cualquier defecto.
