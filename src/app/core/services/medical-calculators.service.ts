import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CALCULATOR_ICONS } from '../models/calculator-icons';
import { CALCULATOR_RESULT_STYLES } from '../models/calculator-result-styles';
import { environment } from '../../../environments/environment';
import {
  CalculationExecutionRequestDTO,
  CalculationResult,
  CalculationPreviewRequestDTO,
  CalculationResultResponseDTO,
  CalculatorMetadata,
  CalculatorId,
  CalculatorCategory,
  ClinicalCalculationDefinitionDTO,
  DoctorCalculatorPreferenceDTO,
  PatientAutofillDataDTO,
  PatientCalculationLogDetailDTO,
  SavedCalculationItem,
} from '../models/medical-calculators.model';

const SAVED_CALCULATIONS_KEY = 'doctorchart_saved_calculations';

@Injectable({
  providedIn: 'root',
})
export class MedicalCalculatorsService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/calculators`;

  readonly calculators = signal<readonly CalculatorMetadata[]>([]);
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

  getCatalogFromBackend(): Observable<CalculatorMetadata[]> {
    return this.http.get<ClinicalCalculationDefinitionDTO[]>(`${this.baseUrl}/catalog`).pipe(
      map(definitions => definitions.map(definition => ({
        id: definition.code as CalculatorId,
        name: definition.name, shortName: definition.shortName,
        category: definition.category as CalculatorCategory, categoryLabel: definition.categoryLabel,
        description: definition.description, evidenceReference: definition.evidenceReference,
        summaryFormula: definition.summaryFormula,
        icon: CALCULATOR_ICONS[definition.code as CalculatorId] ?? 'lucideCalculator',
      }))),
    );
  }

  getDoctorPreferences(): Observable<DoctorCalculatorPreferenceDTO> {
    return this.http.get<DoctorCalculatorPreferenceDTO>(`${this.baseUrl}/preferences`);
  }

  updateDoctorPreferences(favoriteCalculationCodes: string[]): Observable<DoctorCalculatorPreferenceDTO> {
    return this.http.put<DoctorCalculatorPreferenceDTO>(`${this.baseUrl}/preferences`, {
      favoriteCalculationCodes,
    });
  }

  resetDoctorPreferences(): Observable<DoctorCalculatorPreferenceDTO> {
    return this.http.post<DoctorCalculatorPreferenceDTO>(`${this.baseUrl}/preferences/reset`, {});
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
