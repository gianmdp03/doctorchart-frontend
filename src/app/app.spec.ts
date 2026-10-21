import { NoPlanComponent } from './features/auth/no-plan.component';
import { By } from '@angular/platform-browser';
import { ActivePatientService } from './core/services/active-patient.service';
import { ClinicalEncounterService } from './core/services/clinical-encounter.service';
import { DeferBlockBehavior, TestBed } from '@angular/core/testing';
import { PrivateShellComponent } from './layout/private-shell/private-shell.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { DoctorProfileService } from './core/services/doctor-profile.service';
import { WorkspaceStore } from './core/services/workspace.store';
import { User } from '@supabase/supabase-js';
import { App } from './app';
import { doctorchartPlanGuard } from './core/guards/doctorchart-plan.guard';
import { doctorOnboardingGuard } from './core/guards/doctor-onboarding.guard';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      deferBlockBehavior: DeferBlockBehavior.Playthrough,
      imports: [App],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

@Component({template:'<p>Selección de especialidad</p>'})
class LoginDestination {}

@Component({template:'<input [value]="draft()" />'})
class AccountSessionProbe { readonly draft = signal('Borrador nuevo'); }

describe('App recovers the empty entry route after login', () => {
  const currentUser = signal<User | null>(null);
  const doctor: User = {id:'doctor-login',aud:'authenticated',created_at:'2026-10-05T00:00:00Z',app_metadata:{role:'DOCTOR'},user_metadata:{}};
  let loadProfile: ReturnType<typeof vi.fn>;
  beforeEach(async () => {
    currentUser.set(null);
    loadProfile = vi.fn().mockResolvedValue(null);
    await TestBed.configureTestingModule({imports:[App],providers:[
      provideRouter([
        {path:'',pathMatch:'full',redirectTo:'dashboard'},
        {path:'dashboard',component:LoginDestination,canActivate:[doctorchartPlanGuard,doctorOnboardingGuard]},
        {path:'onboarding/select-specialty',component:LoginDestination},
        {path:'login',component:LoginDestination},
        {path:'pacientes',component:LoginDestination},
      ]),
      {provide:AuthService,useValue:{currentUser,authReady:Promise.resolve(),isLoggedIn:computed(()=>!!currentUser()),isSuperAdmin:()=>false,hasDoctorchartPlan:()=>true,openLoginModal:vi.fn()}},
      {provide:DoctorProfileService,useValue:{clearProfile:vi.fn(),loadProfile}},
      {provide:WorkspaceStore,useValue:{clearSetup:vi.fn(),loadSetup:vi.fn().mockResolvedValue(null),isOnboardingCompleted:()=>false}},
      {provide:ActivePatientService,useValue:{clear:vi.fn()}},
      {provide:ClinicalEncounterService,useValue:{clear:vi.fn()}},
    ]}).overrideComponent(App,{set:{imports:[RouterOutlet],template:'<router-outlet />'}}).compileComponents();
  });

  it('opens specialty selection after the initial navigation was cancelled before authentication', async () => {
    const fixture=TestBed.createComponent(App); fixture.detectChanges();
    const router=TestBed.inject(Router);
    expect(await router.navigateByUrl('/')).toBe(true);
    expect(router.url).toBe('/login?returnUrl=%2Fdashboard');
    currentUser.set(doctor); fixture.detectChanges(); await fixture.whenStable();
    await vi.waitFor(() => expect(router.url).toBe('/onboarding/select-specialty'));
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Selección de especialidad');
  });

  it('preserves an already opened page', async () => {
    const fixture=TestBed.createComponent(App); fixture.detectChanges();
    const router=TestBed.inject(Router); await router.navigateByUrl('/pacientes');
    currentUser.set(doctor); fixture.detectChanges(); await fixture.whenStable();
    expect(router.url).toBe('/pacientes');
  });

  it('restores the requested patient route when session initialization cancelled initial navigation', async () => {
    const previous = window.location.href;
    window.history.replaceState(null, '', '/pacientes');
    try {
      const fixture = TestBed.createComponent(App); fixture.detectChanges();
      const router = TestBed.inject(Router);
      expect(await router.navigateByUrl('/login?returnUrl=%2Fpacientes')).toBe(true);
      currentUser.set(doctor); fixture.detectChanges(); await fixture.whenStable();
      await vi.waitFor(() => expect(router.url).toBe('/pacientes'));
    } finally { window.history.replaceState(null, '', previous); }
  });

  it('does not resume navigation when the user signed out during account loading', async () => {
    let finish!: (value:null)=>void;
    loadProfile.mockReturnValue(new Promise<null>(resolve=>finish=resolve));
    const fixture=TestBed.createComponent(App); fixture.detectChanges();
    currentUser.set(doctor); fixture.detectChanges();
    currentUser.set(null); fixture.detectChanges();
    finish(null); await fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/');
  });
});

