import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { AuthService } from '../../core/services/auth.service';
import { ClinicalDocumentPrintService } from '../../core/services/clinical-document-print.service';
import { DoctorPrintIdentityService } from '../../core/services/doctor-print-identity.service';
import { DoctorProfileService } from '../../core/services/doctor-profile.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { cropSquare } from '../../shared/customer-account/crop-square';

@Component({
  selector: 'app-user-profile-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css',
})
export class UserProfilePageComponent {
  readonly authService = inject(AuthService);
  readonly doctorSpecialtyService = inject(DoctorSpecialtyService);
  readonly printIdentityService = inject(DoctorPrintIdentityService);
  private readonly activePatientService = inject(ActivePatientService);
  private readonly doctorProfileService = inject(DoctorProfileService);
  private readonly printService = inject(ClinicalDocumentPrintService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly licenseDraft = signal<string>('');
  readonly licenseNotice = signal<string | null>(null);
  readonly licenseError = signal<string | null>(null);

  private readonly cropPreview = viewChild<ElementRef<HTMLCanvasElement>>('cropPreview');
  readonly pendingLogo = signal<ImageBitmap | null>(null);
  readonly zoom = signal<number>(1);
  readonly horizontal = signal<number>(50);
  readonly vertical = signal<number>(50);
  readonly confirmLogoDelete = signal<boolean>(false);
  readonly logoNotice = signal<string | null>(null);
  readonly logoError = signal<string | null>(null);

  private dragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private dragOriginH = 50;
  private dragOriginV = 50;

  readonly user = computed(() => this.authService.currentUser());

  readonly fullName = computed(() => this.authService.userName());

  readonly email = computed(() => this.authService.userEmail() || 'No informado');

  readonly dni = computed(() => {
    const user = this.user();
    return (user?.user_metadata?.['dni'] as string) || 'No especificado';
  });

  readonly role = computed(() => {
    const user = this.user();
    return (user?.user_metadata?.['role'] as string) || 'No informado';
  });

  readonly activeLicense = computed(() => this.printIdentityService.authoritativeLicense());

  readonly initials = computed(() => {
    const name = this.fullName();
    if (!name) return 'DC';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  });

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.pendingLogo()?.close();
    });

    effect(() => {
      const id = this.printIdentityService.identity();
      if (id) {
        this.licenseDraft.set(id.professionalLicense);
      } else {
        this.licenseDraft.set(this.activeLicense());
      }
    });

    effect(() => {
      const bitmap = this.pendingLogo();
      const canvas = this.cropPreview()?.nativeElement;
      if (bitmap && canvas) {
        this.drawCrop(bitmap, canvas);
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      void this.printIdentityService.load();
    }
  }

  async saveLicense(): Promise<void> {
    if (this.printIdentityService.savingLicense()) return;
    const trimmed = this.licenseDraft().trim();
    if (trimmed.length > 80) {
      this.licenseError.set('La matrícula profesional admite hasta 80 caracteres.');
      return;
    }
    this.licenseNotice.set(null);
    this.licenseError.set(null);
    try {
      await this.printIdentityService.saveLicense(trimmed);
      this.printService.clearPreviewCache();
      this.licenseNotice.set(
        trimmed
          ? 'Matrícula guardada. Aparecerá junto a tu nombre en todos los PDFs.'
          : 'Matrícula quitada. No se imprimirá ninguna leyenda de matrícula en los PDFs.',
      );
    } catch (err: unknown) {
      this.licenseError.set(
        (err as { error?: { message?: string } })?.error?.message ?? 'No se pudo guardar la matrícula.',
      );
    }
  }

  async clearLicense(): Promise<void> {
    this.licenseDraft.set('');
    await this.saveLicense();
  }

  async chooseLogo(input: HTMLInputElement): Promise<void> {
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    this.logoError.set(null);
    this.logoNotice.set(null);
    this.confirmLogoDelete.set(false);
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 10_000_000) {
      this.logoError.set('Elegí una imagen JPG, PNG o WebP de hasta 10 MB.');
      return;
    }
    try {
      const bitmap = await createImageBitmap(file);
      if (bitmap.width * bitmap.height > 32_000_000) {
        bitmap.close();
        this.logoError.set('La imagen es demasiado grande. Probá con una resolución menor.');
        return;
      }
      this.cancelCrop();
      this.zoom.set(1);
      this.horizontal.set(50);
      this.vertical.set(50);
      this.pendingLogo.set(bitmap);
    } catch {
      this.logoError.set('No pudimos abrir esa imagen. Probá con otro archivo JPG, PNG o WebP.');
    }
  }

  private drawCrop(bitmap: ImageBitmap, canvas: HTMLCanvasElement): void {
    const area = cropSquare(bitmap.width, bitmap.height, this.zoom(), this.horizontal(), this.vertical());
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, area.x, area.y, area.size, area.size, 0, 0, canvas.width, canvas.height);
  }

  onCropPointerDown(event: PointerEvent): void {
    if (!this.pendingLogo()) return;
    const target = event.currentTarget as HTMLElement | null;
    target?.setPointerCapture?.(event.pointerId);
    this.dragging = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.dragOriginH = this.horizontal();
    this.dragOriginV = this.vertical();
  }

  onCropPointerMove(event: PointerEvent): void {
    if (!this.dragging) return;
    const dx = event.clientX - this.dragStartX;
    const dy = event.clientY - this.dragStartY;
    this.horizontal.set(Math.min(100, Math.max(0, Math.round(this.dragOriginH - dx * 0.4))));
    this.vertical.set(Math.min(100, Math.max(0, Math.round(this.dragOriginV - dy * 0.4))));
  }

  onCropPointerUp(): void {
    this.dragging = false;
  }

  cancelCrop(): void {
    this.pendingLogo()?.close();
    this.pendingLogo.set(null);
  }

  async saveLogo(): Promise<void> {
    const bitmap = this.pendingLogo();
    if (!bitmap || this.printIdentityService.savingLogo()) return;
    this.logoError.set(null);
    this.logoNotice.set(null);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 512;
      this.drawCrop(bitmap, canvas);
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          (result) => (result ? resolve(result) : reject(new Error('No pudimos preparar el recorte.'))),
          'image/png',
        ),
      );
      await this.printIdentityService.uploadLogo(blob);
      this.printService.clearPreviewCache();
      this.cancelCrop();
      this.logoNotice.set('Logo del consultorio optimizado y guardado para todos tus PDFs.');
    } catch (err: unknown) {
      this.logoError.set(
        (err as { error?: { message?: string } })?.error?.message ?? 'No se pudo guardar el logo del consultorio.',
      );
    }
  }

  async removeLogo(): Promise<void> {
    if (this.printIdentityService.savingLogo()) return;
    this.logoError.set(null);
    this.logoNotice.set(null);
    try {
      await this.printIdentityService.deleteLogo();
      this.printService.clearPreviewCache();
      this.confirmLogoDelete.set(false);
      this.logoNotice.set('Logo del consultorio eliminado.');
    } catch (err: unknown) {
      this.logoError.set(
        (err as { error?: { message?: string } })?.error?.message ?? 'No se pudo quitar el logo.',
      );
    }
  }

  async handleSignOut(): Promise<void> {
    if (this.isSubmitting()) return;
    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      const { error } = await this.authService.signOut();
      if (error) {
        this.errorMessage.set(error.message || 'Error al cerrar sesión.');
        this.isSubmitting.set(false);
        return;
      }
      this.activePatientService.clear();
      this.doctorProfileService.clearProfile();

      if (isPlatformBrowser(this.platformId)) {
        window.dispatchEvent(new CustomEvent('auth-signout'));
      }

      void this.router.navigate(['/login']);
    } catch (err: unknown) {
      this.isSubmitting.set(false);
      const msg = err instanceof Error ? err.message : 'Error inesperado al cerrar sesión.';
      this.errorMessage.set(msg);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
