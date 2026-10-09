import { DestroyRef, effect, inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ClinicalPrintDocument, PrintDocumentReference } from '../models/clinical-print-document.model';
import { AuthService } from './auth.service';
import { doctorPrintIdentity } from '../models/doctor-print-identity';

@Injectable({ providedIn: 'root' })
export class ClinicalDocumentPrintService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly previews = new Map<string, Window | null>();
  private owner = this.auth.currentUser()?.id ?? null;

  constructor() {
    const release = () => {
      for (const [url, preview] of this.previews) {
        URL.revokeObjectURL(url);
        try { if (preview && !preview.closed) preview.close(); } catch {}
      }
      this.previews.clear();
    };
    effect(() => {
      const owner = this.auth.currentUser()?.id ?? null;
      if (owner !== this.owner) { this.owner = owner; release(); }
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
    const user = this.auth.currentUser();
    const identity = doctorPrintIdentity(user?.user_metadata);
    const collection = reference.source === 'PRESCRIPTION_RECORD' ? 'prescriptions' : 'encounters';

    let params = new HttpParams();
    if (identity.fullName) params = params.set('doctorName', identity.fullName);
    if (identity.license) params = params.set('license', identity.license);
    if (identity.clinic.name) params = params.set('clinicName', identity.clinic.name);
    if (identity.clinic.address) params = params.set('clinicAddress', identity.clinic.address);
    if (identity.clinic.phone) params = params.set('clinicPhone', identity.clinic.phone);
    if (reference.type) params = params.set('type', reference.type);

    const url = `${environment.apiUrl}/patients/${reference.patientId}/${collection}/${reference.id}/pdf`;
    return this.http.get(url, { params, responseType: 'blob' });
  }

  openPdfInNewTab(reference: PrintDocumentReference): void {
    if (typeof window === 'undefined') return;
    const owner = this.auth.currentUser()?.id ?? null;

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

    this.getPdfBlob(reference).subscribe({
      next: (blob) => {
        if (owner !== (this.auth.currentUser()?.id ?? null)) {
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
        } catch (e) {
          console.error('Error handling PDF blob:', e);
        }
      },
      error: (err) => {
        try {
          if (targetWindow && !targetWindow.closed) {
            targetWindow.close();
          }
        } catch {}
        if (owner !== (this.auth.currentUser()?.id ?? null)) return;
        alert(err?.status === 403
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
