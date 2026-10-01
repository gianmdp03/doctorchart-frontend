import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { NewPatientDialogComponent } from './new-patient-dialog.component';
import { PatientService } from '../../core/services/patient.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { FormTemplate } from '../../core/models/workspace.model';

describe('NewPatientDialogComponent', () => {
  let component: NewPatientDialogComponent;
  let fixture: ComponentFixture<NewPatientDialogComponent>;
  let patientServiceMock: {
    createPatient: ReturnType<typeof vi.fn>;
    updatePatient: ReturnType<typeof vi.fn>;
  };

  const patientTemplate: FormTemplate = {
    name: 'Formulario de paciente',
    templateType: 'PATIENT_EXTRA',
    isDefault: true,
    schemaDefinition: {
      categories: [{
        categoryKey: 'CORE_DEMOGRAPHICS',
        title: 'Datos personales',
        enabled: true,
        fields: [
          { key: 'firstName', label: 'Nombre', type: 'TEXT', required: true },
          { key: 'lastName', label: 'Apellido', type: 'TEXT', required: true },
          { key: 'birthDate', label: 'Fecha de nacimiento', type: 'DATE', required: true },
          { key: 'nationality', label: 'Nacionalidad', type: 'TEXT' },
        ],
      }],
    },
  };

  beforeEach(async () => {
    patientServiceMock = {
      createPatient: vi.fn().mockReturnValue(of({ id: 8, fullName: 'Ada Lovelace', birthDate: '1990-01-01' })),
      updatePatient: vi.fn().mockReturnValue(of({ id: 8, fullName: 'Ada Lovelace Updated', birthDate: '1990-01-01' })),
    };

    await TestBed.configureTestingModule({
      imports: [NewPatientDialogComponent],
      providers: [
        { provide: PatientService, useValue: patientServiceMock },
        {
          provide: WorkspaceStore,
          useValue: {
            defaultPatientTemplate: signal(patientTemplate),
            loadSetup: vi.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPatientDialogComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
  });

  it('maps core configured fields to the patient payload and keeps the rest as flexible data', () => {
    component.onValuesChange({
      firstName: 'Ada',
      lastName: 'Lovelace',
      birthDate: '1990-01-01',
      nationality: 'Argentina',
    });
    component.onFormValidityChange(true);

    component.submit();

    expect(patientServiceMock.createPatient).toHaveBeenCalledWith(expect.objectContaining({
      fullName: 'Ada Lovelace',
      birthDate: '1990-01-01',
      patientExtraData: { nationality: 'Argentina' },
      patientFormData: {
        firstName: 'Ada',
        lastName: 'Lovelace',
        birthDate: '1990-01-01',
        nationality: 'Argentina',
      },
      patientTemplateSnapshot: patientTemplate.schemaDefinition,
    }));
  });

  it('updates an existing patient when patientToEdit is provided', () => {
    fixture.componentRef.setInput('patientToEdit', {
      id: 8,
      fullName: 'Ada Lovelace',
      birthDate: '1990-01-01',
      nationalId: '12345678',
    });
    fixture.detectChanges();

    expect(component.isEditMode()).toBe(true);

    component.onValuesChange({
      firstName: 'Ada',
      lastName: 'Lovelace',
      birthDate: '1990-01-01',
      nationality: 'Argentina',
    });
    component.onFormValidityChange(true);

    component.submit();

    expect(patientServiceMock.updatePatient).toHaveBeenCalledWith(8, expect.objectContaining({
      fullName: 'Ada Lovelace',
      birthDate: '1990-01-01',
    }));
    expect(patientServiceMock.createPatient).not.toHaveBeenCalled();
  });

  it('requires the identifiers needed by the existing patient record model', () => {
    component.onValuesChange({ firstName: 'Ada' });
    component.onFormValidityChange(true);

    component.submit();

    expect(patientServiceMock.createPatient).not.toHaveBeenCalled();
    expect(component.errorMessage()).toContain('fecha de nacimiento');
  });
});
