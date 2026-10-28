import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject, of, throwError } from 'rxjs';
import { WorkspaceSetup } from '../models/workspace.model';
import { WizardDefinition } from '../models/wizard-definition.model';
import { DoctorSpecialtyService } from './doctor-specialty.service';
import { WorkspaceService } from './workspace.service';
import { WorkspaceStore } from './workspace.store';
import { FEATURE_FLAGS } from '../config/feature-flags';

describe('WorkspaceStore canonical lifecycle', () => {
  const definition: WizardDefinition = {
    schemaVersion: 1,
    patientForm: { categories: [] },
    encounterForm: { categories: [] },
    modulesConfig: { MEDICATION_CATALOG: false, AI_ASSISTANT: false, GROWTH_CHARTS: true },
  };
  const setup: WorkspaceSetup = {
    id: 1, version: 3, specialty: { id: 10, code: 'unseen_xyz', name: 'Especialidad nueva', description: null },
    experience: { specialtyId: 10, specialtyVersion: 0, patientRecordActions: ['EDIT_PATIENT', 'NEW_ENCOUNTER', 'VIEW_GROWTH', 'PRINT_DOCUMENT'], patientRecordTabs: ['SUMMARY', 'ENCOUNTERS'], navigation: ['DASHBOARD', 'PATIENTS', 'WIZARD'] },
    sourceWizardVersion: 1, draftSourceWizardVersion: null, definition, draftDefinition: null,
    onboardingCompleted: true, currentStepKey: 'completed',
  };
  let store: WorkspaceStore;
  let metadata: DoctorSpecialtyService;
  let service: {
    getCurrentSetup: ReturnType<typeof vi.fn>; getPreferences: ReturnType<typeof vi.fn>;
    selectSpecialty: ReturnType<typeof vi.fn>; saveOnboardingDraft: ReturnType<typeof vi.fn>;
    finishOnboarding: ReturnType<typeof vi.fn>; resetToDefaults: ReturnType<typeof vi.fn>;
    discardDraft: ReturnType<typeof vi.fn>; updateWorkspace: ReturnType<typeof vi.fn>;
    updateQuickNotes: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    service = {
      getCurrentSetup: vi.fn().mockReturnValue(of(setup)),
      getPreferences: vi.fn().mockReturnValue(of({ version: 3, patientColumnsConfig: { phone: false }, quickNotes: 'Nota' })),
      selectSpecialty: vi.fn().mockReturnValue(of(setup)),
      saveOnboardingDraft: vi.fn().mockReturnValue(of(setup)),
      finishOnboarding: vi.fn().mockReturnValue(of(setup)),
      resetToDefaults: vi.fn().mockReturnValue(of(setup)),
      discardDraft: vi.fn().mockReturnValue(of(setup)),
      updateWorkspace: vi.fn().mockReturnValue(of({ version: 4, patientColumnsConfig: { phone: true }, quickNotes: 'Nota' })),
      updateQuickNotes: vi.fn().mockReturnValue(of({ version: 4, patientColumnsConfig: { phone: false }, quickNotes: 'Nueva' })),
    };
    TestBed.configureTestingModule({ providers: [
      WorkspaceStore, DoctorSpecialtyService, { provide: WorkspaceService, useValue: service },
      { provide: PLATFORM_ID, useValue: 'browser' },
    ]});
    store = TestBed.inject(WorkspaceStore);
    metadata = TestBed.inject(DoctorSpecialtyService);
  });

  it('keeps exact server specialty and derives capabilities from effective configuration', async () => {
    const loaded = await store.loadSetup();
    expect(loaded).toEqual(setup);
    expect(metadata.specialtyLabel()).toBe('Especialidad nueva');
    expect(metadata.activeSpecialty()).toBe('unseen_xyz');
    expect(metadata.supportsGrowthCharts()).toBe(true);
    expect(store.isModuleActive('GROWTH_CHARTS')).toBe(true);
    expect(store.isModuleActive('UNKNOWN')).toBe(false);
    expect(store.preferences()).toBeNull();
  });

  it('composes navigation without changing the personal wizard and clears it with the session', async () => {
    await store.loadSetup();
    expect(store.navigation().map(item => item.path)).toEqual(['/dashboard', '/patients', '/onboarding/setup']);
    expect(store.hasNavigation('CALCULATORS')).toBe(false);
    store.setSetup({ ...setup, experience: { ...setup.experience, specialtyVersion: 5,
      navigation: ['DASHBOARD', 'CALCULATORS', 'PATIENTS', 'WIZARD'] } });
    expect(store.navigation().map(item => item.path)).toEqual(['/dashboard', '/patients', '/onboarding/setup']);
    expect(store.hasNavigation('CALCULATORS')).toBe(false);

    store.calculatorsEnabled.set(true);
    expect(store.navigation()[1].path).toBe('/calculators');
    expect(store.hasNavigation('CALCULATORS')).toBe(true);
    store.calculatorsEnabled.set(false);

    expect(store.definition()).toEqual(definition);
    expect(store.currentSetup()?.version).toBe(setup.version);
    store.clearSetup(); expect(store.navigation()).toEqual([]);
  });

  it('rejects an unknown or mismatched experience before replacing a valid workspace', () => {
    store.setSetup(setup);
    for (const experience of [
      { ...setup.experience, specialtyId: 999 },
      { ...setup.experience, navigation: ['DASHBOARD', 'PATIENTS', 'WIZARD', 'UNKNOWN'] },
      { ...setup.experience, navigation: ['DASHBOARD', 'PATIENTS'] },
      { ...setup.experience, navigation: ['DASHBOARD', 'PATIENTS', 'WIZARD', 'PATIENTS'] },
    ]) {
      expect(() => store.setSetup({ ...setup, experience } as WorkspaceSetup)).toThrow('experiencia');
      expect(store.currentSetup()).toEqual(setup);
    }
  });

  it('uses only the configured record modules independently of navigation and personal forms', () => {
    store.setSetup({ ...setup, experience: { ...setup.experience, patientRecordTabs: ['ENCOUNTERS', 'STUDIES', 'SUMMARY'] } });
    expect(store.patientRecordTabs()).toEqual(['ENCOUNTERS', 'STUDIES', 'SUMMARY']);
    expect(store.hasRecordTab('VACCINATION')).toBe(false);
    expect(store.definition()).toEqual(definition);
    expect(store.currentSetup()?.version).toBe(setup.version);
    expect(store.navigation().map(item => item.id)).toEqual(setup.experience.navigation);
    store.clearSetup();
    expect(store.patientRecordTabs()).toEqual([]);
    expect(store.hasRecordTab('SUMMARY')).toBe(false);
  });

  it('rejects invalid record compositions before replacing the workspace', () => {
    store.setSetup(setup);
    for (const patientRecordTabs of [undefined, null, 'SUMMARY', [], ['SUMMARY'], ['SUMMARY', 'ENCOUNTERS', 'UNKNOWN'], ['SUMMARY', 'ENCOUNTERS', 'SUMMARY'], ['SUMMARY', 'ENCOUNTERS', 4]]) {
      expect(() => store.setSetup({ ...setup, experience: { ...setup.experience, patientRecordTabs } } as WorkspaceSetup)).toThrow('experiencia');
      expect(store.currentSetup()).toEqual(setup);
    }
  });

  it('keeps action composition separate from tabs, navigation and personal wizard', () => {
    store.setSetup({ ...setup, experience: { ...setup.experience, patientRecordActions: ['PRINT_DOCUMENT','EDIT_PATIENT'] } });
    expect(store.patientRecordActions()).toEqual(['PRINT_DOCUMENT','EDIT_PATIENT']);
    expect(store.hasRecordAction('NEW_ENCOUNTER')).toBe(false);
    expect(store.patientRecordTabs()).toEqual(setup.experience.patientRecordTabs);
    expect(store.definition()).toEqual(definition);
    expect(store.currentSetup()?.version).toBe(setup.version);
    store.setSetup({ ...setup, experience: { ...setup.experience, patientRecordActions: [] } });
    expect(store.patientRecordActions()).toEqual([]);
    store.clearSetup(); expect(store.hasRecordAction('EDIT_PATIENT')).toBe(false);
  });
  it('rejects missing, duplicate, unknown or malformed actions before replacing configuration', () => {
    store.setSetup(setup);
    for(const patientRecordActions of [undefined,null,'EDIT_PATIENT',['UNKNOWN'],['EDIT_PATIENT','EDIT_PATIENT'],[4]]) {
      expect(()=>store.setSetup({ ...setup, experience:{...setup.experience,patientRecordActions} } as WorkspaceSetup)).toThrow('experiencia');
      expect(store.currentSetup()).toEqual(setup);
    }
  });
  it('keeps null workspace distinct from failed loads and allows retry', async () => {
    service.getCurrentSetup.mockReturnValueOnce(throwError(() => new Error('Offline')));
    await expect(store.loadSetup()).rejects.toThrow('Offline');
    expect(store.loaded()).toBe(false);
    expect(store.error()).toBe('Offline');
    service.getCurrentSetup.mockReturnValueOnce(of(null));
    expect(await store.loadSetup()).toBeNull();
    expect(store.loaded()).toBe(true);
    expect(store.error()).toBeNull();
  });

  it('shares a pending load even if a second caller forces refresh', async () => {
    const response = new Subject<WorkspaceSetup | null>();
    service.getCurrentSetup.mockReturnValue(response);
    const first = store.loadSetup();
    const second = store.loadSetup(true);
    expect(service.getCurrentSetup).toHaveBeenCalledTimes(1);
    response.next(setup);
    expect(await first).toEqual(setup);
    expect(await second).toEqual(setup);
  });

  it('discarded account responses cannot restore identity or overwrite a newer session', async () => {
    const response = new Subject<WorkspaceSetup | null>();
    service.getCurrentSetup.mockReturnValueOnce(response);
    const old = store.loadSetup().catch(error => error);
    store.clearSetup();
    const newSetup = { ...setup, id: 2, specialty: { ...setup.specialty, id: 20, name: 'Otro médico' }, experience: { ...setup.experience, specialtyId: 20 } };
    service.getCurrentSetup.mockReturnValueOnce(of(newSetup));
    await store.loadSetup();
    response.next(setup);
    expect(await old).toBeInstanceOf(Error);
    expect(store.currentSetup()).toEqual(newSetup);
    expect(metadata.specialtyLabel()).toBe('Otro médico');
  });

  it('rejects concurrent writes instead of silently replaying stale versions', async () => {
    store.setSetup(setup);
    const response = new Subject<WorkspaceSetup>();
    service.resetToDefaults.mockReturnValue(response);
    const first = store.resetToDefaults(3);
    await expect(store.finishOnboarding(3)).rejects.toThrow('guardado');
    expect(service.finishOnboarding).not.toHaveBeenCalled();
    response.next({ ...setup, version: 4, draftDefinition: definition, draftSourceWizardVersion: 2 });
    await first;
    expect(store.currentSetup()?.version).toBe(4);
  });

  it('a late write after clear does not change the next account', async () => {
    store.setSetup(setup);
    const response = new Subject<WorkspaceSetup>();
    service.finishOnboarding.mockReturnValue(response);
    const old = store.finishOnboarding(3).catch(error => error);
    store.clearSetup();
    const next = { ...setup, id: 2, version: 0 };
    store.setSetup(next);
    response.next({ ...setup, version: 4 });
    expect(await old).toBeInstanceOf(Error);
    expect(store.currentSetup()).toEqual(next);
    expect(store.error()).toBeNull();
  });

  it('does not discard the effective definition on a failed draft mutation', async () => {
    store.setSetup(setup);
    service.saveOnboardingDraft.mockReturnValue(throwError(() => ({ status: 409, error: { message: 'Versión desactualizada' } })));
    await expect(store.saveOnboardingDraft({ expectedVersion: 3, definition, currentStepKey: 'encounter' })).rejects.toBeTruthy();
    expect(store.currentSetup()).toEqual(setup);
    expect(store.error()).toBe('Versión desactualizada');
    expect(store.isMutating()).toBe(false);
  });

  it('preferences remain separate and update shared resource version', async () => {
    store.setSetup(setup);
    await store.loadPreferences();
    expect(store.quickNotes()).toBe('Nota');
    expect(store.isColumnVisible('phone')).toBe(false);
    service.getCurrentSetup.mockReturnValueOnce(of({ ...setup, version: 4 }));
    await store.updateWorkspace({ expectedVersion: 3, patientColumnsConfig: { phone: true } });
    expect(service.updateWorkspace).toHaveBeenCalledWith({ expectedVersion: 3, patientColumnsConfig: { phone: true } });
    expect(store.currentSetup()?.version).toBe(4);
    expect(store.definition()).toEqual(definition);
    expect(store.isColumnVisible('phone')).toBe(true);
  });

  it('a newer preferences revision reloads the matching full definition without forging its version', async () => {
    store.setSetup(setup);
    const newerDefinition = structuredClone(definition);
    newerDefinition.modulesConfig.GROWTH_CHARTS = false;
    service.getPreferences.mockReturnValue(of({ version: 9, patientColumnsConfig: { phone: true }, quickNotes: null }));
    service.getCurrentSetup.mockReturnValue(of({ ...setup, version: 9, definition: newerDefinition }));
    await store.loadPreferences(true);
    expect(store.currentSetup()?.version).toBe(9);
    expect(store.definition()).toEqual(newerDefinition);
    expect(metadata.supportsGrowthCharts()).toBe(false);
  });

  it('a committed preferences write whose full refresh fails does not advance a stale definition token', async () => {
    store.setSetup(setup);
    service.getCurrentSetup.mockReturnValue(throwError(() => new Error('Refresh failed')));
    await expect(store.updateQuickNotes('Nueva')).rejects.toThrow('Refresh failed');
    expect(store.currentSetup()?.version).toBe(3);
    expect(store.definition()).toEqual(definition);
    expect(store.loaded()).toBe(false);
    expect(store.error()).toBe('Refresh failed');
  });

  it('restoring defaults modifies draft while effective capabilities remain unchanged', async () => {
    store.setSetup(setup);
    const draft = structuredClone(definition);
    draft.modulesConfig.GROWTH_CHARTS = false;
    service.resetToDefaults.mockReturnValue(of({ ...setup, version: 4, draftDefinition: draft, draftSourceWizardVersion: 2 }));
    await store.resetToDefaults(3);
    expect(service.resetToDefaults).toHaveBeenCalledWith({ expectedVersion: 3 });
    expect(store.definition()?.modulesConfig.GROWTH_CHARTS).toBe(true);
    expect(metadata.supportsGrowthCharts()).toBe(true);
  });

  it('clones payload and server responses so editing local values cannot alter store state', async () => {
    const loaded = await store.loadSetup();
    loaded!.specialty.name = 'Changed outside store';
    loaded!.definition!.modulesConfig.GROWTH_CHARTS = false;
    expect(store.currentSetup()?.specialty.name).toBe('Especialidad nueva');
    expect(store.isModuleActive('GROWTH_CHARTS')).toBe(true);
  });

  it('clears preferences, capability flags and error state together', async () => {
    await store.loadSetup();
    await store.loadPreferences();
    store.clearSetup();
    expect(store.currentSetup()).toBeNull();
    expect(store.preferences()).toBeNull();
    expect(store.loaded()).toBe(false);
    expect(metadata.specialty()).toBeNull();
    expect(metadata.supportsGrowthCharts()).toBe(false);
  });
});
