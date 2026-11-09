# M6 — portal público
31/10/2026. `codex/m6-public-booking` desde M5 a3dfb0d; aplicación **5c45d4e**, cierre documental posterior en HEAD. Main/turnos/M3/M5 intactos, sin worktrees.

Pantallas `/appointments`, `/appointments/:publicId` sin auth/guards médicos y `/booking-publication` privada. Búsqueda, perfil/sedes autorizados, disponibilidad M3, formulario administrativo versionado, solicitante/persona atendida distintos, confirmación y recuperación de conflictos/reintentos. Interceptores públicos no mandan bearer/timeZone ni aceptan headers médicos. Calendario privado muestra snapshot de respuestas solo al propietario.

Contrato/entrega canónicos: repositorio doctorchart-backend-go, rama M6, `docs/ai/contracts/M6_PUBLIC_APPOINTMENTS_API.md` y `docs/ai/M6_DELIVERY.md`. Backend 8ccf7c2, Billing 6bed61d, Gateway d23924f.

763 tests Angular, builds development/production-deployment, SEO y 8 pruebas estáticas PASS. Aplicación real + Supabase Auth/Gateway/Billing/PostgreSQL aislados: 13 recorridos PASS, sin cuenta del visitante, con reserva desde móvil, aparición en calendario y dos visitantes 201/409. Capturas revisadas desktop, 390/320 y oscuro. Datos clínicos poblados intactos; 7 usuarios iniciales de Auth sin altas de visitantes. Omisiones externas de Go detalladas en entrega, no PASS.

Evidencia/capturas en `C:/Users/gcast/Documents/GitHub/doctorchart-m3/.fixtures/m6/integration/`, sin publicar credenciales/sesiones sintéticas. PUBLIC_APPOINTMENTS_ENABLED y flags previos permanecen false; el snapshot de fixture se activó aparte. No producción/GitHub/Cloudflare, push, merge, despliegue, bases reales o M7. Confirmación solo en memoria, sin email/gestión pública posterior. Listo para aceptación del propietario; no implica activación.
