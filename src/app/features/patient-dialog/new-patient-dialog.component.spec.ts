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
    fullName: 'Joaquín Benítez',
    birthDate: '2023-05-12',
    guardianInfo: {
      firstGuardianFullName: 'Lucía Fernández',
      firstGuardianPhone: '1144556677',
      firstGuardianNationalId: '38123456',
      address: 'Av. Corrientes 1234, CABA',
    },
    personalHistory: {
      birthMeasurements: {
        weight: 3.45,
        height: 50.0,
        headCircumference: 35.0,
      },
    },
    latestMeasurements: {
      weight: 11.2,
      height: 82.5,
      headCircumference: 46.0,
    },
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

  it('should copy birth measurements to current measurements', () => {
    component.patientForm.patchValue({
      birthWeight: 3.25,
      birthHeight: 49.5,
      birthHeadCircumference: 34.8,
    });

    component.copyBirthToCurrent();

    expect(component.patientForm.get('currentWeight')?.value).toBe(3.25);
    expect(component.patientForm.get('currentHeight')?.value).toBe(49.5);
    expect(component.patientForm.get('currentHeadCircumference')?.value).toBe(34.8);
  });

  it('should not submit if form is invalid and display error message', () => {
    component.openModal();
    component.onSubmit();

    expect(patientServiceSpy.createPatient).not.toHaveBeenCalled();
    expect(component.errorMessage()).toContain('Por favor complete');
  });

  it('should submit successfully, update active patient, dispatch patient-created event, and navigate to /ficha', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    component.openModal();

    // Fill valid form
    component.patientForm.patchValue({
      fullName: 'Joaquín Benítez',
      birthDate: '2023-05-12',
      firstGuardianFullName: 'Lucía Fernández',
      firstGuardianPhone: '1144556677',
      firstGuardianNationalId: '38123456',
      address: 'Av. Corrientes 1234, CABA',
      gestationCount: 1,
      prenatalVisitsSummary: 'Controles completos y adecuados',
      compPreeclampsia: true,
      birthWeight: 3.45,
      birthHeight: 50.0,
      birthHeadCircumference: 35.0,
      chronicOrPreviousDiseases: 'Bronquiolitis a los 6 meses',
      hospitalizationsOrSurgeries: 'Sin internaciones',
      allergies: 'Sin alergias',
      habitualMedication: 'Ninguna',
      familyChronicDiseases: 'Hipertensión materna',
      feedingDiet: 'Lactancia materna exclusiva (LME)',
      vaccinationHistory: 'Al día',
      developmentalMilestones: 'Adecuados',
      currentWeight: 11.2,
      currentHeight: 82.5,
      currentHeadCircumference: 46.0,
    });

    expect(component.patientForm.valid).toBe(true);

    component.onSubmit();

    expect(patientServiceSpy.createPatient).toHaveBeenCalledTimes(1);
    const sentPayload = patientServiceSpy.createPatient.mock.calls[0][0];

    expect(sentPayload.fullName).toBe('Joaquín Benítez');
    expect(sentPayload.birthDate).toBe('2023-05-12');
    expect(sentPayload.guardianInfo?.firstGuardianFullName).toBe('Lucía Fernández');
    expect(sentPayload.perinatalHistory?.pregnancyComplications).toContain('Hipertensión / Preeclampsia');
    expect(sentPayload.personalHistory?.birthMeasurements?.weight).toBe(3.45);
    expect(sentPayload.personalHistory?.chronicOrPreviousDiseases).toEqual(['Bronquiolitis a los 6 meses']);
    expect(sentPayload.latestMeasurements?.weight).toBe(11.2);

    expect(activePatientServiceSpy.setActivePatient).toHaveBeenCalledWith(mockCreatedPatient);
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'patient-created' })
    );
    expect(component.isOpen()).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/ficha']);

    dispatchSpy.mockRestore();
  });

  it('should handle API error gracefully by showing error message', () => {
    patientServiceSpy.createPatient.mockReturnValue(
      throwError(() => ({ error: { message: 'El DNI ya se encuentra registrado' } }))
    );

    component.openModal();
    component.patientForm.patchValue({
      fullName: 'Test Error',
      birthDate: '2023-01-01',
      firstGuardianFullName: 'Parent',
      firstGuardianPhone: '12345',
      firstGuardianNationalId: '12345678',
      address: 'Street 123',
      gestationCount: 1,
      prenatalVisitsSummary: 'OK',
      birthWeight: 3.1,
      birthHeight: 49,
      birthHeadCircumference: 34,
      feedingDiet: 'LME',
      vaccinationHistory: 'OK',
      developmentalMilestones: 'OK',
      currentWeight: 5.0,
      currentHeight: 55,
      currentHeadCircumference: 37,
    });

    component.onSubmit();

    expect(component.isSubmitting()).toBe(false);
    expect(component.errorMessage()).toBe('El DNI ya se encuentra registrado');
    expect(component.isOpen()).toBe(true);
  });
});
