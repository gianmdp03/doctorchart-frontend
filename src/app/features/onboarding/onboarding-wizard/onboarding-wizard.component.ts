import { InteractionStatusService } from '../../../core/services/interaction-status.service';
import { afterNextRender, Component, ElementRef, Injector, computed, inject, OnInit, signal, viewChild, viewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { DoctorProfileService } from '../../../core/services/doctor-profile.service';
import { WorkspaceStore } from '../../../core/services/workspace.store';
import { WorkspaceSetup } from '../../../core/models/workspace.model';
import { WizardDefinition, WizardFormDefinition, WizardStepKey } from '../../../core/models/wizard-definition.model';
import { FormFieldEditorComponent } from '../../form-field-editor/form-field-editor.component';
import { ClinicalHistoryTemplatesManagerComponent } from '../clinical-history-templates/clinical-history-templates-manager.component';

type EditableStepKey = Exclude<WizardStepKey, 'specialty' | 'completed'>;
interface WizardStep {
  key: EditableStepKey;
  title: string;
  kind: 'patient' | 'encounter';
  categoryKey?: string;
}

@Component({
  selector: 'app-onboarding-wizard',
  imports: [FormFieldEditorComponent, ClinicalHistoryTemplatesManagerComponent],
  templateUrl: './onboarding-wizard.component.html',
  styleUrl: './onboarding-wizard.component.css',
})
export class OnboardingWizardComponent implements OnInit {
  private readonly interaction = inject(InteractionStatusService);
  private readonly workspaceStore = inject(WorkspaceStore);
  private readonly doctorProfileService = inject(DoctorProfileService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly editors = viewChildren(FormFieldEditorComponent);
  readonly fieldEditorOpen = computed(() => this.editors().some(editor => !!editor.fieldDraft()));
  readonly activeFieldSection = computed(() => this.editors().find(editor => !!editor.fieldDraft())?.section());
  readonly pendingEditor = computed(() => this.editors().some(editor => editor.pendingChanges()));

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
  readonly isEditMode = computed(() => this.workspace()?.onboardingCompleted ?? false);
  readonly editorReadonly = computed(() => this.isLoading() || this.isSaving() || this.hasConflict());
  readonly steps = computed<WizardStep[]>(() => [
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
      if (!workspace) {
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
  }

  onPatientCategorySelected(key: string): void {
    if (this.editorReadonly()) return;
    const category = this.definition()?.patientForm.categories.find(category => category.key === key);
    if (category?.enabled) this.activeStepKey.set(`patient:${category.key}`);
  }

  onEncounterDefinitionChange(form: WizardFormDefinition): void {
    if (this.editorReadonly()) return;
    this.definition.update(current => current ? { ...current, encounterForm: this.copy(form) } : current);
  }

  private readonly stepHeading = viewChild<ElementRef<HTMLHeadingElement>>('stepHeading');
  private readonly injector = inject(Injector);

  async goToStep(index: number): Promise<void> {
    const step = this.steps()[index];
    if (!step || this.editorReadonly() || step.key === this.activeStepKey()) return;
    if (await this.saveDraft(step.key)) afterNextRender(() => this.stepHeading()?.nativeElement.focus(), { injector: this.injector });
  }

  async goNext(): Promise<void> {
    const index = this.activeStepIndex();
    await this.goToStep(index < 0 ? this.steps().length - 1 : index + 1);
  }

  async goPrevious(): Promise<void> {
    const index = this.activeStepIndex();
    if (index <= 0) return;
    await this.goToStep(index - 1);
  }

  async saveProgress(): Promise<void> {
    if (await this.saveDraft(this.activeStepKey())) {
      this.interaction.notifySuccess('Borrador guardado. La configuración activa se conserva hasta aplicar los cambios.');
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
      this.interaction.notifySuccess('La configuración se aplicó correctamente.');
      await this.router.navigate(['/dashboard']);
    } catch (error: unknown) {
      this.handleWriteError(error, 'El borrador está guardado, pero no pudimos aplicar los cambios. Revisá los campos e intentá nuevamente.');
    } finally {
      this.isSaving.set(false);
    }
  }

  async backToSpecialties(): Promise<void> {
    if (this.isEditMode() || this.editorReadonly()) return;
    if (await this.saveDraft(this.activeStepKey())) {
      await this.router.navigate(['/specialties'], { queryParams: { add: '1' } });
    }
  }

  async exitWizard(): Promise<void> {
    if (!this.isEditMode() || this.editorReadonly()) return;
    if (await this.saveDraft(this.activeStepKey())) {
      this.interaction.notifySuccess('El borrador se guardó correctamente.');
      await this.router.navigate(['/dashboard']);
    }
  }

  async returnWithoutSaving(): Promise<void> {
    const workspace = this.workspace();
    if (!workspace?.onboardingCompleted || this.isSaving()) return;
    await this.router.navigate(['/dashboard'], { queryParams: { specialtyContextId: workspace.specialtyContextId } });
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
      this.interaction.notifySuccess('El borrador se descartó correctamente.');
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
      this.interaction.notifySuccess('Valores iniciales copiados al borrador. Revisalos y aplicá los cambios para usarlos.');
    } catch (error: unknown) {
      this.handleWriteError(error, 'No pudimos restablecer los valores iniciales. Tus cambios locales siguen visibles.');
    } finally {
      this.isSaving.set(false);
    }
  }

  async handleSignOut(): Promise<void> {
    if (this.editorReadonly()) return;
    if (!await this.saveDraft(this.activeStepKey())) return;
    this.isSaving.set(true);
    try {
      const result = await this.authService.signOut();
      if (result.error) throw result.error;
      this.doctorProfileService.clearProfile();
      this.workspaceStore.clearSetup();
    } catch { this.errorMessage.set('No pudimos cerrar la sesión. Tu borrador se conserva. Reintentá.'); }
    finally { this.isSaving.set(false); }
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
    this.interaction.notifySuccess('Copia del servidor cargada. Podés revisarla antes de editar.');
  }

  private async saveDraft(stepKey: EditableStepKey): Promise<WorkspaceSetup | null> {
    if (this.pendingEditor()) { this.errorMessage.set('Aplicá o cancelá el campo en edición y completá o quitá la categoría pendiente antes de continuar.'); return null; }
    const workspace = this.workspace();
    const definition = this.definition();
    if (!workspace || !definition || this.editorReadonly()) return null;
    this.isSaving.set(true);
    this.errorMessage.set(null);
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
    // Older drafts can still point at the specialty picker or a category that is no longer enabled.
    const step = this.steps().find(candidate => candidate.key === workspace.currentStepKey);
    this.activeStepKey.set((step ?? this.steps()[0]).key);
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
