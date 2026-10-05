import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { of, Subject } from 'rxjs';
import { PatientVaccinationsComponent } from './patient-vaccinations.component';
import { PatientService } from '../../../core/services/patient.service';
import { PatientDetailDTO } from '../../../core/models/patient.model';
import { VaccinationCalendarService } from '../../vaccination-calendar/calendario.service';
import { dialogPatient } from '../../dynamic-form-renderer/clinical-dialog.fixture';

@Component({ imports: [PatientVaccinationsComponent], template: '@if (show()) { <app-patient-vaccinations [patient]="patient()" (patientUpdated)="patient.set($event)" /> }' })
class VaccinationsHost {
  readonly show = signal(true);
  readonly patient = signal(dialogPatient());
}

describe('PatientVaccinationsComponent record revision handoff', () => {
  let fixture: ComponentFixture<VaccinationsHost>; let host: VaccinationsHost; let update: ReturnType<typeof vi.fn>;
  const calendar = {
    grupos_etarios_columnas: [{ columnas: [{ id: 'recien_nacido' }] }],
    vacunas: [{ id: 'test_vaccine', nombre: 'Vacuna de prueba', aplicaciones: [{ columnas: ['recien_nacido'], dosis: 'Única' }] }],
  };
  beforeEach(async () => {
    update = vi.fn().mockImplementation((id, expectedVersion, records) => of({ ...host.patient(), id, version: expectedVersion + 1, immunizationAndNutrition: { vaccinationRecords: records } }));
    await TestBed.configureTestingModule({ imports: [VaccinationsHost], providers: [
      { provide: PatientService, useValue: { updateVaccinations: update } },
      { provide: VaccinationCalendarService, useValue: { data: signal(calendar), loading: signal(false), error: signal(null), load: vi.fn() } },
    ] }).compileComponents();
    fixture = TestBed.createComponent(VaccinationsHost); host = fixture.componentInstance; fixture.detectChanges();
  });
  const child = (fixture: ComponentFixture<VaccinationsHost>): PatientVaccinationsComponent => fixture.debugElement.query(By.directive(PatientVaccinationsComponent)).componentInstance;

  it('publishes the saved record to the parent so reopening the tab retains vaccine data and the current revision', () => {
    let component = child(fixture); component.markApplied(component.doses()[0], true); fixture.detectChanges();
    expect(update).toHaveBeenCalledWith(22, 3, [expect.objectContaining({ applied: true, applicationKey: 'test_vaccine:recien_nacido' })]);
    expect(host.patient().version).toBe(4); expect(host.patient().immunizationAndNutrition?.vaccinationRecords?.[0].applied).toBe(true);
    host.show.set(false); fixture.detectChanges(); host.show.set(true); fixture.detectChanges(); component = child(fixture);
    expect(component.appliedDoses()).toHaveLength(1); expect(fixture.nativeElement.textContent).toContain('Vacuna de prueba');
    component.updateDate(component.appliedDoses()[0], '2025-01-01'); fixture.detectChanges();
    expect(update).toHaveBeenLastCalledWith(22, 4, [expect.objectContaining({ appliedAt: '2025-01-01' })]);
    expect(host.patient().version).toBe(5);
  });

  it('does not publish a late response after another patient is selected before the input effect runs', () => {
    const pending = new Subject<PatientDetailDTO>(); update.mockReturnValueOnce(pending);
    const component = child(fixture); component.markApplied(component.doses()[0], true);
    fixture.componentRef.instance.patient.set({ ...dialogPatient(), id: 99 }); fixture.detectChanges();
    pending.next({ ...dialogPatient(), version: 4, immunizationAndNutrition: { vaccinationRecords: [{ vaccineId: 'test_vaccine', applicationKey: 'test_vaccine:recien_nacido', applied: true }] } }); pending.complete(); fixture.detectChanges();
    expect(host.patient().id).toBe(99); expect(host.patient().immunizationAndNutrition?.vaccinationRecords).toBeUndefined();
  });

  it('ignores a response after the vaccination tab is destroyed', () => {
    const pending = new Subject<PatientDetailDTO>(); update.mockReturnValueOnce(pending);
    const component = child(fixture); component.markApplied(component.doses()[0], true);
    host.show.set(false); fixture.detectChanges(); pending.next({ ...dialogPatient(), version: 4 }); pending.complete();
    expect(host.patient().version).toBe(3);
  });

  it('rejects a response for a different patient and blocks a second request while saving', () => {
    const pending = new Subject<PatientDetailDTO>(); update.mockReturnValueOnce(pending);
    const component = child(fixture); const dose = component.doses()[0]; component.markApplied(dose, true); component.markApplied(dose, false);
    expect(update).toHaveBeenCalledTimes(1); pending.next({ ...dialogPatient(), id: 99, version: 4 }); pending.complete();
    expect(host.patient().id).toBe(22); expect(host.patient().version).toBe(3);
    expect(component.isSaving()).toBe(false); expect(component.saveError()).toContain('no corresponde');
  });
});
