import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly isSubmitting = signal<boolean>(false);
  readonly mode = signal<'login' | 'register'>('login');
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly showPassword = signal<boolean>(false);

  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  readonly registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    dni: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  setMode(newMode: 'login' | 'register'): void {
    this.mode.set(newMode);
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((val) => !val);
  }

  isLoginInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isRegisterInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  async onLoginSubmit(): Promise<void> {
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
    } catch (err: unknown) {
      this.isSubmitting.set(false);
      const msg = err instanceof Error ? err.message : 'Error inesperado al iniciar sesión.';
      this.errorMessage.set(this.translateAuthError(msg));
    }
  }

  async onRegisterSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.errorMessage.set('Por favor complete todos los campos obligatorios.');
      return;
    }

    const { fullName, dni, email, password, confirmPassword } = this.registerForm.getRawValue();

    if (password !== confirmPassword) {
      this.errorMessage.set('Las contraseñas no coinciden.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      const response = await this.authService.signUp({
        email: (email ?? '').trim(),
        password: password ?? '',
        options: {
          data: {
            full_name: (fullName ?? '').trim(),
            dni: (dni ?? '').trim(),
          },
        },
      });

      if (response.error) {
        this.errorMessage.set(this.translateAuthError(response.error.message));
        this.isSubmitting.set(false);
        return;
      }

      this.isSubmitting.set(false);

      if (isPlatformBrowser(this.platformId)) {
        window.dispatchEvent(
          new CustomEvent('auth-register-success', { detail: { user: response.data.user } })
        );
      }

      if (response.data.session) {
        this.successMessage.set('¡Cuenta creada e inicio de sesión exitoso!');
      } else {
        this.successMessage.set('¡Cuenta creada con éxito! Por favor inicia sesión.');
        this.mode.set('login');
        this.loginForm.patchValue({ email: (email ?? '').trim() });
        this.registerForm.reset();
      }
    } catch (err: unknown) {
      this.isSubmitting.set(false);
      const msg = err instanceof Error ? err.message : 'Error inesperado al registrar usuario.';
      this.errorMessage.set(this.translateAuthError(msg));
    }
  }

  async handleGoogleOAuth(): Promise<void> {
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
