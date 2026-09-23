import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../core/services/auth.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { PatientService } from '../../core/services/patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { DoctorProfileService } from '../../core/services/doctor-profile.service';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let authServiceMock: any;
  let activePatientServiceMock: any;
  let patientServiceMock: any;
  let doctorSpecialtyServiceMock: any;
  let doctorProfileServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      currentUser: signal(null),
      isLoggedIn: signal(true),
      userName: signal('Dra. Sofía Mendoza'),
      userEmail: signal('sofia@doctorchart.com'),
      userRole: signal('DOCTOR'),
      isSuperAdmin: signal(false),
      hasDoctorchartPlan: signal(true),
      doctorchartPlanTier: signal('PROFESSIONAL'),
      daysRemaining: signal(30),
      openLoginModal: vi.fn(),
      openProfileModal: vi.fn(),
      signOut: vi.fn().mockResolvedValue(undefined),
    };

    activePatientServiceMock = {
      patientId: signal(101),
      patientName: signal('Mateo Benítez'),
      loadPatient: vi.fn(),
    };

    patientServiceMock = {
      getPatients: vi.fn().mockReturnValue(
        of({
          content: [
            { id: 101, fullName: 'Mateo Benítez', birthDate: '2024-05-10', nationalId: '54123456' },
          ],
          totalElements: 1,
          totalPages: 1,
          size: 8,
          number: 0,
        })
      ),
    };

    doctorSpecialtyServiceMock = {
      activeSpecialty: signal('PEDIATRICS'),
      isPediatricMode: signal(true),
      currentSpecialtyOption: signal({
        value: 'PEDIATRICS',
        label: 'Pediatría y Neonatología',
        shortLabel: 'Pediatría',
        icon: 'baby',
      }),
    };

    doctorProfileServiceMock = {
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
        { provide: DoctorSpecialtyService, useValue: doctorSpecialtyServiceMock },
        { provide: DoctorProfileService, useValue: doctorProfileServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create header component', () => {
    expect(component).toBeTruthy();
  });

  it('should render specialty badge and omnibox search input', () => {
    const el: HTMLElement = fixture.nativeElement;
    const omnibox = el.querySelector('.omnibox-input');
    expect(omnibox).toBeTruthy();

    const badge = el.querySelector('.specialty-badge');
    expect(badge?.textContent).toContain('Pediatría');
  });

  it('should compute clinician initials correctly', () => {
    expect(component.clinicianInitials()).toBe('DS');
  });

  it('should toggle create menu when button is clicked', () => {
    const stopPropagationSpy = vi.fn();
    const event = { stopPropagation: stopPropagationSpy } as unknown as Event;

    expect(component.isCreateMenuOpen()).toBe(false);
    component.toggleCreateMenu(event);
    expect(component.isCreateMenuOpen()).toBe(true);
    expect(stopPropagationSpy).toHaveBeenCalled();
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
});
