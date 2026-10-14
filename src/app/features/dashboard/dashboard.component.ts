import { AccountReadScope } from '../../core/services/account-read-scope';
import { displayLocalDate } from '../../core/date/display-date';
import { wizardRecordEntries } from '../../core/models/wizard-record-display';
import {
  DestroyRef,
  Component,
  computed,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideCalendar,
  lucideCheckCircle2,
  lucideChevronLeft,
  lucideChevronRight,
  lucideClock,
  lucideEye,
  lucideFileText,
  lucideSearch,
  lucideRefreshCw,
  lucideSparkles,
  lucideStethoscope,
  lucideUserPlus,
  lucideUsers,
} from '@ng-icons/lucide';
import { takeUntil } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { PatientService } from '../../core/services/patient.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { PatientListDTO } from '../../core/models/patient.model';
import {
  ClinicalEncounterList,
  DashboardRecentEncounter,
} from '../../core/models/clinical-encounter.model';
import { getTotalElements, getTotalPages } from '../../core/models/api-response.model';

export interface ClinicalHighlightItem {
  label: string;
  value: string;
}

export interface RecentEncounterItem {
  id: number;
  patientId: number;
  patientName: string;
  patientMeta: string;
  encounterDate: string;
  encounterDateOnly: string;
  encounterTimeOnly: string;
  isToday: boolean;
  consultationTypeLabel: string;
  consultationTypeKey: string;
  chiefComplaint: string;
  diagnosis: string;
  diagnosisCode?: string | null;
  clinicalHighlights: ClinicalHighlightItem[];
}

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, RouterLink, NgIcon],
  providers: [
    provideIcons({
      lucideArrowRight,
      lucideCalendar,
      lucideCheckCircle2,
      lucideChevronLeft,
      lucideChevronRight,
      lucideClock,
      lucideEye,
      lucideFileText,
      lucideSearch,
      lucideRefreshCw,
      lucideSparkles,
      lucideStethoscope,
      lucideUserPlus,
      lucideUsers,
    }),
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  readonly authService = inject(AuthService);
  readonly patientService = inject(PatientService);
  readonly activePatientService = inject(ActivePatientService);
  private readonly clinicalEncounterService = inject(ClinicalEncounterService);
  private readonly workspaceStore = inject(WorkspaceStore);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly totalPatients = signal<number | null>(null);
  readonly encountersMonthCount = signal<number | null>(null);
  readonly encountersTodayCount = signal<number | null>(null);
  readonly isLoadingMetrics = signal<boolean>(true);

  readonly recentEncounters = signal<RecentEncounterItem[]>([]);
  private readonly recentRecords = signal<ClinicalEncounterList[]>([]);
  private readonly activityDay = signal(this.argentinaDay());
  readonly recentSearch = signal('');
  readonly recentPage = signal(0);
  readonly recentPageSize = signal(5);
  readonly recentTotal = signal(0);
  readonly recentTotalPages = signal(1);
  readonly recentPageError = signal<string | null>(null);
  readonly isLoadingRecentPage = signal(true);
  readonly recentPageItems = computed(() =>
    this.recentRecords().map((encounter) => {
      const date = new Date(encounter.encounterDate);
      const localDate = Number.isFinite(date.getTime()) ? this.argentinaDay(date) : '';
      const item = this.mapToRecentEncounterItem(
        { encounter, encounterLocalDate: localDate, patientAgeLabel: '', patientNationalId: null },
        this.activityDay(),
      );
      const known = this.recentEncounters().find(
        (e) => e.patientId === encounter.patientId && e.patientName === item.patientName,
      );
      return { ...item, patientMeta: known?.patientMeta ?? item.patientMeta };
    }),
  );
  readonly recentRange = computed(() => {
    const count = this.recentPageItems().length;
    const start = count ? this.recentPage() * this.recentPageSize() + 1 : 0;
    return `${start}–${count ? start + count - 1 : 0} de ${this.recentTotal()}`;
  });
  readonly recentPageNumbers = computed(() => {
    const count = Math.min(5, this.recentTotalPages());
    const start = Math.max(0, Math.min(this.recentPage() - 2, this.recentTotalPages() - count));
    return Array.from({ length: count }, (_, i) => start + i);
  });
  readonly isLoadingRecent = signal<boolean>(true);
  readonly metricsError = signal<string | null>(null);
  readonly directoryError = signal<string | null>(null);
  readonly displayDate = displayLocalDate;

  readonly directoryPatients = signal<PatientListDTO[]>([]);
  readonly directorySearch = signal<string>('');
  readonly directoryPage = signal<number>(0);
  readonly directoryTotalPages = signal<number>(1);
  readonly isSearchingDirectory = signal<boolean>(false);

  readonly quickNotes = signal<string>('');
  readonly isNotesDirty = signal<boolean>(false);
  readonly isSavingNotes = signal<boolean>(false);
  readonly isNotesSaved = signal<boolean>(false);

  readonly todayDateString = computed(() =>
    new Date().toLocaleDateString('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  );

  readonly greeting = computed(() => {
    const hour = new Date().getHours();
    const prefix =
      hour >= 20 || hour < 6 ? 'Buenas noches' : hour >= 13 ? 'Buenas tardes' : 'Buen día';
    const name = this.authService.userName();
    return name ? `${prefix}, Dr(a). ${name}` : `${prefix}, Doctor(a)`;
  });

  private directorySearchTimer: ReturnType<typeof setTimeout> | null = null;
  private recentSearchTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly recentReads = new AccountReadScope(() => {
    this.recentSearch.set('');
    this.recentPageSize.set(5);
    this.loadRecentPage(0);
  });
  private readonly metricsReads = new AccountReadScope(() => this.loadKpiData());
  private readonly directoryReads = new AccountReadScope(() => {
    this.directorySearch.set('');
    this.loadDirectory(0);
  });

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.directorySearchTimer) {
        clearTimeout(this.directorySearchTimer);
      }
      if (this.recentSearchTimer) clearTimeout(this.recentSearchTimer);
    });
  }

  ngOnInit(): void {
    this.loadKpiData();
    this.loadRecentPage(0);
    this.loadDirectory(0);
    this.hydrateNotes();
  }

  @HostListener('window:patient-created')
  @HostListener('window:patient-updated')
  @HostListener('window:patient-deleted')
  @HostListener('window:encounter-created')
  @HostListener('window:encounter-updated')
  @HostListener('window:encounter-deleted')
  @HostListener('window:auth-success')
  onClinicalDataChanged(): void {
    this.loadKpiData();
    this.loadRecentPage(0);
    this.loadDirectory(0, this.directorySearch());
  }

  loadKpiData(): void {
    const current = this.metricsReads.begin();
    this.totalPatients.set(null);
    this.encountersMonthCount.set(null);
    this.encountersTodayCount.set(null);
    this.recentEncounters.set([]);
    this.metricsError.set(null);
    if (!this.metricsReads.authenticated()) {
      this.isLoadingMetrics.set(false);
      this.isLoadingRecent.set(false);
      return;
    }
    this.isLoadingMetrics.set(true);
    this.isLoadingRecent.set(true);
    this.clinicalEncounterService
      .getDashboard()
      .pipe(takeUntil(this.metricsReads.canceled))
      .subscribe({
        next: (activity) => {
          if (!current()) return;
          this.totalPatients.set(activity.totalPatients);
          this.activityDay.set(activity.asOfDate);
          this.encountersMonthCount.set(activity.encountersThisMonth);
          this.encountersTodayCount.set(activity.encountersToday);
          this.recentEncounters.set(
            activity.recentEncounters.map((recent) =>
              this.mapToRecentEncounterItem(recent, activity.asOfDate),
            ),
          );
          this.isLoadingMetrics.set(false);
          this.isLoadingRecent.set(false);
        },
        error: () => {
          if (current()) {
            this.metricsError.set('No se pudo cargar la actividad clínica.');
            this.isLoadingMetrics.set(false);
            this.isLoadingRecent.set(false);
          }
        },
      });
  }
  private argentinaDay(date = new Date()): string {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Argentina/Buenos_Aires',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  }
  loadRecentPage(page: number): void {
    if (this.recentSearchTimer) clearTimeout(this.recentSearchTimer);
    this.recentSearchTimer = null;
    const current = this.recentReads.begin();
    this.recentRecords.set([]);
    this.recentPageError.set(null);
    this.recentPage.set(Math.max(0, page));
    this.recentTotal.set(0);
    this.recentTotalPages.set(1);
    if (!this.recentReads.authenticated()) {
      this.isLoadingRecentPage.set(false);
      return;
    }
    this.isLoadingRecentPage.set(true);
    this.clinicalEncounterService
      .getAll(
        this.recentPage(),
        this.recentPageSize(),
        'encounterDate,desc',
        this.recentSearch().trim(),
      )
      .pipe(takeUntil(this.recentReads.canceled))
      .subscribe({
        next: (response) => {
          if (!current()) return;
          const totalPages = Math.max(1, getTotalPages(response));
          if (page >= totalPages && getTotalElements(response) > 0) {
            this.loadRecentPage(totalPages - 1);
            return;
          }
          this.recentRecords.set(response.content);
          this.recentTotal.set(getTotalElements(response));
          this.recentTotalPages.set(totalPages);
          this.isLoadingRecentPage.set(false);
        },
        error: () => {
          if (!current()) return;
          this.recentPageError.set(
            'No se pudieron cargar las consultas. Reintentá para continuar.',
          );
          this.isLoadingRecentPage.set(false);
        },
      });
  }
  onRecentSearchInput(event: Event): void {
    this.recentSearch.set((event.target as HTMLInputElement).value);
    this.recentReads.cancel();
    this.recentRecords.set([]);
    this.isLoadingRecentPage.set(true);
    if (this.recentSearchTimer) clearTimeout(this.recentSearchTimer);
    this.recentSearchTimer = setTimeout(() => this.loadRecentPage(0), 350);
  }
  clearRecentSearch(): void {
    this.recentSearch.set('');
    this.loadRecentPage(0);
  }
  refreshRecentActivity(): void {
    this.loadKpiData();
    this.loadRecentPage(this.recentPage());
  }
  changeRecentPageSize(value: string): void {
    const size = Number(value);
    if (![5, 10, 20].includes(size)) return;
    this.recentPageSize.set(size);
    this.loadRecentPage(0);
  }
  loadDirectory(page: number, search?: string): void {
    if (this.directorySearchTimer) {
      clearTimeout(this.directorySearchTimer);
      this.directorySearchTimer = null;
    }
    const current = this.directoryReads.begin();
    this.directoryPatients.set([]);
    this.directoryError.set(null);
    this.directoryPage.set(page);
    if (!this.directoryReads.authenticated()) {
      this.isSearchingDirectory.set(false);
      return;
    }
    this.isSearchingDirectory.set(true);
    this.patientService
      .getPatients(page, 6, 'fullName,asc', search)
      .pipe(takeUntil(this.directoryReads.canceled))
      .subscribe({
        next: (response) => {
          if (current()) {
            this.directoryPatients.set(response.content);
            this.directoryPage.set(page);
            this.directoryTotalPages.set(getTotalPages(response));
            this.isSearchingDirectory.set(false);
          }
        },
        error: () => {
          if (current()) {
            this.directoryError.set('No se pudo cargar el directorio.');
            this.isSearchingDirectory.set(false);
          }
        },
      });
  }

  onDirectorySearchInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.directorySearch.set(query);
    if (this.directorySearchTimer) {
      clearTimeout(this.directorySearchTimer);
    }
    this.directorySearchTimer = setTimeout(() => {
      this.loadDirectory(0, query.trim());
    }, 400);
  }

  onDirectorySearchEnter(): void {
    if (this.directorySearchTimer) {
      clearTimeout(this.directorySearchTimer);
      this.directorySearchTimer = null;
    }
    this.loadDirectory(0, this.directorySearch().trim());
  }

  openPatient(patientId: number): void {
    this.activePatientService.loadPatient(patientId);
    this.router.navigate(['/pacientes', patientId]);
  }

  openEncounterDetail(encounterId: number, event?: Event): void {
    if (event) event.stopPropagation();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-encounter-detail-modal', { detail: { encounterId } }),
      );
    }
  }

  hydrateNotes(): void {
    this.quickNotes.set(this.workspaceStore.quickNotes() || '');
    this.isNotesDirty.set(false);
  }

  onNotesInput(content: string): void {
    this.quickNotes.set(content);
    this.isNotesDirty.set(content !== (this.workspaceStore.quickNotes() || ''));
    this.isNotesSaved.set(false);
  }

  async saveNotes(): Promise<void> {
    if (!this.isNotesDirty() || this.isSavingNotes()) return;

    this.isSavingNotes.set(true);
    this.isNotesSaved.set(false);
    try {
      await this.workspaceStore.updateQuickNotes(this.quickNotes());
      this.isNotesDirty.set(false);
      this.isNotesSaved.set(true);
    } finally {
      this.isSavingNotes.set(false);
    }
  }

  private mapToRecentEncounterItem(
    recent: DashboardRecentEncounter,
    asOfDate: string,
  ): RecentEncounterItem {
    const encounter = recent.encounter;
    const date = new Date(encounter.encounterDate);
    const validDate = !Number.isNaN(date.getTime());
    const isToday = recent.encounterLocalDate === asOfDate;
    const encounterDateOnly = displayLocalDate(recent.encounterLocalDate);
    const encounterTimeOnly = validDate
      ? date.toLocaleTimeString('es-AR', {
          timeZone: 'America/Argentina/Buenos_Aires',
          hour: '2-digit',
          minute: '2-digit',
        }) + ' hs'
      : '';
    const encounterDate = encounterTimeOnly
      ? encounterDateOnly + ' • ' + encounterTimeOnly
      : encounterDateOnly;
    const patientName = encounter.patientFullName || 'Paciente #' + encounter.patientId;
    const patientMeta =
      [recent.patientAgeLabel, recent.patientNationalId ? 'DNI ' + recent.patientNationalId : '']
        .filter(Boolean)
        .join(' • ') || 'HC #' + encounter.patientId;
    const consultationTypeLabel = this.getConsultationTypeLabel(encounter.consultationType);
    const clinicalHighlights = this.extractClinicalHighlights(encounter);

    const chiefComplaint =
      encounter.chiefComplaint || clinicalHighlights[0]?.value || 'Consulta clínica';
    const diagnosis =
      encounter.primaryDiagnosisDescription &&
      encounter.primaryDiagnosisDescription !== encounter.chiefComplaint
        ? encounter.primaryDiagnosisDescription
        : clinicalHighlights[1]?.value || encounter.primaryDiagnosisDescription || '—';

    return {
      id: encounter.id,
      patientId: encounter.patientId,
      patientName,
      patientMeta,
      encounterDate,
      encounterDateOnly,
      encounterTimeOnly,
      isToday,
      consultationTypeLabel,
      consultationTypeKey: encounter.consultationType || 'FIRST_VISIT',
      chiefComplaint,
      diagnosis,
      diagnosisCode: encounter.primaryDiagnosisCode,
      clinicalHighlights,
    };
  }

  private extractClinicalHighlights(encounter: ClinicalEncounterList): ClinicalHighlightItem[] {
    const highlights: ClinicalHighlightItem[] = [];
    highlights.push(...wizardRecordEntries(encounter).slice(0, 3));

    if (highlights.length === 0) {
      if (encounter.chiefComplaint) {
        highlights.push({ label: 'Motivo', value: encounter.chiefComplaint });
      }
      if (
        encounter.primaryDiagnosisDescription &&
        encounter.primaryDiagnosisDescription !== encounter.chiefComplaint
      ) {
        const diagVal = encounter.primaryDiagnosisCode
          ? `[${encounter.primaryDiagnosisCode}] ${encounter.primaryDiagnosisDescription}`
          : encounter.primaryDiagnosisDescription;
        highlights.push({ label: 'Diagnóstico', value: diagVal });
      }
      if (encounter.measurements?.weightKg) {
        highlights.push({ label: 'Peso', value: `${encounter.measurements.weightKg} kg` });
      }
      if (
        encounter.vitalSigns?.systolicBloodPressure &&
        encounter.vitalSigns?.diastolicBloodPressure
      ) {
        highlights.push({
          label: 'TA',
          value: `${encounter.vitalSigns.systolicBloodPressure}/${encounter.vitalSigns.diastolicBloodPressure} mmHg`,
        });
      }
    }

    return highlights;
  }

  private getConsultationTypeLabel(type?: string | null): string {
    switch (type) {
      case 'FIRST_VISIT':
        return 'Primera consulta';
      case 'FOLLOW_UP':
        return 'Control / Seguimiento';
      case 'ROUTINE_CHECKUP':
        return 'Chequeo de rutina';
      case 'EMERGENCY':
        return 'Urgencia';
      case 'INTERCONSULTATION':
        return 'Interconsulta';
      default:
        return 'Consulta médica';
    }
  }
}
