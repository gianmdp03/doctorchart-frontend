import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { SpecialtySelectionComponent } from './specialty-selection.component';
import { SpecialtyService } from '../../../core/services/specialty.service';
import { DoctorProfileService } from '../../../core/services/doctor-profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { SpecialtySummary } from '../../../core/models/specialty.model';
import { WorkspaceStore } from '../../../core/services/workspace.store';

describe('SpecialtySelectionComponent', () => {
  let component: SpecialtySelectionComponent;
  let fixture: ComponentFixture<SpecialtySelectionComponent>;
  let specialtyServiceMock: {
    getSpecialties: ReturnType<typeof vi.fn>;
    createCustomSpecialty: ReturnType<typeof vi.fn>;
  };
  let doctorProfileServiceMock: {
    clearProfile: ReturnType<typeof vi.fn>;
  };
  let workspaceStoreMock: {
    loadSetup: ReturnType<typeof vi.fn>;
    saveOnboardingDraft: ReturnType<typeof vi.fn>;
  };
  let authServiceMock: {
    signOut: ReturnType<typeof vi.fn>;
  };
  let router: Router;

  const mockSpecialties: SpecialtySummary[] = [
    { id: 4, specialty: 'PEDIATRICS', displayName: 'Pediatría y Neonatología', description: 'Atención pediátrica' },
    { id: 7, specialty: 'CARDIOLOGY', displayName: 'Cardiología', description: 'Salud cardiovascular' },
  ];

  beforeEach(async () => {
    specialtyServiceMock = {
      getSpecialties: vi.fn().mockReturnValue(of(mockSpecialties)),
      createCustomSpecialty: vi.fn(),
    };
    doctorProfileServiceMock = {
      clearProfile: vi.fn(),
    };
    workspaceStoreMock = {
      loadSetup: vi.fn().mockResolvedValue(null),
      saveOnboardingDraft: vi.fn().mockResolvedValue({}),
    };
    authServiceMock = {
      signOut: vi.fn().mockResolvedValue({ error: null }),
    };

    await TestBed.configureTestingModule({
      imports: [SpecialtySelectionComponent],
      providers: [
        { provide: SpecialtyService, useValue: specialtyServiceMock },
        { provide: DoctorProfileService, useValue: doctorProfileServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: WorkspaceStore, useValue: workspaceStoreMock },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture = TestBed.createComponent(SpecialtySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create and load specialties list', () => {
    expect(component).toBeTruthy();
    expect(component.specialties().length).toBe(2);
    expect(component.isLoading()).toBe(false);
  });

  it('should select a specialty on card click', () => {
    component.select('CARDIOLOGY');
    expect(component.selectedSpecialty()).toBe('CARDIOLOGY');
  });

  it('should save the selected specialty as the first wizard checkpoint', async () => {
    component.select('CARDIOLOGY');

    await component.confirmSpecialty();

    expect(workspaceStoreMock.saveOnboardingDraft).toHaveBeenCalledWith(
      expect.objectContaining({
        specialtyId: 7,
        onboardingStep: 'PATIENT_PERSONAL_DATA',
      })
    );
    expect(router.navigate).toHaveBeenCalledWith(['/onboarding/setup']);
  });

  it('should show an error when a specialty is missing its persisted identifier', async () => {
    component.specialties.set([{ code: 'general_medicine', displayName: 'Medicina general' }]);
    component.select('general_medicine');

    await component.confirmSpecialty();

    expect(component.errorMessage()).toContain('identificador válido');
  });

  it('should show a save error and keep the user on the selection step', async () => {
    component.select('PEDIATRICS');
    workspaceStoreMock.saveOnboardingDraft.mockRejectedValue({ status: 500 });

    await component.confirmSpecialty();

    expect(component.errorMessage()).toContain('guardar la especialidad');
  });

  it('should open modal and create custom specialty', () => {
    specialtyServiceMock.createCustomSpecialty = vi.fn().mockReturnValue(
      of({
        id: 12,
        code: 'MEDICINA_INTEGRATIVA',
        name: 'Medicina Integrativa',
        displayName: 'Medicina Integrativa',
        description: 'Enfoque holístico',
        isSystem: false,
      })
    );

    component.openCustomSpecialtyModal();
    expect(component.isCustomModalOpen()).toBe(true);

    component.customName.set('Medicina Integrativa');
    component.customDescription.set('Enfoque holístico');

    component.createCustomSpecialty();

    expect(component.isCustomModalOpen()).toBe(false);
    expect(component.specialties().length).toBe(3);
    expect(component.selectedSpecialty()).toBe('MEDICINA_INTEGRATIVA');
  });
});

