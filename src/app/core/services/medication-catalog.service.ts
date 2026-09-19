import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Medication } from '../models/medication.model';

const FALLBACK_MEDICATIONS: Medication[] = [
  { id: 1, name: 'Ibuprofeno 400mg comp.', genericName: 'Ibuprofeno', presentation: 'Comprimidos x 20', defaultDose: '400 mg', administrationRoute: 'Oral', typicalFrequency: 'Cada 8 horas', typicalDurationDays: 5, category: 'Analgésico / AINE' },
  { id: 2, name: 'Ibuprofeno 600mg comp.', genericName: 'Ibuprofeno', presentation: 'Comprimidos x 20', defaultDose: '600 mg', administrationRoute: 'Oral', typicalFrequency: 'Cada 8 horas con alimentos', typicalDurationDays: 5, category: 'Analgésico / AINE' },
  { id: 3, name: 'Amoxicilina 500mg comp.', genericName: 'Amoxicilina', presentation: 'Comprimidos x 16', defaultDose: '500 mg', administrationRoute: 'Oral', typicalFrequency: 'Cada 8 horas', typicalDurationDays: 7, category: 'Antibiótico' },
  { id: 4, name: 'Amoxicilina 875mg / Clavulánico 125mg comp.', genericName: 'Amoxicilina + Ácido Clavulánico', presentation: 'Comprimidos x 14', defaultDose: '875 / 125 mg', administrationRoute: 'Oral', typicalFrequency: 'Cada 12 horas', typicalDurationDays: 7, category: 'Antibiótico' },
  { id: 5, name: 'Paracetamol 500mg comp.', genericName: 'Paracetamol', presentation: 'Comprimidos x 20', defaultDose: '500 mg', administrationRoute: 'Oral', typicalFrequency: 'Cada 8 horas según dolor', typicalDurationDays: 3, category: 'Analgésico' },
  { id: 6, name: 'Paracetamol 1g comp.', genericName: 'Paracetamol', presentation: 'Comprimidos ranurados x 20', defaultDose: '1 g', administrationRoute: 'Oral', typicalFrequency: 'Cada 8 horas', typicalDurationDays: 3, category: 'Analgésico' },
  { id: 7, name: 'Losartán 50mg comp.', genericName: 'Losartán Potásico', presentation: 'Comprimidos x 30', defaultDose: '50 mg', administrationRoute: 'Oral', typicalFrequency: 'Cada 24 horas por la mañana', typicalDurationDays: 30, category: 'Antihipertensivo' },
  { id: 8, name: 'Enalapril 10mg comp.', genericName: 'Enalapril Maleato', presentation: 'Comprimidos x 30', defaultDose: '10 mg', administrationRoute: 'Oral', typicalFrequency: 'Cada 12 horas', typicalDurationDays: 30, category: 'Antihipertensivo' },
  { id: 9, name: 'Metformina 850mg comp.', genericName: 'Metformina Clorhidrato', presentation: 'Comprimidos x 30', defaultDose: '850 mg', administrationRoute: 'Oral', typicalFrequency: 'Cada 12 horas con las comidas', typicalDurationDays: 30, category: 'Antidiabético' },
  { id: 10, name: 'Salbutamol 100mcg aerosol', genericName: 'Salbutamol', presentation: 'Inhalador presurizado 200 dosis', defaultDose: '2 disparos (200 mcg)', administrationRoute: 'Inhalatoria', typicalFrequency: 'Cada 6 horas SOS', typicalDurationDays: 7, category: 'Broncodilatador' },
  { id: 11, name: 'Omeprazol 20mg cápsulas', genericName: 'Omeprazol', presentation: 'Cápsulas gastroresistentes x 28', defaultDose: '20 mg', administrationRoute: 'Oral', typicalFrequency: 'Cada 24 horas 30 min antes desayuno', typicalDurationDays: 30, category: 'Antiulceroso' },
  { id: 12, name: 'Levotiroxina 50mcg comp.', genericName: 'Levotiroxina Sódica', presentation: 'Comprimidos x 50', defaultDose: '50 mcg', administrationRoute: 'Oral', typicalFrequency: 'Cada 24 horas en ayunas estricto', typicalDurationDays: 30, category: 'Hormona tiroidea' },
  { id: 13, name: 'Azitromicina 500mg comp.', genericName: 'Azitromicina', presentation: 'Comprimidos x 3', defaultDose: '500 mg', administrationRoute: 'Oral', typicalFrequency: 'Cada 24 horas', typicalDurationDays: 3, category: 'Antibiótico' },
  { id: 14, name: 'Clonazepam 0.5mg comp.', genericName: 'Clonazepam', presentation: 'Comprimidos ranurados x 30', defaultDose: '0.5 mg', administrationRoute: 'Oral', typicalFrequency: 'Cada 24 horas antes de dormir', typicalDurationDays: 30, category: 'Ansiolítico' },
  { id: 15, name: 'Cetirizina 10mg comp.', genericName: 'Cetirizina Clorhidrato', presentation: 'Comprimidos x 20', defaultDose: '10 mg', administrationRoute: 'Oral', typicalFrequency: 'Cada 24 horas noche', typicalDurationDays: 10, category: 'Antihistamínico' },
  { id: 16, name: 'Dipirona 500mg comp.', genericName: 'Dipirona / Metamizol', presentation: 'Comprimidos x 20', defaultDose: '500 mg', administrationRoute: 'Oral', typicalFrequency: 'Cada 8 horas', typicalDurationDays: 3, category: 'Analgésico' },
  { id: 17, name: 'Atorvastatina 20mg comp.', genericName: 'Atorvastatina Cálcica', presentation: 'Comprimidos x 30', defaultDose: '20 mg', administrationRoute: 'Oral', typicalFrequency: 'Cada 24 horas noche', typicalDurationDays: 30, category: 'Hipolipemiante' },
  { id: 18, name: 'Sertralina 50mg comp.', genericName: 'Sertralina Clorhidrato', presentation: 'Comprimidos x 30', defaultDose: '50 mg', administrationRoute: 'Oral', typicalFrequency: 'Cada 24 horas mañana', typicalDurationDays: 30, category: 'Antidepresivo' },
  { id: 19, name: 'Diclofenac 75mg comp.', genericName: 'Diclofenac Sódico', presentation: 'Comprimidos x 15', defaultDose: '75 mg', administrationRoute: 'Oral', typicalFrequency: 'Cada 12 horas', typicalDurationDays: 5, category: 'Antiinflamatorio' },
  { id: 20, name: 'Budesonida 200mcg aerosol', genericName: 'Budesonida', presentation: 'Inhalador 200 dosis', defaultDose: '1-2 disparos', administrationRoute: 'Inhalatoria', typicalFrequency: 'Cada 12 horas', typicalDurationDays: 30, category: 'Corticoide inhalado' },
];

@Injectable({
  providedIn: 'root',
})
export class MedicationCatalogService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/medications`;

  readonly suggestions = signal<Medication[]>([]);
  readonly isSearching = signal<boolean>(false);

  search(query: string, limit = 10): Observable<Medication[]> {
    this.isSearching.set(true);
    const trimmed = query.trim().toLowerCase();
    const params = new HttpParams().set('query', trimmed).set('limit', String(limit));

    return this.http.get<Medication[]>(`${this.baseUrl}/search`, { params }).pipe(
      tap((results) => {
        this.suggestions.set(results || []);
        this.isSearching.set(false);
      }),
      catchError(() => {
        // Fallback local search
        const filtered = trimmed
          ? FALLBACK_MEDICATIONS.filter(
              (m) =>
                m.name.toLowerCase().includes(trimmed) ||
                m.genericName.toLowerCase().includes(trimmed) ||
                m.category.toLowerCase().includes(trimmed)
            ).slice(0, limit)
          : FALLBACK_MEDICATIONS.slice(0, limit);

        this.suggestions.set(filtered);
        this.isSearching.set(false);
        return of(filtered);
      })
    );
  }
}
