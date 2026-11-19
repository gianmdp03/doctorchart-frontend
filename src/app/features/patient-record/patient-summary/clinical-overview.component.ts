import { Component, computed, DestroyRef, effect, inject, signal, untracked } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideShieldAlert,
  lucideHeartPulse,
  lucidePill,
  lucideCalendarCheck,
  lucideSyringe,
  lucideClipboardList,
  lucideArrowUpRight,
  lucideRefreshCw,
  lucideFilePenLine,
} from '@ng-icons/lucide';
import { ClinicalEntryKind, ClinicalSummary } from '../../../core/models/clinical-summary.model';
import { ClinicalSummaryService } from '../../../core/services/clinical-summary.service';
import { ActivePatientService } from '../../../core/services/active-patient.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserClockService } from '../../../core/services/user-clock.service';
import { PatientRecordActionsService } from '../../../core/experience/patient-record-actions.service';
import { ClinicalContextService } from '../../../core/services/clinical-context.service';
import { WorkspaceStore } from '../../../core/services/workspace.store';
import { CLINICAL_HISTORY_GROUPS } from '../../../core/models/wizard-definition.model';
import {
  isWizardFieldVisible,
  wizardRecordEntries,
} from '../../../core/models/wizard-record-display';
import { formatInstant } from '../../../core/date/user-time-zone';
interface OverviewItem {
  key: string;
  text: string;
  details?: string;
  date: string;
  certainty: string;
  source: 'PATIENT' | 'ENCOUNTER' | 'LEGACY';
  sourceId: number;
}
@Component({
  selector: 'app-clinical-overview',
  imports: [RouterLink, NgIcon],
  providers: [
    provideIcons({
      lucideShieldAlert,
      lucideHeartPulse,
      lucidePill,
      lucideCalendarCheck,
      lucideSyringe,
      lucideClipboardList,
      lucideArrowUpRight,
      lucideRefreshCw,
      lucideFilePenLine,
    }),
  ],
  templateUrl: './clinical-overview.component.html',
  styleUrl: './clinical-overview.component.css',
})
export class ClinicalOverviewComponent {
  private readonly api = inject(ClinicalSummaryService);
  readonly active = inject(ActivePatientService);
  private readonly actions = inject(PatientRecordActionsService);
  private readonly scope = inject(ClinicalContextService);
  private readonly workspace = inject(WorkspaceStore);
  readonly contextParams = computed(() => ({ specialtyContextId: this.scope.id() }));
  readonly tabs = this.workspace.patientRecordTabs;
  readonly specialtyName = this.workspace.specialtyDisplayName;
  private readonly auth = inject(AuthService);
  private readonly clock = inject(UserClockService);
  private readonly destroy = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly changed = new Subject<void>();
  private revision = 0;
  readonly data = signal<ClinicalSummary | null>(null);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly legacyOpen = signal(false);
  private readonly negativeHistory = {
    ALLERGY: 'No refiere alergias conocidas',
    PROBLEM: 'No refiere enfermedades actuales',
    MEDICATION: 'No utiliza medicación habitual',
  };
  readonly categories = computed(() =>
    CLINICAL_HISTORY_GROUPS.map((category) => ({
      ...category,
      none: this.negativeHistory[category.kind],
      items: this.items(category.kind),
    })).filter(
      (category) =>
        category.items.length ||
        this.data()?.history?.[category.kind] ||
        (category.kind === 'ALLERGY' && this.data()?.profile.noKnownAllergiesAt),
    ),
  );
  readonly canEditHistory = computed(() => {
    const patient = this.active.activePatient();
    return (
      this.actions.has('EDIT_PATIENT') &&
      !!patient &&
      CLINICAL_HISTORY_GROUPS.some(
        (group) =>
          isWizardFieldVisible(patient.formDefinitionSnapshot, patient.formValues, group.status) ||
          isWizardFieldVisible(patient.formDefinitionSnapshot, patient.formValues, group.details),
      )
    );
  });
  readonly specialtySections = computed(() => {
    const patient = this.active.activePatient();
    const form = this.workspace.definition()?.patientForm;
    if (!patient || !form || !this.data()) return [];

    return form.categories.flatMap((category) => {
      if (
        !category.enabled ||
        category.system ||
        category.key === 'sys_clinical_history' ||
        category.key === 'sys_patient_profile'
      )
        return [];
      const entries = wizardRecordEntries(
        patient,
        (savedCategory, field) =>
          savedCategory.key === category.key &&
          isWizardFieldVisible(form, patient.formValues, field.key),
      ).filter((entry) => entry.value.trim());
      return entries.length ? [{ key: category.key, title: category.title, entries }] : [];
    });
  });
  readonly lastEncounter = computed(() =>
    this.tabs().includes('ENCOUNTERS') ? this.data()?.lastEncounter : null,
  );
  readonly pendingItems = computed(() => this.items('PENDING').slice(0, 2));
  readonly vaccinationSchedule = computed(() =>
    this.tabs().includes('VACCINATION') ? this.data()?.vaccinations : null,
  );
  readonly pendingVaccines = computed(
    () =>
      this.vaccinationSchedule()?.doses.filter(
        (d) => d.status === 'PENDIENTE' || d.status === 'ACTUAL',
      ) ?? [],
  );
  readonly latestVaccine = computed(
    () =>
      [...(this.vaccinationSchedule()?.doses ?? [])]
        .filter((d) => d.appliedAt)
        .sort((a, b) => (b.appliedAt ?? '').localeCompare(a.appliedAt ?? ''))[0],
  );
  constructor() {
    effect(() => {
      this.active.activePatient();
      this.scope.id();
      this.auth.currentUser();
      this.clock.day();
      untracked(() => {
        this.changed.next();
        this.revision++;
        this.data.set(null);
        this.loading.set(false);
        this.error.set('');
        this.legacyOpen.set(false);
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
      this.scope.id(),
      this.active.patientId(),
      this.active.activePatient()?.version,
    ]);
  }
  reload(): void {
    const id = this.active.patientId();
    if (!id || !this.scope.id() || !this.auth.currentUser()?.id) return;
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
          this.data.set(data);
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
    if (id) this.active.loadPatient(id);
  }
  items(kind: ClinicalEntryKind): OverviewItem[] {
    const data = this.data(),
      group = data?.history?.[kind];
    if (group)
      return group.items.map((text, i) => ({
        key: kind + i,
        text,
        date: group.date,
        certainty: group.certainty,
        source: group.source,
        sourceId: group.sourceId,
      }));
    return [
      ...(data?.profile.entries ?? []).filter((e) => e.kind === kind && e.status === 'ACTIVE'),
      ...(data?.historical ?? []).filter((e) => e.kind === kind),
    ].map((e) => ({
      key: e.id,
      text: e.text,
      details: e.details,
      date: e.verifiedAt ?? e.date,
      certainty: e.certainty,
      source: 'LEGACY',
      sourceId: 0,
    }));
  }
  date(value: string | null | undefined): string {
    if (!value) return 'Fecha no registrada';
    if (value.includes('T')) return formatInstant(value, false);
    const [y, m, d] = value.split('-');
    return `${d}/${m}/${y}`;
  }
  provenance(item: OverviewItem): string {
    return `${item.certainty === 'CONFIRMED' ? 'Corroborado' : 'Informado'} · ${this.date(item.date)}`;
  }
  openItem(item: OverviewItem): void {
    if (item.source === 'ENCOUNTER') {
      void this.router.navigate(['/encounters', item.sourceId], {
        queryParams: this.contextParams(),
      });
    } else if (item.source === 'PATIENT') {
      this.patientSource();
    } else {
      this.legacyOpen.set(true);
      requestAnimationFrame(() =>
        this.document
          .getElementById('legacy-clinical-history')
          ?.scrollIntoView?.({ block: 'center', behavior: 'smooth' }),
      );
    }
  }
  patientSource(): void {
    this.recordLink('summary', 'clinical-history');
  }
  recordLink(tab: string, fragment?: string): void {
    void this.router.navigate(['/patients', this.active.patientId()], {
      queryParams: { ...this.contextParams(), tab },
      fragment,
    });
  }
}
