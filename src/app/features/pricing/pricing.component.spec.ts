import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import { PricingComponent } from './pricing.component';

class PricingHarness extends PricingComponent {
  loadCatalog = () => this.load();
  loadPaymentMethods = () => this.loadTransfers();
  availablePlans = this.plans;
  visiblePlans = this.visible;
  changeCycle = (days: number) => this.setCycle(days);
  choose = () => this.select(this.availablePlans()[0]!);
  beginTransfer = () => this.startTransfer();
  recoverTransfer = () => this.startTransfer(true);
  closeTransfer = () => this.cancelCheckout();
  transferOpen = this.checkoutOpen;
  transferResumable = this.checkoutResumable;
  selectedPayment = this.paymentMethod;
  currentTransfer = this.transfer;
  savedTransfer = this.transferRequestSaved;
  discountedPrice = (amount: number) => this.rayaPrice(amount);
}

describe('DoctorChart pricing on central Billing', () => {
  const api = new URL('/api/billing/', environment.apiUrl).href;
  const owner = 'billing-owner-fixture';
  const email = 'billing-owner@example.test';
  const plan = { id: 17, module: 'doctorchart', tier: 'BASIC', days: 30, price: 1000, currency: 'ARS' };
  const order = {
    externalReference: 'raya-order-fixture',
    status: 'verifying',
    currency: 'ARS',
    amount: 900,
    discountPercent: 10,
    items: [{ module: 'doctorchart', tier: 'BASIC', days: 30 }],
  };
  const authPlanRefresh = vi.fn();
  let http: HttpTestingController;

  function configurePricing(query: Record<string, string>) {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), provideHttpClientTesting(), provideRouter([]),
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: convertToParamMap(query) } } },
        {
          provide: AuthService,
          useValue: {
            authReady: Promise.resolve(), currentUser: () => ({ id: owner }), getAccessToken: () => 'fixture-token',
            isLoggedIn: () => true, userEmail: () => email, refreshPlan: authPlanRefresh,
          },
        },
      ],
    });
    http = TestBed.inject(HttpTestingController);
  }

  function createPricing(query: Record<string, string>) {
    configurePricing(query);
    return TestBed.runInInjectionContext(() => new PricingHarness());
  }

  async function loadRayaHistory() {
    const methods = await vi.waitFor(() => http.expectOne(api + 'payment-methods'));
    methods.flush({ rayaTransfer: true, rayaDiscountPercent: 10, mobbexCard: false, mobbexManage: false });
    const history = await vi.waitFor(() => http.expectOne(api + 'transfers'));
    expect(history.request.method).toBe('GET');
    expect(history.request.headers.get('Authorization')).toBe('Bearer fixture-token');
    history.flush([]);
  }

  beforeEach(() => {
    window.sessionStorage.clear();
    authPlanRefresh.mockReset();
  });

  afterEach(() => {
    window.sessionStorage.clear();
    http.verify();
  });

  it('ignores the retired checkout return and creates or recovers a DoctorChart transfer', async () => {
    const legacyKey = 'bycode.billing.pending:' + encodeURIComponent(api) + ':' + encodeURIComponent(owner);
    window.sessionStorage.setItem(legacyKey, 'stale checkout payload');
    const pricing = createPricing({ payment_id: 'legacy-fixture', status: 'approved' });
    const pendingCatalog = pricing.loadCatalog();
    const catalog = await vi.waitFor(() => http.expectOne(api + 'plans/contextual'));
    expect(catalog.request.headers.get('Authorization')).toBe('Bearer fixture-token');
    catalog.flush([
      { ...plan, id: 1, module: 'pointly' },
      { ...plan, id: 2, module: 'stock_store' },
      { ...plan, id: 3, price: null },
      plan,
    ]);
    await pendingCatalog;
    expect(pricing.availablePlans()).toEqual([plan]);
    await pricing.choose();

    const methods = pricing.loadPaymentMethods();
    await loadRayaHistory();
    await methods;
    expect(pricing.currentTransfer()).toBeNull();
    expect(pricing.selectedPayment()).toBe('raya');
    expect(pricing.discountedPrice(plan.price)).toBe(900);

    const pending = pricing.beginTransfer();
    const creation = await vi.waitFor(() => http.expectOne(api + 'transfers'));
    const key = creation.request.headers.get('Idempotency-Key');
    expect(key).toBeTruthy();
    expect(creation.request.method).toBe('POST');
    expect(creation.request.headers.get('Authorization')).toBe('Bearer fixture-token');
    expect(creation.request.body).toEqual({ returnApp: 'doctorchart', planIds: [plan.id] });
    creation.flush({}, { status: 503, statusText: 'Service Unavailable' });
    await pending;
    expect(pricing.savedTransfer()).toBe(true);

    const recovering = pricing.recoverTransfer();
    const retry = await vi.waitFor(() => http.expectOne(api + 'transfers'));
    expect(retry.request.headers.get('Idempotency-Key')).toBe(key);
    expect(retry.request.body).toEqual(creation.request.body);
    retry.flush(order);
    await recovering;
    expect(pricing.savedTransfer()).toBe(false);
    expect(pricing.currentTransfer()).toEqual(order);
    expect(authPlanRefresh).not.toHaveBeenCalled();
    http.expectNone(api + 'checkout');
    http.expectNone(api + 'checkout/upgrade');
  });

  it('reads a Raya return with authentication and refreshes the plan after server-confirmed credit', async () => {
    const pricing = createPricing({ rayaOrder: order.externalReference });
    const methods = pricing.loadPaymentMethods();
    await loadRayaHistory();
    const lookup = await vi.waitFor(() => http.expectOne(api + 'transfers/' + order.externalReference));
    expect(lookup.request.method).toBe('GET');
    expect(lookup.request.headers.get('Authorization')).toBe('Bearer fixture-token');
    expect(authPlanRefresh).not.toHaveBeenCalled();
    lookup.flush({ ...order, status: 'credited' });
    (await vi.waitFor(() => http.expectOne(api + 'plans/contextual'))).flush([plan]);
    await methods;
    expect(authPlanRefresh).toHaveBeenCalledOnce();
    expect(pricing.currentTransfer()?.status).toBe('credited');
  });

  it('reopens the existing order from the selected plan instead of creating another transfer', async () => {
    const pricing = createPricing({ rayaOrder: order.externalReference });
    const catalog = pricing.loadCatalog();
    (await vi.waitFor(() => http.expectOne(api + 'plans/contextual'))).flush([plan]);
    await catalog;
    const methods = pricing.loadPaymentMethods();
    await loadRayaHistory();
    const lookup = api + 'transfers/' + order.externalReference;
    (await vi.waitFor(() => http.expectOne(lookup))).flush(order);
    await methods;

    pricing.closeTransfer();
    expect(pricing.transferOpen()).toBe(false);
    await pricing.choose();
    const resumed = pricing.beginTransfer();
    http.expectNone({ method: 'POST', url: api + 'transfers' });
    (await vi.waitFor(() => http.expectOne({ method: 'GET', url: lookup }))).flush(order);
    await resumed;
    expect(pricing.transferOpen()).toBe(true);
    expect(pricing.savedTransfer()).toBe(false);
  });

  it('orders every billing cycle by tier regardless of catalog order', async () => {
    const pricing = createPricing({});
    const pending = pricing.loadCatalog();
    (await vi.waitFor(() => http.expectOne(api + 'plans/contextual'))).flush([
      { ...plan, id: 18, tier: 'UNLIMITED' },
      { ...plan, id: 19, tier: 'PRO', days: 90 },
      plan,
      { ...plan, id: 20, tier: 'UNLIMITED', days: 90 },
      { ...plan, id: 21, tier: 'PRO' },
      { ...plan, id: 22, days: 90 },
    ]);
    await pending;
    expect(pricing.visiblePlans().map(({ id }) => id)).toEqual([17, 21, 18]);
    pricing.changeCycle(90);
    expect(pricing.visiblePlans().map(({ id }) => id)).toEqual([22, 19, 20]);
  });

  it('keeps verified quotas when Billing only sends legacy limits and shows the differences after retry', async () => {
    configurePricing({});
    const fixture = TestBed.createComponent(PricingComponent);
    fixture.detectChanges();
    const comparisonUrl = api + 'limits/doctorchart?view=comparison';
    const limits = {
      BASIC: { max_patients: 300, max_records_per_patient: 100 },
      PRO: { max_patients: 1000, max_records_per_patient: 1000 },
      UNLIMITED: { max_patients: -1, max_records_per_patient: -1 },
    };
    http.expectOne(comparisonUrl).flush(limits);
    (await vi.waitFor(() => http.expectOne(api + 'plans/contextual'))).flush([
      plan,
      { ...plan, id: 18, tier: 'PRO' },
      { ...plan, id: 19, tier: 'UNLIMITED' },
    ]);
    await loadRayaHistory();
    await fixture.whenStable();
    fixture.detectChanges();

    const page = fixture.nativeElement as HTMLElement;
    const benefits = Array.from(page.querySelectorAll('.plan-benefits'));
    expect(benefits.map(card => card.textContent)).toEqual([
      expect.stringContaining('300 pacientes'),
      expect.stringContaining('1.000 pacientes'),
      expect.stringContaining('Pacientes sin límite'),
    ]);
    expect(benefits.every(card => !card.textContent.includes('Agenda de turnos'))).toBe(true);
    const retry = page.querySelector<HTMLButtonElement>('.benefits-notice button')!;
    expect(retry).not.toBeNull();
    retry.click();

    const enabled = {
      appointments_enabled: true, max_appointments: -1,
      teleconsultation_enabled: true, secretary_management_enabled: true,
    };
    http.expectOne(comparisonUrl).flush({
      BASIC: {
        ...limits.BASIC, appointments_enabled: false, teleconsultation_enabled: false,
        online_booking_enabled: false, secretary_management_enabled: false,
      },
      PRO: { ...limits.PRO, ...enabled, online_booking_enabled: false, max_secretaries: 3 },
      UNLIMITED: { ...limits.UNLIMITED, ...enabled, online_booking_enabled: true, max_secretaries: -1 },
    });
    await fixture.whenStable();
    fixture.detectChanges();

    const status = (card: Element, label: string) => Array.from(card.querySelectorAll('li'))
      .find(row => row.textContent.includes(label))?.querySelector('[role="img"]')?.getAttribute('aria-label');
    expect(benefits.map(card => status(card, 'Agenda de turnos'))).toEqual(['No incluido', 'Incluido', 'Incluido']);
    expect(benefits.map(card => status(card, 'Reservas por internet'))).toEqual(['No incluido', 'No incluido', 'Incluido']);
    expect(benefits[1].textContent).toContain('3 asignaciones');
    expect(benefits[2].textContent).toContain('Asignaciones sin límite');
    expect(page.querySelector('.benefits-notice')).toBeNull();
  });

  it('recovers a stale return as history and starts a fresh transfer', async () => {
    const pricing = createPricing({ rayaOrder: order.externalReference });
    const catalog = pricing.loadCatalog();
    (await vi.waitFor(() => http.expectOne(api + 'plans/contextual'))).flush([plan]);
    await catalog;
    const methods = pricing.loadPaymentMethods();
    await loadRayaHistory();
    (await vi.waitFor(() => http.expectOne(api + 'transfers/' + order.externalReference)))
      .flush({ ...order, status: 'price_changed' });
    await methods;
    expect(pricing.transferOpen()).toBe(false);
    expect(pricing.transferResumable()).toBe(false);

    await pricing.choose();
    const next = pricing.beginTransfer();
    const creation = await vi.waitFor(() => http.expectOne({ method: 'POST', url: api + 'transfers' }));
    expect(creation.request.body).toEqual({ returnApp: 'doctorchart', planIds: [plan.id] });
    creation.flush({ ...order, externalReference: 'raya-new-price', amount: 1200 });
    await next;
    expect(pricing.transferOpen()).toBe(true);
  });
});
