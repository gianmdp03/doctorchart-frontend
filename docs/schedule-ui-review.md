# Revisión visual de horarios — 25/11/2026

Alcance: pantalla existente `/clinics/:id/schedule`, incluida teleconsulta. No se modificaron backend, contratos, reglas clínicas, permisos, validaciones ni servicios. Las demás pantallas del frontend quedan fuera de esta revisión.

## Dirección y cambios

Se conserva la identidad DoctorChart: Google Sans autoalojada, teal y tokens semánticos compartidos para claro/oscuro. El resumen semanal representa los horarios del editor con horas reales y barras sobre una escala de 00 a 24 h; no representa disponibilidad calculada ni cupos reservables. En teleconsulta respeta la especialidad activa.

La semana editable aprovecha dos columnas en escritorio y una en móvil. Se eliminó el contenedor adicional de cada bloque habitual, conservando separadores entre bloques. Consultorio, creación de horarios, otras agendas, reglas, excepciones y disponibilidad tienen jerarquías diferenciadas. Se agregaron ayudas sobre anticipación y horizonte, y navegación con foco explícito y espacio calculado para las barras sticky.

Skills consultadas: las 16 solicitadas e instaladas. La dirección combina `editorial-tech`, `agency-grid-layout-minimal` y claridad informativa de `technical-wireframe-info-layout`, con límites de `no-ai-design-slop` y su auditoría. `design-first-ui-prompting` y `iterate-until-verified` guiaron la definición y verificación. Se adaptaron las pautas visuales al trabajo clínico: sin imágenes decorativas, Three.js, cursor personalizado, scroll secuestrado ni nuevas dependencias. Los iconos siguen la familia Lucide ya instalada. Las sombras se mantienen neutrales y localizadas en la barra sticky.

Movimiento: transiciones CSS de 160–180 ms y entrada de 380 ms para el resumen; se respeta movimiento reducido. Las pautas de GSAP, Lenis, reveal y blur se evaluaron sin incorporar esos motores o efectos: esta pantalla requiere controles estables y desplazamiento nativo.

## Verificación

| Comprobación | Resultado y evidencia |
| --- | --- |
| Tests existentes de editor y servicio | 23 tests, 2 archivos, pasan con `ng test --watch=false --include=src/app/features/schedules/schedule-page.component.spec.ts --include=src/app/features/schedules/schedules.service.spec.ts` |
| Claro y oscuro | Capturas reales de Angular en 1440, 834, 390 y 320 px: sin overflow horizontal |
| Texto ampliado | 320 px con raíz de 20 px: sin overflow; la sección enfocada queda debajo de la barra sticky |
| Interacciones | Agregar/quitar bloque, agregar/quitar excepción, consultar disponibilidad y guardar pasan con API sintética |
| Teleconsulta | Se conservan controles condicionales y resumen de la especialidad activa |
| Movimiento | Reduced motion sin animación del resumen; contenido visible con movimiento normal |
| Revisión independiente | Otro agente inspeccionó diff y capturas; sin fallos bloqueantes en el alcance |
| Build optimizado aislado | Pasa con configuración development, optimization=true y source-map=false |

Las capturas y el resultado de navegador están en `.angular/schedule-evidence/`; el script de ensayo está en `.angular/schedule-ui.cjs`. Son artefactos locales ignorados por Git. Todas las operaciones de navegador usaron fixtures, sin escrituras reales al backend.

## Límites

El build del checkout completo falla por marcadores de merge preexistentes en `src/app/features/appointments/confirmation-page.component.ts` y estructura HTML inválida en su template. Se preservaron ambos archivos. Para revisar horarios se utilizó una copia descartable en `.angular/schedule-review/`, sustituyendo exclusivamente esa pantalla ajena por un componente vacío. Por tanto, el build aislado no certifica el build completo ni la confirmación de reservas. La configuración production de esa copia tampoco dispone de `environment.deploy.ts`; no se generó ni alteró configuración productiva.

No se certifica contraste WCAG medido ni uso con lector de pantalla. La referencia suministrada pertenece a DoctorChart; no se introdujeron imágenes, marcas ni referencias de terceros. No se realizó una auditoría de originalidad del historial completo del producto.
