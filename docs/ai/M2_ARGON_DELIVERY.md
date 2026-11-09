# M2-ARGON — Entrega de Frontend de Administración de Consultorios

- **Ticket:** `M2-ARGON`
- **Agente:** Argon (Gemini 3.1 Pro)
- **Repositorio de escritura exclusivo:** `doctorchart-frontend`
- **Rama:** `codex/m2-clinics-frontend`
- **Base commit (`main`):** `14196974125e5769c5a95e309896397acad96e63`
- **Contrato canónico verificado:** `M2-CLINICS-v1` (`doctorchart-backend-go/docs/ai/contracts/M2_CLINICS_API.md`, blob `9007d55be2620e852b083ba51dff041bd24eba15`)
- **Hash SHA-256 verificado del contrato:** `70e096102182fb5d0880997b6ff428e058d756b987c3d8c2238c8743f780e2fd`

---

## 1. Alcance Implementado

1. **Modelos tipados y validadores (`src/app/features/clinics/clinics.models.ts`):**
   - Interfaces exactas del contrato `M2-CLINICS-v1`: `Clinic`, `ClinicStatus`, `ClinicListResponse`, `ClinicCapabilities`, `ClinicEntitlements` (conservando `max_clinics`), `ClinicUsage`, `ClinicActions`, `ClinicCapabilityReason`, `CreateClinicRequest`, `UpdateClinicRequest`, `UpdateClinicStatusRequest`, `ClinicApiError` y `ClinicFieldError`.
   - Validación de identificadores decimales canónicos (`BIGINT` serializado como string) para `id` y `expectedVersion`.
   - Validación de experiencia de usuario para zonas horarias IANA (`validateIanaTimezone` / `isValidIanaTimezone`):
     - Rechaza de forma inmediata entradas inequívocamente inválidas: valores vacíos (`REQUIRED`), cadenas que superan `CLINIC_FIELD_LIMITS.timezone` (`TOO_LONG`), `'Local'`, `'utc'` no canónico, offsets fijos (`+03:00`, `GMT-3`, `UTC-3`), prefijos `Etc/*`, `posix/*` o `right/*`, abreviaturas sin barra (`GMT`, `ART`, `EST`) y rutas sintácticamente mal formadas o con segmentos que contradicen la capitalización resuelta por `Intl.DateTimeFormat`.
     - Admite `'UTC'` (incluyendo recorte de espacios `' UTC '`), zonas regionales conocidas, enlaces (`Link`) válidos aceptados por Go (`US/Eastern`, `America/Argentina/Buenos_Aires`, `Asia/Kolkata`, `Europe/Kyiv`, `Brazil/East`, etc.) y zonas sintácticamente razonables (`Area/Location`) que el navegador no pueda validar de forma concluyente (por ejemplo, nuevas zonas incorporadas en futuras actualizaciones de `tzdata` en Go).
     - **Nota de contrato y autoridad:** aceptar un valor en `validateIanaTimezone` únicamente habilita enviarlo sin modificar su capitalización ni convertir aliases hacia el backend; **no equivale a declararlo válido en el servidor**. El backend Go (`tzdata`) y PostgreSQL son la autoridad definitiva y responden `400 INVALID_REQUEST` (`INVALID_TIMEZONE`) ante zonas inexistentes o capitalización inválida de aliases (`Asia/KOLKata`, `America/ARgentina/Buenos_Aires`, `Us/Eastern`), presentando el error en el campo correspondiente y conservando intactos todos los datos del formulario.
   - Funciones de permisos comerciales efectivos (`isCapabilityVerified`, `normalizeCapabilities`, `invalidateCapabilitiesForError`, `canCreateClinic`, `canEditClinic`, `canTransitionClinicStatus`) que verifican invariantes completas de `VERIFIED` (`revision` no vacía, `clinicManagement === true`, `max_clinics >= -1` y vigencia futura `validUntil > nowMs`), invalidando permisos obsoletos o expirados y deshabilitando acciones ante denegaciones (`403`), indisponibilidad (`503`) o fallos de revalidación.
   - Formateo de fechas en formato argentino `dd/MM/aaaa` mediante `displayLocalDate`.

