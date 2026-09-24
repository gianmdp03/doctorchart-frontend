import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { ClinicalTimelineComponent } from './clinical-timeline.component';
import { ClinicalEncounterList } from '../../../core/models/clinical-encounter.model';

describe('ClinicalTimelineComponent', () => {
  let component: ClinicalTimelineComponent;
  let fixture: ComponentFixture<ClinicalTimelineComponent>;

  const mockEncounters: ClinicalEncounterList[] = [
    {
      id: 101, patientId: 10492,
      encounterDate: '2026-03-15T10:00:00Z',
      specialty: 'PEDIATRICS',
      consultationType: 'FIRST_VISIT',
      chiefComplaint: 'Control del mes',
      primaryDiagnosisDescription: 'Paciente sano',
      treatmentPlan: 'Seguir con lactancia',
      dynamicData: {},
    },
    {
      id: 102, patientId: 10492,
      encounterDate: '2026-02-15T10:00:00Z',
      specialty: 'PEDIATRICS',
      consultationType: 'FOLLOW_UP',
      chiefComplaint: 'Fiebre leve',
      primaryDiagnosisDescription: 'Rinitis',
      treatmentPlan: 'Paracetamol',
      dynamicData: {},
    },
    {
      id: 103, patientId: 10492,
      encounterDate: '2026-01-15T10:00:00Z',
      specialty: 'PEDIATRICS',
      consultationType: 'ROUTINE_CHECKUP',
      chiefComplaint: 'Chequeo',
      primaryDiagnosisDescription: 'Sano',
      treatmentPlan: 'Sin indicaciones',
      dynamicData: {},
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalTimelineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicalTimelineComponent);
    component = fixture.componentInstance;
  });

  it('should initialize and expand the first two encounters by default', () => {
    component.encounters = mockEncounters;
    component.ngOnChanges({
      encounters: new SimpleChange(null, mockEncounters, true),
    });
    fixture.detectChanges();

    expect(component.isCardExpanded(101)).toBe(true);
    expect(component.isCardExpanded(102)).toBe(true);
    expect(component.isCardExpanded(103)).toBe(false);
  });

  it('should collapse all encounters when collapseAll is called', () => {
    component.encounters = mockEncounters;
    component.ngOnChanges({
      encounters: new SimpleChange(null, mockEncounters, true),
    });

    component.collapseAll();

    expect(component.isCardExpanded(101)).toBe(false);
    expect(component.isCardExpanded(102)).toBe(false);
    expect(component.isCardExpanded(103)).toBe(false);
  });

  it('should expand all encounters when expandAll is called', () => {
    component.encounters = mockEncounters;
    component.ngOnChanges({
      encounters: new SimpleChange(null, mockEncounters, true),
    });

    component.collapseAll();
    expect(component.isCardExpanded(101)).toBe(false);

    component.expandAll();
    expect(component.isCardExpanded(101)).toBe(true);
    expect(component.isCardExpanded(102)).toBe(true);
    expect(component.isCardExpanded(103)).toBe(true);
  });

  it('should toggle an encounter card open and closed', () => {
    component.encounters = mockEncounters;
    component.ngOnChanges({
      encounters: new SimpleChange(null, mockEncounters, true),
    });

    expect(component.isCardExpanded(101)).toBe(true);

    component.toggleCard(101);
    expect(component.isCardExpanded(101)).toBe(false);

    component.toggleCard(101);
    expect(component.isCardExpanded(101)).toBe(true);
  });
});
