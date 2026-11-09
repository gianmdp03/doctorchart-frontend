export const FEATURE_FLAGS = {
 NOTIFICATIONS_ENABLED:true,
 STAFF_ENABLED:true,
 /** M6 public booking stays opt-in until owner authorizes publication. */
 PUBLIC_APPOINTMENTS_ENABLED:true,
  /** M5 medical calendar; enable only after separate integration/production approval. */
  CALENDAR_ENABLED: true,
  /** M3 agenda editor and availability preview; activation requires owner approval. */
  SCHEDULES_ENABLED: true,
  /**
   * Controls access to the AI Clinical Assistant (/ai-assistant).
   * Set to true to re-enable the sidebar link and route access.
   */
  AI_ASSISTANT_ENABLED: false,
  /**
   * Controls access to Medical Calculators (/calculators).
   * Temporarily disabled for the initial release.
   * Set to true to re-enable sidebar navigation, patient banner quick action, and route access.
   */
  CALCULATORS_ENABLED: false,
  /**
   * Controls access to Clinic Administration (/clinics, /clinics/new, /clinics/:id/edit).
   * Initially disabled in M2 while backend M2-SOL and integration verification complete.
   */
  CLINICS_ENABLED: true,
};
