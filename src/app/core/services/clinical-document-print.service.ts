import { ClinicalContextService } from './clinical-context.service';
import { DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ClinicalPrintDocument, PrintDocumentReference } from '../models/clinical-print-document.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ClinicalDocumentPrintService {
 private readonly clinicalScope = inject(ClinicalContextService);
 private contextKey(): string | null { const owner=this.auth.currentUser()?.id; return owner ? JSON.stringify([owner,this.clinicalScope.id()]) : null; }
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  readonly errorMessage = signal<string | null>(null);
  private readonly previews = new Map<string, Window | null>();
  private owner = this.contextKey();

  constructor() {
    const release = () => {
      for (const [url, preview] of this.previews) {
        URL.revokeObjectURL(url);
        try { if (preview && !preview.closed) preview.close(); } catch {}
      }
      this.previews.clear();
    };
    effect(() => {
      const owner = this.contextKey();
      if (owner !== this.owner) { this.owner = owner; this.errorMessage.set(null); release(); }
    });
    inject(DestroyRef).onDestroy(release);
  }

  get(reference: PrintDocumentReference): Observable<ClinicalPrintDocument> {
    const collection = reference.source === 'PRESCRIPTION_RECORD' ? 'prescriptions' : 'encounters';
    return this.http.get<ClinicalPrintDocument>(
      `${environment.apiUrl}/patients/${reference.patientId}/${collection}/${reference.id}/print`,
    );
  }

  getPdfBlob(reference: PrintDocumentReference): Observable<Blob> {
    const source = this.origin(reference);
    const params = reference.type ? new HttpParams().set('type', reference.type) : new HttpParams();
    return this.http.get(source + '/pdf', { params, responseType: 'blob' });
  }

  private origin(reference: PrintDocumentReference): string {
    const collection = reference.source === 'PRESCRIPTION_RECORD' ? 'prescriptions' : 'encounters';
    return `${environment.apiUrl}/patients/${reference.patientId}/${collection}/${reference.id}`;
  }

  issue(reference: PrintDocumentReference): Observable<{id: number}> {
    const body = reference.type ? { type: reference.type } : {};
    return this.http.post<{id: number}>(this.origin(reference) + '/documents', body);
  }

  originalPdf(patientId: number, issueId: number): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/patients/${patientId}/documents/${issueId}/pdf`, { responseType: 'blob' });
  }

  openPdfInNewTab(reference: PrintDocumentReference): void {
    if (typeof window === 'undefined') return;
    this.errorMessage.set(null);
    const owner = this.contextKey();

    let targetWindow: Window | null = null;
    try {
      if (typeof window.open === 'function') {
        targetWindow = window.open('about:blank', '_blank');
        if (targetWindow) targetWindow.opener = null;
        if (targetWindow && targetWindow.document) {
          targetWindow.document.title = 'Generando receta...';
        }
      }
    } catch {
      targetWindow = null;
    }

    this.issue(reference).pipe(switchMap(issue => {
      if (owner === this.contextKey()) return this.originalPdf(reference.patientId, issue.id);
      try { targetWindow?.close(); } catch {}
      return EMPTY;
    })).subscribe({
      next: (blob) => {
        if (owner !== (this.contextKey())) {
          try { targetWindow?.close(); } catch {}
          return;
        }
        try {
          const blobUrl = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
          if (targetWindow && !targetWindow.closed) {
            this.previews.set(blobUrl, targetWindow);
            targetWindow.location.href = blobUrl;
          } else if (typeof window.open === 'function') {
            this.previews.set(blobUrl, window.open(blobUrl, '_blank', 'noopener,noreferrer'));
          }
        } catch {
          this.errorMessage.set('No se pudo abrir el PDF guardado.');
        }
      },
      error: (err) => {
        try {
          if (targetWindow && !targetWindow.closed) {
            targetWindow.close();
          }
        } catch {}
        if (owner !== (this.contextKey())) return;
        this.errorMessage.set(err?.status === 403
          ? 'No tenés permiso para acceder a este documento. Verificá tu sesión y suscripción.'
          : err?.status === 401
            ? 'Tu sesión expiró. Volvé a iniciar sesión para imprimir.'
            : err?.status === 422
              ? 'No se pudo representar el texto clínico de forma segura. El PDF no fue emitido y los datos guardados no se modificaron.'
              : 'No se pudo generar el documento PDF. Reintentá más tarde.');
      },
    });
  }
}
