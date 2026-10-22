import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { DeferBlockBehavior, TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { App } from './app';
import { AuthService } from './core/services/auth.service';
import { SessionCoordinatorService } from './core/services/session-coordinator.service';
import { PrivateShellComponent } from './layout/private-shell/private-shell.component';

@Component({ selector: 'test-public-home', template: 'Public home' })
class PublicHome {}
@Component({ selector: 'test-dashboard', template: 'Private dashboard' })
class Dashboard {}

describe('Public and private navigation ownership', () => {
  const currentUser = signal<null | { id: string }>(null);
  beforeEach(async () => {
    currentUser.set(null);
    await TestBed.configureTestingModule({
      deferBlockBehavior: DeferBlockBehavior.Playthrough,
      imports: [App],
      providers: [
        provideRouter([{ path: '', component: PublicHome }, { path: 'dashboard', component: Dashboard }]),
        { provide: AuthService, useValue: {
          currentUser, isLoggedIn: computed(() => !!currentUser()), isSuperAdmin: () => true,
          isAuthInitialized: () => true, hasDoctorchartPlan: () => true,
        } },
        { provide: SessionCoordinatorService, useValue: { setEntryPath: vi.fn(), doctorProfileService: {}, workspaceStore: {} } },
      ],
    }).overrideComponent(PrivateShellComponent, { set: { imports: [RouterOutlet], schemas: [CUSTOM_ELEMENTS_SCHEMA] } }).compileComponents();
  });

  for (const timing of ['before', 'during', 'after'] as const) {
    it(`removes the home when authentication changes ${timing} dashboard navigation`, async () => {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      const router = TestBed.inject(Router);
      await router.navigateByUrl('/'); await fixture.whenStable(); fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('test-public-home')).toHaveLength(1);
      if (timing === 'before') { currentUser.set({ id: 'doctor' }); fixture.detectChanges(); await fixture.whenStable(); }
      const navigation = router.navigateByUrl('/dashboard');
      if (timing === 'during') { currentUser.set({ id: 'doctor' }); fixture.detectChanges(); }
      await navigation;
      if (timing === 'after') currentUser.set({ id: 'doctor' });
      fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('test-dashboard')).toHaveLength(1);
      expect(fixture.nativeElement.querySelectorAll('test-public-home')).toHaveLength(0);
    });
  }
});