describe('App administrative entry', () => {
  const currentUser = signal<User | null>(null);
  const completed = signal(false);
  const auth = {
    currentUser,
    isSuperAdmin: computed(() => currentUser()?.app_metadata['role'] === 'SUPER_ADMIN'),
    isLoggedIn: computed(() => currentUser() !== null),
    isAuthInitialized: signal(true),
    hasDoctorchartPlan: vi.fn(() => true),
    signOut: vi.fn(),
  };
  let profile: { [key: string]: ReturnType<typeof signal> | ReturnType<typeof vi.fn> };
  let workspace: { [key: string]: ReturnType<typeof signal> | ReturnType<typeof vi.fn> };
  function user(role: string): User { return { id: 'same-user', aud: 'authenticated', created_at: '2026-10-05T00:00:00Z', app_metadata: { role }, user_metadata: {} }; }
  beforeEach(async () => {
    currentUser.set(null);
    completed.set(false);
    auth.hasDoctorchartPlan.mockReturnValue(true);
    profile = {
      clearProfile: vi.fn(), loadProfile: vi.fn().mockResolvedValue(null),
      error: signal('Unrelated clinical load error'), loaded: signal(false), loading: signal(false),
    };
    workspace = {
      isModuleActive: vi.fn().mockReturnValue(false),
      clearSetup: vi.fn(), loadSetup: vi.fn().mockResolvedValue(null), loadPreferences: vi.fn().mockResolvedValue(null),
      preferences: signal(null), preferencesError: signal(null), isLoading: signal(false),
      isOnboardingCompleted: completed, loaded: signal(false), error: signal(null),
    };
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: auth },
        { provide: ActivePatientService, useValue: {clear: vi.fn()} },
        { provide: ClinicalEncounterService, useValue: {clear: vi.fn()} },
        { provide: DoctorProfileService, useValue: profile },
        { provide: WorkspaceStore, useValue: workspace },
      ],
    }).overrideComponent(App, { set: { imports: [RouterOutlet, PrivateShellComponent], schemas: [CUSTOM_ELEMENTS_SCHEMA] } }).overrideComponent(PrivateShellComponent, { set: { imports: [RouterOutlet, NoPlanComponent], schemas: [CUSTOM_ELEMENTS_SCHEMA] } }).compileComponents();
    vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
  });

  it('opens administration without loading or creating a doctor workspace or profile', async () => {
    currentUser.set(user('SUPER_ADMIN'));
    completed.set(true);
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith(['/admin/especialidades']);
    expect(profile['loadProfile']).not.toHaveBeenCalled();
    expect(workspace['loadSetup']).not.toHaveBeenCalled();
    expect(workspace['loadPreferences']).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('.app-layout-shell')).not.toBeNull();
    expect(fixture.nativeElement.textContent).not.toContain('No pudimos cargar tu cuenta');
    expect(fixture.nativeElement.querySelector('app-encounter-detail-dialog')).toBeNull();
  });

  it('clears clinical state on a role change within the same account', async () => {
    currentUser.set(user('DOCTOR'));
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
    expect(workspace['loadSetup']).toHaveBeenCalledOnce();
    currentUser.set(user('SUPER_ADMIN'));
    fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
    expect(profile['clearProfile']).toHaveBeenCalledTimes(2);
    expect(workspace['clearSetup']).toHaveBeenCalledTimes(2);
    expect(workspace['loadSetup']).toHaveBeenCalledOnce();
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith(['/admin/especialidades']);
  });

  it('leaves administration after the trusted role is revoked', async () => {
    currentUser.set(user('SUPER_ADMIN'));
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
    vi.spyOn(TestBed.inject(Router), 'url', 'get').mockReturnValue('/admin/especialidades');
    currentUser.set(user('DOCTOR'));
    fixture.detectChanges();
    expect(TestBed.inject(Router).navigate).toHaveBeenLastCalledWith(['/dashboard']);
    expect(workspace['loadSetup']).toHaveBeenCalledOnce();
  });

  it('recreates the routed screen for a different account while preserving it for token or metadata refreshes', async () => {
    (profile['error'] as ReturnType<typeof signal>).set(null); (profile['loaded'] as ReturnType<typeof signal>).set(true); (workspace['loaded'] as ReturnType<typeof signal>).set(true); (workspace['preferences'] as ReturnType<typeof signal>).set({}); completed.set(true);
    currentUser.set(user('DOCTOR'));
    const router=TestBed.inject(Router); router.resetConfig([{path:'account-screen',component:AccountSessionProbe}]);
    const fixture=TestBed.createComponent(App); fixture.detectChanges(); await fixture.whenStable(); await router.navigateByUrl('/account-screen'); await fixture.whenStable(); fixture.detectChanges();
    expect(router.url).toBe('/account-screen');
    const first=fixture.debugElement.query(By.directive(AccountSessionProbe)).componentInstance as AccountSessionProbe;
    first.draft.set('Datos de cuenta A');
    currentUser.set({...user('DOCTOR'),user_metadata:{full_name:'Actualizado'}}); fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(AccountSessionProbe)).componentInstance).toBe(first);
    currentUser.set({...user('DOCTOR'),id:'doctor-b'}); fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
    const second=fixture.debugElement.query(By.directive(AccountSessionProbe)).componentInstance as AccountSessionProbe;
    expect(second).not.toBe(first); expect(second.draft()).toBe('Borrador nuevo');
  });

  it('shows the no-plan screen instead of the generic profile error immediately after login', async () => {
    auth.hasDoctorchartPlan.mockReturnValue(false);
    currentUser.set(user('COMPANY'));
    const fixture=TestBed.createComponent(App);
    fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Sin plan activo');
    expect(fixture.nativeElement.textContent).toContain('Iniciaste sesión correctamente');
    expect(fixture.nativeElement.textContent).not.toContain('No pudimos cargar tu cuenta');
    expect(profile['loadProfile']).not.toHaveBeenCalled();
    expect(workspace['loadSetup']).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('app-sidebar')).toBeNull();
  });

});
