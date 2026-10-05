import { Component, computed, effect, inject, input, OnDestroy, output, signal, untracked } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DynamicFormRendererComponent, inputValues } from '../dynamic-form-renderer/dynamic-form-renderer.component';
import { conflictKind, errorMessage, retainCompatibleValues } from '../dynamic-form-renderer/clinical-form-ui';
import { PatientService } from '../../core/services/patient.service';
import { AuthService } from '../../core/services/auth.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { PatientDetailDTO } from '../../core/models/patient.model';
import { WorkspaceSetup } from '../../core/models/workspace.model';
import { WizardFormDefinition, WizardFormValues, WizardFormulaResults } from '../../core/models/wizard-definition.model';

@Component({ selector: 'app-new-patient-dialog', imports: [DynamicFormRendererComponent], templateUrl: './new-patient-dialog.component.html', styleUrl: './new-patient-dialog.component.css' })
export class NewPatientDialogComponent implements OnDestroy {
  private readonly patientService = inject(PatientService);
  private readonly workspaceStore = inject(WorkspaceStore);
  private readonly auth = inject(AuthService);
  private epoch = 0; private destroyed = false; private owner = ''; private contextId: number | null = null;
  readonly isOpen = input(false);
  readonly patientToEdit = input<PatientDetailDTO | null>(null);
  readonly closeDialog = output<void>();
  readonly patientCreated = output<PatientDetailDTO>();
  readonly patientUpdated = output<PatientDetailDTO>();
  readonly record = signal<PatientDetailDTO | null>(null);
  readonly workspace = signal<WorkspaceSetup | null>(null);
  readonly definition = signal<WizardFormDefinition | null>(null);
  readonly values = signal<WizardFormValues>({});
  readonly formulaResults = signal<WizardFormulaResults>({});
  readonly isEditMode = computed(() => !!this.record());
  readonly isFormValid = signal(false);
  readonly isSubmitting = signal(false);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly conflict = signal<'workspace' | 'record' | null>(null);
  readonly remoteWorkspace = signal<WorkspaceSetup | null>(null);
  readonly remoteRecord = signal<PatientDetailDTO | null>(null);
  readonly readonly = computed(() => !this.isOpen() || this.isSubmitting() || this.isLoading() || !!this.conflict() || this.identity() !== this.owner || (this.patientToEdit()?.id ?? null) !== this.contextId);
  constructor() {
    effect(() => {
      const open = this.isOpen(); const patient = this.patientToEdit(); const identity = this.identity();
      untracked(() => { this.owner = identity; this.contextId = patient?.id ?? null; this.epoch++; this.isSubmitting.set(false); this.isLoading.set(false); this.reset(); if (open) void this.initialize(patient); });
    });
  }
  ngOnDestroy(): void { this.destroyed = true; this.epoch++; }
  private async initialize(patient: PatientDetailDTO | null): Promise<void> {
    if (patient) { this.acceptRecord(patient); return; }
    const epoch = this.epoch; this.isLoading.set(true);
    try {
      const workspace = await this.workspaceStore.loadSetup();
      if (!this.alive(epoch)) return;
      if (!workspace?.onboardingCompleted || !workspace.definition) throw new Error('Completá tu configuración antes de crear pacientes.');
      this.workspace.set(structuredClone(workspace)); this.definition.set(structuredClone(workspace.definition.patientForm));
    } catch (error) { if (this.alive(epoch)) this.errorMessage.set(errorMessage(error, 'No pudimos cargar el formulario del paciente.')); }
    finally { if (this.alive(epoch)) this.isLoading.set(false); }
  }
  async retryLoad(): Promise<void> { if (!this.isLoading() && !this.definition()) await this.initialize(this.patientToEdit()); }
  onValuesChange(values: WizardFormValues): void { if (!this.readonly()) { this.values.set(structuredClone(values)); this.formulaResults.set({}); } }
  onFormValidityChange(valid: boolean): void { this.isFormValid.set(valid); }
  async submit(): Promise<void> {
    const definition = this.definition(); const record = this.record(); const workspace = this.workspace();
    if (!definition || this.readonly() || !this.isFormValid()) return;
    if (!record && !workspace) return;
    this.isSubmitting.set(true); this.errorMessage.set(null); const epoch = this.epoch;
    try {
      const values = inputValues(definition, this.values());
      const saved = await firstValueFrom(record
        ? this.patientService.updatePatient(record.id, { expectedVersion: record.version, values })
        : this.patientService.createPatient({ workspaceVersion: workspace!.version, values }));
      if (!this.alive(epoch)) return;
      if (record && saved.id !== record.id) throw new Error('El paciente recibido no corresponde a esta ficha.');
      if (record) this.patientUpdated.emit(saved); else this.patientCreated.emit(saved);
      this.isSubmitting.set(false); this.definition.set(null); this.closeDialog.emit(); this.epoch++;
    } catch (error) { if (this.alive(epoch)) { this.conflict.set(conflictKind(error)); this.errorMessage.set(errorMessage(error, 'No pudimos guardar el paciente. Tus respuestas se conservan.')); } }
    finally { if (!this.destroyed && epoch === this.epoch) this.isSubmitting.set(false); }
  }
  async reviewRemote(): Promise<void> {
    if (!this.conflict() || this.isSubmitting() || this.isLoading() || this.identity() !== this.owner) return;
    const epoch = this.epoch; this.isLoading.set(true); this.remoteWorkspace.set(null); this.remoteRecord.set(null);
    try {
      if (this.conflict() === 'workspace') {
        const workspace = await this.workspaceStore.loadSetup(true);
        if (this.alive(epoch) && workspace?.onboardingCompleted && workspace.definition) this.remoteWorkspace.set(structuredClone(workspace));
      } else {
        const record = await firstValueFrom(this.patientService.getPatientById(this.record()!.id));
        if (this.alive(epoch) && record.id === this.record()?.id) this.remoteRecord.set(structuredClone(record));
      }
    } catch (error) { if (this.alive(epoch)) this.errorMessage.set(errorMessage(error, 'No pudimos consultar la copia del servidor.')); }
    finally { if (this.alive(epoch)) this.isLoading.set(false); }
  }
  useRemoteWorkspace(): void {
    const remote = this.remoteWorkspace(); const previous = this.definition();
    if (!remote?.definition || !previous || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner) return;
    this.values.set(retainCompatibleValues(previous, remote.definition.patientForm, this.values()));
    this.workspace.set(structuredClone(remote)); this.definition.set(structuredClone(remote.definition.patientForm)); this.formulaResults.set({}); this.conflict.set(null); this.errorMessage.set(null); this.remoteWorkspace.set(null);
  }
  useRemoteRecord(): void {
    const remote = this.remoteRecord(); if (!remote || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner) return;
    this.acceptRecord(remote); this.conflict.set(null); this.errorMessage.set(null); this.remoteRecord.set(null);
  }
  close(): void { if (!this.isSubmitting()) { this.epoch++; this.reset(); this.closeDialog.emit(); } }
  private acceptRecord(patient: PatientDetailDTO): void { this.record.set(structuredClone(patient)); this.definition.set(structuredClone(patient.formDefinitionSnapshot)); this.values.set(structuredClone(patient.formValues)); this.formulaResults.set(structuredClone(patient.formulaResults)); }
  private reset(): void { this.record.set(null); this.workspace.set(null); this.definition.set(null); this.values.set({}); this.formulaResults.set({}); this.conflict.set(null); this.remoteWorkspace.set(null); this.remoteRecord.set(null); this.errorMessage.set(null); this.isFormValid.set(false); }
  private identity(): string { return this.auth.currentUser()?.id ?? ''; }
  private alive(epoch: number): boolean { return !this.destroyed && epoch === this.epoch && this.isOpen() && this.identity() === this.owner && (this.patientToEdit()?.id ?? null) === this.contextId; }
}
