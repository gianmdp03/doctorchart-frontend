import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import { PricingComponent } from './pricing.component';

class PricingHarness extends PricingComponent {
  loadCatalog = () => this.load();
  loadPaymentMethods = () => this.loadTransfers();
  availablePlans = this.plans;
  choose = () => this.select(this.availablePlans()[0]!);
  beginTransfer = () => this.startTransfer();
  recoverTransfer = () => this.startTransfer(true);
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

  function createPricing(query: Record<string, string>) {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), provideHttpClientTesting(),
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
});
