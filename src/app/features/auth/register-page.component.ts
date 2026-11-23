import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideLogIn, lucideMail } from '@ng-icons/lucide';
import { afterNextRender, Component, ElementRef, Injector, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

const registrationFields = [
  ['fullName', 'signup-name', 'Ingresá tu nombre completo.'],
  ['dni', 'signup-dni', 'Ingresá un DNI de 7 a 9 dígitos.'],
  ['email', 'signup-email', 'Ingresá un correo electrónico válido.'],
  ['password', 'signup-pass', 'Ingresá una contraseña de al menos 6 caracteres.'],
  ['confirmation', 'signup-confirm', 'Volvé a escribir la contraseña.'],
] as const;

type RegistrationControl = (typeof registrationFields)[number][0];

@Component({
  selector: 'app-register-page',
  imports: [NgIcon, ReactiveFormsModule, RouterLink],
  providers: [provideIcons({ lucideArrowRight, lucideLogIn, lucideMail })],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly fromConfirmationLink = this.route.snapshot.data['confirmation'] === true;
  readonly submitting = signal(false);
  readonly error = signal('');
  readonly attempted = signal(false);
  readonly awaitingConfirmation = signal(false);
  readonly form = inject(FormBuilder).nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    dni: ['', [Validators.required, Validators.pattern(/^[0-9]{7,9}$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmation: ['', [Validators.required]],
  });

  fieldError(control: RegistrationControl): string | null {
    if (!this.attempted()) return null;
    const { fullName, password, confirmation } = this.form.getRawValue();
    if (this.form.controls[control].invalid || (control === 'fullName' && fullName.trim().length < 3)) {
      return registrationFields.find(([name]) => name === control)?.[2] ?? null;
    }
    return control === 'confirmation' && password !== confirmation ? 'Las contraseñas no coinciden.' : null;
  }

  private focusAfterRender(id: string): void {
    afterNextRender(() => this.host.nativeElement.querySelector<HTMLElement>('#' + id)?.focus(), { injector: this.injector });
  }

  async submit(): Promise<void> {
    if (this.submitting() || this.awaitingConfirmation() || this.fromConfirmationLink) return;
    this.error.set('');
    this.attempted.set(true);
    this.form.markAllAsTouched();
    const { fullName, dni, email, password } = this.form.getRawValue();
    const firstInvalid = registrationFields.find(([control]) => this.fieldError(control));
    if (firstInvalid) {
      this.error.set('Revisá los campos marcados antes de continuar.');
      this.focusAfterRender(firstInvalid[1]);
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
        this.focusAfterRender('register-title');
      }
    } catch (err) {
      const failure = err as { code?: string; status?: number; message?: string } | null;
      switch (failure?.code) {
        case 'over_email_send_rate_limit':
        case 'over_request_rate_limit':
          this.error.set('Esperá unos minutos antes de volver a intentar.');
          break;
        case 'weak_password':
          this.error.set('Elegí una contraseña más segura.');
          break;
        case 'email_address_invalid':
          this.error.set('Revisá la dirección de correo electrónico.');
          break;
        case 'signup_disabled':
        case 'email_provider_disabled':
          this.error.set('El registro por correo está temporalmente deshabilitado.');
          break;
        default:
          if (failure?.code === 'hook_timeout' || failure?.code === 'hook_timeout_after_retry' ||
              (failure?.status === 500 && ['Invalid payload sent to hook', 'Error sending confirmation email'].includes(failure.message ?? ''))) {
            this.error.set('No pudimos enviar el correo de confirmación. Reintentá en unos minutos.');
          } else if (failure?.status === 0 || failure?.code === 'request_timeout') {
            this.error.set('No hubo respuesta del servicio de registro. Revisá tu conexión y el correo antes de reintentar.');
          } else {
            this.error.set('No pudimos completar el registro. Si ya tenés una cuenta, iniciá sesión. Si no, reintentá en unos momentos.');
          }
      }
    } finally {
      this.submitting.set(false);
    }
  }
}