2. **Mocks deterministas fieles al contrato (`src/app/features/clinics/clinics.mocks.ts`):**
   - `MOCK_CLINICS_FIXTURES`, `MOCK_CAPABILITIES_BY_SCENARIO`, `MOCK_CLINIC_ERRORS` y `MockClinicsBackend` cubriendo:
     - Lista vacía (`EMPTY`) y lista paginada/filtrada (`VERIFIED`) con ordenamiento determinista por `id` ascendente.
     - Entitlements `VERIFIED`, cupo `0` (`ZERO_QUOTA`), cupo alcanzado (`LIMIT_REACHED`), exceso post-downgrade (`OVER_QUOTA_DOWNGRADE`), cupo ilimitado `-1` (`UNLIMITED`), `DENIED` (`CLINIC_MANAGEMENT_DISABLED`) y `UNAVAILABLE` (`ENTITLEMENTS_UNAVAILABLE`).
     - Errores `400 INVALID_REQUEST` (con errores por campo e `INVALID_TIMEZONE`), `403 CLINIC_MANAGEMENT_DISABLED`, `404 CLINIC_NOT_FOUND`, `409 VERSION_CONFLICT`, `409 CLINIC_LIMIT_REACHED`, `409 CLINIC_STATE_CONFLICT` y `503 ENTITLEMENTS_UNAVAILABLE`.
   - Uso exclusivo para pruebas y arneses explícitos mediante `CLINICS_TRANSPORT`; nunca se utiliza como fallback de producción ante fallos HTTP.

3. **Servicio HTTP e Interceptor de Zona Horaria (`src/app/features/clinics/clinics.service.ts` y `src/app/core/interceptors/time-zone.interceptor.ts`):**
   - Consume `${environment.apiUrl}/clinics`, `GET /clinics/capabilities`, `GET /clinics/:id`, `POST /clinics`, `PATCH /clinics/:id` y `PATCH /clinics/:id/status`.
   - `timeZoneInterceptor` excluye los endpoints `${environment.apiUrl}/clinics` del parámetro query de presentación `timeZone`, cumpliendo estrictamente el contrato `M2-CLINICS-v1` (`page`, `size`, `status`) mientras mantiene `timeZone` en los endpoints clínicos.
   - Normaliza `trim()` en los campos enviados y propaga errores HTTP sin inventar respuestas locales.

4. **Pantalla de listado y estados (`src/app/features/clinics/clinics-page.component.ts`, `.html`, `.css`):**
   - Tabla accesible y responsive (`role="region"`, `tabindex="0"`, `container-type: inline-size` y diseño apilado con `data-label` en contenedores angostos).
   - Filtros por estado (`Todos`, `Activos`, `Inactivos`, `Archivados`) y paginación real (`page`, `size`, `totalElements`).
   - Resumen de cupo (`usage.counted` vs `max_clinics`) aclarando que los consultorios archivados no consumen cupo activo.
   - Banners comerciales y técnicos según `entitlements.status` y `reason`, e invalidación inmediata de capacidades obsoletas ante errores `403`/`503` o fallos de `getCapabilities()`.

5. **Pantalla de alta y edición (`src/app/features/clinics/clinic-form-page.component.ts`, `.html`, `.css`):**
   - Reactive Forms con validación tras interacción (`:user-invalid`, `.field-invalid`, `aria-invalid` y `aria-describedby` sincronizados).
   - Protección contra concurrencia entre recursos y cuentas: verifica generación de contexto, identificador de operación, identidad del médico propietario e identidad del `clinicId` antes de aplicar respuestas de lectura o mutación (`submit`, `changeStatus`, `resolveConflictKeepLocalEdits`, `loadForEdit`, `loadCapabilitiesOnly`, `retryCapabilities`), evitando que respuestas tardías de un consultorio pisen el formulario de otro.
   - Botón de reintento de verificación de capacidades (`[data-testid="form-retry-capabilities-btn"]` -> `retryCapabilities()`) cuando la verificación comercial falla o no está disponible, conservando intactos los datos ingresados por el médico en el formulario.
   - Modo solo lectura cuando el consultorio está `ARCHIVED` (con opción de restaurar a `INACTIVE` si `actions.restore === true`) o cuando `actions.create` / `actions.edit` es `false` o el permiso expiró (`validUntil`).
   - Resolución explícita de `409 VERSION_CONFLICT`: preserva intactos los valores ingresados por el médico en el formulario y permite adoptar la versión más reciente del servidor o recargar los datos remotos.

6. **Rutas, Guard, Hosting y Feature Flag:**
   - `FEATURE_FLAGS.CLINICS_ENABLED: false` en `src/app/core/config/feature-flags.ts` (apagado inicialmente en M2).
   - `clinicsGuard` en `src/app/core/guards/clinics.guard.ts`.
   - Rutas canónicas en inglés `/clinics`, `/clinics/new` y `/clinics/:id/edit` en `src/app/app.routes.ts`, `hosting/nginx.conf` y `src/app/core/config/site.config.json`, sin aliases nuevos en español (`/consultorios`), conservando la ruta pública reservada `/appointments` para M3 y las redirecciones históricas preexistentes.
   - Acceso en barra lateral (`SidebarComponent`) condicionado a `clinicsEnabled()`.

---

## 2. Correcciones Finales Aplicadas (Revisión Cruzada M2)

1. **Concurrencia de respuestas HTTP en formulario (`ClinicFormPageComponent`):**
   - Se incorporó control de generación de contexto (`contextGeneration`), identificador de operación (`mutationOperationId`), verificación de propietario (`currentOwnerId()`) y validación de identidad de recurso (`clinicId()` y `response.id === expectedClinicId`) en todas las lecturas y mutaciones asíncronas.
