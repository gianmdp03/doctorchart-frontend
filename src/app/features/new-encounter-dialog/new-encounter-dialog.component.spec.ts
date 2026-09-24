import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewEncounterDialogComponent } from './new-encounter-dialog.component';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { FormTemplate } from '../../core/models/workspace.model';
import { of } from 'rxjs';
import { signal } from '@angular/core';

describe('NewEncounterDialogComponent', () => {
  let component: NewEncounterDialogComponent;
  let fixture: ComponentFixture<NewEncounterDialogComponent>;

  const mockTemplate: FormTemplate = {
    id: 99,
    name: 'Plantilla de Prueba FASE 5',
    templateType: 'ENCOUNTER',
    isDefault: true,
    schemaDefinition: {
      categories: [
        {
          categoryKey: 'VITAL_SIGNS_AND_SOMATOMETRY',
          title: 'Signos Vitales',
          enabled: true,
          fields: [
            { key: 'pesoKg', label: 'Peso Corporal', type: 'NUMBER' },
            { key: 'tallaCm', label: 'Estatura', type: 'NUMBER' },
          ],
        },
      ],
    },
  };

  let encounterServiceMock: {
    create: ReturnType<typeof vi.fn>;
  };

  let workspaceStoreMock: {
    defaultTemplate: ReturnType<typeof signal<FormTemplate | null>>;
  };

  let specialtyServiceMock: {
    activeSpecialty: ReturnType<typeof signal<string | null>>;
  };

  beforeEach(async () => {
    encounterServiceMock = {
      create: vi.fn().mockReturnValue(
        of({
          id: 501,
          patientId: 10,
          patientFullName: 'Juan Pérez',
          encounterDate: '2026-09-23',
          specialty: 'GENERAL_MEDICINE',
          consultationType: 'FIRST_VISIT',
          chiefComplaint: 'Dolor torácico',
          primaryDiagnosisDescription: 'Sospecha de reflujo',
          templateId: 99,
          dynamicData: { pesoKg: 78.5 },
          snapshotFieldLabels: { pesoKg: 'Peso Corporal', tallaCm: 'Estatura' },
        })
      ),
    };

    workspaceStoreMock = {
      defaultTemplate: signal<FormTemplate | null>(mockTemplate),
    };

    specialtyServiceMock = {
      activeSpecialty: signal<string | null>('GENERAL_MEDICINE'),
    };

    await TestBed.configureTestingModule({
      imports: [NewEncounterDialogComponent],
      providers: [
        { provide: ClinicalEncounterService, useValue: encounterServiceMock },
        { provide: WorkspaceStore, useValue: workspaceStoreMock },
        { provide: DoctorSpecialtyService, useValue: specialtyServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewEncounterDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create the new encounter dialog', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the configured form before submitting', async () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('patientId', 10);
    fixture.detectChanges();

    component.onDynamicFormValidityChange(false);
    await component.submitEncounter();
    expect(component.errorMessage()).toContain('campos obligatorios');
    expect(encounterServiceMock.create).not.toHaveBeenCalled();
  });

  it('should submit encounter with templateId, dynamicData, and snapshotFieldLabels', async () => {
    let createdResult: any = null;
    component.encounterCreated.subscribe((res) => {
      createdResult = res;
    });

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('patientId', 10);
    fixture.componentRef.setInput('patientName', 'Juan Pérez');
    fixture.detectChanges();

    component.onDynamicDataChange({ pesoKg: 78.5 });

    await component.submitEncounter();

    expect(encounterServiceMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        patientId: 10,
        encounterDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
        chiefComplaint: '78.5',
        primaryDiagnosisDescription: '78.5',
        templateId: 99,
        dynamicData: { pesoKg: 78.5 },
        snapshotFieldLabels: {
          pesoKg: 'Peso Corporal',
          tallaCm: 'Estatura',
        },
      })
    );

    expect(createdResult).toBeTruthy();
    expect(createdResult.id).toBe(501);
  });
  it('should only show FIRST_VISIT when previousEncountersCount is 0', () => {
    fixture.componentRef.setInput('previousEncountersCount', 0);
    fixture.detectChanges();

    const types = component.consultationTypes();
    expect(types.length).toBe(1);
    expect(types[0].value).toBe('FIRST_VISIT');
    expect(component.consultationType()).toBe('FIRST_VISIT');
  });

  it('should show all other consultation types except FIRST_VISIT when previousEncountersCount > 0', () => {
    fixture.componentRef.setInput('previousEncountersCount', 3);
    fixture.detectChanges();

    const types = component.consultationTypes();
    expect(types.length).toBe(4);
    expect(types.some((t) => t.value === 'FIRST_VISIT')).toBe(false);
    expect(types.map((t) => t.value)).toEqual([
      'FOLLOW_UP',
      'ROUTINE_CHECKUP',
      'EMERGENCY',
      'INTERCONSULTATION',
    ]);
    expect(component.consultationType()).toBe('FOLLOW_UP');
  });
});
