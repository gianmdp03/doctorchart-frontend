import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../core/services/auth.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { signal } from '@angular/core';
import { User } from '@supabase/supabase-js';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let authServiceMock: {
    currentUser: ReturnType<typeof signal<User | null>>;
    isLoggedIn: ReturnType<typeof signal<boolean>>;
    userName: ReturnType<typeof signal<string>>;
    userRole: ReturnType<typeof signal<string | null>>;
    isSuperAdmin: ReturnType<typeof signal<boolean>>;
    isCompany: ReturnType<typeof signal<boolean>>;
    hasDoctorchartPlan: ReturnType<typeof signal<boolean>>;
    doctorchartPlanTier: ReturnType<typeof signal<string | null>>;
    daysRemaining: ReturnType<typeof signal<number>>;
    openLoginModal: ReturnType<typeof vi.fn>;
    openProfileModal: ReturnType<typeof vi.fn>;
  };

  let activePatientServiceMock: {
    patientId: ReturnType<typeof signal<number | null>>;
    patientName: ReturnType<typeof signal<string>>;
  };

  beforeEach(async () => {
    authServiceMock = {
      currentUser: signal<User | null>(null),
      isLoggedIn: signal<boolean>(false),
      userName: signal<string>('Usuario'),
      userRole: signal<string | null>(null),
      isSuperAdmin: signal<boolean>(false),
      isCompany: signal<boolean>(false),
      hasDoctorchartPlan: signal<boolean>(false),
      doctorchartPlanTier: signal<string | null>(null),
      daysRemaining: signal<number>(0),
      openLoginModal: vi.fn(),
      openProfileModal: vi.fn(),
    };

    activePatientServiceMock = {
      patientId: signal<number | null>(null),
      patientName: signal<string>(''),
    };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ActivePatientService, useValue: activePatientServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create header component', () => {
    expect(component).toBeTruthy();
  });

  it('should render demo clinician info and Iniciar Sesión button when not logged in', () => {
    const el: HTMLElement = fixture.nativeElement;
    const badge = el.querySelector('.clinician-badge');
    expect(badge).toBeTruthy();

    const name = el.querySelector('.clinician-name')?.textContent?.trim();
    expect(name).toBe('Profesional Médico');

    const loginBtn = el.querySelector('.clinician-login-chip');
    expect(loginBtn).toBeTruthy();
    expect(loginBtn?.textContent?.trim()).toBe('Iniciar Sesión');

    expect(component.clinicianInitials()).toBe('DC');
  });

  it('should open login modal when clinician badge is clicked while logged out', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    component.handleClinicianBadgeClick();

    expect(authServiceMock.openLoginModal).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'open-login-modal' })
    );

    dispatchSpy.mockRestore();
  });

  it('should open login modal when Iniciar Sesión chip is clicked', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    const stopPropagationSpy = vi.fn();
    const mockEvent = {
      stopPropagation: stopPropagationSpy,
    } as unknown as Event;

    component.handleLoginClick(mockEvent);

    expect(stopPropagationSpy).toHaveBeenCalled();
    expect(authServiceMock.openLoginModal).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'open-login-modal' })
    );

    dispatchSpy.mockRestore();
  });

  it('should render authenticated user initials and Conectado status when logged in', () => {
    authServiceMock.isLoggedIn.set(true);
    authServiceMock.currentUser.set({
      id: 'doc-1',
      email: 'pediatra@pointly.care',
    } as unknown as User);
    authServiceMock.userName.set('Dra. Sofía Mendoza');

    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const name = el.querySelector('.clinician-name')?.textContent?.trim();
    expect(name).toBe('Dra. Sofía Mendoza');

    const statusBadge = el.querySelector('.clinician-status-badge');
    expect(statusBadge?.textContent).toContain('Conectado');

    expect(component.clinicianInitials()).toBe('DS');
  });

  it('should open profile modal when clinician badge is clicked while logged in', () => {
    authServiceMock.isLoggedIn.set(true);
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    component.handleClinicianBadgeClick();

    expect(authServiceMock.openProfileModal).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'open-profile-modal' })
    );

    dispatchSpy.mockRestore();
  });

  it('should update search query on input', () => {
    const event = {
      target: { value: 'Mateo' },
    } as unknown as Event;

    component.onSearchInput(event);
    expect(component.searchQuery()).toBe('Mateo');
  });

  it('should dispatch open-new-patient-modal on button click', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    component.handleNewPatientClick();

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'open-new-patient-modal' })
    );

    dispatchSpy.mockRestore();
  });

  it('should dispatch open-new-checkup-modal on button click', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    component.handleNewCheckupClick();

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'open-new-checkup-modal' })
    );

    dispatchSpy.mockRestore();
  });

  it('should render plan tier badge when user has active doctorchart plan', () => {
    authServiceMock.isLoggedIn.set(true);
    authServiceMock.currentUser.set({
      id: 'doc-pro',
      email: 'pediatra@pointly.care',
    } as unknown as User);
    authServiceMock.userName.set('Dra. Sofía Mendoza');
    authServiceMock.hasDoctorchartPlan.set(true);
    authServiceMock.doctorchartPlanTier.set('PRO');
    authServiceMock.daysRemaining.set(15);

    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const planBadge = el.querySelector('.plan-tier-badge');
    expect(planBadge).toBeTruthy();
    expect(planBadge?.textContent?.trim()).toBe('Plan PRO');

    const daysLeft = el.querySelector('.clinician-days-left');
    expect(daysLeft?.textContent?.trim()).toBe('(15d)');
  });

  it('should render Super Admin badge when user is super admin', () => {
    authServiceMock.isLoggedIn.set(true);
    authServiceMock.currentUser.set({
      id: 'super-1',
      email: 'admin@system.local',
    } as unknown as User);
    authServiceMock.userName.set('Admin Root');
    authServiceMock.isSuperAdmin.set(true);
    authServiceMock.hasDoctorchartPlan.set(true);
    authServiceMock.doctorchartPlanTier.set('SUPER_ADMIN');

    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const planBadge = el.querySelector('.plan-tier-badge');
    expect(planBadge).toBeTruthy();
    expect(planBadge?.textContent?.trim()).toBe('Super Admin');
    expect(planBadge?.classList.contains('plan-superadmin')).toBe(true);
  });

  it('should render Planes Syntah button with correct href', () => {
    const el: HTMLElement = fixture.nativeElement;
    const syntahBtn = el.querySelector('a.syntah-plans-btn');
    expect(syntahBtn).toBeTruthy();
    expect(syntahBtn?.getAttribute('href')).toBe('http://localhost:4200/company-panel#plans-catalog');
    expect(syntahBtn?.textContent).toContain('Planes Syntah');
  });
});
