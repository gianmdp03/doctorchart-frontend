import { Subject, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/services/auth.service';
import {
  DestroyRef,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatientDetailDTO } from '../../../core/models/patient.model';
import {
  PatientVaccinationDose,
  PatientVaccinationSchedule,
  VaccinationStatus,
} from '../../../core/models/vaccination.model';
import { PatientService } from '../../../core/services/patient.service';
import { PatientVaccinationService } from '../../../core/services/patient-vaccination.service';
import { DatePickerComponent } from '../../../shared/date-picker/date-picker.component';
@Component({
  selector: 'app-patient-vaccinations',
  imports: [FormsModule, DatePickerComponent],
  templateUrl: './patient-vaccinations.component.html',
  styleUrl: './patient-vaccinations.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientVaccinationsComponent {
  private readonly api = inject(PatientVaccinationService);
  private readonly patients = inject(PatientService);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly changed = new Subject<void>();
  private context = '';
  private epoch = 0;
  readonly patient = input.required<PatientDetailDTO>();
  readonly patientUpdated = output<PatientDetailDTO>();
  readonly schedule = signal<PatientVaccinationSchedule | null>(null);
  readonly isSaving = signal(false);
  readonly isLoading = signal(false);
  readonly saveError = signal<string | null>(null);
  readonly loadError = signal<string | null>(null);
  readonly ageLabel = computed(() => this.schedule()?.ageLabel ?? '—');
  readonly doses = computed(() => this.schedule()?.doses ?? []);
  readonly overdueDoses = computed(() => this.doses().filter((d) => d.status === 'PENDIENTE'));
  readonly currentDoses = computed(() => this.doses().filter((d) => d.status === 'ACTUAL'));
  readonly futureDoses = computed(() => this.doses().filter((d) => d.status === 'FUTURA'));
  readonly appliedDoses = computed(() => this.doses().filter((d) => d.status === 'APLICADA'));
  readonly canSave = computed(
    () =>
      !this.isSaving() &&
      !this.isLoading() &&
      this.schedule()?.patientVersion === this.patient().version,
  );
  constructor() {
    effect(() => {
      this.patient();
      this.auth.currentUser();
      untracked(() => this.syncContext());
    });
    this.destroyRef.onDestroy(() => {
      this.epoch++;
      this.changed.next();
      this.changed.complete();
    });
  }
  private contextKey() {
    return JSON.stringify([
      this.auth.currentUser()?.id ?? null,
      this.patient().id,
      this.patient().version,
    ]);
  }
  private syncContext() {
    const key = this.contextKey();
    if (key === this.context) return;
    const keepConfirmed =
      !!this.auth.currentUser()?.id &&
      this.context !== '' &&
      this.schedule()?.patientId === this.patient().id &&
      this.schedule()?.patientVersion === this.patient().version &&
      JSON.parse(this.context)[0] === this.auth.currentUser()?.id;
    this.changed.next();
    this.epoch++;
    this.context = key;
    this.isSaving.set(false);
    this.isLoading.set(false);
    this.saveError.set(null);
    this.loadError.set(null);
    if (!keepConfirmed) {
      this.schedule.set(null);
      if (this.auth.currentUser()?.id) this.loadSchedule();
    }
  }
  private current(key: string, epoch: number) {
    return !this.destroyRef.destroyed && key === this.contextKey() && epoch === this.epoch;
  }
  private loadSchedule() {
    const patient = this.patient(),
      key = this.context,
      epoch = this.epoch;
    this.isLoading.set(true);
    this.loadError.set(null);
    this.api
      .schedule(patient.id)
      .pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (schedule) => {
          if (!this.current(key, epoch)) return;
          this.isLoading.set(false);
          if (schedule.patientId !== patient.id) {
            this.loadError.set('La respuesta recibida no corresponde a este paciente.');
            return;
          }
          this.schedule.set(schedule);
          if (schedule.patientVersion !== patient.version)
            this.loadError.set('La ficha cambió. Actualizala antes de registrar vacunas.');
        },
        error: () => {
          if (this.current(key, epoch)) {
            this.isLoading.set(false);
            this.loadError.set('No se pudo cargar el calendario del paciente.');
          }
        },
      });
  }
  refresh() {
    this.syncContext();
    if (this.isSaving() || this.isLoading() || !this.auth.currentUser()?.id) return;
    const key = this.context,
      epoch = this.epoch,
      id = this.patient().id;
    this.isLoading.set(true);
    this.loadError.set(null);
    this.patients
      .getPatientById(id)
      .pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (patient) => {
          if (!this.current(key, epoch)) return;
          this.isLoading.set(false);
          if (patient.id !== id) {
            this.loadError.set('La respuesta recibida no corresponde a este paciente.');
            return;
          }
          this.saveError.set(null);
          this.patientUpdated.emit(patient);
          if (patient.version === this.patient().version) this.loadSchedule();
        },
        error: () => {
          if (this.current(key, epoch)) {
            this.isLoading.set(false);
            this.loadError.set('No se pudo actualizar la ficha del paciente.');
          }
        },
      });
  }
  toggleApplied(dose: PatientVaccinationDose, event: Event) {
    const target = event.target as HTMLInputElement,
      applied = target.checked;
    target.checked = dose.status === 'APLICADA';
    this.markApplied(dose, applied);
  }
  markApplied(dose: PatientVaccinationDose, applied: boolean) {
    this.persist(dose, applied);
  }
  updateDate(dose: PatientVaccinationDose, appliedAt: string, picker?: DatePickerComponent) {
    // Keep the visible value confirmed by the server while the write is pending.
    picker?.writeValue(dose.appliedAt);
    if (dose.status === 'APLICADA') this.persist(dose, true, appliedAt);
  }
  private persist(dose: PatientVaccinationDose, applied: boolean, appliedAt?: string) {
    this.syncContext();
    const schedule = this.schedule();
    if (
      !this.auth.currentUser()?.id ||
      !this.canSave() ||
      !schedule ||
      !this.doses().some((d) => d.id === dose.id)
    )
      return;
    const key = this.context,
      epoch = this.epoch,
      id = this.patient().id;
    this.isSaving.set(true);
    this.saveError.set(null);
    this.api
      .save(id, dose.id, {
        expectedVersion: schedule.patientVersion,
        calendarId: dose.calendarId,
        applied,
        ...(appliedAt !== undefined ? { appliedAt } : {}),
      })
      .pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (saved) => {
          if (!this.current(key, epoch)) return;
          this.isSaving.set(false);
          if (
            saved.patient.id !== id ||
            saved.schedule.patientId !== id ||
            saved.schedule.patientVersion !== saved.patient.version
          ) {
            this.saveError.set('La respuesta recibida no corresponde a este paciente.');
            return;
          }
          this.schedule.set(saved.schedule);
          this.patientUpdated.emit(saved.patient);
        },
        error: (error) => {
          if (!this.current(key, epoch)) return;
          this.isSaving.set(false);
          this.saveError.set(
            error.status === 409
              ? 'La ficha o el calendario cambiaron. Actualizá antes de volver a guardar.'
              : (error.error?.message ?? 'No se pudo guardar la aplicación de la vacuna.'),
          );
        },
      });
  }
  statusLabel(status: VaccinationStatus) {
    return {
      APLICADA: 'Aplicada',
      PENDIENTE: 'Pendiente',
      ACTUAL: 'Corresponde ahora',
      FUTURA: 'Futura',
    }[status];
  }
}
