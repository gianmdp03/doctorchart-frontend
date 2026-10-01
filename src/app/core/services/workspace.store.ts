import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom, timeout } from 'rxjs';
import { WorkspaceService } from './workspace.service';
import { DoctorSpecialtyService } from './doctor-specialty.service';
import {
  FinishOnboardingRequest,
  FormTemplate,
  ModuleConfig,
  PatientColumnsConfig,
  QuickNotesUpdateRequest,
  SaveOnboardingDraftRequest,
  WorkspaceSetup,
  WorkspaceUpdateRequest,
} from '../models/workspace.model';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceStore {
  private readonly workspaceService = inject(WorkspaceService);
  private readonly doctorSpecialtyService = inject(DoctorSpecialtyService);
  private readonly platformId = inject(PLATFORM_ID);

  // State Signals
  readonly currentSetup = signal<WorkspaceSetup | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly loaded = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  private setupPromise: Promise<WorkspaceSetup | null> | null = null;

  // Computed Signals
  readonly isOnboardingCompleted = computed<boolean>(() => {
    return this.currentSetup()?.onboardingCompleted ?? false;
  });

  readonly activeModules = computed<ModuleConfig>(() => {
    return this.currentSetup()?.modulesConfig ?? {};
  });

  readonly patientVisibleColumns = computed<PatientColumnsConfig>(() => {
    return this.currentSetup()?.patientColumnsConfig ?? {};
  });

  readonly defaultTemplate = computed<FormTemplate | null>(() => {
    return this.currentSetup()?.defaultEncounterTemplate ?? null;
  });

  readonly defaultPatientTemplate = computed<FormTemplate | null>(() => {
    return this.currentSetup()?.defaultPatientTemplate ?? null;
  });

  readonly specialtyCode = computed<string | null>(() => {
    return this.currentSetup()?.specialtyCode ?? null;
  });

  readonly specialtyDisplayName = computed<string | null>(() => {
    return this.currentSetup()?.specialtyDisplayName ?? null;
  });

  private syncSpecialtyState(setup: WorkspaceSetup | null): void {
    if (setup?.specialtyCode) {
      this.doctorSpecialtyService.setSpecialty(setup.specialtyCode, setup.specialtyDisplayName);
    }
  }

  /**
   * Evaluates if a given operational module is active in the doctor's workspace.
   */
  isModuleActive(moduleCode: string): boolean {
    const modules = this.activeModules();
    return modules[moduleCode] !== false && !!modules[moduleCode];
  }

  /**
   * Evaluates if a specific patient column is visible in tables and records.
   */
  isColumnVisible(columnKey: string): boolean {
    const columns = this.patientVisibleColumns();
    return columns[columnKey] !== false;
  }

  /**
   * Loads or refreshes the current setup from the backend.
   */
  async loadSetup(force = false): Promise<WorkspaceSetup | null> {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    if (this.setupPromise && !force) {
      return this.setupPromise;
    }

    this.setupPromise = (async () => {
      this.isLoading.set(true);
      this.error.set(null);
      try {
        const setup = await firstValueFrom(
          this.workspaceService.getCurrentSetup().pipe(timeout(6000))
        );
        this.currentSetup.set(setup);
        this.syncSpecialtyState(setup);
        return setup;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error al cargar workspace';
        this.error.set(msg);
        return null;
      } finally {
        this.isLoading.set(false);
        this.loaded.set(true);
        this.setupPromise = null;
      }
    })();

    return this.setupPromise;
  }

  clearSetup(): void {
    this.currentSetup.set(null);
    this.loaded.set(false);
    this.error.set(null);
    this.setupPromise = null;
  }

  /**
   * Explicitly sets the local setup state.
   */
  setSetup(setup: WorkspaceSetup): void {
    this.currentSetup.set(setup);
    this.loaded.set(true);
    this.syncSpecialtyState(setup);
  }

  /**
   * Finalizes the onboarding wizard and updates the workspace state.
   */
  async finishOnboarding(payload: FinishOnboardingRequest): Promise<WorkspaceSetup> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const result = await firstValueFrom(this.workspaceService.finishOnboarding(payload));
      this.currentSetup.set(result);
      this.loaded.set(true);
      this.syncSpecialtyState(result);
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al finalizar onboarding';
      this.error.set(msg);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Persists the current wizard checkpoint without granting access to clinical modules.
   */
  async saveOnboardingDraft(payload: SaveOnboardingDraftRequest): Promise<WorkspaceSetup> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const result = await firstValueFrom(this.workspaceService.saveOnboardingDraft(payload));
      this.currentSetup.set(result);
      this.loaded.set(true);
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al guardar el avance del onboarding';
      this.error.set(msg);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  async updateQuickNotes(content: string): Promise<WorkspaceSetup> {
    const payload: QuickNotesUpdateRequest = { content };
    const result = await firstValueFrom(this.workspaceService.updateQuickNotes(payload));
    this.currentSetup.set(result);
    this.loaded.set(true);
    return result;
  }

  /**
   * Updates workspace configuration in EDIT mode.
   */
  async updateWorkspace(payload: WorkspaceUpdateRequest): Promise<WorkspaceSetup> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const result = await firstValueFrom(this.workspaceService.updateWorkspace(payload));
      this.currentSetup.set(result);
      this.loaded.set(true);
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al actualizar workspace';
      this.error.set(msg);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Resets workspace configuration, custom templates and chart mappings to factory defaults.
   */
  async resetToDefaults(): Promise<WorkspaceSetup> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const result = await firstValueFrom(this.workspaceService.resetToDefaults());
      this.currentSetup.set(result);
      this.loaded.set(true);
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al restablecer valores de fábrica';
      this.error.set(msg);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }
}
