import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { CalendarPageComponent } from '../calendar/calendar-page.component';
import { BookingsService } from '../calendar/bookings.service';
import { ClinicsService } from '../clinics/clinics.service';
import { SchedulesService } from '../schedules/schedules.service';
import { Assignment, StaffPermission, StaffService } from './staff.service';

const assignment: Assignment = {
  ownerId: 'doctor', accessId: 'access', clinicId: '1', clinicName: 'Consultorio',
  timezone: 'UTC', permissions: ['view', 'create', 'cancel', 'status', 'reschedule'], validUntil: '2099-01-01T00:00:00Z',
};
const start = '2030-01-07T09:00:00Z';
const booking = {
  id: '1', clinicId: '1', start, end: '2030-01-07T09:30:00Z', status: 'CONFIRMED', version: '1',
  contactName: 'Solicitante', contactPhone: '123', createdAt: '', updatedAt: '', specialtyContextId: '101',
};
const slot = { start, end: booking.end, specialtyContextId: '101' };
const availability = { days: [{ date: '2030-01-07', slots: [slot] }] };
const portal = { version: '1', questions: [] };

describe('Shared calendar for Secretaría', () => {
  const ownerCalls = vi.fn(() => { throw Error('Unexpected medical API'); });
  let api: Record<'assignments' | 'bookings' | 'availability' | 'bookingForm' | 'create' | 'reschedule' | 'status', ReturnType<typeof vi.fn>>;

  beforeEach(() => {
    api = {
      assignments: vi.fn().mockResolvedValue({items: [assignment]}),
      bookings: vi.fn().mockResolvedValue({items: [booking], hasMore: false}),
      availability: vi.fn().mockResolvedValue(availability),
      bookingForm: vi.fn().mockResolvedValue(portal),
      create: vi.fn(), reschedule: vi.fn(), status: vi.fn(),
    };
    TestBed.configureTestingModule({
      imports: [CalendarPageComponent],
      providers: [
        provideRouter([]),
        {provide: ActivatedRoute, useValue: {snapshot: {data: {staffAgenda: true}}, root: null}},
        {provide: StaffService, useValue: {...api, activationRecovery: signal('')}},
        {provide: AuthService, useValue: {currentUser: ownerCalls}},
        {provide: WorkspaceStore, useValue: {loadContexts: ownerCalls}},
        {provide: ClinicsService, useValue: {getCapabilities: ownerCalls, listClinics: ownerCalls}},
        {provide: BookingsService, useValue: {list: ownerCalls, get: ownerCalls, form: ownerCalls, create: ownerCalls}},
        {provide: SchedulesService, useValue: {availability: ownerCalls}},
      ],
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    ownerCalls.mockClear();
    document.defaultView?.localStorage?.removeItem('doctorchart.staff.lastAgenda');
  });

  async function open(permissions: StaffPermission[] = assignment.permissions) {
    api.assignments.mockResolvedValue({items: [{...assignment, permissions}]});
    const fixture = TestBed.createComponent(CalendarPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const component = fixture.componentInstance;
    component.changeDate('2030-01-07');
    await fixture.whenStable();
    fixture.detectChanges();
    return {fixture, component};
  }

  it('shares calendar and booking details while hiding writes and clinical links in read-only mode', async () => {
    const {fixture, component} = await open(['view']);
    expect(component.staff?.assignment()?.clinicId).toBe('1');
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('.day-header button').length).toBe(7);
    expect(element.querySelector('.manual-booking')).toBeNull();
    expect(element.querySelector<HTMLButtonElement>('.calendar-board .available-slot')?.disabled).toBe(true);
    expect(element.textContent).not.toContain('Gestionar consultorios');
    element.querySelector<HTMLButtonElement>('.calendar-board [data-booking-id="1"]')!.click();
    fixture.detectChanges();
    expect(element.querySelector('.editor')).not.toBeNull();
    expect(element.textContent).not.toMatch(/Abrir ficha|Reprogramar|Cancelar turno|Historial de modificaciones/);
    await component.status('CANCELLED');
    expect(api.status).not.toHaveBeenCalled();
    expect(ownerCalls).not.toHaveBeenCalled();
  });

  it('allows rescheduling without granting manual booking or status changes', async () => {
    const {fixture, component} = await open(['view', 'reschedule']);
    await component.openBooking(component.days()[0].bookings[0]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#booking-move')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.manual-form')).toBeNull();
    await component.beginMove();
    expect(component.targetSlots()[0].specialtyContextId).toBe('101');
    component.moveStart = start;
    api.reschedule.mockResolvedValue(booking);
    await component.move();
    expect(api.reschedule).toHaveBeenCalledOnce();
    expect(api.status).not.toHaveBeenCalled();
    expect(ownerCalls).not.toHaveBeenCalled();
  });

  it('keeps the shared manual draft after a conflict and prevents a second submission', async () => {
    const {component} = await open();
    component.openSlot(component.days()[0].slots[0]);
    await component.loadBookingForm();
    component.contactName = 'Solicitante';
    component.contactPhone = '+5491123456789';
    component.portalDraft = {document: '90000001', email: 'example@example.test', answers: {}};
    let reject!: (error: unknown) => void;
    api.create.mockReturnValue(new Promise((_, fail) => {reject = fail;}));
    const first = component.create();
    void component.create();
    expect(api.create).toHaveBeenCalledOnce();
    expect(api.create.mock.calls[0][1]).toMatchObject({specialtyContextId: '101'});
    reject({status: 409, error: {code: 'BOOKING_SLOT_UNAVAILABLE'}});
    await first;
    expect(component.contactName).toBe('Solicitante');
    expect(component.conflict()).toBe(true);
    expect(component.editorError()).toContain('se conservaron');
  });

  it('requires choosing a doctor and only opens a clinic assigned to that doctor', async () => {
    const first = {...assignment, doctorName: 'Dra. Álvarez'};
    const second = {...assignment, ownerId: 'other', accessId: 'other-access', clinicId: '2', clinicName: 'Norte', doctorName: 'Dr. Blanco'};
    const third = {...second, clinicId: '3', clinicName: 'Sur'};
    document.defaultView?.localStorage?.setItem('doctorchart.staff.lastAgenda', 'access|doctor|1');
    api.assignments.mockResolvedValue({items: [first, second, third]});
    const fixture = TestBed.createComponent(CalendarPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const component = fixture.componentInstance;
    const element = fixture.nativeElement as HTMLElement;
    const doctor = element.querySelector<HTMLSelectElement>('#staff-doctor')!;
    expect(doctor.value).toBe('');
    expect(api.bookings).not.toHaveBeenCalled();

    component.changeStaffDoctor(first.ownerId);
    await fixture.whenStable();
    expect(api.bookings.mock.lastCall?.[0]).toEqual(first);

    component.changeStaffDoctor(second.ownerId);
    await fixture.whenStable();
    fixture.detectChanges();
    const clinics = element.querySelector<HTMLSelectElement>('#staff-agenda-assignment')!;
    expect([...clinics.options].map(option => option.value)).toEqual(['', 'other|2', 'other|3']);
    expect(component.staff?.assignment()).toBeUndefined();
    expect(component.days()).toEqual([]);

    component.changeStaffAssignment('other|2');
    await fixture.whenStable();
    expect(api.bookings.mock.lastCall?.[0]).toEqual(second);

    api.assignments.mockResolvedValue({items: [first]});
    await component.load();
    expect(component.staff?.doctorId()).toBe('');
    expect(component.days()).toEqual([]);
    expect(api.bookings.mock.lastCall?.[0]).toEqual(second);
  });

  it('blocks expired access and ignores a late result from a different assignment', async () => {
    const {fixture, component} = await open();
    const second = {...assignment, clinicId: '2', clinicName: 'Otro consultorio'};
    api.assignments.mockResolvedValue({items: [assignment, second]});
    let resolve!: (value: typeof availability) => void;
    api.availability.mockReturnValueOnce(new Promise(done => {resolve = done;}))
      .mockResolvedValue({days: []});
    const pending = component.load();
    await Promise.resolve();
    component.changeStaffAssignment('doctor|2');
    await fixture.whenStable();
    resolve(availability);
    await pending;
    expect(component.staff?.assignment()?.clinicId).toBe('2');
    expect(component.days().every(day => !day.slots.length && !day.bookings.length)).toBe(true);
    component.staff!.assignments.set([{...second, validUntil: '2000-01-01T00:00:00Z'}]);
    expect(component.allowed()).toBe(false);
    expect(component.canBook()).toBe(false);
  });
});
