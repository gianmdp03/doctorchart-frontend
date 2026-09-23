import {
  Component,
  DestroyRef,
  HostListener,
  OnInit,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronLeft,
  lucidePlus,
  lucideUser,
  lucideUsers,
  lucideBaby,
  lucideTrendingUp,
  lucidePrinter,
  lucideCheckCircle2,
  lucideAlertCircle,
  lucideClock,
  lucidePill,
  lucideFileText,
  lucideTrash2,
  lucideActivity,
  lucideHeartPulse,
  lucideSparkles,
  lucideStethoscope,
} from '@ng-icons/lucide';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { AuthService } from '../../core/services/auth.service';
import { CheckupService } from '../../core/services/checkup.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { MedicalCheckupDetailDTO } from '../../core/models/checkup.model';
import { ClinicalEncounterList } from '../../core/models/clinical-encounter.model';
import { MedicalSpecialty, SPECIALTY_OPTIONS, SpecialtyOption } from '../../core/models/specialty.model';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { PatientBannerComponent } from './patient-banner/patient-banner.component';
import { ClinicalTimelineComponent } from './clinical-timeline/clinical-timeline.component';
import { GrowthCurvesComponent } from '../growth-curves/growth-curves.component';
import { MilestonesComponent } from '../milestones/milestones.component';

export type PatientRecordTab = 'resumen' | 'historia' | 'herramientas' | 'curvas' | 'hitos' | 'recetas';

export interface RecordTabItem {
  id: PatientRecordTab;
  label: string;
  badge?: number | string;
}

export interface CheckupTableRow {
  code: string;
  date: string;
  age: string;
  reason: string;
  weight: string;
  height: string;
  headCircumference: string;
  percentile: string;
  percentilBadge: boolean;
  observations: string;
  isLatest: boolean;
}

export interface VaccineScheduleItem {
  age: string;
  name: string;
  date: string;
  lot: string;
  status: string;
  pending: boolean;
}

export interface ComplicationChip {
  name: string;
  active: boolean;
}

@Component({
  selector: 'app-patient-record',
  imports: [
    FormsModule,
    NgIcon,
    PatientBannerComponent,
    ClinicalTimelineComponent,
    GrowthCurvesComponent,
    MilestonesComponent,
  ],
  providers: [
    provideIcons({
      lucideChevronLeft,
      lucidePlus,
      lucideUser,
      lucideUsers,
      lucideBaby,
      lucideTrendingUp,
      lucidePrinter,
      lucideCheckCircle2,
      lucideAlertCircle,
      lucideClock,
      lucidePill,
      lucideFileText,
      lucideTrash2,
      lucideActivity,
      lucideHeartPulse,
      lucideSparkles,
      lucideStethoscope,
    }),
  ],
  templateUrl: './patient-record.component.html',
  styleUrl: './patient-record.component.css',
})
export class PatientRecordComponent implements OnInit {
  readonly authService = inject(AuthService);
  readonly activePatientService = inject(ActivePatientService);
  readonly doctorSpecialtyService = inject(DoctorSpecialtyService);
  private readonly checkupService = inject(CheckupService);
  private readonly clinicalEncounterService = inject(ClinicalEncounterService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  // Flattened 4-Tab Hierarchy
  readonly selectedTab = signal<PatientRecordTab>('resumen');
  readonly isMoreMenuOpen = signal<boolean>(false);

  readonly isChild = computed(() => {
    return this.activePatientService.ageInYears() < 16;
  });

  readonly tabs = computed<RecordTabItem[]>(() => {
    if (this.doctorSpecialtyService.isPediatricMode() || this.isChild()) {
      return [
        { id: 'resumen', label: '1. Resumen & Antecedentes' },
        { id: 'historia', label: '2. Historia Clínica (SOAP)', badge: this.filteredEncounters().length },
        { id: 'curvas', label: '3. Curvas OMS' },
        { id: 'hitos', label: '4. Hitos (0-15 años)' },
        { id: 'herramientas', label: '5. Herramientas' },
        { id: 'recetas', label: '6. Recetas y Estudios' },
      ];
    }
    return [
      { id: 'resumen', label: '1. Resumen & Antecedentes' },
      { id: 'historia', label: '2. Historia Clínica (SOAP)', badge: this.filteredEncounters().length },
      { id: 'herramientas', label: '3. Herramientas de Especialidad' },
      { id: 'recetas', label: '4. Recetas y Estudios' },
    ];
  });

  readonly checkups = signal<MedicalCheckupDetailDTO[]>([]);
  readonly isLoadingCheckups = signal<boolean>(false);

  // Universal SOAP Encounters state
  readonly encounters = signal<ClinicalEncounterList[]>([]);
  readonly isLoadingEncounters = signal<boolean>(false);
  readonly selectedSpecialtyFilter = signal<MedicalSpecialty | 'ALL'>('ALL');
  readonly isMigrating = signal<boolean>(false);
  readonly migrationMessage = signal<string | null>(null);
  readonly isPediatricToolsExpanded = signal<boolean>(true);

  readonly specialtyOptions = SPECIALTY_OPTIONS;

  readonly filteredEncounters = computed<ClinicalEncounterList[]>(() => {
    const list = this.encounters();
    const filter = this.selectedSpecialtyFilter();
    if (filter === 'ALL') {
      return list;
    }
    return list.filter((enc) => enc.specialty === filter);
  });

  constructor() {
    effect(() => {
      const patient = this.activePatientService.activePatient();
      untracked(() => {
        if (patient?.id) {
          this.loadCheckups(patient.id);
          this.loadEncounters(patient.id);
        } else {
          this.checkups.set([]);
          this.encounters.set([]);
        }
      });
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        const id = Number(idParam);
        if (!isNaN(id) && id > 0) {
          this.activePatientService.loadPatient(id);
        }
      }
    });

    this.route.queryParamMap.subscribe((queryParams) => {
      const tabParam = queryParams.get('tab') as PatientRecordTab | null;
      if (tabParam && ['resumen', 'historia', 'herramientas', 'curvas', 'hitos', 'recetas'].includes(tabParam)) {
        this.selectedTab.set(tabParam);
      }
    });

    const patient = this.activePatientService.activePatient();
    if (patient?.id) {
      this.loadCheckups(patient.id);
      this.loadEncounters(patient.id);
    }
  }

