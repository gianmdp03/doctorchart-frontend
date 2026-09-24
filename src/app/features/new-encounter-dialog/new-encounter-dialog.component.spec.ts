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

  it('should validate required chief complaint and diagnosis before submitting', async () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('patientId', 10);
    fixture.detectChanges();

    await component.submitEncounter();

    expect(component.errorMessage()).toContain('motivo de consulta es obligatorio');
    expect(encounterServiceMock.create).not.toHaveBeenCalled();

    component.chiefComplaint.set('Fiebre');
    await component.submitEncounter();
    expect(component.errorMessage()).toContain('diagnóstico principal es obligatorio');
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

    component.chiefComplaint.set('Dolor torácico');
    component.primaryDiagnosis.set('Sospecha de reflujo');
    component.onDynamicDataChange({ pesoKg: 78.5 });

    await component.submitEncounter();

    expect(encounterServiceMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        patientId: 10,
        chiefComplaint: 'Dolor torácico',
        primaryDiagnosisDescription: 'Sospecha de reflujo',
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
});
