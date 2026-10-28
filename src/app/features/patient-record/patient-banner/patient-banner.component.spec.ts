import { clinicalFormFixture } from '../../../core/models/clinical-form.fixture';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientBannerComponent } from './patient-banner.component';
import { ActivePatientService } from '../../../core/services/active-patient.service';
import { WorkspaceStore } from '../../../core/services/workspace.store';
import {
  PatientRecordActionId,
  PATIENT_RECORD_ACTION_IDS,
} from '../../../core/models/specialty-experience.model';
import { Router } from '@angular/router';
import { PatientDetailDTO } from '../../../core/models/patient.model';
import { signal } from '@angular/core';

describe('PatientBannerComponent', () => {
  let component: PatientBannerComponent;
  let fixture: ComponentFixture<PatientBannerComponent>;
  let activePatientServiceMock: any;
  const configuredActions = signal<PatientRecordActionId[]>([]);
  const growthEnabled = signal(true);
  const growthTab = signal(true);
  let routerSpy: { navigate: ReturnType<typeof vi.fn> };

  const mockPatient: PatientDetailDTO = {
    ...clinicalFormFixture(),
    id: 10492,
    fullName: 'Mateo Rossi',
    birthDate: '2024-05-10',
    gender: 'MALE',
    nationalId: '50123456',
    insuranceInfo: {
      providerName: 'OSDE',
      planName: '310',
      affiliateNumber: '12345678901',
    },
    allergies: ['Penicilina'],
    chronicConditions: ['Asma bronquial'],
    personalHistory: {
      allergies: ['Penicilina', 'Ibuprofeno'],
      chronicOrPreviousDiseases: ['Asma bronquial'],
    },
  };

  beforeEach(async () => {
    activePatientServiceMock = {
      activePatient: signal(mockPatient),
    };
    configuredActions.set([...PATIENT_RECORD_ACTION_IDS]);
    growthEnabled.set(true);
    growthTab.set(true);
    routerSpy = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [PatientBannerComponent],
      providers: [
        { provide: ActivePatientService, useValue: activePatientServiceMock },
        {
          provide: WorkspaceStore,
          useValue: {
            patientRecordActions: configuredActions,
            hasRecordAction: (id: PatientRecordActionId) => configuredActions().includes(id),
            hasRecordTab: () => growthTab(),
            isModuleActive: () => growthEnabled(),
          },
        },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientBannerComponent);
    component = fixture.componentInstance;
    component.patient = mockPatient;
    fixture.detectChanges();
  });

  it('preserves pediatric action labels and order in primary button group and excludes redundant menu', () => {
    expect(
      [...fixture.nativeElement.querySelectorAll('.banner-actions-block > button')].map((el: any) =>
        el.textContent.trim(),
      ),
    ).toEqual(['Editar datos', 'Nueva historia clínica']);
    expect(fixture.nativeElement.querySelector('.more-menu-container')).toBeNull();
    expect(fixture.nativeElement.querySelector('.btn-more-options')).toBeNull();
    expect(fixture.nativeElement.querySelector('.dropdown-actions-menu')).toBeNull();
  });
  it('composes selection and order from the configured action IDs', () => {
    configuredActions.set(['PRINT_DOCUMENT', 'NEW_ENCOUNTER', 'EDIT_PATIENT']);
    fixture.detectChanges();
    expect(
      [...fixture.nativeElement.querySelectorAll('.banner-actions-block > button')].map((el: any) =>
        el.textContent.trim(),
      ),
    ).toEqual(['Nueva historia clínica', 'Editar datos']);
  });
  it('removes all buttons and blocks handlers when actions are cleared', () => {
    const edit = vi.spyOn(component.editPatient, 'emit'),
      create = vi.spyOn(component.newEncounter, 'emit'),
      print = vi.spyOn(component.printSummary, 'emit'),
      curves = vi.spyOn(component.viewCurves, 'emit');
    configuredActions.set([]);
    fixture.detectChanges();
    component.onEditPatient();
    component.onNewEncounter();
    component.onPrintSummary();
    component.goToCurves();
    expect(fixture.nativeElement.querySelector('.banner-actions-block').children).toHaveLength(0);
    for (const spy of [edit, create, print, curves]) expect(spy).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('.patient-fullname').textContent).toContain(
      mockPatient.fullName,
    );
  });
  it('requires growth tab, personal switch and child context for the growth shortcut', () => {
    configuredActions.set(['VIEW_GROWTH']);
    for (const change of [
      () => growthTab.set(false),
      () => {
        growthTab.set(true);
        growthEnabled.set(false);
      },
      () => {
        growthEnabled.set(true);
        component.patient = { ...mockPatient, birthDate: '1980-05-10' };
      },
    ]) {
      change();
      fixture.detectChanges();
      component.goToCurves();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    }
    component.patient = mockPatient;
    fixture.detectChanges();
    component.goToCurves();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/patients', mockPatient.id], { queryParams: { tab: 'growth' } });
  });
  it('should create the patient banner', () => {
    expect(component).toBeTruthy();
  });

  it('should compute initials, nationalId and sexLabel', () => {
    expect(component.initials()).toBe('MR');
    expect(component.nationalId()).toBe('50123456');
    expect(component.sexLabel()).toBe('Masculino');
  });

  it('should compute insurance info correctly', () => {
    const cov = component.coverageInfo();
    expect(cov.isParticular).toBe(false);
    expect(cov.label).toBe('OSDE 310');
    expect(cov.affiliate).toBe('12345678901');
  });

  it('should deduplicate allergies and chronic conditions', () => {
    expect(component.allergyList()).toEqual(['Penicilina', 'Ibuprofeno']);
    expect(component.chronicConditionList()).toEqual(['Asma bronquial']);
  });

  it('should emit viewCurves event', () => {
    const curvesSpy = vi.spyOn(component.viewCurves, 'emit');
    component.viewCurves.subscribe();

    component.goToCurves();
    expect(curvesSpy).toHaveBeenCalled();
  });

  it('opens the patient growth tab when viewCurves has no listeners', () => {
    const unobservedComponent = TestBed.createComponent(PatientBannerComponent).componentInstance;
    unobservedComponent.patient = mockPatient;

    unobservedComponent.goToCurves();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/patients', mockPatient.id], { queryParams: { tab: 'growth' } });
  });
});
