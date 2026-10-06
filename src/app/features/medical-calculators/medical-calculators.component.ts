import { AuthService } from '../../core/services/auth.service';
import {
  ChangeDetectionStrategy,
  DestroyRef,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  untracked,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, finalize, forkJoin, map, of, Subject, switchMap, takeUntil, timer } from 'rxjs';
import { createCalculatorSessions, summarizeCalculatorInputs } from './calculators/calculator-registry';
import { CalculatorFormState } from './calculators/calculator-form';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideActivity,
  lucideAlertCircle,
  lucideArrowRight,
  lucideBaby,
  lucideCalculator,
  lucideCalendar,
  lucideCheck,
  lucideCheckCircle2,
  lucideChevronDown,
  lucideChevronUp,
  lucideCopy,
  lucideDroplets,
  lucideFilter,
  lucideFlaskConical,
  lucideHeart,
  lucideHistory,
  lucideInfo,
  lucidePill,
  lucidePlus,
  lucideRefreshCw,
  lucideRotateCcw,
  lucideSave,
  lucideSearch,
  lucideSettings,
  lucideShieldAlert,
  lucideSparkles,
  lucideStethoscope,
  lucideTrash2,
  lucideUser,
  lucideUserCheck,
  lucideWeight,
  lucideX,
} from '@ng-icons/lucide';
import {
  CalculationExecutionRequestDTO,
  CalculationPreviewRequestDTO,
  CalculationResult,
  CalculatorId,
  PatientAutofillDataDTO,
  PatientCalculationLogDetailDTO,
  DoctorCalculatorPreferenceDTO,
  SavedCalculationItem,
} from '../../core/models/medical-calculators.model';
import {
  MedicalCalculatorsService,
} from '../../core/services/medical-calculators.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DatePickerComponent } from '../../shared/date-picker/date-picker.component';

