import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Component, input, output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { OnboardingWizardComponent } from './onboarding-wizard.component';
import { FormFieldEditorComponent } from '../../form-field-editor/form-field-editor.component';
import { WorkspaceStore } from '../../../core/services/workspace.store';
import { DoctorProfileService } from '../../../core/services/doctor-profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { WorkspaceSetup } from '../../../core/models/workspace.model';
import { WizardFormDefinition, WizardSection } from '../../../core/models/wizard-definition.model';
import { customSpecialtyFixture } from '../testing/custom-specialty.fixture';

@Component({
  selector: 'app-form-field-editor',
  template: '<div class="test-editor">{{ section() }}: {{ definition()?.categories?.length }}</div>',
})
class TestFieldEditor {
  readonly definition = input<WizardFormDefinition | null>(null);
  readonly section = input<WizardSection>('patientForm');
  readonly selectedCategoryKey = input<string | null>(null);
  readonly readonly = input(false);
  readonly definitionChange = output<WizardFormDefinition>();
  readonly categorySelected = output<string>();
}

describe('OnboardingWizardComponent', () => {
  let component: OnboardingWizardComponent;
  let fixture: ComponentFixture<OnboardingWizardComponent>;
  let remote: WorkspaceSetup;
  let store: {
    loadSetup: ReturnType<typeof vi.fn>;
    saveOnboardingDraft: ReturnType<typeof vi.fn>;
    finishOnboarding: ReturnType<typeof vi.fn>;
    resetToDefaults: ReturnType<typeof vi.fn>;
    discardDraft: ReturnType<typeof vi.fn>;
    clearSetup: ReturnType<typeof vi.fn>;
  };
  let navigate: ReturnType<typeof vi.fn>;
  const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
  const base: WorkspaceSetup = {
    id: 12, version: 10,
    specialty: { id: 81, code: customSpecialtyFixture.code, name: customSpecialtyFixture.name, description: customSpecialtyFixture.description },
    experience: { specialtyId: 81, specialtyVersion: 0, patientRecordActions: ['EDIT_PATIENT', 'NEW_ENCOUNTER', 'VIEW_GROWTH', 'PRINT_DOCUMENT'], patientRecordTabs: ['SUMMARY', 'ENCOUNTERS'], navigation: ['DASHBOARD', 'PATIENTS', 'WIZARD'] },
    sourceWizardVersion: null, draftSourceWizardVersion: 1, onboardingCompleted: false,
    currentStepKey: 'patient:new_patient_category', definition: null,
    draftDefinition: clone(customSpecialtyFixture.definition),
  };

  beforeEach(async () => {
    remote = clone(base);
    navigate = vi.fn().mockResolvedValue(true);
    store = {
      loadSetup: vi.fn().mockImplementation(async () => clone(remote)),
      saveOnboardingDraft: vi.fn().mockImplementation(async request => {
        remote = {
          ...remote, version: remote.version + 1, draftDefinition: clone(request.definition),
          draftSourceWizardVersion: remote.draftSourceWizardVersion ?? remote.sourceWizardVersion,
          currentStepKey: request.currentStepKey,
        };
        return clone(remote);
      }),
      finishOnboarding: vi.fn().mockImplementation(async () => {
        remote = {
          ...remote, version: remote.version + 1, definition: remote.draftDefinition,
          sourceWizardVersion: remote.draftSourceWizardVersion, draftDefinition: null,
          draftSourceWizardVersion: null, currentStepKey: 'completed', onboardingCompleted: true,
        };
        return clone(remote);
      }),
      resetToDefaults: vi.fn().mockImplementation(async () => {
        remote = {
          ...remote, version: remote.version + 1, draftDefinition: clone(customSpecialtyFixture.definition),
          draftSourceWizardVersion: 2, currentStepKey: 'patient:new_patient_category',
        };
        return clone(remote);
      }),
      discardDraft: vi.fn().mockImplementation(async () => {
        remote = { ...remote, version: remote.version + 1, draftDefinition: null, draftSourceWizardVersion: null, currentStepKey: 'completed' };
        return clone(remote);
      }),
      clearSetup: vi.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [OnboardingWizardComponent],
      providers: [
        { provide: Router, useValue: { navigate } },
        { provide: WorkspaceStore, useValue: store },
        { provide: DoctorProfileService, useValue: { clearProfile: vi.fn() } },
        { provide: AuthService, useValue: { signOut: vi.fn().mockResolvedValue({ error: null }) } },
      ],
    }).overrideComponent(OnboardingWizardComponent, {
      remove: { imports: [FormFieldEditorComponent] }, add: { imports: [TestFieldEditor] },
    }).compileComponents();
    fixture = TestBed.createComponent(OnboardingWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });
  it('keeps the saved draft and clinical setup if logout returns an error', async () => {
    vi.mocked(TestBed.inject(AuthService).signOut).mockResolvedValue({error:new Error('offline')});
    fixture.nativeElement.querySelector('.signout-button').click(); await fixture.whenStable(); fixture.detectChanges();
    expect(store.saveOnboardingDraft).toHaveBeenCalled();
    expect(store.clearSetup).not.toHaveBeenCalled();
    expect(TestBed.inject(DoctorProfileService).clearProfile).not.toHaveBeenCalled();
    expect(component.errorMessage()).toContain('No pudimos cerrar');
    expect(component.isSaving()).toBe(false);
  });

  function completed(): void {
    remote = {
      ...clone(base), onboardingCompleted: true, currentStepKey: 'completed',
      definition: clone(customSpecialtyFixture.definition), sourceWizardVersion: 1,
      draftDefinition: null, draftSourceWizardVersion: null,
    };
  }

  it('renders an unfamiliar backend category and a common History section without local defaults', () => {
    expect(component.steps().map(step => step.key)).toEqual(['specialty', 'patient:new_patient_category', 'encounter']);
    expect(component.definition()).toEqual(customSpecialtyFixture.definition);
    expect(fixture.nativeElement.textContent).toContain(customSpecialtyFixture.name);
    expect(fixture.nativeElement.textContent).toContain('Categoría inédita de prueba');
    expect(fixture.nativeElement.textContent).toContain('Historia Clínica');
    expect(component.activeStepKey()).toBe('patient:new_patient_category');
  });

  it('keeps the category manager reachable before onboarding when no patient categories are enabled', () => {
    const patient = clone(component.definition()!.patientForm);
    patient.categories.forEach(category => category.enabled = false);
    component.onPatientDefinitionChange(patient);
    fixture.detectChanges();
    expect(component.steps().map(step => step.key)).toEqual(['specialty', 'encounter']);
    expect(component.showPatientCategories()).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Categorías de la ficha del paciente');
    patient.categories.push({ key: 'brand_new', title: 'Categoría nueva', enabled: true, fields: [] });
    component.onPatientDefinitionChange(patient);
    expect(component.steps().map(step => step.key)).toContain('patient:brand_new');
  });

  it('selects enabled editor categories locally without saving or losing the editing form', () => {
    const patient = clone(component.definition()!.patientForm);
    patient.categories[0].title = 'Edición pendiente';
    patient.categories.push({ key: 'another_enabled', title: 'Otra categoría', enabled: true, fields: [] });
    patient.categories.push({ key: 'disabled_category', title: 'Categoría desactivada', enabled: false, fields: [] });
    component.onPatientDefinitionChange(patient);
    component.onPatientCategorySelected('another_enabled');
    expect(component.activeStepKey()).toBe('patient:another_enabled');
    expect(component.definition()!.patientForm).toEqual(patient);
    expect(component.workspace()?.version).toBe(10);
    component.onPatientCategorySelected('disabled_category');
    expect(component.activeStepKey()).toBe('patient:another_enabled');
    expect(store.saveOnboardingDraft).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  it('moves only after successful draft persistence and uses the returned version', async () => {
    await component.goNext();
    expect(store.saveOnboardingDraft).toHaveBeenCalledWith({
      expectedVersion: 10, definition: customSpecialtyFixture.definition, currentStepKey: 'encounter',
    });
    expect(component.activeStepKey()).toBe('encounter');
    expect(component.workspace()?.version).toBe(11);
    expect(store.finishOnboarding).not.toHaveBeenCalled();
  });

  it('keeps the current step and local changes if saving navigation fails', async () => {
    const changed = clone(component.definition()!.patientForm);
    changed.categories[0].title = 'Edición local';
    component.onPatientDefinitionChange(changed);
    store.saveOnboardingDraft.mockRejectedValueOnce({ status: 500 });
    await component.goNext();
    expect(component.activeStepKey()).toBe('patient:new_patient_category');
    expect(component.definition()?.patientForm.categories[0].title).toBe('Edición local');
    expect(component.workspace()?.version).toBe(10);
    expect(navigate).not.toHaveBeenCalled();
  });

  it('keeps effective settings unchanged while saving a personal draft', async () => {
    completed();
    await component.loadInitial(true);
    const effective = clone(remote.definition);
    const changed = clone(component.definition()!.patientForm);
    changed.categories[0].title = 'Solo mi borrador';
    component.onPatientDefinitionChange(changed);
    await component.saveProgress();
    expect(component.workspace()?.definition).toEqual(effective);
    expect(component.workspace()?.draftDefinition?.patientForm.categories[0].title).toBe('Solo mi borrador');
    expect(store.finishOnboarding).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  it('explicit apply saves the draft then applies its returned version', async () => {
    await component.finishOnboarding();
    expect(store.saveOnboardingDraft).toHaveBeenCalledWith(expect.objectContaining({ expectedVersion: 10 }));
    expect(store.finishOnboarding).toHaveBeenCalledWith(11);
    expect(component.workspace()?.definition).toEqual(customSpecialtyFixture.definition);
    expect(component.workspace()?.draftDefinition).toBeNull();
    expect(navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('exit saves the pending draft without automatically applying it', async () => {
    completed();
    await component.loadInitial(true);
    await component.exitWizard();
    expect(store.saveOnboardingDraft).toHaveBeenCalledOnce();
    expect(store.finishOnboarding).not.toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('explicit discard restores the effective configuration and cancels local edits', async () => {
    completed();
    await component.loadInitial(true);
    const changed = clone(component.definition()!.patientForm);
    changed.categories[0].title = 'Cambio para descartar';
    component.onPatientDefinitionChange(changed);
    await component.cancelWizard();
    expect(store.discardDraft).toHaveBeenCalledWith(10);
    expect(component.definition()?.patientForm.categories[0].title).toBe('Categoría inédita de prueba');
    expect(store.finishOnboarding).not.toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('reset uses the backend draft while preserving applied settings until explicit apply', async () => {
    completed();
    remote.definition!.patientForm.categories[0].title = 'Mi configuración activa';
    await component.loadInitial(true);
    await component.confirmResetToDefaults();
    expect(store.resetToDefaults).toHaveBeenCalledWith(10);
    expect(component.definition()?.patientForm.categories[0].title).toBe('Categoría inédita de prueba');
    expect(component.workspace()?.definition?.patientForm.categories[0].title).toBe('Mi configuración activa');
    expect(component.workspace()?.sourceWizardVersion).toBe(1);
    expect(component.workspace()?.draftSourceWizardVersion).toBe(2);
    expect(store.finishOnboarding).not.toHaveBeenCalled();
  });

  it('preserves editing content and pinned version through conflict and server review', async () => {
    const changed = clone(component.definition()!.patientForm);
    changed.categories[0].title = 'No perder estos cambios';
    component.onPatientDefinitionChange(changed);
    store.saveOnboardingDraft.mockRejectedValueOnce({ status: 409, error: { code: 'VERSION_CONFLICT' } });
    await component.saveProgress();
    expect(component.hasConflict()).toBe(true);
    expect(component.workspace()?.version).toBe(10);
    expect(component.definition()?.patientForm.categories[0].title).toBe('No perder estos cambios');
    remote.version = 22;
    remote.draftDefinition!.patientForm.categories[0].title = 'Servidor actualizado';
    await component.reviewServerCopy();
    expect(store.loadSetup).toHaveBeenLastCalledWith(true);
    expect(component.workspace()?.version).toBe(10);
    expect(component.definition()?.patientForm.categories[0].title).toBe('No perder estos cambios');
    await component.saveProgress();
    expect(store.saveOnboardingDraft).toHaveBeenCalledTimes(1);
    await component.useServerCopy();
    expect(component.hasConflict()).toBe(false);
    expect(component.workspace()?.version).toBe(22);
    expect(component.definition()?.patientForm.categories[0].title).toBe('Servidor actualizado');
  });

  it('reports other conflicts without calling them concurrent edits', async () => {
    store.finishOnboarding.mockRejectedValue({ status: 409, error: { code: 'NO_DRAFT_TO_APPLY', message: 'No hay un borrador para aplicar.' } });
    await component.finishOnboarding();
    expect(component.hasConflict()).toBe(false);
    expect(component.errorMessage()).toBe('No hay un borrador para aplicar.');
    expect(component.definition()).toEqual(customSpecialtyFixture.definition);
    expect(navigate).not.toHaveBeenCalled();
  });
});