  @HostListener('window:checkup-created')
  onCheckupCreated(): void {
    if (isPlatformBrowser(this.platformId)) {
      const patient = this.activePatientService.activePatient();
      if (patient?.id) {
        this.activePatientService.loadPatient(patient.id);
        this.loadCheckups(patient.id);
        this.loadEncounters(patient.id);
      }
    }
  }

  @HostListener('window:encounter-created')
  onEncounterCreated(): void {
    if (isPlatformBrowser(this.platformId)) {
      const patient = this.activePatientService.activePatient();
      if (patient?.id) {
        this.loadEncounters(patient.id);
        this.loadCheckups(patient.id);
      }
    }
  }

  loadCheckups(patientId: number): void {
    this.isLoadingCheckups.set(true);
    this.checkupService.getCheckupsByPatientId(patientId).subscribe({
      next: (data) => {
        this.checkups.set(data || []);
        this.isLoadingCheckups.set(false);
      },
      error: () => {
        this.checkups.set([]);
        this.isLoadingCheckups.set(false);
      },
    });
  }

  loadEncounters(patientId: number): void {
    this.isLoadingEncounters.set(true);
    this.clinicalEncounterService.getByPatient(patientId).subscribe({
      next: (data) => {
        this.encounters.set(data || []);
        this.isLoadingEncounters.set(false);
      },
      error: () => {
        this.encounters.set([]);
        this.isLoadingEncounters.set(false);
      },
    });
  }

  setTab(tab: PatientRecordTab): void {
    this.selectedTab.set(tab);
  }

  toggleMoreMenu(event?: Event): void {
    if (event) event.stopPropagation();
    this.isMoreMenuOpen.update((v) => !v);
  }

  @HostListener('document:click')
  closeMoreMenu(): void {
    this.isMoreMenuOpen.set(false);
  }

  navigateToPatients(): void {
    this.router.navigate(['/pacientes']);
  }

  openNewPatientModal(event?: Event): void {
    if (event) event.stopPropagation();
    this.isMoreMenuOpen.set(false);
  }

  openNewCheckupModal(event?: Event): void {
    if (event) event.stopPropagation();
    this.isMoreMenuOpen.set(false);
  }

  openNewEncounterModal(specialty?: MedicalSpecialty, event?: Event): void {
    if (event) event.stopPropagation();
    this.isMoreMenuOpen.set(false);
  }

