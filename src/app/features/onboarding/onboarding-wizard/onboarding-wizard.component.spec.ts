import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { computed, signal } from '@angular/core';
import { OnboardingWizardComponent } from './onboarding-wizard.component';
import { WorkspaceStore } from '../../../core/services/workspace.store';
import { DoctorProfileService } from '../../../core/services/doctor-profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { WorkspaceSetup } from '../../../core/models/workspace.model';

describe('OnboardingWizardComponent', () => {
  let component: OnboardingWizardComponent;
  let fixture: ComponentFixture<OnboardingWizardComponent>;
  let workspaceStoreMock: {
    currentSetup: ReturnType<typeof signal<WorkspaceSetup | null>>;
    isOnboardingCompleted: ReturnType<typeof computed<boolean>>;
    loadSetup: ReturnType<typeof vi.fn>;
    saveOnboardingDraft: ReturnType<typeof vi.fn>;
    finishOnboarding: ReturnType<typeof vi.fn>;
    resetToDefaults: ReturnType<typeof vi.fn>;
  };
  let router: Router;

  const setup: WorkspaceSetup = {
    id: 11,
    userId: 'doctor-1',
    specialtyId: 4,
    specialtyCode: 'pediatrics',
    specialtyDisplayName: 'Pediatría',
    onboardingCompleted: false,
    onboardingStep: 'PATIENT_PERSONAL_DATA',
    onboardingDraft: {},
    patientColumnsConfig: {},
    modulesConfig: {},
    chartConfigs: [],
  };

  beforeEach(async () => {
    const currentSetupSignal = signal<WorkspaceSetup | null>({ ...setup });
    workspaceStoreMock = {
      currentSetup: currentSetupSignal,
      isOnboardingCompleted: computed(() => currentSetupSignal()?.onboardingCompleted ?? false),
      loadSetup: vi.fn().mockImplementation(async () => workspaceStoreMock.currentSetup()),
      saveOnboardingDraft: vi.fn().mockImplementation(async (payload) => {
        workspaceStoreMock.currentSetup.update((current) => current ? { ...current, onboardingStep: payload.onboardingStep } : current);
      }),
      finishOnboarding: vi.fn().mockImplementation(async () => {
        workspaceStoreMock.currentSetup.update((current) => current ? {
          ...current,
          onboardingCompleted: true,
          onboardingStep: 'COMPLETED',
        } : current);
      }),
      resetToDefaults: vi.fn().mockImplementation(async () => {
        const resetSetup: WorkspaceSetup = {
          ...setup,
          onboardingCompleted: true,
          defaultPatientTemplate: null,
          defaultEncounterTemplate: null,
          chartConfigs: [],
          onboardingDraft: null,
        };
        workspaceStoreMock.currentSetup.set(resetSetup);
        return resetSetup;
      }),
    };

    await TestBed.configureTestingModule({
      imports: [OnboardingWizardComponent],
      providers: [
        provideRouter([]),
        { provide: WorkspaceStore, useValue: workspaceStoreMock },
        { provide: DoctorProfileService, useValue: { clearProfile: vi.fn() } },
        { provide: AuthService, useValue: { signOut: vi.fn() } },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture = TestBed.createComponent(OnboardingWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('shows the saved wizard step and its progress', () => {
    expect(component.activeStep().onboardingStep).toBe('PATIENT_PERSONAL_DATA');
    expect(component.activeStepIndex()).toBe(1);
  });

  it('saves the next step before moving forward', async () => {
    await component.goNext();

    expect(workspaceStoreMock.saveOnboardingDraft).toHaveBeenCalledWith(
      expect.objectContaining({
        specialtyId: 4,
        onboardingStep: 'PATIENT_FAMILY_HISTORY',
      })
    );
    expect(component.activeStep().onboardingStep).toBe('PATIENT_FAMILY_HISTORY');
  });

  it('includes patient-form edits in the checkpoint sent by Siguiente', async () => {
    const editedTemplate = JSON.parse(JSON.stringify(component.patientTemplate()!)) as WorkspaceSetup['defaultPatientTemplate'];
    editedTemplate!.schemaDefinition.categories[1].fields.push({
      key: 'familyHistoryNote',
      label: 'Antecedente relevante',
      type: 'TEXTAREA',
    });
    component.onPatientTemplateChange(editedTemplate!);

    await component.goNext();

    expect(workspaceStoreMock.saveOnboardingDraft).toHaveBeenCalledWith(
      expect.objectContaining({
        onboardingDraft: expect.objectContaining({
          patientTemplateSchema: expect.objectContaining({
            categories: expect.arrayContaining([
              expect.objectContaining({
                categoryKey: 'BACKGROUND_FAMILY',
                fields: expect.arrayContaining([
                  expect.objectContaining({ key: 'familyHistoryNote' }),
                ]),
              }),
            ]),
          }),
        }),
      })
    );
  });

  it('starts the consultation form from the specialty template and persists custom edits', async () => {
    workspaceStoreMock.currentSetup.update((current) => current ? {
      ...current,
      onboardingStep: 'ENCOUNTER_FORM',
      defaultEncounterTemplate: {
        name: 'Plantilla Pediátrica',
        templateType: 'ENCOUNTER',
        isDefault: true,
        schemaDefinition: {
          categories: [{
            categoryKey: 'VITAL_SIGNS_AND_SOMATOMETRY',
            title: 'Signos vitales pediátricos',
            enabled: true,
            fields: [{ key: 'weightKg', label: 'Peso', type: 'NUMBER' }],
          }],
        },
      },
    } : current);
    await component.ngOnInit();

    expect(component.encounterTemplate()?.schemaDefinition.categories[0].fields[0].key).toBe('weightKg');

    const editedTemplate = JSON.parse(JSON.stringify(component.encounterTemplate()!)) as WorkspaceSetup['defaultEncounterTemplate'];
    editedTemplate!.schemaDefinition.categories[0].fields.push({
      key: 'heightCm',
      label: 'Talla',
      type: 'NUMBER',
    });
    component.onEncounterTemplateChange(editedTemplate!);

    await component.goNext();

    expect(workspaceStoreMock.saveOnboardingDraft).toHaveBeenCalledWith(
      expect.objectContaining({
        onboardingStep: 'CHARTS',
        onboardingDraft: expect.objectContaining({
          customTemplateSchema: expect.objectContaining({
            categories: expect.arrayContaining([
              expect.objectContaining({
                fields: expect.arrayContaining([expect.objectContaining({ key: 'heightCm' })]),
              }),
            ]),
          }),
        }),
      })
    );
  });

  it('keeps selected chart mappings in the onboarding draft', async () => {
    workspaceStoreMock.currentSetup.update((current) => current ? {
      ...current,
      onboardingStep: 'CHARTS',
    } : current);
    await component.ngOnInit();

    await component.onChartConfigsSelected([{
      chartCode: 'WEIGHT_EVOLUTION',
      isActive: true,
      fieldMappings: { x: 'encounterDate', y: 'weightKg' },
    }]);

    expect(workspaceStoreMock.saveOnboardingDraft).toHaveBeenCalledWith(
      expect.objectContaining({
        onboardingStep: 'CHARTS',
        onboardingDraft: expect.objectContaining({
          chartConfigs: [expect.objectContaining({ chartCode: 'WEIGHT_EVOLUTION' })],
        }),
      })
    );
  });

  it('finalizes the setup atomically and redirects only after it succeeds', async () => {
    workspaceStoreMock.currentSetup.update((current) => current ? {
      ...current,
      onboardingStep: 'CHARTS',
    } : current);
    await component.ngOnInit();

    await component.finishOnboarding();

    expect(workspaceStoreMock.finishOnboarding).toHaveBeenCalledWith(expect.objectContaining({
      specialtyId: 4,
      patientTemplateSchema: expect.any(Object),
      customTemplateSchema: expect.any(Object),
    }));
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('preserves existing custom patient fields when opening wizard in edit mode', async () => {
    workspaceStoreMock.currentSetup.set({
      ...setup,
      onboardingCompleted: true,
      onboardingStep: 'COMPLETED',
      defaultPatientTemplate: {
        name: 'Formulario Personalizado Doctor',
        templateType: 'PATIENT_EXTRA',
        isDefault: true,
        schemaDefinition: {
          categories: [{
            categoryKey: 'CORE_DEMOGRAPHICS',
            title: 'Datos personales',
            enabled: true,
            fields: [
              { key: 'customAllergyTag', label: 'Alergia especial', type: 'TEXT' }
            ],
          }],
        },
      },
    });

    await component.ngOnInit();

    expect(component.isEditMode()).toBe(true);
    const personalFields = component.patientTemplate()?.schemaDefinition.categories[0].fields;
    expect(personalFields?.some((f) => f.key === 'customAllergyTag')).toBe(true);
  });

  it('resets templates and charts to factory defaults on confirmResetToDefaults', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    await component.confirmResetToDefaults();

    expect(workspaceStoreMock.resetToDefaults).toHaveBeenCalled();
    expect(component.successMessage()).toContain('restablecidos');
  });

  it('allows jumping between steps directly using goToStep', async () => {
    await component.goToStep(4); // ENCOUNTER_FORM

    expect(component.activeStepIndex()).toBe(4);
    expect(component.activeStep().onboardingStep).toBe('ENCOUNTER_FORM');
    expect(workspaceStoreMock.saveOnboardingDraft).toHaveBeenCalledWith(
      expect.objectContaining({ onboardingStep: 'ENCOUNTER_FORM' })
    );
  });
});
