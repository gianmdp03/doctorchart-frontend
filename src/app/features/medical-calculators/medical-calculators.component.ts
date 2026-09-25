import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
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
} from '@ng-icons/lucide';
import {
  CalculationResult,
  CalculatorCategory,
  CalculatorId,
  CalculatorMetadata,
  SavedCalculationItem,
} from '../../core/models/medical-calculators.model';
import {
  MedicalCalculatorsService,
  MEDICAL_CALCULATORS_CATALOG,
} from '../../core/services/medical-calculators.service';
import { ActivePatientService } from '../../core/services/active-patient.service';

@Component({
  selector: 'app-medical-calculators',
  imports: [CommonModule, FormsModule, NgIcon],
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
    }),
  ],
  templateUrl: './medical-calculators.component.html',
  styleUrl: './medical-calculators.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalCalculatorsComponent {
  readonly calcService = inject(MedicalCalculatorsService);
  readonly activePatientService = inject(ActivePatientService);

  // View mode: 'calculator' | 'history'
  readonly activeTab = signal<'calculator' | 'history'>('calculator');

  // Selected calculator & filtering
  readonly selectedId = signal<CalculatorId>('imc');
  readonly categoryFilter = signal<string>('all');
  readonly searchQuery = signal<string>('');

  // Notifications
  readonly copyFeedback = signal<boolean>(false);
  readonly saveFeedback = signal<boolean>(false);

  // -------------------------------------------------------------
  // Calculator Inputs (Signals)
  // -------------------------------------------------------------
  // 1. IMC
  readonly bmiWeight = signal<number | null>(70);
  readonly bmiHeight = signal<number | null>(175);

  // 2. TFGe (CKD-EPI 2021)
  readonly tfgeCreatinine = signal<number | null>(1.1);
  readonly tfgeAge = signal<number | null>(58);
  readonly tfgeGender = signal<'FEMALE' | 'MALE'>('MALE');

  // 3. Cockcroft-Gault
  readonly cockcroftWeight = signal<number | null>(72);
  readonly cockcroftAge = signal<number | null>(62);
  readonly cockcroftCreatinine = signal<number | null>(1.2);
  readonly cockcroftGender = signal<'FEMALE' | 'MALE'>('MALE');

  // 4. CHA2DS2-VASc
  readonly chadsAge = signal<number | null>(68);
  readonly chadsFemale = signal<boolean>(false);
  readonly chadsHeartFailure = signal<boolean>(false);
  readonly chadsHypertension = signal<boolean>(true);
  readonly chadsDiabetes = signal<boolean>(false);
  readonly chadsStroke = signal<boolean>(false);
  readonly chadsVascular = signal<boolean>(false);

  // 5. Calcio Corregido
  readonly calciumValue = signal<number | null>(8.1);
  readonly albuminValue = signal<number | null>(3.1);

  // -------------------------------------------------------------
  // Active Patient Helpers
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

  // Filtered catalog
  readonly filteredCalculators = computed(() => {
    const cat = this.categoryFilter();
    const query = this.searchQuery().toLowerCase().trim();
    return MEDICAL_CALCULATORS_CATALOG.filter((item) => {
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

  readonly currentMetadata = computed<CalculatorMetadata>(() => {
    const found = MEDICAL_CALCULATORS_CATALOG.find((c) => c.id === this.selectedId());
    return found ?? MEDICAL_CALCULATORS_CATALOG[0];
  });

  // -------------------------------------------------------------
  // Dynamic Results Computation
  // -------------------------------------------------------------
  readonly currentResult = computed<CalculationResult | null>(() => {
    const id = this.selectedId();

    switch (id) {
      case 'imc':
        return this.calcService.calculateBmi({
          weightKg: this.bmiWeight(),
          heightCm: this.bmiHeight(),
        });
      case 'tfge':
        return this.calcService.calculateTfge({
          creatinineMgDl: this.tfgeCreatinine(),
          ageYears: this.tfgeAge(),
          gender: this.tfgeGender(),
        });
      case 'cockcroft':
        return this.calcService.calculateCockcroftGault({
          weightKg: this.cockcroftWeight(),
          ageYears: this.cockcroftAge(),
          creatinineMgDl: this.cockcroftCreatinine(),
          gender: this.cockcroftGender(),
        });
      case 'chads_vasc':
        return this.calcService.calculateChadsVasc({
          ageYears: this.chadsAge(),
          isFemale: this.chadsFemale(),
          congestiveHeartFailure: this.chadsHeartFailure(),
          hypertension: this.chadsHypertension(),
          diabetes: this.chadsDiabetes(),
          strokeOrTia: this.chadsStroke(),
          vascularDisease: this.chadsVascular(),
        });
      case 'calcio_corregido':
        return this.calcService.calculateCalciumCorrection({
          serumCalciumMgDl: this.calciumValue(),
          serumAlbuminGDl: this.albuminValue(),
        });
      default:
        return null;
    }
  });

  // -------------------------------------------------------------
  // Actions
  // -------------------------------------------------------------
  selectCalculator(id: CalculatorId): void {
    this.selectedId.set(id);
    this.activeTab.set('calculator');
  }

  autofillFromPatient(): void {
    const patient = this.activePatient();
    if (!patient) return;

    const age = this.activePatientAgeYears();
    const gender = this.activePatientGender();
    const weight = this.activePatientWeight();
    const height = this.activePatientHeight();

    const id = this.selectedId();

    if (id === 'imc') {
      if (weight) this.bmiWeight.set(weight);
      if (height) this.bmiHeight.set(height);
    } else if (id === 'tfge') {
      if (age) this.tfgeAge.set(age);
      if (gender) this.tfgeGender.set(gender);
    } else if (id === 'cockcroft') {
      if (weight) this.cockcroftWeight.set(weight);
      if (age) this.cockcroftAge.set(age);
      if (gender) this.cockcroftGender.set(gender);
    } else if (id === 'chads_vasc') {
      if (age) this.chadsAge.set(age);
      if (gender) this.chadsFemale.set(gender === 'FEMALE');
    }
  }

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
    }
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
    const res = this.currentResult();
    if (!res) return;

    const meta = this.currentMetadata();
    const patient = this.activePatient();

    const inputsMap: Record<string, string | number | boolean> = {};
    if (meta.id === 'imc') {
      inputsMap['Peso'] = `${this.bmiWeight()} kg`;
      inputsMap['Talla'] = `${this.bmiHeight()} cm`;
    } else if (meta.id === 'tfge') {
      inputsMap['Creatinina'] = `${this.tfgeCreatinine()} mg/dL`;
      inputsMap['Edad'] = `${this.tfgeAge()} años`;
      inputsMap['Sexo'] = this.tfgeGender() === 'FEMALE' ? 'Femenino' : 'Masculino';
    } else if (meta.id === 'cockcroft') {
      inputsMap['Peso'] = `${this.cockcroftWeight()} kg`;
      inputsMap['Edad'] = `${this.cockcroftAge()} años`;
      inputsMap['Creatinina'] = `${this.cockcroftCreatinine()} mg/dL`;
      inputsMap['Sexo'] = this.cockcroftGender() === 'FEMALE' ? 'Femenino' : 'Masculino';
    } else if (meta.id === 'chads_vasc') {
      inputsMap['Puntaje'] = `${res.formattedValue}`;
    } else if (meta.id === 'calcio_corregido') {
      inputsMap['Ca Sérico'] = `${this.calciumValue()} mg/dL`;
      inputsMap['Albúmina'] = `${this.albuminValue()} g/dL`;
    }

    this.calcService.saveCalculation({
      calculatorId: meta.id,
      calculatorName: meta.name,
      patientId: patient?.id ?? null,
      patientName: patient?.fullName ?? null,
      resultHeadline: `${res.formattedValue} ${res.unit}`,
      interpretationLabel: res.interpretation.label,
      severity: res.interpretation.severity,
      calculatedAt: res.calculatedAt,
      plainTextEvolution: res.plainTextEvolution,
      inputsSummary: inputsMap,
    });

    this.saveFeedback.set(true);
    setTimeout(() => this.saveFeedback.set(false), 2200);
  }

  deleteHistoryItem(item: SavedCalculationItem): void {
    this.calcService.deleteCalculation(item.id);
  }

  clearAllHistory(): void {
    if (confirm('¿Estás seguro de que deseas vaciar el historial de cálculos?')) {
      this.calcService.clearHistory();
    }
  }

  async copyHistoryItem(item: SavedCalculationItem): Promise<void> {
    await this.calcService.copyToClipboard(item.plainTextEvolution);
    this.copyFeedback.set(true);
    setTimeout(() => this.copyFeedback.set(false), 2200);
  }
}
