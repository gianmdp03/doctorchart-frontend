import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginPageComponent } from './login-page.component';

@Component({ template: '' })
class DummyRouteComponent {}

describe('LoginPageComponent', () => {
  let signInWithPassword: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    signInWithPassword = vi.fn().mockResolvedValue({
      data: { user: { id: 'doctor-1' }, session: { access_token: 'tok' } },
      error: null,
    });

    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [
        provideRouter([
          { path: 'login', component: DummyRouteComponent },
          { path: 'dashboard', component: DummyRouteComponent },
          { path: 'patients/:id', component: DummyRouteComponent },
          { path: 'pricing', component: DummyRouteComponent },
        ]),
        { provide: AuthService, useValue: { signInWithPassword, signInWithOAuth: vi.fn() } },
      ],
    }).compileComponents();
  });

  it('always navigates to /dashboard after login even if rendered on a previous private route', async () => {
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/patients/42');

    const fixture = TestBed.createComponent(LoginPageComponent);
    fixture.detectChanges();
    fixture.componentInstance.loginForm.setValue({ email: 'doc@example.com', password: 'password123' });

    await fixture.componentInstance.onLoginSubmit();

    expect(signInWithPassword).toHaveBeenCalledOnce();
    expect(router.url).toBe('/dashboard');
  });

  it('preserves an explicit returnUrl query parameter when provided', async () => {
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/login?returnUrl=%2Fpricing');

    const fixture = TestBed.createComponent(LoginPageComponent);
    fixture.detectChanges();
    fixture.componentInstance.loginForm.setValue({ email: 'doc@example.com', password: 'password123' });

    await fixture.componentInstance.onLoginSubmit();

    expect(router.url).toBe('/pricing');
  });
});
