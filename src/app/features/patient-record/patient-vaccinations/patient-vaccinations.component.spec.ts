import { AuthService } from '../../../core/services/auth.service';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { of, Subject, throwError } from 'rxjs';
import { PatientVaccinationsComponent } from './patient-vaccinations.component';
import { PatientService } from '../../../core/services/patient.service';
import { PatientVaccinationService } from '../../../core/services/patient-vaccination.service';
import {
  PatientVaccinationSchedule,
  SavedPatientVaccination,
  PatientVaccinationDose,
} from '../../../core/models/vaccination.model';
import { dialogPatient } from '../../dynamic-form-renderer/clinical-dialog.fixture';
import { DatePickerComponent } from '../../../shared/date-picker/date-picker.component';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
@Component({
  imports: [PatientVaccinationsComponent],
  template:
    '@if (show()) { <app-patient-vaccinations [patient]="patient()" (patientUpdated)="patient.set($event)" /> }',
})
class Host {
  readonly show = signal(true);
  readonly patient = signal(dialogPatient());
}
describe('Patient vaccination backend schedule and revision handoff', () => {
  let fixture: ComponentFixture<Host>, host: Host, api: any, patients: any;
  const applied = new Map<string, string>();
  const definitions: PatientVaccinationDose[] = [
    {
      id: 'dose-opaque-1',
      calendarId: 'calendar-test',
      vaccineId: 'bcg',
      vaccineName: 'Vacuna de prueba',
      doseLabel: 'Única',
      dueFrom: 0,
      dueTo: 0,
      dueAgeLabel: '0 meses',
      status: 'PENDIENTE',
      appliedAt: null,
    },
    {
      id: 'dose-opaque-2',
      calendarId: 'calendar-test',
      vaccineId: 'other',
      vaccineName: 'Vacuna actual',
      doseLabel: 'Segunda',
      dueFrom: 3,
      dueTo: 3,
      dueAgeLabel: '3 meses',
      status: 'ACTUAL',
      appliedAt: null,
    },
    {
      id: 'dose-opaque-3',
      calendarId: 'calendar-test',
      vaccineId: 'future',
      vaccineName: 'Vacuna futura',
      doseLabel: 'Refuerzo',
      dueFrom: 12,
      dueTo: 12,
      dueAgeLabel: '12 meses',
      status: 'FUTURA',
      appliedAt: null,
    },
  ];
  const schedule = (id = 22, version = 3): PatientVaccinationSchedule => ({
    patientId: id,
    patientVersion: version,
    calendarId: 'calendar-test',
    asOfDate: '2026-10-05',
    ageInMonths: 3,
    ageLabel: '3 meses',
    doses: definitions.map((d) => ({
      ...d,
      ...(applied.has(d.id) ? { status: 'APLICADA' as const, appliedAt: applied.get(d.id)! } : {}),
    })),
  });
  const child = () =>
    fixture.debugElement.query(By.directive(PatientVaccinationsComponent))
      .componentInstance as PatientVaccinationsComponent;
  const saved = (id = 22, version = 4): SavedPatientVaccination => ({
    patient: { ...dialogPatient(), id, version },
    schedule: schedule(id, version),
  });
  beforeEach(async () => {
    applied.clear();
    api = {
      schedule: vi.fn().mockImplementation((id) => of(schedule(id, host.patient().version))),
      save: vi.fn().mockImplementation((id, dose, body) => {
        if (body.applied) applied.set(dose, body.appliedAt ?? applied.get(dose) ?? '2026-10-05');
        else applied.delete(dose);
        return of(saved(id, body.expectedVersion + 1));
      }),
    };
    patients = { getPatientById: vi.fn().mockImplementation(() => of(host.patient())) };
    await TestBed.configureTestingModule({
      imports: [Host],
      providers: [
        { provide: AuthService, useValue: { currentUser: signal({ id: 'doctor-a' }) } },
        { provide: PatientVaccinationService, useValue: api },
        { provide: PatientService, useValue: patients },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Host);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('uses backend age, status, labels, order and opaque IDs without parsing birth or calendar columns', () => {
    expect(api.schedule).toHaveBeenCalledWith(22);
    expect(child().ageLabel()).toBe('3 meses');
    expect(
      child()
        .overdueDoses()
        .map((d) => d.id),
    ).toEqual(['dose-opaque-1']);
    expect(child().currentDoses()).toHaveLength(1);
    expect(child().futureDoses()).toHaveLength(1);
    expect(fixture.nativeElement.textContent).toContain('3 meses');
    expect(fixture.nativeElement.querySelector('input[type="date"]')).toBeNull();
  });
  it('shows current and missing doses before future age stages, sorting numeric ages without changing server status', () => {
    const c = child();
    const future = definitions[2];
    c.schedule.set({...schedule(), doses:[
      {...future,id:'late',dueFrom:120,dueTo:120,dueAgeLabel:'10 años'},
      definitions[0], definitions[1],
      {...future,id:'second',dueFrom:24,dueTo:24,dueAgeLabel:'2 años'},
      {...future,id:'early-a',dueFrom:12,dueTo:12,dueAgeLabel:'12 meses'},
      {...future,id:'early-b',dueFrom:12,dueTo:12,dueAgeLabel:'12 meses'},
    ]});
    fixture.detectChanges();
    expect(c.futureStages().map(stage => stage.doses.map(dose => dose.id)))
      .toEqual([['early-a','early-b'],['second'],['late']]);
    expect(Array.from(fixture.nativeElement.querySelectorAll('.dose-group h3')).map((heading:any) => heading.id))
      .toEqual(['vaccines-current','vaccines-overdue','vaccines-future','vaccines-applied']);
    expect(fixture.nativeElement.querySelector('details.future-doses')).toBeNull();
    expect(fixture.nativeElement.querySelector('.stage-heading').textContent).toContain('Próxima etapa');
    expect(c.overdueDoses()[0].status).toBe('PENDIENTE');
    expect(api.save).not.toHaveBeenCalled();
  });
  it('displays a confirmed application date separately from its accessible date editor', () => {
    const c = child();
    c.markApplied(c.doses()[0], true);
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('.applied-card');
    expect(card.querySelector('.applied-date > span').textContent).toBe('Aplicada el');
    expect(card.querySelector('time').textContent).toBe('05/10/2026');
    expect(card.querySelector('time').getAttribute('datetime')).toBe('2026-10-05');
    expect(card.querySelector('.date-editor').open).toBe(false);
    expect(card.querySelector('summary').textContent).toContain('Corregir fecha');
    expect(c.displayDate(null)).toBe('Sin fecha registrada');
    expect(c.displayDate('2026-02-31')).toBe('Sin fecha registrada');
  });
  it('exports the rendered component for optional visual review', () => {
    const directory = process.env['VACCINE_VISUAL_DIR'];
    if (!directory) return;
    const c = child();
    const applied = {...definitions[0],id:'applied',vaccineName:'Vacuna aplicada de prueba',status:'APLICADA' as const,appliedAt:'2026-09-21'};
    c.schedule.set({...schedule(), doses:[...definitions,applied,
      {...definitions[2],id:'future-two',vaccineName:'Otra vacuna de prueba',dueFrom:24,dueTo:24,dueAgeLabel:'2 años'},
    ]});
    fixture.detectChanges();
    mkdirSync(directory, {recursive:true});
    const styles = resolve('dist/doctorchart-frontend/browser/styles.css').replaceAll('\\','/');
    const clone = fixture.nativeElement.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('.applied-card input[type="checkbox"]').forEach(input => input.setAttribute('checked',''));
    writeFileSync(join(directory,'vaccines.html'), `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="file:///${styles}">${document.head.innerHTML}<style>body{margin:0;padding:24px;background:var(--dc-canvas)}app-patient-vaccinations{max-width:1440px;margin:auto}@media(max-width:600px){body{padding:12px}}</style></head><body>${clone.outerHTML}</body></html>`);
    expect(c.futureStages()).toHaveLength(2);
  });
  it('publishes the saved patient revision and reloads saved applications when reopening the tab', () => {
    let c = child();
    c.markApplied(c.doses()[0], true);
    fixture.detectChanges();
    expect(api.save).toHaveBeenCalledWith(22, 'dose-opaque-1', {
      expectedVersion: 3,
      calendarId: 'calendar-test',
      applied: true,
    });
    expect(host.patient().version).toBe(4);
    expect(c.appliedDoses()).toHaveLength(1);
    host.show.set(false);
    fixture.detectChanges();
    host.show.set(true);
    fixture.detectChanges();
    c = child();
    expect(c.appliedDoses()).toHaveLength(1);
    c.updateDate(c.appliedDoses()[0], '2025-01-01');
    fixture.detectChanges();
    expect(api.save).toHaveBeenLastCalledWith(22, 'dose-opaque-1', {
      expectedVersion: 4,
      calendarId: 'calendar-test',
      applied: true,
      appliedAt: '2025-01-01',
    });
    expect(host.patient().version).toBe(5);
    expect(fixture.nativeElement.querySelector('app-date-picker')).toBeTruthy();
  });
  it('removes the selected application without replacing other records', () => {
    child().markApplied(child().doses()[0], true);
    fixture.detectChanges();
    child().markApplied(child().doses()[1], true);
    fixture.detectChanges();
    const dose = child().appliedDoses()[0];
    child().markApplied(dose, false);
    expect(api.save).toHaveBeenCalledTimes(2);
    child().annulVaccination('Registro duplicado');
    fixture.detectChanges();
    expect(api.save).toHaveBeenLastCalledWith(22, dose.id, {
      expectedVersion: 5,
      calendarId: 'calendar-test',
      applied: false,
      reason: 'Registro duplicado',
    });
    expect(child().appliedDoses()).toHaveLength(1);
    expect(child().appliedDoses()[0].id).toBe('dose-opaque-2');
  });
  it('edits a recorded dose using its original calendar version', () => {
    const c = child(),
      current = c.schedule()!;
    c.schedule.set({
      ...current,
      doses: [
        {
          ...current.doses[0],
          calendarId: 'earlier-release',
          status: 'APLICADA',
          appliedAt: '2026-08-05',
        },
      ],
    });
    c.updateDate(c.appliedDoses()[0], '2026-08-06');
    expect(api.save).toHaveBeenCalledWith(22, 'dose-opaque-1', {
      expectedVersion: 3,
      calendarId: 'earlier-release',
      applied: true,
      appliedAt: '2026-08-06',
    });
  });
  it('keeps server-confirmed status after a failed write and supports retry', () => {
    api.save.mockReturnValueOnce(throwError(() => ({ status: 500 })));
    const checkbox = fixture.nativeElement.querySelector('.pending-card input');
    checkbox.click();
    fixture.detectChanges();
    expect(child().appliedDoses()).toEqual([]);
    expect(checkbox.checked).toBe(false);
    expect(child().saveError()).toContain('No se pudo guardar');
    expect(host.patient().version).toBe(3);
    child().refresh();
    fixture.detectChanges();
    child().markApplied(child().doses()[0], true);
    fixture.detectChanges();
    expect(child().appliedDoses()).toHaveLength(1);
  });
  it('restores the confirmed date in the shared picker when saving fails', async () => {
    child().markApplied(child().doses()[0], true);
    fixture.detectChanges();
    await fixture.whenStable();
    const picker = fixture.debugElement.query(By.directive(DatePickerComponent))
      .componentInstance as DatePickerComponent;
    api.save.mockReturnValueOnce(throwError(() => ({ status: 400 })));
    picker.selectDate(new Date(2026, 7, 6));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(child().appliedDoses()[0].appliedAt).toBe('2026-10-05');
    expect(picker.selectedDate()).toEqual(new Date(2026, 9, 5));
    expect(host.patient().version).toBe(4);
  });
  it('blocks a second write while saving and rejects replies for a different patient', () => {
    const pending = new Subject<SavedPatientVaccination>();
    api.save.mockReturnValueOnce(pending);
    const c = child(),
      dose = c.doses()[0];
    c.markApplied(dose, true);
    c.markApplied(dose, false);
    expect(api.save).toHaveBeenCalledTimes(1);
    pending.next(saved(99));
    expect(host.patient().id).toBe(22);
    expect(host.patient().version).toBe(3);
    expect(c.isSaving()).toBe(false);
    expect(c.saveError()).toContain('no corresponde');
  });
  it('cancels writes when another patient is selected and does not publish late replies', () => {
    const pending = new Subject<SavedPatientVaccination>();
    api.save.mockReturnValueOnce(pending);
    child().markApplied(child().doses()[0], true);
    host.patient.set({ ...dialogPatient(), id: 99 });
    fixture.detectChanges();
    expect(pending.observed).toBe(false);
    pending.next(saved());
    expect(host.patient().id).toBe(99);
  });
  it('ignores replies after the vaccination tab is destroyed', () => {
    const pending = new Subject<SavedPatientVaccination>();
    api.save.mockReturnValueOnce(pending);
    child().markApplied(child().doses()[0], true);
    host.show.set(false);
    fixture.detectChanges();
    expect(pending.observed).toBe(false);
    pending.next(saved());
    expect(host.patient().version).toBe(3);
  });
  it('suppresses old account responses before effects run and cancels the request', () => {
    const pending = new Subject<SavedPatientVaccination>();
    api.save.mockReturnValueOnce(pending);
    const c = child();
    c.markApplied(c.doses()[0], true);
    TestBed.inject(AuthService).currentUser.set({ id: 'doctor-b' } as any);
    pending.next(saved(22, 99));
    expect(host.patient().version).toBe(3);
    fixture.detectChanges();
    expect(pending.observed).toBe(false);
    expect(c.isSaving()).toBe(false);
  });
  it('ignores reads from a previous context and wrong patient schedules', () => {
    const pending = new Subject<PatientVaccinationSchedule>();
    api.schedule.mockReturnValueOnce(pending);
    host.patient.set({ ...dialogPatient(), id: 99 });
    fixture.detectChanges();
    host.patient.set({ ...dialogPatient(), id: 100 });
    fixture.detectChanges();
    expect(pending.observed).toBe(false);
    pending.next(schedule(99));
    expect(child().schedule()?.patientId).toBe(100);
    api.schedule.mockReturnValueOnce(of(schedule(999)));
    host.patient.set({ ...dialogPatient(), id: 101 });
    fixture.detectChanges();
    expect(child().schedule()).toBeNull();
    expect(child().loadError()).toContain('no corresponde');
  });
  it('shows loading failures without inventing a local schedule and retries from the backend', () => {
    host.show.set(false);
    fixture.detectChanges();
    api.schedule.mockReturnValueOnce(throwError(() => ({ status: 503 })));
    host.show.set(true);
    fixture.detectChanges();
    expect(child().doses()).toEqual([]);
    expect(child().loadError()).toContain('No se pudo cargar');
    child().refresh();
    fixture.detectChanges();
    expect(child().doses()).toHaveLength(3);
  });
  it('refreshes the patient after a version conflict before using the next revision', () => {
    api.save.mockReturnValueOnce(throwError(() => ({ status: 409 })));
    child().markApplied(child().doses()[0], true);
    expect(child().saveError()).toContain('Actualizá');
    patients.getPatientById.mockReturnValueOnce(of({ ...dialogPatient(), version: 9 }));
    child().refresh();
    fixture.detectChanges();
    expect(host.patient().version).toBe(9);
    child().markApplied(child().doses()[0], true);
    expect(api.save).toHaveBeenLastCalledWith(22, 'dose-opaque-1', {
      expectedVersion: 9,
      calendarId: 'calendar-test',
      applied: true,
    });
  });
  it('blocks writes when the schedule revision differs from the displayed patient', () => {
    host.show.set(false);
    fixture.detectChanges();
    api.schedule.mockReturnValueOnce(of(schedule(22, 99)));
    host.show.set(true);
    fixture.detectChanges();
    expect(child().loadError()).toContain('La ficha cambió');
    child().markApplied(child().doses()[0], true);
    expect(api.save).not.toHaveBeenCalled();
  });
});
