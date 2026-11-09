# M7 — interfaz de secretaría validada en ensayo

31/10/2026. Rama codex/m7-secretaries desde31f68b4. Aplicación a0298dd +06f421f, cierre documental posterior. Médico `/secretaries`; acceso local `/staff/login`, `/staff/activate`, `/staff/recover`, `/staff/calendar`. Guards/flags independientes, cookies+CSRF, sin bearer/Supabase ni consultas clínicas en servicios staff. Helpers de fecha/estado M5 y app-date-picker reutilizados; componente médico con PatientService no se inyecta en staff.

769 pruebas Angular aprobadas,94 archivos; development y production/deployment/SEO aprobados;8 pruebas hosting/configuración.14 recorridos de Chrome con Gateway/servicios/DB reales descartables, incluida invitación médica, activación local, alta/aparición en calendario médico, reprogramación/cancelación, aislamiento/CSRF/revocación/recuperación. Escritorio1500, móviles emulados390/320 y oscuro revisados; corrección de contraste incluida. No prueba en teléfono físico.

Evidencia y capturas: C:/Users/gcast/Documents/GitHub/doctorchart-m3/.fixtures/m7/integration/. Informe canónico: ../doctorchart-backend-go/docs/ai/M7_DELIVERY.md desde raíz de clones; contrato M7_SECRETARIES_API.md en ese backend. Sin documentación duplicada de endpoints.

Invitación por código manual privado; recuperación por código personal, sin email hasta M8. UI reprograma dentro de sede seleccionada; API permite traslado autorizado. Editor comercial del flag pendiente, sin valores predeterminados. STAFF_ENABLED=false y demás flags siguen desactivados en código normal. Main/turnos/ramas anteriores preservadas, sin GitHub remoto, merges, push, worktrees o despliegue. M8 no iniciado.
