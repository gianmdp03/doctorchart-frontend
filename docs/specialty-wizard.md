# Especialidades y wizard: contrato compartido

La fuente de verdad compartida está en el repositorio backend hermano:

- [Reglas y modelo](../../doctorchart-backend/docs/specialty-wizard/README.md)
- [Contrato HTTP](../../doctorchart-backend/docs/specialty-wizard/api.md)
- [JSON Schema v1](../../doctorchart-backend/src/main/resources/wizard/wizard-definition.schema.json)
- [Único contenido inicial: Pediatría](../../doctorchart-backend/src/main/resources/seed/specialties/pediatrics.json)
- [Fase 3 implementada: endpoints y evidencia](../../doctorchart-backend/docs/specialty-wizard/phase-3.md)

Estas rutas presuponen los repositorios doctorchart-frontend y doctorchart-backend como directorios hermanos. No copiar ni mantener otra versión del contrato aquí.

La fase 3 sustituye los endpoints anteriores del backend. La [fase 4](specialty-wizard-phase-4.md) conecta catálogo, selección, configuración personal y editor Angular al contrato canónico. El selector y el wizard ya no tienen listas de especialidades, pasos por categoría fija ni defaults locales. La [fase 6](specialty-wizard-phase-6.md) conecta pacientes y consultas al contrato canónico, con snapshots por registro, respuestas tipadas, resultados calculados por el servidor y escrituras versionadas. Retira las plantillas y el enum de especialidades del circuito clínico.

La [fase 5](specialty-wizard-phase-5.md) agrega el panel de Super admin para crear especialidades, editar su wizard inicial, publicar y gestionar su disponibilidad. La administración tiene acceso independiente del onboarding médico y no modifica las configuraciones personales existentes.

Siempre usar app-date-picker; fechas visibles/ingresadas dd/MM/aaaa y conversión ISO en el límite de datos. Pediatría es el único seed; la especialidad ficticia del backend es solo un fixture de validación y nunca se muestra ni se carga en la aplicación.

Detenerse al finalizar cada fase y solicitar al usuario continuar antes de comenzar la siguiente.
