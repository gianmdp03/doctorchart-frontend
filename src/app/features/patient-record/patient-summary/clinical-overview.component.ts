import { Component, computed, DestroyRef, effect, inject, signal, untracked } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';
import {
  ClinicalEntry,
  ClinicalEntryKind,
  ClinicalProfileChange,
  ClinicalSummary,
} from '../../../core/models/clinical-summary.model';
import { ClinicalSummaryService } from '../../../core/services/clinical-summary.service';
import { ActivePatientService } from '../../../core/services/active-patient.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserClockService } from '../../../core/services/user-clock.service';
import { PatientRecordActionsService } from '../../../core/experience/patient-record-actions.service';
import { DatePickerComponent } from '../../../shared/date-picker/date-picker.component';
import { formatInstant } from '../../../core/date/user-time-zone';

@Component({
  selector: 'app-clinical-overview',
  imports: [FormsModule, RouterLink, DatePickerComponent],
  templateUrl: './clinical-overview.component.html',
  styleUrl: './clinical-overview.component.css',
})
export class ClinicalOverviewComponent {
  private readonly api = inject(ClinicalSummaryService);
  readonly active = inject(ActivePatientService);
  readonly actions = inject(PatientRecordActionsService);
  private readonly auth = inject(AuthService);
  private readonly clock = inject(UserClockService);
  private readonly destroy = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly changed = new Subject<void>();
  private revision = 0;
  private draftContext = '';
  private loadedContext = '';
  readonly data = signal<ClinicalSummary | null>(null);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly saveError = signal('');
  readonly editorOpen = signal(false);
  readonly recordsOpen = signal(false);
  kind: ClinicalEntryKind = 'ALLERGY';
  text = '';
  details = '';
  date = '';
  certainty: 'CONFIRMED' | 'REPORTED' = 'REPORTED';
  readonly categories: { kind: ClinicalEntryKind; title: string; empty: string }[] = [
    {
      kind: 'ALLERGY',
      title: 'Alergias',
      empty: 'Sin información de alergias. Falta revisar con el paciente.',
    },
    { kind: 'PROBLEM', title: 'Problemas activos', empty: 'Sin problemas activos registrados.' },
    {
      kind: 'MEDICATION',
      title: 'Medicación vigente',
      empty: 'Sin medicación vigente confirmada.',
    },
    { kind: 'PENDING', title: 'Pendientes relevantes', empty: 'Sin pendientes registrados.' },
  ];
  readonly pendingVaccines = computed(
    () =>
      this.data()?.vaccinations?.doses.filter(
        (d) => d.status === 'PENDIENTE' || d.status === 'ACTUAL',
      ) ?? [],
  );
  readonly latestVaccine = computed(
    () =>
      [...(this.data()?.vaccinations?.doses ?? [])]
        .filter((d) => d.appliedAt)
        .sort((a, b) => (b.appliedAt ?? '').localeCompare(a.appliedAt ?? ''))[0],
  );
  readonly canSave = computed(
    () =>
      !!this.auth.currentUser()?.id &&
      this.actions.has('EDIT_PATIENT') &&
      !this.loading() &&
      !this.saving() &&
      !!this.data() &&
      this.loadedContext === this.context() &&
      this.data()?.patientId === this.active.patientId() &&
      this.data()?.patientVersion === this.active.activePatient()?.version,
  );
  constructor() {
    effect(() => {
      this.active.activePatient();
      this.auth.currentUser();
      this.clock.day();
      untracked(() => {
        this.changed.next();
        this.revision++;
        this.data.set(null);
        this.loading.set(false);
        this.error.set('');
        this.saving.set(false);
        const identity = JSON.stringify([this.auth.currentUser()?.id, this.active.patientId()]);
        if (identity !== this.draftContext) {
          this.draftContext = identity;
          this.editorOpen.set(false);
          this.recordsOpen.set(false);
          this.saveError.set('');
          this.text = '';
          this.details = '';
          this.date = '';
          this.certainty = 'REPORTED';
        }
        this.reload();
      });
    });
    this.destroy.onDestroy(() => {
      this.changed.next();
      this.changed.complete();
    });
  }
  private context() {
    return JSON.stringify([
      this.auth.currentUser()?.id,
      this.active.patientId(),
      this.active.activePatient()?.version,
    ]);
  }
  reload(): void {
    const id = this.active.patientId();
    if (!id || !this.auth.currentUser()?.id || this.saving()) return;
    this.changed.next();
    const revision = ++this.revision,
      context = this.context();
    this.loading.set(true);
    this.error.set('');
    this.data.set(null);
    this.api
      .get(id)
      .pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroy))
      .subscribe({
        next: (data) => {
          if (revision !== this.revision || context !== this.context()) return;
          this.loading.set(false);
          if (
            data.patientId !== id ||
            data.patientVersion !== this.active.activePatient()?.version
          ) {
            this.error.set('La ficha cambió. Actualizala para ver el resumen.');
            return;
          }
          this.loadedContext = context;
          this.data.set(data);
          this.date ||= data.asOfDate;
        },
        error: () => {
          if (revision === this.revision && context === this.context()) {
            this.loading.set(false);
            this.error.set('No se pudo cargar el resumen clínico.');
          }
        },
      });
  }
  refresh(): void {
    const id = this.active.patientId();
    if (id && !this.saving()) this.active.loadPatient(id);
  }
  entries(kind: ClinicalEntryKind): ClinicalEntry[] {
    return (
      this.data()?.profile.entries.filter((e) => e.kind === kind && e.status === 'ACTIVE') ?? []
    ).sort((a, b) =>
      kind === 'PENDING'
        ? a.date.localeCompare(b.date)
        : (b.verifiedAt ?? b.date).localeCompare(a.verifiedAt ?? a.date),
    );
  }
  historical(kind: ClinicalEntryKind): ClinicalEntry[] {
    return this.data()?.historical.filter((e) => e.kind === kind) ?? [];
  }
  formatDate(date: string | null | undefined): string {
    if (!date) return 'Fecha no registrada';
    const [y, m, d] = date.slice(0, 10).split('-');
    return `${d}/${m}/${y}`;
  }
  formatInstant = formatInstant;
  label(kind: ClinicalEntryKind): string {
    return this.categories.find((c) => c.kind === kind)?.title ?? kind;
  }
  status(entry: ClinicalEntry): string {
    return entry.status === 'RESOLVED'
      ? 'Cerrado / inactivo'
      : entry.certainty === 'CONFIRMED'
        ? 'Confirmado'
        : 'Informado · a confirmar';
  }
  openEditor(kind: ClinicalEntryKind): void {
    this.kind = kind;
    this.editorOpen.set(true);
    this.recordsOpen.set(true);
    this.openSource();
  }
  openSource(id?: string): void {
    this.recordsOpen.set(true);
    const context = this.context();
    // Wait for Angular to render the expanded source list before moving focus.
    requestAnimationFrame(() => {
      if (this.destroy.destroyed || context !== this.context()) return;
      const element = this.document.getElementById(
        id ? 'clinical-entry-' + id : 'clinical-profile',
      );
      element?.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
      element?.focus({ preventScroll: true });
    });
  }
  add(): void {
    this.save({
      operation: 'ADD',
      kind: this.kind,
      text: this.text.trim(),
      details: this.details.trim(),
      date: this.date,
      certainty: this.certainty,
    });
  }
  resolve(entry: ClinicalEntry): void {
    this.save({ operation: 'RESOLVE', entryId: entry.id });
  }
  verifyCurrentEntry(entry: ClinicalEntry): void {
    this.save({ operation: 'CONFIRM', entryId: entry.id });
  }
  noKnownAllergies(): void {
    this.save({ operation: 'NO_KNOWN_ALLERGIES' });
  }
  private save(change: ClinicalProfileChange): void {
    const data = this.data();
    if (!data || !this.canSave()) return;
    const context = this.context(),
      revision = this.revision;
    this.saving.set(true);
    this.saveError.set('');
    this.api
      .save(data.patientId, data.patientVersion, change)
      .pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroy))
      .subscribe({
        next: (patient) => {
          if (revision !== this.revision || context !== this.context()) return;
          this.saving.set(false);
          if (patient.id !== data.patientId || patient.version <= data.patientVersion) {
            this.saveError.set(
              'La respuesta no corresponde a esta ficha. Actualizá antes de guardar.',
            );
            return;
          }
          this.saveError.set('');
          this.editorOpen.set(false);
          this.text = '';
          this.details = '';
          this.certainty = 'REPORTED';
          this.active.setActivePatient(patient);
        },
        error: (error) => {
          if (revision !== this.revision || context !== this.context()) return;
          this.saving.set(false);
          this.saveError.set(
            error.status === 409
              ? 'La ficha cambió. Actualizá antes de volver a guardar; el borrador se conserva.'
              : (error.error?.message ?? 'No se pudo guardar el dato clínico.'),
          );
        },
      });
  }
  recordLink(tab: string, fragment?: string): void {
    void this.router.navigate(['/patients', this.active.patientId()], {
      queryParams: { tab },
      fragment,
    });
  }
}
