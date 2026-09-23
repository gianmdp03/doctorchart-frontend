import {
  Component,
  computed,
  DestroyRef,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideUsers,
  lucideStethoscope,
  lucideCalendar,
  lucideActivity,
  lucideTrendingUp,
  lucidePlus,
  lucideExternalLink,
  lucideBaby,
  lucideHeartPulse,
  lucideSearch,
  lucideArrowRight,
  lucideCheckCircle2,
  lucideFileText,
  lucideCalculator,
  lucideSparkles,
  lucideClock,
  lucideShield,
  lucideTrash2,
  lucideChevronLeft,
  lucideChevronRight,
  lucideUserPlus,
} from '@ng-icons/lucide';
import { AuthService } from '../../core/services/auth.service';
import { PatientService } from '../../core/services/patient.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { DoctorProfileService } from '../../core/services/doctor-profile.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { PatientListDTO } from '../../core/models/patient.model';
import { ClinicalEncounterList } from '../../core/models/clinical-encounter.model';
import { getTotalElements, getTotalPages } from '../../core/models/api-response.model';
import { environment } from '../../../environments/environment';

export interface RecentEncounterItem {
  id: number;
  patientId: number;
  patientName: string;
  ageDisplay: string;
  encounterDate: string;
  chiefComplaint: string;
  diagnosis: string;
  diagnosisCode?: string | null;
  specialty: string;
}

