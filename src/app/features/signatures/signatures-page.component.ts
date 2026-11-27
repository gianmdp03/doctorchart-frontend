import { Component, computed, inject, OnInit, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePenTool, lucidePlus, lucideStar, lucideTrash2, lucideEdit3 } from '@ng-icons/lucide';
import { DoctorSignature } from '../../core/models/doctor-signature.model';
import { DoctorSignaturesService } from '../../core/services/doctor-signatures.service';
import { InteractionStatusService } from '../../core/services/interaction-status.service';
import { SignaturePadComponent } from '../../shared/signature-pad/signature-pad.component';

@Component({
  selector: 'app-signatures-page',
  imports: [FormsModule, RouterLink, NgIcon, SignaturePadComponent],
  providers: [provideIcons({ lucidePenTool, lucidePlus, lucideStar, lucideTrash2, lucideEdit3 })],
  templateUrl: './signatures-page.component.html',
  styleUrl: './signatures-page.component.css',
})
export class SignaturesPageComponent implements OnInit {
  readonly signaturesService = inject(DoctorSignaturesService);
  private readonly interaction = inject(InteractionStatusService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly pad = viewChild(SignaturePadComponent);

  readonly returnUrl = computed<string | null>(() => {
    const raw = this.route.snapshot.queryParamMap.get('returnUrl');
    if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return null;
    return raw;
  });

  readonly returnLabel = computed(() => {
    const url = this.returnUrl();
    if (!url) return '← Volver al perfil';
    return url.startsWith('/patients') ? '← Volver al paciente' : '← Volver';
  });

  readonly isEditorOpen = signal(false);
  readonly editingId = signal<number | null>(null);
  readonly pendingDeleteId = signal<number | null>(null);
  readonly busy = signal(false);
  readonly formError = signal<string | null>(null);

  readonly name = signal('');
  readonly stampText = signal('');
  readonly isFavorite = signal(false);
  readonly hasPadInk = signal(false);
  readonly redrawing = signal(false);

  readonly editingSignature = computed<DoctorSignature | null>(() => {
    const id = this.editingId();
    if (id === null) return null;
    return this.signaturesService.signatures().find((s) => s.id === id) ?? null;
  });

  ngOnInit(): void {
    void this.signaturesService.load(true);
  }

  goBack(): void {
    const url = this.returnUrl();
    if (url) {
      void this.router.navigateByUrl(url);
      return;
    }
    void this.router.navigate(['/profile']);
  }

  startCreate(): void {
    this.editingId.set(null);
    this.name.set('');
    this.stampText.set('');
    this.isFavorite.set(this.signaturesService.signatures().length === 0);
    this.hasPadInk.set(false);
    this.redrawing.set(true);
    this.formError.set(null);
    this.isEditorOpen.set(true);
  }

  startEdit(sig: DoctorSignature): void {
    this.editingId.set(sig.id);
    this.name.set(sig.name);
    this.stampText.set(sig.stampText);
    this.isFavorite.set(sig.isFavorite);
    this.hasPadInk.set(false);
    this.redrawing.set(false);
    this.formError.set(null);
    this.isEditorOpen.set(true);
  }

  cancelEditor(): void {
    this.isEditorOpen.set(false);
    this.editingId.set(null);
    this.formError.set(null);
    this.pad()?.clear();
  }

  async save(): Promise<void> {
    if (this.busy()) return;
    const trimmedName = this.name().trim();
    const trimmedStamp = this.stampText().trim();
    if (!trimmedName || trimmedName.length > 120) {
      this.formError.set('Indicá un nombre identificatorio para la firma (hasta 120 caracteres).');
      return;
    }
    if (trimmedStamp.length > 200) {
      this.formError.set('La aclaración o sello admite hasta 200 caracteres.');
      return;
    }

    const editingId = this.editingId();
    const needsDrawing = editingId === null || this.redrawing();
    let imageBase64: string | undefined;
    if (needsDrawing) {
      const exported = this.pad()?.exportTrimmedPng();
      if (!exported) {
        this.formError.set('Dibujá la firma en el recuadro antes de guardar.');
        return;
      }
      imageBase64 = exported;
    }

    this.busy.set(true);
    this.formError.set(null);
    try {
      if (editingId === null) {
        await this.signaturesService.create({
          name: trimmedName,
          stampText: trimmedStamp,
          imageBase64: imageBase64!,
          isFavorite: this.isFavorite(),
        });
        this.interaction.notifySuccess('La firma se guardó correctamente.');
      } else {
        await this.signaturesService.update(editingId, {
          name: trimmedName,
          stampText: trimmedStamp,
          ...(imageBase64 ? { imageBase64 } : {}),
          isFavorite: this.isFavorite(),
        });
        this.interaction.notifySuccess('La firma se actualizó correctamente.');
      }
      this.cancelEditor();
    } catch (err: unknown) {
      const msg = (err as { error?: { message?: string } })?.error?.message;
      this.formError.set(msg || 'No pudimos guardar la firma. Verificá los datos e intentá nuevamente.');
    } finally {
      this.busy.set(false);
    }
  }

  async markFavorite(sig: DoctorSignature): Promise<void> {
    if (this.busy() || sig.isFavorite) return;
    this.busy.set(true);
    try {
      await this.signaturesService.setFavorite(sig.id);
      this.interaction.notifySuccess(`"${sig.name}" quedó como firma favorita por defecto.`);
    } catch (err: unknown) {
      const msg = (err as { error?: { message?: string } })?.error?.message;
      this.formError.set(msg || 'No se pudo actualizar la firma favorita.');
    } finally {
      this.busy.set(false);
    }
  }

  async confirmDelete(sig: DoctorSignature): Promise<void> {
    if (this.busy()) return;
    this.busy.set(true);
    try {
      await this.signaturesService.delete(sig.id);
      this.pendingDeleteId.set(null);
      if (this.editingId() === sig.id) {
        this.cancelEditor();
      }
      this.interaction.notifySuccess('La firma fue eliminada.');
    } catch (err: unknown) {
      const msg = (err as { error?: { message?: string } })?.error?.message;
      this.formError.set(msg || 'No se pudo eliminar la firma.');
    } finally {
      this.busy.set(false);
    }
  }
}
