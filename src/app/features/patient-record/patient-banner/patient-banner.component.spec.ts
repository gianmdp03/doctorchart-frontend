import { clinicalFormFixture } from '../../../core/models/clinical-form.fixture';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientBannerComponent } from './patient-banner.component';
import { ActivePatientService } from '../../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../../core/services/doctor-specialty.service';
import { Router } from '@angular/router';
import { PatientDetailDTO } from '../../../core/models/patient.model';
import { signal } from '@angular/core';

describe('PatientBannerComponent', () => {
  let component: PatientBannerComponent;
  let fixture: ComponentFixture<PatientBannerComponent>;
  let activePatientServiceMock: any;
  let specialtyServiceMock: any;
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
    specialtyServiceMock = {
      supportsGrowthCharts: signal(true),
    };
    routerSpy = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [PatientBannerComponent],
      providers: [
        { provide: ActivePatientService, useValue: activePatientServiceMock },
        { provide: DoctorSpecialtyService, useValue: specialtyServiceMock },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientBannerComponent);
    component = fixture.componentInstance;
    component.patient = mockPatient;
    fixture.detectChanges();
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

  it('should navigate to /curvas when viewCurves has no listeners', () => {
    const unobservedComponent = TestBed.createComponent(PatientBannerComponent).componentInstance;
    unobservedComponent.patient = mockPatient;

    unobservedComponent.goToCurves();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/curvas']);
  });
});
