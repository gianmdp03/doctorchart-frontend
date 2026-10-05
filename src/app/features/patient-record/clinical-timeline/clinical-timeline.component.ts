import { wizardRecordEntries } from '../../../core/models/wizard-record-display';
import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
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
} from '@ng-icons/lucide';
import { ClinicalEncounterList } from '../../../core/models/clinical-encounter.model';
import { DatePickerComponent } from '../../../shared/date-picker/date-picker.component';

@Component({
  selector: 'app-clinical-timeline',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon, DatePickerComponent],
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
    }),
  ],
  templateUrl: './clinical-timeline.component.html',
  styleUrl: './clinical-timeline.component.css',
})
export class ClinicalTimelineComponent implements OnChanges {
  @Input() encounters: ClinicalEncounterList[] = [];
  @Input() isLoading = false;
  @Output() newEncounter = new EventEmitter<void>();
  @Output() viewDetail = new EventEmitter<number>();
  @Output() deleteEncounter = new EventEmitter<number>();
  @Output() printPrescription = new EventEmitter<ClinicalEncounterList>();

  // Track which timeline card accordions are expanded (default: top 2 expanded)
  readonly expandedCardIds = signal<Set<number>>(new Set());
  private hasInitializedExpanded = false;

  readonly fromDate = signal<string>('');
  readonly toDate = signal<string>('');
  readonly datePreset = signal<'ALL' | 'LAST_30' | 'LAST_90' | 'THIS_YEAR' | 'CUSTOM'>('ALL');

  readonly hasActiveDateFilter = computed(() => {
    return !!this.fromDate() || !!this.toDate() || this.datePreset() !== 'ALL';
  });

  readonly filteredEncounters = computed<ClinicalEncounterList[]>(() => {
    const list = this.encounters || [];
    const from = this.fromDate();
    const to = this.toDate();

    if (!from && !to) {
      return list;
    }

    return list.filter((enc) => {
      if (!enc.encounterDate) return false;
      const encDateStr = enc.encounterDate.slice(0, 10);
      if (from && encDateStr < from) return false;
      if (to && encDateStr > to) return false;
      return true;
    });
  });

  setPreset(preset: 'ALL' | 'LAST_30' | 'LAST_90' | 'THIS_YEAR'): void {
    this.datePreset.set(preset);
    const today = new Date();
    const toStr = today.toISOString().slice(0, 10);

    if (preset === 'ALL') {
      this.fromDate.set('');
      this.toDate.set('');
      return;
    }

    if (preset === 'LAST_30') {
      const d = new Date();
      d.setDate(d.getDate() - 30);
      this.fromDate.set(d.toISOString().slice(0, 10));
      this.toDate.set(toStr);
      return;
    }

    if (preset === 'LAST_90') {
      const d = new Date();
      d.setDate(d.getDate() - 90);
      this.fromDate.set(d.toISOString().slice(0, 10));
      this.toDate.set(toStr);
      return;
    }

    if (preset === 'THIS_YEAR') {
      const year = today.getFullYear();
      this.fromDate.set(year + '-01-01');
      this.toDate.set(toStr);
      return;
    }
  }

  onFromDateValueChange(val: string): void {
    this.datePreset.set('CUSTOM');
    this.fromDate.set(val);
  }

  onToDateValueChange(val: string): void {
    this.datePreset.set('CUSTOM');
    this.toDate.set(val);
  }

  clearDateFilter(): void {
    this.fromDate.set('');
    this.toDate.set('');
    this.datePreset.set('ALL');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['encounters'] && this.encounters && this.encounters.length > 0) {
      const current = this.expandedCardIds();
      const hasAny = this.encounters.some((e) => current.has(e.id));
      if (!this.hasInitializedExpanded || !hasAny) {
        this.expandedCardIds.set(new Set(this.encounters.slice(0, 2).map((e) => e.id)));
        this.hasInitializedExpanded = true;
      }
    }
  }

  isCardExpanded(id: number): boolean {
    return this.expandedCardIds().has(id);
  }

  toggleCard(id: number): void {
    this.expandedCardIds.update((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  expandAll(): void {
    const allIds = new Set((this.encounters || []).map((e) => e.id));
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


  getEncounterSummary(encounter: ClinicalEncounterList): string {
    return encounter.chiefComplaint || encounter.primaryDiagnosisDescription || wizardRecordEntries(encounter)[0]?.value || 'Consulta registrada';
  }

  getDynamicEntries(encounter: ClinicalEncounterList): { label: string; value: string }[] {
    return wizardRecordEntries(encounter);
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
