# Desactivación Temporal de Calculadoras Médicas

## Estado actual
- **Estado:** Desactivado por Feature Flag en Frontend (`FEATURE_FLAGS.CALCULATORS_ENABLED = false`).
- **Fecha:** Octubre 2026.
- **Razón:** El módulo requiere ajustes y no forma parte del alcance esencial de la primera versión.

## Puntos de integración protegidos
1. **Sidebar (`SidebarComponent`):** El store `WorkspaceStore` filtra `'CALCULATORS'` de su señal reactiva `navigation()` cuando el flag está en `false`.
2. **Banner de paciente (`PatientQuickBannerComponent`):** La función `workspace.hasNavigation('CALCULATORS')` retorna `false`, ocultando el botón/píldora de calculadora.
3. **Ruta (`clinicalNavigationGuard('CALCULATORS')`):** Cualquier intento de navegación directa a `/calculadoras` es interceptado y redirigido al `/dashboard`.
4. **Preservación:** Todos los componentes (`MedicalCalculatorsComponent`, formularios de dosis, superficie corporal, aclaramiento renal, fórmulas, registros y tests unitarios) permanecen intactos en `src/app/features/medical-calculators/`.

## Instrucciones para Agentes de IA (Reactivación)
Cuando se solicite reactivar la calculadora:
1. Abrir `src/app/core/config/feature-flags.ts`.
2. Modificar:
   ```typescript
   export const FEATURE_FLAGS = {
     CALCULATORS_ENABLED: true, // Cambiar a true
   };
   ```
3. Ejecutar `npm test -- --watch=false` para comprobar que las pruebas de integración y navegación pasen correctamente.
