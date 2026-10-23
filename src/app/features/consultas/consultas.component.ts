import { formatInstant } from '../../core/date/user-time-zone';
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
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideStethoscope } from '@ng-icons/lucide';
import { takeUntil } from 'rxjs';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { AccountReadScope } from '../../core/services/account-read-scope';
import { getTotalElements, getTotalPages } from '../../core/models/api-response.model';
import { ClinicalEncounterList } from '../../core/models/clinical-encounter.model';

export interface ConsultationExplorerItem {
  id: number;
  patientId: number;
  patientName: string;
  encounterDate: string;
  consultationType: string;
  chiefComplaint: string;
  primaryDiagnosis: string;
  primaryDiagnosisCode?: string | null;
}

@Component({
  selector: 'app-consultas',
  imports: [FormsModule, NgIcon],
  providers: [provideIcons({ lucideSearch, lucideStethoscope })],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.css',
})
export class ConsultasComponent implements OnInit {
  private readonly service = inject(ClinicalEncounterService);
  readonly activePatientService = inject(ActivePatientService);
  readonly specialtyService = inject(DoctorSpecialtyService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly searchQuery = signal('');
  readonly consultations = signal<ConsultationExplorerItem[]>([]);
  readonly isLoading = signal(false);
  readonly isLoadingMore = signal(false);
  readonly loadError = signal<string | null>(null);
  readonly totalElements = signal(0);
  readonly currentPage = signal(0);
  readonly totalPages = signal(0);
  readonly hasMore = computed(() => this.currentPage() + 1 < this.totalPages());
  private readonly reads = new AccountReadScope(() => this.loadConsultations());
  private searchTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.searchTimer) clearTimeout(this.searchTimer);
    });
  }
  ngOnInit(): void {
    this.loadConsultations();
  }
  @HostListener('window:encounter-created')
  @HostListener('window:encounter-updated')
  @HostListener('window:encounter-deleted')
  onEncounterCreated(): void {
    this.loadConsultations();
  }
  @HostListener('window:scroll')
  onScroll(): void {
    if (
      typeof window !== 'undefined' &&
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 350
    )
      this.loadMore();
  }
  onSearch(value: string): void {
    this.searchQuery.set(value);
    this.reads.cancel();
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.loadConsultations(), 400);
  }
  loadConsultations(): void {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
      this.searchTimer = undefined;
    }
    const current = this.reads.begin();
    this.consultations.set([]);
    this.currentPage.set(0);
    this.totalPages.set(0);
    this.totalElements.set(0);
    this.loadError.set(null);
    this.isLoadingMore.set(false);
    if (!this.reads.authenticated()) {
      this.isLoading.set(false);
      return;
    }
    this.isLoading.set(true);
    this.fetch(0, false, current);
  }
  loadMore(): void {
    if (!this.hasMore() || this.isLoading() || this.isLoadingMore() || !this.reads.authenticated())
      return;
    this.isLoadingMore.set(true);
    this.loadError.set(null);
    this.fetch(this.currentPage() + 1, true, this.reads.begin());
  }
  private fetch(page: number, append: boolean, current: () => boolean): void {
    this.service
      .getAll(page, 50, 'encounterDate,desc', this.searchQuery())
      .pipe(takeUntil(this.reads.canceled))
      .subscribe({
        next: (response) => {
          if (!current()) return;
          const items = response.content.map((e) => this.map(e));
          this.consultations.update((existing) =>
            append
              ? [...existing, ...items.filter((item) => !existing.some((e) => e.id === item.id))]
              : items,
          );
          this.currentPage.set(page);
          this.totalPages.set(getTotalPages(response));
          this.totalElements.set(getTotalElements(response));
          this.isLoading.set(false);
          this.isLoadingMore.set(false);
        },
        error: () => {
          if (current()) {
            this.loadError.set('No se pudo cargar el historial de consultas.');
            this.isLoading.set(false);
            this.isLoadingMore.set(false);
          }
        },
      });
  }
  private map(e: ClinicalEncounterList): ConsultationExplorerItem {
    const date = new Date(e.encounterDate);
    const labels: Record<string, string> = {
      FIRST_VISIT: 'Primera consulta',
      FOLLOW_UP: 'Seguimiento',
      ROUTINE_CHECKUP: 'Control de rutina',
      EMERGENCY: 'Urgencia',
      INTERCONSULTATION: 'Interconsulta',
    };
    return {
      id: e.id,
      patientId: e.patientId,
      patientName: e.patientFullName || 'Paciente #' + e.patientId,
      encounterDate: Number.isNaN(date.getTime())
        ? '—'
        : formatInstant(date),
      consultationType: labels[e.consultationType] || e.consultationType,
      chiefComplaint: e.chiefComplaint || '—',
      primaryDiagnosis: e.primaryDiagnosisDescription || '—',
      primaryDiagnosisCode: e.primaryDiagnosisCode,
    };
  }
  openPatientRecord(patientId: number): void {
    this.activePatientService.loadPatient(patientId);
    this.router.navigate(['/pacientes', patientId]);
  }
  openEncounterDetail(id: number): void { void this.router.navigate(['/consultas', id]); }
}
