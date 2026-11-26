import { InteractionStatusService } from '../../core/services/interaction-status.service';
import { ClinicalContextService } from '../../core/services/clinical-context.service';
import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  viewChild,
  signal,
  afterEveryRender,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PatientService } from '../../core/services/patient.service';
import { AuthService } from '../../core/services/auth.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { PatientDetailDTO } from '../../core/models/patient.model';
import { WorkspaceSetup } from '../../core/models/workspace.model';
import {
  WizardFormDefinition,
  WizardFormValues,
  WizardFormulaResults,
  withClinicalHistory,
} from '../../core/models/wizard-definition.model';
import {
  DynamicFormRendererComponent,
  inputValues,
} from '../dynamic-form-renderer/dynamic-form-renderer.component';
import {
  conflictKind,
  errorMessage,
  retainCompatibleValues,
} from '../dynamic-form-renderer/clinical-form-ui';

@Component({
  selector: 'app-patient-form-page',
  imports: [DynamicFormRendererComponent],
  templateUrl: './patient-form-page.component.html',
  styleUrl: './patient-form-page.component.css',
})
export class PatientFormPageComponent implements OnInit {
  private readonly interaction = inject(InteractionStatusService);
  private readonly clinicalScope = inject(ClinicalContextService);
  private readonly document = inject(DOCUMENT);
  private focusedHistory = false;
  constructor() {
    afterEveryRender(() => {
      if (this.focusedHistory || this.route.snapshot?.fragment !== 'clinical-history') return;
      const target = this.document.getElementById('clinical-history');
      if (target) {
        target.scrollIntoView?.({ block: 'center' });
        target.focus({ preventScroll: true });
        this.focusedHistory = true;
      }
    });
  }
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly patientService = inject(PatientService);
  private readonly activePatientService = inject(ActivePatientService);
  private readonly workspaceStore = inject(WorkspaceStore);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  private epoch = 0;
  private destroyed = false;
  private owner = '';

  readonly isEditMode = signal(false);
  readonly patientId = signal<number | null>(null);
  readonly record = signal<PatientDetailDTO | null>(null);
  readonly correctionReason = signal('');
  readonly workspace = signal<WorkspaceSetup | null>(null);
  readonly definition = signal<WizardFormDefinition | null>(null);
  readonly values = signal<WizardFormValues>({});
  readonly formulaResults = signal<WizardFormulaResults>({});
  readonly isFormValid = signal(false);
  readonly submissionAttempted = signal(false);
  private readonly formRenderer = viewChild(DynamicFormRendererComponent);
  readonly isSubmitting = signal(false);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  private readonly dniCheck = signal<{ dni: string; duplicate: boolean; patientId: number | null } | null>(null);
  readonly dniFieldKey = computed(() => {
    const fields = this.definition()?.categories.flatMap(category => category.fields) ?? [];
    return ['sys_dni', 'patient.nationalId', 'nationalId'].find(key => fields.some(field => field.key === key));
  });
  readonly duplicateDni = computed(() => {
    const check = this.dniCheck();
    return check?.duplicate && check.dni === this.currentDni() && this.identity() === this.owner ? check : null;
  });
  readonly conflict = signal<'workspace' | 'record' | null>(null);
  readonly remoteWorkspace = signal<WorkspaceSetup | null>(null);
  readonly remoteRecord = signal<PatientDetailDTO | null>(null);

  readonly readonly = computed(
    () =>
      this.isSubmitting() ||
      this.isLoading() ||
      !!this.conflict() ||
      this.identity() !== this.owner,
  );

  readonly pageTitle = computed(() => {
    if (this.isEditMode()) {
      const name = this.record()?.fullName;
      return name ? `Editar Datos: ${name}` : 'Editar Datos del Paciente';
    }
    return 'Registrar Nuevo Paciente';
  });

  readonly pageSubtitle = computed(() => {
    if (this.isEditMode()) {
      return 'Actualizá los datos filiatorios y clínicos registrados en la ficha del paciente.';
    }
    return 'Completá los campos clínicos de tu configuración activa para incorporar el paciente al sistema.';
  });

