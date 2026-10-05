import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CALCULATOR_RESULT_STYLES } from '../models/calculator-result-styles';
import { environment } from '../../../environments/environment';
import {
  CalculationExecutionRequestDTO,
  CalculationResult,
  CalculationPreviewRequestDTO,
  CalculationResultResponseDTO,
  CalculatorMetadata,
  ClinicalCalculationDefinitionDTO,
  DoctorCalculatorPreferenceDTO,
  PatientAutofillDataDTO,
  PatientCalculationLogDetailDTO,
  SavedCalculationItem,
} from '../models/medical-calculators.model';

const SAVED_CALCULATIONS_KEY = 'doctorchart_saved_calculations';

export const MEDICAL_CALCULATORS_CATALOG: readonly CalculatorMetadata[] = [
  {
    id: 'imc',
    name: 'Índice de Masa Corporal (IMC) y BSA',
    shortName: 'IMC & BSA',
    category: 'antropometria',
    categoryLabel: 'Antropometría',
    icon: 'lucideWeight',
    description:
      'Evalúa el estado nutricional del adulto según la OMS y estima la superficie corporal (BSA) mediante Mosteller.',
    evidenceReference: 'OMS / Mosteller RD. N Engl J Med 1987.',
    summaryFormula: 'IMC = Peso (kg) / [Talla (m)]² | BSA = √[Peso(kg) × Talla(cm) / 3600]',
  },
  {
    id: 'tfge',
    name: 'Filtrado Glomerular Estimado (CKD-EPI 2021)',
    shortName: 'TFGe (CKD-EPI)',
    category: 'nefrologia',
    categoryLabel: 'Nefrología',
    icon: 'lucideActivity',
    description:
      'Ecuación estándar de referencia internacional para estimar el filtrado glomerular sin ajuste de raza.',
    evidenceReference: 'Inker LA et al. N Engl J Med 2021; KDIGO 2024 Guidelines.',
    summaryFormula: 'CKD-EPI 2021 con Creatinina Sérica, Edad y Sexo Biológico',
  },
  {
    id: 'cockcroft',
    name: 'Aclaramiento de Creatinina (Cockcroft-Gault)',
    shortName: 'ClCr Cockcroft',
    category: 'nefrologia',
    categoryLabel: 'Farmacología / Nefro',
    icon: 'lucideStethoscope',
    description:
      'Cálculo mandatorio para la dosificación y ajuste posológico de fármacos de excreción renal.',
    evidenceReference: 'Cockcroft DW, Gault MH. Nephron 1976; FDA Renal Impairment Guidance.',
    summaryFormula: 'ClCr = [(140 - edad) × peso] / [72 × Cr] (× 0.85 si mujer)',
  },
  {
    id: 'chads_vasc',
    name: 'Score CHA₂DS₂-VASc',
    shortName: 'CHA₂DS₂-VASc',
    category: 'cardiologia',
    categoryLabel: 'Cardiología',
    icon: 'lucideHeart',
    description:
      'Estratificación de riesgo tromboembólico en Fibrilación Auricular no valvular e indicación de anticoagulación.',
    evidenceReference: 'Lip GY et al. Chest 2010; Guías ESC / AHA Fibrilación Auricular.',
    summaryFormula: 'Suma de factores clínicos: C(1), H(1), A₂(2), D(1), S₂(2), V(1), A(1), Sc(1)',
  },
  {
    id: 'calcio_corregido',
    name: 'Calcio Sérico Corregido por Albúmina',
    shortName: 'Calcio Corregido',
    category: 'metabolismo',
    categoryLabel: 'Metabolismo / Lab',
    icon: 'lucideFlaskConical',
    description:
      'Ajusta la calcemia total en presencia de hipoalbuminemia o alteraciones de proteínas séricas.',
    evidenceReference: 'Payne RB et al. Br Med J 1973.',
    summaryFormula: 'Ca Corregido = Ca Total + 0.8 × (4.0 - Albúmina)',
  },
  {
    id: 'holliday_segar',
    name: 'Requerimiento Hídrico Basal Pediátrico (Holliday-Segar)',
    shortName: 'Holliday-Segar',
    category: 'pediatria',
    categoryLabel: 'Pediatría',
    icon: 'lucideDroplets',
    description:
      'Cálculo de necesidades de mantenimiento de líquidos y electrolitos según peso en pacientes pediátricos.',
    evidenceReference: 'Holliday MA, Segar WE. Pediatrics 1957; 19(5):823-832.',
    summaryFormula: '1-10kg: 100mL/kg | 11-20kg: 1000 + 50*(kg-10) | >20kg: 1500 + 20*(kg-20)',
  },
  {
    id: 'bsa_mosteller',
    name: 'Superficie Corporal Pediátrica y Adulto (Mosteller)',
    shortName: 'Superficie Corporal (BSA)',
    category: 'pediatria',
    categoryLabel: 'Pediatría / Onco',
    icon: 'lucideSparkles',
    description:
      'Estimación de área de superficie corporal (BSA) mediante Mosteller para dosificación en quimioterapia y fluidos.',
    evidenceReference: 'Mosteller RD. N Engl J Med 1987; 317:1098.',
    summaryFormula: 'BSA (m²) = √[(Peso (kg) × Talla (cm)) / 3600]',
  },
  {
    id: 'pediatric_dosage',
    name: 'Dosificación Pediátrica por Peso (mg/kg)',
    shortName: 'Dosis Pediátrica',
    category: 'pediatria',
    categoryLabel: 'Pediatría / Farma',
    icon: 'lucidePill',
    description:
      'Calcula la dosis terapéutica en mg y volumen en mL por toma a partir del peso del niño, dosis objetivo y presentación.',
    evidenceReference: 'AAP / Nelson Textbook of Pediatrics 21a Ed.',
    summaryFormula: 'Dosis = Peso × Dosis objetivo | Volumen (mL) = Dosis / Concentración',
  },
] as const;

