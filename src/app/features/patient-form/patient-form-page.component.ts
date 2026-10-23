import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  viewChild,
  signal,
} from '@angular/core';
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
} from '../../core/models/wizard-definition.model';
import { DynamicFormRendererComponent, inputValues } from '../dynamic-form-renderer/dynamic-form-renderer.component';
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
      this.submissionAttempted.set(false);
      const idParam = params.get('id');
      if (idParam) {
        const id = Number(idParam);
        if (!isNaN(id) && id > 0) {
          this.patientId.set(id);
          this.isEditMode.set(true);
          void this.loadPatientForEdit(id);
          return;
        }
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
      this.definition.set(structuredClone(patient.formDefinitionSnapshot));
      this.values.set(structuredClone(patient.formValues));
      this.formulaResults.set(structuredClone(patient.formulaResults));
    } catch (error) {
      if (this.alive(epoch)) {
        this.errorMessage.set(errorMessage(error, 'No pudimos cargar los datos del paciente para editar.'));
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
        throw new Error('Completá la configuración de tu especialidad antes de registrar pacientes.');
      }
      this.workspace.set(structuredClone(workspace));
      this.definition.set(structuredClone(workspace.definition.patientForm));
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
      this.formulaResults.set({});
    }
  }

  onFormValidityChange(valid: boolean): void {
    this.isFormValid.set(valid);
  }

  cancel(): void {
    if (this.isEditMode() && this.patientId()) {
      void this.router.navigate(['/pacientes', this.patientId()]);
    } else {
      void this.router.navigate(['/pacientes']);
    }
  }

  async submit(): Promise<void> {
    if (this.readonly()) return;
    this.submissionAttempted.set(true);
    if (!this.isFormValid()) { this.formRenderer()?.focusFirstInvalidField(); return; }
    const definition = this.definition();
    const record = this.record();
    const workspace = this.workspace();

    if (!definition || this.readonly() || !this.isFormValid()) return;
    if (!record && !workspace) return;

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    const epoch = ++this.epoch;

    try {
      const values = inputValues(definition, this.values());
      const saved = await firstValueFrom(
        record
          ? this.patientService.updatePatient(record.id, {
              expectedVersion: record.version,
              values,
            })
          : this.patientService.createPatient({
              workspaceVersion: workspace!.version,
              values,
            }),
      );

      if (!this.alive(epoch)) return;

      this.activePatientService.setActivePatient(saved);
      this.activePatientService.loadPatient(saved.id);
      void this.router.navigate(['/pacientes', saved.id]);
    } catch (error) {
      if (this.alive(epoch)) {
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
    if (!this.conflict() || this.isSubmitting() || this.isLoading() || this.identity() !== this.owner) {
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
    if (!remote?.definition || !previous || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner) {
      return;
    }
    this.values.set(retainCompatibleValues(previous, remote.definition.patientForm, this.values()));
    this.workspace.set(structuredClone(remote));
    this.definition.set(structuredClone(remote.definition.patientForm));
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
    this.definition.set(structuredClone(remote.formDefinitionSnapshot));
    this.values.set(structuredClone(remote.formValues));
    this.formulaResults.set(structuredClone(remote.formulaResults));
    this.conflict.set(null);
    this.errorMessage.set(null);
    this.remoteRecord.set(null);
  }

  private identity(): string {
    return this.auth.currentUser()?.id ?? '';
  }

  private alive(epoch: number): boolean {
    return !this.destroyed && epoch === this.epoch && this.identity() === this.owner;
  }
}
