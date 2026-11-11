import { CanActivateFn, Routes } from '@angular/router';
import { EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { firstValueFrom, isObservable } from 'rxjs';
import { publicEntryGuard } from './core/guards/public-entry.guard';
import { FEATURE_FLAGS } from './core/config/feature-flags';
import { clinicalContextGuard, clinicalLeaveGuard } from './core/guards/clinical-context.guard';


function lazyGuard(load: () => Promise<CanActivateFn>): CanActivateFn {
  return (route, state) => {
    const injector = inject(EnvironmentInjector);
    return load().then(guard => {
      const result = runInInjectionContext(injector, () => guard(route, state));
      return isObservable(result) ? firstValueFrom(result) : result;
    });
  };
}
// Angular evaluates guards in one canActivate array concurrently. Clinical
// capabilities must observe the context authorized by the preceding guard.
function orderedGuards(guards:CanActivateFn[]):CanActivateFn{
 return (route,state)=>{const injector=inject(EnvironmentInjector);return(async()=>{
  for(const guard of guards){const result=runInInjectionContext(injector,()=>guard(route,state));const value=isObservable(result)?await firstValueFrom(result):await result;if(value!==true)return value;}
  return true;
 })();};
}
const clinicalNavigationGuard = (module: Parameters<typeof import('./core/guards/clinical-navigation.guard').clinicalNavigationGuard>[0]) => lazyGuard(() => import('./core/guards/clinical-navigation.guard').then(m => m.clinicalNavigationGuard(module)));
const doctorchartPlanGuard = lazyGuard(() => import('./core/guards/doctorchart-plan.guard').then(m => m.doctorchartPlanGuard));
const doctorOnboardingGuard = lazyGuard(() => import('./core/guards/doctor-onboarding.guard').then(m => m.doctorOnboardingGuard));
const doctorWizardGuard = lazyGuard(() => import('./core/guards/doctor-onboarding.guard').then(m => m.doctorWizardGuard));
const preventCompletedOnboardingGuard = lazyGuard(() => import('./core/guards/doctor-onboarding.guard').then(m => m.preventCompletedOnboardingGuard));
const superAdminGuard = lazyGuard(() => import('./core/guards/super-admin.guard').then(m => m.superAdminGuard));
const clinicsGuard = lazyGuard(() => import('./core/guards/clinics.guard').then(m => m.clinicsGuard));

const baseRoutes: Routes = [
 {path:'specialties',canActivate:[doctorchartPlanGuard],loadComponent:()=>import('./features/specialties/my-specialties.component').then(m=>m.MySpecialtiesComponent)},
 ...(['login','activate','recover'] as const).map(mode=>({path:'staff/'+mode,data:{mode},canActivate:[lazyGuard(()=>import('./core/guards/staff.guard').then(m=>m.staffFeatureGuard))],loadComponent:()=>import('./features/staff/staff-auth.component').then(m=>m.StaffAuthComponent)})),
 {path:'staff/calendar',canActivate:[lazyGuard(()=>import('./core/guards/staff.guard').then(m=>m.staffSessionGuard))],loadComponent:()=>import('./features/staff/staff-calendar.component').then(m=>m.StaffCalendarComponent)},
 {path:'secretaries',canActivate:[doctorchartPlanGuard,doctorOnboardingGuard,lazyGuard(()=>import('./core/guards/staff.guard').then(m=>m.staffFeatureGuard))],loadComponent:()=>import('./features/staff/secretaries.component').then(m=>m.SecretariesComponent)},
  { path: 'sin-plan', redirectTo: 'plan-required', pathMatch: 'full' },
  { path: 'admin/especialidades', redirectTo: 'admin/specialties', pathMatch: 'full' },
  { path: 'calendario-vacunacion', redirectTo: 'vaccination-calendar', pathMatch: 'full' },
  { path: 'pacientes', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'pacientes/nuevo', redirectTo: 'patients/new', pathMatch: 'full' },
  { path: 'pacientes/:id/editar', redirectTo: 'patients/:id/edit', pathMatch: 'full' },
  { path: 'pacientes/:id', redirectTo: 'patients/:id', pathMatch: 'full' },
  { path: 'ficha', redirectTo: 'records', pathMatch: 'full' },
  { path: 'ficha/:id/editar', redirectTo: 'records/:id/edit', pathMatch: 'full' },
  { path: 'ficha/:id', redirectTo: 'records/:id', pathMatch: 'full' },
  { path: 'consultas/:id', redirectTo: 'encounters/:id', pathMatch: 'full' },
  { path: 'asistente', redirectTo: 'assistant', pathMatch: 'full' },
  { path: 'perfil', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'consultas', redirectTo: 'encounters', pathMatch: 'full' },
  { path: 'calculadoras', redirectTo: 'calculators', pathMatch: 'full' },
  {
    path: 'plan-required',
    canActivate: [lazyGuard(() => import('./core/guards/doctorchart-plan.guard').then(m => m.doctorchartNoPlanGuard))],
    loadComponent: () => import('./features/auth/no-plan.component').then(m => m.NoPlanComponent),
  },
  {
    path: 'admin/specialties',
    canActivate: [superAdminGuard],
    loadComponent: () => import('./features/admin-specialties/admin-specialties.component').then(m => m.AdminSpecialtiesComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: FEATURE_FLAGS.PUBLIC_APPOINTMENTS_ENABLED
      ? () => import('./features/appointments/appointments-page.component').then(m => m.AppointmentsPageComponent)
      : () => import('./features/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'professionals',
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
    path: 'vaccination-calendar',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard, clinicalNavigationGuard('VACCINATION')],
    loadComponent: () =>
      import('./features/vaccination-calendar/calendario-vacunacion.component').then(
        (m) => m.VaccinationCalendarComponent,
      ),
  },
  {
    path: 'patients',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { preload: true },
    loadComponent: () =>
      import('./features/patient-list/patient-list.component').then(
        (m) => m.PatientListComponent
      ),
  },
  {
    path: 'patients/new',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () =>
      import('./features/patient-form/patient-form-page.component').then(
        (m) => m.PatientFormPageComponent
      ),
  },
  {
    path: 'patients/:id/edit',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () =>
      import('./features/patient-form/patient-form-page.component').then(
        (m) => m.PatientFormPageComponent
      ),
  },
  {
    path: 'patients/:id',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { preload: true },
    loadComponent: () =>
      import('./features/patient-record/patient-record.component').then(
        (m) => m.PatientRecordComponent
      ),
  },
  {
    path: 'records',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { preload: true },
    loadComponent: () =>
      import('./features/patient-record/patient-record.component').then(
        (m) => m.PatientRecordComponent
      ),
  },
  {
    path: 'records/:id/edit',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () =>
      import('./features/patient-form/patient-form-page.component').then(
        (m) => m.PatientFormPageComponent
      ),
  },
  {
    path: 'records/:id',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { preload: true },
    loadComponent: () =>
      import('./features/patient-record/patient-record.component').then(
        (m) => m.PatientRecordComponent
      ),
  },
  {
    path: 'encounters/:id',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () => import('./features/encounter-detail/encounter-detail-page.component').then(m => m.EncounterDetailPageComponent),
  },
  {
    path: 'assistant',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard, lazyGuard(() => import('./core/guards/ai-assistant.guard').then(m => m.aiAssistantGuard))],
    loadComponent: () => import('./features/ai-assistant/ai-assistant-page.component').then(m => m.AiAssistantPageComponent),
  },
  {
    path: 'profile',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () => import('./features/auth/user-profile-page.component').then(m => m.UserProfilePageComponent),
  },
  {
    path: 'encounters',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { preload: true },
    loadComponent: () =>
      import('./features/consultas/consultas.component').then(
        (m) => m.ConsultasComponent
      ),
  },
  {
    path: 'calculators',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard, clinicalNavigationGuard('CALCULATORS')],
    loadComponent: () =>
      import('./features/medical-calculators/medical-calculators.component').then(
        (m) => m.MedicalCalculatorsComponent
      ),
  },
  {
    path:'appointments',canActivate:[lazyGuard(()=>import('./core/guards/public-appointments.guard').then(m=>m.publicAppointmentsGuard))],loadComponent:()=>import('./features/appointments/appointments-page.component').then(m=>m.AppointmentsPageComponent),
 },{path:'appointments/confirmation',canActivate:[lazyGuard(()=>import('./core/guards/notifications.guard').then(m=>m.notificationsGuard))],loadComponent:()=>import('./features/appointments/confirmation-page.component').then(m=>m.ConfirmationPageComponent),
 },{path:'appointments/:publicId',canActivate:[lazyGuard(()=>import('./core/guards/public-appointments.guard').then(m=>m.publicAppointmentsGuard))],loadComponent:()=>import('./features/appointments/appointments-page.component').then(m=>m.AppointmentsPageComponent),
 },{path:'booking-publication',canActivate:[doctorchartPlanGuard,doctorOnboardingGuard,clinicsGuard,lazyGuard(()=>import('./core/guards/public-appointments.guard').then(m=>m.publicAppointmentsGuard))],loadComponent:()=>import('./features/appointments/publication-page.component').then(m=>m.PublicationPageComponent),
 },{path:'calendar',
    runGuardsAndResolvers:'always',
    canActivate:[doctorchartPlanGuard,doctorOnboardingGuard,lazyGuard(()=>import('./core/guards/calendar.guard').then(m=>m.calendarGuard))],
    loadComponent:()=>import('./features/calendar/calendar-page.component').then(m=>m.CalendarPageComponent),
  },
  {
    path: 'clinics',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard, clinicsGuard],
    loadComponent: () =>
      import('./features/clinics/clinics-page.component').then(
        (m) => m.ClinicsPageComponent
      ),
  },
  {
    path:'schedules',
    runGuardsAndResolvers:'always',
    canActivate:[doctorchartPlanGuard,doctorOnboardingGuard,lazyGuard(()=>import('./core/guards/schedules.guard').then(m=>m.schedulesGuard))],
    loadComponent:()=>import('./features/schedules/schedule-page.component').then(m=>m.SchedulePageComponent),
  },
  {
    path:'clinics/:id/schedule',
    runGuardsAndResolvers:'always',
    canActivate:[doctorchartPlanGuard,doctorOnboardingGuard,lazyGuard(()=>import('./core/guards/schedules.guard').then(m=>m.schedulesGuard))],
    loadComponent:()=>import('./features/schedules/schedule-page.component').then(m=>m.SchedulePageComponent),
  },
  {
    path: 'clinics/new',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard, clinicsGuard],
    loadComponent: () =>
      import('./features/clinics/clinic-form-page.component').then(
        (m) => m.ClinicFormPageComponent
      ),
  },
  {
    path: 'clinics/:id/edit',
    runGuardsAndResolvers: 'always',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard, clinicsGuard],
    loadComponent: () =>
      import('./features/clinics/clinic-form-page.component').then(
        (m) => m.ClinicFormPageComponent
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

const clinicalPaths=new Set(['dashboard','patients','patients/new','patients/:id/edit','patients/:id','records','records/:id/edit','records/:id','encounters','encounters/:id','assistant','calculators','vaccination-calendar','onboarding/setup']);
export const routes:Routes=baseRoutes.map(route=>{
  const clinical=clinicalPaths.has(route.path??'');
  if(clinical){route.data={...route.data,clinicalContext:true,allowPending:route.path==='onboarding/setup'};route.canDeactivate=[clinicalLeaveGuard];}
  if(clinical||route.canActivate?.includes(doctorOnboardingGuard)){
    const guards=[doctorchartPlanGuard,clinicalContextGuard,...(route.canActivate??[]).filter(g=>g!==doctorchartPlanGuard&&(!clinical||g!==doctorOnboardingGuard))] as CanActivateFn[];
    route.canActivate=[orderedGuards(guards)];
    route.runGuardsAndResolvers='always';
  }
  return route;
});
