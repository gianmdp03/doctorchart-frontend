import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';

type Plan = {
  id: number; module: string; tier: string; price: number | null; currency: string;
  days: number; description?: string; action?: 'BUY' | 'RENEW' | 'UPGRADE' | 'LOCKED'; lockReason?: string;
};
type Quote = { canUpgrade: boolean; proratedUpgradeAmount: number; remainingDays: number; currency: string; message: string };
type Purchase = {
  userId: string; userEmail: string; provider: 'MERCADO_PAGO'; returnApp: 'doctorchart';
} & ({ planIds: [number] } | { targetPlanId: number });
type Pending = { key: string; body: Purchase; retried: boolean };

@Component({
  selector: 'app-product-pricing',
  imports: [ThemeToggleComponent, RouterLink],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
})
export class PricingComponent {
  private readonly auth = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly api = new URL('/api/billing/', environment.apiUrl).href;
  private readonly product = 'doctorchart' as const;
  private readonly tiers: Record<string, string> = { BASIC: 'Básico', PRO: 'Pro', UNLIMITED: 'Ilimitado' };
  protected readonly isLoggedIn = this.auth.isLoggedIn;
  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly loadingError = signal(false);
  protected readonly checkoutError = signal('');
  protected readonly plans = signal<Plan[]>([]);
  protected readonly cycle = signal(0);
  protected readonly selected = signal<Plan | null>(null);
  protected readonly quote = signal<Quote | null>(null);
  protected readonly checking = signal(false);
  protected readonly hasPending = signal(false);
  protected readonly pendingReference = signal('');
  protected readonly cycles = computed(() => [...new Set(this.plans().map(plan => plan.days))].sort((a, b) => a - b));
  protected readonly visible = computed(() => this.plans().filter(plan => plan.days === this.cycle()));
  protected readonly returned = ['payment_id', 'collection_id', 'external_reference', 'payment_status', 'status'].some(key => this.route.snapshot.queryParamMap.has(key));

  ngOnInit(): void {
    if (this.browser) void this.load(this.returned);
  }

  protected tierName(tier: string): string { return this.tiers[tier] ?? tier; }
  protected duration(days: number): string { return ({ 30: '1 mes', 90: '3 meses', 180: '6 meses', 365: '1 año' } as Record<number, string>)[days] ?? days + ' días'; }
  protected money(price: number | null, currency: string): string {
    return price === null ? '' : new Intl.NumberFormat('es-AR', { style: 'currency', currency, currencyDisplay: 'code' }).format(price);
  }
  protected actionLabel(plan: Plan): string {
    return plan.action === 'RENEW' ? 'Renovar' : plan.action === 'UPGRADE' ? 'Mejorar' : 'Elegir plan';
  }

