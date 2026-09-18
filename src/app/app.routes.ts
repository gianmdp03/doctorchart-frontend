import { Routes } from '@angular/router';
import { doctorchartPlanGuard } from './core/guards/doctorchart-plan.guard';
import { doctorOnboardingGuard, preventCompletedOnboardingGuard } from './core/guards/doctor-onboarding.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pacientes',
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
    path: 'ficha',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () =>
      import('./features/patient-record/patient-record.component').then(
        (m) => m.PatientRecordComponent
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
    path: 'curvas',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () =>
      import('./features/growth-curves/growth-curves.component').then(
        (m) => m.GrowthCurvesComponent
      ),
  },
  {
    path: 'hitos',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () =>
      import('./features/milestones/milestones.component').then(
        (m) => m.MilestonesComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'pacientes',
  },
];
