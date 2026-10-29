# M2-ARGON — Entrega de Frontend de Administración de Consultorios

- **Ticket:** `M2-ARGON`
- **Agente:** Argon (Gemini 3.1 Pro)
- **Repositorio de escritura exclusivo:** `doctorchart-frontend`
- **Rama:** `codex/m2-clinics-frontend`
- **Base commit (`main`):** `14196974125e5769c5a95e309896397acad96e63`
- **Contrato verificado:** `M2-CLINICS-v0.1` / `M2-CLINICS-v1` (`doctorchart-backend-go/docs/ai/contracts/M2_CLINICS_API.md`, congelado para implementación paralela M2)
- **Hash SHA-256 verificado del contrato:** `aa7ff31d75cd8c34b2dbc5e8fde93b948fc1d0bb4af396b1d3a39b37b53b6150` (tree de `M2-CLINICS-v0.1` en `84657c2`) y alineado con `M2-CLINICS-v1` (`9007d55`, incluyendo orden `id` ascendente y `200` idempotente sin incremento de versión ante estado idéntico con versión vigente)

---

## 1. Alcance Implementado

1. **Modelos tipados y validadores (`src/app/features/clinics/clinics.models.ts`):**
   - Interfaces exactas del contrato `M2-CLINICS-v0.1`: `Clinic`, `ClinicStatus`, `ClinicListResponse`, `ClinicCapabilities`, `ClinicEntitlements` (conservando `max_clinics`), `ClinicUsage`, `ClinicActions`, `ClinicCapabilityReason`, `CreateClinicRequest`, `UpdateClinicRequest`, `UpdateClinicStatusRequest`, `ClinicApiError` y `ClinicFieldError`.
   - Validación de identificadores decimales canónicos (`BIGINT` serializado como string) para `id` y `expectedVersion`.
   - Validación estricta de zonas horarias IANA (`validateIanaTimezone` / `isValidIanaTimezone`): acepta `'UTC'` o `Area/Location` verificables con `Intl.DateTimeFormat`, rechazando `'Local'`, offsets fijos (`+03:00`, `GMT-3`, `UTC-3`, `Etc/GMT*`), abreviaturas ambiguas (`ART`, `EST`, `PST`) y prefijos `posix/` o `right/`.
   - Funciones puras de permisos efectivos (`canCreateClinic`, `canEditClinic`, `canTransitionClinicStatus`) basadas exclusivamente en `capabilities.entitlements.status === 'VERIFIED'`, `capabilities.actions` y el estado actual del consultorio (`ACTIVE`, `INACTIVE`, `ARCHIVED`).
   - Formateo de fechas en formato argentino `dd/MM/aaaa` mediante `displayLocalDate`.

2. **Mocks deterministas fieles al contrato (`src/app/features/clinics/clinics.mocks.ts`):**
   - `MOCK_CLINICS_FIXTURES`, `MOCK_CAPABILITIES_BY_SCENARIO`, `MOCK_CLINIC_ERRORS` y `MockClinicsBackend` cubriendo:
     - Lista vacía (`EMPTY`) y lista paginada/filtrada (`VERIFIED`).
     - Entitlements `VERIFIED`, cupo `0` (`ZERO_QUOTA`), cupo alcanzado (`LIMIT_REACHED`), exceso post-downgrade (`OVER_QUOTA_DOWNGRADE`), cupo ilimitado `-1` (`UNLIMITED`), `DENIED` (`CLINIC_MANAGEMENT_DISABLED`) y `UNAVAILABLE` (`ENTITLEMENTS_UNAVAILABLE`).
     - Errores `400 INVALID_REQUEST` (con errores por campo e `INVALID_TIMEZONE`), `403 CLINIC_MANAGEMENT_DISABLED`, `404 CLINIC_NOT_FOUND`, `409 VERSION_CONFLICT`, `409 CLINIC_LIMIT_REACHED`, `409 CLINIC_STATE_CONFLICT` y `503 ENTITLEMENTS_UNAVAILABLE`.
   - Uso exclusivo para pruebas y arneses explícitos mediante `CLINICS_TRANSPORT`; nunca se utiliza como fallback de producción ante fallos HTTP.

