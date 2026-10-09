import { clinicalNavigationGuard } from './core/guards/clinical-navigation.guard';
import { Routes } from '@angular/router';
import { doctorchartPlanGuard } from './core/guards/doctorchart-plan.guard';
import { doctorOnboardingGuard, doctorWizardGuard, preventCompletedOnboardingGuard } from './core/guards/doctor-onboarding.guard';
import { superAdminGuard } from './core/guards/super-admin.guard';

export const routes: Routes = [
  {
    path: 'admin/especialidades',
    canActivate: [superAdminGuard],
    loadComponent: () => import('./features/admin-specialties/admin-specialties.component').then(m => m.AdminSpecialtiesComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
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
    redirectTo: 'dashboard',
  },
];
