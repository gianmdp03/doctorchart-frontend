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
  readonly actions = inject(PatientRecordActionsService);
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
  readonly categories = [
    {
      kind: 'ALLERGY' as const,
      title: 'Alergias',
      icon: 'lucideShieldAlert',
      empty: 'Sin alergias relevadas',
      none: 'No refiere alergias conocidas',
    },
    {
      kind: 'PROBLEM' as const,
      title: 'Problemas de salud',
      icon: 'lucideHeartPulse',
      empty: 'Sin problemas de salud relevados',
      none: 'No refiere enfermedades actuales',
    },
    {
      kind: 'MEDICATION' as const,
      title: 'Medicación habitual',
      icon: 'lucidePill',
      empty: 'Sin tratamiento habitual relevado',
      none: 'No utiliza medicación habitual',
    },
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
      this.active.patientId(),
      this.active.activePatient()?.version,
    ]);
  }
  reload(): void {
    const id = this.active.patientId();
    if (!id || !this.auth.currentUser()?.id) return;
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
  reviewed(kind: ClinicalEntryKind): boolean {
    return !!this.data()?.history?.[kind];
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
      void this.router.navigate(['/encounters', item.sourceId]);
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
  isOverdue(value: string): boolean {
    return value < (this.data()?.asOfDate ?? '');
  }
  patientSource(): void {
    void this.router.navigate(['/patients', this.active.patientId()], {
      queryParams: { tab: 'summary' },
      fragment: 'clinical-history',
    });
  }
  recordLink(tab: string, fragment?: string): void {
    void this.router.navigate(['/patients', this.active.patientId()], {
      queryParams: { tab },
      fragment,
    });
  }
}
