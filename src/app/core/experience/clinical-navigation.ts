import { ClinicalNavigationId } from '../models/specialty-experience.model';

export interface ClinicalNavigationItem {
  id: ClinicalNavigationId;
  path: string;
  label: string;
  title: string;
  icon: string;
}

/** Presentation belongs to implemented modules; this registry contains no specialty defaults. */
export const CLINICAL_NAVIGATION: Record<ClinicalNavigationId, ClinicalNavigationItem> = {
  DASHBOARD: { id: 'DASHBOARD', path: '/dashboard', label: 'Inicio', title: 'Inicio', icon: 'lucideLayoutDashboard' },
  PATIENTS: { id: 'PATIENTS', path: '/patients', label: 'Pacientes', title: 'Directorio de Pacientes', icon: 'lucideUsers' },
  CALCULATORS: { id: 'CALCULATORS', path: '/calculators', label: 'Calculadoras', title: 'Calculadoras Médicas', icon: 'lucideCalculator' },
  VACCINATION: { id: 'VACCINATION', path: '/vaccination-calendar', label: 'Vacunación', title: 'Calendario de vacunación', icon: 'lucideCalendarDays' },
  WIZARD: { id: 'WIZARD', path: '/onboarding/setup', label: 'Personalizar Fichas', title: 'Personalizar Fichas y Consultas', icon: 'lucideSliders' },
};
