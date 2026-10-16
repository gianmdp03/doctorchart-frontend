import { userTimeZone } from '../../../core/date/user-time-zone';
import { computed, DestroyRef, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, of, Subscription, switchMap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ActivePatientService } from '../../../core/services/active-patient.service';
import { WorkspaceStore } from '../../../core/services/workspace.store';
import { PatientGrowthService } from '../../../core/services/patient-growth.service';
import {
  BiologicalSex,
  GrowthMetricType,
  PatientGrowthResponse,
} from '../../../core/models/growth-chart.model';

/** Record-scoped state survives tabs; confirmations and responses never cross patients/accounts. */
@Injectable()
export class PatientGrowthStore {
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  readonly activePatientService = inject(ActivePatientService);
  readonly growthService = inject(PatientGrowthService);
  private readonly workspaceStore = inject(WorkspaceStore);
  private growthRead = 0;
  private recordContext = '';
  private readSubscription?: Subscription;
  private readonly today = signal(this.userDay());
  readonly selectedGrowthMetric = signal<GrowthMetricType | 'ALL'>('WEIGHT');
  readonly showHistorical = signal(false);
  readonly response = signal<PatientGrowthResponse | null>(null);
  readonly confirmedSex = signal<BiologicalSex | null>(null);
  readonly isLoadingGrowthCurves = signal(false);
  readonly growthError = signal<string | null>(null);
  readonly patientSex = computed(() => this.response()?.referenceSex || null);
  readonly backendGrowthMeasurements = computed(() => this.response()?.observations ?? []);
  readonly availableCharts = computed(() =>
    (this.response()?.charts ?? []).filter(
      (c) => c.applicable || (this.showHistorical() && c.points.length > 0),
    ),
  );
  readonly categories = computed(() => {
    const categories = new Map<
      GrowthMetricType,
      { indicator: GrowthMetricType; title: string; count: number }
    >();
    for (const chart of this.availableCharts()) {
      const d = chart.definition;
      const category = categories.get(d.indicator) ?? {
        indicator: d.indicator,
        title: d.title,
        count: 0,
      };
      category.count += chart.points.length;
      categories.set(d.indicator, category);
    }
    return [...categories.values()];
  });
  readonly effectiveMetric = computed(() => {
    const selected = this.selectedGrowthMetric();
    return selected === 'ALL' || this.categories().some((c) => c.indicator === selected)
      ? selected
      : this.categories()[0]?.indicator;
  });
  readonly visibleCharts = computed(() =>
    this.availableCharts().filter(
      (c) => this.effectiveMetric() === 'ALL' || c.definition.indicator === this.effectiveMetric(),
    ),
  );
  private points(indicators: GrowthMetricType[]) {
    return (this.response()?.charts ?? [])
      .filter((c) => indicators.includes(c.definition.indicator))
      .flatMap((c) => c.points)
      .sort((a, b) => a.date.localeCompare(b.date));
  }
  readonly weightMeasurements = computed(() => this.points(['WEIGHT']));
  readonly heightMeasurements = computed(() => this.points(['HEIGHT', 'LENGTH']));
  readonly headCircumferenceMeasurements = computed(() => this.points(['HEAD_CIRCUMFERENCE']));
  readonly totalMeasurementsCount = computed(() =>
    this.backendGrowthMeasurements().reduce(
      (count, o) =>
        count +
        [o.weightKg, o.heightCm, o.headCircumferenceCm].filter(
          (v) => typeof v === 'number' && Number.isFinite(v) && v > 0,
        ).length,
      0,
    ),
  );
  readonly growthEnabled = computed(
    () =>
      this.workspaceStore.hasRecordTab('GROWTH') &&
      this.workspaceStore.isModuleActive('GROWTH_CHARTS'),
  );
  constructor() {
    interval(60_000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.today.set(this.userDay()));
    this.destroyRef.onDestroy(() => this.readSubscription?.unsubscribe());
    effect(() => {
      const patient = this.activePatientService.activePatient();
      this.authService.currentUser();
      this.growthEnabled();
      this.today();
      untracked(() => {
        const context = this.contextKey();
        if (context !== this.recordContext) {
          this.recordContext = context;
          this.growthRead++;
          this.response.set(null);
          this.growthError.set(null);
          this.confirmedSex.set(null);
          this.selectedGrowthMetric.set('WEIGHT');
          this.showHistorical.set(false);
        }
        if (patient?.id) this.loadGrowthCurves(patient.id);
        else {
          this.readSubscription?.unsubscribe();
          this.response.set(null);
          this.isLoadingGrowthCurves.set(false);
        }
      });
    });
  }
  private userDay(): string {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: userTimeZone(),
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  }
  private contextKey(): string {
    const patient = this.activePatientService.activePatient();
    return JSON.stringify([
      this.authService.currentUser()?.id ?? null,
      patient?.id,
      patient?.birthDate,
      patient?.gender,
    ]);
  }
  confirmSex(sex: BiologicalSex): void {
    this.confirmedSex.set(sex);
    this.reload();
  }
  clearSexConfirmation(): void {
    this.confirmedSex.set(null);
    this.reload();
  }
  reload(): void {
    const id = this.activePatientService.patientId();
    if (id) this.loadGrowthCurves(id);
  }
  loadGrowthCurves(patientId: number): void {
    const revision = ++this.growthRead;
    const context = this.contextKey();
    const referenceSex = this.confirmedSex();
    this.readSubscription?.unsubscribe();
    if (!this.growthEnabled()) {
      this.response.set(null);
      this.growthError.set(null);
      this.isLoadingGrowthCurves.set(false);
      return;
    }
    this.isLoadingGrowthCurves.set(true);
    this.growthError.set(null);
    this.readSubscription = this.growthService
      .getPatientGrowthCurves(patientId, referenceSex)
      .pipe(
        switchMap((data) => {
          if (
            !data ||
            data.patientId !== patientId ||
            data.status !== 'READY' ||
            revision !== this.growthRead ||
            context !== this.contextKey()
          )
            return of(data);
          // Supply the standard measuring workflow when the API has no stored
          // position. All derived values and evaluations still come from Go.
          const modes: Record<string, 'RECUMBENT' | 'STANDING'> = {};
          for (const observation of data.observations) {
            if (
              observation.measurementMode !== 'UNKNOWN' ||
              !Number.isFinite(observation.heightCm) ||
              (observation.heightCm ?? 0) <= 0 ||
              !Number.isInteger(observation.ageDays) ||
              observation.ageDays < 0
            )
              continue;
            const key = observation.source === 'BIRTH' ? 'BIRTH' : String(observation.encounterId);
            if (key !== 'BIRTH' && (!observation.encounterId || observation.encounterId <= 0))
              continue;
            modes[key] = observation.ageDays <= 730 ? 'RECUMBENT' : 'STANDING';
          }
          return Object.keys(modes).length
            ? this.growthService.getPatientGrowthCurves(patientId, referenceSex, modes)
            : of(data);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (data) => {
          if (
            revision !== this.growthRead ||
            patientId !== this.activePatientService.patientId() ||
            context !== this.contextKey()
          )
            return;
          if (!data || data.patientId !== patientId) {
            this.response.set(null);
            this.growthError.set('La respuesta de curvas no corresponde a este paciente.');
          } else this.response.set(data);
          this.isLoadingGrowthCurves.set(false);
        },
        error: () => {
          if (
            revision !== this.growthRead ||
            patientId !== this.activePatientService.patientId() ||
            context !== this.contextKey()
          )
            return;
          this.response.set(null);
          this.growthError.set('No se pudieron cargar las curvas y mediciones OMS.');
          this.isLoadingGrowthCurves.set(false);
        },
      });
  }
}