3. **Servicio HTTP (`src/app/features/clinics/clinics.service.ts`):**
   - Consume `${environment.apiUrl}/clinics`, `GET /clinics/capabilities`, `GET /clinics/:id`, `POST /clinics`, `PATCH /clinics/:id` y `PATCH /clinics/:id/status`.
   - Normaliza `trim()` en los campos enviados y propaga errores HTTP sin inventar respuestas locales.

4. **Pantalla de listado y estados (`src/app/features/clinics/clinics-page.component.ts`, `.html`, `.css`):**
   - Tabla accesible y responsive (`role="region"`, `tabindex="0"`, `container-type: inline-size` y diseño apilado con `data-label` en contenedores angostos).
   - Filtros por estado (`Todos`, `Activos`, `Inactivos`, `Archivados`) y paginación real (`page`, `size`, `totalElements`).
   - Resumen de cupo (`usage.counted` vs `max_clinics`) aclarando que los consultorios archivados no consumen cupo activo.
   - Banners comerciales y técnicos según `entitlements.status` y `reason`, y refresco automático de capacidades + listado ante errores `403`, `409` o `503`.

5. **Pantalla de alta y edición (`src/app/features/clinics/clinic-form-page.component.ts`, `.html`, `.css`):**
   - Reactive Forms con validación tras interacción (`:user-invalid`, `.field-invalid`, `aria-invalid` y `aria-describedby` sincronizados).
   - Modo solo lectura cuando el consultorio está `ARCHIVED` (con opción de restaurar a `INACTIVE` si `actions.restore === true`) o cuando `actions.create` / `actions.edit` es `false`.
   - Resolución explícita de `409 VERSION_CONFLICT`: preserva intactos los valores ingresados por el médico en el formulario y permite adoptar la versión más reciente del servidor o recargar los datos remotos.

6. **Rutas, Guard, Hosting y Feature Flag:**
   - `FEATURE_FLAGS.CLINICS_ENABLED: false` en `src/app/core/config/feature-flags.ts` (apagado inicialmente en M2).
   - `clinicsGuard` en `src/app/core/guards/clinics.guard.ts`.
   - Rutas en inglés `/clinics`, `/clinics/new`, `/clinics/:id/edit` y redirecciones de compatibilidad `/consultorios`, `/consultorios/nuevo`, `/consultorios/:id/editar` en `src/app/app.routes.ts` y `src/app/core/config/site.config.json`.
   - Acceso en barra lateral (`SidebarComponent`) condicionado a `clinicsEnabled()`.

---

## 2. Diferencias respecto del contrato

- **Ninguna desviación respecto de `M2-CLINICS-v0.1` (`aa7ff31d75cd8c34b2dbc5e8fde93b948fc1d0bb4af396b1d3a39b37b53b6150`).**
- No se modificaron pacientes, historias clínicas, consultas, estudios, vacunas, recetas, calculadoras ni el wizard médico.
- No se modificaron `doctorchart-backend-go`, `bycode-backend-go` ni `api-ai-gateway-go`.

---

## 3. Instrucciones para Integración Conjunta (M2-SOL + M2-ARGON)

1. Cuando `M2-SOL` esté integrado y validado en `doctorchart-backend-go`, habilitar `CLINICS_ENABLED: true` en `src/app/core/config/feature-flags.ts` para exponer la navegación lateral y las rutas `/clinics`, `/clinics/new` y `/clinics/:id/edit`.
2. Verificar extremo a extremo contra el backend real:
   - `GET /api/doctorchart/clinics/capabilities`
   - `GET /api/doctorchart/clinics`
   - `POST /api/doctorchart/clinics`
   - `PATCH /api/doctorchart/clinics/{id}`
   - `PATCH /api/doctorchart/clinics/{id}/status`
