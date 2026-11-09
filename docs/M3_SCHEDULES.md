# M3 — agenda y disponibilidad
30/10/2026. Implementación en codex/m3-availability, derivada de turnos 471daaf. Un único agente; M4 no autorizado.

Ruta Angular: /clinics/:id/schedule. Editor semanal con múltiples franjas, duración, anticipación/horizonte, excepciones por fechas y vista día/semana. Servicios HTTP reales, sin fallback a mocks. IDs/versiones siguen siendo strings; 409 conserva el borrador y exige recargar. Respuestas tardías no se aplican a otro consultorio. Los permisos comerciales vencidos o no verificables bloquean guardar; reintento no borra campos. Las fechas usan app-date-picker y dd/MM/aaaa.

Contrato único: ../doctorchart-backend-go/docs/ai/contracts/M3_AVAILABILITY_API.md (M3-AVAILABILITY-v1). M2 intacto. No existen reservas, pacientes automáticos ni cambios clínicos.

SCHEDULES_ENABLED=false y CLINICS_ENABLED=false en la aplicación normal. Backend también requiere SCHEDULES_ENABLED=true para registrar las rutas M3. Se habilitó solo el backend del ensayo y un entrypoint temporal de navegador con AuthService, interceptores y componentes reales; no se activaron los flags en fuentes aprobadas ni se modificó Cloudflare.
La publicación/activación futura deberá comprobar además el soporte del hosting para el deep link /clinics/:id/schedule: no se cambiaron reglas de despliegue o hosting en esta fase.

Pruebas: suite Angular completa 732 PASS / 84 archivos; focal M3 final 12 PASS / 3 archivos. Build desarrollo y build producción con configuración pública sintética PASS. Sin credenciales reales ni publicación.
Integración real: Supabase Auth oficial descartable → Gateway 55197fa → backend M3 → Billing 80c171c → PostgreSQL 17 descartable. Login por contraseña, guardado de múltiples franjas, disponibilidad día/semana, vacaciones, error de versión con preservación y aislamiento/conflictos entre sedes PASS. Revisión visual escritorio 1440px, móvil 320/390px sin overflow y tema oscuro real (:root.dark). Es emulación de navegador, no teléfono físico.

Evidencia local persistente: C:/Users/gcast/Documents/GitHub/doctorchart-m3/.fixtures/integration/m3-browser-results.json, m3-http.json, schedule-desktop.png, schedule-mobile-320.png, schedule-mobile-390.png y schedule-dark.png. No subir private-state.json, archivos .env, claves ni sesiones del fixture.

Los checkouts habituales permanecen en main intactos. Trabajo en clones normales independientes, sin worktrees, pushes, merges a main o despliegues. Ver el handoff M3 del backend para versión SQL, resultados finales y estado de recursos temporales.


La protección final bloquea guardar si una fecha visible de excepción es inválida, incluso si ngModel conserva un valor anterior. Backend completado y validado: ver docs/ai/M3_DELIVERY.md del repositorio hermano.
