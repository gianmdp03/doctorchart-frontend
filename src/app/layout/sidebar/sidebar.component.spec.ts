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
      isSuperAdmin: signal(false),
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

  it('should not render redundant profile in the sidebar footer', () => {
    const el = fixture.nativeElement as HTMLElement;
    const profileRow = el.querySelector('.footer-profile-row');
    expect(profileRow).toBeNull();
  });

  it('should render all nav icons including calculator and sliders', () => {
    const icons = fixture.nativeElement.querySelectorAll('.sidebar-nav ng-icon');
    expect(icons.length).toBe(5);
    icons.forEach((ic: HTMLElement) => {
      const svg = ic.querySelector('svg');
      expect(svg).toBeTruthy();
    });
  });

  it('should toggle collapse state', () => {
    expect(component.isCollapsed()).toBe(false);
    component.toggleCollapse();
    expect(component.isCollapsed()).toBe(true);
    component.toggleCollapse();
    expect(component.isCollapsed()).toBe(false);
  });

  it('offers administration without clinical navigation for a super admin', () => {
    authServiceMock.isSuperAdmin.set(true);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('.sidebar-nav a');
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute('href')).toBe('/admin/especialidades');
    expect(fixture.nativeElement.textContent).toContain('Administración');
    expect(fixture.nativeElement.textContent).not.toContain('Pacientes');
  });

  it('does not expose the admin link to a doctor', () => {
    expect(fixture.nativeElement.querySelector('a[href="/admin/especialidades"]')).toBeNull();
  });
});
