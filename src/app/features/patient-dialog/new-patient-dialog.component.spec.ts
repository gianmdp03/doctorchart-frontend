import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewPatientDialogComponent } from './new-patient-dialog.component';
import { PatientService } from '../../core/services/patient.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PatientDetailDTO } from '../../core/models/patient.model';

describe('NewPatientDialogComponent', () => {
  let component: NewPatientDialogComponent;
  let fixture: ComponentFixture<NewPatientDialogComponent>;
  let patientServiceSpy: { createPatient: ReturnType<typeof vi.fn> };
  let activePatientServiceSpy: { setActivePatient: ReturnType<typeof vi.fn> };
  let routerSpy: { navigate: ReturnType<typeof vi.fn> };

  const mockCreatedPatient: PatientDetailDTO = {
    id: 101,
    fullName: 'Carlos Gardel',
    birthDate: '1985-05-12',
    nationalId: '30123456',
    phone: '+5491144556677',
    email: 'carlos@example.com',
    address: 'Av. Corrientes 1234, CABA',
  };

  beforeEach(async () => {
    patientServiceSpy = {
      createPatient: vi.fn().mockReturnValue(of(mockCreatedPatient)),
    };
    activePatientServiceSpy = {
      setActivePatient: vi.fn(),
    };
    routerSpy = {
      navigate: vi.fn().mockReturnValue(Promise.resolve(true)),
    };

    await TestBed.configureTestingModule({
      imports: [NewPatientDialogComponent],
      providers: [
        { provide: PatientService, useValue: patientServiceSpy },
        { provide: ActivePatientService, useValue: activePatientServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPatientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with modal closed and default form values', () => {
    expect(component.isOpen()).toBe(false);
    expect(component.isSubmitting()).toBe(false);
    expect(component.errorMessage()).toBeNull();
    expect(component.patientForm.valid).toBe(false);
  });

  it('should open modal when window event open-new-patient-modal is dispatched', () => {
    window.dispatchEvent(new CustomEvent('open-new-patient-modal'));
    expect(component.isOpen()).toBe(true);
  });

  it('should close modal and reset form when closeModal is called', () => {
    component.openModal();
    component.patientForm.patchValue({ fullName: 'Testing Name' });
    expect(component.isOpen()).toBe(true);

    component.closeModal();

    expect(component.isOpen()).toBe(false);
    expect(component.patientForm.get('fullName')?.value).toBe('');
    expect(component.errorMessage()).toBeNull();
  });

  it('should reactively switch contact section title based on age (< 16 vs >= 16)', () => {
    // Under 16
    component.patientForm.patchValue({ birthDate: '2020-01-01' });
    expect(component.isMinor()).toBe(true);
    expect(component.contactSectionTitle()).toBe('Padre, Madre o Tutor Responsable');

    // 16 or older
    component.patientForm.patchValue({ birthDate: '1995-05-20' });
    expect(component.isMinor()).toBe(false);
    expect(component.contactSectionTitle()).toBe('Contacto de Emergencia / Familiar Directo');
  });

  it('should not submit if form is invalid and display error message', () => {
    component.openModal();
    component.onSubmit();

    expect(patientServiceSpy.createPatient).not.toHaveBeenCalled();
    expect(component.errorMessage()).toContain('Por favor complete');
  });

  it('should submit adult patient with universal payload, update active patient, and navigate to /ficha', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    component.openModal();

    // Fill valid adult form
    component.patientForm.patchValue({
      fullName: 'Carlos Gardel',
      birthDate: '1985-05-12',
      nationalId: '30123456',
      gender: 'MALE',
      phone: '+5491144556677',
      email: 'carlos@example.com',
      address: 'Av. Corrientes 1234, CABA',
      insuranceProvider: 'OSDE',
      insuranceNumber: '99887766',
      insurancePlan: '210',
      contactName: 'María Rosa',
      contactPhone: '+5491155443322',
      contactRelationship: 'Cónyuge',
    });

    expect(component.patientForm.valid).toBe(true);

    component.onSubmit();

    expect(patientServiceSpy.createPatient).toHaveBeenCalledTimes(1);
    const sentPayload = patientServiceSpy.createPatient.mock.calls[0][0];

    expect(sentPayload.fullName).toBe('Carlos Gardel');
    expect(sentPayload.birthDate).toBe('1985-05-12');
    expect(sentPayload.nationalId).toBe('30123456');
    expect(sentPayload.gender).toBe('MALE');
    expect(sentPayload.phone).toBe('+5491144556677');
    expect(sentPayload.email).toBe('carlos@example.com');
    expect(sentPayload.address).toBe('Av. Corrientes 1234, CABA');
    expect(sentPayload.insuranceInfo?.providerName).toBe('OSDE');
    expect(sentPayload.insuranceInfo?.affiliateNumber).toBe('99887766');
    expect(sentPayload.emergencyContact?.contactName).toBe('María Rosa');
    expect(sentPayload.emergencyContact?.relationship).toBe('Cónyuge');
    expect(sentPayload.guardianInfo).toBeNull();
    // Verify zero legacy pediatric mock objects sent
    expect(sentPayload.perinatalHistory).toBeUndefined();
    expect(sentPayload.immunizationAndNutrition).toBeUndefined();

    expect(activePatientServiceSpy.setActivePatient).toHaveBeenCalledWith(mockCreatedPatient);
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'patient-created' })
    );
    expect(component.isOpen()).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/ficha']);

    dispatchSpy.mockRestore();
  });

  it('should submit minor patient and populate guardianInfo', () => {
    component.openModal();

    component.patientForm.patchValue({
      fullName: 'Benjamín Rossi',
      birthDate: '2022-04-10',
      gender: 'MALE',
      contactName: 'Laura Rossi',
      contactPhone: '+5491199887766',
      contactNationalId: '35123456',
      contactRelationship: 'Madre',
    });

    expect(component.isMinor()).toBe(true);
    component.onSubmit();

    expect(patientServiceSpy.createPatient).toHaveBeenCalledTimes(1);
    const sentPayload = patientServiceSpy.createPatient.mock.calls[0][0];

    expect(sentPayload.fullName).toBe('Benjamín Rossi');
    expect(sentPayload.guardianInfo?.firstGuardianFullName).toBe('Laura Rossi');
    expect(sentPayload.guardianInfo?.firstGuardianNationalId).toBe('35123456');
    expect(sentPayload.guardianInfo?.firstGuardianPhone).toBe('+5491199887766');
  });

  it('should handle API error gracefully by showing error message', () => {
    patientServiceSpy.createPatient.mockReturnValue(
      throwError(() => ({ error: { message: 'El DNI ya se encuentra registrado' } }))
    );

    component.openModal();
    component.patientForm.patchValue({
      fullName: 'Test Error',
      birthDate: '1990-01-01',
    });

    component.onSubmit();

    expect(component.isSubmitting()).toBe(false);
    expect(component.errorMessage()).toBe('El DNI ya se encuentra registrado');
    expect(component.isOpen()).toBe(true);
  });
});
