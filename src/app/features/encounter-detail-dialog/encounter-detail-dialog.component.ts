import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { WorkspaceService } from '../../core/services/workspace.service';
import { ClinicalEncounterDetail } from '../../core/models/clinical-encounter.model';
import { FormTemplate } from '../../core/models/workspace.model';
import { MedicalSpecialty } from '../../core/models/specialty.model';
import { DynamicFormRendererComponent } from '../dynamic-form-renderer/dynamic-form-renderer.component';

@Component({
  selector: 'app-encounter-detail-dialog',
  imports: [CommonModule, DynamicFormRendererComponent],
  templateUrl: './encounter-detail-dialog.component.html',
  styleUrl: './encounter-detail-dialog.component.css',
})
export class EncounterDetailDialogComponent {
  private readonly encounterService = inject(ClinicalEncounterService);
  private readonly workspaceService = inject(WorkspaceService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly isOpen = signal<boolean>(false);
  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly encounter = signal<ClinicalEncounterDetail | null>(null);
  readonly encounterTemplate = signal<FormTemplate | null>(null);

  private openedAt = 0;
  private backdropMouseDown = false;

  @HostListener('window:open-encounter-detail-modal', ['$event'])
  openModal(event?: Event): void {
    this.openedAt = Date.now();
    const customEvent = event as CustomEvent | undefined;
    const detail = customEvent?.detail;

    this.isOpen.set(true);
    this.errorMessage.set(null);

    if (detail?.encounter) {
      this.displayEncounter(detail.encounter);
    } else if (detail?.encounterId) {
      this.loadEncounter(detail.encounterId);
    }
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.isOpen()) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.isOpen.set(false);
    this.encounter.set(null);
    this.encounterTemplate.set(null);
    this.errorMessage.set(null);
    this.isLoading.set(false);
  }

  onBackdropMouseDown(event: MouseEvent): void {
    this.backdropMouseDown = event.target === event.currentTarget;
  }

  onBackdropClick(event: MouseEvent): void {
    if (Date.now() - this.openedAt < 300) {
      return;
    }
    if (this.backdropMouseDown && event.target === event.currentTarget) {
      this.closeModal();
    }
    this.backdropMouseDown = false;
  }

  loadEncounter(id: number): void {
    this.isLoading.set(true);
    this.encounterService.getById(id).subscribe({
      next: (data) => {
        this.displayEncounter(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err?.error?.message || 'No se pudo cargar el detalle de la consulta médica.'
        );
      },
    });
  }

  displayEncounter(enc: ClinicalEncounterDetail): void {
    this.encounter.set(enc);
    if (enc.templateId) {
      this.workspaceService.getTemplateById(enc.templateId).subscribe({
        next: (tmpl) => this.encounterTemplate.set(tmpl),
        error: () => this.encounterTemplate.set(null),
      });
    } else {
      this.encounterTemplate.set(null);
    }
  }

  printEncounter(): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.print();
    }
  }

  getSpecialtyBadgeClass(specialty?: MedicalSpecialty): string {
    switch (specialty) {
      case 'PEDIATRICS':
        return 'badge-pediatrics';
      case 'CARDIOLOGY':
        return 'badge-cardiology';
      case 'OPHTHALMOLOGY':
        return 'badge-ophthalmology';
      case 'GYNECOLOGY':
        return 'badge-gynecology';
      case 'PSYCHIATRY':
        return 'badge-psychiatry';
      case 'DERMATOLOGY':
        return 'badge-dermatology';
      case 'TRAUMATOLOGY':
        return 'badge-traumatology';
      default:
        return 'badge-general';
    }
  }

  getConsultationTypeLabel(type?: string): string {
    switch (type) {
      case 'FIRST_VISIT':
        return 'Primera Consulta';
      case 'FOLLOW_UP':
        return 'Control / Seguimiento';
      case 'ROUTINE_CHECKUP':
        return 'Chequeo General';
      case 'EMERGENCY':
        return 'Urgencia';
      case 'INTERCONSULTATION':
        return 'Interconsulta';
      default:
        return type || 'Consulta';
    }
  }

  getBmiStatus(bmi?: number | null): { label: string; badgeClass: string } {
    if (!bmi) return { label: 'Sin datos de IMC', badgeClass: 'badge-neutral' };
    if (bmi < 18.5) return { label: 'Bajo peso (< 18.5)', badgeClass: 'badge-warning' };
    if (bmi < 25.0) return { label: 'Peso Normal / Eutrófico', badgeClass: 'badge-success' };
    if (bmi < 30.0) return { label: 'Sobrepeso', badgeClass: 'badge-warning' };
    return { label: 'Obesidad', badgeClass: 'badge-danger' };
  }
}
