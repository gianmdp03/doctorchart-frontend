import { Component, computed, effect, inject, input, OnDestroy, output, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { AuthService } from '../../core/services/auth.service';
import { ClinicalEncounterDetail, ConsultationType } from '../../core/models/clinical-encounter.model';
import { WorkspaceSetup } from '../../core/models/workspace.model';
import { WizardFormDefinition, WizardFormValues } from '../../core/models/wizard-definition.model';
import { DatePickerComponent } from '../../shared/date-picker/date-picker.component';
import { consultationDateError, timeError } from '../../core/models/form-validation';
import { DynamicFormRendererComponent, inputValues } from '../dynamic-form-renderer/dynamic-form-renderer.component';
import { argentinaDateTime, conflictKind, encounterInstant, errorMessage, retainCompatibleValues } from '../dynamic-form-renderer/clinical-form-ui';

@Component({ selector: 'app-new-encounter-dialog', imports: [FormsModule, DatePickerComponent, DynamicFormRendererComponent], templateUrl: './new-encounter-dialog.component.html', styleUrl: './new-encounter-dialog.component.css' })
export class NewEncounterDialogComponent implements OnDestroy {
  private readonly encounterService = inject(ClinicalEncounterService);
  private readonly workspaceStore = inject(WorkspaceStore);
  private readonly auth = inject(AuthService);
  private epoch = 0; private destroyed = false; private owner = ''; private contextPatient: number | null = null;
  private originalInstant = ''; private originalDay = ''; private originalTime = '';
  readonly isOpen = input(false);
  readonly patientId = input<number | null>(null);
  readonly patientName = input('');
  readonly previousEncountersCount = input(0);
  readonly closeDialog = output<void>();
  readonly encounterCreated = output<ClinicalEncounterDetail>();
  readonly consultationType = signal<ConsultationType>('FIRST_VISIT');
  readonly encounterDay = signal(''); readonly encounterTime = signal('');
  readonly definition = signal<WizardFormDefinition | null>(null);
  readonly workspace = signal<WorkspaceSetup | null>(null);
  readonly dynamicFormData = signal<WizardFormValues>({});
  readonly isDynamicFormValid = signal(false);
  readonly isLoading = signal(false); readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly hasConflict = signal(false);
  readonly remoteWorkspace = signal<WorkspaceSetup | null>(null);
  readonly readonly = computed(() => !this.isOpen() || this.isLoading() || this.isSubmitting() || this.hasConflict() || this.identity() !== this.owner || this.patientId() !== this.contextPatient);
  readonly allConsultationTypes: { value: ConsultationType; label: string }[] = [
    { value: 'FIRST_VISIT', label: 'Primera consulta' }, { value: 'FOLLOW_UP', label: 'Control / seguimiento' }, { value: 'ROUTINE_CHECKUP', label: 'Chequeo de rutina' }, { value: 'EMERGENCY', label: 'Urgencia' }, { value: 'INTERCONSULTATION', label: 'Interconsulta' },
  ];
  readonly isFirstVisitLocked = computed(() => this.previousEncountersCount() <= 0);
  readonly availableConsultationTypes = computed(() => {
    if (this.isFirstVisitLocked()) {
      return this.allConsultationTypes.filter(type => type.value === 'FIRST_VISIT');
    }
    return this.allConsultationTypes.filter(type => type.value !== 'FIRST_VISIT');
  });
  get consultationTypes(): { value: ConsultationType; label: string }[] {
    return this.availableConsultationTypes();
  }
  selectConsultationType(type: ConsultationType): void {
    if (this.readonly() || this.isFirstVisitLocked()) return;
    this.consultationType.set(type);
  }
  readonly dateValid = computed(() => { const instant = this.currentInstant(); return !!instant && new Date(instant).getTime() <= Date.now() + 60000; });
  readonly dayError = computed(() => consultationDateError(this.encounterDay(), this.encounterTime(), Date.now() + 60000));
  readonly timeError = computed(() => timeError(this.encounterTime()));
  constructor() {
    effect(() => {
      const isLocked = this.isFirstVisitLocked();
      untracked(() => {
        if (isLocked) {
          this.consultationType.set('FIRST_VISIT');
        } else if (this.consultationType() === 'FIRST_VISIT') {
          this.consultationType.set('FOLLOW_UP');
        }
      });
    });
    effect(() => { const open = this.isOpen(); const patientId = this.patientId(); const identity = this.identity(); untracked(() => {
      this.epoch++; this.owner = identity; this.contextPatient = patientId; this.isLoading.set(false); this.isSubmitting.set(false); this.resetForm();
      if (open && patientId) void this.loadForm();
    }); });
  }
  ngOnDestroy(): void { this.destroyed = true; this.epoch++; }
  async loadForm(): Promise<void> {
    if (!this.isOpen() || !this.patientId() || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner || this.patientId() !== this.contextPatient) return;
    const epoch = this.epoch; this.isLoading.set(true); this.errorMessage.set(null);
    try {
      const workspace = await this.workspaceStore.loadSetup(); if (!this.alive(epoch)) return;
      if (!workspace?.onboardingCompleted || !workspace.definition) throw new Error('El formulario clínico no está disponible.');
      this.workspace.set(structuredClone(workspace)); this.definition.set(structuredClone(workspace.definition.encounterForm));
    } catch (error) { if (this.alive(epoch)) this.errorMessage.set(errorMessage(error, 'No pudimos cargar el formulario de consulta.')); }
    finally { if (this.alive(epoch)) this.isLoading.set(false); }
  }
  onDynamicDataChange(values: WizardFormValues): void { if (!this.readonly()) this.dynamicFormData.set(structuredClone(values)); }
  onDynamicFormValidityChange(valid: boolean): void { this.isDynamicFormValid.set(valid); }
  currentInstant(): string | null { return this.encounterDay() === this.originalDay && this.encounterTime() === this.originalTime ? this.originalInstant : encounterInstant(this.encounterDay(), this.encounterTime()); }
  async submitEncounter(): Promise<void> {
    const workspace = this.workspace(); const definition = this.definition(); const patientId = this.patientId(); const encounterDate = this.currentInstant();
    if (!workspace || !definition || !patientId || !encounterDate || !this.dateValid() || !this.isDynamicFormValid() || this.readonly()) return;
    const epoch = this.epoch; this.isSubmitting.set(true); this.errorMessage.set(null);
    const effectiveConsultationType = this.isFirstVisitLocked() ? 'FIRST_VISIT' : (this.consultationType() === 'FIRST_VISIT' ? 'FOLLOW_UP' : this.consultationType());
    try {
      const created = await firstValueFrom(this.encounterService.create({ patientId, workspaceVersion: workspace.version, consultationType: effectiveConsultationType, values: inputValues(definition, this.dynamicFormData()) }));
      if (!this.alive(epoch)) return;
      if (created.patientId !== patientId) throw new Error('La consulta recibida corresponde a otro paciente.');
      this.encounterCreated.emit(created);
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('encounter-created', { detail: created }));
      this.isSubmitting.set(false); this.definition.set(null); this.closeDialog.emit(); this.epoch++;
    } catch (error) { if (this.alive(epoch)) { this.hasConflict.set(!!conflictKind(error)); this.errorMessage.set(errorMessage(error, 'No pudimos guardar la consulta. Tus respuestas se conservan.')); } }
    finally { if (epoch === this.epoch && !this.destroyed) this.isSubmitting.set(false); }
  }
  async reviewRemote(): Promise<void> {
    if (!this.hasConflict() || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner || this.patientId() !== this.contextPatient) return;
    const epoch = this.epoch; this.isLoading.set(true); this.remoteWorkspace.set(null);
    try { const remote = await this.workspaceStore.loadSetup(true); if (this.alive(epoch) && remote?.onboardingCompleted && remote.definition) this.remoteWorkspace.set(structuredClone(remote)); }
    catch (error) { if (this.alive(epoch)) this.errorMessage.set(errorMessage(error, 'No pudimos consultar la configuración actual.')); }
    finally { if (this.alive(epoch)) this.isLoading.set(false); }
  }
  useRemoteWorkspace(): void {
    const remote = this.remoteWorkspace(); const previous = this.definition();
    if (!remote?.definition || !previous || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner || this.patientId() !== this.contextPatient) return;
    this.dynamicFormData.set(retainCompatibleValues(previous, remote.definition.encounterForm, this.dynamicFormData())); this.workspace.set(structuredClone(remote)); this.definition.set(structuredClone(remote.definition.encounterForm)); this.hasConflict.set(false); this.remoteWorkspace.set(null); this.errorMessage.set(null);
  }
  resetForm(): void {
    this.workspace.set(null); this.definition.set(null); this.dynamicFormData.set({}); this.isDynamicFormValid.set(false); this.errorMessage.set(null); this.hasConflict.set(false); this.remoteWorkspace.set(null);
    this.consultationType.set(this.previousEncountersCount() === 0 ? 'FIRST_VISIT' : 'FOLLOW_UP');
    this.originalInstant = new Date().toISOString(); const parts = argentinaDateTime(this.originalInstant); this.originalDay = parts.day; this.originalTime = parts.time; this.encounterDay.set(parts.day); this.encounterTime.set(parts.time);
  }
  close(): void { if (!this.isSubmitting()) { this.epoch++; this.resetForm(); this.closeDialog.emit(); } }
  private identity(): string { return this.auth.currentUser()?.id ?? ''; }
  private alive(epoch: number): boolean { return !this.destroyed && epoch === this.epoch && this.isOpen() && this.identity() === this.owner && this.patientId() === this.contextPatient; }
}
