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
  let specialtyServiceMock: any;
  let profileServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      isLoggedIn: signal(true),
      userName: signal('Dr. Santiago'),
      userEmail: signal('santiago@syntah.io'),
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
});
