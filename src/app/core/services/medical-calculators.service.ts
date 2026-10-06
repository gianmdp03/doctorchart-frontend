import { AuthService } from './auth.service';
import { Injectable, PLATFORM_ID, effect, inject, signal, untracked } from '@angular/core';
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



@Injectable({
  providedIn: 'root',
})
export class MedicalCalculatorsService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/calculators`;

  readonly calculators = signal<readonly CalculatorMetadata[]>([]);
  readonly savedHistory = signal<SavedCalculationItem[]>([]);
  private readonly auth = inject(AuthService);
  private owner: string | null | undefined;
  constructor() {
    this.syncSession();
    effect(() => { this.auth.currentUser(); untracked(() => this.syncSession()); });
  }
  private key(): string | null { return this.owner ? 'doctorchart_calculations:' + encodeURIComponent(this.owner) : null; }
  private syncSession(): void {
    const owner = this.auth.currentUser()?.id ?? null;
    if (owner === this.owner) return;
    this.owner = owner; this.calculators.set([]); this.savedHistory.set(this.loadStoredCalculations());
  }


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
    this.syncSession();
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
    this.syncSession();
    const updated = this.savedHistory().filter((c) => c.id !== id);
    this.savedHistory.set(updated);
    this.persistHistory(updated);
  }

  clearHistory(patientId?: number | null): void {
    this.syncSession();
    const remaining = patientId === undefined ? [] : this.savedHistory().filter(item => item.patientId !== patientId);
    this.savedHistory.set(remaining);
    this.persistHistory(remaining);
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
    const key = this.key();
    if (key && isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(key);
        if (raw) {
          const items: unknown = JSON.parse(raw);
          return Array.isArray(items) ? items : [];
        }
      } catch (err) {
        console.warn('Error reading saved calculations from localStorage:', err);
      }
    }
    return [];
  }

  private persistHistory(items: SavedCalculationItem[]): void {
    const key = this.key();
    if (key && isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(items));
      } catch (err) {
        console.warn('Error saving calculations to localStorage:', err);
      }
    }
  }
}
