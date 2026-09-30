import { Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
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
  lucideShield,
  lucideSparkles,
  lucideStethoscope,
  lucideUserPlus,
  lucideUsers,
} from '@ng-icons/lucide';
import { catchError, forkJoin, of, switchMap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { PatientService } from '../../core/services/patient.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { PatientListDTO } from '../../core/models/patient.model';
import { ClinicalEncounterList } from '../../core/models/clinical-encounter.model';
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

  readonly todayDateString = computed(() =>
    new Date().toLocaleDateString('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  );

  readonly greeting = computed(() => {
    const hour = new Date().getHours();
    const prefix =
      hour >= 20 || hour < 6
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

    const patients$ = this.patientService.getPatients(0, 50, 'id,desc').pipe(
      catchError(() => of(null))
    );
    const dashboard$ = this.clinicalEncounterService.getDashboard().pipe(
      catchError(() => of(null))
    );
    const allEncounters$ =
      typeof this.clinicalEncounterService.getAll === 'function'
        ? this.clinicalEncounterService.getAll(0, 100, 'encounterDate,desc').pipe(
            catchError(() => of(null))
          )
        : of(null);

    forkJoin({
      patients: patients$,
      activity: dashboard$,
      allEncounters: allEncounters$,
    })
      .pipe(
        switchMap(({ patients, activity, allEncounters }) => {
          const patientList = patients?.content ?? [];
          const recentPatients = patientList.slice(0, 15);
          if (
            typeof this.clinicalEncounterService.getByPatient !== 'function' ||
            recentPatients.length === 0
          ) {
            return of({
              patients,
              activity,
              allEncounters,
              perPatientEncounters: [] as ClinicalEncounterList[],
            });
          }

          const perPatientCalls = recentPatients.map((p) =>
            this.clinicalEncounterService.getByPatient(p.id).pipe(
              catchError(() => of([] as ClinicalEncounterList[]))
            )
          );

          return forkJoin(perPatientCalls).pipe(
            switchMap((lists) => {
              const flattened: ClinicalEncounterList[] = [];
              lists.forEach((list, idx) => {
                const owner = recentPatients[idx];
                for (const item of list || []) {
                  flattened.push({
                    ...item,
                    patientId: item.patientId ?? owner.id,
                    patientFullName: item.patientFullName || owner.fullName,
                  });
                }
              });
              return of({
                patients,
                activity,
                allEncounters,
                perPatientEncounters: flattened,
              });
            })
          );
        })
      )
      .subscribe({
        next: ({ patients, activity, allEncounters, perPatientEncounters }) => {
          this.totalPatients.set(patients ? getTotalElements(patients) : 0);

          const patientMap = new Map<number, PatientListDTO>();
          for (const p of patients?.content ?? []) {
            patientMap.set(p.id, p);
          }

          const encounterMap = new Map<number, ClinicalEncounterList>();
          const mergeList = (items?: ClinicalEncounterList[] | null) => {
            for (const item of items ?? []) {
              if (!item || item.id == null) continue;
              const existing = encounterMap.get(item.id);
              encounterMap.set(item.id, {
                ...existing,
                ...item,
                patientFullName:
                  item.patientFullName ||
                  existing?.patientFullName ||
                  patientMap.get(item.patientId)?.fullName ||
                  null,
                dynamicData: item.dynamicData ?? existing?.dynamicData ?? null,
                snapshotFieldLabels:
                  item.snapshotFieldLabels ?? existing?.snapshotFieldLabels ?? null,
              });
            }
          };

          mergeList(activity?.recentEncounters);
          mergeList(allEncounters?.content);
          mergeList(perPatientEncounters);

          const mergedEncounters = Array.from(encounterMap.values()).sort((a, b) => {
            const timeA = new Date(a.encounterDate).getTime() || 0;
            const timeB = new Date(b.encounterDate).getTime() || 0;
            if (timeB !== timeA) return timeB - timeA;
            return (b.id || 0) - (a.id || 0);
          });

          const now = new Date();
          let localTodayCount = 0;
          let localMonthCount = 0;

          for (const enc of mergedEncounters) {
            const d = new Date(enc.encounterDate);
            if (!Number.isNaN(d.getTime())) {
              if (this.isSameLocalMonth(d, now)) {
                localMonthCount++;
              }
              if (this.isSameLocalDay(d, now)) {
                localTodayCount++;
              }
            }
          }

          this.encountersMonthCount.set(
            Math.max(localMonthCount, activity?.encountersThisMonth ?? 0)
          );
          this.encountersTodayCount.set(
            Math.max(localTodayCount, activity?.encountersToday ?? 0)
          );

          this.recentEncounters.set(
            mergedEncounters.slice(0, 8).map((encounter) =>
              this.mapToRecentEncounterItem(encounter, patientMap.get(encounter.patientId), now)
            )
          );

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

  openEncounterDetail(encounterId: number, event?: Event): void {
    if (event) event.stopPropagation();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-encounter-detail-modal', { detail: { encounterId } })
      );
    }
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

  private mapToRecentEncounterItem(
    encounter: ClinicalEncounterList,
    patient: PatientListDTO | undefined,
    now: Date
  ): RecentEncounterItem {
    const date = new Date(encounter.encounterDate);
    const validDate = !Number.isNaN(date.getTime());
    const isToday = validDate && this.isSameLocalDay(date, now);

    const encounterDateOnly = validDate
      ? date.toLocaleDateString('es-AR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : '—';

    const hasTimeComponent =
      validDate &&
      encounter.encounterDate.includes('T') &&
      (date.getHours() !== 0 || date.getMinutes() !== 0 || encounter.encounterDate.length > 10);

    const encounterTimeOnly = hasTimeComponent
      ? date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) + ' hs'
      : '';

    const encounterDate = encounterTimeOnly
      ? `${encounterDateOnly} • ${encounterTimeOnly}`
      : encounterDateOnly;

    const patientName =
      encounter.patientFullName || patient?.fullName || `Paciente #${encounter.patientId}`;
    const patientMeta = this.buildPatientMeta(patient, encounter.patientId);
    const consultationTypeLabel = this.getConsultationTypeLabel(encounter.consultationType);
    const clinicalHighlights = this.extractClinicalHighlights(encounter);

    const chiefComplaint =
      encounter.chiefComplaint ||
      clinicalHighlights[0]?.value ||
      'Consulta clínica';
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

  private buildPatientMeta(patient: PatientListDTO | undefined, patientId: number): string {
    const parts: string[] = [];
    if (patient?.birthDate) {
      const ageStr = this.calculateAgeDisplay(patient.birthDate);
      if (ageStr) parts.push(ageStr);
    }
    if (patient?.nationalId) {
      parts.push(`DNI ${patient.nationalId}`);
    }
    if (parts.length === 0) {
      return `HC #${patientId}`;
    }
    return parts.join(' • ');
  }

  private calculateAgeDisplay(birthDateStr: string): string {
    const birth = new Date(birthDateStr);
    if (Number.isNaN(birth.getTime())) return '';
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    if (now.getDate() < birth.getDate()) {
      months--;
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    if (years < 0) return '';
    if (years === 0) {
      return months <= 1 ? `${Math.max(months, 1)} mes` : `${months} meses`;
    }
    if (years < 3 && months > 0) {
      return `${years} ${years === 1 ? 'año' : 'años'}, ${months} m`;
    }
    return `${years} ${years === 1 ? 'año' : 'años'}`;
  }

  private extractClinicalHighlights(encounter: ClinicalEncounterList): ClinicalHighlightItem[] {
    const highlights: ClinicalHighlightItem[] = [];
    const dynamic = encounter.dynamicData ?? {};
    const labels = encounter.snapshotFieldLabels ?? {};

    for (const [key, rawVal] of Object.entries(dynamic)) {
      if (rawVal === null || rawVal === undefined || String(rawVal).trim() === '') continue;
      const label = labels[key] || this.formatFieldKey(key);
      const value =
        typeof rawVal === 'boolean'
          ? rawVal
            ? 'Sí'
            : 'No'
          : Array.isArray(rawVal)
            ? rawVal.join(', ')
            : String(rawVal).trim();
      highlights.push({ label, value });
      if (highlights.length >= 3) break;
    }

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
      if (encounter.vitalSigns?.weightKg) {
        highlights.push({ label: 'Peso', value: `${encounter.vitalSigns.weightKg} kg` });
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

  private formatFieldKey(key: string): string {
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (c) => c.toUpperCase())
      .trim();
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

  private isSameLocalDay(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  private isSameLocalMonth(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
  }
}

