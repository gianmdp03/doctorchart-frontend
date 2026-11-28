import { ClinicalContextService } from './clinical-context.service';
import { DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ClinicalPrintDocument, IssuablePrintReference, PrintDocumentReference } from '../models/clinical-print-document.model';
import { SignatureChoice } from '../models/doctor-signature.model';
import { AuthService } from './auth.service';
import { DoctorPrintIdentityService } from './doctor-print-identity.service';

@Injectable({ providedIn: 'root' })
export class ClinicalDocumentPrintService {
 private readonly clinicalScope = inject(ClinicalContextService);
 private readonly printIdentity = inject(DoctorPrintIdentityService);
 private contextKey(): string | null { const owner=this.auth.currentUser()?.id; return owner ? JSON.stringify([owner,this.clinicalScope.id()]) : null; }
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  readonly errorMessage = signal<string | null>(null);
  readonly previewRequest = signal<PrintDocumentReference | null>(null);
  private readonly previews = new Map<string, Window | null>();
  private readonly previewBlobCache = new Map<string, Blob>();
  private owner = this.contextKey();

  constructor() {
    const release = () => {
      for (const [url, preview] of this.previews) {
        URL.revokeObjectURL(url);
        try { if (preview && !preview.closed) preview.close(); } catch {}
      }
      this.previews.clear();
      this.previewBlobCache.clear();
      this.previewRequest.set(null);
    };
    effect(() => {
      const owner = this.contextKey();
      if (owner !== this.owner) { this.owner = owner; this.errorMessage.set(null); release(); }
    });
    inject(DestroyRef).onDestroy(release);
  }

  get(reference: IssuablePrintReference): Observable<ClinicalPrintDocument> {
    const collection = reference.source === 'PRESCRIPTION_RECORD' ? 'prescriptions' : 'encounters';
    return this.http.get<ClinicalPrintDocument>(
      `${environment.apiUrl}/patients/${reference.patientId}/${collection}/${reference.id}/print`,
    );
  }

  getPdfBlob(reference: PrintDocumentReference, choice?: SignatureChoice): Observable<Blob> {
    let params = new HttpParams();
    if (reference.source === 'CLINICAL_HISTORY') {
      params = params.set('encounterId', reference.encounterId);
      if (reference.growthReference) {
        params = params.set('growthReference', reference.growthReference);
      }
    } else if (reference.type) {
      params = params.set('type', reference.type);
    }
    const effective = choice ?? reference.signatureChoice;
    if (effective?.mode === 'NONE') {
      params = params.set('signatureMode', 'none');
    } else if (effective?.mode === 'SELECTED') {
      params = params.set('signatureId', String(effective.signatureId));
    }
    if (reference.source === 'CLINICAL_HISTORY') {
      return this.http.get(`${environment.apiUrl}/patients/${reference.patientId}/clinical-history/pdf`, {
        params,
        responseType: 'blob',
      });
    }
    return this.http.get(this.origin(reference) + '/pdf', { params, responseType: 'blob' });
  }

  getPreviewPdfBlob(reference: PrintDocumentReference, choice?: SignatureChoice, signatureSha = ''): Observable<Blob> {
    const effective = choice ?? reference.signatureChoice ?? { mode: 'DEFAULT' as const };
    if (reference.source === 'CLINICAL_HISTORY') {
      return this.getPdfBlob(reference, effective);
    }
    const choiceKey = effective.mode === 'SELECTED'
      ? `selected:${effective.signatureId}:${signatureSha}`
      : effective.mode === 'NONE'
        ? 'none'
        : `default:${signatureSha}`;
    const logoKey = this.printIdentity.logoSha256() ?? '';
    const licenseKey = this.printIdentity.authoritativeLicense();
    const cacheKey = `${this.contextKey() ?? 'anon'}|${reference.source}|${reference.patientId}|${reference.id}|${reference.type ?? ''}|${choiceKey}|${logoKey}|${licenseKey}`;
    const cached = this.previewBlobCache.get(cacheKey);
    if (cached) {
      return of(cached);
    }
    return this.getPdfBlob(reference, effective).pipe(
      tap((blob) => {
        if (this.previewBlobCache.size >= 12) {
          const oldest = this.previewBlobCache.keys().next().value;
          if (oldest !== undefined) this.previewBlobCache.delete(oldest);
        }
        this.previewBlobCache.set(cacheKey, blob);
      }),
    );
  }

  clearPreviewCache(): void {
    this.previewBlobCache.clear();
  }

  openPreview(reference: PrintDocumentReference, choice?: SignatureChoice): void {
    this.errorMessage.set(null);
    this.previewRequest.set(choice ? { ...reference, signatureChoice: choice } : reference);
  }

  closePreview(): void {
    this.previewRequest.set(null);
  }

  private origin(reference: IssuablePrintReference): string {
    const collection = reference.source === 'PRESCRIPTION_RECORD' ? 'prescriptions' : 'encounters';
    return `${environment.apiUrl}/patients/${reference.patientId}/${collection}/${reference.id}`;
  }

  issue(reference: IssuablePrintReference, choice?: SignatureChoice): Observable<{id: number}> {
    const body: { type?: string; signatureId?: number | null } = reference.type ? { type: reference.type } : {};
    const effective = choice ?? reference.signatureChoice;
    if (effective?.mode === 'NONE') {
      body.signatureId = null;
    } else if (effective?.mode === 'SELECTED') {
      body.signatureId = effective.signatureId;
    }
    return this.http.post<{id: number}>(this.origin(reference) + '/documents', body);
  }

  originalPdf(patientId: number, issueId: number): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/patients/${patientId}/documents/${issueId}/pdf`, { responseType: 'blob' });
  }

  openPdfInNewTab(reference: IssuablePrintReference, choice?: SignatureChoice): void {
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

    this.issue(reference, choice).pipe(switchMap(issue => {
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
