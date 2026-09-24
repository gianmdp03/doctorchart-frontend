import { Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideCheckCircle2,
  lucideChevronLeft,
  lucideChevronRight,
  lucideClock,
  lucideFileText,
  lucideSearch,
  lucideShield,
  lucideSparkles,
  lucideStethoscope,
  lucideUserPlus,
  lucideUsers,
} from '@ng-icons/lucide';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { PatientService } from '../../core/services/patient.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { PatientListDTO } from '../../core/models/patient.model';
import { getTotalElements, getTotalPages } from '../../core/models/api-response.model';

export interface RecentEncounterItem {
  id: number;
  patientId: number;
  patientName: string;
  encounterDate: string;
  chiefComplaint: string;
  diagnosis: string;
  diagnosisCode?: string | null;
}

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, RouterLink, NgIcon],
  providers: [
    provideIcons({
      lucideArrowRight,
      lucideCheckCircle2,
      lucideChevronLeft,
      lucideChevronRight,
      lucideClock,
      lucideFileText,
      lucideSearch,
      lucideShield,
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
  readonly specialtyService = inject(DoctorSpecialtyService);
  private readonly clinicalEncounterService = inject(ClinicalEncounterService);
  private readonly workspaceStore = inject(WorkspaceStore);
  private readonly router = inject(Router);

  readonly totalPatients = signal<number>(0);
  readonly encountersMonthCount = signal<number>(0);
  readonly encountersTodayCount = signal<number>(0);
  readonly isLoadingMetrics = signal<boolean>(true);

  readonly recentEncounters = signal<RecentEncounterItem[]>([]);
  readonly isLoadingRecent = signal<boolean>(true);

  readonly directoryPatients = signal<PatientListDTO[]>([]);
  readonly directorySearch = signal<string>('');
  readonly directoryPage = signal<number>(0);
  readonly directoryTotalPages = signal<number>(1);
  readonly isSearchingDirectory = signal<boolean>(false);

  readonly quickNotes = signal<string>('');
  readonly isNotesDirty = signal<boolean>(false);
  readonly isSavingNotes = signal<boolean>(false);
  readonly isNotesSaved = signal<boolean>(false);

  readonly todayDateString = computed(() => new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }));

  readonly greeting = computed(() => {
    const hour = new Date().getHours();
    const prefix = hour >= 20 || hour < 6
      ? 'Buenas noches'
      : hour >= 13
        ? 'Buenas tardes'
        : 'Buen día';
    const name = this.authService.userName();
    return name ? `${prefix}, Dr(a). ${name}` : `${prefix}, Doctor(a)`;
  });

  ngOnInit(): void {
    this.loadKpiData();
    this.loadDirectory(0);
    this.hydrateNotes();
  }

  @HostListener('window:patient-created')
  @HostListener('window:patient-updated')
  @HostListener('window:patient-deleted')
  @HostListener('window:encounter-created')
  @HostListener('window:auth-success')
  onClinicalDataChanged(): void {
    this.loadKpiData();
    this.loadDirectory(0, this.directorySearch());
  }

  loadKpiData(): void {
    this.isLoadingMetrics.set(true);
    this.isLoadingRecent.set(true);
    forkJoin({
      patients: this.patientService.getPatients(0, 1),
      activity: this.clinicalEncounterService.getDashboard(),
    }).subscribe({
      next: ({ patients, activity }) => {
        this.totalPatients.set(getTotalElements(patients));
        this.encountersMonthCount.set(activity.encountersThisMonth);
        this.encountersTodayCount.set(activity.encountersToday);
        this.recentEncounters.set(activity.recentEncounters.map((encounter) => ({
          id: encounter.id,
          patientId: encounter.patientId,
          patientName: encounter.patientFullName || 'Paciente sin nombre',
          encounterDate: this.formatEncounterDate(encounter.encounterDate),
          chiefComplaint: encounter.chiefComplaint || '—',
          diagnosis: encounter.primaryDiagnosisDescription || '—',
          diagnosisCode: encounter.primaryDiagnosisCode,
        })));
        this.isLoadingMetrics.set(false);
        this.isLoadingRecent.set(false);
      },
      error: () => {
        this.isLoadingMetrics.set(false);
        this.isLoadingRecent.set(false);
        this.recentEncounters.set([]);
      },
    });
  }

  loadDirectory(page: number, search?: string): void {
    this.isSearchingDirectory.set(true);
    this.patientService.getPatients(page, 6, 'fullName,asc', search).subscribe({
      next: (response) => {
        this.directoryPatients.set(response?.content || []);
        this.directoryPage.set(page);
        this.directoryTotalPages.set(getTotalPages(response));
        this.isSearchingDirectory.set(false);
      },
      error: () => {
        this.directoryPatients.set([]);
        this.isSearchingDirectory.set(false);
      },
    });
  }

  onDirectorySearchInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.directorySearch.set(query);
    this.loadDirectory(0, query.trim());
  }

  openPatient(patientId: number): void {
    this.activePatientService.loadPatient(patientId);
    this.router.navigate(['/pacientes', patientId]);
  }

  hydrateNotes(): void {
    this.quickNotes.set(this.workspaceStore.currentSetup()?.quickNotes || '');
    this.isNotesDirty.set(false);
  }

  onNotesInput(content: string): void {
    this.quickNotes.set(content);
    this.isNotesDirty.set(content !== (this.workspaceStore.currentSetup()?.quickNotes || ''));
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

  private formatEncounterDate(value: string): string {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? '—'
      : date.toLocaleString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  }
}