  openEncounterDetail(encounterId: number): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-encounter-detail-modal', {
          detail: { encounterId },
        })
      );
    }
  }

  deleteEncounter(encounterId: number, event?: Event): void {
    if (event) event.stopPropagation();
    const confirmed = window.confirm('¿Está seguro de que desea eliminar esta consulta clínica?');
    if (!confirmed) return;

    const patientId = this.activePatientService.patientId();
    this.clinicalEncounterService.delete(encounterId).subscribe({
      next: () => {
        if (patientId) {
          this.loadEncounters(patientId);
        }
      },
      error: (err) => {
        alert(err?.error?.message || 'Error al eliminar la consulta clínica.');
      },
    });
  }

  migratePediatricCheckups(): void {
    this.isMigrating.set(true);
    this.migrationMessage.set(null);
    this.clinicalEncounterService.migratePediatricCheckups().subscribe({
      next: (res) => {
        this.isMigrating.set(false);
        this.migrationMessage.set(
          `Migración completada con éxito: ${res.migratedNow} controles pediátricos convertidos a consultas SOAP (${res.alreadyMigrated} ya estaban sincronizados).`
        );
        const patientId = this.activePatientService.patientId();
        if (patientId) {
          this.loadEncounters(patientId);
        }
      },
      error: (err) => {
        this.isMigrating.set(false);
        this.migrationMessage.set(
          err?.error?.message || 'Error al ejecutar la migración pediátrica a SOAP.'
        );
      },
    });
  }

  printRecord(): void {
    this.isMoreMenuOpen.set(false);
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      const latestEnc = this.encounters()[0];
      window.dispatchEvent(
        new CustomEvent('open-prescription-print-modal', {
          detail: {
            id: latestEnc?.id,
            type: 'PRESCRIPTION',
            encounterDate: latestEnc?.encounterDate || new Date().toISOString(),
            primaryDiagnosisCode: latestEnc?.primaryDiagnosisCode,
            primaryDiagnosisDescription: latestEnc?.primaryDiagnosisDescription,
            prescriptions: latestEnc?.prescriptions || [],
            diagnosticOrders: [],
            followUpInstructions: latestEnc?.followUpInstructions,
          },
        })
      );
    }
  }

  onPrintPrescription(enc: ClinicalEncounterList): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-prescription-print-modal', {
          detail: {
            id: enc.id,
            type: 'PRESCRIPTION',
            encounterDate: enc.encounterDate,
            primaryDiagnosisCode: enc.primaryDiagnosisCode,
            primaryDiagnosisDescription: enc.primaryDiagnosisDescription,
            prescriptions: enc.prescriptions || [],
            diagnosticOrders: [],
            followUpInstructions: enc.followUpInstructions,
          },
        })
      );
    }
  }

  togglePediatricTools(): void {
    this.isPediatricToolsExpanded.update((v) => !v);
  }

  navigateToGrowthCurves(): void {
    this.setTab('curvas');
  }

  navigateToMilestones(): void {
    this.setTab('hitos');
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

  getSpecialtyLabel(specialty: MedicalSpecialty): string {
    const found = this.specialtyOptions.find((opt) => opt.value === specialty);
    return found ? found.label : specialty;
  }

  getConsultationTypeLabel(type: string): string {
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
        return type;
    }
  }

  // --- Computeds for Patient Banner and General Data ---
  readonly patientNationalId = computed(() => {
    const p = this.activePatientService.activePatient();
    return p?.nationalId || p?.guardianInfo?.firstGuardianNationalId || '—';
  });

  readonly biologicalSex = computed(() => {
    const p = this.activePatientService.activePatient();
    if (p?.gender === 'FEMALE') return 'Femenino';
    if (p?.gender === 'MALE') return 'Masculino';
    if (p?.gender === 'OTHER') return 'Otro';
    return 'No especificado';
  });

  readonly bloodType = computed(() => {
    return this.activePatientService.activePatient()?.bloodType || 'Sin registrar';
  });

  readonly patientPhone = computed(() => {
    const p = this.activePatientService.activePatient();
    return p?.phone || p?.guardianInfo?.firstGuardianPhone || '—';
  });

  readonly patientEmail = computed(() => {
    const p = this.activePatientService.activePatient();
    return p?.email || '—';
  });

  readonly patientAddress = computed(() => {
    const p = this.activePatientService.activePatient();
    return p?.address || '—';
  });

  // Guardians
  readonly guardian1Name = computed(() => this.activePatientService.activePatient()?.guardianInfo?.firstGuardianFullName || '—');
  readonly guardian1Phone = computed(() => this.activePatientService.activePatient()?.guardianInfo?.firstGuardianPhone || '—');
  readonly guardian1Dni = computed(() => this.activePatientService.activePatient()?.guardianInfo?.firstGuardianNationalId || '—');
  readonly guardian2Name = computed(() => this.activePatientService.activePatient()?.guardianInfo?.secondGuardianFullName || '—');
  readonly guardian2Phone = computed(() => this.activePatientService.activePatient()?.guardianInfo?.secondGuardianPhone || '—');
  readonly guardian2Dni = computed(() => this.activePatientService.activePatient()?.guardianInfo?.secondGuardianNationalId || '—');

  // Emergency Contact
  readonly emergencyContactInfo = computed(() => {
    const p = this.activePatientService.activePatient();
    if (!p) return null;
    return p.emergencyContact || null;
  });

  // Gynecology Computeds
  readonly fumDisplay = computed(() => {
    const extra = this.activePatientService.activePatient()?.patientExtraData;
    return extra?.['fum'] || extra?.['lastMenstrualPeriod'] || 'Sin registrar';
  });

  readonly menstrualCycleDisplay = computed(() => {
    const extra = this.activePatientService.activePatient()?.patientExtraData;
    return extra?.['menstrualCycle'] || 'Sin registrar';
  });

  readonly obstetricFormulaDisplay = computed(() => {
    const extra = this.activePatientService.activePatient()?.patientExtraData;
    return extra?.['obstetricFormula'] || 'G0 P0 C0 A0';
  });

  readonly contraceptionDisplay = computed(() => {
    const extra = this.activePatientService.activePatient()?.patientExtraData;
    return extra?.['contraception'] || 'Sin método registrado';
  });

  readonly papDisplay = computed(() => {
    const extra = this.activePatientService.activePatient()?.patientExtraData;
    return extra?.['lastPapDate'] || 'Sin registrar';
  });

  readonly mammographyDisplay = computed(() => {
    const extra = this.activePatientService.activePatient()?.patientExtraData;
    return extra?.['lastMammographyDate'] || 'Sin registrar';
  });

  // Cardiology Computeds
  readonly smokingDisplay = computed(() => {
    const extra = this.activePatientService.activePatient()?.patientExtraData;
    return extra?.['smokingStatus'] || 'No fumador';
  });

  readonly physicalActivityDisplay = computed(() => {
    const extra = this.activePatientService.activePatient()?.patientExtraData;
    return extra?.['physicalActivity'] || 'Sedentario';
  });

  readonly bloodPressureBaselineDisplay = computed(() => {
    const extra = this.activePatientService.activePatient()?.patientExtraData;
    return extra?.['bloodPressureBaseline'] || '120/80 mmHg';
  });

  readonly cardioRiskScoreDisplay = computed(() => {
    const extra = this.activePatientService.activePatient()?.patientExtraData;
    return extra?.['cardioRiskScore'] || 'Bajo (< 5%)';
  });

  readonly cardiovascularConditionsDisplay = computed(() => {
    const extra = this.activePatientService.activePatient()?.patientExtraData;
    return extra?.['cardiovascularConditions'] || 'Sin comorbilidades cardiovasculares';
  });

  // History Computeds
  readonly hasPersonalHistory = computed(() => {
    const p = this.activePatientService.activePatient();
    const ph = p?.personalHistory;
    return !!(
      (ph?.chronicOrPreviousDiseases && ph.chronicOrPreviousDiseases.length > 0) ||
      (ph?.hospitalizationsOrSurgeries && ph.hospitalizationsOrSurgeries.length > 0) ||
      (ph?.allergies && ph.allergies.length > 0) ||
      (p?.allergies && p.allergies.length > 0) ||
      (p?.chronicConditions && p.chronicConditions.length > 0) ||
      (ph?.habitualMedication && ph.habitualMedication.length > 0)
    );
  });

  readonly hasFamilyHistory = computed(() => {
    const fh = this.activePatientService.activePatient()?.familyHistory;
    return !!(
      (fh?.familyChronicDiseases && fh.familyChronicDiseases.length > 0) ||
      (fh?.familyAllergies && fh.familyAllergies.length > 0) ||
      (fh?.geneticDiseases && fh.geneticDiseases.length > 0)
    );
  });

  readonly chronicOrPreviousDiseases = computed(() => {
    const p = this.activePatientService.activePatient();
    const list = [
      ...(p?.chronicConditions || []),
      ...(p?.personalHistory?.chronicOrPreviousDiseases || []),
    ];
    return Array.from(new Set(list)).join(', ');
  });

  readonly hospitalizationsOrSurgeries = computed(() => {
    return this.activePatientService.activePatient()?.personalHistory?.hospitalizationsOrSurgeries?.join(', ') || '';
  });

  readonly allergies = computed(() => {
    const p = this.activePatientService.activePatient();
    const arr = [
      ...(p?.allergies || []),
      ...(p?.personalHistory?.allergies || []),
    ];
    return Array.from(new Set(arr)).join(', ');
  });

  readonly hasAllergies = computed(() => {
    return !!this.allergies() && this.allergies().trim().length > 0;
  });

  readonly habitualMedication = computed(() => {
    return this.activePatientService.activePatient()?.personalHistory?.habitualMedication || [];
  });

  readonly birthWeightDisplay = computed(() => {
    const w = this.activePatientService.activePatient()?.personalHistory?.birthMeasurements?.weight;
    return w != null && !isNaN(Number(w)) && Number(w) > 0 ? `${Number(w).toFixed(3)} kg` : '—';
  });

  readonly birthHeightDisplay = computed(() => {
    const h = this.activePatientService.activePatient()?.personalHistory?.birthMeasurements?.height;
    return h != null && !isNaN(Number(h)) && Number(h) > 0 ? `${Number(h).toFixed(1)} cm` : '—';
  });

  readonly birthHeadCircDisplay = computed(() => {
    const hc = this.activePatientService.activePatient()?.personalHistory?.birthMeasurements?.headCircumference;
    return hc != null && !isNaN(Number(hc)) && Number(hc) > 0 ? `${Number(hc).toFixed(1)} cm` : '—';
  });

  readonly familyChronicDiseases = computed(() => {
    return this.activePatientService.activePatient()?.familyHistory?.familyChronicDiseases || [];
  });

  readonly familyAllergies = computed(() => {
    return this.activePatientService.activePatient()?.familyHistory?.familyAllergies?.join(', ') || '';
  });

  readonly geneticDiseases = computed(() => {
    return this.activePatientService.activePatient()?.familyHistory?.geneticDiseases?.join(', ') || '';
  });

  readonly feedingDietCustom = computed(() => {
    return this.activePatientService.activePatient()?.immunizationAndNutrition?.feedingDiet || null;
  });

  readonly developmentalMilestones = computed(() => {
    return this.activePatientService.activePatient()?.immunizationAndNutrition?.developmentalMilestones || '';
  });

  // Table Data for Checkups
  readonly checkupTableData = computed<CheckupTableRow[]>(() => {
    const list = this.checkups();
    if (!list || list.length === 0) return [];

    const sorted = [...list].sort(
      (a, b) => new Date(b.checkupDate).getTime() - new Date(a.checkupDate).getTime()
    );

    return sorted.map((c, idx) => ({
      code: `CP-${c.id}`,
      date: c.checkupDate?.split('T')?.[0] || c.checkupDate,
      age: this.activePatientService.ageDisplay(),
      reason: c.reason === 'ROUTINE' ? 'Control de Crecimiento' : String(c.reason),
      weight: c.measurements?.weight != null ? `${c.measurements.weight} kg` : '—',
      height: c.measurements?.height != null ? `${c.measurements.height} cm` : '—',
      headCircumference: c.measurements?.headCircumference != null ? `${c.measurements.headCircumference} cm` : '—',
      percentile: 'En rango',
      percentilBadge: true,
      observations: 'Control somatométrico clínico registrado.',
      isLatest: idx === 0,
    }));
  });

  readonly totalWeightGain = computed(() => {
    const latest = this.activePatientService.latestMeasurements()?.weight;
    const birth = this.activePatientService.activePatient()?.personalHistory?.birthMeasurements?.weight;
    if (latest && birth) {
      const diff = Number(latest) - Number(birth);
      return `${diff >= 0 ? '+' : ''}${diff.toFixed(3)} kg`;
    }
    return '--';
  });

  readonly totalHeightGain = computed(() => {
    const latest = this.activePatientService.latestMeasurements()?.height;
    const birth = this.activePatientService.activePatient()?.personalHistory?.birthMeasurements?.height;
    if (latest && birth) {
      const diff = Number(latest) - Number(birth);
      return `${diff >= 0 ? '+' : ''}${diff.toFixed(1)} cm`;
    }
    return '--';
  });

  readonly totalHeadCircGain = computed(() => {
    const latest = this.activePatientService.latestMeasurements()?.headCircumference;
    const birth = this.activePatientService.activePatient()?.personalHistory?.birthMeasurements?.headCircumference;
    if (latest && birth) {
      const diff = Number(latest) - Number(birth);
      return `${diff >= 0 ? '+' : ''}${diff.toFixed(1)} cm`;
    }
    return '--';
  });
}
