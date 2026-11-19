import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CUSTOMER_ACCOUNT } from './account-context';
import { CustomerAccountApi } from './account-api';

@Component({
  selector: 'app-customer-account-security',
  imports: [FormsModule, RouterLink],
  providers: [CustomerAccountApi],
  templateUrl: './security-page.html',
  styleUrls: ['./account.css', './security-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerSecurityPage {
  private readonly context = inject(CUSTOMER_ACCOUNT);
  private readonly api = inject(CustomerAccountApi);
  readonly busy = signal(false);
  readonly error = signal('');
  readonly notice = signal('');
  email = '';
  currentPassword = '';
  password = '';
  confirmation = '';

  async changeEmail(): Promise<void> {
    await this.run(async () => {
      const email = this.email.trim();
      const password = this.currentPassword;
      this.currentPassword = '';
      await this.api.authorizeEmail(email, password);
      const result = await this.context.auth().auth.updateUser({ email },
        { emailRedirectTo: new URL('/email-change-success', window.location.origin).href });
      if (result.error) throw result.error;
      this.email = '';
      this.notice.set('Revisá los correos de confirmación para completar el cambio.');
    }, 'No pudimos solicitar el cambio. Revisá el correo o volvé a iniciar sesión.');
  }

  async changePassword(): Promise<void> {
    if (this.password !== this.confirmation || this.password.length < 8 || this.password.length > 128) {
      this.error.set('Ingresá la misma contraseña en los dos campos. Debe tener entre 8 y 128 caracteres.');
      return;
    }
    await this.run(async () => {
      const result = await this.context.auth().auth.updateUser({ password: this.password });
      if (result.error) throw result.error;
      this.password = this.confirmation = '';
      this.notice.set('Contraseña actualizada. Usala la próxima vez que inicies sesión.');
    }, 'No pudimos actualizar la contraseña. Volvé a iniciar sesión y reintentá.');
  }

  private async run(work: () => Promise<void>, failure: string): Promise<void> {
    if (this.busy()) return;
    this.busy.set(true);
    this.error.set('');
    this.notice.set('');
    try { await work(); }
    catch { this.error.set(failure); }
    finally { this.busy.set(false); }
  }
}
