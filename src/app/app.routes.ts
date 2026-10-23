import { CanActivateFn, Routes } from '@angular/router';
import { EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { firstValueFrom, isObservable } from 'rxjs';
import { publicEntryGuard } from './core/guards/public-entry.guard';


function lazyGuard(load: () => Promise<CanActivateFn>): CanActivateFn {
  return (route, state) => {
    const injector = inject(EnvironmentInjector);
    return load().then(guard => {
      const result = runInInjectionContext(injector, () => guard(route, state));
      return isObservable(result) ? firstValueFrom(result) : result;
    });
  };
}
const clinicalNavigationGuard = (module: Parameters<typeof import('./core/guards/clinical-navigation.guard').clinicalNavigationGuard>[0]) => lazyGuard(() => import('./core/guards/clinical-navigation.guard').then(m => m.clinicalNavigationGuard(module)));
const doctorchartPlanGuard = lazyGuard(() => import('./core/guards/doctorchart-plan.guard').then(m => m.doctorchartPlanGuard));
const doctorOnboardingGuard = lazyGuard(() => import('./core/guards/doctor-onboarding.guard').then(m => m.doctorOnboardingGuard));
const doctorWizardGuard = lazyGuard(() => import('./core/guards/doctor-onboarding.guard').then(m => m.doctorWizardGuard));
const preventCompletedOnboardingGuard = lazyGuard(() => import('./core/guards/doctor-onboarding.guard').then(m => m.preventCompletedOnboardingGuard));
const superAdminGuard = lazyGuard(() => import('./core/guards/super-admin.guard').then(m => m.superAdminGuard));

export const routes: Routes = [
  {
    path: 'sin-plan',
    canActivate: [lazyGuard(() => import('./core/guards/doctorchart-plan.guard').then(m => m.doctorchartNoPlanGuard))],
    loadComponent: () => import('./features/auth/no-plan.component').then(m => m.NoPlanComponent),
  },
  {
    path: 'admin/especialidades',
    canActivate: [superAdminGuard],
    loadComponent: () => import('./features/admin-specialties/admin-specialties.component').then(m => m.AdminSpecialtiesComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    canActivate: [publicEntryGuard],
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'login',
    canActivate: [publicEntryGuard],
    loadComponent: () => import('./features/auth/login-page.component').then(m => m.LoginPageComponent),
  },
  {
    path: 'dashboard',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { preload: true },
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'calendario-vacunacion',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard, clinicalNavigationGuard('VACCINATION')],
    loadComponent: () =>
      import('./features/vaccination-calendar/calendario-vacunacion.component').then(
        (m) => m.VaccinationCalendarComponent,
      ),
  },
  {
    path: 'pacientes',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { preload: true },
    loadComponent: () =>
      import('./features/patient-list/patient-list.component').then(
        (m) => m.PatientListComponent
      ),
  },
  {
    path: 'pacientes/nuevo',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () =>
      import('./features/patient-form/patient-form-page.component').then(
        (m) => m.PatientFormPageComponent
      ),
  },
  {
    path: 'pacientes/:id/editar',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () =>
      import('./features/patient-form/patient-form-page.component').then(
        (m) => m.PatientFormPageComponent
      ),
  },
  {
    path: 'pacientes/:id',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { preload: true },
    loadComponent: () =>
      import('./features/patient-record/patient-record.component').then(
        (m) => m.PatientRecordComponent
      ),
  },
  {
    path: 'ficha',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { preload: true },
    loadComponent: () =>
      import('./features/patient-record/patient-record.component').then(
        (m) => m.PatientRecordComponent
      ),
  },
  {
    path: 'ficha/:id/editar',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () =>
      import('./features/patient-form/patient-form-page.component').then(
        (m) => m.PatientFormPageComponent
      ),
  },
  {
    path: 'ficha/:id',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { preload: true },
    loadComponent: () =>
      import('./features/patient-record/patient-record.component').then(
        (m) => m.PatientRecordComponent
      ),
  },
  {
    path: 'consultas/:id',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () => import('./features/encounter-detail/encounter-detail-page.component').then(m => m.EncounterDetailPageComponent),
  },
  {
    path: 'asistente',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard, lazyGuard(() => import('./core/guards/ai-assistant.guard').then(m => m.aiAssistantGuard))],
    loadComponent: () => import('./features/ai-assistant/ai-assistant-page.component').then(m => m.AiAssistantPageComponent),
  },
  {
    path: 'perfil',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () => import('./features/auth/user-profile-page.component').then(m => m.UserProfilePageComponent),
  },
  {
    path: 'consultas',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { preload: true },
    loadComponent: () =>
      import('./features/consultas/consultas.component').then(
        (m) => m.ConsultasComponent
      ),
  },
  {
    path: 'calculadoras',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard, clinicalNavigationGuard('CALCULATORS')],
    loadComponent: () =>
      import('./features/medical-calculators/medical-calculators.component').then(
        (m) => m.MedicalCalculatorsComponent
      ),
  },
  {
    path: 'onboarding/select-specialty',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, preventCompletedOnboardingGuard],
    loadComponent: () =>
      import('./features/onboarding/specialty-selection/specialty-selection.component').then(
        (m) => m.SpecialtySelectionComponent
      ),
  },
  {
    path: 'onboarding/setup',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorWizardGuard],
    loadComponent: () =>
      import('./features/onboarding/onboarding-wizard/onboarding-wizard.component').then(
        (m) => m.OnboardingWizardComponent
      ),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];
