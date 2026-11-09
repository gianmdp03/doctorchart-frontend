# M5 — calendario médico
30/10/2026. Rama `codex/m5-calendar` desde Angular M3 `d0b7a45`; aplicación `3f09d8d` + `0de8490`. M4 backend aceptado `7fe9bd6`; backend M5 `c63f5f3` + prueba `25a8c6f`, en su rama independiente del mismo nombre.

`/calendar` integra las APIs M3/M4; alta manual con solicitante/persona atendida separados, vinculación clínica opcional, cancelación, reprogramación, estados e historial. Contrato canónico y entrega completa: repositorio doctorchart-backend-go, `docs/ai/contracts/M5_CALENDAR_API.md` y `docs/ai/M5_DELIVERY.md` de la rama M5. No duplicar esos contratos ni modificar pacientes.

747 pruebas Angular PASS; build development y production/deployment PASS (clave pública sintética solo para compilación); 8 pruebas hosting/config PASS. Navegador con aplicación real, autenticación Supabase de ensayo, Gateway/Billing/PostgreSQL descartables: 11 recorridos PASS, incluidos dos intentos simultáneos 201/409 y conflicto de versión, DST, vínculo clínico desde móvil, cancelación/liberación y reprogramación. Capturas revisadas 1500px, móvil 390/320 y oscuro; emulación de navegador, no teléfono físico.

Evidencia/capturas locales: `C:/Users/gcast/Documents/GitHub/doctorchart-m3/.fixtures/m5/integration/`. No publicar sesiones sintéticas privadas. Seis servicios externos opt-in del backend no ejecutados, detallados en entrega canónica; no se cuentan PASS. Sin limitaciones bloqueantes conocidas de los recorridos autorizados.

CALENDAR_ENABLED, SCHEDULES_ENABLED y CLINICS_ENABLED siguen false en el código normal. Solo snapshot descartable los activó. Main/turnos/M3/M4 preservados, sin worktrees, GitHub remoto, merge, push, despliegue o bases reales. Sin portal /appointments, staff, mails, pagos, marketing o M6. Sin drag-and-drop ni reservas en vivo; actualizar explícitamente. M5 listo para aceptación, sin autorización implícita para activación/publicación.
