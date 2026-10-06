import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ClinicalPrintDocument, PrintDocumentReference } from '../models/clinical-print-document.model';

@Injectable({providedIn:'root'})
export class ClinicalDocumentPrintService {
  private readonly http = inject(HttpClient);
  get(reference: PrintDocumentReference): Observable<ClinicalPrintDocument> {
    const collection = reference.source === 'PRESCRIPTION_RECORD' ? 'prescriptions' : 'encounters';
    return this.http.get<ClinicalPrintDocument>(
      environment.apiUrl + '/patients/' + reference.patientId + '/' + collection + '/' + reference.id + '/print');
  }
}
