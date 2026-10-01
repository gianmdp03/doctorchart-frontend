import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
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

  readonly patientId = input.required<number>();

  readonly studies = signal<PatientMedicalStudy[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly isUploading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly selectedFile = signal<File | null>(null);
  readonly description = signal<string>('');

  readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  readonly hasStudies = computed(() => this.studies().length > 0);

  constructor() {
    effect(() => {
      const pid = this.patientId();
      if (pid) {
        this.loadStudies(pid);
      }
    });
  }

  loadStudies(patientId: number): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.studyService.getStudies(patientId).subscribe({
      next: (data) => {
        this.studies.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudieron cargar los estudios médicos del paciente.');
        this.isLoading.set(false);
      },
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Max 25MB check
      if (file.size > 25 * 1024 * 1024) {
        this.errorMessage.set('El archivo supera el tamaño máximo permitido de 25 MB.');
        this.selectedFile.set(null);
        return;
      }
      this.selectedFile.set(file);
      this.errorMessage.set(null);
    }
  }

  clearSelectedFile(): void {
    this.selectedFile.set(null);
    this.description.set('');
    const inputEl = this.fileInput()?.nativeElement;
    if (inputEl) {
      inputEl.value = '';
    }
  }

  submitUpload(): void {
    const file = this.selectedFile();
    if (!file) {
      this.errorMessage.set('Por favor seleccioná un archivo antes de continuar.');
      return;
    }

    const pid = this.patientId();
    this.isUploading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.studyService.uploadStudy(pid, file, this.description()).subscribe({
      next: (created) => {
        this.studies.update((list) => [created, ...list]);
        this.clearSelectedFile();
        this.isUploading.set(false);
        this.successMessage.set('Estudio médico subido exitosamente.');
        setTimeout(() => this.successMessage.set(null), 4000);
      },
      error: () => {
        this.isUploading.set(false);
        this.errorMessage.set('Error al subir el estudio médico. Verificá la conexión y reintentá.');
      },
    });
  }

  downloadStudy(study: PatientMedicalStudy): void {
    this.studyService.getStudyFileBlob(this.patientId(), study.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = study.originalFileName || study.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.errorMessage.set('No se pudo descargar el archivo del estudio.');
      },
    });
  }

  openStudyPreview(study: PatientMedicalStudy): void {
    this.studyService.getStudyFileBlob(this.patientId(), study.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      },
      error: () => {
        this.errorMessage.set('No se pudo previsualizar el archivo.');
      },
    });
  }

  deleteStudy(study: PatientMedicalStudy): void {
    if (!confirm(`¿Estás seguro de que deseás eliminar el estudio "${study.originalFileName}"?`)) {
      return;
    }

    this.studyService.deleteStudy(this.patientId(), study.id).subscribe({
      next: () => {
        this.studies.update((list) => list.filter((s) => s.id !== study.id));
        this.successMessage.set('Estudio eliminado correctamente.');
        setTimeout(() => this.successMessage.set(null), 3000);
      },
      error: () => {
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
