import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-no-plan',
  imports: [RouterLink],
  template: `
    <main class="plan-page">
      <section class="plan-card" aria-labelledby="plan-title">
        <img src="/doctorchart-logo.svg" width="56" height="56" alt="DoctorChart" />
        <p class="product">DoctorChart</p>
        <span class="plan-status">{{ hasPlan() ? 'Plan activo' : 'Sin plan activo' }}</span>
        <h1 id="plan-title">{{ hasPlan() ? 'Tu acceso ya está disponible' : 'Necesitás un plan para continuar' }}</h1>
        @if (!hasPlan()) {
        <p>Iniciaste sesión correctamente. Tu cuenta no tiene un plan activo de DoctorChart o el anterior ya venció.</p>
        <p>Para usar las historias clínicas y las demás herramientas, elegí un plan de DoctorChart.</p>
        <a class="dc-button dc-button--primary primary" href="/pricing">Ver planes de DoctorChart</a>
        }
        <button class="dc-button secondary" type="button" (click)="checkPlan()" [disabled]="busy()">
          {{ busy() ? 'Verificando plan…' : hasPlan() ? 'Continuar a DoctorChart' : 'Ya contraté un plan: verificar acceso' }}
        </button>
        @if (message()) { <p class="feedback" role="status">{{ message() }}</p> }
        <a class="dc-button secondary" routerLink="/account">Mi cuenta</a>
        <button class="logout" type="button" (click)="signOut()" [disabled]="busy()">Cerrar sesión</button>
      </section>
    </main>
  `,
  styleUrl: './no-plan.component.css',
})
export class NoPlanComponent {
  private readonly auth = inject(AuthService);
  readonly hasPlan = this.auth.hasDoctorchartPlan;
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly busy = signal(false);
  readonly message = signal('');

  async checkPlan(): Promise<void> {
    if (this.busy()) return;
    this.busy.set(true); this.message.set('');
    try {
      if (!this.auth.hasDoctorchartPlan()) await this.auth.refreshPlan();
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
