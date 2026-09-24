import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { WorkspaceService } from './workspace.service';
import {
  DoctorChartConfig,
  FinishOnboardingRequest,
  FormTemplate,
  ModuleConfig,
  PatientColumnsConfig,
  WorkspaceSetup,
  WorkspaceUpdateRequest,
} from '../models/workspace.model';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceStore {
  private readonly workspaceService = inject(WorkspaceService);
  private readonly platformId = inject(PLATFORM_ID);

  // State Signals
  readonly currentSetup = signal<WorkspaceSetup | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

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

  readonly chartConfigs = computed<DoctorChartConfig[]>(() => {
    return this.currentSetup()?.chartConfigs ?? [];
  });

  readonly specialtyCode = computed<string | null>(() => {
    return this.currentSetup()?.specialtyCode ?? null;
  });

  readonly specialtyDisplayName = computed<string | null>(() => {
    return this.currentSetup()?.specialtyDisplayName ?? null;
  });

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
  async loadSetup(): Promise<WorkspaceSetup | null> {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    this.isLoading.set(true);
    this.error.set(null);
    try {
      const setup = await firstValueFrom(this.workspaceService.getCurrentSetup());
      this.currentSetup.set(setup);
      return setup;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al cargar workspace';
      this.error.set(msg);
      return null;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Explicitly sets the local setup state.
   */
  setSetup(setup: WorkspaceSetup): void {
    this.currentSetup.set(setup);
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
   * Updates workspace configuration in EDIT mode.
   */
  async updateWorkspace(payload: WorkspaceUpdateRequest): Promise<WorkspaceSetup> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const result = await firstValueFrom(this.workspaceService.updateWorkspace(payload));
      this.currentSetup.set(result);
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
   * Saves doctor chart slot mappings.
   */
  async saveChartConfigs(configs: DoctorChartConfig[]): Promise<DoctorChartConfig[]> {
    this.isLoading.set(true);
    try {
      const saved = await firstValueFrom(this.workspaceService.saveDoctorChartConfigs(configs));
      this.currentSetup.update((current) => {
        if (!current) return null;
        return {
          ...current,
          chartConfigs: saved,
        };
      });
      return saved;
    } finally {
      this.isLoading.set(false);
    }
  }
}
