import { TransferBankDetails } from '../../shared/customer-account/transfer-bank-details';
import { readRayaEvents } from '../../shared/customer-account/raya-events';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, Injector, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom, fromEvent, NEVER, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';

type PlanBenefit = { label: string; included: boolean | null };
type Plan = {
  id: number; module: string; tier: string; price: number | null; currency: string;
  days: number; description?: string; action?: 'BUY' | 'RENEW' | 'UPGRADE' | 'LOCKED'; lockReason?: string;
};
type Quote = { canUpgrade: boolean; proratedUpgradeAmount: number; remainingDays: number; currency: string; message: string };
type TransferStatus = 'verifying' | 'pending' | 'credited' | 'expired' | 'rejected' | 'review' | 'refunded' | 'price_changed';
type Transfer = {
  externalReference: string;
  bankTransfer?: { cvu: string; alias?: string };
  preparing?: boolean;
  checkoutUrl?: string;
  status: TransferStatus;
  amount: number;
  originalAmount?: number;
  discountPercent?: number;
  currency: string;
  items: { module: string; tier: string; days: number }[];
  expiresAt?: string;
};
type TransferRequest = { returnApp: 'doctorchart'; previousReference?: string } &
  ({ planIds: [number]; targetPlanId?: never } | { targetPlanId: number; planIds?: never });
type SavedTransferRequest = { key: string; body: TransferRequest };

const tierOrder: Record<string, number> = { BASIC: 0, PRO: 1, UNLIMITED: 2 };

const transferStatus: Record<TransferStatus, string> = {
  verifying: 'Verificando pago',
  pending: 'Esperando transferencia',
  credited: 'Pago acreditado',
  expired: 'Orden vencida',
  rejected: 'Pago rechazado',
  review: 'Operación bajo revisión',
  price_changed: 'Orden sin vigencia por cambio de precio',
  refunded: 'Pago reembolsado',
};
const referencePattern = /^[A-Za-z0-9_-]{1,128}$/;

@Component({
  selector: 'app-product-pricing',
  imports: [ThemeToggleComponent, RouterLink, TransferBankDetails],
  templateUrl: './pricing.component.html',
  styleUrls: ['../../shared/customer-account/pricing.css', '../../shared/customer-account/transfer-checkout.css', '../../shared/customer-account/transfer-receipt.css', '../../shared/customer-account/transfer-payment.css'],
})
export class PricingComponent {
  private readonly auth = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly api = new URL('/api/billing/', environment.apiUrl).href;
  private readonly product = 'doctorchart' as const;
  private readonly tiers: Record<string, string> = { BASIC: 'Básico', PRO: 'Pro', UNLIMITED: 'Ilimitado' };
  protected readonly isLoggedIn = this.auth.isLoggedIn;
  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly loadingError = signal(false);
  protected readonly plans = signal<Plan[]>([]);
  protected readonly planLimits = signal<Record<string, Record<string, unknown>>>({});
  protected readonly limitsStatus = signal<'loading' | 'ready' | 'unavailable'>('loading');
  protected readonly cycle = signal(0);
  protected readonly selected = signal<Plan | null>(null);
  protected readonly quote = signal<Quote | null>(null);
  protected readonly checking = signal(false);
  protected readonly rayaAvailable = signal(false);
  protected readonly cardMethods = signal<{ mobbexCard?: boolean; mobbexManage?: boolean; mobbexUpgrade?: boolean }>({});
  protected readonly rayaDiscountPercent = signal(0);
  protected readonly chosenPayment = signal<'raya' | 'card' | null>(null);
  protected readonly paymentMethod = computed(() => {
    const choice = this.chosenPayment();
    if ((choice === 'raya' && this.rayaAvailable()) || (choice === 'card' && this.cardMethods().mobbexCard)) return choice;
    if (this.rayaAvailable()) return 'raya';
    if (this.cardMethods().mobbexCard) return 'card';
    return null;
  });

