import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../core/services/auth.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { PatientService } from '../../core/services/patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { DoctorProfileService } from '../../core/services/doctor-profile.service';
import { signal } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let authServiceMock: any;
  let activePatientServiceMock: any;
  let patientServiceMock: any;
  let specialtyServiceMock: any;
  let profileServiceMock: any;
  it('cancels superseded global searches and does not publish previous-account results',()=>{
    vi.useFakeTimers();const pending=new Subject<any>();patientServiceMock.getPatients.mockReturnValueOnce(pending);
    component.onSearchInput({target:{value:'older'}} as any);vi.advanceTimersByTime(251);expect(pending.observed).toBe(true);
    component.onSearchInput({target:{value:'newer'}} as any);expect(pending.observed).toBe(false);
    const late=new Subject<any>();patientServiceMock.getPatients.mockReturnValueOnce(late);vi.advanceTimersByTime(251);
    authServiceMock.currentUser.set({id:'doctor-b'});late.next({content:[{id:999}]});expect(component.searchResults()).toEqual([]);
    fixture.detectChanges();expect(late.observed).toBe(false);expect(component.searchQuery()).toBe('');vi.useRealTimers();
  });
  it('clears pending timers and distinguishes search failures from no matches',()=>{
    vi.useFakeTimers();patientServiceMock.getPatients.mockReturnValueOnce(throwError(()=>({status:500})));
    component.onSearchInput({target:{value:'Ada'}} as any);vi.advanceTimersByTime(251);expect(component.searchError()).toContain('No se pudo');
    component.retrySearch();component.clearSearch();const count=patientServiceMock.getPatients.mock.calls.length;
    vi.advanceTimersByTime(251);expect(patientServiceMock.getPatients).toHaveBeenCalledTimes(count);expect(component.isSearching()).toBe(false);vi.useRealTimers();
  });

  beforeEach(async () => {
    authServiceMock = {
      currentUser:signal({id:'doctor-a'}),
      isLoggedIn: signal(true),
      isSuperAdmin: signal(false),
      userName: signal('Dr. Santiago'),
      userEmail: signal('santiago@bycode.io'),
      hasDoctorchartPlan: signal(true),
      doctorchartPlanTier: signal('PROFESSIONAL'),
      signOut: vi.fn(),
      openProfileModal: vi.fn(),
    };

    activePatientServiceMock = {
      patientId: signal(1),
      loadPatient: vi.fn(),
    };

    patientServiceMock = {
      getPatients: vi.fn().mockReturnValue(of({ content: [] })),
    };

    specialtyServiceMock = {
      activeSpecialty: signal('PEDIATRICS'),
      currentSpecialtyOption: signal({
        value: 'PEDIATRICS',
        label: 'Pediatría y Neonatología',
        shortLabel: 'Pediatría',
        icon: 'baby',
      }),
      isPediatricMode: signal(true),
    };

    profileServiceMock = {
      profile: signal({ specialty: 'PEDIATRICS' }),
      hasSpecialty: signal(true),
    };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
        { provide: ActivePatientService, useValue: activePatientServiceMock },
        { provide: PatientService, useValue: patientServiceMock },
        { provide: DoctorSpecialtyService, useValue: specialtyServiceMock },
        { provide: DoctorProfileService, useValue: profileServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create header component', () => {
    expect(component).toBeTruthy();
  });

  it('should compute plan badge correctly', () => {
    expect(component.planBadgeLabel()).toBe('Plan PROFESSIONAL');
  });

  it('should keep header clean without redundant specialty badge', () => {
    const el = fixture.nativeElement as HTMLElement;
    const badge = el.querySelector('.specialty-badge');
    expect(badge).toBeNull();
  });

  it('should compute clinician initials correctly', () => {
    expect(component.clinicianInitials()).toBe('DS');
  });

  it('should toggle profile menu when profile button is clicked', () => {
    const stopPropagationSpy = vi.fn();
    const event = { stopPropagation: stopPropagationSpy } as unknown as Event;

    expect(component.isProfileMenuOpen()).toBe(false);
    component.toggleProfileMenu(event);
    expect(component.isProfileMenuOpen()).toBe(true);
  });

  it('should focus search input on Ctrl+K shortcut', () => {
    const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    component.handleGlobalShortcut(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('provides administrative navigation and sign out without clinical search for a super admin', () => {
    authServiceMock.isSuperAdmin.set(true);
    component.isProfileMenuOpen.set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('input[type="search"]')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Especialidades y wizards');
    expect(fixture.nativeElement.textContent).toContain('Cerrar Sesión');
    expect(fixture.nativeElement.textContent).not.toContain('Perfil Profesional');
    component.onSearchInput({ target: { value: 'Paciente' } } as unknown as Event);
    expect(patientServiceMock.getPatients).not.toHaveBeenCalled();
  });

  it('does not start a pending clinical search after promotion to super admin', () => {
    vi.useFakeTimers();
    try {
      component.onSearchInput({ target: { value: 'Paciente' } } as unknown as Event);
      authServiceMock.isSuperAdmin.set(true);
      vi.advanceTimersByTime(250);
      expect(patientServiceMock.getPatients).not.toHaveBeenCalled();
    } finally { vi.useRealTimers(); }
  });

  it('cancels a pending clinical search when leaving the header', () => {
    vi.useFakeTimers();
    try {
      component.onSearchInput({ target: { value: 'Paciente' } } as unknown as Event);
      fixture.destroy();
      vi.advanceTimersByTime(250);
      expect(patientServiceMock.getPatients).not.toHaveBeenCalled();
    } finally { vi.useRealTimers(); }
  });
});
