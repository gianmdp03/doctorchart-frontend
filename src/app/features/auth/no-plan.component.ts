import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-no-plan',
  template: `
    <main class="plan-page">
      <section class="plan-card" aria-labelledby="plan-title">
        <img src="/doctorchart-logo.svg" width="56" height="56" alt="DoctorChart" />
        <p class="product">DoctorChart</p>
        <span class="plan-status">Sin plan activo</span>
        <h1 id="plan-title">Necesitás un plan para continuar</h1>
        <p>Iniciaste sesión correctamente. Tu cuenta no tiene un plan activo de DoctorChart o el anterior ya venció.</p>
        <p>Para usar las historias clínicas y las demás herramientas, contratá un plan de DoctorChart en Bycode.</p>
        <a class="primary" [href]="plansUrl">Ver planes en Bycode</a>
        <button class="secondary" type="button" (click)="checkPlan()" [disabled]="busy()">
          {{ busy() ? 'Verificando plan…' : 'Ya contraté un plan: verificar acceso' }}
        </button>
        @if (message()) { <p class="feedback" role="status">{{ message() }}</p> }
        <button class="logout" type="button" (click)="signOut()" [disabled]="busy()">Cerrar sesión</button>
      </section>
    </main>
  `,
  styles: `
    :host {display:block;}
    .plan-page {min-height:100dvh;display:grid;place-items:center;padding:2rem 1rem;background:var(--md-sys-color-surface,#f0f7f8);color:var(--md-sys-color-on-surface,#191c1d);}
    .plan-card {width:100%;max-width:480px;padding:2rem;border:1px solid var(--md-sys-color-outline-variant,#bfc8ca);border-radius:24px;background:var(--md-sys-color-surface-container-low,#fff);text-align:center;box-sizing:border-box;}
    img {margin:0 auto 1rem;}
    .product {font-size:1.1rem;font-weight:700;margin:0 0 1.25rem;}
    .plan-status {display:inline-block;padding:.35rem .8rem;border-radius:999px;background:var(--md-sys-color-secondary-container,#cde7ec);color:var(--md-sys-color-on-secondary-container,#051f23);font-size:.85rem;font-weight:600;}
    h1 {font-size:1.7rem;line-height:1.2;margin:1.25rem 0;}
    p {line-height:1.6;margin:.75rem 0;color:var(--md-sys-color-on-surface-variant,#3f484a);}
    a,button {display:flex;align-items:center;justify-content:center;min-height:46px;width:100%;padding:.7rem 1rem;border-radius:999px;font:inherit;font-size:.9rem;font-weight:600;cursor:pointer;box-sizing:border-box;text-decoration:none;}
    .primary {margin-top:1.5rem;background:var(--md-sys-color-primary,#006874);color:var(--md-sys-color-on-primary,#fff);border:1px solid transparent;}
    .secondary {margin-top:.75rem;border:1px solid var(--md-sys-color-outline,#70797b);background:transparent;color:inherit;}
    .logout {margin-top:1rem;background:transparent;border:0;color:var(--md-sys-color-primary,#006874);}
    .feedback {font-size:.9rem;}
    :is(a,button):focus-visible {outline:2px solid var(--md-sys-color-primary,#006874);outline-offset:3px;}
    button:disabled {opacity:.65;cursor:wait;}
    @media(max-width:380px) {.plan-card{padding:1.5rem 1rem;}h1{font-size:1.4rem;}}
  `,
})
export class NoPlanComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly plansUrl = new URL('/pricing', environment.bycodePlansUrl).href;
  readonly busy = signal(false);
  readonly message = signal('');

  async checkPlan(): Promise<void> {
    if (this.busy()) return;
    this.busy.set(true); this.message.set('');
    try {
      await this.auth.refreshPlan();
      if (this.auth.hasDoctorchartPlan()) {
        const requested = this.route.snapshot.queryParamMap.get('returnUrl');
        const path = requested?.split(/[?#]/)[0];
        const target = requested?.startsWith('/') && !requested.startsWith('//') && !['/', '/login', '/plan-required'].includes(path!) ? requested : '/dashboard';
        await this.router.navigateByUrl(target, {onSameUrlNavigation: 'reload'});
      } else {
        this.message.set('Todavía no tenés un plan activo de DoctorChart. Si acabás de contratarlo, esperá unos momentos y volvé a verificar.');
      }
    } catch {
      this.message.set('No pudimos verificar tu plan. Revisá tu conexión y volvé a intentar.');
    } finally { this.busy.set(false); }
  }

  async signOut(): Promise<void> {
    if (this.busy()) return;
    this.busy.set(true);
    try { const result = await this.auth.signOut(); if (result.error) throw result.error; await this.router.navigateByUrl('/login'); }
    catch { this.message.set('No pudimos cerrar la sesión. Volvé a intentar.'); }
    finally { this.busy.set(false); }
  }
}