  protected discounted(currency: string): boolean {
    return this.paymentMethod() === 'raya' && currency === 'ARS' && this.rayaDiscountPercent() > 0;
  }
  protected rayaPrice(amount: number): number {
    const cents = Math.round(amount * 100);
    return Math.round(cents * (100 - this.rayaDiscountPercent()) / 100) / 100;
  }
  protected netWithoutNationalTaxes(amount: number | null | undefined, currency: string): number | null {
    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) return null;
    if ((currency || 'ARS').toUpperCase() !== 'ARS') return null;
    return Math.round((amount / 1.21) * 100) / 100;
  }
  protected readonly transferError = signal('');
  protected readonly transferLoading = signal(false);
  private readonly transferRequestOwner = signal<string | null>(null);
  protected readonly transferRequestSaved = computed(() => {
    const owner = this.transferRequestOwner();
    return owner !== null && owner === this.auth.currentUser()?.id;
  });
  protected readonly transferReturn = this.readTransferReturn();
  private readonly transferOwner = signal<string | null>(null);
  private readonly activity = signal<Transfer[]>([]);
  private readonly viewedTransfer = signal<Transfer | null>(null);
  protected readonly expiredLink = signal(false);
  private linkTimer?: ReturnType<typeof setTimeout>;

  protected readonly copyFeedback = signal('');
  protected readonly bankTransfer = computed(() => {
    const transfer = this.transfer();
    return transfer?.status === 'pending' && !this.expiredLink() &&
      Date.parse(transfer.expiresAt ?? '') > Date.now() ? transfer.bankTransfer : undefined;
  });

  protected async copyBankValue(value: string, label: string): Promise<void> {
    const order = this.transfer();
    if (order?.status !== 'pending' || !order.expiresAt || Date.parse(order.expiresAt) <= Date.now()) return;
    try {
      await navigator.clipboard.writeText(value);
      if (this.transfer() === order) this.copyFeedback.set(label === 'CVU' ? 'CVU copiado.' : 'Alias copiado.');
    } catch {
      if (this.transfer() === order) this.copyFeedback.set('Seleccioná el dato para copiarlo manualmente.');
    }
  }
  protected readonly transfers = computed(() =>
    this.transferOwner() === this.auth.currentUser()?.id ? this.activity() : []);
  protected readonly transfer = computed(() =>
    this.transferOwner() === this.auth.currentUser()?.id ? this.viewedTransfer() : null);
  protected readonly transferLink = computed(() => {
    const transfer = this.transfer();
    return transfer && !this.expiredLink() ? this.hostedTransferURL(transfer) : null;
  });
  protected readonly previousTransfer = computed(() => {
    const transfer = this.transfer();
    const plan = this.selected();
    if (!transfer || !plan || !['expired', 'rejected', 'refunded', 'credited'].includes(transfer.status)) return null;
    return transfer.items.length === 1 && transfer.items.some(item =>
      item.module.toLowerCase() === this.product && item.tier === plan.tier &&
      (plan.action === 'UPGRADE' || item.days === plan.days)) ? transfer.externalReference : null;
  });
  protected readonly cycles = computed(() => [...new Set(this.plans().map(plan => plan.days))].sort((a, b) => a - b));
  protected readonly visible = computed(() => this.plans()
    .filter(plan => plan.days === this.cycle())
    .sort((a, b) => (tierOrder[a.tier] ?? 3) - (tierOrder[b.tier] ?? 3)));
  protected readonly comparisonIncomplete = computed(() =>
    this.limitsStatus() === 'unavailable' ||
    (this.limitsStatus() === 'ready' && this.visible().some(plan => {
      const limits = this.planLimits()[plan.tier];
      return [
        'appointments_enabled', 'teleconsultation_enabled',
        'online_booking_enabled', 'secretary_management_enabled',
      ].some(key => typeof limits?.[key] !== 'boolean');
    })),
  );

  protected readonly checkoutOpen = computed(() => !!this.transfer() && !this.checkoutClosed());
  private manualAvailableAt = 0;
  protected readonly manualWait = signal(0);
  protected readonly liveConnected = signal(false);
  private checkoutConnection?: AbortController;
  private readonly dismissedReference = signal<string | null>(null);
  protected readonly checkoutClosed = computed(() => {
    const reference = this.transfer()?.externalReference;
    return this.transfer()?.status === 'price_changed' || (!!reference && reference === this.dismissedReference());
  });
  protected readonly checkoutResumable = computed(() => this.checkoutClosed() && !['credited', 'price_changed'].includes(this.transfer()?.status ?? ''));
  protected readonly resumeSelectedTransfer = computed(() => {
    const order = this.transfer();
    const plan = this.selected();
    return this.checkoutClosed() && !!order && !!plan &&
      ['pending', 'verifying', 'review'].includes(order.status) &&
      order.items.some(item => item.module.toLowerCase() === this.product && item.tier === plan.tier &&
        (plan.action === 'UPGRADE' || item.days === plan.days));
  });

  protected readonly pollReference = computed(() => {
    const transfer = this.transfer();
    return transfer && (transfer.status === 'pending' || transfer.status === 'verifying')
      ? transfer.externalReference : null;
  });

  protected cancelCheckout(): void {
    this.dismissedReference.set(this.transfer()?.externalReference ?? null);
  }

  protected finishCheckout(): void {
    const receipt = this.transfer();
    if (receipt?.status !== 'credited') return;
    this.dismissedReference.set(receipt.externalReference);
    if (this.route.snapshot.queryParamMap.get('rayaOrder') === receipt.externalReference) {
      void this.injector.get(Router).navigate([], {
        relativeTo: this.route, queryParams: { rayaOrder: null },
        queryParamsHandling: 'merge', preserveFragment: true, replaceUrl: true,
      });
    }
    requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLElement>('.pricing .intro h1');
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ block: 'start' });
    });
  }

  protected async reopenCheckout(): Promise<void> {
    const reference = this.dismissedReference();
    if (!reference || this.transferLoading() || this.checking()) return;
    await this.refreshTransfer(reference);
    if (this.dismissedReference() === reference && !this.transferError()) {
      this.dismissedReference.set(null);
    }
  }

  protected async consultStatus(): Promise<void> {
    const reference = this.pollReference();
    const connection = this.checkoutConnection;
    if (!reference || !connection || connection.signal.aborted || this.transferLoading() || this.checking() || Date.now() < this.manualAvailableAt) return;
    this.manualAvailableAt = Date.now() + 15_000;
    this.manualWait.set(15);
    await this.refreshTransfer(reference, false, connection.signal);
  }

  private watchTransfer(): void {
    effect(cleanup => {
      const reference = this.pollReference();
      const owner = this.auth.currentUser()?.id;
      if (!this.browser || !reference || !owner) return;

      const lifecycle = new AbortController();
      this.checkoutConnection = lifecycle;
      let stream: AbortController | undefined;
      let retry: ReturnType<typeof setTimeout> | undefined;
      lifecycle.signal.addEventListener('abort', () => stream?.abort(), { once: true });
      const isCurrent = () => !lifecycle.signal.aborted && this.pollReference() === reference && this.auth.currentUser()?.id === owner;

      const connect = async (): Promise<void> => {
        if (document.hidden || stream || !isCurrent()) return;
        const connectionSignal = new AbortController();
        stream = connectionSignal;
        let next = 5000;
        try {
          const headers = await this.authHeaders(owner);
          const connection = { url: this.api + 'transfers/' + encodeURIComponent(reference) + '/events', authorization: headers.get('Authorization') ?? '' };
          if (!isCurrent() || connectionSignal.signal.aborted) return;
          next = await readRayaEvents(connection.url, connection.authorization, reference, connectionSignal.signal,
            () => this.liveConnected.set(true),
            async event => {
              if (!isCurrent() || connectionSignal.signal.aborted) return;
              const previous = this.transfer();
              if (!previous) return;
              if (event.status !== 'pending' && event.status !== 'verifying') {
                const final = { ...previous, status: event.status, preparing: false, bankTransfer: undefined, checkoutUrl: undefined };
                lifecycle.abort();
                this.showTransfer(owner, final);
                if (final.status === 'credited') await this.load(true);
              } else if (previous.status !== event.status || !!previous.preparing !== event.preparing) {
                await this.refreshTransfer(reference, false, connectionSignal.signal);
              }
            });
        } catch {
          // Manual status lookup remains available while a connection is retried.
        } finally {
          stream = undefined;
          if (isCurrent()) {
            this.liveConnected.set(false);
            if (!document.hidden && next >= 0) retry = setTimeout(() => void connect(), next);
          }
        }
      };

      const updateManualWait = () => this.manualWait.set(Math.max(0, Math.ceil((this.manualAvailableAt - Date.now()) / 1000)));
      updateManualWait();
      const tick = setInterval(updateManualWait, 1000);
      const onVisibilityChange = () => {
        clearTimeout(retry);
        if (document.hidden) stream?.abort();
        else void connect();
      };
      document.addEventListener('visibilitychange', onVisibilityChange);
      void connect();
      cleanup(() => {
        lifecycle.abort();
        stream?.abort();
        clearTimeout(retry);
        clearInterval(tick);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        this.liveConnected.set(false);
        this.checkoutConnection = undefined;
      });
    });
  }

  constructor() {
    this.watchTransfer();
    effect(cleanup => {
      if (!this.browser) return;
      const open = this.checkoutOpen();
      const closed = this.checkoutResumable();
      const credited = this.transfer()?.status === 'credited';
      if (!open && !closed) return;
      const frame = requestAnimationFrame(() => {
        const target = document.querySelector<HTMLElement>(
          credited && open ? '.transfer-success .transfer-title' : open ? '.transfer-page .transfer-title' : '.resume-transfer',
        );
        target?.focus({ preventScroll: true });
        target?.scrollIntoView({ block: 'nearest' });
      });
      cleanup(() => cancelAnimationFrame(frame));
    });
  }

  ngOnInit(): void {
    if (!this.browser) return;
    this.destroyRef.onDestroy(() => clearTimeout(this.linkTimer));
    void this.load(this.route.snapshot.queryParamMap.get('mobbexUpdated') === '1');
    void this.loadTransfers();
    void this.loadPlanLimits();
  }

  protected tierName(tier: string): string { return this.tiers[tier] ?? tier; }
  protected async loadPlanLimits(): Promise<void> {
    this.limitsStatus.set('loading');
    try {
      const limits = await firstValueFrom(this.http.get<Record<string, Record<string, unknown>>>(
        this.api + 'limits/' + this.product, { params: { view: 'comparison' } },
      ));
      this.planLimits.set(limits ?? {});
      this.limitsStatus.set('ready');
    } catch {
      this.limitsStatus.set('unavailable');
    }
  }

  protected planBenefits(limits?: Record<string, unknown>): PlanBenefit[] {
    const flag = (key: string): boolean | null => {
      const value = limits?.[key];
      return typeof value === 'boolean' ? value : null;
    };
    const agenda = flag('appointments_enabled');
    const secretary = flag('secretary_management_enabled');
    const requiresAgenda = (key: string): boolean | null => {
      const enabled = flag(key);
      if (agenda === false || enabled === false) return false;
      return agenda === null ? null : enabled;
    };
    const benefits: PlanBenefit[] = [
      { label: 'Fichas de pacientes y consultas', included: true },
      { label: 'Estudios adjuntos', included: true },
      { label: 'Recetas en PDF', included: true },
      { label: 'Agenda de turnos' + this.quotaDetail(limits?.['max_appointments'], 'turno activo', 'turnos activos', agenda), included: agenda },
      { label: 'Teleconsulta', included: requiresAgenda('teleconsultation_enabled') },
      { label: 'Reservas por internet', included: requiresAgenda('online_booking_enabled') },
      { label: 'Gestión de secretaría' + this.quotaDetail(limits?.['max_secretaries'], 'asignación', 'asignaciones', secretary), included: secretary },
    ];
    const quotas = [['max_patients', 'paciente', 'pacientes'], ['max_records_per_patient', 'consulta por paciente', 'consultas por paciente']] as const;
    for (const [key, singular, plural] of quotas) {
      const label = this.formatQuota(limits?.[key], singular, plural);
      if (label) benefits.push({ label, included: true });
    }
    return benefits;
  }

  private quotaDetail(value: unknown, singular: string, plural: string, included: boolean | null): string {
    const quota = included === true ? this.formatQuota(value, singular, plural) : null;
    return quota ? ' · ' + quota : '';
  }

  private formatQuota(value: unknown, singular: string, plural: string): string | null {
    if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < -1) return null;
    if (value === -1) return plural.charAt(0).toUpperCase() + plural.slice(1) + ' sin límite';
    return value.toLocaleString('es-AR') + ' ' + (value === 1 ? singular : plural);
  }
  protected duration(days: number): string { return ({ 30: '1 mes', 90: '3 meses', 180: '6 meses', 365: '12 meses' } as Record<number, string>)[days] ?? days + ' días'; }
  protected money(price: number | null, currency: string): string {
    return price === null ? '' : new Intl.NumberFormat('es-AR', { style: 'currency', currency, currencyDisplay: 'code' }).format(price);
  }
  protected actionLabel(plan: Plan): string {
    return plan.action === 'RENEW' ? 'Renovar' : plan.action === 'UPGRADE' ? 'Mejorar' : 'Elegir plan';
  }

  protected transferStatus(transfer: Transfer): string {
    if (transfer.preparing) return 'Preparando los datos bancarios';
    if (transfer.status === 'pending' && this.transfer() === transfer && this.expiredLink()) return 'Verificando la vigencia de la orden';
    return transferStatus[transfer.status] ?? 'Operación bajo revisión';
  }

  protected checkTransferExpiry(event: MouseEvent, transfer: Transfer): void {
    if (this.hostedTransferURL(transfer)) return;
    event.preventDefault();
    void this.refreshTransfer(transfer.externalReference);
  }

  protected transferExpiry(expiresAt?: string): string {
    if (!expiresAt || !Number.isFinite(Date.parse(expiresAt))) return '';
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Argentina/Buenos_Aires',
    }).format(new Date(expiresAt));
  }

  protected async loadTransfers(): Promise<void> {
    if (this.transferLoading()) return;
    this.transferLoading.set(true);
    this.transferError.set('');
    try {
      await this.auth.authReady;
      const methods = await firstValueFrom(this.http.get<{ rayaTransfer: boolean; rayaDiscountPercent?: number; mobbexCard?: boolean; mobbexManage?: boolean; mobbexUpgrade?: boolean }>(
        this.api + 'payment-methods', { transferCache: false },
      )).catch(() => null);
      this.rayaAvailable.set(methods?.rayaTransfer === true);
      this.rayaDiscountPercent.set(methods?.rayaDiscountPercent ?? 0);
      this.cardMethods.set(methods ?? {});
      const owner = this.auth.currentUser()?.id;
      if (!owner) return;
      this.transferRequestOwner.set(this.readTransferRequest(owner) ? owner : null);
      const headers = await this.authHeaders(owner);
      const rows = await firstValueFrom(this.http.get<Transfer[]>(
        this.api + 'transfers', { headers, transferCache: false },
      )).catch(() => null);
      if (this.auth.currentUser()?.id !== owner) return;
      this.useTransferOwner(owner);
      if (rows) this.activity.set(rows.filter(transfer => this.includesDoctorChart(transfer)));
      else if (this.rayaAvailable() || this.transferReturn) {
        this.transferError.set('No pudimos consultar tus transferencias. Volvé a intentar.');
      }
      const returnReference = this.readTransferReturn();
      if (returnReference) {
        await this.fetchTransfer(owner, returnReference);
      } else if (!this.transfer()) {
        const latest = this.activity().find(transfer => ['pending', 'verifying', 'review'].includes(transfer.status));
        if (latest) await this.fetchTransfer(owner, latest.externalReference);
      }
    } catch {
      this.transferError.set('No pudimos recuperar la transferencia. Volvé a consultar su estado.');
    } finally {
      this.transferLoading.set(false);
    }
  }

  protected cardCheckout(planId?: number): string {
    const url = new URL('/dashboard', environment.bycodePlansUrl || 'https://bycode.com.ar');
    url.searchParams.set('mobbexProduct', 'doctorchart');
    if (planId) url.searchParams.set('mobbexPlan', String(planId));
    url.hash = 'card-renewal';
    return url.href;
  }

  protected async refreshTransfer(reference: string, reveal = false, signal?: AbortSignal): Promise<void> {
    const owner = this.auth.currentUser()?.id;
    if (!owner || this.transferLoading() || this.checking() || !referencePattern.test(reference)) return;
    this.transferLoading.set(true);
    this.transferError.set('');
    try {
      await this.fetchTransfer(owner, reference, signal);
      if (signal?.aborted || this.destroyRef.destroyed) return;
      if (reveal) this.revealTransfer(reference);
    } catch {
      if (signal?.aborted || this.destroyRef.destroyed) return;
      this.transferError.set(signal ? 'No pudimos actualizar el estado. Podés volver a consultarlo en unos segundos.' : 'No pudimos consultar la transferencia. Volvé a intentarlo.');
    } finally {
      this.transferLoading.set(false);
    }
  }

  protected async startTransfer(recover = false): Promise<void> {
    const owner = this.auth.currentUser()?.id;
    const plan = this.selected();
    if (!owner || !this.rayaAvailable() || this.checking() || this.transferLoading()) return;
    if (!recover && this.resumeSelectedTransfer()) return this.reopenCheckout();
    if (!recover && (!plan || plan.action === 'LOCKED' || (plan.action === 'UPGRADE' && !this.quote()?.canUpgrade))) return;
    const previousReference = this.previousTransfer();
    this.checking.set(true);
    this.transferError.set('');
    let pending: SavedTransferRequest | null = null;
    let firstSubmission = false;
    try {
      const headers = await this.authHeaders(owner);
      pending = this.readTransferRequest(owner);
      if (pending && !recover) {
        this.transferRequestOwner.set(owner);
        return;
      }
      if (!pending) {
        if (!plan || recover) return;
        pending = {
          key: window.crypto.randomUUID(),
          body: {
            returnApp: this.product,
            ...(previousReference ? { previousReference } : {}),
            ...(plan.action === 'UPGRADE' ? { targetPlanId: plan.id } : { planIds: [plan.id] }),
          },
        };
        this.saveTransferRequest(owner, pending);
        firstSubmission = true;
      }
      this.transferRequestOwner.set(owner);
      const result = await firstValueFrom(this.http.post<Transfer>(this.api + 'transfers', pending.body, {
        headers: headers.set('Idempotency-Key', pending.key),
        transferCache: false,
      }));
      if (this.auth.currentUser()?.id !== owner) return;
      this.showTransfer(owner, result);
      this.clearTransferRequest(owner, pending.key);
      this.revealTransfer(result.externalReference);
      if (result.status === 'credited') await this.load(true);
    } catch (err) {
      if (this.auth.currentUser()?.id !== owner) return;
      const attemptReference = err instanceof HttpErrorResponse ? err.error?.externalReference : undefined;
      if (pending && typeof attemptReference === 'string' && referencePattern.test(attemptReference)) {
        try {
          await this.fetchTransfer(owner, attemptReference);
          if (this.auth.currentUser()?.id === owner) this.clearTransferRequest(owner, pending.key);
          this.revealTransfer(attemptReference);
          return;
        } catch { /* Keep the same idempotency key until a read can identify the order. */ }
      }
      if (pending && err instanceof HttpErrorResponse &&
          (err.error?.code === 'checkout_price_changed' || (firstSubmission && [400, 401, 403, 422].includes(err.status)))) {
        try { this.clearTransferRequest(owner, pending.key); } catch { /* Preserve recovery if storage is unavailable. */ }
      }
      this.transferError.set(err instanceof HttpErrorResponse
        ? 'No pudimos iniciar la transferencia. Si quedó guardada, recuperá el mismo intento.'
        : 'No pudimos guardar o recuperar la transferencia en esta pestaña. Verificá el almacenamiento del navegador.');
    } finally {
      this.checking.set(false);
    }
  }

  private revealTransfer(reference: string): void {
    if (this.transfer()?.externalReference !== reference) return;
    if (this.dismissedReference() === reference) this.dismissedReference.set(null);
    window.requestAnimationFrame(() => {
      const heading = document.getElementById('transfer-title');
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ block: 'start' });
    });
  }

  private async fetchTransfer(owner: string, reference: string, signal?: AbortSignal): Promise<void> {
    const previous = this.transfer();
    const statusOnly = !!signal && !previous?.preparing;
    const headers = await this.authHeaders(owner);
    if (signal?.aborted || this.destroyRef.destroyed) return;
    const params: Record<string, string> = statusOnly ? { view: 'status' } : {};
    const transfer = await firstValueFrom(this.http.get<Transfer>(
      this.api + 'transfers/' + encodeURIComponent(reference), { params, headers, transferCache: false, timeout: 10_000 },
    ).pipe(
      takeUntil(signal ? fromEvent(signal, 'abort') : NEVER),
      takeUntilDestroyed(this.destroyRef),
    ));
    if (signal?.aborted || this.destroyRef.destroyed) return;
    if (statusOnly && transfer.status === 'pending' && transfer.expiresAt === previous?.expiresAt) {
      transfer.bankTransfer ??= previous?.bankTransfer;
    }
    if (this.auth.currentUser()?.id !== owner || transfer.externalReference !== reference) {
      throw new Error('La transferencia no coincide con esta consulta');
    }
    this.showTransfer(owner, transfer);
    if (transfer.status === 'credited') await this.load(true);
  }

  private includesDoctorChart(transfer: Transfer): boolean {
    return transfer.items.some(item => item.module.toLowerCase() === this.product);
  }

  private useTransferOwner(owner: string): void {
    if (this.transferOwner() === owner) return;
    this.viewedTransfer.set(null);
    this.activity.set([]);
    this.transferOwner.set(owner);
  }

  private showTransfer(owner: string, transfer: Transfer): void {
    if (this.destroyRef.destroyed) return;
    if (!referencePattern.test(transfer.externalReference) || !this.includesDoctorChart(transfer)) {
      throw new Error('No encontramos una transferencia de DoctorChart con esa referencia');
    }
    this.useTransferOwner(owner);
    this.activity.update(transfers => {
      const position = transfers.findIndex(previous => previous.externalReference === transfer.externalReference);
      return position === -1 ? [transfer, ...transfers] : transfers.map((previous, index) =>
        index === position ? transfer : previous);
    });
    clearTimeout(this.linkTimer);
    if (this.transfer()?.externalReference !== transfer.externalReference) this.copyFeedback.set('');
    const timeLeft = Date.parse(transfer.expiresAt ?? '') - Date.now();
    this.expiredLink.set(timeLeft <= 0);
    this.viewedTransfer.set(transfer);
    if (transfer.status === 'pending' && timeLeft > 0) {
      this.linkTimer = setTimeout(() => this.expiredLink.set(true), Math.min(timeLeft, 2_147_483_647));
    }
  }

  private hostedTransferURL(transfer: Transfer): string | null {
    if (transfer.status !== 'pending' || !transfer.checkoutUrl || !transfer.expiresAt ||
        !(Date.parse(transfer.expiresAt) > Date.now())) return null;
    try {
      const url = new URL(transfer.checkoutUrl);
      return url.origin === 'https://raya.cash' && !url.username && !url.password ? url.href : null;
    } catch {
      return null;
    }
  }

  private transferStorageKey(owner: string): string {
    return 'bycode.billing.transfer:' + encodeURIComponent(this.api) + ':' + encodeURIComponent(owner);
  }

  private readTransferReturn(): string | null {
    const reference = this.route.snapshot.queryParamMap.get('rayaOrder');
    return reference && referencePattern.test(reference) ? reference : null;
  }

  private readTransferRequest(owner: string): SavedTransferRequest | null {
    const raw = window.sessionStorage.getItem(this.transferStorageKey(owner));
    if (raw === null) return null;
    const pending = JSON.parse(raw) as SavedTransferRequest;
    if (!pending || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(pending.key) ||
        pending.body?.returnApp !== this.product ||
        (pending.body.previousReference !== undefined && !referencePattern.test(pending.body.previousReference)) ||
        !(pending.body.targetPlanId !== undefined
          ? Number.isSafeInteger(pending.body.targetPlanId) && pending.body.targetPlanId > 0 && pending.body.planIds === undefined
          : pending.body.planIds?.length === 1 && Number.isSafeInteger(pending.body.planIds[0]) && pending.body.planIds[0] > 0)) {
      throw new Error('No pudimos recuperar la transferencia pendiente');
    }
    return pending;
  }

  private saveTransferRequest(owner: string, pending: SavedTransferRequest): void {
    const key = this.transferStorageKey(owner);
    const stored = JSON.stringify(pending);
    window.sessionStorage.setItem(key, stored);
    if (window.sessionStorage.getItem(key) !== stored) throw new Error('No pudimos guardar la transferencia');
  }

  private clearTransferRequest(owner: string, key: string): void {
    if (this.readTransferRequest(owner)?.key === key) window.sessionStorage.removeItem(this.transferStorageKey(owner));
    this.transferRequestOwner.set(this.readTransferRequest(owner) ? owner : null);
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
    if (this.checking() || !this.isLoggedIn() || plan.action === 'LOCKED') return;
    this.selected.set(plan);
    this.quote.set(null);
    this.error.set('');
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

  private async authHeaders(owner: string): Promise<HttpHeaders> {
    const token = this.auth.getAccessToken();
    if (!token || (this.auth.currentUser()?.id) !== owner) throw new Error('Iniciá sesión nuevamente para continuar.');
    return new HttpHeaders({ Authorization: 'Bearer ' + token });
  }
}
