import { Routes } from '@angular/router';
import { doctorchartPlanGuard } from './core/guards/doctorchart-plan.guard';
import { doctorOnboardingGuard, preventCompletedOnboardingGuard } from './core/guards/doctor-onboarding.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'calendario-vacunacion',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () =>
      import('./features/vaccination-calendar/calendario-vacunacion.component').then(
        (m) => m.VaccinationCalendarComponent,
      ),
  },
  {
    path: 'pacientes',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () =>
      import('./features/patient-list/patient-list.component').then(
        (m) => m.PatientListComponent
      ),
  },
  {
    path: 'pacientes/:id',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () =>
      import('./features/patient-record/patient-record.component').then(
        (m) => m.PatientRecordComponent
      ),
  },
  {
    path: 'ficha',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () =>
      import('./features/patient-record/patient-record.component').then(
        (m) => m.PatientRecordComponent
      ),
  },
  {
    path: 'ficha/:id',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () =>
      import('./features/patient-record/patient-record.component').then(
        (m) => m.PatientRecordComponent
      ),
  },
  {
    path: 'consultas',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () =>
      import('./features/consultas/consultas.component').then(
        (m) => m.ConsultasComponent
      ),
  },
  {
    path: 'calculadoras',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () =>
      import('./features/medical-calculators/medical-calculators.component').then(
        (m) => m.MedicalCalculatorsComponent
      ),
  },
  {
    path: 'onboarding/select-specialty',
    canActivate: [doctorchartPlanGuard, preventCompletedOnboardingGuard],
    loadComponent: () =>
      import('./features/onboarding/specialty-selection/specialty-selection.component').then(
        (m) => m.SpecialtySelectionComponent
      ),
  },
  {
    path: 'onboarding/setup',
    canActivate: [doctorchartPlanGuard],
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
