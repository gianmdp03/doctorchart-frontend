import { Subject, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/services/auth.service';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideUpload,
  lucideFileText,
  lucideImage,
  lucideFile,
  lucideDownload,
  lucideExternalLink,
  lucideTrash2,
  lucideCheckCircle2,
  lucideAlertCircle,
  lucideFolderOpen,
} from '@ng-icons/lucide';
import { PatientMedicalStudy } from '../../../core/models/patient-medical-study.model';
import { PatientMedicalStudyService } from '../../../core/services/patient-medical-study.service';
import { PatientStudiesStore } from './patient-studies.store';
import { textError } from '../../../core/models/form-validation';

const MAX_STUDY_FILE_BYTES = 10_000_000;

@Component({
  selector: 'app-patient-studies',
  imports: [CommonModule, FormsModule, NgIcon],
  providers: [
    provideIcons({
      lucideUpload,
      lucideFileText,
      lucideImage,
      lucideFile,
      lucideDownload,
      lucideExternalLink,
      lucideTrash2,
      lucideCheckCircle2,
      lucideAlertCircle,
      lucideFolderOpen,
    }),
  ],
  templateUrl: './patient-studies.component.html',
  styleUrl: './patient-studies.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientStudiesComponent {
  private readonly studyService = inject(PatientMedicalStudyService);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly changed = new Subject<void>();
  private context = '';
  private revision = 0;
  private read = 0;
  private readonly previewUrls = new Set<string>();
  private contextKey(): string { return JSON.stringify([this.auth.currentUser()?.id ?? null,this.patientId()]); }
  private syncContext(): void {
    const context = this.contextKey(); if (context === this.context) return;
    const isInitial = this.context === '';
    this.changed.next(); this.context = context; this.revision++; this.read++;
    this.studies.set([]);
    if (!isInitial) {
      this.clearSelectedFile();
    }
    this.errorMessage.set(null); this.successMessage.set(null);
    this.isLoading.set(false); this.isUploading.set(false);
    this.releasePreviews();
  }
  private releasePreviews(): void {
    for (const url of this.previewUrls) window.URL.revokeObjectURL(url);
    this.previewUrls.clear();
  }
  private current(revision: number): boolean { return revision === this.revision && this.context === this.contextKey() && !this.destroyRef.destroyed; }


  private readonly studiesStore = inject(PatientStudiesStore, { optional: true });

  readonly patientId = input.required<number>();

  readonly studies = signal<PatientMedicalStudy[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly isUploading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly selectedFile = signal<File | null>(null);
  readonly description = signal<string>('');
  readonly descriptionError = computed(() => textError(this.description(), 4000));
  readonly fileError = computed(() => {
    const file = this.selectedFile();
    if (!file) return 'Seleccioná un archivo.';
    if (!file.size) return 'Seleccioná un archivo que no esté vacío.';
    if (file.size > 25 * 1024 * 1024) return 'El archivo supera el máximo de 25 MB.';
    if (!/\.(pdf|jpe?g|png|webp|gif|bmp|tiff?)$/i.test(file.name)) return 'Seleccioná un PDF o una imagen JPG, PNG, WebP, GIF, BMP o TIFF.';
    return null;
  });

  readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  readonly hasStudies = computed(() => this.studies().length > 0);

  constructor() {
    if (this.studiesStore?.draftFile()) {
      this.selectedFile.set(this.studiesStore.draftFile());
    }
    if (this.studiesStore?.draftDescription()) {
      this.description.set(this.studiesStore.draftDescription());
    }

    effect(() => {
      const pid = this.patientId(); this.auth.currentUser();
      untracked(() => { this.syncContext(); if (pid) this.loadStudies(pid); });
    });
    this.destroyRef.onDestroy(() => { this.changed.next(); this.releasePreviews(); });
  }

  loadStudies(patientId: number): void {
    this.syncContext(); const revision = this.revision; const read = ++this.read;
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.studyService.getStudies(patientId).pipe(takeUntil(this.changed),takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        if (!this.current(revision) || read !== this.read || patientId !== this.patientId()) return;
        this.studies.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        if (!this.current(revision) || read !== this.read) return;
        this.errorMessage.set('No se pudieron cargar los estudios médicos del paciente.');
        this.isLoading.set(false);
      },
    });
  }

  onFileChange(event: Event): void {
	if (this.isUploading()) return;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
<<<<<<< Updated upstream
=======
      if (file.size > MAX_STUDY_FILE_BYTES) {
        this.errorMessage.set('El archivo supera el tamaño máximo permitido de 10 MB.');
        this.selectedFile.set(null);
        this.studiesStore?.setDraftFile(null);
        return;
      }
>>>>>>> Stashed changes
      this.selectedFile.set(file);
      this.studiesStore?.setDraftFile(file);
      this.errorMessage.set(null);
    }
  }

  onDescriptionChange(val: string): void {
    this.description.set(val);
    this.errorMessage.set(null);
    this.studiesStore?.setDraftDescription(val);
  }

  clearSelectedFile(): void {
    this.selectedFile.set(null);
    this.description.set('');
    this.studiesStore?.clearDraft();
    const inputEl = this.fileInput()?.nativeElement;
    if (inputEl) {
      inputEl.value = '';
    }
  }

  submitUpload(): void {
    this.syncContext();
    if (this.isUploading()) return;
    const revision = this.revision;
    const file = this.selectedFile();
    if (!file || this.fileError() || this.descriptionError()) {
      this.errorMessage.set(this.fileError() || this.descriptionError());
      return;
    }
    if (file.size > MAX_STUDY_FILE_BYTES) {
      this.errorMessage.set('El archivo supera el tamaño máximo permitido de 10 MB.');
      return;
    }

    const pid = this.patientId();
    this.isUploading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.studyService.uploadStudy(pid, file, this.description()).pipe(takeUntil(this.changed),takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (created) => {
        if (!this.current(revision)) return;
        if (created.patientId !== pid) { this.isUploading.set(false); this.errorMessage.set('La respuesta no corresponde al paciente seleccionado.'); return; }
        this.studies.update((list) => [created, ...list]);
        this.clearSelectedFile();
        this.isUploading.set(false);
        this.successMessage.set('Estudio médico subido exitosamente.');
        setTimeout(() => { if (this.current(revision)) this.successMessage.set(null); }, 4000);
      },
      error: (error) => {
        if (!this.current(revision)) return;
        this.isUploading.set(false);
        const messages: Record<string, string> = {
          STUDY_FILE_TOO_LARGE: 'El archivo supera el tamaño máximo permitido de 10 MB.',
          INVALID_STUDY_FILE: 'El archivo debe ser un PDF sin cifrar o una imagen válida (JPG, PNG, WebP, GIF, BMP o TIFF).',
          EMPTY_STUDY_FILE: 'Seleccioná un archivo que no esté vacío.',
          INVALID_STUDY_FILENAME: 'El nombre del archivo no es válido.',
          STUDY_DESCRIPTION_TOO_LONG: 'La descripción admite hasta 4000 caracteres.',
          STUDY_IMAGE_TOO_LARGE: 'La imagen supera la resolución máxima permitida.',
          STUDY_VALIDATION_BUSY: 'Hay otras cargas en proceso. Reintentá en unos segundos.',
          IMAGE_CONVERTER_UNAVAILABLE: 'El servicio de imágenes no está disponible. Reintentá en unos segundos.',
        };
        this.errorMessage.set(messages[error?.error?.code] ?? 'Error al subir el estudio médico. Verificá la conexión y reintentá.');
      },
    });
  }

  downloadStudy(study: PatientMedicalStudy): void {
    this.syncContext();
    if (study.patientId !== this.patientId()) return;
    const revision = this.revision;
    this.studyService.getStudyFileBlob(this.patientId(), study.id).pipe(takeUntil(this.changed),takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (blob) => {
        if (!this.current(revision)) return;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = study.originalFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        if (!this.current(revision)) return;
        this.errorMessage.set('No se pudo descargar el archivo del estudio.');
      },
    });
  }

  openStudyPreview(study: PatientMedicalStudy): void {
    this.syncContext();
    if (study.patientId !== this.patientId()) return;
    const revision = this.revision;
    this.studyService.getStudyFileBlob(this.patientId(), study.id).pipe(takeUntil(this.changed),takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (blob) => {
        if (!this.current(revision)) return;
        const url = window.URL.createObjectURL(blob);
        this.previewUrls.add(url);
        window.open(url, '_blank', 'noopener,noreferrer');
      },
      error: () => {
        if (!this.current(revision)) return;
        this.errorMessage.set('No se pudo previsualizar el archivo.');
      },
    });
  }

  deleteStudy(study: PatientMedicalStudy): void {
    this.syncContext();
    if (study.patientId !== this.patientId()) return;
    const revision = this.revision;
    if (!confirm(`¿Estás seguro de que deseás eliminar el estudio "${study.originalFileName}"?`)) {
      return;
    }

    this.studyService.deleteStudy(this.patientId(), study.id).pipe(takeUntil(this.changed),takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        if (!this.current(revision)) return;
        this.studies.update((list) => list.filter((s) => s.id !== study.id));
        this.successMessage.set('Estudio eliminado correctamente.');
        setTimeout(() => { if (this.current(revision)) this.successMessage.set(null); }, 3000);
      },
      error: () => {
        if (!this.current(revision)) return;
        this.errorMessage.set('No se pudo eliminar el estudio médico.');
      },
    });
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  }

  isImage(contentType: string): boolean {
    return !!contentType && contentType.startsWith('image/');
  }

  isPdf(contentType: string): boolean {
    return !!contentType && contentType.includes('pdf');
  }
}
