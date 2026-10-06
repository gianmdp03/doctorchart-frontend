# Plan de reparación por bloques

Este es el orden acordado para el refactor general. La numeración es independiente
de las fases anteriores de especialidades y wizard. Cada bloque se cierra con
evidencia antes de comenzar el siguiente y se conserva la experiencia de pediatría.

| Bloque | Reparación | Estado |
| --- | --- | --- |
| 1. Autenticación | Unificar autenticación y eliminar accesos alternativos inseguros. | Cumplido |
| 2. Permisos de estudios | Impedir acceso a archivos de pacientes ajenos. | Cumplido |
| 3. Permisos de calculadoras | Validar propietario y relación paciente–consulta. | Cumplido |
| 4. Cálculos oficiales | Calcular y validar resultados en backend. | Cumplido |
| 5. Interfaz de calculadoras | Separar cada calculadora y consumir el catálogo backend. | Cumplido; ver [implementación y pruebas](calculator-interface-block-5.md) |
| 6. Persistencia de recetas | Guardar recetas y órdenes en backend. | Cumplido; ver [implementación y pruebas](prescription-persistence-block-6.md) |
| 7. Impresión | Eliminar datos inventados y vincular el documento al paciente y médico. | Pendiente; siguiente bloque |
| 8. Contexto de sesión | Evitar mezclar pacientes, borradores y conversaciones. | Pendiente |
| 9. Mediciones | Unificar fuentes y unidades; eliminar el camino antiguo. | Pendiente |
| 10. Vacunación | Gobernar calendario, identificadores y reglas desde backend. | Pendiente |
| 11. Listados y estadísticas | Llevar filtros completos y agregados al backend. | Pendiente |
| 12. Experiencias por especialidad | Aislar módulos y componer navegación, pestañas y acciones. | Pendiente |
| 13. Configuración y almacenamiento | Resolver archivos, secretos, entornos y documentación. | Pendiente |

La comprobación de los bloques 1–4 pasó 215 pruebas backend específicas y 21
frontend antes de completar la separación de la interfaz. El trabajo previo de
catálogo y favoritos por médico y especialidad permanece dentro del bloque 5.

El bloque 5 estaba parcialmente implementado: consumía el catálogo backend,
pero mantenía los ocho formularios en un único componente. Su cierre se corrigió
separando componentes, estado y comportamiento por calculadora. Este trabajo no
se renumeró como bloque 6. El bloque 6 se completó después mediante su propio
contrato de persistencia y pruebas, sin dar por reparado el bloque 7.

No se incorporan migraciones de datos ni adaptadores para el código anterior.
La configuración de calculadoras del backend requiere su esquema nuevo,
documentado en [el contrato backend](../../doctorchart-backend/docs/calculators.md).
