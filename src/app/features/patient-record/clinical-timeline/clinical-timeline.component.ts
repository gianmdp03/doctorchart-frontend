import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCalendar,
  lucideClock,
  lucideChevronDown,
  lucideChevronUp,
  lucideStethoscope,
  lucideActivity,
  lucidePill,
  lucideFileText,
  lucidePrinter,
  lucideEye,
  lucideTrash2,
  lucidePlus,
  lucideAlertCircle,
  lucideFilter,
} from '@ng-icons/lucide';
import { ClinicalEncounterList } from '../../../core/models/clinical-encounter.model';
import { MedicalSpecialty } from '../../../core/models/specialty.model';
import { SPECIALTY_OPTIONS, SpecialtyOption } from '../../encounter-dialog/new-encounter-dialog.component';

@Component({
  selector: 'app-clinical-timeline',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon],
  providers: [
    provideIcons({
      lucideCalendar,
      lucideClock,
      lucideChevronDown,
      lucideChevronUp,
      lucideStethoscope,
      lucideActivity,
      lucidePill,
      lucideFileText,
      lucidePrinter,
      lucideEye,
      lucideTrash2,
      lucidePlus,
      lucideAlertCircle,
      lucideFilter,
    }),
  ],
  templateUrl: './clinical-timeline.component.html',
  styleUrl: './clinical-timeline.component.css',
})
export class ClinicalTimelineComponent {
  @Input() encounters: ClinicalEncounterList[] = [];
  @Input() isLoading = false;
  @Output() newEncounter = new EventEmitter<void>();
  @Output() viewDetail = new EventEmitter<number>();
  @Output() deleteEncounter = new EventEmitter<number>();
  @Output() printPrescription = new EventEmitter<ClinicalEncounterList>();

  readonly specialtyOptions = SPECIALTY_OPTIONS;
  readonly selectedSpecialtyFilter = signal<MedicalSpecialty | 'ALL'>('ALL');

  // Track which timeline card accordions are expanded (default: top 2 expanded)
  readonly expandedCardIds = signal<Set<number>>(new Set());

  readonly filteredEncounters = computed<ClinicalEncounterList[]>(() => {
    const list = this.encounters || [];
    const filter = this.selectedSpecialtyFilter();
    if (filter === 'ALL') {
      return list;
    }
    return list.filter((enc) => enc.specialty === filter);
  });

  isCardExpanded(id: number): boolean {
    // If not set, expand the first 2 by default
    if (this.expandedCardIds().size === 0 && this.encounters.length > 0) {
      return this.encounters.slice(0, 2).some((e) => e.id === id);
    }
    return this.expandedCardIds().has(id);
  }

  toggleCard(id: number): void {
    this.expandedCardIds.update((current) => {
      const next = new Set(current);
      if (next.size === 0 && this.encounters.length > 0) {
        // Initialize with default state first
        this.encounters.slice(0, 2).forEach((e) => next.add(e.id));
      }
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  expandAll(): void {
    const allIds = new Set(this.filteredEncounters().map((e) => e.id));
    this.expandedCardIds.set(allIds);
  }

  collapseAll(): void {
    this.expandedCardIds.set(new Set());
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  }

  formatTime(dateStr: string): string {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
      }) + ' hs';
    } catch {
      return '';
    }
  }

  getSpecialtyLabel(specialty: MedicalSpecialty): string {
    const found = this.specialtyOptions.find((opt) => opt.value === specialty);
    return found ? found.label : specialty;
  }

  getSpecialtyBadgeClass(specialty: MedicalSpecialty): string {
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

  getConsultationTypeLabel(type: string): string {
    switch (type) {
      case 'FIRST_VISIT':
        return 'Primera Vez';
      case 'FOLLOW_UP':
        return 'Control';
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

  getConsultationTypeClass(type: string): string {
    switch (type) {
      case 'EMERGENCY':
        return 'chip-emergency';
      case 'FIRST_VISIT':
        return 'chip-first-visit';
      default:
        return 'chip-routine';
    }
  }

  getBmiStatus(bmi?: number | null): { label: string; badgeClass: string } {
    if (!bmi) return { label: 'Sin IMC', badgeClass: 'bmi-neutral' };
    if (bmi < 18.5) return { label: `${bmi.toFixed(1)} (Bajo peso)`, badgeClass: 'bmi-warning' };
    if (bmi < 25.0) return { label: `${bmi.toFixed(1)} (Normal)`, badgeClass: 'bmi-success' };
    if (bmi < 30.0) return { label: `${bmi.toFixed(1)} (Sobrepeso)`, badgeClass: 'bmi-warning' };
    return { label: `${bmi.toFixed(1)} (Obesidad)`, badgeClass: 'bmi-danger' };
  }

  onPrintCard(encounter: ClinicalEncounterList, event?: Event): void {
    if (event) event.stopPropagation();
    this.printPrescription.emit(encounter);
  }

  onViewCard(id: number, event?: Event): void {
    if (event) event.stopPropagation();
    this.viewDetail.emit(id);
  }

  onDeleteCard(id: number, event?: Event): void {
    if (event) event.stopPropagation();
    this.deleteEncounter.emit(id);
  }
}
