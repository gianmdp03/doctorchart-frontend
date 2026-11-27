import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Component, computed, DestroyRef, effect, ElementRef, inject, signal, untracked, viewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GrowthPrintReference, PrintDocumentReference } from '../../core/models/clinical-print-document.model';
import { SignatureChoice } from '../../core/models/doctor-signature.model';
import { ClinicalDocumentPrintService } from '../../core/services/clinical-document-print.service';
import { DoctorSignaturesService } from '../../core/services/doctor-signatures.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';

@Component({
  selector: 'app-pdf-preview-modal',
  imports: [CdkTrapFocus],
  templateUrl: './pdf-preview-modal.component.html',
  styleUrl: './pdf-preview-modal.component.css',
})
export class PdfPreviewModalComponent {
  readonly printService = inject(ClinicalDocumentPrintService);
  readonly signaturesService = inject(DoctorSignaturesService);
  readonly doctorSpecialtyService = inject(DoctorSpecialtyService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private readonly previewFrame = viewChild<ElementRef<HTMLIFrameElement>>('previewFrame');
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly safeUrl = signal<SafeResourceUrl | null>(null);
  readonly selectValue = signal<string>('default');
  readonly growthReference = signal<GrowthPrintReference>('AUTO');

  private currentBlobUrl: string | null = null;
  private activeSub: Subscription | null = null;

  readonly request = computed(() => this.printService.previewRequest());

  readonly isClinicalHistory = computed(() => this.request()?.source === 'CLINICAL_HISTORY');

  readonly documentTitle = computed(() => {
    const req = this.request();
    if (!req) return 'Vista previa de documento';
    if (req.source === 'CLINICAL_HISTORY') {
      return req.encounterId ? 'Vista previa · Consulta clínica' : 'Vista previa · Historia clínica';
    }
    return req.type === 'STUDY_ORDERS' ? 'Vista previa · Orden de estudios' : 'Vista previa · Receta médica';
  });

  readonly currentChoice = computed<SignatureChoice>(() => {
    const val = this.selectValue();
    if (val === 'none') return { mode: 'NONE' };
    if (val === 'default') return { mode: 'DEFAULT' };
    const id = Number(val);
    return Number.isInteger(id) && id > 0 ? { mode: 'SELECTED', signatureId: id } : { mode: 'DEFAULT' };
  });

  constructor() {
    effect(() => {
      const req = this.request();
      untracked(() => {
        if (!req) {
          this.cleanupPreview();
          return;
        }
        void this.initializeForRequest(req);
      });
    });

    this.destroyRef.onDestroy(() => this.cleanupPreview());
  }

  private async initializeForRequest(req: PrintDocumentReference): Promise<void> {
    this.growthReference.set(req.growthReference ?? 'AUTO');
    await this.signaturesService.load();
    if (this.request() !== req) return;

    const initial = req.signatureChoice ?? this.signaturesService.selectedChoice();
    if (initial.mode === 'NONE') {
      this.selectValue.set('none');
    } else if (initial.mode === 'SELECTED') {
      const exists = this.signaturesService.signatures().some((s) => s.id === initial.signatureId);
      this.selectValue.set(exists ? String(initial.signatureId) : 'default');
    } else {
      const fav = this.signaturesService.favoriteSignature();
      this.selectValue.set(fav ? String(fav.id) : 'default');
    }
    this.loadPreviewBlob(req);
  }

  onSignatureSelectionChange(raw: string): void {
    this.selectValue.set(raw);
    const choice = this.currentChoice();
    this.signaturesService.setChoice(choice);
    const req = this.request();
    if (req) {
      this.loadPreviewBlob(req);
    }
  }

  private loadPreviewBlob(req: PrintDocumentReference): void {
    this.activeSub?.unsubscribe();
    this.loading.set(true);
    this.error.set(null);

    const choice = this.currentChoice();
    const sigVersion = (s?: { sha256: string; stampText: string; updatedAt: string } | null) =>
      s ? `${s.sha256}:${s.stampText}:${s.updatedAt}` : '';
    let sha = '';
    if (choice.mode === 'SELECTED') {
      sha = sigVersion(this.signaturesService.signatures().find((s) => s.id === choice.signatureId));
    } else if (choice.mode === 'DEFAULT') {
      sha = sigVersion(this.signaturesService.favoriteSignature());
    }

    const effectiveReq: PrintDocumentReference =
      req.source === 'CLINICAL_HISTORY' ? { ...req, growthReference: this.growthReference() } : req;
    this.activeSub = this.printService.getPreviewPdfBlob(effectiveReq, choice, sha).subscribe({
      next: (blob) => {
        this.revokeUrl();
        const url = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
        this.currentBlobUrl = url;
        this.safeUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(
          err?.status === 429
            ? 'Generaste varios PDFs seguidos. Esperá unos segundos y reintentá.'
            : err?.status === 422
              ? 'No se pudo representar el texto clínico o la aclaración de la firma de forma segura.'
              : 'No se pudo generar la vista previa del PDF.',
        );
      },
    });
  }

  onGrowthReferenceChange(raw: string): void {
    const value: GrowthPrintReference =
      raw === 'OMS' || raw === 'DOWN' || raw === 'BOTH' ? raw : 'AUTO';
    this.growthReference.set(value);
    const req = this.request();
    if (req) {
      this.loadPreviewBlob(req);
    }
  }

  printPreview(): void {
    const frame = this.previewFrame()?.nativeElement;
    try {
      if (frame?.contentWindow) {
        frame.contentWindow.focus();
        frame.contentWindow.print();
        return;
      }
    } catch {}
    this.openPreviewInTab();
  }

  downloadPreview(): void {
    if (!this.currentBlobUrl || typeof document === 'undefined') return;
    const req = this.request();
    const link = document.createElement('a');
    link.href = this.currentBlobUrl;
    link.download =
      req?.source === 'CLINICAL_HISTORY'
        ? req.encounterId
          ? `consulta-${req.encounterId}.pdf`
          : `historia-clinica-paciente-${req.patientId}.pdf`
        : `documento-${req?.id ?? 'clinico'}.pdf`;
    link.click();
  }

  openPreviewInTab(): void {
    if (this.currentBlobUrl && typeof window !== 'undefined') {
      window.open(this.currentBlobUrl, '_blank', 'noopener,noreferrer');
    }
  }

  confirmAndIssue(): void {
    const req = this.request();
    if (!req) return;
    const choice = this.currentChoice();
    this.printService.closePreview();
    this.printService.openPdfInNewTab(req, choice);
  }

  goToSignatures(): void {
    const returnUrl = this.router.url;
    this.printService.closePreview();
    const validReturn =
      returnUrl && returnUrl.startsWith('/') && !returnUrl.startsWith('//') && !returnUrl.startsWith('/signatures');
    void this.router.navigate(['/signatures'], {
      queryParams: validReturn ? { returnUrl } : undefined,
    });
  }

  close(): void {
    this.printService.closePreview();
  }

  private revokeUrl(): void {
    if (this.currentBlobUrl) {
      try {
        URL.revokeObjectURL(this.currentBlobUrl);
      } catch {}
      this.currentBlobUrl = null;
    }
    this.safeUrl.set(null);
  }

  private cleanupPreview(): void {
    this.activeSub?.unsubscribe();
    this.activeSub = null;
    this.loading.set(false);
    this.error.set(null);
    this.revokeUrl();
  }
}
