# Bloque 13a — Seguridad y configuración

Estado: completado. Este cierre comprende configuración y autenticación de DoctorChart,
`api-gateway` y `ai-gateway`; los archivos clínicos, almacenamiento del navegador,
base nueva y comprobación del circuito completo siguen en 13b, 13c y 13d.

## Cambios

- Se eliminó el bypass `X-Dev-Bypass`. Sin JWT válido, una petición clínica obtiene 401,
  aunque incluya identidad, rol, plan o secretos inventados. Con sesión, el gateway
  sustituye esos encabezados por los datos validados y elimina el bypass.
- Los JWT requieren firma ES256/RS256, vencimiento, emisor y destinatario configurados.
  Roles y planes proceden exclusivamente de `app_metadata`, administrado en servidor.
  `user_metadata` conserva los datos de perfil; no concede permisos ni planes.
- Especialidades y chat clínico requieren sesión en el gateway. Se conservan el chat
  genérico compartido y los endpoints públicos de los otros servicios. El webhook
  de DoctorChart tiene autenticación independiente, sin secreto predeterminado,
  comparación constante y rechazo si falta configuración.
- CORS se resuelve solo en el gateway mediante una lista explícita. Se rechazan
  comodines, rangos implícitos de puertos, orígenes ajenos y cabeceras internas en
  preflights. Las llamadas entre servidores sin `Origin` siguen permitidas y autenticadas.
- URLs de servicios, proyecto Supabase y credenciales obligatorias no tienen valores
  incrustados ni alternativas silenciosas. Puertos, tiempos y límites se validan;
  el timeout del proxy ahora se aplica a la espera de respuesta del servicio.
- Frontend genera únicamente una lista de valores públicos desde el entorno de
  desarrollo, producción o tests. Se conectó el reemplazo de entorno de Angular.
  Se rechazan claves secretas de Supabase y URLs con credenciales; HTTPS es obligatorio
  fuera de localhost. No se incorporan secretos del servidor al bundle.
- Los secretos del backend se cargan desde `secrets.properties` externo, junto a
  `pom.xml`, o variables de entorno. Maven y los contextos Docker excluyen secretos.
  Las respuestas de errores inesperados no exponen excepciones internas; el cliente
  de IA tampoco sigue redirecciones que podrían enviar credenciales a otro servidor.

## Configuración local y despliegue

Los archivos locales existentes se conservaron fuera de Git. Se generó una credencial
aleatoria compartida para API gateway, IA y DoctorChart, y se alineó la configuración
local de Pointly, que también consume ese gateway. No se modificaron las credenciales
ni los datos de PostgreSQL. El secreto del webhook de facturación es independiente:
el emisor debe utilizar el mismo valor cuando implemente/envíe esas notificaciones.

**Reiniciar los servicios que estaban ejecutándose** para que carguen los nuevos valores.
Los archivos privados no forman parte del commit ni deben copiarse al código fuente.

| Repositorio | Configuración | Arranque |
| --- | --- | --- |
| Frontend | `.env.development`, con los nombres de `.env.development.example` | `npm start`, puerto 4202 |
| Frontend producción | `.env.production` o variables `PUBLIC_*` del entorno de compilación | `npm run build` |
| Frontend tests | `.env.test` o variables `PUBLIC_*`; se pueden copiar los valores públicos de desarrollo | `npm test -- --watch=false` y `npm run test:config` |
| API gateway | `.env`, usando `.env.example` | `go run .` desde su raíz |
| AI gateway | `.env`, usando `.env.example` | `go run .` desde su raíz |
| Backend | `secrets.properties`, usando el ejemplo de la raíz, o variables de entorno | `mvnw.cmd spring-boot:run` desde su raíz |

Los entornos del sistema tienen prioridad en los gateways y en la generación del
frontend. El archivo de producción no toma valores del archivo de desarrollo.
Las URLs y clave publicable de Supabase del frontend deben corresponder al mismo
proyecto que `SUPABASE_JWT_ISSUER` y `SUPABASE_JWKS_URL` del gateway. La clave Gemini,
contraseña de base, secreto del gateway y secreto del webhook pertenecen solo al servidor.

Los ejemplos contienen URLs locales o dominios ilustrativos y secretos vacíos;
deben completarse para un despliegue real. No se creó una configuración de producción
con dominios inventados. La compilación de producción de esta fase se verificó
inyectando explícitamente los valores públicos del entorno local.

## Evidencia

- La prueba del bypass falló antes de la corrección: petición sin sesión, identidad
  inventada, respuesta 200. Después devuelve 401 y no alcanza el servicio clínico.
- Frontend: 542 tests Angular y 3 pruebas de configuración aprobados; compilación
  de producción aprobada. Persiste el aviso previo del bundle inicial de 1,26 MB.
- Backend: `mvnw.cmd clean package -Dtest=*,!DoctorchartApplicationTests`: 605 tests,
  cero fallos, incluidos los de integración con PostgreSQL mediante Docker.
  El smoke test antiguo basado en H2 queda fuera del gate, como en 12e; la revisión
  del arranque completo con esquema PostgreSQL nuevo pertenece a 13d.
- API gateway: 29 tests principales, con casos adicionales por tabla; `go vet` y build aprobados.
- AI gateway: 33 tests principales, con casos adicionales por tabla; `go vet` y build aprobados.
- Ambos gateways arrancaron con la configuración local real y respondieron health 200.
  Un intento real de bypass al gateway devolvió 401. La lista del JAR no contiene
  `secrets.properties` ni `.env`.

No se cambiaron plantillas, estilos, formularios, especialidades ni definiciones del
wizard. No se migraron datos, se agregaron adaptadores ni se hicieron commits.
Esta evidencia no sustituye el recorrido visual conectado y la llamada real a Gemini
previstos para 13d.
