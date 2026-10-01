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
import { ClinicalEncounterList, PrescriptionItem } from '../../core/models/clinical-encounter.model';
import { MedicalSpecialty } from '../../core/models/specialty.model';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { PatientBannerComponent } from './patient-banner/patient-banner.component';
import { ClinicalTimelineComponent } from './clinical-timeline/clinical-timeline.component';
import { NewEncounterDialogComponent } from '../new-encounter-dialog/new-encounter-dialog.component';
import { DynamicFormRendererComponent } from '../dynamic-form-renderer/dynamic-form-renderer.component';
import { PatientVaccinationsComponent } from './patient-vaccinations/patient-vaccinations.component';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { FormTemplate } from '../../core/models/workspace.model';
import { GrowthChartComponent } from './growth-chart/growth-chart.component';
import { PatientGrowthService } from '../../core/services/patient-growth.service';
import { BiologicalSex, GrowthMetricType } from '../../core/models/growth-chart.model';

export type PatientRecordTab = 'resumen' | 'historia' | 'vacunas' | 'curvas' | 'recetas';
export type PrescriptionOrderFormMode = 'MEDICATION' | 'STUDY';

export interface SavedPrescriptionRecord {
  id: number;
  createdAt: string;
  type: 'PRESCRIPTION' | 'STUDY_ORDERS';
  diagnosisDescription: string;
  generalInstructions: string;
  prescriptions: PrescriptionItem[];
  diagnosticOrders: string[];
}

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
    NewEncounterDialogComponent,
    DynamicFormRendererComponent,
    PatientVaccinationsComponent,
    GrowthChartComponent,
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
  readonly growthService = inject(PatientGrowthService);
  private readonly checkupService = inject(CheckupService);
  private readonly clinicalEncounterService = inject(ClinicalEncounterService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly workspaceStore = inject(WorkspaceStore);

  // Growth Curves & Somatometry State
  readonly selectedGrowthMetric = signal<GrowthMetricType | 'ALL'>('WEIGHT');

  readonly patientSex = computed<BiologicalSex>(() =>
    this.growthService.normalizeGender(this.activePatientService.activePatient()?.gender)
  );

  readonly weightMeasurements = computed(() =>
    this.growthService.extractPatientMeasurements(
      this.activePatientService.activePatient() || {},
      this.encounters(),
      'WEIGHT',
      this.checkups()
    )
  );

  readonly heightMeasurements = computed(() =>
    this.growthService.extractPatientMeasurements(
      this.activePatientService.activePatient() || {},
      this.encounters(),
      'HEIGHT',
      this.checkups()
    )
  );

  readonly headCircumferenceMeasurements = computed(() =>
    this.growthService.extractPatientMeasurements(
      this.activePatientService.activePatient() || {},
      this.encounters(),
      'HEAD_CIRCUMFERENCE',
      this.checkups()
    )
  );

  readonly totalMeasurementsCount = computed(() =>
    this.weightMeasurements().length +
    this.heightMeasurements().length +
    this.headCircumferenceMeasurements().length
  );

  // Flattened 4-Tab Hierarchy
  readonly selectedTab = signal<PatientRecordTab>('resumen');
  readonly isMoreMenuOpen = signal<boolean>(false);
  readonly isNewEncounterModalOpen = signal<boolean>(false);

  readonly isChild = computed(() => {
    return this.activePatientService.ageInYears() < 16;
  });

  /**
   * New patients carry the exact wizard schema used when they were registered.
   * Legacy patients fall back to the doctor's current template instead.
   */
  readonly patientFormTemplate = computed<FormTemplate | null>(() => {
    const patient = this.activePatientService.activePatient();
    const baseTemplate = this.workspaceStore.defaultPatientTemplate();
    const schema = patient?.patientTemplateSnapshot ?? baseTemplate?.schemaDefinition;
    if (!schema) return null;

    return {
      ...(baseTemplate ?? {
        name: 'Formulario del paciente',
        templateType: 'PATIENT_EXTRA' as const,
        isDefault: true,
      }),
      name: baseTemplate?.name ?? 'Formulario del paciente',
      templateType: 'PATIENT_EXTRA',
      isDefault: true,
      schemaDefinition: schema,
    };
  });

  readonly patientFormValues = computed<Record<string, unknown>>(() => {
    const patient = this.activePatientService.activePatient();
    if (!patient) return {};
    const nameParts = patient.fullName.trim().split(/\s+/);
    return {
      ...(patient.patientExtraData ?? {}),
      ...(patient.patientFormData ?? {}),
      firstName: patient.patientFormData?.['firstName'] ?? nameParts[0] ?? '',
      lastName: patient.patientFormData?.['lastName'] ?? nameParts.slice(1).join(' '),
      fullName: patient.fullName,
      birthDate: patient.birthDate,
      nationalId: patient.nationalId ?? '',
      phone: patient.phone ?? '',
      address: patient.address ?? '',
      email: patient.email ?? '',
      gender: patient.gender ?? '',
      bloodType: patient.bloodType ?? '',
    };
  });

  readonly tabs = computed<RecordTabItem[]>(() => {
    const isPediatric = this.doctorSpecialtyService.isPediatricMode() || this.isChild();
    return [
      { id: 'resumen', label: '1. Datos del paciente' },
      { id: 'historia', label: '2. Consultas', badge: this.encounters().length },
      { id: 'vacunas', label: '3. Vacunas' },
      {
        id: 'curvas',
        label: '4. Evolución y Curvas',
        badge: this.totalMeasurementsCount() > 0 ? this.totalMeasurementsCount() : undefined,
      },
      { id: 'recetas', label: '5. Recetas y Estudios' },
    ];
  });

  readonly checkups = signal<MedicalCheckupDetailDTO[]>([]);
  readonly isLoadingCheckups = signal<boolean>(false);

  // Universal Encounters state
  readonly encounters = signal<ClinicalEncounterList[]>([]);
  readonly isLoadingEncounters = signal<boolean>(false);
  readonly isMigrating = signal<boolean>(false);
  readonly migrationMessage = signal<string | null>(null);
  readonly isPediatricToolsExpanded = signal<boolean>(true);

  // --- Recetas y Estudios Form State ---
  readonly rxFormMode = signal<PrescriptionOrderFormMode>('MEDICATION');
  readonly rxMedicationName = signal<string>('');
  readonly rxDosage = signal<string>('');
  readonly rxFrequency = signal<string>('Cada 8 horas');
  readonly rxAdministrationRoute = signal<string>('Vía Oral');
  readonly rxDurationDays = signal<number | null>(null);
  readonly rxMedInstructions = signal<string>('');

  readonly rxStudyName = signal<string>('');
  readonly rxStudySpecification = signal<string>('');

  readonly rxDiagnosis = signal<string>('');
  readonly rxGeneralInstructions = signal<string>('');

  readonly draftPrescriptions = signal<PrescriptionItem[]>([]);
  readonly draftStudies = signal<string[]>([]);
  readonly savedPrescriptionRecords = signal<SavedPrescriptionRecord[]>([]);
  readonly rxErrorMessage = signal<string | null>(null);
  readonly rxSuccessMessage = signal<string | null>(null);

  readonly commonStudySuggestions: readonly string[] = [
    'Tomografía Axial Computada (TAC)',
    'Resonancia Magnética Nuclear (RMN)',
    'Radiografía (Rx) de Tórax Frente y Perfil',
    'Ecografía Abdominal / General',
    'Laboratorio Completo (Hemograma, Glucemia, Función Renal y Hepática)',
    'Electrocardiograma (ECG)',
  ];

  readonly commonFrequencies: readonly string[] = [
    'Cada 8 horas',
    'Cada 12 horas',
    'Cada 24 horas (1 vez por día)',
    'Cada 6 horas',
    'En ayunas',
    'Según dolor o necesidad',
  ];

  readonly commonRoutes: readonly string[] = [
    'Vía Oral',
    'Sublingual',
    'Intramuscular',
    'Endovenosa',
    'Tópica / Dérmica',
    'Inhalatoria',
    'Oftálmica / Ótica',
  ];

  constructor() {
    effect(() => {
      const patient = this.activePatientService.activePatient();
      untracked(() => {
        if (patient?.id) {
          this.loadCheckups(patient.id);
          this.loadEncounters(patient.id);
          this.loadSavedPrescriptions(patient.id);
        } else {
          this.checkups.set([]);
          this.encounters.set([]);
          this.savedPrescriptionRecords.set([]);
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
      if (tabParam && ['resumen', 'historia', 'vacunas', 'curvas', 'recetas'].includes(tabParam)) {
        this.selectedTab.set(tabParam);
      }
    });

    const patient = this.activePatientService.activePatient();
    if (patient?.id) {
      this.loadCheckups(patient.id);
      this.loadEncounters(patient.id);
      this.loadSavedPrescriptions(patient.id);
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
    this.router.navigate(['/pacientes']);
  }

  openNewCheckupModal(event?: Event): void {
    if (event) event.stopPropagation();
    this.isMoreMenuOpen.set(false);
  }

  openNewEncounterModal(specialty?: MedicalSpecialty, event?: Event): void {
    if (event) event.stopPropagation();
    this.isMoreMenuOpen.set(false);
    this.isNewEncounterModalOpen.set(true);
  }

  closeNewEncounterModal(): void {
    this.isNewEncounterModalOpen.set(false);
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

  // --- Métodos para Formulario de Recetas y Estudios ---
  loadSavedPrescriptions(patientId: number): void {
    if (!isPlatformBrowser(this.platformId) || typeof localStorage === 'undefined') {
      return;
    }
    try {
      const raw = localStorage.getItem(`dc_rx_records_${patientId}`);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedPrescriptionRecord[];
        if (Array.isArray(parsed)) {
          this.savedPrescriptionRecords.set(parsed);
          return;
        }
      }
    } catch {}
    this.savedPrescriptionRecords.set([]);
  }

  private persistSavedPrescriptions(records: SavedPrescriptionRecord[]): void {
    const patientId = this.activePatientService.patientId();
    if (!patientId || !isPlatformBrowser(this.platformId) || typeof localStorage === 'undefined') {
      return;
    }
    try {
      localStorage.setItem(`dc_rx_records_${patientId}`, JSON.stringify(records));
    } catch {}
  }

  setRxFormMode(mode: PrescriptionOrderFormMode): void {
    this.rxFormMode.set(mode);
    this.rxErrorMessage.set(null);
    this.rxSuccessMessage.set(null);
  }

  addMedicationToDraft(): void {
    const name = this.rxMedicationName().trim();
    if (!name) {
      this.rxErrorMessage.set('Ingresá el nombre del medicamento o principio activo.');
      return;
    }

    const newItem: PrescriptionItem = {
      medicationName: name,
      dosage: this.rxDosage().trim() || 'Según indicación',
      frequency: this.rxFrequency().trim() || 'Cada 24 horas',
      administrationRoute: this.rxAdministrationRoute().trim() || 'Vía Oral',
      durationDays: this.rxDurationDays() && Number(this.rxDurationDays()) > 0 ? Number(this.rxDurationDays()) : null,
      instructions: this.rxMedInstructions().trim() || undefined,
    };

    this.draftPrescriptions.update((list) => [...list, newItem]);
    this.rxMedicationName.set('');
    this.rxDosage.set('');
    this.rxDurationDays.set(null);
    this.rxMedInstructions.set('');
    this.rxErrorMessage.set(null);
    this.rxSuccessMessage.set(null);
  }

  removeMedicationFromDraft(index: number): void {
    this.draftPrescriptions.update((list) => list.filter((_, i) => i !== index));
  }

  selectQuickStudy(studyTemplate: string): void {
    this.rxStudyName.set(studyTemplate);
    this.rxErrorMessage.set(null);
  }

  addStudyToDraft(): void {
    const name = this.rxStudyName().trim();
    if (!name) {
      this.rxErrorMessage.set('Ingresá el nombre del estudio o práctica a solicitar (por ej. Tomografía).');
      return;
    }

    const spec = this.rxStudySpecification().trim();
    const formattedStudy = spec ? `${name} — ${spec}` : name;

    this.draftStudies.update((list) => [...list, formattedStudy]);
    this.rxStudyName.set('');
    this.rxStudySpecification.set('');
    this.rxErrorMessage.set(null);
    this.rxSuccessMessage.set(null);
  }

  removeStudyFromDraft(index: number): void {
    this.draftStudies.update((list) => list.filter((_, i) => i !== index));
  }

  prescribeHabitualMedication(medName: string): void {
    this.rxFormMode.set('MEDICATION');
    const item: PrescriptionItem = {
      medicationName: medName,
      dosage: 'Dosis habitual',
      frequency: 'Cada 24 horas (1 vez por día)',
      administrationRoute: 'Vía Oral',
      instructions: 'Continuar tratamiento de base',
    };
    this.draftPrescriptions.update((list) => [...list, item]);
    this.rxErrorMessage.set(null);
    this.rxSuccessMessage.set(`Se agregó "${medName}" a la receta actual.`);
  }

  clearRxForm(): void {
    this.rxMedicationName.set('');
    this.rxDosage.set('');
    this.rxDurationDays.set(null);
    this.rxMedInstructions.set('');
    this.rxStudyName.set('');
    this.rxStudySpecification.set('');
    this.rxDiagnosis.set('');
    this.rxGeneralInstructions.set('');
    this.draftPrescriptions.set([]);
    this.draftStudies.set([]);
    this.rxErrorMessage.set(null);
    this.rxSuccessMessage.set(null);
  }

  private commitPendingRxInputs(): void {
    if (this.rxMedicationName().trim()) {
      this.addMedicationToDraft();
    }
    if (this.rxStudyName().trim()) {
      this.addStudyToDraft();
    }
  }

  saveCurrentRxToHistory(): SavedPrescriptionRecord | null {
    this.commitPendingRxInputs();

    const meds = this.draftPrescriptions();
    const studies = this.draftStudies();

    if (meds.length === 0 && studies.length === 0) {
      this.rxErrorMessage.set('Agregá al menos un medicamento o estudio médico (ej. Tomografía) para guardar o imprimir.');
      return null;
    }

    const docType: 'PRESCRIPTION' | 'STUDY_ORDERS' =
      this.rxFormMode() === 'STUDY' && studies.length > 0
        ? 'STUDY_ORDERS'
        : meds.length > 0
          ? 'PRESCRIPTION'
          : 'STUDY_ORDERS';

    const newRecord: SavedPrescriptionRecord = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      type: docType,
      diagnosisDescription: this.rxDiagnosis().trim(),
      generalInstructions: this.rxGeneralInstructions().trim(),
      prescriptions: [...meds],
      diagnosticOrders: [...studies],
    };

    const updated = [newRecord, ...this.savedPrescriptionRecords()];
    this.savedPrescriptionRecords.set(updated);
    this.persistSavedPrescriptions(updated);
    this.rxErrorMessage.set(null);
    this.rxSuccessMessage.set('Receta / orden registrada en el historial del paciente.');
    return newRecord;
  }

  reprintSavedRecord(record: SavedPrescriptionRecord): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-prescription-print-modal', {
          detail: {
            id: record.id,
            type: record.type,
            encounterDate: record.createdAt,
            primaryDiagnosisCode: null,
            primaryDiagnosisDescription: record.diagnosisDescription,
            prescriptions: record.prescriptions,
            diagnosticOrders: record.diagnosticOrders,
            followUpInstructions: record.generalInstructions,
          },
        })
      );
    }
  }

  deleteSavedRecord(recordId: number): void {
    const updated = this.savedPrescriptionRecords().filter((r) => r.id !== recordId);
    this.savedPrescriptionRecords.set(updated);
    this.persistSavedPrescriptions(updated);
  }

  formatRxDate(isoString: string): string {
    try {
      const d = new Date(isoString);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
      }
    } catch {}
    return isoString;
  }

  printRecord(forcedType?: 'PRESCRIPTION' | 'STUDY_ORDERS'): void {
    this.isMoreMenuOpen.set(false);
    if (!isPlatformBrowser(this.platformId) || typeof window === 'undefined') {
      return;
    }

    this.commitPendingRxInputs();
    const currentMeds = this.draftPrescriptions();
    const currentStudies = this.draftStudies();

    if (currentMeds.length > 0 || currentStudies.length > 0) {
      const saved = this.saveCurrentRxToHistory();
      const docType: 'PRESCRIPTION' | 'STUDY_ORDERS' =
        forcedType ||
        saved?.type ||
        (this.rxFormMode() === 'STUDY' && currentStudies.length > 0 ? 'STUDY_ORDERS' : 'PRESCRIPTION');

      window.dispatchEvent(
        new CustomEvent('open-prescription-print-modal', {
          detail: {
            id: saved?.id || Date.now(),
            type: docType,
            encounterDate: new Date().toISOString(),
            primaryDiagnosisCode: null,
            primaryDiagnosisDescription: this.rxDiagnosis().trim() || undefined,
            prescriptions: currentMeds,
            diagnosticOrders: currentStudies,
            followUpInstructions: this.rxGeneralInstructions().trim() || undefined,
          },
        })
      );
      return;
    }

    const latestSaved = this.savedPrescriptionRecords()[0];
    if (latestSaved) {
      this.reprintSavedRecord(latestSaved);
      return;
    }

    const latestEnc = this.encounters()[0];
    const fallbackMeds: PrescriptionItem[] =
      latestEnc?.prescriptions && latestEnc.prescriptions.length > 0
        ? latestEnc.prescriptions
        : this.habitualMedication().map((med) => ({
            medicationName: med,
            dosage: 'Según indicación habitual',
            frequency: 'Cada 24 horas',
            administrationRoute: 'Vía Oral',
          }));

    window.dispatchEvent(
      new CustomEvent('open-prescription-print-modal', {
        detail: {
          id: latestEnc?.id || Date.now(),
          type: forcedType || (this.rxFormMode() === 'STUDY' ? 'STUDY_ORDERS' : 'PRESCRIPTION'),
          encounterDate: latestEnc?.encounterDate || new Date().toISOString(),
          primaryDiagnosisCode: latestEnc?.primaryDiagnosisCode,
          primaryDiagnosisDescription: this.rxDiagnosis().trim() || latestEnc?.primaryDiagnosisDescription,
          prescriptions: fallbackMeds,
          diagnosticOrders: [],
          followUpInstructions: this.rxGeneralInstructions().trim() || latestEnc?.followUpInstructions,
        },
      })
    );
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
