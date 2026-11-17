import { GOOGLE_AUTH_ENABLED } from '../../auth-policy';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, ThemeToggleComponent, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  readonly googleAuthEnabled = GOOGLE_AUTH_ENABLED;
  readonly bycodeLoginUrl = environment.bycodePlansUrl.replace(/\/(?:panel|dashboard)\/?$/, '') + '/login';

  private readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
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
      this.errorMessage.set('Por favor ingrese un correo válido y su contraseña.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const { email, password } = this.loginForm.getRawValue();

    try {
      const response = await this.authService.signInWithPassword({
        email: (email ?? '').trim(),
        password: password ?? '',
      });

      if (response.error) {
        this.errorMessage.set(this.translateAuthError(response.error.message));
        this.isSubmitting.set(false);
        return;
      }

      this.successMessage.set('¡Inicio de sesión exitoso!');
      this.isSubmitting.set(false);

      if (isPlatformBrowser(this.platformId)) {
        window.dispatchEvent(
          new CustomEvent('auth-success', { detail: { user: response.data.user } })
        );
      }

      const targetUrl = this.loginDestination();
      await this.router.navigateByUrl(targetUrl, { onSameUrlNavigation: 'reload' });
    } catch (err: unknown) {
      this.isSubmitting.set(false);
      const msg = err instanceof Error ? err.message : 'Error inesperado al iniciar sesión.';
      this.errorMessage.set(this.translateAuthError(msg));
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
        this.errorMessage.set(this.translateAuthError(response.error.message));
        this.isSubmitting.set(false);
      }
    } catch (err: unknown) {
      this.isSubmitting.set(false);
      const msg = err instanceof Error ? err.message : 'No se pudo iniciar sesión con Google.';
      this.errorMessage.set(msg);
    }
  }

  private loginDestination(): string {
    const requested = this.router.parseUrl(this.router.url).queryParams['returnUrl'];
    if (typeof requested === 'string' && requested.startsWith('/') && !requested.startsWith('//') && !['/', '/login'].includes(requested.split(/[?#]/)[0])) return requested;
    return !this.router.url || ['/', '/login'].includes(this.router.url.split(/[?#]/)[0]) ? '/dashboard' : this.router.url;
  }

  private translateAuthError(message: string): string {
    if (!message) return 'Error de autenticación';
    const lower = message.toLowerCase();
    if (lower.includes('invalid login credentials') || lower.includes('invalid credentials')) {
      return 'Credenciales inválidas. Verifique su correo y contraseña.';
    }
    if (lower.includes('user already registered') || lower.includes('already exists')) {
      return 'Ya existe una cuenta registrada con este correo electrónico.';
    }
    if (lower.includes('password should be at least')) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }
    if (lower.includes('rate limit')) {
      return 'Demasiados intentos. Por favor espere unos momentos antes de reintentar.';
    }
    return message;
  }
}
