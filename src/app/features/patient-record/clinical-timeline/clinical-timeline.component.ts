import {
  todayDate,
  shiftCalendarDate,
  instantParts,
  formatInstant,
} from '../../../core/date/user-time-zone';
import { hiddenEncounterFieldKeys } from '../../../core/models/wizard-definition.model';
import { wizardRecordEntries } from '../../../core/models/wizard-record-display';
import {
  Component,
  computed,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  signal,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideChevronUp } from '@ng-icons/lucide';
import { ClinicalEncounterList } from '../../../core/models/clinical-encounter.model';
import { DatePickerComponent } from '../../../shared/date-picker/date-picker.component';
import { validIsoDate } from '../../../core/models/form-validation';

@Component({
  selector: 'app-clinical-timeline',
  standalone: true,
  imports: [NgIcon, DatePickerComponent],
  providers: [provideIcons({ lucideChevronDown, lucideChevronUp })],
  templateUrl: './clinical-timeline.component.html',
  styleUrl: './clinical-timeline.component.css',
})
export class ClinicalTimelineComponent implements OnChanges {
  private readonly encounterRows = signal<ClinicalEncounterList[]>([]);
  @Input() set encounters(value: ClinicalEncounterList[]) {
    this.encounterRows.set(value);
  }
  get encounters(): ClinicalEncounterList[] {
    return this.encounterRows();
  }
  @Input() isLoading = false;
  @Output() viewDetail = new EventEmitter<number>();
  @Output() deleteEncounter = new EventEmitter<number>();

  // Cards start closed; retain explicit expansion while the same records refresh.
  readonly expandedCardIds = signal<Set<number>>(new Set());

  readonly presets = [
    { id: 'ALL', label: 'Todas' },
    { id: 'LAST_30', label: '30 días' },
    { id: 'LAST_90', label: '90 días' },
    { id: 'THIS_YEAR', label: 'Este año' },
  ] as const;
  readonly fromDate = signal<string>('');
  readonly toDate = signal<string>('');
  readonly datePreset = signal<'ALL' | 'LAST_30' | 'LAST_90' | 'THIS_YEAR' | 'CUSTOM'>('ALL');
  readonly dateRangeError = computed(() =>
    validIsoDate(this.fromDate()) && validIsoDate(this.toDate()) && this.fromDate() > this.toDate()
      ? 'La fecha Desde no puede ser posterior a Hasta.'
      : null,
  );

  readonly hasActiveDateFilter = computed(() => {
    return !!this.fromDate() || !!this.toDate() || this.datePreset() !== 'ALL';
  });

  readonly filteredEncounters = computed<ClinicalEncounterList[]>(() => {
    const list = this.encounters || [];
    const from = this.fromDate();
    const to = this.toDate();
    if (this.dateRangeError() || (from && !validIsoDate(from)) || (to && !validIsoDate(to)))
      return list;

    if (!from && !to) {
      return list;
    }

    return list.filter((enc) => {
      if (!enc.encounterDate) return false;
      const encDateStr = instantParts(enc.encounterDate).day;
      if (from && encDateStr < from) return false;
      if (to && encDateStr > to) return false;
      return true;
    });
  });

  readonly allVisibleExpanded = computed(() =>
    this.filteredEncounters().every((encounter) => this.expandedCardIds().has(encounter.id)),
  );

  setPreset(preset: 'ALL' | 'LAST_30' | 'LAST_90' | 'THIS_YEAR'): void {
    this.datePreset.set(preset);

    const toStr = todayDate();

    if (preset === 'ALL') {
      this.fromDate.set('');
      this.toDate.set('');
      return;
    }

    if (preset === 'LAST_30') {
      this.fromDate.set(shiftCalendarDate(todayDate(), -30));
      this.toDate.set(toStr);
      return;
    }

    if (preset === 'LAST_90') {
      this.fromDate.set(shiftCalendarDate(todayDate(), -90));
      this.toDate.set(toStr);
      return;
    }

    if (preset === 'THIS_YEAR') {
      const year = todayDate().slice(0, 4);
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
    if (changes['encounters']) {
      const available = new Set(this.encounters.map((row) => row.id));
      this.expandedCardIds.update(
        (current) => new Set([...current].filter((id) => available.has(id))),
      );
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
    this.expandedCardIds.update(
      (ids) => new Set([...ids, ...this.filteredEncounters().map((encounter) => encounter.id)]),
    );
  }

  collapseAll(): void {
    this.expandedCardIds.set(new Set());
  }

  formatDate(dateStr: string): string {
    return dateStr ? formatInstant(dateStr, false) : '—';
  }

  formatTime(dateStr: string): string {
    const time = instantParts(dateStr).time;
    return time ? time + ' hs' : '';
  }

  getConsultationTypeLabel(type: string): string {
    switch (type) {
      case 'FIRST_VISIT':
        return 'Primera consulta';
      case 'FOLLOW_UP':
        return 'Control';
      case 'ROUTINE_CHECKUP':
        return 'Chequeo general';
      case 'EMERGENCY':
        return 'Urgencia';
      case 'INTERCONSULTATION':
        return 'Interconsulta';
      default:
        return type || 'Consulta';
    }
  }

  getEncounterSummary(encounter: ClinicalEncounterList): string {
    return (
      encounter.chiefComplaint?.trim() ||
      encounter.primaryDiagnosisDescription?.trim() ||
      'Consulta #' + encounter.id
    );
  }

  getPreviewEntries(encounter: ClinicalEncounterList): { label: string; value: string }[] {
    const hasSavedFields = encounter.formDefinitionSnapshot.categories.some(
      (category) => category.fields.length > 0,
    );
    if (!hasSavedFields) {
      const plan = encounter.treatmentPlan?.trim();
      return plan ? [{ label: 'Plan de tratamiento', value: plan }] : [];
    }
    const complaint = encounter.chiefComplaint?.trim();
    const diagnosis = encounter.primaryDiagnosisDescription?.trim();
    return wizardRecordEntries(encounter, (_category, field) => {
      if (hiddenEncounterFieldKeys.includes(field.key)) return false;
      const value = encounter.formValues[field.key];
      if (typeof value !== 'string') return true;
      if (['chiefComplaint', 'complaint'].includes(field.key)) return value.trim() !== complaint;
      if (['diagnosis', 'primaryDiagnosisDescription'].includes(field.key))
        return value.trim() !== diagnosis;
      return true;
    });
  }
  onViewCard(id: number): void {
    this.viewDetail.emit(id);
  }

  onDeleteCard(id: number): void {
    this.deleteEncounter.emit(id);
  }
}