2. **Invalidación de permisos comerciales obsoletos o vencidos:**
   - Se agregaron `isCapabilityVerified`, `normalizeCapabilities`, `createUnavailableCapabilities`, `createDeniedCapabilities` e `invalidateCapabilitiesForError` en `clinics.models.ts`, exigiendo vigencia futura de `validUntil` y revocando permisos locales inmediatamente ante fallos `403`/`503` o recargas fallidas de `getCapabilities()`.
3. **Eliminación de aliases `/consultorios`:**
   - Se retiraron `/consultorios`, `/consultorios/nuevo` y `/consultorios/:id/editar` de `src/app/app.routes.ts`, `hosting/nginx.conf`, `src/app/core/config/site.config.json` y `scripts/static-smoke.test.mjs`, manteniendo únicamente `/clinics`, `/clinics/new`, `/clinics/:id/edit` y la ruta reservada `/appointments`.
4. **Reintento de verificación de capacidades sin pérdida de datos:**
   - Se incorporó `retryCapabilities()` y el botón `[data-testid="form-retry-capabilities-btn"]` en `clinic-form-page.component.html`, revalidando capacidades sin reiniciar los controles del formulario.
5. **Exclusión de `timeZone` en requests a `/clinics`:**
   - `timeZoneInterceptor` omite el query param `timeZone` en `${environment.apiUrl}/clinics` y subrutas, evitando `400 INVALID_REQUEST ("Parámetro no reconocido.")` en el backend Go.
6. **Simplificación de la validación UX de zonas horarias IANA (`validateIanaTimezone`):**
   - Se eliminaron las excepciones y heurísticas de sub-tokens de `tzdb` en JavaScript para garantizar compatibilidad ante futuras actualizaciones de `tzdata`.
   - `validateIanaTimezone` rechaza de inmediato entradas inequívocamente inválidas (`Etc/*`, `posix/*`, `right/*`, offsets fijos, `Local`, formatos sin estructura `Area/Location` y segmentos cuya capitalización contradice el identificador resuelto por `Intl`), admite `'UTC'`, zonas regionales, enlaces válidos (`US/Eastern`, `America/Argentina/Buenos_Aires`, `Asia/Kolkata`, `Europe/Kyiv`, etc.) y permite enviar sin modificar valores sintácticamente razonables que el navegador no pueda validar de forma concluyente, delegando el veredicto definitivo en Go (`400 INVALID_REQUEST` con `INVALID_TIMEZONE`) y conservando intactos los datos del formulario ante un rechazo del servidor.

---

## 3. Diferencias respecto del contrato

- **Ninguna desviación respecto de `M2-CLINICS-v1` (`70e096102182fb5d0880997b6ff428e058d756b987c3d8c2238c8743f780e2fd`).**
- No se modificaron pacientes, historias clínicas, consultas, estudios, vacunas, recetas, calculadoras ni el wizard médico.
- No se modificaron `doctorchart-backend-go`, `bycode-backend-go` ni `api-ai-gateway-go`.

---

## 4. Pruebas Ejecutadas

- `npm test -- --watch=false`: **81 archivos de prueba, 720 tests en verde** (incluyendo zonas regionales conocidas, `UTC`, aliases aceptados por Go, variantes con capitalización incorrecta rechazadas por sintaxis/`Intl` o por Go, zonas sintácticamente razonables desconocidas para el navegador, presentación de `INVALID_TIMEZONE` y conservación del formulario tras el error, concurrencia entre consultorios `101` y `102`, invalidación tras `503` + fallo de refresh, expiración de `validUntil`, reintento de capacidades y omisión de `timeZone` en `/clinics`).
- `npm run build`: **OK** (build productivo y prerender estático).
- `npm run test:seo`: **OK**.
- `npm run test:static`: **OK** (incluyendo verificación de `200 noindex` en `/clinics`, `/clinics/new`, `/clinics/103/edit` y `404` en `/consultorios`, `/consultorios/nuevo`, `/consultorios/103/editar`).
- `npm run test:config`: **OK**.

---

## 5. Instrucciones para Integración Conjunta (M2-SOL + M2-ARGON)

1. Cuando `M2-SOL` esté integrado y validado en `doctorchart-backend-go`, habilitar `CLINICS_ENABLED: true` en `src/app/core/config/feature-flags.ts` para exponer la navegación lateral y las rutas `/clinics`, `/clinics/new` y `/clinics/:id/edit`.
2. Verificar extremo a extremo contra el backend real:
   - `GET /api/doctorchart/clinics/capabilities`
   - `GET /api/doctorchart/clinics`
   - `POST /api/doctorchart/clinics`
   - `PATCH /api/doctorchart/clinics/{id}`
   - `PATCH /api/doctorchart/clinics/{id}/status`
