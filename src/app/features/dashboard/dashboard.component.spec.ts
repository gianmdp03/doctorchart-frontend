import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { clinicalFormFixture } from '../../core/models/clinical-form.fixture';
import { ClinicalEncounterDashboard } from '../../core/models/clinical-encounter.model';
import { AuthService } from '../../core/services/auth.service';
import { ClinicalContextService } from '../../core/services/clinical-context.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { UserClockService } from '../../core/services/user-clock.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { Booking } from '../calendar/bookings.models';
import { BookingsService } from '../calendar/bookings.service';
import { ClinicsService } from '../clinics/clinics.service';
import { DashboardComponent } from './dashboard.component';

const day = '2026-11-26';
const zone = 'America/Argentina/Buenos_Aires';
const encounter = (id: number, patientFullName: string, encounterLocalDate: string) => ({
  encounter: {
    ...clinicalFormFixture(),
    id,
    patientId: id,
    patientFullName,
    encounterDate: encounterLocalDate + 'T15:30:00Z',
    specialtyContextId: 101,
    specialtyId: 1,
    specialty: { id: 1, code: 'pediatrics', name: 'Pediatría', description: null },
    consultationType: 'FIRST_VISIT' as const,
  },
  patientAgeLabel: '',
  patientNationalId: null,
  encounterLocalDate,
});
const activity: ClinicalEncounterDashboard = {
  asOfDate: day,
  totalPatients: 230,
  encountersThisMonth: 12,
  encountersToday: 3,
  recentEncounters: [
    encounter(1, 'Paciente de hoy', day),
    encounter(2, 'Paciente anterior', '2026-11-25'),
  ],
  upcomingFollowUps: [],
  patientActivity: {
    monthlyPatients: [
      { month: '2026-09', patients: 8 },
      { month: '2026-10', patients: 5 },
      { month: '2026-11', patients: 9 },
    ],
    firstVisitsThisMonth: 4,
    withoutEncounters: 1,
    patientsWithoutEncounter: [{ patientId: 7, patientFullName: 'Ficha pendiente de consulta' }],
  },
};
const verifiedCapabilities = {
  entitlements: { status: 'VERIFIED', revision: 'fixture', validUntil: '2099-01-01T00:00:00Z', clinicManagement: true, max_clinics: 3 },
};
const booking = (id: string, overrides: Partial<Booking> = {}): Booking => ({
  id,
  clinicId: '1',
  specialtyContextId: '101',
  start: day + 'T13:00:00Z',
  end: day + 'T13:30:00Z',
  status: 'CONFIRMED',
  version: '1',
  contactName: 'Contacto',
  attendeeName: 'Paciente turno ' + id,
  contactPhone: '',
  createdAt: day,
  updatedAt: day,
  ...overrides,
});

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  const authUser = signal({ id: 'doctor-a' });
  const planTier = signal('PRO');
  const clockDay = signal(day);
  const clinicsEnabled = signal(true);
  const savedNotes = signal('Mis notas guardadas');
  const updateQuickNotes = vi.fn();
  const getDashboard = vi.fn();
  const getAll = vi.fn();
  const list = vi.fn();
  const getCapabilities = vi.fn();

  beforeEach(async () => {
    authUser.set({ id: 'doctor-a' });
    planTier.set('PRO');
    clockDay.set(day);
    savedNotes.set('Mis notas guardadas');
    clinicsEnabled.set(true);
    updateQuickNotes.mockReset().mockResolvedValue(undefined);
    getDashboard.mockReset().mockReturnValue(of(activity));
    getAll.mockReset();
    list.mockReset().mockReturnValue(of({ items: [], totalElements: 0 }));
    getCapabilities.mockReset().mockReturnValue(of(verifiedCapabilities));

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { currentUser: authUser, doctorchartPlanTier: planTier, userName: () => 'Dra. Sofía Mendoza' } },
        { provide: ClinicalEncounterService, useValue: { getDashboard, getAll } },
        { provide: BookingsService, useValue: { list } },
        { provide: ClinicsService, useValue: { getCapabilities } },
        { provide: UserClockService, useValue: { now: () => Date.parse(clockDay() + 'T16:00:00Z'), timeZone: () => zone, day: clockDay } },
        { provide: WorkspaceStore, useValue: { quickNotes: savedNotes, clinicsEnabled, hasReadyContext: () => true, updateQuickNotes } },
      ],
    }).compileComponents();
    TestBed.inject(ClinicalContextService).bind(101);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('uses the complete server counts and opens the correct history from today or recent activity', () => {
    const page = fixture.nativeElement as HTMLElement;
    expect(component.greeting()).toBe('Buenas tardes, Dra. Sofía Mendoza');
    expect([...page.querySelectorAll('.metric dd')].map(e => e.textContent?.trim())).toEqual(['3', '12', '230']);
    expect(page.querySelector('.activity-limit')?.textContent).toContain('1 de las 3');
    expect(page.querySelectorAll('.record-link')).toHaveLength(1);
    expect(page.querySelector('.record-link')?.getAttribute('href')).toBe('/patients/1?tab=history&specialtyContextId=101');
    expect(page.querySelector('a[href^="/encounters"]')).not.toBeNull();
    expect(page.querySelector('a[href="/patients"]')).toBeNull();
    expect(getAll).not.toHaveBeenCalled();
    page.querySelector<HTMLButtonElement>('[data-period="recent"]')!.click();
    fixture.detectChanges();
    expect(page.querySelectorAll('.record-link')).toHaveLength(2);
    expect(page.querySelector('.activity-list')?.textContent).toContain('25/11/2026');
  });

  it('reloads dashboard data on local day rollover and reuses the existing clinical change events', async () => {
    clockDay.set('2026-11-27');
    fixture.detectChanges();
    expect(getDashboard).toHaveBeenCalledTimes(2);
    await fixture.whenStable();
    expect(list).toHaveBeenLastCalledWith('2026-11-26T00:00:00Z', '2026-11-29T00:00:00Z', 0);
    window.dispatchEvent(new CustomEvent('patient-created'));
    expect(getDashboard).toHaveBeenCalledTimes(3);
  });

  it('replaces agenda with patients without consultations when the new plan denies access', async () => {
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('.agenda-card')).not.toBeNull();
    const requestedBookings = list.mock.calls.length;
    const requestedCapabilities = getCapabilities.mock.calls.length;
    planTier.set('BASIC');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(page.querySelector('.agenda-card')).toBeNull();
    expect(list).toHaveBeenCalledTimes(requestedBookings);
    expect(getCapabilities).toHaveBeenCalledTimes(requestedCapabilities);
    expect(page.querySelector('.patient-queue-link')?.getAttribute('href')).toBe('/patients/7?tab=history&specialtyContextId=101');
    expect([...page.querySelectorAll('.patient-month strong')].map(e => e.textContent?.trim())).toEqual(['8', '5', '9']);
    expect(page.querySelector('.first-visits-count')?.textContent).toContain('4 primeras consultas este mes');
    planTier.set('PRO');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(page.querySelector('.agenda-card')).not.toBeNull();
    expect(page.querySelector('.patient-queue-card')).toBeNull();
  });

  it('uses the clinical summary when the server denies calendar access for a non-Basic plan', async () => {
    const requestedBookings = list.mock.calls.length;
    getCapabilities.mockReturnValueOnce(of({ entitlements: { status: 'DENIED' } }));
    await component.loadAgenda();
    fixture.detectChanges();
    expect(component.calendarAvailable()).toBe(false);
    expect(list).toHaveBeenCalledTimes(requestedBookings);
    expect(fixture.nativeElement.querySelector('.patient-queue-card')).not.toBeNull();
  });

  it('shows an activity failure without interpreting it as zero and leaves notes usable', () => {
    getDashboard.mockReturnValueOnce(throwError(() => ({ status: 503 })));
    component.loadActivity();
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('[role="alert"]')?.textContent).toContain('No se pudieron cargar');
    expect([...page.querySelectorAll('.metric dd')].map(e => e.textContent?.trim())).toEqual(['—', '—', '—']);
    expect(page.querySelector<HTMLTextAreaElement>('textarea')?.value).toBe('Mis notas guardadas');
    page.querySelector<HTMLButtonElement>('[role="alert"] button')!.click();
    expect(component.activityError()).toBe(false);
  });

  it('cancels superseded and cross-account activity reads', () => {
    const old = new Subject<ClinicalEncounterDashboard>();
    const latest = new Subject<ClinicalEncounterDashboard>();
    getDashboard.mockReturnValueOnce(old).mockReturnValueOnce(latest);
    component.loadActivity();
    component.loadActivity();
    expect(old.observed).toBe(false);
    authUser.set({ id: 'doctor-b' });
    latest.next(activity);
    expect(component.activity()).toBeNull();
    fixture.detectChanges();
    expect(latest.observed).toBe(false);
  });

  it('paginates bookings, scopes to the local date and specialty, and interprets active statuses', async () => {
    const present = booking('present', {
      start: '2026-11-27T01:00:00Z',
      status: 'CHECKED_IN',
      clinicSnapshot: { modality: 'TELECONSULTATION', name: '', address: '', publicAddress: '', timezone: zone },
    });
    list.mockReturnValueOnce(of({
      totalElements: 7,
      items: [
        booking('awaiting', { rescheduleResponse: 'AWAITING_PATIENT' }),
        booking('other', { specialtyContextId: '202' }),
        booking('previous', { start: day + 'T01:00:00Z' }),
        booking('cancelled', { status: 'CANCELLED' }),
      ],
    })).mockReturnValueOnce(of({
      totalElements: 7,
      items: [present, booking('completed', { status: 'COMPLETED' }), booking('absent', { status: 'NO_SHOW' })],
    }));
    await component.loadAgenda();
    fixture.detectChanges();
    const agenda = component.agenda();
    expect(list).toHaveBeenLastCalledWith('2026-11-25T00:00:00Z', '2026-11-28T00:00:00Z', 1);
    expect(agenda).toMatchObject({ pending: 1, present: 1, completed: 1 });
    expect(agenda.rows).toMatchObject([
      { id: 'present', time: '22:00', status: 'Presente', place: 'Teleconsulta' },
      { id: 'awaiting', time: '10:00', status: 'En espera del paciente' },
    ]);
  });

  it('discards bookings from a previous specialty and hides a disabled calendar', async () => {
    const pending = new Subject();
    list.mockReturnValueOnce(pending);
    const request = component.loadAgenda();
    await Promise.resolve();
    expect(pending.observed).toBe(true);
    TestBed.inject(ClinicalContextService).bind(202);
    pending.next({ items: [booking('private')], totalElements: 1 });
    await request;
    expect(component.agenda().rows).toEqual([]);
    clinicsEnabled.set(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.agenda-card')).toBeNull();
  });

  it('handles a booking read error independently and lets the clinician retry', async () => {
    list.mockReturnValueOnce(throwError(() => ({ status: 503 })));
    await component.loadAgenda();
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('.agenda-card [role="alert"]');
    expect(error.textContent).toContain('No se pudieron cargar los turnos');
    expect(component.activity()?.encountersToday).toBe(3);
    error.querySelector('button').click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.agendaError()).toBe(false);
    expect(fixture.nativeElement.querySelector('.agenda-card').textContent).toContain('No hay turnos activos');
  });

  it('loads the new specialty note and ignores a late save from the previous specialty', async () => {
    let finish!: () => void;
    updateQuickNotes.mockImplementationOnce(() => new Promise<void>(resolve => finish = resolve));
    component.onNotesInput('Borrador de Pediatría');
    const saving = component.saveNotes();
    TestBed.inject(ClinicalContextService).bind(202);
    savedNotes.set('Nota de Medicina General');
    fixture.detectChanges();
    finish();
    await saving;
    expect(component.quickNotes()).toBe('Nota de Medicina General');
    expect(component.isNotesDirty()).toBe(false);
    expect(component.isNotesSaved()).toBe(false);
  });

  it('keeps edits typed during an earlier save', async () => {
    let finish!: () => void;
    updateQuickNotes.mockImplementationOnce(() => new Promise<void>(resolve => finish = resolve));
    component.onNotesInput('Primera versión');
    const saving = component.saveNotes();
    component.onNotesInput('Segunda versión');
    finish();
    await saving;
    expect(updateQuickNotes).toHaveBeenCalledWith('Primera versión');
    expect(component.isNotesDirty()).toBe(true);
    expect(component.isNotesSaved()).toBe(false);
  });

  it('shows a failed notes save and keeps the draft for a successful retry', async () => {
    updateQuickNotes.mockRejectedValueOnce(new Error('offline'));
    component.onNotesInput('Borrador conservado');
    const save = () => fixture.nativeElement.querySelector('.save-notes-button').click();
    fixture.detectChanges();
    save();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.notes-widget-body [role="alert"]').textContent).toContain('No pudimos confirmar');
    expect(component.quickNotes()).toBe('Borrador conservado');
    save();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.isNotesSaved()).toBe(true);
    expect(component.notesError()).toBeNull();
  });
});
