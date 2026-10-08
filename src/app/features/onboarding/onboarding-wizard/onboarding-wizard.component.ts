import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { DoctorProfileService } from '../../../core/services/doctor-profile.service';
import { WorkspaceStore } from '../../../core/services/workspace.store';
import { WorkspaceSetup } from '../../../core/models/workspace.model';
import { WizardDefinition, WizardFormDefinition, WizardStepKey } from '../../../core/models/wizard-definition.model';
import { FormFieldEditorComponent } from '../../form-field-editor/form-field-editor.component';

type EditableStepKey = Exclude<WizardStepKey, 'completed'>;
interface WizardStep {
  key: EditableStepKey;
  title: string;
  kind: 'specialty' | 'patient' | 'encounter';
  categoryKey?: string;
}

@Component({
  selector: 'app-onboarding-wizard',
  imports: [FormFieldEditorComponent],
  templateUrl: './onboarding-wizard.component.html',
  styleUrl: './onboarding-wizard.component.css',
})
export class OnboardingWizardComponent implements OnInit {
  private readonly workspaceStore = inject(WorkspaceStore);
  private readonly doctorProfileService = inject(DoctorProfileService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly workspace = signal<WorkspaceSetup | null>(null);
  readonly definition = signal<WizardDefinition | null>(null);
  readonly activeStepKey = signal<EditableStepKey>('encounter');
  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly hasConflict = signal(false);
  readonly serverCopy = signal<WorkspaceSetup | null>(null);
  readonly serverCopyLoaded = signal(false);
  readonly showPatientCategories = signal(false);
  readonly showResetConfirmation = signal(false);
  readonly showDiscardConfirmation = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly isEditMode = computed(() => this.workspace()?.onboardingCompleted ?? false);
  readonly editorReadonly = computed(() => this.isLoading() || this.isSaving() || this.hasConflict());
  readonly steps = computed<WizardStep[]>(() => [
    { key: 'specialty', title: 'Especialidad médica', kind: 'specialty' },
    ...(this.definition()?.patientForm.categories.filter(category => category.enabled).map(category => ({
      key: `patient:${category.key}` as EditableStepKey, title: category.title, kind: 'patient' as const, categoryKey: category.key,
    })) ?? []),
    { key: 'encounter', title: 'Historia Clínica', kind: 'encounter' },
  ]);
  readonly activeStepIndex = computed(() => this.steps().findIndex(step => step.key === this.activeStepKey()));
  readonly activeStep = computed<WizardStep>(() => this.steps().find(step => step.key === this.activeStepKey()) ?? {
    key: this.activeStepKey(), title: 'Categorías de la ficha', kind: 'patient',
  });
  readonly isLastStep = computed(() => this.activeStepKey() === 'encounter');
  readonly progressPercentage = computed(() => {
    const total = this.steps().length;
    if (total <= 0) return 0;
    const current = this.activeStepIndex();
    if (current < 0) return 0;
    return Math.min(100, Math.round(((current + 1) / total) * 100));
  });

  async ngOnInit(): Promise<void> { await this.loadInitial(); }

  async loadInitial(force = false): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      const workspace = await this.workspaceStore.loadSetup(force);
      if (!workspace || (!workspace.onboardingCompleted && workspace.currentStepKey === 'specialty')) {
        await this.router.navigate(['/onboarding/select-specialty']);
        return;
      }
      this.acceptWorkspace(workspace);
    } catch (error: unknown) {
      this.errorMessage.set(this.errorText(error, 'No pudimos cargar tu configuración. Intentá nuevamente.'));
    } finally {
      this.isLoading.set(false);
    }
  }

  onPatientDefinitionChange(form: WizardFormDefinition): void {
    if (this.editorReadonly()) return;
    this.definition.update(current => current ? { ...current, patientForm: this.copy(form) } : current);
    if (this.activeStepIndex() < 0) this.showPatientCategories.set(true);
    this.successMessage.set(null);
  }

  onPatientCategorySelected(key: string): void {
    if (this.editorReadonly()) return;
    const category = this.definition()?.patientForm.categories.find(category => category.key === key);
    if (category?.enabled) this.activeStepKey.set(`patient:${category.key}`);
  }

  onEncounterDefinitionChange(form: WizardFormDefinition): void {
    if (this.editorReadonly()) return;
    this.definition.update(current => current ? { ...current, encounterForm: this.copy(form) } : current);
    this.successMessage.set(null);
  }

  async goToStep(index: number): Promise<void> {
    const step = this.steps()[index];
    if (!step || this.editorReadonly() || (step.kind === 'specialty' && this.isEditMode())) return;
    const saved = await this.saveDraft(step.key);
    if (saved && step.kind === 'specialty') await this.router.navigate(['/onboarding/select-specialty']);
  }

  async goNext(): Promise<void> {
    const index = this.activeStepIndex();
    await this.goToStep(index < 0 ? this.steps().length - 1 : index + 1);
  }

  async goPrevious(): Promise<void> {
    const index = this.activeStepIndex();
    if (index <= 1 && this.isEditMode()) return;
    await this.goToStep(index - 1);
  }

  async saveProgress(): Promise<void> {
    if (await this.saveDraft(this.activeStepKey())) {
      this.successMessage.set('Borrador guardado. La configuración activa se conserva hasta aplicar los cambios.');
    }
  }

  async finishOnboarding(): Promise<void> {
    if (this.editorReadonly()) return;
    const saved = await this.saveDraft(this.activeStepKey());
    if (!saved) return;
    this.isSaving.set(true);
    try {
      const applied = await this.workspaceStore.finishOnboarding(saved.version);
      this.acceptWorkspace(applied);
      await this.router.navigate(['/dashboard']);
    } catch (error: unknown) {
      this.handleWriteError(error, 'El borrador está guardado, pero no pudimos aplicar los cambios. Revisá los campos e intentá nuevamente.');
    } finally {
      this.isSaving.set(false);
    }
  }

  async exitWizard(): Promise<void> {
    if (!this.isEditMode() || this.editorReadonly()) return;
    if (await this.saveDraft(this.activeStepKey())) await this.router.navigate(['/dashboard']);
  }

  async cancelWizard(): Promise<void> {
    const workspace = this.workspace();
    if (!workspace || !this.isEditMode() || this.editorReadonly()) return;
    this.isSaving.set(true);
    this.errorMessage.set(null);
    try {
      const restored = await this.workspaceStore.discardDraft(workspace.version);
      this.acceptWorkspace(restored);
      this.showDiscardConfirmation.set(false);
      await this.router.navigate(['/dashboard']);
    } catch (error: unknown) {
      this.handleWriteError(error, 'No pudimos descartar el borrador. Tus cambios locales siguen visibles.');
    } finally {
      this.isSaving.set(false);
    }
  }

  async confirmResetToDefaults(): Promise<void> {
    const workspace = this.workspace();
    if (!workspace || this.editorReadonly()) return;
    this.isSaving.set(true);
    this.errorMessage.set(null);
    try {
      const reset = await this.workspaceStore.resetToDefaults(workspace.version);
      this.acceptWorkspace(reset);
      this.showResetConfirmation.set(false);
      this.successMessage.set('Valores iniciales copiados al borrador. Revisalos y aplicá los cambios para usarlos.');
    } catch (error: unknown) {
      this.handleWriteError(error, 'No pudimos restablecer los valores iniciales. Tus cambios locales siguen visibles.');
    } finally {
      this.isSaving.set(false);
    }
  }

  async handleSignOut(): Promise<void> {
    if (this.editorReadonly()) return;
    if (!await this.saveDraft(this.activeStepKey())) return;
    this.doctorProfileService.clearProfile();
    await this.authService.signOut();
    this.workspaceStore.clearSetup();
  }

  async reviewServerCopy(): Promise<void> {
    if (this.isSaving()) return;
    this.isSaving.set(true);
    try {
      this.serverCopy.set(await this.workspaceStore.loadSetup(true));
      this.serverCopyLoaded.set(true);
    } catch (error: unknown) {
      this.errorMessage.set(this.errorText(error, 'No pudimos consultar la copia guardada. Tus cambios locales se conservan.'));
    } finally {
      this.isSaving.set(false);
    }
  }

  async useServerCopy(): Promise<void> {
    if (!this.serverCopyLoaded() || this.isSaving()) return;
    const latest = this.serverCopy();
    if (!latest) {
      await this.router.navigate(['/onboarding/select-specialty']);
      return;
    }
    this.acceptWorkspace(latest);
    this.hasConflict.set(false);
    this.serverCopyLoaded.set(false);
    this.serverCopy.set(null);
    this.errorMessage.set(null);
    this.successMessage.set('Copia del servidor cargada. Podés revisarla antes de editar.');
  }

  private async saveDraft(stepKey: EditableStepKey): Promise<WorkspaceSetup | null> {
    const workspace = this.workspace();
    const definition = this.definition();
    if (!workspace || !definition || this.editorReadonly()) return null;
    this.isSaving.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    try {
      const saved = await this.workspaceStore.saveOnboardingDraft({
        expectedVersion: workspace.version, definition: this.copy(definition), currentStepKey: stepKey,
      });
      this.acceptWorkspace(saved);
      return saved;
    } catch (error: unknown) {
      this.handleWriteError(error, 'No pudimos guardar el avance. Tus cambios locales se conservan; revisá los campos y reintentá.');
      return null;
    } finally {
      this.isSaving.set(false);
    }
  }

  private acceptWorkspace(workspace: WorkspaceSetup): void {
    const definition = workspace.draftDefinition ?? workspace.definition;
    if (!definition) throw new Error('El backend no devolvió una configuración personal.');
    this.workspace.set(this.copy(workspace));
    this.definition.set(this.copy(definition));
    const firstCategory = definition.patientForm.categories.find(category => category.enabled);
    this.activeStepKey.set(workspace.currentStepKey === 'completed'
      ? firstCategory ? `patient:${firstCategory.key}` : 'encounter'
      : workspace.currentStepKey);
    this.showPatientCategories.set(false);
  }

  private handleWriteError(error: unknown, fallback: string): void {
    const response = error as { status?: number; error?: { code?: string } } | null;
    if (response?.status === 409 && response.error?.code === 'VERSION_CONFLICT') {
      this.hasConflict.set(true);
      this.serverCopyLoaded.set(false);
      this.serverCopy.set(null);
      this.errorMessage.set('La configuración cambió en otra sesión. Tus cambios locales siguen visibles. Revisá la copia del servidor antes de continuar.');
    } else {
      this.errorMessage.set(this.errorText(error, fallback));
    }
  }

  private errorText(error: unknown, fallback: string): string {
    const message = (error as { error?: { message?: unknown } } | null)?.error?.message;
    return typeof message === 'string' ? message : fallback;
  }

  private copy<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T; }
}
