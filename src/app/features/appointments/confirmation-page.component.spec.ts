import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ConfirmationPageComponent } from './confirmation-page.component';
import { AppointmentsService } from './appointments.service';
import { authInterceptor } from '../../core/interceptors/auth.interceptor';
import { timeZoneInterceptor } from '../../core/interceptors/time-zone.interceptor';
import { AuthService } from '../../core/services/auth.service';

const draft = {document:'12345678', reference:'ref', maskedEmail:'tes***@example.invalid', requestId:'request-id'};
const booking = {reference:'ref', status:'CONFIRMED', start:'2030-01-01T10:00:00Z', end:'2030-01-01T10:30:00Z', doctorName:'Profesional', clinicName:'Consultorio', timezone:'UTC', version:'1', canChange:true};

describe('Mis turnos', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[ConfirmationPageComponent],
    providers:[provideRouter([]), provideHttpClient(withInterceptors([authInterceptor,timeZoneInterceptor])),
      provideHttpClientTesting(), {provide:AuthService,useValue:{getAccessToken:() => {throw Error('Unexpected medical identity');}}}],
  }));
  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('lists reservations and submits a versioned cancellation only after verifying the email code', async () => {
    TestBed.inject(AppointmentsService).setPortalDraft(draft);
    const fixture = TestBed.createComponent(ConfirmationPageComponent);
    const page = fixture.componentInstance;
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Ingresá el código');
    const input = fixture.nativeElement.querySelector('#confirmation-code') as HTMLInputElement;
    expect(input.autocomplete).toBe('one-time-code');
    expect(input.maxLength).toBe(6);
    expect(fixture.nativeElement.querySelectorAll('.code-cells span').length).toBe(6);
    expect(fixture.nativeElement.textContent).toContain(draft.maskedEmail);
    expect(page.items()).toEqual([]);
    page.code = '012345';
    const pending = page.verifyCode();
    void page.verifyCode();
    const proof = http.expectOne(req => req.url.endsWith('/access/verify'));
    expect(proof.request.body).toEqual({document:draft.document, reference:draft.reference, requestId:draft.requestId, code:'012345'});
    expect(proof.request.params.keys()).toEqual([]);
    expect(proof.request.headers.has('Authorization')).toBe(false);
    expect(proof.request.transferCache).toBe(false);
    expect(proof.request.withCredentials).toBe(true);
    proof.flush(null, {status:204,statusText:'No Content'});
    await Promise.resolve();
    http.expectOne(req => req.url.endsWith('/my-bookings')).flush({items:[booking], hasMore:false});
    await pending;
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Profesional');
    expect(page.code).toBe('');
    page.chooseChange(page.items()[0], 'cancel');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#portal-change-reason')).toBeTruthy();
    await page.confirmChange();
    http.expectNone(req => req.url.endsWith('/my-bookings/change'));
    page.changeReason = 'No voy a poder asistir.';
    const change = page.confirmChange();
    const update = http.expectOne(req => req.url.endsWith('/my-bookings/change'));
    expect(update.request.body).toEqual({reference:'ref', action:'cancel', expectedVersion:'1', reason:'No voy a poder asistir.'});
    expect(update.request.withCredentials).toBe(true);
    expect(update.request.headers.get('Idempotency-Key')).toBeTruthy();
    update.flush({});
    await Promise.resolve();
    http.expectOne(req => req.url.endsWith('/my-bookings')).flush({items:[{...booking, status:'CANCELLED', canChange:false}], hasMore:false});
    await change;
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('El turno se canceló.');
    const closed = page.endSession();
    http.expectOne(req => req.url.endsWith('/my-bookings/logout')).flush(null,{status:204,statusText:'No Content'});
    await closed;
    expect(page.items()).toEqual([]);
    expect(page.document).toBe('');
  });

  it('restores the browser session without collecting identity again', async () => {
    const fixture = TestBed.createComponent(ConfirmationPageComponent);
    const page = fixture.componentInstance;
    const http = TestBed.inject(HttpTestingController);
    const list = http.expectOne(req => req.url.endsWith('/my-bookings'));
    expect(list.request.withCredentials).toBe(true);
    expect(list.request.body).toEqual({offset:0});
    list.flush({items:[booking],hasMore:false});
    await fixture.whenStable();
    fixture.detectChanges();
    expect(page.step()).toBe('list');
    expect(fixture.nativeElement.textContent).toContain('Profesional');
  });

  it('keeps the list private when the email code is rejected', async () => {
    TestBed.inject(AppointmentsService).setPortalDraft(draft);
    const page = TestBed.createComponent(ConfirmationPageComponent).componentInstance;
    const http = TestBed.inject(HttpTestingController);
    page.code = '123456';
    const pending = page.verifyCode();
    http.expectOne(req => req.url.endsWith('/access/verify')).flush(
      {code:'BOOKING_ACCESS_DENIED', message:'El código no es válido o venció.'}, {status:403, statusText:'Forbidden'});
    await pending;
    http.expectNone(req => req.url.endsWith('/my-bookings'));
    expect(page.step()).toBe('code');
    expect(page.items()).toEqual([]);
    expect(page.error()).toContain('venció');
  });

  it('shows the reason immediately when the patient chooses a change before verifying access', async () => {
    TestBed.inject(AppointmentsService).setPortalDraft(draft);
    const fixture = TestBed.createComponent(ConfirmationPageComponent);
    const page = fixture.componentInstance;
    const preview = {reference:'ref',date:'2030-01-01',canAccess:false,canChange:true,canReschedule:true};
    page.previews.set([preview]);
    page.changeIdentity();
    page.selectPreview(preview, 'reschedule');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('label[for="portal-change-reason"]').textContent).toContain('Motivo de la reprogramación');
    expect(fixture.nativeElement.querySelector('.preview-change button').disabled).toBe(true);
    TestBed.inject(HttpTestingController).expectNone(req => req.url.endsWith('/access/request'));
  });
});
