import { AUTH_REQUIRED, signInErrorMessage } from '../../core/utils/user-error';
import { GOOGLE_AUTH_ENABLED } from '../../auth-policy';
import { isPlatformBrowser } from '@angular/common';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { afterNextRender, Component, ElementRef, Injector, inject, PLATFORM_ID, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, ThemeToggleComponent, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  readonly googleAuthEnabled = GOOGLE_AUTH_ENABLED;

  private readonly fb = inject(FormBuilder);
  private readonly injector = inject(Injector);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(inject(ActivatedRoute).snapshot.queryParamMap.get('reason') === 'auth_required' ? AUTH_REQUIRED : null);
  readonly successMessage = signal<string | null>(null);
  readonly showPassword = signal<boolean>(false);

  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  togglePasswordVisibility(): void {
    this.showPassword.update((val) => !val);
  }

  readonly loginAttempted = signal(false);
  isLoginInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control && control.invalid && this.loginAttempted());
  }

  async onLoginSubmit(): Promise<void> {
    if (this.isSubmitting()) return;
    this.loginAttempted.set(true);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage.set('Revisá los campos marcados para iniciar sesión.');
      const id = this.loginForm.controls.email.invalid ? 'login-email' : 'login-password';
      afterNextRender(() => this.host.nativeElement.querySelector<HTMLElement>('#' + id)?.focus(), { injector: this.injector });
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const { email, password } = this.loginForm.getRawValue();

    let authenticated = false;
    try {
      const response = await this.authService.signInWithPassword({
        email: (email ?? '').trim(),
        password: password ?? '',
      });

      if (response.error) {
        this.errorMessage.set(signInErrorMessage(response.error));
        this.isSubmitting.set(false);
        return;
      }

      authenticated = true;

      if (isPlatformBrowser(this.platformId)) {
        window.dispatchEvent(
          new CustomEvent('auth-success', { detail: { user: response.data.user } })
        );
      }

      const targetUrl = this.loginDestination();
      if (await this.router.navigateByUrl(targetUrl, { onSameUrlNavigation: 'reload' })) {
        this.successMessage.set('¡Inicio de sesión exitoso!');
      }
    } catch (err: unknown) {
      this.errorMessage.set(authenticated
        ? 'Tu sesión se inició. Recargá esta página para continuar.'
        : signInErrorMessage(err));
    } finally {
      this.isSubmitting.set(false);
    }
  }

  async handleGoogleOAuth(): Promise<void> {
    if (!GOOGLE_AUTH_ENABLED) return;
    if (!isPlatformBrowser(this.platformId)) return;

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      const response = await this.authService.signInWithOAuth('google');
      if (response.error) {
        this.errorMessage.set(signInErrorMessage(response.error));
        this.isSubmitting.set(false);
      }
    } catch (err: unknown) {
      this.isSubmitting.set(false);
      this.errorMessage.set(signInErrorMessage(err));
    }
  }

  private loginDestination(): string {
    const requested = this.router.parseUrl(this.router.url).queryParams['returnUrl'];
    if (typeof requested === 'string' && requested.startsWith('/') && !requested.startsWith('//') && !['/', '/login'].includes(requested.split(/[?#]/)[0])) return requested;
    return !this.router.url || ['/', '/login'].includes(this.router.url.split(/[?#]/)[0]) ? '/dashboard' : this.router.url;
  }

}
