import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [ThemeToggleComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly fromConfirmationLink = this.route.snapshot.data['confirmation'] === true;
  readonly submitting = signal(false);
  readonly error = signal('');
  readonly awaitingConfirmation = signal(false);
  readonly form = inject(FormBuilder).nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    dni: ['', [Validators.required, Validators.pattern(/^[0-9]{7,9}$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmation: ['', [Validators.required]],
  });

  async submit(): Promise<void> {
    if (this.submitting() || this.awaitingConfirmation() || this.fromConfirmationLink) return;
    this.error.set('');
    this.form.markAllAsTouched();
    const { fullName, dni, email, password, confirmation } = this.form.getRawValue();
    if (this.form.invalid || fullName.trim().length < 3) {
      this.error.set('Revisá el nombre, DNI, correo y contraseña antes de continuar.');
      return;
    }
    if (password !== confirmation) {
      this.error.set('Las contraseñas no coinciden.');
      return;
    }
    this.submitting.set(true);
    try {
      const response = await this.auth.signUp({
        email: email.trim(), password, options: { data: { full_name: fullName.trim(), dni } },
      });
      if (response.error) throw response.error;
      if (!response.data.user) throw new Error();
      const signedIn = !!response.data.session;
      this.form.reset();
      if (signedIn) {
        await this.router.navigateByUrl('/pricing');
      } else {
        this.awaitingConfirmation.set(true);
      }
    } catch (err) {
      const code = (err as { code?: string } | null)?.code;
      this.error.set(code === 'over_email_send_rate_limit' || code === 'over_request_rate_limit'
        ? 'Esperá unos minutos antes de volver a intentar.'
        : code === 'weak_password'
          ? 'Elegí una contraseña más segura.'
          : 'No pudimos completar el registro. Si ya tenés una cuenta, iniciá sesión. Si no, reintentá en unos momentos.');
    } finally {
      this.submitting.set(false);
    }
  }
}