  protected async load(refresh = false): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    this.loadingError.set(false);
    this.selected.set(null);
    this.quote.set(null);
    try {
      await this.auth.authReady;
      if (refresh && this.isLoggedIn()) {
        try { await this.auth.refreshPlan(false); } catch { /* Billing still provides the authoritative catalog. */ }
      }
      const owner = this.auth.currentUser()?.id;
      const headers = owner ? await this.authHeaders(owner) : new HttpHeaders();
      const path = owner ? 'plans/contextual' : 'plans';
      const catalog = await firstValueFrom(this.http.get<Plan[]>(this.api + path, { headers, transferCache: false }));
      if ((this.auth.currentUser()?.id ?? null) !== (owner ?? null)) throw new Error('La sesión cambió');
      this.plans.set((catalog ?? []).filter(plan => plan.module === this.product && plan.price !== null && plan.price > 0));
      if (!this.cycles().includes(this.cycle())) this.cycle.set(this.cycles()[0] ?? 0);
      this.hasPending.set(!!owner && !!this.readPending(owner));
    } catch {
      this.loadingError.set(true);
      this.error.set('No pudimos cargar los planes. Reintentá en unos momentos.');
    } finally {
      this.loading.set(false);
    }
  }

  protected setCycle(days: number): void {
    this.cycle.set(days);
    this.selected.set(null);
    this.quote.set(null);
    this.error.set('');
  }

  protected async select(plan: Plan): Promise<void> {
    if (this.checking() || this.hasPending() || !this.isLoggedIn() || plan.action === 'LOCKED') return;
    this.selected.set(plan);
    this.quote.set(null);
    this.error.set('');
    this.checkoutError.set('');
    if (plan.action !== 'UPGRADE') return;
    const owner = this.auth.currentUser()?.id;
    if (!owner) return;
    this.checking.set(true);
    try {
      const headers = await this.authHeaders(owner);
      const quote = await firstValueFrom(this.http.get<Quote>(this.api + 'proration-preview', {
        headers, params: { targetPlanId: plan.id }, transferCache: false,
      }));
      if (this.selected()?.id === plan.id && (this.auth.currentUser()?.id) === owner) this.quote.set(quote);
    } catch {
      this.error.set('No pudimos calcular el importe de la mejora. Volvé a elegir el plan para reintentar.');
    } finally {
      this.checking.set(false);
    }
  }

  protected async checkout(retry = false): Promise<void> {
    if (this.checking()) return;
    const owner = this.auth.currentUser()?.id;
    if (!owner) return;
    const plan = this.selected();
    if (!retry && (!plan || (plan.action === 'UPGRADE' && !this.quote()?.canUpgrade))) return;
    this.checking.set(true);
    this.checkoutError.set('');
    this.pendingReference.set('');
    let first = false;
    let sent = false;
    let pending: Pending | null = null;
    try {
      const headers = await this.authHeaders(owner);
      pending = this.readPending(owner);
      if (pending) {
        if (!retry) throw new Error('Ya hay una solicitud de pago pendiente. Reintentá esa solicitud.');
        pending = { ...pending, retried: true };
      } else {
        if (retry || !plan) throw new Error('No hay una solicitud de pago pendiente.');
        const email = this.auth.userEmail();
        if (!email) throw new Error('Esta cuenta no tiene correo para iniciar el pago.');
        pending = {
          key: window.crypto.randomUUID(),
          retried: false,
          body: {
            userId: owner, userEmail: email, provider: 'MERCADO_PAGO', returnApp: this.product,
            ...(plan.action === 'UPGRADE' ? { targetPlanId: plan.id } : { planIds: [plan.id] as [number] }),
          },
        };
        first = true;
      }
      this.savePending(owner, pending);
      this.hasPending.set(true);
      const path = 'targetPlanId' in pending.body ? 'checkout/upgrade' : 'checkout';
      sent = true;
      const result = await firstValueFrom(this.http.post<{ checkoutUrl: string; externalReference: string }>(this.api + path, pending.body, {
        headers: headers.set('Idempotency-Key', pending.key), transferCache: false,
      }));
      if (!result?.checkoutUrl || !result?.externalReference) throw new Error('La respuesta de pago está incompleta. Reintentá la misma solicitud.');
      const target = new URL(result.checkoutUrl);
      if (target.protocol !== 'https:' || target.username || target.password) throw new Error('No pudimos abrir el enlace de pago. Reintentá la misma solicitud.');
      if ((this.auth.currentUser()?.id) !== owner) throw new Error('La sesión cambió. Volvé a ingresar con la cuenta que inició el pago.');
      this.clearPending(owner, pending.key);
      window.location.assign(target.href);
    } catch (err) {
      const server = err instanceof HttpErrorResponse ? err.error : undefined;
      const message = typeof server?.message === 'string' ? server.message : undefined;
      if (typeof server?.externalReference === 'string') this.pendingReference.set(server.externalReference);
      if (pending && first && sent && err instanceof HttpErrorResponse && err.status >= 400 && err.status < 500 &&
          ![408, 409, 425, 429].includes(err.status) && !server?.externalReference &&
          !/review|conflict/.test(String(server?.code ?? ''))) {
        try { this.clearPending(owner, pending.key); } catch { /* Retain the attempt if storage is unavailable. */ }
      }
      this.checkoutError.set(message ?? (err instanceof Error && !(err instanceof HttpErrorResponse)
        ? err.message : 'No pudimos iniciar el pago. Si quedó pendiente, reintentá la misma solicitud.'));
    } finally {
      this.checking.set(false);
    }
  }

  private async authHeaders(owner: string): Promise<HttpHeaders> {
    const token = this.auth.getAccessToken();
    if (!token || (this.auth.currentUser()?.id) !== owner) throw new Error('Iniciá sesión nuevamente para continuar.');
    return new HttpHeaders({ Authorization: 'Bearer ' + token });
  }

  private storageKey(owner: string): string { return 'bycode.billing.pending:' + encodeURIComponent(this.api) + ':' + encodeURIComponent(owner); }

  private readPending(owner: string): Pending | null {
    const raw = window.sessionStorage.getItem(this.storageKey(owner));
    if (raw === null) return null;
    const pending = JSON.parse(raw) as Pending;
    if (!pending || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(pending.key) ||
        typeof pending.retried !== 'boolean' || pending.body?.userId !== owner || pending.body?.returnApp !== this.product ||
        pending.body.provider !== 'MERCADO_PAGO' || typeof pending.body.userEmail !== 'string' ||
        !('targetPlanId' in pending.body ? Number.isSafeInteger(pending.body.targetPlanId)
          : pending.body.planIds?.length === 1 && Number.isSafeInteger(pending.body.planIds[0]))) {
      throw new Error('No pudimos recuperar el pago pendiente. Contactá a soporte antes de iniciar otro.');
    }
    return pending;
  }

  private savePending(owner: string, pending: Pending): void {
    try {
      const stored = JSON.stringify(pending);
      window.sessionStorage.setItem(this.storageKey(owner), stored);
      if (window.sessionStorage.getItem(this.storageKey(owner)) !== stored) throw new Error();
    } catch {
      throw new Error('No pudimos guardar el intento de pago. Habilitá el almacenamiento del navegador antes de reintentar.');
    }
  }

  private clearPending(owner: string, key: string): void {
    if (this.readPending(owner)?.key === key) window.sessionStorage.removeItem(this.storageKey(owner));
    this.hasPending.set(!!this.readPending(owner));
  }
}
