import { UserClockService } from '../../core/services/user-clock.service';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  viewChild,
  signal,
  untracked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { AuthService } from '../../core/services/auth.service';
import { PatientEncountersStore } from '../patient-record/patient-encounters/patient-encounters.store';
import {
  ClinicalEncounterDetail,
  ConsultationType,
} from '../../core/models/clinical-encounter.model';
import { WorkspaceSetup } from '../../core/models/workspace.model';
import {
  WizardFormDefinition,
  WizardFormValues,
  withClinicalHistory,
} from '../../core/models/wizard-definition.model';
import {
  DynamicFormRendererComponent,
  inputValues,
} from '../dynamic-form-renderer/dynamic-form-renderer.component';
import { ClinicalHistoryReferenceComponent } from './clinical-history-reference.component';
import {
  userDateTime,
  conflictKind,
  errorMessage,
  retainCompatibleValues,
} from '../dynamic-form-renderer/clinical-form-ui';

@Component({
  selector: 'app-encounter-form',
  imports: [FormsModule, DynamicFormRendererComponent, ClinicalHistoryReferenceComponent],
  templateUrl: './encounter-form.component.html',
  styleUrl: './encounter-form.component.css',
})
export class EncounterFormComponent implements OnInit, OnDestroy {
  private readonly encounterService = inject(ClinicalEncounterService);
  private readonly workspaceStore = inject(WorkspaceStore);
  private readonly auth = inject(AuthService);
  private readonly historyStore = inject(PatientEncountersStore, { optional: true });

  private epoch = 0;
  private destroyed = false;
  private owner = '';
  private contextPatient: number | null = null;

  readonly patientId = input.required<number>();
  readonly patientName = input<string>('');
  readonly previousEncountersCount = input<number>(0);

  readonly cancel = output<void>();
  readonly encounterCreated = output<ClinicalEncounterDetail>();

  readonly consultationType = signal<ConsultationType>('FIRST_VISIT');
  private readonly clock = inject(UserClockService);
  get timeZone(): string {
    return this.clock.timeZone();
  }
  readonly recordedInstant = signal<string>(new Date().toISOString());
  readonly encounterDay = computed(() => {
    try {
      return userDateTime(this.recordedInstant()).day;
    } catch {
      return '';
    }
  });
  readonly encounterTime = computed(() => {
    try {
      return userDateTime(this.recordedInstant()).time;
    } catch {
      return '';
    }
  });
  readonly definition = signal<WizardFormDefinition | null>(null);
  readonly workspace = signal<WorkspaceSetup | null>(null);
  readonly dynamicFormData = signal<WizardFormValues>({});
  readonly isDynamicFormValid = signal(false);
  readonly submissionAttempted = signal(false);
  private readonly formRenderer = viewChild(DynamicFormRendererComponent);
  readonly isLoading = signal(false);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly hasConflict = signal(false);
  readonly remoteWorkspace = signal<WorkspaceSetup | null>(null);

  readonly formattedCurrentDateTime = computed(() => {
    const instant = this.recordedInstant();
    if (!instant) return '';
    try {
      const parts = userDateTime(instant);
      const match = parts.day.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (!match) return `${parts.day} ${parts.time} hs`;
      return `${match[3]}/${match[2]}/${match[1]} a las ${parts.time} hs`;
    } catch {
      return instant;
    }
  });

  readonly readonly = computed(
    () =>
      this.isLoading() ||
      this.isSubmitting() ||
      this.hasConflict() ||
      this.identity() !== this.owner ||
      this.patientId() !== this.contextPatient,
  );

  readonly allConsultationTypes: { value: ConsultationType; label: string }[] = [
    { value: 'FIRST_VISIT', label: 'Primera consulta' },
    { value: 'FOLLOW_UP', label: 'Control / seguimiento' },
    { value: 'ROUTINE_CHECKUP', label: 'Chequeo de rutina' },
    { value: 'EMERGENCY', label: 'Urgencia' },
    { value: 'INTERCONSULTATION', label: 'Interconsulta' },
  ];

  readonly isFirstVisitLocked = computed(() => this.previousEncountersCount() <= 0);

  readonly availableConsultationTypes = computed(() => {
    if (this.isFirstVisitLocked()) {
      return this.allConsultationTypes.filter((type) => type.value === 'FIRST_VISIT');
    }
    return this.allConsultationTypes.filter((type) => type.value !== 'FIRST_VISIT');
  });

  get consultationTypes(): { value: ConsultationType; label: string }[] {
    return this.availableConsultationTypes();
  }

  selectConsultationType(type: ConsultationType): void {
    if (this.readonly() || this.isFirstVisitLocked()) {
      return;
    }
    this.consultationType.set(type);
    this.historyStore?.setEncounterDraft(this.dynamicFormData(), type, this.recordedInstant());
  }

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

