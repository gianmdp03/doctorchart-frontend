import { CanActivateFn, Routes } from '@angular/router';
import { EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { firstValueFrom, isObservable } from 'rxjs';
import { clinicalContextGuard, clinicalLeaveGuard } from '../app/core/guards/clinical-context.guard';
import { doctorOnboardingGuard, doctorWizardGuard } from '../app/core/guards/doctor-onboarding.guard';

function lazyGuard(load: () => Promise<CanActivateFn>): CanActivateFn {
  return (route, state) => {
    const injector = inject(EnvironmentInjector);
    return load().then((guard) => {
      const result = runInInjectionContext(injector, () => guard(route, state));
      return isObservable(result) ? firstValueFrom(result) : result;
    });
  };
}

function orderedGuards(guards: CanActivateFn[]): CanActivateFn {
  return (route, state) => {
    const injector = inject(EnvironmentInjector);
    return (async () => {
      for (const guard of guards) {
        const result = runInInjectionContext(injector, () => guard(route, state));
        const value = isObservable(result) ? await firstValueFrom(result) : await result;
        if (value !== true) return value;
      }
      return true;
    })();
  };
}

const clinicalNavigationGuard = (
  module: Parameters<typeof import('../app/core/guards/clinical-navigation.guard').clinicalNavigationGuard>[0],
) =>
  lazyGuard(() =>
    import('../app/core/guards/clinical-navigation.guard').then((m) => m.clinicalNavigationGuard(module)),
  );

const loadHelp = () => import('../app/features/help/help-page.component').then((m) => m.HelpPageComponent);
const loadGenerator = () =>
  import('./demo-patient-generator-page.component').then((m) => m.DemoPatientGeneratorPageComponent);

const baseDemoRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    title: 'Panel clínico | DemoChart',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorOnboardingGuard],
    loadComponent: () => import('../app/features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'patients',
    title: 'Directorio de pacientes | DemoChart',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorOnboardingGuard],
    loadComponent: () => import('../app/features/patient-list/patient-list.component').then((m) => m.PatientListComponent),
  },
  {
    path: 'patients/new',
    title: 'Generador de pacientes | DemoChart',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorOnboardingGuard],
    loadComponent: loadGenerator,
  },
  {
    path: 'patients/:id/edit',
    title: 'Generador de pacientes | DemoChart',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorOnboardingGuard],
    loadComponent: loadGenerator,
  },
  {
    path: 'records/:id/edit',
    title: 'Generador de pacientes | DemoChart',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorOnboardingGuard],
    loadComponent: loadGenerator,
  },
  {
    path: 'patients/access-audit',
    title: 'Auditoría de accesos | DemoChart',
    canActivate: [doctorOnboardingGuard],
    data: { audit: true },
    loadComponent: () =>
      import('../app/features/patient-list/patient-administration-page.component').then(
        (m) => m.PatientAdministrationPageComponent,
      ),
  },
  {
    path: 'patients/archived',
    title: 'Fichas anuladas | DemoChart',
    canActivate: [doctorOnboardingGuard],
    loadComponent: () =>
      import('../app/features/patient-list/patient-administration-page.component').then(
        (m) => m.PatientAdministrationPageComponent,
      ),
  },
  {
    path: 'patients/:id',
    title: 'Ficha clínica | DemoChart',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorOnboardingGuard],
    loadComponent: () =>
      import('../app/features/patient-record/patient-record.component').then((m) => m.PatientRecordComponent),
  },
  {
    path: 'records',
    title: 'Ficha clínica | DemoChart',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorOnboardingGuard],
    loadComponent: () =>
      import('../app/features/patient-record/patient-record.component').then((m) => m.PatientRecordComponent),
  },
  {
    path: 'records/:id',
    title: 'Ficha clínica | DemoChart',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorOnboardingGuard],
    loadComponent: () =>
      import('../app/features/patient-record/patient-record.component').then((m) => m.PatientRecordComponent),
  },
  {
    path: 'encounters',
    title: 'Historial de consultas | DemoChart',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorOnboardingGuard],
    loadComponent: () => import('../app/features/consultas/consultas.component').then((m) => m.ConsultasComponent),
  },
  {
    path: 'encounters/:id',
    title: 'Detalle de la consulta | DemoChart',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorOnboardingGuard],
    loadComponent: () =>
      import('../app/features/encounter-detail/encounter-detail-page.component').then(
        (m) => m.EncounterDetailPageComponent,
      ),
  },
  {
    path: 'vaccination-calendar',
    title: 'Calendario de vacunación | DemoChart',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorOnboardingGuard, clinicalNavigationGuard('VACCINATION')],
    loadComponent: () =>
      import('../app/features/vaccination-calendar/calendario-vacunacion.component').then(
        (m) => m.VaccinationCalendarComponent,
      ),
  },
  {
    path: 'specialties',
    title: 'Mis especialidades | DemoChart',
    loadComponent: () =>
      import('../app/features/specialties/my-specialties.component').then((m) => m.MySpecialtiesComponent),
  },
  {
    path: 'onboarding/select-specialty',
    title: 'Selección de especialidad | DemoChart',
    redirectTo: 'specialties',
    pathMatch: 'full',
  },
  {
    path: 'onboarding/setup',
    title: 'Personalizar fichas y consultas | DemoChart',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorWizardGuard],
    loadComponent: () =>
      import('../app/features/onboarding/onboarding-wizard/onboarding-wizard.component').then(
        (m) => m.OnboardingWizardComponent,
      ),
  },
  {
    path: 'calendar',
    title: 'Agenda de turnos (Vista visual) | DemoChart',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorOnboardingGuard],
    loadComponent: () =>
      import('../app/features/calendar/calendar-page.component').then((m) => m.CalendarPageComponent),
  },
  {
    path: 'clinics',
    title: 'Consultorios y teleconsulta (Vista visual) | DemoChart',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorOnboardingGuard],
    loadComponent: () =>
      import('../app/features/clinics/clinics-page.component').then((m) => m.ClinicsPageComponent),
  },
  {
    path: 'clinics/:id/schedule',
    title: 'Horarios del consultorio | DemoChart',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorOnboardingGuard],
    loadComponent: () =>
      import('../app/features/schedules/schedule-page.component').then((m) => m.SchedulePageComponent),
  },
  {
    path: 'schedules',
    title: 'Mis horarios | DemoChart',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorOnboardingGuard],
    loadComponent: () =>
      import('../app/features/schedules/schedule-page.component').then((m) => m.SchedulePageComponent),
  },
  {
    path: 'booking-publication',
    title: 'Reservas online (Vista visual) | DemoChart',
    canActivate: [doctorOnboardingGuard],
    loadComponent: () =>
      import('../app/features/appointments/publication-page.component').then((m) => m.PublicationPageComponent),
  },
  {
    path: 'secretaries',
    title: 'Secretaría (Vista visual) | DemoChart',
    canActivate: [doctorOnboardingGuard],
    loadComponent: () => import('../app/features/staff/secretaries.component').then((m) => m.SecretariesComponent),
  },
  {
    path: 'profile',
    title: 'Perfil profesional | DemoChart',
    canActivate: [doctorOnboardingGuard],
    loadComponent: () =>
      import('../app/features/auth/user-profile-page.component').then((m) => m.UserProfilePageComponent),
  },
  { path: 'help', title: 'Ayuda | DemoChart', loadComponent: loadHelp },
  { path: 'help/appointments', title: 'Guía de turnos | DemoChart', loadComponent: loadHelp, data: { helpGuide: 'appointments' } },
  { path: 'help/secretaries', title: 'Guía de secretaría | DemoChart', loadComponent: loadHelp, data: { helpGuide: 'secretaries' } },
  { path: 'help/account', title: 'Guía de cuenta | DemoChart', loadComponent: loadHelp, data: { helpGuide: 'account' } },
  { path: 'help/clinical', title: 'Guía de clínica | DemoChart', loadComponent: loadHelp, data: { helpGuide: 'clinical' } },
  { path: '**', redirectTo: 'dashboard' },
];

const clinicalPaths = new Set([
  'dashboard',
  'patients',
  'patients/new',
  'patients/access-audit',
  'patients/archived',
  'patients/:id/edit',
  'patients/:id',
  'records',
  'records/:id/edit',
  'records/:id',
  'encounters',
  'encounters/:id',
  'vaccination-calendar',
  'onboarding/setup',
]);

export const demoRoutes: Routes = baseDemoRoutes.map((route) => {
  const clinical = clinicalPaths.has(route.path ?? '');
  if (clinical) {
    route.data = { ...route.data, clinicalContext: true, allowPending: route.path === 'onboarding/setup' };
    route.canDeactivate = [clinicalLeaveGuard];
  }
  if (clinical || route.canActivate?.includes(doctorOnboardingGuard)) {
    const existingGuards = (route.canActivate ?? []) as CanActivateFn[];
    const guards: CanActivateFn[] = [
      clinicalContextGuard,
      ...existingGuards.filter((g) => !clinical || g !== doctorOnboardingGuard),
    ];
    route.canActivate = [orderedGuards(guards)];
    route.runGuardsAndResolvers = 'always';
  }
  return route;
});
