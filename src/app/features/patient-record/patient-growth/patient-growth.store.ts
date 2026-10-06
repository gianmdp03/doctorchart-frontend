import { computed, DestroyRef, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/services/auth.service';
import { ActivePatientService } from '../../../core/services/active-patient.service';
import { WorkspaceStore } from '../../../core/services/workspace.store';
import { PatientGrowthService } from '../../../core/services/patient-growth.service';
import {
  BackendGrowthMeasurement,
  BiologicalSex,
  GrowthMetricType,
} from '../../../core/models/growth-chart.model';

/** Record-scoped module state; selectors survive tab changes, reads cannot cross the patient or account. */
@Injectable()
export class PatientGrowthStore {
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  readonly activePatientService = inject(ActivePatientService);
  readonly growthService = inject(PatientGrowthService);
  private readonly workspaceStore = inject(WorkspaceStore);
  private growthRead = 0;
  private recordContext = '';
  readonly selectedGrowthMetric = signal<GrowthMetricType | 'ALL'>('WEIGHT');

  readonly backendGrowthMeasurements = signal<BackendGrowthMeasurement[]>([]);

  readonly isLoadingGrowthCurves = signal<boolean>(false);

  readonly growthError = signal<string | null>(null);

  readonly patientSex = computed<BiologicalSex>(() =>
    this.growthService.normalizeGender(this.activePatientService.activePatient()?.gender),
  );

  readonly weightMeasurements = computed(() =>
    this.growthService.transformBackendMeasurements(
      this.backendGrowthMeasurements(),
      'WEIGHT',
      this.patientSex(),
    ),
  );

  readonly heightMeasurements = computed(() =>
    this.growthService.transformBackendMeasurements(
      this.backendGrowthMeasurements(),
      'HEIGHT',
      this.patientSex(),
    ),
  );

  readonly headCircumferenceMeasurements = computed(() =>
    this.growthService.transformBackendMeasurements(
      this.backendGrowthMeasurements(),
      'HEAD_CIRCUMFERENCE',
      this.patientSex(),
    ),
  );

  readonly totalMeasurementsCount = computed(
    () =>
      this.weightMeasurements().length +
      this.heightMeasurements().length +
      this.headCircumferenceMeasurements().length,
  );

  readonly growthEnabled = computed(() => this.workspaceStore.hasRecordTab('GROWTH') && this.workspaceStore.isModuleActive('GROWTH_CHARTS'));
  constructor() {
    effect(() => {
      const patient = this.activePatientService.activePatient();
      this.authService.currentUser();
      this.growthEnabled();
      untracked(() => {
        const context = this.contextKey();
        if (context !== this.recordContext) {
          this.recordContext = context;
          this.growthRead++;
          this.backendGrowthMeasurements.set([]);
          this.growthError.set(null);
        }
        if (patient?.id) this.loadGrowthCurves(patient.id);
        else {
          this.isLoadingGrowthCurves.set(false);
          this.backendGrowthMeasurements.set([]);
        }
      });
    });
  }
  private contextKey(): string {
    return JSON.stringify([
      this.authService.currentUser()?.id ?? null,
      this.activePatientService.patientId(),
    ]);
  }
  loadGrowthCurves(patientId: number): void {
    const revision = ++this.growthRead;
    const owner = this.authService.currentUser()?.id;
    if (!this.growthEnabled()) {
      this.backendGrowthMeasurements.set([]);
      this.growthError.set(null);
      this.isLoadingGrowthCurves.set(false);
      return;
    }
    this.isLoadingGrowthCurves.set(true);
    this.growthError.set(null);
    this.growthService
      .getPatientGrowthCurves(patientId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          if (
            revision !== this.growthRead ||
            patientId !== this.activePatientService.patientId() ||
            owner !== this.authService.currentUser()?.id
          )
            return;
          this.backendGrowthMeasurements.set(data || []);
          this.isLoadingGrowthCurves.set(false);
        },
        error: () => {
          if (
            revision !== this.growthRead ||
            patientId !== this.activePatientService.patientId() ||
            owner !== this.authService.currentUser()?.id
          )
            return;
          this.backendGrowthMeasurements.set([]);
          this.growthError.set('No se pudieron cargar las mediciones.');
          this.isLoadingGrowthCurves.set(false);
        },
      });
  }
}
