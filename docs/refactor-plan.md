# Plan de reparación por bloques

Este es el orden acordado para el refactor general. La numeración es independiente
de las fases anteriores de especialidades y wizard. Cada bloque se cierra con
evidencia antes de comenzar el siguiente y se conserva la experiencia de pediatría.

| Bloque | Reparación | Estado |
| --- | --- | --- |
| 1. Autenticación | Unificar autenticación y eliminar accesos alternativos inseguros. | Cumplido; bypass del gateway externo corregido y verificado en 13a |
| 2. Permisos de estudios | Impedir acceso a archivos de pacientes ajenos. | Cumplido |
| 3. Permisos de calculadoras | Validar propietario y relación paciente–consulta. | Cumplido |
| 4. Cálculos oficiales | Calcular y validar resultados en backend. | Cumplido |
| 5. Interfaz de calculadoras | Separar cada calculadora y consumir el catálogo backend. | Cumplido; ver [implementación y pruebas](calculator-interface-block-5.md) |
| 6. Persistencia de recetas | Guardar recetas y órdenes en backend. | Cumplido; ver [implementación y pruebas](prescription-persistence-block-6.md) |
| 7. Impresión | Eliminar datos inventados y vincular el documento al paciente y médico. | Cumplido; ver [implementación y pruebas](printing-block-7.md) |
| 8. Contexto de sesión | Evitar mezclar pacientes, borradores y conversaciones. | Cumplido; ver [implementación y pruebas](session-context-block-8.md) |
| 9. Mediciones | Unificar fuentes y unidades; eliminar el camino antiguo. | Cumplido; ver [implementación y pruebas](measurements-block-9.md) |
| 10. Vacunación | Gobernar calendario, identificadores y reglas desde backend. | Cumplido; ver [implementación y pruebas](vaccination-block-10.md) |
| 11. Listados y estadísticas | Llevar filtros completos y agregados al backend. | Cumplido; ver [implementación y pruebas](listings-block-11.md) |
| 12. Experiencias por especialidad | Aislar módulos y componer navegación, pestañas y acciones. | Cumplido: [12a navegación](specialty-navigation-block-12a.md), [12b módulos](record-modules-block-12b.md), [12c pestañas](record-tabs-block-12c.md), [12d acciones](record-actions-block-12d.md) y [12e disponibilidad backend e IA](record-availability-block-12e.md) |
| 13. Configuración y almacenamiento | Resolver archivos, secretos, entornos y documentación. | Cumplido: [13a seguridad y configuración](security-configuration-block-13a.md), [13b archivos de estudios](study-storage-block-13b.md), [13c almacenamiento del navegador](browser-storage-block-13c.md) y [13d base nueva, arranque y verificación conectada](startup-block-13d.md) |

La comprobación de los bloques 1–4 pasó 215 pruebas backend específicas y 21
frontend antes de completar la separación de la interfaz. El trabajo previo de
catálogo y favoritos por médico y especialidad permanece dentro del bloque 5.

El bloque 5 estaba parcialmente implementado: consumía el catálogo backend,
pero mantenía los ocho formularios en un único componente. Su cierre se corrigió
separando componentes, estado y comportamiento por calculadora. Este trabajo no
se renumeró como bloque 6. El bloque 6 se completó después mediante su propio
contrato de persistencia y pruebas. El bloque 7 se completó posteriormente con
una proyección de impresión autorizada y la eliminación de datos inventados.

No se incorporan migraciones de datos ni adaptadores para el código anterior.
La revisión de 12e encontró `X-Dev-Bypass` en `api-gateway/main.go` y un secreto
predeterminado fijo en `ai-gateway/config.go`. Ambos se corrigieron y
verificaron en [13a](security-configuration-block-13a.md), junto con roles y planes
administrados en servidor, validación de JWT, CORS y configuración externa.
La configuración de calculadoras del backend requiere su esquema nuevo,
documentado en [el contrato backend](../../doctorchart-backend/docs/calculators.md).

El cierre de 13d incluye el arranque completo y reinicio sobre PostgreSQL nuevo,
643 pruebas backend sin excluir el smoke, 565 frontend, 3 de configuración y 3
del servidor frontend de producción. Se comprobó además el circuito pediátrico
con las cuentas de prueba, persistencia, archivos privados, impresión e IA reales.
El informe de 13d distingue esta evidencia de la puesta en producción y registra
las decisiones separadas observadas sobre límites comerciales y texto del login.
