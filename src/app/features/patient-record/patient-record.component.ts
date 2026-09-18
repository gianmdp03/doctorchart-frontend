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
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';

export type SubtabType =
  | 'general'
  | 'perinatal'
  | 'personal'
  | 'nutrition'
  | 'history'
  | 'gynecology'
  | 'cardiovascular';

export interface RecordSubtabItem {
  id: SubtabType;
  label: string;
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
  standalone: true,
  imports: [FormsModule],
  templateUrl: './patient-record.component.html',
  styleUrl: './patient-record.component.css',
})
export class PatientRecordComponent implements OnInit {
  readonly activePatientService = inject(ActivePatientService);
  readonly doctorSpecialtyService = inject(DoctorSpecialtyService);
  private readonly checkupService = inject(CheckupService);
  private readonly clinicalEncounterService = inject(ClinicalEncounterService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly selectedSubtab = signal<SubtabType>('general');

  readonly isChild = computed(() => {
    return this.activePatientService.ageInYears() < 16;
  });

  readonly availableSubtabs = computed<RecordSubtabItem[]>(() => {
    const specialty = this.doctorSpecialtyService.activeSpecialty();
    const child = this.isChild();

    if (specialty === 'GYNECOLOGY') {
      return [
        { id: 'general', label: '1. Datos Generales' },
        { id: 'gynecology', label: '2. Antecedentes Gineco-Obstétricos' },
        { id: 'personal', label: '3. Personales & Familiares' },
        { id: 'history', label: '4. Historia Clínica & Consultas SOAP' },
      ];
    }

    if (specialty === 'CARDIOLOGY' || specialty === 'GENERAL_MEDICINE') {
      if (child) {
        return [
          { id: 'general', label: '1. Datos Generales & Tutores' },
          { id: 'cardiovascular', label: '2. Riesgo Cardiovascular & Estilo de Vida' },
          { id: 'personal', label: '3. Personales & Familiares' },
          { id: 'nutrition', label: '4. Alimentación & Vacunas' },
          { id: 'history', label: '5. Historia Clínica & Consultas SOAP' },
        ];
      }
      return [
        { id: 'general', label: '1. Datos Generales' },
        { id: 'cardiovascular', label: '2. Riesgo Cardiovascular & Estilo de Vida' },
        { id: 'personal', label: '3. Personales & Familiares' },
        { id: 'history', label: '4. Historia Clínica & Consultas SOAP' },
      ];
    }

    if (specialty === 'PEDIATRICS') {
      if (child) {
        return [
          { id: 'general', label: '1. Datos Generales & Tutores' },
          { id: 'perinatal', label: '2. Antecedentes Perinatales & Nacer' },
          { id: 'personal', label: '3. Personales & Familiares' },
          { id: 'nutrition', label: '4. Alimentación & Vacunas' },
          { id: 'history', label: '5. Historia Clínica & Consultas SOAP' },
        ];
      }
      return [
        { id: 'general', label: '1. Datos Generales' },
        { id: 'personal', label: '2. Personales & Familiares' },
        { id: 'history', label: '3. Historia Clínica & Consultas SOAP' },
      ];
    }

    // Default or other specialties
    if (child) {
      return [
        { id: 'general', label: '1. Datos Generales & Tutores' },
        { id: 'perinatal', label: '2. Antecedentes Perinatales & Nacer' },
        { id: 'personal', label: '3. Personales & Familiares' },
        { id: 'nutrition', label: '4. Alimentación & Vacunas' },
        { id: 'history', label: '5. Historia Clínica & Consultas SOAP' },
      ];
    }
    return [
      { id: 'general', label: '1. Datos Generales' },
      { id: 'cardiovascular', label: '2. Riesgo Cardiovascular & Estilo de Vida' },
      { id: 'personal', label: '3. Personales & Familiares' },
      { id: 'history', label: '4. Historia Clínica & Consultas SOAP' },
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

    effect(() => {
      const validSubtabs = this.availableSubtabs().map((t) => t.id);
      untracked(() => {
        if (!validSubtabs.includes(this.selectedSubtab())) {
          this.selectedSubtab.set(validSubtabs[0] || 'general');
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
    return this.activePatientService.activePatient()?.email || '—';
  });

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

  readonly emergencyContactInfo = computed(() => {
    return this.activePatientService.activePatient()?.emergencyContact || null;
  });

  readonly address = computed(() => {
    const p = this.activePatientService.activePatient();
    return p?.address || p?.guardianInfo?.address || '—';
  });

  readonly healthInsurance = computed(() => {
    const p = this.activePatientService.activePatient();
    const ins = p?.insuranceInfo;
    if (ins?.providerName) {
      const plan = ins.planName ? ` (${ins.planName})` : '';
      const num = ins.affiliateNumber ? ` - N° ${ins.affiliateNumber}` : '';
      return `${ins.providerName}${plan}${num}`;
    }
    return 'Sin cobertura registrada';
  });

  // --- Subtab 2 Computeds ---
  readonly hasPerinatalHistory = computed(() => {
    const p = this.activePatientService.activePatient();
    const ph = p?.perinatalHistory;
    const bm = p?.personalHistory?.birthMeasurements;
    return !!(
      ph?.gestationCount != null ||
      (ph?.prenatalVisitsSummary && ph.prenatalVisitsSummary.trim().length > 0) ||
      (ph?.pregnancyComplications && ph.pregnancyComplications.length > 0) ||
      (bm?.weight != null && bm.weight > 0) ||
      (bm?.height != null && bm.height > 0) ||
      (bm?.headCircumference != null && bm.headCircumference > 0)
    );
  });

  readonly gestationCount = computed(() => {
    return this.activePatientService.activePatient()?.perinatalHistory?.gestationCount ?? null;
  });

  readonly prenatalVisits = computed(() => {
    return (
      this.activePatientService.activePatient()?.perinatalHistory?.prenatalVisitsSummary ||
      'Sin registrar'
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
    return null;
  });

  readonly deliveryType = computed(() => 'Sin registrar');

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

  // --- Subtab 3 Computeds ---
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
    const p = this.activePatientService.activePatient();
    const fh = p?.familyHistory;
    return !!(
      (fh?.familyChronicDiseases && fh.familyChronicDiseases.length > 0) ||
      (fh?.familyAllergies && fh.familyAllergies.length > 0) ||
      (fh?.geneticDiseases && fh.geneticDiseases.length > 0)
    );
  });

  readonly chronicOrPreviousDiseases = computed(() => {
    const p = this.activePatientService.activePatient();
    const list = p?.personalHistory?.chronicOrPreviousDiseases || p?.chronicConditions;
    if (list && list.length > 0) {
      return list.join('. ');
    }
    return null;
  });

  readonly hospitalizationsOrSurgeries = computed(() => {
    const list = this.activePatientService.activePatient()?.personalHistory?.hospitalizationsOrSurgeries;
    if (list && list.length > 0) {
      return list.join('. ');
    }
    return null;
  });

  readonly allergies = computed(() => {
    const p = this.activePatientService.activePatient();
    const list = p?.personalHistory?.allergies || p?.allergies;
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
    return [];
  });

  readonly familyChronicDiseases = computed<string[]>(() => {
    const list = this.activePatientService.activePatient()?.familyHistory?.familyChronicDiseases;
    if (list && list.length > 0) {
      return list;
    }
    return [];
  });

  readonly familyAllergies = computed(() => {
    const list = this.activePatientService.activePatient()?.familyHistory?.familyAllergies;
    if (list && list.length > 0) {
      return list.join(', ');
    }
    return null;
  });

  readonly geneticDiseases = computed(() => {
    const list = this.activePatientService.activePatient()?.familyHistory?.geneticDiseases;
    if (list && list.length > 0) {
      return list.join(', ');
    }
    return null;
  });

  // --- Subtab 4 Computeds ---
  readonly hasNutritionData = computed(() => {
    const p = this.activePatientService.activePatient();
    const inut = p?.immunizationAndNutrition;
    return !!(
      inut?.feedingDiet ||
      inut?.developmentalMilestones ||
      (inut?.vaccinationHistory && inut.vaccinationHistory.length > 0)
    );
  });

  readonly feedingDietCustom = computed(() => {
    return this.activePatientService.activePatient()?.immunizationAndNutrition?.feedingDiet || null;
  });

  readonly developmentalMilestones = computed(() => {
    return (
      this.activePatientService.activePatient()?.immunizationAndNutrition?.developmentalMilestones || null
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

  // --- Gynecology Subtab Computeds ---
  readonly gynecologyData = computed<Record<string, any> | null>(() => {
    const extra = this.activePatientService.activePatient()?.patientExtraData;
    return (extra?.['gynecology'] || extra?.['obstetric'] || extra) ?? null;
  });

  readonly fumDisplay = computed(() => {
    const d = this.gynecologyData();
    return d?.['fum'] || d?.['lastMenstrualPeriod'] || 'Sin registrar';
  });

  readonly menstrualCycleDisplay = computed(() => {
    const d = this.gynecologyData();
    return d?.['menstrualCycle'] || d?.['cycleRegularity'] || 'Sin registrar';
  });

  readonly obstetricFormulaDisplay = computed(() => {
    const d = this.gynecologyData();
    if (!d) return 'Sin registrar';
    const g = d['gesta'] ?? d['gravida'] ?? null;
    const p = d['partos'] ?? d['para'] ?? null;
    const c = d['cesareas'] ?? d['cesarean'] ?? null;
    const a = d['abortos'] ?? d['abortions'] ?? null;
    if (g != null || p != null || c != null || a != null) {
      return `G${g ?? 0} P${p ?? 0} C${c ?? 0} A${a ?? 0}`;
    }
    return 'Sin registrar';
  });

  readonly contraceptionDisplay = computed(() => {
    const d = this.gynecologyData();
    return d?.['contraception'] || d?.['contraceptiveMethod'] || 'Sin registrar / No utiliza';
  });

  readonly papDisplay = computed(() => {
    const d = this.gynecologyData();
    return d?.['lastPap'] || d?.['papSmear'] || 'Sin registrar';
  });

  readonly mammographyDisplay = computed(() => {
    const d = this.gynecologyData();
    return d?.['lastMammography'] || d?.['mammography'] || 'Sin registrar';
  });

  // --- Cardiology Subtab Computeds ---
  readonly cardiologyData = computed<Record<string, any> | null>(() => {
    const extra = this.activePatientService.activePatient()?.patientExtraData;
    return (extra?.['cardiology'] || extra?.['cardiovascular'] || extra) ?? null;
  });

  readonly smokingDisplay = computed(() => {
    const d = this.cardiologyData();
    return d?.['smoking'] || d?.['tobacco'] || 'No refiere tabaquismo activo';
  });

  readonly physicalActivityDisplay = computed(() => {
    const d = this.cardiologyData();
    return d?.['physicalActivity'] || d?.['exercise'] || 'Sin registrar';
  });

  readonly cardiovascularConditionsDisplay = computed(() => {
    const p = this.activePatientService.activePatient();
    const list = p?.chronicConditions || [];
    const cardioTerms = list.filter((c) => /hipertens|hta|dislip|colesterol|coronari|infarto|arritm/i.test(c));
    return cardioTerms.length > 0 ? cardioTerms.join(', ') : 'Sin antecedentes cardiovasculares reportados';
  });

  readonly bloodPressureBaselineDisplay = computed(() => {
    const d = this.cardiologyData();
    return d?.['baselineBP'] || d?.['bloodPressure'] || 'Sin registro basal';
  });

  readonly cardioRiskScoreDisplay = computed(() => {
    const d = this.cardiologyData();
    return d?.['riskScore'] || 'Riesgo bajo / No calculado';
  });
}
