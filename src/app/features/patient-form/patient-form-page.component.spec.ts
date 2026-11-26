import { InteractionStatusService } from '../../core/services/interaction-status.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { PatientFormPageComponent } from './patient-form-page.component';
import { PatientService } from '../../core/services/patient.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { AuthService } from '../../core/services/auth.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { createClinicalHistoryCategory } from '../../core/models/wizard-definition.model';
import { dialogPatient, dialogWorkspace } from '../dynamic-form-renderer/clinical-dialog.fixture';

describe('PatientFormPageComponent dedicated page', () => {
  let fixture: ComponentFixture<PatientFormPageComponent>;
  let component: PatientFormPageComponent;
  let workspace: ReturnType<typeof dialogWorkspace>;
  let patient: ReturnType<typeof dialogPatient>;
  let patientService: {
    createPatient: ReturnType<typeof vi.fn>;
    updatePatient: ReturnType<typeof vi.fn>;
    getPatientById: ReturnType<typeof vi.fn>;
    checkDni: ReturnType<typeof vi.fn>;
  };
  let store: { loadSetup: ReturnType<typeof vi.fn> };
  let router: { navigate: ReturnType<typeof vi.fn> };
  const user = signal<{ id: string } | null>(null);
  const paramMapSubject = signal(convertToParamMap({}));

  beforeEach(async () => {
    user.set({ id: 'doctor-a' });
    workspace = dialogWorkspace();
    patient = dialogPatient();
    patientService = {
      createPatient: vi.fn().mockReturnValue(of(patient)),
      updatePatient: vi.fn().mockReturnValue(of(patient)),
      getPatientById: vi.fn().mockReturnValue(of(patient)),
      checkDni: vi.fn().mockReturnValue(of({ patientId: null })),
    };
    store = { loadSetup: vi.fn().mockImplementation(async () => structuredClone(workspace)) };
    router = { navigate: vi.fn() };
    paramMapSubject.set(convertToParamMap({}));

    await TestBed.configureTestingModule({
      imports: [PatientFormPageComponent],
      providers: [
        { provide: PatientService, useValue: patientService },
        { provide: WorkspaceStore, useValue: store },
        { provide: AuthService, useValue: { currentUser: user } },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({})),
          },
        },
      ],
    }).compileComponents();
  });

  it('renders creation form as dedicated page without modal overlay', async () => {
    fixture = TestBed.createComponent(PatientFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await vi.waitFor(() => expect(component.definition()).not.toBeNull());
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.modal-backdrop')).toBeNull();
    expect(fixture.nativeElement.querySelector('.patient-form-page')).not.toBeNull();
    expect(component.pageTitle()).toContain('Registrar Nuevo Paciente');
  });

  it('navigates back to /pacientes when cancel is clicked in create mode', async () => {
    fixture = TestBed.createComponent(PatientFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await vi.waitFor(() => expect(component.definition()).not.toBeNull());

    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/patients']);
  });

  it('submits create and navigates to the created patient record', async () => {
    fixture = TestBed.createComponent(PatientFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await vi.waitFor(() => expect(component.definition()).not.toBeNull());

    component.onValuesChange({ firstName: 'Lionel', lastName: 'Messi' });
    component.onFormValidityChange(true);
    await component.submit();

    expect(patientService.createPatient).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/patients', patient.id]);
    expect(TestBed.inject(InteractionStatusService).success()).toBe('El paciente se creó correctamente.');
  });
  it('collects clinical history when it is enabled in the specialty definition', async () => {
    workspace.definition!.patientForm.categories.push(createClinicalHistoryCategory());
    fixture = TestBed.createComponent(PatientFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.definition()?.categories.some((c) => c.key === 'sys_clinical_history')).toBe(
      true,
    );
    component.onValuesChange({
      firstName: 'Ana',
      lastName: 'Paciente',
      sys_allergyStatus: 'PRESENT',
      sys_allergies: 'Penicilina',
      sys_conditionStatus: 'PRESENT',
      sys_conditions: 'Asma',
      sys_medicationStatus: 'NONE',
      sys_historySource: 'REPORTED',
    });
    component.onFormValidityChange(true);
    await component.submit();
    expect(patientService.createPatient).toHaveBeenCalledWith(
      expect.objectContaining({
        values: expect.objectContaining({
          sys_allergies: 'Penicilina',
          sys_conditions: 'Asma',
          sys_medicationStatus: 'NONE',
        }),
      }),
    );
  });
  it('allows an incomplete save attempt, shows missing fields and never sends invalid data', async () => {
    fixture = TestBed.createComponent(PatientFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.field-error')).toBeNull();
    expect(fixture.nativeElement.querySelector('.btn-submit').disabled).toBe(false);
    await component.submit();
    fixture.detectChanges();
    expect(component.submissionAttempted()).toBe(true);
    expect(fixture.nativeElement.querySelector('.field-error')).not.toBeNull();
    expect(patientService.createPatient).not.toHaveBeenCalled();
  });

  async function renderWithDni(): Promise<HTMLInputElement> {
    workspace.definition!.patientForm.categories[0].fields.push({
      key: 'sys_dni', label: 'DNI', type: 'TEXT', required: true,
    });
    fixture = TestBed.createComponent(PatientFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('#field-sys_dni');
  }

  it('checks a valid DNI only when leaving the field and opens the existing record', async () => {
    patientService.checkDni.mockReturnValue(of({ patientId: 42 }));
    const input = await renderWithDni();
    input.value = '12345';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    expect(patientService.checkDni).not.toHaveBeenCalled();
    for (const value of ['123456', '1234567', '12345678']) {
      input.value = value;
      input.dispatchEvent(new Event('input'));
      expect(patientService.checkDni).not.toHaveBeenCalled();
    }
    input.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    input.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    await fixture.whenStable();
    fixture.detectChanges();
    expect(patientService.checkDni).toHaveBeenCalledExactlyOnceWith('12345678');
    const field = input.closest('[data-field-key]')!;
    expect(field.querySelector('[role="alert"]')?.textContent).toContain('Ya tenés un paciente');
    field.querySelector('button')?.click();
    expect(router.navigate).toHaveBeenCalledWith(['/patients', 42]);
  });

  it('ignores a lookup that returns after the DNI changes', async () => {
    const lookup = new Subject<{ patientId: number }>();
    patientService.checkDni.mockReturnValue(lookup);
    const input = await renderWithDni();
    input.value = '12345678';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    input.value = '87654321';
    input.dispatchEvent(new Event('input'));
    lookup.next({ patientId: 42 });
    await fixture.whenStable();
    expect(component.duplicateDni()).toBeNull();
  });

  it('keeps the form and shows a link when saving detects the duplicate', async () => {
    patientService.createPatient.mockReturnValue(throwError(() => ({
      status: 409, error: { code: 'PATIENT_DNI_ALREADY_EXISTS' },
    })));
    patientService.checkDni.mockReturnValue(of({ patientId: 42 }));
    await renderWithDni();
    component.onValuesChange({ identity: 'Ana Paciente', sys_dni: '12345678' });
    component.onFormValidityChange(true);
    await component.submit();
    expect(component.values()).toMatchObject({ identity: 'Ana Paciente', sys_dni: '12345678' });
    expect(component.duplicateDni()?.patientId).toBe(42);
    expect(component.conflict()).toBeNull();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
