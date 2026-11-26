import { basicBookingPlanMatch } from './core/guards/basic-booking-plan.guard';
import { CanActivateFn, Routes } from '@angular/router';
import { EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { firstValueFrom, isObservable } from 'rxjs';
import { publicEntryGuard } from './core/guards/public-entry.guard';
import { FEATURE_FLAGS } from './core/config/feature-flags';
import { clinicalContextGuard, clinicalLeaveGuard } from './core/guards/clinical-context.guard';
import { customerAccountProvider } from './core/config/customer-account-provider';
import { customerAccountGuard } from './shared/customer-account/account-context';

const customerRecovery = () => import('./shared/customer-account/recovery-page').then(m => m.CustomerRecoveryPage);
const customerSupport = () => import('./shared/customer-account/support-page').then(m => m.CustomerSupportPage);


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
const loadBasicBookingNotice = () => import('./features/appointments/basic-booking-notice.component').then(m => m.BasicBookingNoticeComponent);
const doctorchartPlanGuard = lazyGuard(() => import('./core/guards/doctorchart-plan.guard').then(m => m.doctorchartPlanGuard));
const doctorOnboardingGuard = lazyGuard(() => import('./core/guards/doctor-onboarding.guard').then(m => m.doctorOnboardingGuard));
const doctorWizardGuard = lazyGuard(() => import('./core/guards/doctor-onboarding.guard').then(m => m.doctorWizardGuard));
const preventCompletedOnboardingGuard = lazyGuard(() => import('./core/guards/doctor-onboarding.guard').then(m => m.preventCompletedOnboardingGuard));
const superAdminGuard = lazyGuard(() => import('./core/guards/super-admin.guard').then(m => m.superAdminGuard));
const clinicsGuard = lazyGuard(() => import('./core/guards/clinics.guard').then(m => m.clinicsGuard));
const staffFeatureGuard = lazyGuard(() => import('./core/guards/staff.guard').then(m => m.staffFeatureGuard));
const loadStaffAuth = () => import('./features/staff/staff-auth.component').then(m => m.StaffAuthComponent);

const loadHelp = () => import('./features/help/help-page.component').then(m => m.HelpPageComponent);

const baseRoutes: Routes = [
  { path: 'forgot-password', title: 'Recuperar contraseña', providers: [customerAccountProvider], data: { customerMode: 'request' }, loadComponent: customerRecovery },
  { path: 'reset-password', title: 'Restablecer contraseña', providers: [customerAccountProvider], data: { customerMode: 'reset' }, loadComponent: customerRecovery },
  { path: 'email-change-success', title: 'Confirmación de correo', providers: [customerAccountProvider], data: { customerMode: 'email' }, loadComponent: customerRecovery },
  { path: 'account', title: 'Mi cuenta', providers: [customerAccountProvider], canActivate: [customerAccountGuard], loadComponent: () => import('./shared/customer-account/profile-page').then(m => m.CustomerProfilePage) },
  { path: 'account/security', title: 'Seguridad de tu cuenta', providers: [customerAccountProvider], canActivate: [customerAccountGuard], loadComponent: () => import('./shared/customer-account/security-page').then(m => m.CustomerSecurityPage) },
  { path: 'account/backup', title: 'Copia de seguridad | DoctorChart', providers: [customerAccountProvider], canActivate: [customerAccountGuard], loadComponent: () => import('./features/practice-export/practice-export-page.component').then(m => m.PracticeExportPageComponent) },
  { path: 'support', title: 'Soporte', providers: [customerAccountProvider], canActivate: [customerAccountGuard], data: { customerMode: 'list' }, loadComponent: customerSupport },
  { path: 'support/new', title: 'Enviar ticket', providers: [customerAccountProvider], canActivate: [customerAccountGuard], data: { customerMode: 'new' }, loadComponent: customerSupport },
  { path: 'support/tickets/:id', title: 'Detalle del ticket', providers: [customerAccountProvider], canActivate: [customerAccountGuard], data: { customerMode: 'detail' }, loadComponent: customerSupport },
  { path: 'help', canActivate: [doctorchartPlanGuard], loadComponent: loadHelp },
  { path: 'help/appointments', canActivate: [doctorchartPlanGuard], loadComponent: loadHelp, data: { helpGuide: 'appointments' } },
  { path: 'help/secretaries', canActivate: [doctorchartPlanGuard], loadComponent: loadHelp, data: { helpGuide: 'secretaries' } },
  { path: 'help/account', canActivate: [doctorchartPlanGuard], loadComponent: loadHelp, data: { helpGuide: 'account' } },
  { path: 'help/clinical', canActivate: [doctorchartPlanGuard], loadComponent: loadHelp, data: { helpGuide: 'clinical' } },
 {path:'specialties',canActivate:[doctorchartPlanGuard],loadComponent:()=>import('./features/specialties/my-specialties.component').then(m=>m.MySpecialtiesComponent)},
 { path: 'staff/login', data: { mode: 'login' }, canActivate: [staffFeatureGuard], loadComponent: loadStaffAuth },
 { path: 'staff/activate', data: { mode: 'activate' }, canActivate: [staffFeatureGuard], loadComponent: loadStaffAuth },
 { path: 'staff/recover', data: { mode: 'recover' }, canActivate: [staffFeatureGuard], loadComponent: loadStaffAuth },
 {path:'staff/calendar',data:{staffAgenda:true},canActivate:[lazyGuard(()=>import('./core/guards/staff.guard').then(m=>m.staffSessionGuard))],loadComponent:()=>import('./features/calendar/calendar-page.component').then(m=>m.CalendarPageComponent)},
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
  { path: 'pricing', title: 'Planes de DoctorChart', loadComponent: () => import('./features/pricing/pricing.component').then(m => m.PricingComponent) },
  { path: 'terms', title: 'Términos y condiciones | DoctorChart', providers: [customerAccountProvider], data: { legalMode: 'terms' }, loadComponent: () => import('./shared/customer-account/legal-page').then(m => m.CustomerLegalPage) },
  { path: 'privacy', title: 'Política de privacidad | DoctorChart', providers: [customerAccountProvider], data: { legalMode: 'privacy' }, loadComponent: () => import('./shared/customer-account/legal-page').then(m => m.CustomerLegalPage) },
  { path: 'withdrawal', title: 'Botón de arrepentimiento y baja | DoctorChart', providers: [customerAccountProvider], data: { legalMode: 'withdrawal' }, loadComponent: () => import('./shared/customer-account/legal-page').then(m => m.CustomerLegalPage) },
  { path: 'register/confirmed', data: { confirmation: true }, loadComponent: () => import('./features/auth/register-page.component').then(m => m.RegisterPageComponent) },
  { path: 'register', loadComponent: () => import('./features/auth/register-page.component').then(m => m.RegisterPageComponent) },
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
    path: 'patients/access-audit',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { audit: true },
    loadComponent: () => import('./features/patient-list/patient-administration-page.component')
      .then(m => m.PatientAdministrationPageComponent),
  },
  {
    path: 'patients/archived',
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () => import('./features/patient-list/patient-administration-page.component')
      .then(m => m.PatientAdministrationPageComponent),
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
 },
  {
    path: 'booking-publication',
    pathMatch: 'full',
    canMatch: [basicBookingPlanMatch],
    canActivate: [doctorchartPlanGuard],
    data: { featureTitle: 'Reservas online' },
    loadComponent: loadBasicBookingNotice,
  },
  {path:'booking-publication',canActivate:[doctorchartPlanGuard,doctorOnboardingGuard,clinicsGuard,lazyGuard(()=>import('./core/guards/public-appointments.guard').then(m=>m.publicAppointmentsGuard))],loadComponent:()=>import('./features/appointments/publication-page.component').then(m=>m.PublicationPageComponent),
 },
  {
    path: 'calendar',
    pathMatch: 'full',
    canMatch: [basicBookingPlanMatch],
    canActivate: [doctorchartPlanGuard],
    data: { featureTitle: 'Agenda de turnos' },
    loadComponent: loadBasicBookingNotice,
  },
  {path:'calendar',
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

const pageTitles: Record<string, string> = {
  login: 'Iniciar sesión',
  register: 'Crear cuenta',
  'register/confirmed': 'Confirmación de cuenta',
  dashboard: 'Panel clínico',
  specialties: 'Mis especialidades',
  help: 'Ayuda',
  'help/appointments': 'Guía de turnos',
  'help/secretaries': 'Guía de secretaría',
  'help/clinical': 'Guía de clínica',
  'help/account': 'Guía de cuenta, planes y soporte',
  patients: 'Directorio de pacientes',
  'patients/new': 'Nuevo paciente',
  'patients/access-audit': 'Auditoría de accesos',
  'patients/archived': 'Fichas anuladas',
  'patients/:id/edit': 'Editar paciente',
  'patients/:id': 'Ficha clínica',
  records: 'Ficha clínica',
  'records/:id': 'Ficha clínica',
  'records/:id/edit': 'Editar ficha clínica',
  encounters: 'Historial de consultas',
  'encounters/:id': 'Detalle de la consulta',
  'vaccination-calendar': 'Calendario de vacunación',
  calculators: 'Calculadoras médicas',
  assistant: 'Asistente clínico',
  profile: 'Perfil profesional',
  'admin/specialties': 'Administración de especialidades',
  'onboarding/select-specialty': 'Selección de especialidad',
  'onboarding/setup': 'Configuración de fichas y consultas',
  'plan-required': 'Plan requerido',
  'booking-publication': 'Reservas online',
  calendar: 'Agenda de turnos',
  clinics: 'Consultorios y teleconsulta',
  'clinics/new': 'Nuevo consultorio',
  'clinics/:id/edit': 'Editar consultorio',
  'clinics/:id/schedule': 'Horarios del consultorio',
  schedules: 'Mis horarios',
  secretaries: 'Secretaría',
  'staff/login': 'Acceso de secretaría',
  'staff/activate': 'Aceptar invitación',
  'staff/recover': 'Recuperar acceso',
  'staff/calendar': 'Agenda de secretaría',
  '**': 'Página no encontrada',
};

const clinicalPaths=new Set(['dashboard','patients','patients/new','patients/access-audit','patients/archived','patients/:id/edit','patients/:id','records','records/:id/edit','records/:id','encounters','encounters/:id','assistant','calculators','vaccination-calendar','onboarding/setup']);
export const routes:Routes=baseRoutes.map(route=>{
  const pageTitle = pageTitles[route.path ?? ''];
  if (pageTitle) route.title ??= pageTitle + ' | DoctorChart';
  const clinical=clinicalPaths.has(route.path??'');
  if(clinical){route.data={...route.data,clinicalContext:true,allowPending:route.path==='onboarding/setup'};route.canDeactivate=[clinicalLeaveGuard];}
  if(clinical||route.canActivate?.includes(doctorOnboardingGuard)){
    const guards=[doctorchartPlanGuard,clinicalContextGuard,...(route.canActivate??[]).filter(g=>g!==doctorchartPlanGuard&&(!clinical||g!==doctorOnboardingGuard))] as CanActivateFn[];
    route.canActivate=[orderedGuards(guards)];
    route.runGuardsAndResolvers='always';
  }
  return route;
});