  ngOnInit(): void {
    this.owner = this.identity();
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      this.epoch++;
    });

    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.epoch++;
      this.record.set(null);
      this.workspace.set(null);
      this.definition.set(null);
      this.values.set({});
      this.formulaResults.set({});
      this.correctionReason.set('');
      this.conflict.set(null);
      this.remoteRecord.set(null);
      this.remoteWorkspace.set(null);
      this.isFormValid.set(false);
      this.isSubmitting.set(false);
      this.submissionAttempted.set(false);
      this.dniCheck.set(null);
      const idParam = params.get('id');
      if (idParam !== null) {
        const id = Number(idParam);
        this.isEditMode.set(true);
        if (Number.isSafeInteger(id) && id > 0) {
          this.patientId.set(id);
          void this.loadPatientForEdit(id);
          return;
        }
        this.patientId.set(null);
        this.isLoading.set(false);
        this.errorMessage.set('El identificador del paciente no es válido.');
        return;
      }
      this.patientId.set(null);
      this.isEditMode.set(false);
      void this.loadCreateForm();
    });
  }

  private async loadPatientForEdit(id: number): Promise<void> {
    const epoch = ++this.epoch;
    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      const patient = await firstValueFrom(this.patientService.getPatientById(id));
      if (!this.alive(epoch)) return;
      this.record.set(structuredClone(patient));
      this.correctionReason.set('');
      this.definition.set(withClinicalHistory(structuredClone(patient.formDefinitionSnapshot)));
      this.values.set(structuredClone(patient.formValues));
      this.formulaResults.set(structuredClone(patient.formulaResults));
    } catch (error) {
      if (this.alive(epoch)) {
        this.errorMessage.set(
          errorMessage(error, 'No pudimos cargar los datos del paciente para editar.'),
        );
      }
    } finally {
      if (this.alive(epoch)) {
        this.isLoading.set(false);
      }
    }
  }

  private async loadCreateForm(): Promise<void> {
    const epoch = ++this.epoch;
    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      const workspace = await this.workspaceStore.loadSetup();
      if (!this.alive(epoch)) return;
      if (!workspace?.onboardingCompleted || !workspace.definition) {
        throw new Error(
          'Completá la configuración de tu especialidad antes de registrar pacientes.',
        );
      }
      this.workspace.set(structuredClone(workspace));
      this.definition.set(withClinicalHistory(structuredClone(workspace.definition.patientForm)));
    } catch (error) {
      if (this.alive(epoch)) {
        this.errorMessage.set(errorMessage(error, 'No pudimos cargar el formulario de paciente.'));
      }
    } finally {
      if (this.alive(epoch)) {
        this.isLoading.set(false);
      }
    }
  }

  onValuesChange(values: WizardFormValues): void {
    if (!this.readonly()) {
      this.values.set(structuredClone(values));
      if (this.dniCheck()?.dni !== this.currentDni()) this.dniCheck.set(null);
      this.formulaResults.set({});
    }
  }

  onFormValidityChange(valid: boolean): void {
    this.isFormValid.set(valid);
  }

  onFieldBlur(key: string): void {
    if (key === this.dniFieldKey() && !this.readonly()) void this.checkDni(false);
  }

  openDuplicatePatient(patientId: number): void {
    void this.router.navigate(['/patients', patientId]);
  }

  private currentDni(): string {
    const value = this.values()[this.dniFieldKey() ?? ''];
    return typeof value === 'string' ? value.trim() : '';
  }

  private async checkDni(duplicate: boolean): Promise<void> {
    const dni = this.currentDni();
    if (!/^\d{6,8}$/.test(dni) || dni === this.record()?.nationalId?.trim()) {
      if (duplicate) this.errorMessage.set('Ya tenés un paciente con este DNI en esta especialidad.');
      return;
    }
    if (!duplicate && this.dniCheck()?.dni === dni) return;

    const check = { dni, duplicate, patientId: null };
    const epoch = this.epoch;
    this.dniCheck.set(check);
    try {
      const { patientId } = await firstValueFrom(
        this.patientService.checkDni(dni).pipe(takeUntilDestroyed(this.destroyRef)),
      );
      if (this.alive(epoch) && this.dniCheck() === check) {
        const match = patientId === this.patientId() ? null : patientId;
        this.dniCheck.set({ dni, duplicate: duplicate || match !== null, patientId: match });
      }
    } catch {
      if (this.alive(epoch) && this.dniCheck() === check && !duplicate) this.dniCheck.set(null);
    }
  }

  cancel(): void {
    if (this.isEditMode() && this.patientId()) {
      void this.router.navigate(['/patients', this.patientId()]);
    } else {
      void this.router.navigate(['/patients']);
    }
  }

  async submit(): Promise<void> {
    if (this.readonly()) return;
    this.submissionAttempted.set(true);
    if (!this.isFormValid()) {
      this.errorMessage.set('Revisá los campos marcados antes de guardar. Tus respuestas se conservan.');
      this.formRenderer()?.focusFirstInvalidField();
      return;
    }
    const definition = this.definition();
    const record = this.record();
    const workspace = this.workspace();

    if (!definition || this.readonly() || !this.isFormValid()) return;
    if (this.isEditMode() ? !record || record.id !== this.patientId() : !workspace) return;

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    const epoch = ++this.epoch;
    if (!this.duplicateDni()) this.dniCheck.set(null);

    try {
      const values = inputValues(definition, this.values());
      const reason = this.correctionReason().trim();
      const saved = await firstValueFrom(
        record
          ? this.patientService.updatePatient(record.id, {
              expectedVersion: record.version,
              values,
              ...(reason ? { reason } : {}),
            })
          : this.patientService.createPatient({
              workspaceVersion: workspace!.version,
              values,
            }),
      );

      if (!this.alive(epoch)) return;

      this.activePatientService.setActivePatient(saved);
      this.activePatientService.loadPatient(saved.id);
      this.interaction.notifySuccess(record ? 'Los cambios del paciente se guardaron correctamente.' : 'El paciente se creó correctamente.');
      void this.router.navigate(['/patients', saved.id]);
    } catch (error) {
      if (this.alive(epoch)) {
        const response = error as { status?: number; error?: { code?: string } };
        if (response.status === 409 && response.error?.code === 'PATIENT_DNI_ALREADY_EXISTS') {
          void this.checkDni(true);
          return;
        }
        this.conflict.set(conflictKind(error));
        this.errorMessage.set(
          errorMessage(error, 'No pudimos guardar el paciente. Tus respuestas se conservan.'),
        );
      }
    } finally {
      if (!this.destroyed && epoch === this.epoch) {
        this.isSubmitting.set(false);
      }
    }
  }

  async reviewRemote(): Promise<void> {
    if (
      !this.conflict() ||
      this.isSubmitting() ||
      this.isLoading() ||
      this.identity() !== this.owner
    ) {
      return;
    }
    const epoch = ++this.epoch;
    this.isLoading.set(true);
    this.remoteWorkspace.set(null);
    this.remoteRecord.set(null);

    try {
      if (this.conflict() === 'workspace') {
        const workspace = await this.workspaceStore.loadSetup(true);
        if (this.alive(epoch) && workspace?.onboardingCompleted && workspace.definition) {
          this.remoteWorkspace.set(structuredClone(workspace));
        }
      } else {
        const record = await firstValueFrom(this.patientService.getPatientById(this.record()!.id));
        if (this.alive(epoch) && record.id === this.record()?.id) {
          this.remoteRecord.set(structuredClone(record));
        }
      }
    } catch (error) {
      if (this.alive(epoch)) {
        this.errorMessage.set(errorMessage(error, 'No pudimos consultar la copia del servidor.'));
      }
    } finally {
      if (this.alive(epoch)) {
        this.isLoading.set(false);
      }
    }
  }

  useRemoteWorkspace(): void {
    const remote = this.remoteWorkspace();
    const previous = this.definition();
    if (
      !remote?.definition ||
      !previous ||
      this.isLoading() ||
      this.isSubmitting() ||
      this.identity() !== this.owner
    ) {
      return;
    }
    this.values.set(retainCompatibleValues(previous, remote.definition.patientForm, this.values()));
    this.workspace.set(structuredClone(remote));
    this.definition.set(withClinicalHistory(structuredClone(remote.definition.patientForm)));
    this.formulaResults.set({});
    this.conflict.set(null);
    this.errorMessage.set(null);
    this.remoteWorkspace.set(null);
  }

  useRemoteRecord(): void {
    const remote = this.remoteRecord();
    if (!remote || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner) {
      return;
    }
    this.record.set(structuredClone(remote));
    this.dniCheck.set(null);
    this.definition.set(withClinicalHistory(structuredClone(remote.formDefinitionSnapshot)));
    this.values.set(structuredClone(remote.formValues));
    this.formulaResults.set(structuredClone(remote.formulaResults));
    this.conflict.set(null);
    this.errorMessage.set(null);
    this.remoteRecord.set(null);
  }

  private identity(): string {
    return JSON.stringify([this.auth.currentUser()?.id ?? '',this.clinicalScope.id()]);
  }

  private alive(epoch: number): boolean {
    return !this.destroyed && epoch === this.epoch && this.identity() === this.owner;
  }
}
