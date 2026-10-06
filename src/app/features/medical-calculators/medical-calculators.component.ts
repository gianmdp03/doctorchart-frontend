import {
  ChangeDetectionStrategy,
  DestroyRef,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, finalize, forkJoin, map, of, switchMap, timer } from 'rxjs';
import { calculatorInputSummary } from '../../core/models/calculator-input-summary';
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

  // -------------------------------------------------------------
  // Calculator Inputs (Signals - initialized to null for strict validation)
  // -------------------------------------------------------------
  // 1. IMC
  readonly bmiWeight = signal<number | null>(null);
  readonly bmiHeight = signal<number | null>(null);

  // 2. TFGe (CKD-EPI 2021)
  readonly tfgeCreatinine = signal<number | null>(null);
  readonly tfgeAge = signal<number | null>(null);
  readonly tfgeGender = signal<'FEMALE' | 'MALE'>('MALE');

  // 3. Cockcroft-Gault
  readonly cockcroftWeight = signal<number | null>(null);
  readonly cockcroftAge = signal<number | null>(null);
  readonly cockcroftCreatinine = signal<number | null>(null);
  readonly cockcroftGender = signal<'FEMALE' | 'MALE'>('MALE');

  // 4. CHA2DS2-VASc
  readonly chadsAge = signal<number | null>(null);
  readonly chadsFemale = signal<boolean>(false);
  readonly chadsHeartFailure = signal<boolean>(false);
  readonly chadsHypertension = signal<boolean>(false);
  readonly chadsDiabetes = signal<boolean>(false);
  readonly chadsStroke = signal<boolean>(false);
  readonly chadsVascular = signal<boolean>(false);

  // 5. Calcio Corregido
  readonly calciumValue = signal<number | null>(null);
  readonly albuminValue = signal<number | null>(null);

  // 6. Holliday-Segar (Pediatría)
  readonly hollidayWeight = signal<number | null>(null);

  // 7. BSA Mosteller (Pediatría / Adulto)
  readonly bsaWeight = signal<number | null>(null);
  readonly bsaHeight = signal<number | null>(null);

  // 8. Dosificación Pediátrica (mg/kg)
  readonly pediatricWeight = signal<number | null>(null);
  readonly pediatricTargetDose = signal<number | null>(null);
  readonly pediatricDoseUnit = signal<'mg/kg/dia' | 'mg/kg/dosis'>('mg/kg/dia');
  readonly pediatricDrugConcentrationMg = signal<number | null>(null);
  readonly pediatricDrugConcentrationMl = signal<number | null>(null);
  readonly pediatricDosesPerDay = signal<number>(3);

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

  // Current inputs completeness check
  readonly isCurrentInputComplete = computed<boolean>(() => {
    const id = this.selectedId();
    switch (id) {
      case 'imc':
        return !!(this.bmiWeight() && this.bmiHeight() && this.bmiWeight()! > 0 && this.bmiHeight()! > 0);
      case 'tfge':
        return !!(this.tfgeCreatinine() && this.tfgeAge() && this.tfgeCreatinine()! > 0 && this.tfgeAge()! > 0);
      case 'cockcroft':
        return !!(
          this.cockcroftWeight() &&
          this.cockcroftAge() &&
          this.cockcroftCreatinine() &&
          this.cockcroftWeight()! > 0 &&
          this.cockcroftAge()! > 0 &&
          this.cockcroftCreatinine()! > 0
        );
      case 'chads_vasc':
        return this.chadsAge() !== null && this.chadsAge()! >= 0;
      case 'calcio_corregido':
        return !!(
          this.calciumValue() &&
          this.albuminValue() &&
          this.calciumValue()! > 0 &&
          this.albuminValue()! > 0
        );
      case 'holliday_segar':
        return !!(this.hollidayWeight() && this.hollidayWeight()! > 0);
      case 'bsa_mosteller':
        return !!(this.bsaWeight() && this.bsaHeight() && this.bsaWeight()! > 0 && this.bsaHeight()! > 0);
      case 'pediatric_dosage':
        return !!(
          this.pediatricWeight() &&
          this.pediatricTargetDose() &&
          this.pediatricDrugConcentrationMg() &&
          this.pediatricDrugConcentrationMl() &&
          this.pediatricDosesPerDay() &&
          this.pediatricWeight()! > 0 &&
          this.pediatricTargetDose()! > 0 &&
          this.pediatricDrugConcentrationMg()! > 0 &&
          this.pediatricDrugConcentrationMl()! > 0 &&
          this.pediatricDosesPerDay() > 0
        );
      default:
        return false;
    }
  });

  // -------------------------------------------------------------
  // Dynamic Results Computation
  // -------------------------------------------------------------
  readonly currentInputs = computed<Record<string, unknown>>(() => {
    const id = this.selectedId();

    switch (id) {
      case 'imc':
        return {
          weightKg: this.bmiWeight(),
          heightCm: this.bmiHeight(),
        };
      case 'tfge':
        return {
          creatinineMgDl: this.tfgeCreatinine(),
          ageYears: this.tfgeAge(),
          gender: this.tfgeGender(),
        };
      case 'cockcroft':
        return {
          weightKg: this.cockcroftWeight(),
          ageYears: this.cockcroftAge(),
          creatinineMgDl: this.cockcroftCreatinine(),
          gender: this.cockcroftGender(),
        };
      case 'chads_vasc':
        return {
          ageYears: this.chadsAge(),
          isFemale: this.chadsFemale(),
          congestiveHeartFailure: this.chadsHeartFailure(),
          hypertension: this.chadsHypertension(),
          diabetes: this.chadsDiabetes(),
          strokeOrTia: this.chadsStroke(),
          vascularDisease: this.chadsVascular(),
        };
      case 'calcio_corregido':
        return {
          serumCalciumMgDl: this.calciumValue(),
          serumAlbuminGDl: this.albuminValue(),
        };
      case 'holliday_segar':
        return {
          weightKg: this.hollidayWeight(),
        };
      case 'bsa_mosteller':
        return {
          weightKg: this.bsaWeight(),
          heightCm: this.bsaHeight(),
        };
      case 'pediatric_dosage':
        return {
          weightKg: this.pediatricWeight(),
          targetDoseMgKg: this.pediatricTargetDose(),
          doseUnit: this.pediatricDoseUnit(),
          drugConcentrationMg: this.pediatricDrugConcentrationMg(),
          drugConcentrationMl: this.pediatricDrugConcentrationMl(),
          dosesPerDay: this.pediatricDosesPerDay(),
        };
      default:
        return {};
    }
  });

  readonly previewRequest = computed<CalculationPreviewRequestDTO | null>(() => this.setupLoaded() && this.currentMetadata() && this.isCurrentInputComplete()
    ? { calculationCode: this.selectedId(), inputSnapshot: this.currentInputs() } : null);
  private readonly previewResult = signal<{ requestKey: string; result: CalculationResult } | null>(null);
  readonly currentResult = computed(() => {
    const request = this.previewRequest(), preview = this.previewResult();
    return request && preview?.requestKey === JSON.stringify(request) ? preview.result : null;
  });
  readonly isCalculating = signal(false);
  readonly calculationError = signal<string | null>(null);
  readonly saveError = signal<string | null>(null);

  constructor() {
    toObservable(this.previewRequest).pipe(
      switchMap(request => {
        this.calculationError.set(null);
        this.saveFeedback.set(false);
        this.saveError.set(null);
        this.isCalculating.set(!!request);
        if (!request) return of(null);
        const requestKey = JSON.stringify(request);
        return timer(150).pipe(
          switchMap(() => this.calcService.previewCalculation(request)),
          map(result => ({ requestKey, result })),
          catchError(error => {
            this.calculationError.set(error.error?.message ?? 'No se pudo calcular el resultado.');
            return of(null);
          }),
          finalize(() => this.isCalculating.set(false)),
        );
      }),
      takeUntilDestroyed(),
    ).subscribe(preview => this.previewResult.set(preview));
    // Automatically load backend history whenever the active patient changes
    effect(() => {
      const patient = this.activePatient();
      if (patient?.id) {
        this.loadPatientHistory();
      } else {
        this.patientBackendHistory.set([]);
      }
    });
  }

  ngOnInit(): void {
    this.loadCalculatorSetup();
    if (this.activePatient()?.id) {
      this.loadPatientHistory();
    }
  }

  // -------------------------------------------------------------
  // Doctor Preferences ("Mis Cálculos")
  // -------------------------------------------------------------
  loadCalculatorSetup(): void {
    if (this.isLoadingSetup() || this.isUpdatingPreferences()) return;
    this.isLoadingSetup.set(true);
    this.setupLoaded.set(false);
    this.preferencesError.set(null);
    this.calcService.calculators.set([]);
    forkJoin({ catalog: this.calcService.getCatalogFromBackend(), preferences: this.calcService.getDoctorPreferences() })
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.isLoadingSetup.set(false)))
      .subscribe({
        next: ({ catalog, preferences }) => {
          this.calcService.calculators.set(catalog);
          this.applyPreferences(preferences, true);
          this.setupLoaded.set(true);
        },
        error: () => this.preferencesError.set('No se pudieron cargar las calculadoras. Volvé a intentar.'),
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
    this.isUpdatingPreferences.set(true);
    this.preferencesError.set(null);
    this.calcService.updateDoctorPreferences(codes)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.isUpdatingPreferences.set(false)))
      .subscribe({
        next: preference => this.applyPreferences(preference),
        error: () => this.preferencesError.set('No se pudieron guardar los favoritos. Volvé a intentar.'),
      });
  }

  restoreSpecialtyDefaults(): void {
    if (!this.setupLoaded() || this.isUpdatingPreferences()) return;
    this.isUpdatingPreferences.set(true);
    this.preferencesError.set(null);
    this.calcService.resetDoctorPreferences()
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.isUpdatingPreferences.set(false)))
      .subscribe({
        next: preference => this.applyPreferences(preference, true),
        error: () => this.preferencesError.set('No se pudieron restablecer los favoritos. Volvé a intentar.'),
      });
  }

  // -------------------------------------------------------------
  // Smart Autofill from Patient Context & Clinical History
  // -------------------------------------------------------------
  autofillFromPatient(): void {
    const patient = this.activePatient();
    if (!patient?.id) {
      this.autofillBannerMessage.set('No hay ningún paciente activo seleccionado para autocompletar.');
      this.autofillAlertSeverity.set('warning');
      return;
    }

    this.isAutofilling.set(true);
    this.autofillBannerMessage.set(null);

    this.calcService.getPatientAutofillData(patient.id).subscribe({
      next: (data: PatientAutofillDataDTO) => {
        this.isAutofilling.set(false);
        this.applyAutofillData(data);
      },
      error: (err) => {
        this.isAutofilling.set(false);
        console.warn('Backend autofill failed, falling back to cached patient record:', err);
        this.applyFallbackAutofill();
      },
    });
  }

  private applyAutofillData(data: PatientAutofillDataDTO): void {
    const id = this.selectedId();
    const filledParams: string[] = [];
    const missingParams: string[] = [];

    // Demographic parameters
    const age = data.ageYears ?? this.activePatientAgeYears();
    const gender: 'FEMALE' | 'MALE' | null =
      data.gender?.toUpperCase() === 'FEMALE' ? 'FEMALE' :
      data.gender?.toUpperCase() === 'MALE' ? 'MALE' :
      this.activePatientGender();

    const weight = data.weightKg ?? this.activePatientWeight();
    const height = data.heightCm ?? this.activePatientHeight();
    const creatinine = data.creatinineMgDl;
    const calcium = data.serumCalciumMgDl;
    const albumin = data.serumAlbuminGDl;

    switch (id) {
      case 'imc':
        if (weight != null && weight > 0) {
          this.bmiWeight.set(weight);
          filledParams.push(`Peso: ${weight} kg`);
        } else {
          this.bmiWeight.set(null);
          missingParams.push('Peso');
        }

        if (height != null && height > 0) {
          this.bmiHeight.set(height);
          filledParams.push(`Talla: ${height} cm`);
        } else {
          this.bmiHeight.set(null);
          missingParams.push('Talla');
        }
        break;

      case 'tfge':
        if (creatinine != null && creatinine > 0) {
          this.tfgeCreatinine.set(creatinine);
          filledParams.push(`Creatinina: ${creatinine} mg/dL`);
        } else {
          this.tfgeCreatinine.set(null);
          missingParams.push('Creatinina sérica');
        }

        if (age != null && age > 0) {
          this.tfgeAge.set(age);
          filledParams.push(`Edad: ${age} años`);
        } else {
          this.tfgeAge.set(null);
          missingParams.push('Edad');
        }

        if (gender) {
          this.tfgeGender.set(gender);
          filledParams.push(`Sexo: ${gender === 'FEMALE' ? 'Femenino' : 'Masculino'}`);
        }
        break;

      case 'cockcroft':
        if (weight != null && weight > 0) {
          this.cockcroftWeight.set(weight);
          filledParams.push(`Peso: ${weight} kg`);
        } else {
          this.cockcroftWeight.set(null);
          missingParams.push('Peso');
        }

        if (age != null && age > 0) {
          this.cockcroftAge.set(age);
          filledParams.push(`Edad: ${age} años`);
        } else {
          this.cockcroftAge.set(null);
          missingParams.push('Edad');
        }

        if (creatinine != null && creatinine > 0) {
          this.cockcroftCreatinine.set(creatinine);
          filledParams.push(`Creatinina: ${creatinine} mg/dL`);
        } else {
          this.cockcroftCreatinine.set(null);
          missingParams.push('Creatinina sérica');
        }

        if (gender) {
          this.cockcroftGender.set(gender);
          filledParams.push(`Sexo: ${gender === 'FEMALE' ? 'Femenino' : 'Masculino'}`);
        }
        break;

      case 'chads_vasc':
        if (age != null && age >= 0) {
          this.chadsAge.set(age);
          filledParams.push(`Edad: ${age} años`);
        } else {
          this.chadsAge.set(null);
          missingParams.push('Edad');
        }
        if (gender) {
          this.chadsFemale.set(gender === 'FEMALE');
          filledParams.push(`Sexo: ${gender === 'FEMALE' ? 'Femenino' : 'Masculino'}`);
        }
        break;

      case 'calcio_corregido':
        if (calcium != null && calcium > 0) {
          this.calciumValue.set(calcium);
          filledParams.push(`Calcio: ${calcium} mg/dL`);
        } else {
          this.calciumValue.set(null);
          missingParams.push('Calcio sérico');
        }

        if (albumin != null && albumin > 0) {
          this.albuminValue.set(albumin);
          filledParams.push(`Albúmina: ${albumin} g/dL`);
        } else {
          this.albuminValue.set(null);
          missingParams.push('Albúmina sérica');
        }
        break;

      case 'holliday_segar':
        if (weight != null && weight > 0) {
          this.hollidayWeight.set(weight);
          filledParams.push(`Peso: ${weight} kg`);
        } else {
          this.hollidayWeight.set(null);
          missingParams.push('Peso');
        }
        break;

      case 'bsa_mosteller':
        if (weight != null && weight > 0) {
          this.bsaWeight.set(weight);
          filledParams.push(`Peso: ${weight} kg`);
        } else {
          this.bsaWeight.set(null);
          missingParams.push('Peso');
        }

        if (height != null && height > 0) {
          this.bsaHeight.set(height);
          filledParams.push(`Talla: ${height} cm`);
        } else {
          this.bsaHeight.set(null);
          missingParams.push('Talla');
        }
        break;

      case 'pediatric_dosage':
        if (weight != null && weight > 0) {
          this.pediatricWeight.set(weight);
          filledParams.push(`Peso: ${weight} kg`);
        } else {
          this.pediatricWeight.set(null);
          missingParams.push('Peso');
        }
        missingParams.push('Dosis objetivo y concentración del fármaco');
        break;
    }

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

    setTimeout(() => this.autofillBannerMessage.set(null), 6000);
  }

  private applyFallbackAutofill(): void {
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
    this.applyAutofillData(fallbackDTO);
  }

  // -------------------------------------------------------------
  // Reset Inputs
  // -------------------------------------------------------------
  resetCurrentInputs(): void {
    const id = this.selectedId();
    switch (id) {
      case 'imc':
        this.bmiWeight.set(null);
        this.bmiHeight.set(null);
        break;
      case 'tfge':
        this.tfgeCreatinine.set(null);
        this.tfgeAge.set(null);
        this.tfgeGender.set('MALE');
        break;
      case 'cockcroft':
        this.cockcroftWeight.set(null);
        this.cockcroftAge.set(null);
        this.cockcroftCreatinine.set(null);
        this.cockcroftGender.set('MALE');
        break;
      case 'chads_vasc':
        this.chadsAge.set(null);
        this.chadsFemale.set(false);
        this.chadsHeartFailure.set(false);
        this.chadsHypertension.set(false);
        this.chadsDiabetes.set(false);
        this.chadsStroke.set(false);
        this.chadsVascular.set(false);
        break;
      case 'calcio_corregido':
        this.calciumValue.set(null);
        this.albuminValue.set(null);
        break;
      case 'holliday_segar':
        this.hollidayWeight.set(null);
        break;
      case 'bsa_mosteller':
        this.bsaWeight.set(null);
        this.bsaHeight.set(null);
        break;
      case 'pediatric_dosage':
        this.pediatricWeight.set(null);
        this.pediatricTargetDose.set(null);
        this.pediatricDrugConcentrationMg.set(null);
        this.pediatricDrugConcentrationMl.set(null);
        break;
    }
  }

  // -------------------------------------------------------------
  // Actions
  // -------------------------------------------------------------
  selectCalculator(id: CalculatorId): void {
    this.selectedId.set(id);
    this.activeTab.set('calculator');
  }

  async copyResultText(): Promise<void> {
    const res = this.currentResult();
    if (!res) return;

    const ok = await this.calcService.copyToClipboard(res.plainTextEvolution);
    if (ok) {
      this.copyFeedback.set(true);
      setTimeout(() => this.copyFeedback.set(false), 2200);
    }
  }

  saveResultToRecord(): void {
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
        inputsSummary: calculatorInputSummary(result.calculatorId, snapshot),
      });
      this.showSaveSuccess();
      return;
    }
    this.isSavingLog.set(true);
    const payload: CalculationExecutionRequestDTO = {
      patientId: patient.id, calculationCode: result.calculatorId, inputSnapshot: snapshot,
    };
    this.calcService.executeAndSaveToBackend(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: savedLog => {
        this.isSavingLog.set(false);
        this.calcService.saveCalculation({
          calculatorId: savedLog.calculationCode as CalculatorId, calculatorName: savedLog.calculationName,
          patientId: savedLog.patientId, patientName: savedLog.patientFullName, resultHeadline: savedLog.formattedResult,
          interpretationLabel: savedLog.resultInterpretation ?? '', severity: savedLog.severity as SavedCalculationItem['severity'],
          calculatedAt: savedLog.createdAt, plainTextEvolution: savedLog.plainTextEvolution ?? '',
          inputsSummary: calculatorInputSummary(savedLog.calculationCode as CalculatorId, savedLog.inputSnapshot),
        });
        if (this.activePatient()?.id === savedLog.patientId) {
          this.patientBackendHistory.update(history => [savedLog, ...history]);
          this.showSaveSuccess();
        }
      },
      error: error => {
        this.isSavingLog.set(false);
        this.saveError.set(error.error?.message ?? 'No se pudo guardar el cálculo.');
      },
    });
  }

  private showSaveSuccess(): void {
    this.saveFeedback.set(true);
    setTimeout(() => this.saveFeedback.set(false), 2500);
  }

  historyInputSummary(log: PatientCalculationLogDetailDTO): Record<string, string | number | boolean> {
    return calculatorInputSummary(log.calculationCode as CalculatorId, log.inputSnapshot);
  }

  // -------------------------------------------------------------
  // Patient Backend History Actions & Filters
  // -------------------------------------------------------------
  loadPatientHistory(): void {
    const patientId = this.activePatient()?.id;
    if (!patientId) {
      this.patientBackendHistory.set([]);
      return;
    }

    this.isLoadingHistory.set(true);
    const code = this.historyFilterCode();
    const from = this.historyDateFrom() ? new Date(this.historyDateFrom()).toISOString() : undefined;
    const to = this.historyDateTo() ? new Date(this.historyDateTo() + 'T23:59:59').toISOString() : undefined;

    this.calcService.getPatientHistoryFromBackend(patientId, code, from, to).subscribe({
      next: (history) => {
        this.isLoadingHistory.set(false);
        this.patientBackendHistory.set(history);
      },
      error: (err) => {
        this.isLoadingHistory.set(false);
        console.error('Error fetching patient calculation history', err);
      },
    });
  }

  toggleExpandLog(id: number): void {
    this.expandedHistoryLogId.update((current) => (current === id ? null : id));
  }

  async copyHistoryEvolution(evolutionText?: string): Promise<void> {
    if (!evolutionText) return;
    const ok = await this.calcService.copyToClipboard(evolutionText);
    if (ok) {
      this.copyFeedback.set(true);
      setTimeout(() => this.copyFeedback.set(false), 2200);
    }
  }

  deleteLocalHistoryItem(item: SavedCalculationItem): void {
    this.calcService.deleteCalculation(item.id);
  }

  clearLocalHistory(): void {
    if (confirm('¿Estás seguro de que deseas vaciar el historial local de cálculos?')) {
      this.calcService.clearHistory();
    }
  }
}
