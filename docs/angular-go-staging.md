# Angular + backend Go: preparación de staging

DoctorChart Go es el backend definitivo. La integración local Angular → copia del Gateway Go → DoctorChart Go → PostgreSQL pasó los controles indicados en [el informe](../../doctorchart-backend-go/integration/REPORT.md). Spring permanece únicamente como referencia histórica. No se desplegó ni se modificaron Gateway, Billing o datos reales.

## Configuración pública y frontera de confianza

Editar `src/environments/environment.base.ts` antes del build:

| Variable | Valor del entorno |
| --- | --- |
| `appUrl` | Origen público Angular/SSR |
| `apiUrl` | Gateway con base `/api/doctorchart` |
| `aiGatewayUrl` | Gateway con `/api/ai/doctorchart/chat` |
| `bycodePlansUrl` | URL real del catálogo de planes |
| `supabase.url` | Proyecto Supabase del entorno |
| `supabase.publishableKey` | Clave publicable del mismo proyecto |

La configuración local usada para pruebas apunta a servicios sintéticos; reconstruirla con los valores de staging. El bundle no cambia por modificar variables después del build. Nunca incluir claves Supabase de servicio, Gemini, credenciales PostgreSQL/S3 ni secretos Gateway/Billing en Angular.

El navegador envía el bearer actual. El Gateway valida JWT, issuer, audience y expiración, elimina encabezados de confianza del cliente e inyecta identidad/rol/plan/vencimiento. Go exige secreto interno y beneficio futuro; conserva las excepciones administrativas autorizadas. El acceso DoctorChart proviene de `app_metadata.app_modules.doctorchart`: `active` booleano verdadero, tier compatible y `expires_at` RFC3339 futuro. Un beneficio Pointly o heredado no concede acceso. El vencimiento redirige al catálogo configurado.

## Comportamiento verificado

573 pruebas Angular, build de producción, typecheck, configuración pública y SSR pasaron. Chrome real verificó login, configuración clínica, paciente y encuentro, curvas/vacunas, receta/PDF, estudio original, edición, renovación explícita del SDK, enlace protegido, logout y cambio de cuenta. El backend preserva el esquema PostgreSQL y las fórmulas clínicas.

Usar `app-date-picker` y el adaptador argentino: entrada `dd/MM/aaaa`, ISO al persistir. Los estudios aceptados mantienen originales; archivos nuevos mayores a 25 MiB o imágenes de más de 40 MP se rechazan sin recodificación. El PDF conserva propiedad, `private, no-store`, previews sin opener y descarte de respuestas tardías. Texto no representable devuelve 422 con explicación y sin cambiar datos guardados. No se promete soporte universal de escrituras Unicode.

`CALCULATORS_ENABLED` permanece en `false` por la política existente de la primera entrega. Las calculadoras se probaron por API; no se añadió una pantalla ni un botón nuevo de eliminación de pacientes. El aviso existente del bundle inicial de aproximadamente 1,22 MB sobre el presupuesto de aviso de 1 MB no impide compilar.

## Antes de publicar staging

Fijar una revisión del Gateway, actualmente en refactor, y repetir las regresiones si cambia. Configurar issuer/audience/CORS/secretos en servidor y reconstruir el frontend con las URLs definitivas. Ejecutar `npm test -- --watch=false`, `npm run build`, typecheck y `npm run test:ssr` con esa configuración.

Validar allí con datos sintéticos: Supabase/OAuth y rotación JWKS, renovación automática prolongada, Billing/pagos y cambios de plan, AWS/R2 y recuperación de eliminación durable, Gemini, impresión en dispositivos objetivo y estudios representativos. Esos proveedores reales no fueron ejecutados localmente; la redirección a planes se comprobó contra una URL de fixture cuyo 404 terminal es intencional. La reproducción de los controles locales está en [README Go](../../doctorchart-backend-go/README.md).
