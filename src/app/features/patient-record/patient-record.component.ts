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
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { CheckupService } from '../../core/services/checkup.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { MedicalCheckupDetailDTO } from '../../core/models/checkup.model';
import { ClinicalEncounterList } from '../../core/models/clinical-encounter.model';
import { MedicalSpecialty } from '../../core/models/specialty.model';
import { SPECIALTY_OPTIONS, SpecialtyOption } from '../encounter-dialog/new-encounter-dialog.component';

export type SubtabType = 'general' | 'perinatal' | 'personal' | 'nutrition' | 'history';

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
  standalone: true,
  imports: [FormsModule],
  templateUrl: './patient-record.component.html',
  styleUrl: './patient-record.component.css',
})
export class PatientRecordComponent implements OnInit {
  readonly activePatientService = inject(ActivePatientService);
  private readonly checkupService = inject(CheckupService);
  private readonly clinicalEncounterService = inject(ClinicalEncounterService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly selectedSubtab = signal<SubtabType>('general');
  readonly checkups = signal<MedicalCheckupDetailDTO[]>([]);
  readonly isLoadingCheckups = signal<boolean>(false);

  // Universal SOAP Encounters state
  readonly encounters = signal<ClinicalEncounterList[]>([]);
  readonly isLoadingEncounters = signal<boolean>(false);
  readonly selectedSpecialtyFilter = signal<MedicalSpecialty | 'ALL'>('ALL');
  readonly isMigrating = signal<boolean>(false);
  readonly migrationMessage = signal<string | null>(null);
  readonly isPediatricToolsExpanded = signal<boolean>(false);

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

  setSubtab(tab: SubtabType): void {
    this.selectedSubtab.set(tab);
  }

  navigateToPatients(): void {
    this.router.navigate(['/pacientes']);
  }

  openNewPatientModal(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-new-patient-modal'));
    }
  }