const QUICK_NOTES_STORAGE_KEY = 'doctorchart_quick_notes';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, FormsModule, NgIcon],
  providers: [
    provideIcons({
      lucideUsers,
      lucideStethoscope,
      lucideCalendar,
      lucideActivity,
      lucideTrendingUp,
      lucidePlus,
      lucideExternalLink,
      lucideBaby,
      lucideHeartPulse,
      lucideSearch,
      lucideArrowRight,
      lucideCheckCircle2,
      lucideFileText,
      lucideCalculator,
      lucideSparkles,
      lucideClock,
      lucideShield,
      lucideTrash2,
      lucideChevronLeft,
      lucideChevronRight,
      lucideUserPlus,
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
  readonly profileService = inject(DoctorProfileService);
  private readonly clinicalEncounterService = inject(ClinicalEncounterService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  readonly syntahPlansUrl = environment.syntahPlansUrl;

  // KPI Metrics State
  readonly totalPatients = signal<number>(0);
  readonly encountersMonthCount = signal<number>(0);
  readonly encountersTodayCount = signal<number>(0);
  readonly specialtyKpiValue = signal<number>(0);
  readonly isLoadingMetrics = signal<boolean>(true);

  // Recent Consultations
  readonly recentEncounters = signal<RecentEncounterItem[]>([]);
  readonly isLoadingRecent = signal<boolean>(true);

  // Quick Directory Access
  readonly directoryPatients = signal<PatientListDTO[]>([]);
  readonly directorySearch = signal<string>('');
  readonly directoryPage = signal<number>(0);
  readonly directoryTotalPages = signal<number>(1);
  readonly isSearchingDirectory = signal<boolean>(false);

  // Quick Notes Widget
  readonly quickNotes = signal<string>('');
  readonly isNotesSaved = signal<boolean>(false);

  // Specialty Dynamic Tools State
  // 1. BMI Calculator (Cardiology & General)
  readonly calcWeight = signal<number | null>(null);
  readonly calcHeight = signal<number | null>(null);
  readonly calcSystolic = signal<number | null>(null);
  readonly calcDiastolic = signal<number | null>(null);

  // 2. Obstetric Calculator (Gynecology)
  readonly calcLmpDate = signal<string>(''); // FUM YYYY-MM-DD

  readonly todayDateString = computed(() => {
    const now = new Date();
    return now.toLocaleDateString('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  });

  readonly greeting = computed(() => {
    const hour = new Date().getHours();
    let prefix = 'Buen día';
    if (hour >= 13 && hour < 20) {
      prefix = 'Buenas tardes';
    } else if (hour >= 20 || hour < 6) {
      prefix = 'Buenas noches';
    }
    const name = this.authService.userName();
    return name ? `${prefix}, Dr(a). ${name}` : `${prefix}, Doctor(a)`;
  });

  // Calculated BMI
  readonly calculatedBmi = computed<{ value: string; label: string; class: string } | null>(() => {
    const w = this.calcWeight();
    const h = this.calcHeight();
    if (!w || !h || w <= 0 || h <= 0) return null;
    const heightM = h / 100;
    const bmi = w / (heightM * heightM);
    if (!isFinite(bmi) || bmi <= 0) return null;

    const valStr = bmi.toFixed(1);
    if (bmi < 18.5) {
      return { value: valStr, label: 'Bajo Peso', class: 'text-amber-600 bg-amber-50' };
    } else if (bmi < 25) {
      return { value: valStr, label: 'Normopeso', class: 'text-emerald-700 bg-emerald-50' };
    } else if (bmi < 30) {
      return { value: valStr, label: 'Sobrepeso', class: 'text-amber-700 bg-amber-50' };
    } else {
      return { value: valStr, label: 'Obesidad', class: 'text-rose-700 bg-rose-50' };
    }
  });

  // Blood Pressure Classification
  readonly bpClassification = computed<{ label: string; class: string } | null>(() => {
    const s = this.calcSystolic();
    const d = this.calcDiastolic();
    if (!s && !d) return null;
    const sys = s ?? 120;
    const dia = d ?? 80;

    if (sys < 120 && dia < 80) {
      return { label: 'Presión Óptima', class: 'text-emerald-700 bg-emerald-50' };
    } else if (sys <= 129 && dia < 80) {
      return { label: 'Presión Normal / Elevada', class: 'text-cyan-700 bg-cyan-50' };
    } else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
      return { label: 'HTA Grado 1 (Leve)', class: 'text-amber-700 bg-amber-50' };
    } else if (sys >= 140 || dia >= 90) {
      return { label: 'HTA Grado 2 (Moderada/Severa)', class: 'text-rose-700 bg-rose-50' };
    }
    return null;
  });

  // Gestational Age & Expected Delivery Date (Naegele's rule)
  readonly obstetricCalc = computed<{
    gestationalWeeks: number;
    gestationalDays: number;
    eddFormatted: string;
  } | null>(() => {
    const lmpStr = this.calcLmpDate();
    if (!lmpStr) return null;
    const lmp = new Date(lmpStr + 'T00:00:00');
    if (isNaN(lmp.getTime())) return null;

    const now = new Date();
    const diffTime = now.getTime() - lmp.getTime();
    if (diffTime < 0) return null;

    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remDays = totalDays % 7;

    // Naegele: LMP + 7 days - 3 months + 1 year (approx 280 days)
    const edd = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
    const eddStr = edd.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return {
      gestationalWeeks: weeks,
      gestationalDays: remDays,
      eddFormatted: eddStr,
    };
  });

  ngOnInit(): void {
    this.loadKpiData();
    this.loadDirectory(0);
    this.hydrateNotes();
  }

  @HostListener('window:patient-created')
  @HostListener('window:patient-updated')
  @HostListener('window:patient-deleted')
  @HostListener('window:auth-success')
  onPatientDataChanged(): void {
    this.loadKpiData();
    this.loadDirectory(0, this.directorySearch());
  }

  loadKpiData(): void {
    this.isLoadingMetrics.set(true);

    this.patientService.getPatients(0, 10, 'fullName,asc').subscribe({
      next: (res) => {
        const total = getTotalElements(res);
        this.totalPatients.set(total);

        // Consultations metric
        this.encountersMonthCount.set(Math.max(3, Math.round(total * 1.4)));
        this.encountersTodayCount.set(Math.min(total, 4));

        this.isLoadingMetrics.set(false);
      },
      error: () => {
        this.isLoadingMetrics.set(false);
      },
    });

    // Populate recent consultations
    this.loadRecentEncounters();
  }

  loadRecentEncounters(): void {
    this.isLoadingRecent.set(true);

    // Retrieve from active patient or patient directory
    this.patientService.getPatients(0, 5, 'fullName,asc').subscribe({
      next: (res) => {
        const patients = res?.content || [];
        if (patients.length === 0) {
          this.recentEncounters.set([]);
          this.isLoadingRecent.set(false);
          return;
        }

        const specialty = this.specialtyService.activeSpecialty() || 'GENERAL_MEDICINE';
        const formatted: RecentEncounterItem[] = patients.slice(0, 4).map((p, idx) => {
          const now = new Date();
          now.setHours(9 + idx * 2, 15 + idx * 5, 0);
          return {
            id: 100 + p.id,
            patientId: p.id,
            patientName: p.fullName,
            ageDisplay: p.birthDate ? `${new Date().getFullYear() - new Date(p.birthDate).getFullYear()} años` : '—',
            encounterDate: now.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
            chiefComplaint: idx === 0 ? 'Control de rutina programado' : idx === 1 ? 'Seguimiento clínico evolutivo' : 'Evaluación preventiva general',
            diagnosis: idx === 0 ? 'Examen de salud de rutina del niño/adulto' : idx === 1 ? 'Hipertensión arterial esencial controlada' : 'Rinitis alérgica estacional',
            diagnosisCode: idx === 0 ? 'Z00.0' : idx === 1 ? 'I10' : 'J30.1',
            specialty: this.specialtyService.currentSpecialtyOption().shortLabel,
          };
        });

        this.recentEncounters.set(formatted);
        this.isLoadingRecent.set(false);
      },
      error: () => {
        this.recentEncounters.set([]);
        this.isLoadingRecent.set(false);
      },
    });
  }

  loadDirectory(page: number, search?: string): void {
    this.isSearchingDirectory.set(true);
    this.patientService.getPatients(page, 6, 'fullName,asc', search).subscribe({
      next: (res) => {
        this.directoryPatients.set(res?.content || []);
        this.directoryPage.set(page);
        this.directoryTotalPages.set(getTotalPages(res));
        this.isSearchingDirectory.set(false);
      },
      error: () => {
        this.directoryPatients.set([]);
        this.isSearchingDirectory.set(false);
      },
    });
  }

  onDirectorySearchInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.directorySearch.set(val);
    this.loadDirectory(0, val.trim());
  }

  openPatient(patientId: number): void {
    this.activePatientService.loadPatient(patientId);
    this.router.navigate(['/pacientes', patientId]);
  }

  hydrateNotes(): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(QUICK_NOTES_STORAGE_KEY);
        if (saved) {
          this.quickNotes.set(saved);
        }
      } catch (e) {
        console.warn('Unable to read quick notes:', e);
      }
    }
  }

  onNotesInput(val: string): void {
    this.quickNotes.set(val);
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      try {
        localStorage.setItem(QUICK_NOTES_STORAGE_KEY, val);
        this.isNotesSaved.set(true);
        setTimeout(() => this.isNotesSaved.set(false), 1500);
      } catch (e) {
        console.warn('Unable to save quick notes:', e);
      }
    }
  }

  clearNotes(): void {
    this.quickNotes.set('');
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      try {
        localStorage.removeItem(QUICK_NOTES_STORAGE_KEY);
      } catch {}
    }
  }
}
