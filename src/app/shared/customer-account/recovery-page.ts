import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { SupabaseClient } from '@supabase/supabase-js';
import { CUSTOMER_ACCOUNT } from './account-context';

@Component({
  selector: 'app-customer-account-recovery',
  imports: [FormsModule, RouterLink],
  templateUrl: './recovery-page.html',
  styleUrls: ['./account.css', './recovery-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerRecoveryPage {
  private readonly context = inject(CUSTOMER_ACCOUNT);
  readonly mode = inject(ActivatedRoute).snapshot.data['customerMode'] as 'request' | 'reset' | 'email';
  private client?: SupabaseClient;
  readonly ready = signal(false);
  readonly checking = signal(false);
  readonly done = signal(false);
  readonly busy = signal(false);
  readonly error = signal('');
  email = '';
  password = '';
  confirmation = '';

  constructor() {
    if (this.mode !== 'request' && isPlatformBrowser(inject(PLATFORM_ID))) void this.consume();
  }

  private async consume(): Promise<void> {
    this.checking.set(true);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.hash.slice(1));
    const type = this.mode === 'reset' ? 'recovery' : 'email_change';
    window.history.replaceState(window.history.state, '', url.pathname);
    try {
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');
      if (params.get('type') !== type || !access_token || !refresh_token) {
        if (this.mode === 'email' && !params.get('error') && !url.searchParams.get('error')) return;
        throw new Error('Enlace inválido');
      }
      const client = this.context.isolatedAuth();
      const { data, error } = await client.auth.setSession({ access_token, refresh_token });
      if (error || !data.session) throw new Error('Enlace inválido');
      if (this.mode === 'email') {
        await client.auth.signOut({ scope: 'local' });
        this.done.set(true);
      } else {
        this.client = client;
        this.ready.set(true);
      }
    } catch {
      this.error.set('El enlace venció o no es válido.');
    } finally { this.checking.set(false); }
  }

  async request(): Promise<void> {
    if (this.busy() || this.done() || !this.email.trim()) return;
    this.busy.set(true);
    this.error.set('');
    try {
      const result = await this.context.isolatedAuth().auth.resetPasswordForEmail(this.email.trim(), {
        redirectTo: new URL('/reset-password', window.location.origin).href,
      });
      if (result.error) throw result.error;
      this.done.set(true);
    } catch { this.error.set('No pudimos enviar el enlace. Esperá unos minutos y reintentá.'); }
    finally { this.busy.set(false); }
  }

  async reset(): Promise<void> {
    const client = this.client;
    if (this.busy() || this.done() || !client) return;
    if (this.password !== this.confirmation || this.password.length < 8 || this.password.length > 128) {
      this.error.set('Ingresá la misma contraseña en los dos campos. Debe tener entre 8 y 128 caracteres.');
      return;
    }
    this.busy.set(true);
    this.error.set('');
    try {
      const result = await client.auth.updateUser({ password: this.password });
      if (result.error) throw result.error;
      this.client = undefined;
      this.password = this.confirmation = '';
      this.done.set(true);
      this.ready.set(false);
      await client.auth.signOut({ scope: 'local' });
    } catch {
      if (!this.done()) this.error.set('No pudimos guardar la contraseña. Reintentá o pedí un enlace nuevo.');
    } finally { this.busy.set(false); }
  }
}
