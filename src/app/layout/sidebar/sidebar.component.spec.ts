import { WorkspaceStore } from '../../core/services/workspace.store';
import { CLINICAL_NAVIGATION } from '../../core/experience/clinical-navigation';
import { ClinicalNavigationItem } from '../../core/experience/clinical-navigation';
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
  const navigation = signal<ClinicalNavigationItem[]>([]);

  beforeEach(async () => {
    navigation.set(Object.values(CLINICAL_NAVIGATION));
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
        { provide: WorkspaceStore, useValue: { navigation } },
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

  it('renders only server-selected entries in server order', () => {
    navigation.set([CLINICAL_NAVIGATION.DASHBOARD, CLINICAL_NAVIGATION.PATIENTS, CLINICAL_NAVIGATION.WIZARD]);
    fixture.detectChanges();
    const links = [...fixture.nativeElement.querySelectorAll('.sidebar-nav a')] as HTMLAnchorElement[];
    expect(links.map(link => link.getAttribute('href'))).toEqual(['/dashboard', '/patients', '/onboarding/setup']);
    expect(fixture.nativeElement.textContent).not.toContain('Vacunación');
    navigation.set([CLINICAL_NAVIGATION.DASHBOARD, CLINICAL_NAVIGATION.VACCINATION, CLINICAL_NAVIGATION.PATIENTS, CLINICAL_NAVIGATION.WIZARD]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.sidebar-nav a')[1].getAttribute('href')).toBe('/vaccination-calendar');
  });

  it('clears clinical navigation while no workspace is loaded', () => {
    navigation.set([]); fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.sidebar-nav a')).toHaveLength(0);
  });

  it('should toggle collapse state', () => {
    expect(component.isCollapsed()).toBe(false);
    component.toggleCollapse();
    expect(component.isCollapsed()).toBe(true);
    component.toggleCollapse();
    expect(component.isCollapsed()).toBe(false);
  });

  it('compacts mobile navigation, closes it after selection and restores desktop preference', () => {
    const originalWidth = window.innerWidth;
    try {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: 390 });
      window.dispatchEvent(new Event('resize'));
      expect(component.isCollapsed()).toBe(true);
      component.toggleCollapse();
      expect(component.isCollapsed()).toBe(false);
      component.collapseAfterNavigation();
      expect(component.isCollapsed()).toBe(true);
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1280 });
      window.dispatchEvent(new Event('resize'));
      expect(component.isCollapsed()).toBe(false);
    } finally {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalWidth });
    }
  });

  it('offers administration without clinical navigation for a super admin', () => {
    authServiceMock.isSuperAdmin.set(true);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('.sidebar-nav a');
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute('href')).toBe('/admin/specialties');
    expect(fixture.nativeElement.textContent).toContain('Administración');
    expect(fixture.nativeElement.textContent).not.toContain('Pacientes');
  });

  it('does not expose the admin link to a doctor', () => {
    expect(fixture.nativeElement.querySelector('a[href="/admin/specialties"]')).toBeNull();
  });
});
