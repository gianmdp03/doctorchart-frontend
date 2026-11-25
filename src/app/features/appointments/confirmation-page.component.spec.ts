import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ConfirmationPageComponent } from './confirmation-page.component';
import { AppointmentsService } from './appointments.service';
import type { PortalBooking } from './appointments.models';
import { authInterceptor } from '../../core/interceptors/auth.interceptor';
import { timeZoneInterceptor } from '../../core/interceptors/time-zone.interceptor';
import { AuthService } from '../../core/services/auth.service';
import type { PortalBooking } from './appointments.models';

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
    await vi.waitFor(() => expect(page.feedback()).toBe('El turno se canceló.'));
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

  it('opens a proposal from the email and confirms it only after an explicit patient action', async () => {
    const reference = '22222222-2222-4222-8222-222222222222';
    const original = window.location.href;
    window.history.replaceState(null, '', '#action=confirm&reference=' + reference + '&version=2');
    try {
      const fixture = TestBed.createComponent(ConfirmationPageComponent);
      const http = TestBed.inject(HttpTestingController);
      const proposed: PortalBooking = {...booking, reference, version:'2', rescheduleProposalVersion:'2',
        rescheduleResponse:'AWAITING_PATIENT', address:'', publicDoctorId:null, publicClinicId:null, specialtyContextId:'101'};
      const list = http.expectOne(req => req.url.endsWith('/my-bookings'));
      expect(list.request.body.focusReference).toBe(reference);
      list.flush({items:[proposed],hasMore:false});
      await fixture.whenStable();
      fixture.detectChanges();
      http.expectNone(req => req.url.endsWith('/my-bookings/change'));
      expect(fixture.nativeElement.textContent).toContain('Esperando tu confirmación');

      const pending = fixture.componentInstance.acceptProposal(proposed);
      const request = http.expectOne(req => req.url.endsWith('/my-bookings/change'));
      expect(request.request.body).toEqual({reference, expectedVersion:'2', action:'confirm'});
      expect(request.request.withCredentials).toBe(true);
      request.flush({rescheduleResponse:'PATIENT_ACCEPTED'});
      await vi.waitFor(() => expect(fixture.componentInstance.feedback()).toContain('Confirmaste el nuevo horario'));
      http.expectOne(req => req.url.endsWith('/my-bookings')).flush({items:[{...proposed, version:'3', rescheduleResponse:'PATIENT_ACCEPTED'}],hasMore:false});
      await pending;
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain('Confirmaste el nuevo horario');
      expect(fixture.nativeElement.textContent).not.toContain('Esperando tu confirmación');
    } finally {
      window.history.replaceState(null, '', original);
    }
  });

  it('lets a verified patient book a free time directly from the alternate-date link', async () => {
    const reference = '22222222-2222-4222-8222-222222222222';
    const original = window.location.href;
    window.history.replaceState(null, '', '#action=reschedule&reference=' + reference + '&version=2');
    try {
      const fixture = TestBed.createComponent(ConfirmationPageComponent);
      const http = TestBed.inject(HttpTestingController);
      http.expectOne(req => req.url.endsWith('/my-bookings')).flush({items:[{
        ...booking, reference, version:'2', rescheduleProposalVersion:'2', rescheduleResponse:'AWAITING_PATIENT',
        publicDoctorId:'doctor', publicClinicId:'clinic', specialtyContextId:'101',
      }],hasMore:false});
      await vi.waitFor(() => expect(fixture.componentInstance.loadingSlots()).toBe(true));
      const start = '2030-01-01T11:00:00Z', end = '2030-01-01T11:30:00Z';
      http.expectOne(req => req.url.endsWith('/availability')).flush({days:[{date:'2030-01-01',slots:[{start,end}]}]});
      await vi.waitFor(() => expect(fixture.componentInstance.busy()).toBe(false));
      await fixture.whenStable();
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain('Reprogramar turno');
      http.expectNone(req => req.url.endsWith('/my-bookings/change'));
      const page = fixture.componentInstance;
      page.start = start;
      page.changeReason = 'No puedo en el horario anterior';
      const pending = page.confirmChange();
      const request = http.expectOne(req => req.url.endsWith('/my-bookings/change'));
      expect(request.request.body).toEqual({reference, expectedVersion:'2', action:'reschedule', start, reason:page.changeReason});
      request.flush({status:'CONFIRMED',start,end});
      await vi.waitFor(() => expect(page.feedback()).toBe('El turno se reprogramó.'));
      http.expectOne(req => req.url.endsWith('/my-bookings')).flush({items:[{...booking, reference, version:'3', start, end}],hasMore:false});
      await pending;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.constancia .status').textContent.trim()).toBe('Confirmado');
    } finally {
      window.history.replaceState(null, '', original);
    }
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

  it('sorts and counts real reservations, preserving cancellation and actual attendance states', () => {
    TestBed.inject(AppointmentsService).setPortalDraft(draft);
    const fixture = TestBed.createComponent(ConfirmationPageComponent);
    const page = fixture.componentInstance;
    const items = [
      {...booking, reference:'later', start:'2031-01-01T10:00:00Z'},
      {...booking, reference:'cancelled', status:'CANCELLED'},
      {...booking, reference:'past-old', start:'2020-01-01T10:00:00Z'},
      {...booking, reference:'next'},
      {...booking, reference:'past-recent', start:'2021-01-01T10:00:00Z'},
    ] as PortalBooking[];
    page.items.set(items);
    page.step.set('list');
    fixture.detectChanges();
    expect(page.groups().map(group => group.items.map(item => item.reference)))
      .toEqual([['next','later'],['past-recent','past-old'],['cancelled']]);
    expect(page.nextBooking()?.reference).toBe('next');
    const past = fixture.nativeElement.querySelector('#booking-past-old');
    expect(past.textContent).toContain('Confirmado');
    expect(past.textContent).not.toContain('Atendido');
    expect(past.textContent).toContain(page.pastMessage);
    expect(past.querySelector('button').disabled).toBe(true);
    expect(fixture.nativeElement.querySelector('#booking-cancelled button').disabled).toBe(true);
  });

  it('blocks expired previews and programmatic detail and mutation actions', async () => {
    TestBed.inject(AppointmentsService).setPortalDraft(draft);
    const fixture = TestBed.createComponent(ConfirmationPageComponent);
    const page = fixture.componentInstance;
    const past = {...booking, start:'2020-01-01T10:00:00Z'} as PortalBooking;
    const preview = {reference:'ref', date:'2020-01-01', canAccess:true, canChange:true, canReschedule:true};
    page.previews.set([preview]);
    page.step.set('preview');
    await page.selectPreview(preview);
    await page.selectPreview(preview, 'cancel');
    await page.requestCode('ref');
    page.toggleDetails(past);
    page.chooseChange(past, 'cancel');
    expect(page.expanded()).toBeNull();
    expect(page.change()).toBeNull();
    page.change.set({booking:past, action:'cancel'});
    page.changeReason = 'Un motivo';
    await page.confirmChange();
    TestBed.inject(HttpTestingController).expectNone(() => true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.appointment-card button').disabled).toBe(true);
    expect(fixture.nativeElement.querySelector('.booking-details')).toBeNull();
  });

  it('removes open details and cancellation controls when the start time passes', () => {
    TestBed.inject(AppointmentsService).setPortalDraft(draft);
    const fixture = TestBed.createComponent(ConfirmationPageComponent);
    const page = fixture.componentInstance;
    const current = {...booking, start:new Date(Date.now() + 60_000).toISOString()} as PortalBooking;
    page.items.set([current, {...booking,reference:'another'} as PortalBooking]);
    page.step.set('list');
    page.toggleDetails(current);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.booking-details')).toBeTruthy();
    page.chooseChange(current, 'cancel');
    current.start = new Date(Date.now() - 1000).toISOString();
    page.now.update(time => time + 60_000);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.booking-details')).toBeNull();
    expect(fixture.nativeElement.querySelector('.change-panel')).toBeNull();
    expect(page.change()).toBeNull();
    expect(page.expanded()).toBeNull();
    expect(fixture.nativeElement.querySelector('#booking-ref button').disabled).toBe(true);
    const otherButtons = Array.from(fixture.nativeElement.querySelectorAll('#booking-another button')) as HTMLButtonElement[];
    expect(otherButtons.some(button => button.textContent?.includes('Cancelar turno') && !button.disabled)).toBe(true);
  });

  it('shows an empty state and handles missing dates without rendering exceptions', () => {
    TestBed.inject(AppointmentsService).setPortalDraft(draft);
    const fixture = TestBed.createComponent(ConfirmationPageComponent);
    const page = fixture.componentInstance;
    page.step.set('list');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.empty-state a').getAttribute('href')).toBe('/appointments');
    page.items.set([{...booking, start:'', end:'', doctorName:'', clinicName:''} as PortalBooking]);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Fecha no disponible');
    expect(fixture.nativeElement.querySelector('.appointment-card button').disabled).toBe(true);
  });
});