    effect(() => {
      const patientId = this.patientId();
      const identity = this.identity();
      untracked(() => {
        this.epoch++;
        this.owner = identity;
        this.contextPatient = patientId;
        this.isLoading.set(false);
        this.isSubmitting.set(false);
        this.resetForm();
        if (patientId) {
          void this.loadForm();
        }
      });
    });
  }

  ngOnInit(): void {
    if (!this.definition()) {
      this.resetForm();
      void this.loadForm();
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.epoch++;
  }

  async loadForm(): Promise<void> {
    const patientId = this.patientId();
    if (
      !patientId ||
      this.isLoading() ||
      this.isSubmitting() ||
      this.identity() !== this.owner ||
      patientId !== this.contextPatient
    ) {
      return;
    }

    const epoch = this.epoch;
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const workspace = await this.workspaceStore.loadSetup();
      if (!this.alive(epoch)) return;
      if (!workspace?.onboardingCompleted || !workspace.definition) {
        throw new Error('El formulario clínico no está disponible.');
      }
      this.workspace.set(structuredClone(workspace));
      this.definition.set(withClinicalHistory(structuredClone(workspace.definition.encounterForm)));
    } catch (error) {
      if (this.alive(epoch)) {
        this.errorMessage.set(
          errorMessage(error, 'No pudimos cargar el formulario de historia clínica.'),
        );
      }
    } finally {
      if (this.alive(epoch)) {
        this.isLoading.set(false);
      }
    }
  }

  onDynamicDataChange(values: WizardFormValues): void {
    if (!this.readonly()) {
      this.dynamicFormData.set(structuredClone(values));
      this.historyStore?.setEncounterDraft(values, this.consultationType(), this.recordedInstant());
    }
  }
  reviewHistory(values: WizardFormValues): void {
    this.onDynamicDataChange({ ...this.dynamicFormData(), ...values });
  }

  onDynamicFormValidityChange(valid: boolean): void {
    this.isDynamicFormValid.set(valid);
  }

  async submitEncounter(): Promise<void> {
    if (this.readonly()) return;
    this.submissionAttempted.set(true);
    if (!this.isDynamicFormValid()) {
      this.formRenderer()?.focusFirstInvalidField();
      return;
    }
    const workspace = this.workspace();
    const definition = this.definition();
    const patientId = this.patientId();

    if (!workspace || !definition || !patientId || !this.isDynamicFormValid() || this.readonly()) {
      return;
    }

    const epoch = this.epoch;
    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const effectiveConsultationType = this.isFirstVisitLocked()
      ? 'FIRST_VISIT'
      : this.consultationType() === 'FIRST_VISIT'
        ? 'FOLLOW_UP'
        : this.consultationType();

    try {
      const created = await firstValueFrom(
        this.encounterService.create({
          patientId,
          workspaceVersion: workspace.version,
          consultationType: effectiveConsultationType,
          values: inputValues(definition, this.dynamicFormData()),
        }),
      );

      if (!this.alive(epoch)) return;
      if (created.patientId !== patientId) {
        throw new Error('La consulta recibida corresponde a otro paciente.');
      }

      this.historyStore?.clearEncounterDraft();
      this.encounterCreated.emit(created);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('encounter-created', { detail: created }));
      }
      this.isSubmitting.set(false);
      this.definition.set(null);
      this.epoch++;
    } catch (error) {
      if (this.alive(epoch)) {
        this.hasConflict.set(!!conflictKind(error));
        this.errorMessage.set(
          errorMessage(
            error,
            'No pudimos guardar la historia clínica. Tus respuestas se conservan.',
          ),
        );
      }
    } finally {
      if (epoch === this.epoch && !this.destroyed) {
        this.isSubmitting.set(false);
      }
    }
  }

  async reviewRemote(): Promise<void> {
    if (
      !this.hasConflict() ||
      this.isLoading() ||
      this.isSubmitting() ||
      this.identity() !== this.owner ||
      this.patientId() !== this.contextPatient
    ) {
      return;
    }

    const epoch = this.epoch;
    this.isLoading.set(true);
    this.remoteWorkspace.set(null);

    try {
      const remote = await this.workspaceStore.loadSetup(true);
      if (this.alive(epoch) && remote?.onboardingCompleted && remote.definition) {
        this.remoteWorkspace.set(structuredClone(remote));
      }
    } catch (error) {
      if (this.alive(epoch)) {
        this.errorMessage.set(errorMessage(error, 'No pudimos consultar la configuración actual.'));
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
      this.identity() !== this.owner ||
      this.patientId() !== this.contextPatient
    ) {
      return;
    }

    this.dynamicFormData.set(
      retainCompatibleValues(previous, remote.definition.encounterForm, this.dynamicFormData()),
    );
    this.workspace.set(structuredClone(remote));
    this.definition.set(structuredClone(remote.definition.encounterForm));
    this.hasConflict.set(false);
    this.remoteWorkspace.set(null);
    this.errorMessage.set(null);
  }

  resetForm(force = false): void {
    this.submissionAttempted.set(false);
    this.workspace.set(null);
    this.definition.set(null);
    this.errorMessage.set(null);
    this.hasConflict.set(false);
    this.remoteWorkspace.set(null);

    const draftValues = !force ? this.historyStore?.encounterDraftValues() : null;
    const draftType = !force ? this.historyStore?.encounterDraftConsultationType() : null;
    const draftInstant = !force ? this.historyStore?.encounterDraftInstant() : null;

    if (draftValues && Object.keys(draftValues).length > 0) {
      this.dynamicFormData.set(structuredClone(draftValues));
    } else {
      this.dynamicFormData.set({});
      this.isDynamicFormValid.set(false);
      this.submissionAttempted.set(false);
    }

    if (draftType) {
      this.consultationType.set(draftType);
    } else {
      this.consultationType.set(this.previousEncountersCount() <= 0 ? 'FIRST_VISIT' : 'FOLLOW_UP');
    }

    if (draftInstant) {
      this.recordedInstant.set(draftInstant);
    } else {
      this.recordedInstant.set(new Date().toISOString());
    }
  }

  onCancel(): void {
    if (!this.isSubmitting()) {
      this.epoch++;
      this.historyStore?.clearEncounterDraft();
      this.resetForm(true);
      this.cancel.emit();
    }
  }

  private identity(): string {
    return this.auth.currentUser()?.id ?? '';
  }

  private alive(epoch: number): boolean {
    return (
      !this.destroyed &&
      epoch === this.epoch &&
      this.identity() === this.owner &&
      this.patientId() === this.contextPatient
    );
  }
}
