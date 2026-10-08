/**
 * Global Feature Flags for DoctorChart Frontend.
 *
 * ============================================================================
 * INSTRUCCIÓN PARA AGENTES DE IA / DEVELOPERS / FUTURE AI AGENTS:
 * ============================================================================
 * Para reactivar el módulo de Calculadoras Médicas en el futuro:
 *
 * 1. Cambiar el valor de `CALCULATORS_ENABLED` a `true` en este archivo:
 *    CALCULATORS_ENABLED: true,
 *
 * Al cambiarlo a `true`, automáticamente:
 * - Se vuelve a mostrar la opción "Calculadoras" en la barra lateral (Sidebar).
 * - Se vuelve a mostrar el acceso rápido a Calculadora en la barra del paciente (PatientQuickBanner).
 * - Se reactiva la ruta `/calculadoras` en el guard de navegación (clinicalNavigationGuard).
 *
 * No es necesario borrar ni reescribir ningún componente, servicio o fórmula médica,
 * ya que todo el código del módulo está preservado intacto.
 * ============================================================================
 */
export const FEATURE_FLAGS = {
  CALCULATORS_ENABLED: false,
};

export type FeatureFlags = typeof FEATURE_FLAGS;