  openNewCheckupModal(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-new-checkup-modal'));
    }
  }

  openNewEncounterModal(specialty?: MedicalSpecialty, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      const patientId = this.activePatientService.patientId();
      window.dispatchEvent(
        new CustomEvent('open-new-encounter-modal', {
          detail: { patientId, specialty },
        })
      );
    }
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
    if (event) {
      event.stopPropagation();
    }
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

  togglePediatricTools(): void {
    this.isPediatricToolsExpanded.update((v) => !v);
  }

  navigateToGrowthCurves(): void {
    this.router.navigate(['/curvas']);
  }

  navigateToMilestones(): void {
    this.router.navigate(['/hitos']);
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

  // --- Subtab 1 Computeds ---
  readonly patientNationalId = computed(() => {
    const p = this.activePatientService.activePatient();
    return p?.guardianInfo?.firstGuardianNationalId ?? '—';
  });

  readonly biologicalSex = computed(() => 'No especificado');
  readonly bloodType = computed(() => 'Sin registrar');

  readonly guardian1Name = computed(() => {
    return (
      this.activePatientService.activePatient()?.guardianInfo?.firstGuardianFullName ||
      '—'
    );
  });

  readonly guardian1Phone = computed(() => {
    return (
      this.activePatientService.activePatient()?.guardianInfo?.firstGuardianPhone ||
      '—'
    );
  });

  readonly guardian1Dni = computed(() => {
    return (
      this.activePatientService.activePatient()?.guardianInfo?.firstGuardianNationalId ||
      '—'
    );
  });

  readonly guardian2Name = computed(() => {
    return (
      this.activePatientService.activePatient()?.guardianInfo?.secondGuardianFullName ||
      '—'
    );
  });

  readonly guardian2Phone = computed(() => {
    return (
      this.activePatientService.activePatient()?.guardianInfo?.secondGuardianPhone ||
      '—'
    );
  });

  readonly guardian2Dni = computed(() => {
    return (
      this.activePatientService.activePatient()?.guardianInfo?.secondGuardianNationalId ||
      '—'
    );
  });

  readonly address = computed(() => {
    return (
      this.activePatientService.activePatient()?.guardianInfo?.address ||
      '—'
    );
  });

  readonly healthInsurance = computed(() => 'Sin cobertura registrada');

  // --- Subtab 2 Computeds ---
  readonly gestationCount = computed(() => {
    return this.activePatientService.activePatient()?.perinatalHistory?.gestationCount ?? null;
  });

  readonly prenatalVisits = computed(() => {
    return (
      this.activePatientService.activePatient()?.perinatalHistory?.prenatalVisitsSummary ||
      'Sin datos de controles prenatales registrados.'
    );
  });

  readonly pregnancyComplicationChips = computed<ComplicationChip[]>(() => {
    const list = this.activePatientService.activePatient()?.perinatalHistory?.pregnancyComplications;
    if (list && list.length > 0) {
      return list.map((c) => ({ name: c, active: true }));
    }
    return [];
  });

  readonly pregnancyDetail = computed(() => {
    return 'Sin detalles perinatales adicionales.';
  });

  readonly deliveryType = computed(() => 'No especificado');

  readonly birthWeightDisplay = computed(() => {
    const w = this.activePatientService.activePatient()?.personalHistory?.birthMeasurements?.weight;
    return w != null ? `${w.toFixed(3)} kg` : '—';
  });

  readonly birthHeightDisplay = computed(() => {
    const h = this.activePatientService.activePatient()?.personalHistory?.birthMeasurements?.height;
    return h != null ? `${h.toFixed(1)} cm` : '—';
  });

  readonly birthHeadCircDisplay = computed(() => {
    const hc = this.activePatientService.activePatient()?.personalHistory?.birthMeasurements?.headCircumference;
    return hc != null ? `${hc.toFixed(1)} cm` : '—';
  });

  // --- Subtab 3 Computeds ---
  readonly chronicOrPreviousDiseases = computed(() => {
    const list = this.activePatientService.activePatient()?.personalHistory?.chronicOrPreviousDiseases;
    if (list && list.length > 0) {
      return list.join('. ');
    }
    return 'Sin antecedentes patológicos conocidos.';
  });

  readonly hospitalizationsOrSurgeries = computed(() => {
    const list = this.activePatientService.activePatient()?.personalHistory?.hospitalizationsOrSurgeries;
    if (list && list.length > 0) {
      return list.join('. ');
    }
    return 'Sin internaciones ni cirugías previas registradas.';
  });

  readonly allergies = computed(() => {
    const list = this.activePatientService.activePatient()?.personalHistory?.allergies;
    if (list && list.length > 0) {
      return list.join(', ');
    }
    return null;
  });

  readonly habitualMedication = computed<string[]>(() => {
    const list = this.activePatientService.activePatient()?.personalHistory?.habitualMedication;
    if (list && list.length > 0) {
      return list;
    }
    return ['Sin medicación habitual registrada.'];
  });

  readonly familyChronicDiseases = computed<string[]>(() => {
    const list = this.activePatientService.activePatient()?.familyHistory?.familyChronicDiseases;
    if (list && list.length > 0) {
      return list;
    }
    return ['Sin antecedentes patológicos familiares registrados.'];
  });

  readonly familyAllergies = computed(() => {
    const list = this.activePatientService.activePatient()?.familyHistory?.familyAllergies;
    if (list && list.length > 0) {
      return list.join(', ');
    }
    return 'Sin alergias familiares registradas.';
  });

  readonly geneticDiseases = computed(() => {
    const list = this.activePatientService.activePatient()?.familyHistory?.geneticDiseases;
    if (list && list.length > 0) {
      return list.join(', ');
    }
    return null;
  });

  // --- Subtab 4 Computeds ---
  readonly feedingDietCustom = computed(() => {
    return this.activePatientService.activePatient()?.immunizationAndNutrition?.feedingDiet || null;
  });

  readonly developmentalMilestones = computed(() => {
    return (
      this.activePatientService.activePatient()?.immunizationAndNutrition?.developmentalMilestones ||
      'Pautas madurativas no registradas.'
    );
  });

  readonly vaccineSchedule = computed<VaccineScheduleItem[]>(() => {
    const list = this.activePatientService.activePatient()?.immunizationAndNutrition?.vaccinationHistory;
    if (list && list.length > 0) {
      return list.map((item) => ({
        age: '—',
        name: item,
        date: 'Registrada',
        lot: '—',
        status: 'Aplicada',
        pending: false,
      }));
    }
    return [];
  });

  // --- Subtab 5 Computeds ---
  readonly checkupTableData = computed<CheckupTableRow[]>(() => {
    const list = this.checkups();
    if (!list || list.length === 0) return [];

    const patient = this.activePatientService.activePatient();
    const birthTime = patient?.birthDate
      ? new Date(patient.birthDate + 'T00:00:00').getTime()
      : null;

    return list.map((c, index) => {
      const isLatest = index === list.length - 1;
      const code = `#C-${c.id}`;

      // Date formatting
      let dateDisplay = c.checkupDate;
      if (c.checkupDate) {
        const d = new Date(c.checkupDate + (c.checkupDate.includes('T') ? '' : 'T00:00:00'));
        if (!isNaN(d.getTime())) {
          dateDisplay = d.toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
        }
      }

      // Age calculation
      let ageDisplay = 'Control';
      if (birthTime && c.checkupDate) {
        const checkupTime = new Date(
          c.checkupDate + (c.checkupDate.includes('T') ? '' : 'T00:00:00')
        ).getTime();
        const diffMonths = Math.round(
          (checkupTime - birthTime) / (1000 * 60 * 60 * 24 * 30.4375)
        );
        if (diffMonths <= 0) {
          ageDisplay = 'Nacimiento';
        } else if (diffMonths === 1) {
          ageDisplay = '1 Mes';
        } else {
          ageDisplay = `${diffMonths} Meses`;
        }
      }

      // Reason
      let reason = 'Control de rutina';
      if (c.reason === 'VACCINATION') reason = 'Vacunación';
      else if (c.reason === 'ILLNESS') reason = 'Enfermedad';
      else if (c.reason === 'FOLLOW_UP') reason = 'Seguimiento';
      else if (c.reason === 'OTHER') reason = 'Consulta';

      // Measurements
      const weight =
        c.measurements?.weight != null ? `${c.measurements.weight.toFixed(3)} kg` : '—';
      const height =
        c.measurements?.height != null ? `${c.measurements.height.toFixed(1)} cm` : '—';
      const headCircumference =
        c.measurements?.headCircumference != null
          ? `${c.measurements.headCircumference.toFixed(1)} cm`
          : '—';

      // Percentile & Observations
      const percentile = 'P50';
      const percentilBadge = isLatest;
      const observations = 'Control somatométrico registrado.';

      return {
        code,
        date: dateDisplay,
        age: ageDisplay,
        reason,
        weight,
        height,
        headCircumference,
        percentile,
        percentilBadge,
        observations,
        isLatest,
      };
    });
  });

  readonly totalWeightGain = computed(() => {
    const patient = this.activePatientService.activePatient();
    const currentW = patient?.latestMeasurements?.weight;
    const birthW = patient?.personalHistory?.birthMeasurements?.weight;
    if (currentW == null || birthW == null) return '—';
    const diff = currentW - birthW;
    const sign = diff >= 0 ? '+' : '';
    return `${sign}${diff.toFixed(3)} kg`;
  });

  readonly totalWeightGainSub = computed(() => {
    const patient = this.activePatientService.activePatient();
    const currentW = patient?.latestMeasurements?.weight;
    const birthW = patient?.personalHistory?.birthMeasurements?.weight;
    if (currentW == null || birthW == null) return 'Sin mediciones comparativas';
    const diffGrams = (currentW - birthW) * 1000;
    let months = 1;
    if (patient?.birthDate) {
      const birth = new Date(patient.birthDate + 'T00:00:00');
      if (!isNaN(birth.getTime())) {
        const now = new Date();
        const m = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
        months = Math.max(1, m);
      }
    }
    const avg = Math.round(diffGrams / months);
    return `Promedio: ~${avg} g/mes`;
  });

  readonly totalHeightGain = computed(() => {
    const patient = this.activePatientService.activePatient();
    const currentH = patient?.latestMeasurements?.height;
    const birthH = patient?.personalHistory?.birthMeasurements?.height;
    if (currentH == null || birthH == null) return '—';
    const diff = currentH - birthH;
    const sign = diff >= 0 ? '+' : '';
    return `${sign}${diff.toFixed(1)} cm`;
  });

  readonly totalHeightGainSub = computed(() => {
    const patient = this.activePatientService.activePatient();
    const currentH = patient?.latestMeasurements?.height;
    const birthH = patient?.personalHistory?.birthMeasurements?.height;
    if (currentH == null || birthH == null) return 'Sin mediciones comparativas';
    return `Talla al nacer: ${birthH.toFixed(1)} cm ➔ Actual: ${currentH.toFixed(1)} cm`;
  });

  readonly totalHeadCircGain = computed(() => {
    const patient = this.activePatientService.activePatient();
    const currentHC = patient?.latestMeasurements?.headCircumference;
    const birthHC = patient?.personalHistory?.birthMeasurements?.headCircumference;
    if (currentHC == null || birthHC == null) return '—';
    const diff = currentHC - birthHC;
    const sign = diff >= 0 ? '+' : '';
    return `${sign}${diff.toFixed(1)} cm`;
  });

  readonly totalHeadCircGainSub = computed(() => {
    const patient = this.activePatientService.activePatient();
    const currentHC = patient?.latestMeasurements?.headCircumference;
    const birthHC = patient?.personalHistory?.birthMeasurements?.headCircumference;
    if (currentHC == null || birthHC == null) return 'Sin mediciones comparativas';
    return `PC nacer: ${birthHC.toFixed(1)} cm ➔ Actual: ${currentHC.toFixed(1)} cm`;
  });
}
