import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCheckupDialogComponent } from './new-checkup-dialog.component';
import { CheckupService } from '../../core/services/checkup.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { PLATFORM_ID, signal } from '@angular/core';
import { of, throwError } from 'rxjs';
import { MedicalCheckupDetailDTO } from '../../core/models/checkup.model';
import { PatientDetailDTO } from '../../core/models/patient.model';

describe('NewCheckupDialogComponent', () => {
  let component: NewCheckupDialogComponent;
  let fixture: ComponentFixture<NewCheckupDialogComponent>;
  let checkupServiceSpy: { createCheckup: ReturnType<typeof vi.fn> };
  let activePatientServiceMock: {
    activePatient: ReturnType<typeof signal<PatientDetailDTO | null>>;
    patientId: ReturnType<typeof signal<number | null>>;
    patientName: ReturnType<typeof signal<string>>;
    latestMeasurements: ReturnType<typeof signal<any>>;
    loadPatient: ReturnType<typeof vi.fn>;
  };

  const mockPatient: PatientDetailDTO = {
    id: 101,
    fullName: 'Mateo Rossi',
    birthDate: '2025-09-16',
    latestMeasurements: {
      weight: 7.95,
      height: 67.5,
      headCircumference: 43.8,
    },
  };

  const mockCreatedCheckup: MedicalCheckupDetailDTO = {
    id: 391,
    patientId: 101,
    patientFullName: 'Mateo Rossi',
    checkupDate: '2026-09-17',
    reason: 'ROUTINE',
    measurements: {
      weight: 8.1,
      height: 68.0,
      headCircumference: 44.0,
    },
  };

  beforeEach(async () => {
    checkupServiceSpy = {
      createCheckup: vi.fn().mockReturnValue(of(mockCreatedCheckup)),
    };

    activePatientServiceMock = {
      activePatient: signal<PatientDetailDTO | null>(mockPatient),
      patientId: signal<number | null>(101),
      patientName: signal<string>('Mateo Rossi'),
      latestMeasurements: signal(mockPatient.latestMeasurements),
      loadPatient: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [NewCheckupDialogComponent],
      providers: [
        { provide: CheckupService, useValue: checkupServiceSpy },
        { provide: ActivePatientService, useValue: activePatientServiceMock },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewCheckupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with modal closed, not submitting, and null error', () => {
    expect(component.isOpen()).toBe(false);
    expect(component.isSubmitting()).toBe(false);
    expect(component.errorMessage()).toBeNull();
    expect(component.checkupForm.get('reason')?.value).toBe('ROUTINE');
  });

  it('should open modal when window event open-new-checkup-modal is dispatched and pre-populate measurements', () => {
    window.dispatchEvent(new CustomEvent('open-new-checkup-modal'));
    expect(component.isOpen()).toBe(true);
    expect(component.checkupForm.get('weight')?.value).toBe(7.95);
    expect(component.checkupForm.get('height')?.value).toBe(67.5);
    expect(component.checkupForm.get('headCircumference')?.value).toBe(43.8);
  });

  it('should close modal and reset form when closeModal is called', () => {
    component.openModal();
    component.checkupForm.patchValue({ observations: 'Prueba observación' });
    expect(component.isOpen()).toBe(true);

    component.closeModal();

    expect(component.isOpen()).toBe(false);
    expect(component.checkupForm.get('observations')?.value).toBe('');
    expect(component.errorMessage()).toBeNull();
  });

  it('should close modal on backdrop click', () => {
    component.openModal();
    expect(component.isOpen()).toBe(true);
    (component as any).openedAt = Date.now() - 500;

    const mockEvent = {
      target: document.createElement('div'),
      currentTarget: null as any,
    };
    mockEvent.currentTarget = mockEvent.target;

    component.onBackdropMouseDown(mockEvent as unknown as MouseEvent);
    component.onBackdropClick(mockEvent as unknown as MouseEvent);
    expect(component.isOpen()).toBe(false);
  });

  it('should close modal on Escape key if open and not submitting', () => {
    component.openModal();
    expect(component.isOpen()).toBe(true);

    component.onEscape();
    expect(component.isOpen()).toBe(false);
  });

  it('should restore previous measurements using copyPreviousMeasurements', () => {
    component.openModal();
    component.checkupForm.patchValue({
      weight: 12.0,
      height: 90.0,
      headCircumference: 48.0,
    });

    component.copyPreviousMeasurements();

    expect(component.checkupForm.get('weight')?.value).toBe(7.95);
    expect(component.checkupForm.get('height')?.value).toBe(67.5);
    expect(component.checkupForm.get('headCircumference')?.value).toBe(43.8);
  });

  it('should not submit if form is invalid and display error message', () => {
    component.openModal();
    component.checkupForm.patchValue({
      weight: null,
      height: null,
      headCircumference: null,
    });

    component.onSubmit();

    expect(checkupServiceSpy.createCheckup).not.toHaveBeenCalled();
    expect(component.errorMessage()).toContain('Por favor complete todos los campos obligatorios');
  });

  it('should not submit if there is no active patient', () => {
    activePatientServiceMock.patientId.set(null);
    component.openModal();

    component.onSubmit();

    expect(checkupServiceSpy.createCheckup).not.toHaveBeenCalled();
    expect(component.errorMessage()).toContain('Debe seleccionar o cargar un paciente');
  });

  it('should submit successfully, dispatch checkup-created event, reload patient, and close modal', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    component.openModal();
    component.checkupForm.patchValue({
      checkupDate: '2026-09-17',
      reason: 'ROUTINE',
      weight: 8.1,
      height: 68.0,
      headCircumference: 44.0,
      observations: 'Lactante lúcido y normohidratado',
      appliedVaccines: 'Antigripal',
    });

    expect(component.checkupForm.valid).toBe(true);

    component.onSubmit();

    expect(checkupServiceSpy.createCheckup).toHaveBeenCalledTimes(1);
    const sentPayload = checkupServiceSpy.createCheckup.mock.calls[0][0];

    expect(sentPayload.patientId).toBe(101);
    expect(sentPayload.checkupDate).toBe('2026-09-17');
    expect(sentPayload.reason).toBe('ROUTINE');
    expect(sentPayload.measurements).toEqual({
      weight: 8.1,
      height: 68.0,
      headCircumference: 44.0,
    });

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'checkup-created' })
    );
    expect(activePatientServiceMock.loadPatient).toHaveBeenCalledWith(101);
    expect(component.isOpen()).toBe(false);

    dispatchSpy.mockRestore();
  });

  it('should handle API error gracefully by showing error message', () => {
    checkupServiceSpy.createCheckup.mockReturnValue(
      throwError(() => ({ error: { message: 'Error en la base de datos' } }))
    );

    component.openModal();
    component.checkupForm.patchValue({
      checkupDate: '2026-09-17',
      reason: 'ROUTINE',
      weight: 8.1,
      height: 68.0,
      headCircumference: 44.0,
    });

    component.onSubmit();

    expect(component.isSubmitting()).toBe(false);
    expect(component.errorMessage()).toBe('Error en la base de datos');
    expect(component.isOpen()).toBe(true);
  });
});
