import { clinicalFormFixture } from '../../../core/models/clinical-form.fixture';
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
      ...clinicalFormFixture(), specialtyId: 1, specialty: {id:1,code:'pediatrics',name:'Pediatría',description:null},
      consultationType: 'FIRST_VISIT',
      chiefComplaint: 'Control del mes',
      primaryDiagnosisDescription: 'Paciente sano',
      treatmentPlan: 'Seguir con lactancia',
    },
    {
      id: 102, patientId: 10492,
      encounterDate: '2026-02-15T10:00:00Z',
      ...clinicalFormFixture(), specialtyId: 1, specialty: {id:1,code:'pediatrics',name:'Pediatría',description:null},
      consultationType: 'FOLLOW_UP',
      chiefComplaint: 'Fiebre leve',
      primaryDiagnosisDescription: 'Rinitis',
      treatmentPlan: 'Paracetamol',
    },
    {
      id: 103, patientId: 10492,
      encounterDate: '2026-01-15T10:00:00Z',
      ...clinicalFormFixture(), specialtyId: 1, specialty: {id:1,code:'pediatrics',name:'Pediatría',description:null},
      consultationType: 'ROUTINE_CHECKUP',
      chiefComplaint: 'Chequeo',
      primaryDiagnosisDescription: 'Sano',
      treatmentPlan: 'Sin indicaciones',
    },
  ];

  beforeEach(async () => {
    const options = new Intl.DateTimeFormat().resolvedOptions();
    vi.spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockReturnValue({ ...options, timeZone: 'America/Argentina/Buenos_Aires' });
    await TestBed.configureTestingModule({
      imports: [ClinicalTimelineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicalTimelineComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('canCreateEncounter', true);
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

  it('translates UTC encounter timestamps to Argentine time (America/Argentina/Buenos_Aires)', () => {
    // 2026-10-07T23:10:00Z (equivalent to 01:10 in Spain during summer time)
    // In Argentina (UTC-3), it translates to 20:10 hs
    const spainEncounterUtc = '2026-10-07T23:10:00Z';
    expect(component.formatDate(spainEncounterUtc)).toBe('07/10/2026');
    expect(component.formatTime(spainEncounterUtc)).toBe('20:10 hs');

    // 2026-10-07T17:10:00Z -> In Argentina (UTC-3) it translates to 14:10 hs
    const afternoonEncounterUtc = '2026-10-07T17:10:00Z';
    expect(component.formatDate(afternoonEncounterUtc)).toBe('07/10/2026');
    expect(component.formatTime(afternoonEncounterUtc)).toBe('14:10 hs');
  });
  it('filters by the displayed day instead of slicing the UTC date', () => {
    const localEvening = { ...mockEncounters[0], encounterDate: '2026-10-08T01:30:00Z' };
    component.encounters = [localEvening];
    component.fromDate.set('2026-10-07'); component.toDate.set('2026-10-07');
    expect(component.filteredEncounters()).toEqual([localEvening]);
    component.fromDate.set('2026-10-08'); component.toDate.set('2026-10-08');
    expect(component.filteredEncounters()).toEqual([]);
  });
});
