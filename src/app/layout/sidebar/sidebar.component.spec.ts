import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { DoctorProfileService } from '../../core/services/doctor-profile.service';
import { AuthService } from '../../core/services/auth.service';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  let authServiceMock: any;
  let specialtyServiceMock: any;
  let profileServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      isLoggedIn: signal(true),
      userName: signal('Carlos Gómez'),
    };

    specialtyServiceMock = {
      activeSpecialty: signal('PEDIATRICS'),
      currentSpecialtyOption: signal({
        value: 'PEDIATRICS',
        label: 'Pediatría y Neonatología',
        shortLabel: 'Pediatría',
        icon: 'baby',
      }),
    };

    profileServiceMock = {
      profile: signal({ specialty: 'PEDIATRICS' }),
      hasSpecialty: signal(true),
    };

    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
        { provide: DoctorSpecialtyService, useValue: specialtyServiceMock },
        { provide: DoctorProfileService, useValue: profileServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the sidebar component', () => {
    expect(component).toBeTruthy();
  });

  it('should compute clinician initials correctly', () => {
    expect(component.clinicianInitials()).toBe('CG');
  });

  it('should toggle collapse state', () => {
    expect(component.isCollapsed()).toBe(false);
    component.toggleCollapse();
    expect(component.isCollapsed()).toBe(true);
    component.toggleCollapse();
    expect(component.isCollapsed()).toBe(false);
  });

  it('should detect pediatric specialty tools', () => {
    expect(component.isPediatrics()).toBe(true);
    expect(component.isCardiology()).toBe(false);
  });
});