@Injectable({
  providedIn: 'root',
})
export class MedicalCalculatorsService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/calculators`;

  readonly calculators = signal<readonly CalculatorMetadata[]>(MEDICAL_CALCULATORS_CATALOG);
  readonly savedHistory = signal<SavedCalculationItem[]>(this.loadStoredCalculations());

  // -------------------------------------------------------------
  // Backend API Integration
  // -------------------------------------------------------------
  previewCalculation(payload: CalculationPreviewRequestDTO): Observable<CalculationResult> {
    return this.http.post<CalculationResultResponseDTO>(`${this.baseUrl}/preview`, payload).pipe(
      map(result => ({ ...result, interpretation: { ...result.interpretation,
        ...(CALCULATOR_RESULT_STYLES[result.interpretation.code] ?? CALCULATOR_RESULT_STYLES['bmi_normal']),
      }})),
    );
  }

  getCatalogFromBackend(): Observable<ClinicalCalculationDefinitionDTO[]> {
    return this.http.get<ClinicalCalculationDefinitionDTO[]>(`${this.baseUrl}/catalog`);
  }

  getDoctorPreferences(): Observable<DoctorCalculatorPreferenceDTO> {
    return this.http.get<DoctorCalculatorPreferenceDTO>(`${this.baseUrl}/preferences`);
  }

  updateDoctorPreferences(favoriteCalculationCodes: string[]): Observable<DoctorCalculatorPreferenceDTO> {
    return this.http.put<DoctorCalculatorPreferenceDTO>(`${this.baseUrl}/preferences`, {
      favoriteCalculationCodes,
    });
  }

  getDefaultsForSpecialty(specialtyCode: string): Observable<ClinicalCalculationDefinitionDTO[]> {
    return this.http.get<ClinicalCalculationDefinitionDTO[]>(`${this.baseUrl}/defaults/${specialtyCode}`);
  }

  executeAndSaveToBackend(payload: CalculationExecutionRequestDTO): Observable<PatientCalculationLogDetailDTO> {
    return this.http.post<PatientCalculationLogDetailDTO>(`${this.baseUrl}/execute`, payload);
  }

  getPatientHistoryFromBackend(
    patientId: number,
    calculationCode?: string,
    fromDate?: string,
    toDate?: string
  ): Observable<PatientCalculationLogDetailDTO[]> {
    let params = new HttpParams();
    if (calculationCode && calculationCode !== 'all') {
      params = params.set('calculationCode', calculationCode);
    }
    if (fromDate) {
      params = params.set('fromDate', fromDate);
    }
    if (toDate) {
      params = params.set('toDate', toDate);
    }
    return this.http.get<PatientCalculationLogDetailDTO[]>(`${this.baseUrl}/patients/${patientId}/history`, {
      params,
    });
  }

  getPatientAutofillData(patientId: number): Observable<PatientAutofillDataDTO> {
    return this.http.get<PatientAutofillDataDTO>(`${this.baseUrl}/patients/${patientId}/autofill`);
  }

  // -------------------------------------------------------------
  // Persistencia e Historial en Memoria / LocalStorage
  // -------------------------------------------------------------
  saveCalculation(item: Omit<SavedCalculationItem, 'id'>): SavedCalculationItem {
    const newItem: SavedCalculationItem = {
      ...item,
      id: `calc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    };

    const currentList = this.savedHistory();
    const updated = [newItem, ...currentList.slice(0, 49)]; // Limit to last 50
    this.savedHistory.set(updated);
    this.persistHistory(updated);
    return newItem;
  }

  deleteCalculation(id: string): void {
    const updated = this.savedHistory().filter((c) => c.id !== id);
    this.savedHistory.set(updated);
    this.persistHistory(updated);
  }

  clearHistory(): void {
    this.savedHistory.set([]);
    this.persistHistory([]);
  }

  async copyToClipboard(text: string): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId) || typeof navigator === 'undefined') {
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  private loadStoredCalculations(): SavedCalculationItem[] {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(SAVED_CALCULATIONS_KEY);
        if (raw) {
          return JSON.parse(raw) as SavedCalculationItem[];
        }
      } catch (err) {
        console.warn('Error reading saved calculations from localStorage:', err);
      }
    }
    return [];
  }

  private persistHistory(items: SavedCalculationItem[]): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      try {
        localStorage.setItem(SAVED_CALCULATIONS_KEY, JSON.stringify(items));
      } catch (err) {
        console.warn('Error saving calculations to localStorage:', err);
      }
    }
  }
}