@Component({
  selector: 'app-medical-calculators',
  imports: [CommonModule, FormsModule, NgIcon, DatePickerComponent],
  providers: [
    provideIcons({
      lucideCalculator,
      lucideWeight,
      lucideActivity,
      lucideStethoscope,
      lucideHeart,
      lucideFlaskConical,
      lucideCopy,
      lucideCheck,
      lucideSave,
      lucideTrash2,
      lucideInfo,
      lucideRotateCcw,
      lucideHistory,
      lucideUserCheck,
      lucideArrowRight,
      lucideSearch,
      lucideShieldAlert,
      lucideDroplets,
      lucideBaby,
      lucidePill,
      lucideSparkles,
      lucideSettings,
      lucideX,
      lucideFilter,
      lucideCalendar,
      lucideChevronDown,
      lucideChevronUp,
      lucideCheckCircle2,
      lucideAlertCircle,
      lucideRefreshCw,
      lucidePlus,
      lucideUser,
    }),
  ],
  templateUrl: './medical-calculators.component.html',
  styleUrl: './medical-calculators.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalCalculatorsComponent implements OnInit {
  readonly calcService = inject(MedicalCalculatorsService);
  private readonly auth = inject(AuthService);
  private readonly changed = new Subject<void>();
  private context = '';
  private historyRead = 0;
  private owner = this.auth.currentUser()?.id;
  private readonly actorChanged = new Subject<void>();
  readonly contextRevision = signal(0);
  readonly localHistory = computed(() => this.calcService.savedHistory().filter(item => item.patientId === (this.activePatient()?.id ?? null)));
  private contextKey(): string { return JSON.stringify([this.auth.currentUser()?.id ?? null,this.activePatientService.activePatient()?.id ?? null]); }

  private readonly destroyRef = inject(DestroyRef);
  readonly activePatientService = inject(ActivePatientService);

  // View mode: 'calculator' | 'history'
  readonly activeTab = signal<'calculator' | 'history'>('calculator');

  // Selected calculator & filtering
  readonly selectedId = signal<CalculatorId>('imc');
  readonly categoryFilter = signal<string>('all');
  readonly searchQuery = signal<string>('');
  readonly onlyFavorites = signal<boolean>(false);

  // Doctor "Mis Cálculos" & Catalog Modal
  readonly myCalculatorsCodes = signal<string[]>([]);
  readonly isLoadingSetup = signal(false);
  readonly setupLoaded = signal(false);
  readonly preferencesError = signal<string | null>(null);
  readonly isCatalogModalOpen = signal<boolean>(false);
  readonly modalSearchQuery = signal<string>('');
  readonly modalCategoryFilter = signal<string>('all');
  readonly isUpdatingPreferences = signal<boolean>(false);

  // Notifications & Feedbacks
  readonly copyFeedback = signal<boolean>(false);
  readonly saveFeedback = signal<boolean>(false);
  readonly autofillBannerMessage = signal<string | null>(null);
  readonly autofillAlertSeverity = signal<'success' | 'warning' | 'info'>('info');
  readonly isAutofilling = signal<boolean>(false);
  readonly isSavingLog = signal<boolean>(false);

  // Patient Backend History
  readonly patientBackendHistory = signal<PatientCalculationLogDetailDTO[]>([]);
  readonly isLoadingHistory = signal<boolean>(false);
  readonly historyFilterCode = signal<string>('all');
  readonly historyDateFrom = signal<string>('');
  readonly historyDateTo = signal<string>('');
  readonly expandedHistoryLogId = signal<number | null>(null);

  private readonly calculatorSessions = createCalculatorSessions();
  readonly currentCalculator = computed(() => this.calculatorSessions.get(this.selectedId()));
  readonly calculatorComponentInputs = computed(() => ({ form: this.currentCalculator()?.form }));

  // -------------------------------------------------------------
  // Active Patient Context Helpers
  // -------------------------------------------------------------
  readonly activePatient = computed(() => this.activePatientService.activePatient());

  readonly activePatientAgeYears = computed(() => {
    const rawBirth = this.activePatient()?.birthDate;
    if (!rawBirth) return null;
    const birth = new Date(rawBirth + 'T00:00:00');
    if (isNaN(birth.getTime())) return null;
    const diffMs = Date.now() - birth.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  });

  readonly activePatientGender = computed<'FEMALE' | 'MALE' | null>(() => {
    const g = this.activePatient()?.gender?.toUpperCase();
    if (g === 'FEMALE' || g === 'F' || g === 'MUJER' || g === 'FEMENINO') return 'FEMALE';
    if (g === 'MALE' || g === 'M' || g === 'HOMBRE' || g === 'MASCULINO') return 'MALE';
    return null;
  });

  readonly activePatientWeight = computed<number | null>(() => {
    return this.activePatient()?.latestMeasurements?.weight ?? null;
  });

  readonly activePatientHeight = computed<number | null>(() => {
    return this.activePatient()?.latestMeasurements?.height ?? null;
  });

  // Filtered catalog for left sidebar
  readonly filteredCalculators = computed(() => {
    const cat = this.categoryFilter();
    const query = this.searchQuery().toLowerCase().trim();
    const favOnly = this.onlyFavorites();
    const favCodes = this.myCalculatorsCodes();

    return this.calcService.calculators().filter((item) => {
      const matchFav = !favOnly || favCodes.includes(item.id);
      const matchCat = cat === 'all' || item.category === cat;
      const matchQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.shortName.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);
      return matchFav && matchCat && matchQuery;
    });
  });

  // Doctor favorite calculators metadata list
  readonly favoriteCalculatorsList = computed(() => {
    const favCodes = this.myCalculatorsCodes();
    return this.calcService.calculators().filter((c) => favCodes.includes(c.id));
  });

  // Modal filtered catalog
  readonly modalFilteredCalculators = computed(() => {
    const cat = this.modalCategoryFilter();
    const query = this.modalSearchQuery().toLowerCase().trim();
    return this.calcService.calculators().filter((item) => {
      const matchCat = cat === 'all' || item.category === cat;
      const matchQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.shortName.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });
  });

  readonly currentMetadata = computed(() =>
    this.calcService.calculators().find(c => c.id === this.selectedId()));

  readonly isCurrentInputComplete = computed(() => this.currentCalculator()?.form.complete() ?? false);
  readonly currentInputs = computed(() => this.currentCalculator()?.form.inputs() ?? {});

  readonly previewRequest = computed<CalculationPreviewRequestDTO | null>(() => this.setupLoaded() && this.currentMetadata() && this.isCurrentInputComplete()
    ? { calculationCode: this.selectedId(), inputSnapshot: this.currentInputs() } : null);
  private readonly previewResult = signal<{ context: string; requestKey: string; result: CalculationResult } | null>(null);
  readonly currentResult = computed(() => {
    const request = this.previewRequest(), preview = this.previewResult();
    return request && preview?.context === this.contextKey() && preview?.requestKey === JSON.stringify(request) ? preview.result : null;
  });
  readonly isCalculating = signal(false);
  readonly calculationError = signal<string | null>(null);
  readonly saveError = signal<string | null>(null);

  constructor() {
    this.context = this.contextKey();
    toObservable(computed(() => ({request:this.previewRequest(), context:this.contextKey()}))).pipe(
      switchMap(({request,context}) => {
        this.syncContext();
        if (context !== this.contextKey() || JSON.stringify(request) !== JSON.stringify(this.previewRequest())) return of(null);
        this.calculationError.set(null);
        this.saveFeedback.set(false);
        this.saveError.set(null);
        this.isCalculating.set(!!request);
        if (!request) return of(null);
        const requestKey = JSON.stringify(request);
        return timer(150).pipe(
          switchMap(() => this.calcService.previewCalculation(request)),
          map(result => ({ context, requestKey, result })),
          catchError(error => {
            if (context !== this.contextKey()) return of(null);
            this.calculationError.set(error.error?.message ?? 'No se pudo calcular el resultado.');
            return of(null);
          }),
          finalize(() => { if (context === this.contextKey()) this.isCalculating.set(false); }),
        );
      }),
      takeUntilDestroyed(),
    ).subscribe(preview => this.previewResult.set(preview));
    effect(() => {
      this.auth.currentUser(); this.activePatient();
      untracked(() => { this.syncContext(); this.loadPatientHistory(); });
    });
  }

  private syncContext(): void {
    const context = this.contextKey();
    if (context === this.context) return;
    this.changed.next(); this.context = context; this.historyRead++;
    const owner = this.auth.currentUser()?.id;
    if (owner !== this.owner) {
      this.owner = owner; this.actorChanged.next();
      this.isLoadingSetup.set(false); this.isUpdatingPreferences.set(false);
      this.setupLoaded.set(false); this.myCalculatorsCodes.set([]); this.preferencesError.set(null);
      if (owner) this.loadCalculatorSetup();
    }
    this.contextRevision.update(value => value + 1);
    for (const calculator of this.calculatorSessions.values()) calculator.form.reset();
    this.isCalculating.set(false); this.previewResult.set(null); this.patientBackendHistory.set([]); this.expandedHistoryLogId.set(null);
    this.historyFilterCode.set('all'); this.historyDateFrom.set(''); this.historyDateTo.set('');
    this.isAutofilling.set(false); this.isSavingLog.set(false); this.isLoadingHistory.set(false);
    this.autofillBannerMessage.set(null); this.saveFeedback.set(false); this.copyFeedback.set(false);
    this.saveError.set(null); this.calculationError.set(null); this.isCatalogModalOpen.set(false);
  }

  ngOnInit(): void {
    this.loadCalculatorSetup();
  }

  // -------------------------------------------------------------
  // Doctor Preferences ("Mis Cálculos")
  // -------------------------------------------------------------
  loadCalculatorSetup(): void {
    if (this.isLoadingSetup() || this.isUpdatingPreferences()) return;
    const owner = this.auth.currentUser()?.id;
    this.isLoadingSetup.set(true);
    this.setupLoaded.set(false);
    this.preferencesError.set(null);
    this.calcService.calculators.set([]);
    forkJoin({ catalog: this.calcService.getCatalogFromBackend(), preferences: this.calcService.getDoctorPreferences() })
      .pipe(takeUntil(this.actorChanged), takeUntilDestroyed(this.destroyRef), finalize(() => { if (owner === this.auth.currentUser()?.id) this.isLoadingSetup.set(false); }))
      .subscribe({
        next: ({ catalog, preferences }) => {
          if (owner !== this.auth.currentUser()?.id) return;
          this.calcService.calculators.set(catalog);
          this.applyPreferences(preferences, true);
          this.setupLoaded.set(true);
        },
        error: () => { if (owner === this.auth.currentUser()?.id) this.preferencesError.set('No se pudieron cargar las calculadoras. Volvé a intentar.'); },
      });
  }

  private applyPreferences(preferences: DoctorCalculatorPreferenceDTO, selectFavorite = false): void {
    const codes = preferences.favoriteCalculationCodes;
    this.myCalculatorsCodes.set(codes);
    const catalog = this.calcService.calculators();
    if ((selectFavorite && codes.length && !codes.includes(this.selectedId())) || !this.currentMetadata()) {
      const first = catalog.find(item => item.id === codes[0]) ?? catalog[0];
      if (first) this.selectedId.set(first.id);
    }
  }

  toggleFavoriteCalculator(code: string): void {
    if (!this.setupLoaded() || this.isUpdatingPreferences() || !this.calcService.calculators().some(item => item.id === code)) return;
    const current = [...this.myCalculatorsCodes()];
    const index = current.indexOf(code);
    if (index >= 0) {
      if (current.length === 1) {
        alert('Debes mantener al menos una calculadora activa en tu panel.');
        return;
      }
      current.splice(index, 1);
    } else {
      current.push(code);
    }
    this.persistDoctorPreferences(current);
  }

  private persistDoctorPreferences(codes: string[]): void {
    if (!this.setupLoaded() || this.isUpdatingPreferences()) return;
    const owner = this.auth.currentUser()?.id;
    this.isUpdatingPreferences.set(true);
    this.preferencesError.set(null);
    this.calcService.updateDoctorPreferences(codes)
      .pipe(takeUntil(this.actorChanged), takeUntilDestroyed(this.destroyRef), finalize(() => { if (owner === this.auth.currentUser()?.id) this.isUpdatingPreferences.set(false); }))
      .subscribe({
        next: preference => { if (owner === this.auth.currentUser()?.id) this.applyPreferences(preference); },
        error: () => { if (owner === this.auth.currentUser()?.id) this.preferencesError.set('No se pudieron guardar los favoritos. Volvé a intentar.'); },
      });
  }

  restoreSpecialtyDefaults(): void {
    if (!this.setupLoaded() || this.isUpdatingPreferences()) return;
    const owner = this.auth.currentUser()?.id;
    this.isUpdatingPreferences.set(true);
    this.preferencesError.set(null);
    this.calcService.resetDoctorPreferences()
      .pipe(takeUntil(this.actorChanged), takeUntilDestroyed(this.destroyRef), finalize(() => { if (owner === this.auth.currentUser()?.id) this.isUpdatingPreferences.set(false); }))
      .subscribe({
        next: preference => { if (owner === this.auth.currentUser()?.id) this.applyPreferences(preference, true); },
        error: () => { if (owner === this.auth.currentUser()?.id) this.preferencesError.set('No se pudieron restablecer los favoritos. Volvé a intentar.'); },
      });
  }

  // -------------------------------------------------------------
  // Smart Autofill from Patient Context & Clinical History
  // -------------------------------------------------------------
  autofillFromPatient(): void {
    this.syncContext();
    const context = this.context;
    const patient = this.activePatient();
    if (!patient?.id) {
      this.autofillBannerMessage.set('No hay ningún paciente activo seleccionado para autocompletar.');
      this.autofillAlertSeverity.set('warning');
      return;
    }

    const calculator = this.currentCalculator();
    if (!calculator || this.isAutofilling()) return;
    const isCurrentForm = () => context === this.contextKey() && this.currentCalculator() === calculator && this.activePatient()?.id === patient.id;

    this.isAutofilling.set(true);
    this.autofillBannerMessage.set(null);

    this.calcService.getPatientAutofillData(patient.id)
      .pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef), finalize(() => { if (context === this.contextKey()) this.isAutofilling.set(false); }))
      .subscribe({
        next: (data: PatientAutofillDataDTO) => {
          if (isCurrentForm() && data.patientId === patient.id) this.applyAutofillData(data, calculator.form);
        },
        error: (err) => {
          if (!isCurrentForm()) return;
          console.warn('Backend autofill failed, falling back to cached patient record:', err);
          this.applyFallbackAutofill(calculator.form);
        },
      });
  }

  private applyAutofillData(data: PatientAutofillDataDTO, form: CalculatorFormState): void {
    const gender: 'FEMALE' | 'MALE' | null =
      data.gender?.toUpperCase() === 'FEMALE' ? 'FEMALE' :
      data.gender?.toUpperCase() === 'MALE' ? 'MALE' : this.activePatientGender();
    const { filledParams, missingParams } = form.autofill({
      age: data.ageYears ?? this.activePatientAgeYears(), gender,
      weight: data.weightKg ?? this.activePatientWeight(), height: data.heightCm ?? this.activePatientHeight(),
      creatinine: data.creatinineMgDl, calcium: data.serumCalciumMgDl, albumin: data.serumAlbuminGDl,
    });

    if (missingParams.length === 0) {
      this.autofillBannerMessage.set(
        `Datos autocompletados desde la última consulta del paciente: ${filledParams.join(', ')}.`
      );
      this.autofillAlertSeverity.set('success');
    } else if (filledParams.length > 0) {
      this.autofillBannerMessage.set(
        `Se cargaron: ${filledParams.join(', ')}. Pendientes por completar en ficha: ${missingParams.join(', ')}.`
      );
      this.autofillAlertSeverity.set('info');
    } else {
      this.autofillBannerMessage.set(
        `No se encontraron parámetros registrados en la ficha para esta calculadora (${missingParams.join(', ')}). Ingrésalos manualmente.`
      );
      this.autofillAlertSeverity.set('warning');
    }

    const revision = this.contextRevision();
    const context = this.context; setTimeout(() => { if (revision === this.contextRevision() && context === this.contextKey() && !this.destroyRef.destroyed) this.autofillBannerMessage.set(null); }, 6000);
  }

  private applyFallbackAutofill(form: CalculatorFormState): void {
    const age = this.activePatientAgeYears();
    const gender = this.activePatientGender();
    const weight = this.activePatientWeight();
    const height = this.activePatientHeight();

    const fallbackDTO: PatientAutofillDataDTO = {
      patientId: this.activePatient()?.id ?? 0,
      fullName: this.activePatient()?.fullName ?? '',
      birthDate: this.activePatient()?.birthDate ?? null,
      ageYears: age,
      gender,
      weightKg: weight,
      heightCm: height,
      systolicBloodPressure: null,
      diastolicBloodPressure: null,
      creatinineMgDl: null,
      serumCalciumMgDl: null,
      serumAlbuminGDl: null,
      encounterId: null,
      encounterDate: null,
    };
    this.applyAutofillData(fallbackDTO, form);
  }

  // -------------------------------------------------------------
  // Reset Inputs
  // -------------------------------------------------------------
  resetCurrentInputs(): void {
    this.currentCalculator()?.form.reset();
  }

  // -------------------------------------------------------------
  // Actions
  // -------------------------------------------------------------
  selectCalculator(id: CalculatorId): void {
    this.selectedId.set(id);
    this.activeTab.set('calculator');
  }

  async copyResultText(): Promise<void> {
    const revision = this.contextRevision();
    const context = this.contextKey();
    const res = this.currentResult();
    if (!res) return;

    const ok = await this.calcService.copyToClipboard(res.plainTextEvolution);
    if (ok && revision === this.contextRevision() && context === this.contextKey() && !this.destroyRef.destroyed) {
      this.copyFeedback.set(true);
      setTimeout(() => { if (revision === this.contextRevision() && context === this.contextKey() && !this.destroyRef.destroyed) this.copyFeedback.set(false); }, 2200);
    }
  }

  saveResultToRecord(): void {
    this.syncContext();
    const context = this.context;
    const result = this.currentResult();
    if (!result || this.isSavingLog()) return;
    const patient = this.activePatient();
    const snapshot = this.currentInputs();
    this.saveError.set(null);
    this.saveFeedback.set(false);
    if (!patient?.id) {
      this.calcService.saveCalculation({
        calculatorId: result.calculatorId, calculatorName: result.calculationName,
        patientId: null, patientName: null, resultHeadline: `${result.formattedValue} ${result.unit}`,
        interpretationLabel: result.interpretation.label, severity: result.interpretation.severity,
        calculatedAt: result.calculatedAt, plainTextEvolution: result.plainTextEvolution,
        inputsSummary: summarizeCalculatorInputs(result.calculatorId, snapshot),
      });
      this.showSaveSuccess();
      return;
    }
    this.isSavingLog.set(true);
    const payload: CalculationExecutionRequestDTO = {
      patientId: patient.id, calculationCode: result.calculatorId, inputSnapshot: snapshot,
    };
    this.calcService.executeAndSaveToBackend(payload).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: savedLog => {
        if (context !== this.contextKey()) return;
        if (savedLog.patientId !== patient.id) { this.isSavingLog.set(false); this.saveError.set('La respuesta no corresponde al paciente seleccionado.'); return; }
        this.isSavingLog.set(false);
        this.calcService.saveCalculation({
          calculatorId: savedLog.calculationCode as CalculatorId, calculatorName: savedLog.calculationName,
          patientId: savedLog.patientId, patientName: savedLog.patientFullName, resultHeadline: savedLog.formattedResult,
          interpretationLabel: savedLog.resultInterpretation ?? '', severity: savedLog.severity as SavedCalculationItem['severity'],
          calculatedAt: savedLog.createdAt, plainTextEvolution: savedLog.plainTextEvolution ?? '',
          inputsSummary: summarizeCalculatorInputs(savedLog.calculationCode as CalculatorId, savedLog.inputSnapshot),
        });
        if (this.activePatient()?.id === savedLog.patientId) {
          this.patientBackendHistory.update(history => [savedLog, ...history]);
          this.showSaveSuccess();
        }
      },
      error: error => {
        if (context !== this.contextKey()) return;
        this.isSavingLog.set(false);
        this.saveError.set(error.error?.message ?? 'No se pudo guardar el cálculo.');
      },
    });
  }

  private showSaveSuccess(): void {
    this.saveFeedback.set(true);
    const revision = this.contextRevision();
    const context = this.context; setTimeout(() => { if (revision === this.contextRevision() && context === this.contextKey() && !this.destroyRef.destroyed) this.saveFeedback.set(false); }, 2500);
  }

  historyInputSummary(log: PatientCalculationLogDetailDTO): Record<string, string | number | boolean> {
    return summarizeCalculatorInputs(log.calculationCode as CalculatorId, log.inputSnapshot);
  }

  // -------------------------------------------------------------
  // Patient Backend History Actions & Filters
  // -------------------------------------------------------------
  loadPatientHistory(): void {
    this.syncContext();
    const context = this.context;
    const revision = ++this.historyRead;
    const patientId = this.activePatient()?.id;
    if (!patientId) {
      this.patientBackendHistory.set([]);
      return;
    }

    this.isLoadingHistory.set(true);
    const code = this.historyFilterCode();
    const from = this.historyDateFrom() ? new Date(this.historyDateFrom()).toISOString() : undefined;
    const to = this.historyDateTo() ? new Date(this.historyDateTo() + 'T23:59:59').toISOString() : undefined;

    this.calcService.getPatientHistoryFromBackend(patientId, code, from, to).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (history) => {
        if (context !== this.contextKey() || revision !== this.historyRead) return;
        this.isLoadingHistory.set(false);
        this.patientBackendHistory.set(history);
      },
      error: (err) => {
        if (context !== this.contextKey() || revision !== this.historyRead) return;
        this.isLoadingHistory.set(false);
        console.error('Error fetching patient calculation history', err);
      },
    });
  }

  toggleExpandLog(id: number): void {
    this.expandedHistoryLogId.update((current) => (current === id ? null : id));
  }

  async copyHistoryEvolution(evolutionText?: string): Promise<void> {
    const revision = this.contextRevision();
    const context = this.contextKey();
    if (!evolutionText) return;
    const ok = await this.calcService.copyToClipboard(evolutionText);
    if (ok && revision === this.contextRevision() && context === this.contextKey() && !this.destroyRef.destroyed) {
      this.copyFeedback.set(true);
      setTimeout(() => { if (revision === this.contextRevision() && context === this.contextKey() && !this.destroyRef.destroyed) this.copyFeedback.set(false); }, 2200);
    }
  }

  deleteLocalHistoryItem(item: SavedCalculationItem): void {
    this.syncContext();
    if (item.patientId === (this.activePatient()?.id ?? null)) this.calcService.deleteCalculation(item.id);
  }

  clearLocalHistory(): void {
    if (confirm('¿Estás seguro de que deseas vaciar el historial local de cálculos?')) {
      this.syncContext();
      this.calcService.clearHistory(this.activePatient()?.id ?? null);
    }
  }
}
