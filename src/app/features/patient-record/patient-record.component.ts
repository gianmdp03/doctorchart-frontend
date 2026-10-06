import { SavedPrescriptionRecord, PrescriptionDocumentType } from '../../core/models/prescription.model';
import { PatientPrescriptionStore } from './patient-prescription.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { PatientBannerComponent } from './patient-banner/patient-banner.component';
import { ClinicalTimelineComponent } from './clinical-timeline/clinical-timeline.component';
import { NewEncounterDialogComponent } from '../new-encounter-dialog/new-encounter-dialog.component';
import { DynamicFormRendererComponent } from '../dynamic-form-renderer/dynamic-form-renderer.component';
import { PatientVaccinationsComponent } from './patient-vaccinations/patient-vaccinations.component';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { WizardFormDefinition, WizardFormValues } from '../../core/models/wizard-definition.model';
import { GrowthChartComponent } from './growth-chart/growth-chart.component';
import { PatientStudiesComponent } from './patient-studies/patient-studies.component';
import { PatientGrowthService } from '../../core/services/patient-growth.service';
import { NewPatientDialogComponent } from '../new-patient-dialog/new-patient-dialog.component';
import { PatientDetailDTO } from '../../core/models/patient.model';
import {
  BackendGrowthMeasurement,
  BiologicalSex,
  GrowthMetricType,
} from '../../core/models/growth-chart.model';

export type PatientRecordTab = 'resumen' | 'historia' | 'vacunas' | 'curvas' | 'recetas' | 'estudios';
export type PrescriptionOrderFormMode = 'MEDICATION' | 'STUDY';

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
    PatientStudiesComponent,
    NewPatientDialogComponent,
  ],
  providers: [
    PatientPrescriptionStore,
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
  readonly prescriptionStore = inject(PatientPrescriptionStore);
  private rxPatientId: number | null = null;
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
  private checkupRead = 0; private encounterRead = 0; private growthRead = 0;

  // Growth Curves & Somatometry State
  readonly selectedGrowthMetric = signal<GrowthMetricType | 'ALL'>('WEIGHT');
  readonly backendGrowthMeasurements = signal<BackendGrowthMeasurement[]>([]);
  readonly isLoadingGrowthCurves = signal<boolean>(false);

  readonly patientSex = computed<BiologicalSex>(() =>
    this.growthService.normalizeGender(this.activePatientService.activePatient()?.gender)
  );

  readonly weightMeasurements = computed(() =>
    this.growthService.extractPatientMeasurements(
      this.activePatientService.activePatient() || {},
      this.encounters(),
      'WEIGHT',
      this.checkups(),
      this.backendGrowthMeasurements()
    )
  );

  readonly heightMeasurements = computed(() =>
    this.growthService.extractPatientMeasurements(
      this.activePatientService.activePatient() || {},
      this.encounters(),
      'HEIGHT',
      this.checkups(),
      this.backendGrowthMeasurements()
    )
  );

  readonly headCircumferenceMeasurements = computed(() =>
    this.growthService.extractPatientMeasurements(
      this.activePatientService.activePatient() || {},
      this.encounters(),
      'HEAD_CIRCUMFERENCE',
      this.checkups(),
      this.backendGrowthMeasurements()
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
  readonly isEditPatientModalOpen = signal<boolean>(false);

  readonly isChild = computed(() => {
    return this.activePatientService.ageInYears() < 16;
  });

  readonly patientFormDefinition = computed<WizardFormDefinition | null>(() => this.activePatientService.activePatient()?.formDefinitionSnapshot ?? null);
  readonly patientFormValues = computed<WizardFormValues>(() => this.activePatientService.activePatient()?.formValues ?? {});
  readonly patientFormulaResults = computed(() => this.activePatientService.activePatient()?.formulaResults ?? {});
  readonly growthEnabled = computed(() => this.workspaceStore.isModuleActive('GROWTH_CHARTS'));
  readonly tabs = computed<RecordTabItem[]>(() => {
    return [
      { id: 'resumen', label: '1. Datos del paciente' },
      { id: 'historia', label: '2. Consultas', badge: this.encounters().length },
      { id: 'vacunas', label: '3. Vacunas' },
      {
        id: 'curvas',
        label: '4. Evolución y Curvas',
        badge: this.totalMeasurementsCount() > 0 ? this.totalMeasurementsCount() : undefined,
      },
      { id: 'recetas', label: '5. Recetas y Órdenes' },
      { id: 'estudios', label: '6. Estudios realizados' },
    ].filter(tab => tab.id !== 'curvas' || this.growthEnabled()) as RecordTabItem[];
  });

  readonly checkups = signal<MedicalCheckupDetailDTO[]>([]);
  readonly isLoadingCheckups = signal<boolean>(false);

  // Universal Encounters state
  readonly encounters = signal<ClinicalEncounterList[]>([]);
  readonly isLoadingEncounters = signal<boolean>(false);
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
  readonly savedPrescriptionRecords = this.prescriptionStore.records;
  readonly rxErrorMessage = this.prescriptionStore.error;
  readonly rxSuccessMessage = this.prescriptionStore.success;
  readonly rxBusy = this.prescriptionStore.busy;

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

  private recordContext = '';
  constructor() {
    effect(() => {
      const patient = this.activePatientService.activePatient();
      const owner = this.authService.currentUser()?.id;
      const context = JSON.stringify([owner ?? null, patient?.id ?? null]);
      const growthEnabled = this.growthEnabled();
      untracked(() => {
        if (context !== this.recordContext) {
          this.recordContext = context; this.checkupRead++; this.encounterRead++; this.growthRead++;
          this.checkups.set([]); this.encounters.set([]); this.backendGrowthMeasurements.set([]);
          this.clearRxForm(); this.rxPatientId = null;
          this.isMoreMenuOpen.set(false); this.isNewEncounterModalOpen.set(false); this.isEditPatientModalOpen.set(false);
        }
        if (!growthEnabled && this.selectedTab() === 'curvas') this.selectedTab.set('resumen');
        if (patient?.id) {
          this.loadCheckups(patient.id);
          this.loadEncounters(patient.id);
          this.loadSavedPrescriptions(patient.id);
          this.loadGrowthCurves(patient.id);
        } else {
          this.isLoadingCheckups.set(false); this.isLoadingEncounters.set(false); this.isLoadingGrowthCurves.set(false);
          this.checkups.set([]);
          this.encounters.set([]);
          this.loadSavedPrescriptions(null);
          this.backendGrowthMeasurements.set([]);
        }
      });
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        const id = Number(idParam);
        if (!isNaN(id) && id > 0) {
          this.activePatientService.loadPatient(id);
        }
      }
    });

    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((queryParams) => {
      const tabParam = queryParams.get('tab') as PatientRecordTab | null;
      if (tabParam && ['resumen', 'historia', 'vacunas', 'curvas', 'recetas', 'estudios'].includes(tabParam)) {
        this.setTab(tabParam);
      }
    });

    const patient = this.activePatientService.activePatient();
    if (patient?.id) {
      this.loadCheckups(patient.id);
      this.loadEncounters(patient.id);
      this.loadSavedPrescriptions(patient.id);
      this.loadGrowthCurves(patient.id);
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
        this.loadGrowthCurves(patient.id);
      }
    }
  }

  @HostListener('window:encounter-created', ['$event'])
  @HostListener('window:encounter-updated', ['$event'])
  @HostListener('window:encounter-deleted', ['$event'])
  onEncounterCreated(event?: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      const patientId = this.activePatientService.patientId();
      const eventPatientId = (event as CustomEvent | undefined)?.detail?.patientId;
      if (patientId && eventPatientId === patientId) this.activePatientService.loadPatient(patientId);
    }
  }
  loadCheckups(patientId: number): void {
    const revision = ++this.checkupRead;
    const owner = this.authService.currentUser()?.id;
    this.isLoadingCheckups.set(true);
    this.checkupService.getCheckupsByPatientId(patientId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        if (revision !== this.checkupRead || patientId !== this.activePatientService.patientId() || owner !== this.authService.currentUser()?.id) return;
        this.checkups.set(data || []);
        this.isLoadingCheckups.set(false);
      },
      error: () => {
        if (revision !== this.checkupRead || patientId !== this.activePatientService.patientId() || owner !== this.authService.currentUser()?.id) return;
        this.checkups.set([]);
        this.isLoadingCheckups.set(false);
      },
    });
  }

  loadEncounters(patientId: number): void {
    const revision = ++this.encounterRead;
    const owner = this.authService.currentUser()?.id;
    this.isLoadingEncounters.set(true);
    this.clinicalEncounterService.getByPatient(patientId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        if (revision !== this.encounterRead || patientId !== this.activePatientService.patientId() || owner !== this.authService.currentUser()?.id) return;
        this.encounters.set(data || []);
        this.isLoadingEncounters.set(false);
      },
      error: () => {
        if (revision !== this.encounterRead || patientId !== this.activePatientService.patientId() || owner !== this.authService.currentUser()?.id) return;
        this.encounters.set([]);
        this.isLoadingEncounters.set(false);
      },
    });
  }

  loadGrowthCurves(patientId: number): void {
    const revision = ++this.growthRead;
    const owner = this.authService.currentUser()?.id;
    if (!this.growthEnabled()) { this.backendGrowthMeasurements.set([]); return; }
    this.isLoadingGrowthCurves.set(true);
    this.growthService.getPatientGrowthCurves(patientId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        if (revision !== this.growthRead || patientId !== this.activePatientService.patientId() || owner !== this.authService.currentUser()?.id) return;
        this.backendGrowthMeasurements.set(data || []);
        this.isLoadingGrowthCurves.set(false);
      },
      error: () => {
        if (revision !== this.growthRead || patientId !== this.activePatientService.patientId() || owner !== this.authService.currentUser()?.id) return;
        this.backendGrowthMeasurements.set([]);
        this.isLoadingGrowthCurves.set(false);
      },
    });
  }

  setTab(tab: PatientRecordTab): void {
    if (tab === 'curvas' && !this.growthEnabled()) return;
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

  openEditPatientModal(event?: Event): void {
    if (event) event.stopPropagation();
    this.isMoreMenuOpen.set(false);
    this.isEditPatientModalOpen.set(true);
  }

  closeEditPatientModal(): void {
    this.isEditPatientModalOpen.set(false);
  }

  onPatientUpdated(updatedPatient: PatientDetailDTO): void {
    this.isEditPatientModalOpen.set(false);
    if (updatedPatient.id && updatedPatient.id === this.activePatientService.patientId()) {
      this.activePatientService.setActivePatient(updatedPatient);
      this.activePatientService.loadPatient(updatedPatient.id);
    }
  }

  openNewPatientModal(event?: Event): void {
    this.openEditPatientModal(event);
  }

  openNewCheckupModal(event?: Event): void {
    if (event) event.stopPropagation();
    this.isMoreMenuOpen.set(false);
  }

  openNewEncounterModal(event?: Event): void {
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
    const owner = this.authService.currentUser()?.id;
    const context = this.recordContext;
    const current = () => context === this.recordContext && patientId === this.activePatientService.patientId() && owner === this.authService.currentUser()?.id;
    this.clinicalEncounterService.delete(encounterId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        if (!current()) return;
        if (patientId) {
          window.dispatchEvent(new CustomEvent('encounter-deleted', {detail:{patientId}}));
        }
      },
      error: (err) => {
        if (!current()) return;
        alert(err?.error?.message || 'Error al eliminar la consulta clínica.');
      },
    });
  }

  // --- Métodos para Formulario de Recetas y Estudios ---
  loadSavedPrescriptions(patientId: number | null): void {
    if (patientId !== this.rxPatientId) {
      this.clearRxForm(); this.rxPatientId = patientId;
    }
    this.prescriptionStore.setPatient(patientId);
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

  private currentRecordContext(): boolean {
    return this.recordContext === JSON.stringify([this.authService.currentUser()?.id ?? null, this.activePatientService.patientId()]);
  }
  saveCurrentRxToHistory(onSaved?: (record: SavedPrescriptionRecord) => void): void {
    if (!this.currentRecordContext()) { this.clearRxForm(); return; }
    if (this.rxBusy()) return;
    this.commitPendingRxInputs();
    const meds = this.draftPrescriptions();
    const studies = this.draftStudies();
    if (meds.length === 0 && studies.length === 0) {
      this.rxErrorMessage.set('Agregá al menos un medicamento o estudio médico (ej. Tomografía) para guardar o imprimir.');
      return;
    }
    const type: PrescriptionDocumentType = this.rxFormMode() === 'STUDY' && studies.length > 0
      ? 'STUDY_ORDERS' : meds.length > 0 ? 'PRESCRIPTION' : 'STUDY_ORDERS';
    this.prescriptionStore.save({ type, diagnosisDescription: this.rxDiagnosis().trim(),
      generalInstructions: this.rxGeneralInstructions().trim(),
      prescriptions: meds.map(item => ({ ...item })), diagnosticOrders: [...studies],
    }, onSaved);
  }

  reprintSavedRecord(record: SavedPrescriptionRecord): void {
    this.openSavedPrescription(record);
  }

  private openSavedPrescription(record: SavedPrescriptionRecord, forcedType?: PrescriptionDocumentType): void {
    if (!this.currentRecordContext() || record.patientId !== this.activePatientService.patientId()) return;
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-prescription-print-modal', { detail: {
        source: 'PRESCRIPTION_RECORD', id: record.id, patientId: record.patientId, type: forcedType || record.type,
      } }));
    }
  }

  deleteSavedRecord(recordId: number): void { this.prescriptionStore.delete(recordId); }

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

    if (this.rxBusy()) return;
    this.commitPendingRxInputs();
    const currentMeds = this.draftPrescriptions();
    const currentStudies = this.draftStudies();

    if (currentMeds.length > 0 || currentStudies.length > 0) {
      this.saveCurrentRxToHistory(saved => this.openSavedPrescription(saved, forcedType));
      return;
    }

    if (this.prescriptionStore.loadError()) {
      this.rxErrorMessage.set('Reintentá cargar el historial antes de imprimir un documento guardado.');
      return;
    }

    const latestSaved = this.savedPrescriptionRecords()[0];
    if (latestSaved) {
      this.reprintSavedRecord(latestSaved);
      return;
    }

    const latestEnc = this.encounters()[0];
    if (latestEnc && (latestEnc.prescriptions?.length ?? 0) > 0) {
      this.onPrintPrescription(latestEnc, forcedType);
      return;
    }
    this.rxErrorMessage.set('Agregá al menos un medicamento o estudio para emitir el documento.');
  }

  onPrintPrescription(enc: ClinicalEncounterList, type?: PrescriptionDocumentType): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-prescription-print-modal', { detail: {
        source: 'ENCOUNTER', id: enc.id, patientId: enc.patientId, ...(type ? {type} : {}),
      } }));
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

  // Guardians & Parents
  readonly fatherName = computed(() => {
    const g = this.activePatientService.activePatient()?.guardianInfo;
    return g?.fatherFullName || g?.firstGuardianFullName || '—';
  });

  readonly motherName = computed(() => {
    const g = this.activePatientService.activePatient()?.guardianInfo;
    return g?.motherFullName || g?.secondGuardianFullName || '—';
  });

  readonly siblingsCount = computed(() => {
    const g = this.activePatientService.activePatient()?.guardianInfo;
    if (g?.siblingsCount != null) return g.siblingsCount;
    return null;
  });

  readonly siblingsCountDisplay = computed(() => {
    const count = this.siblingsCount();
    return count !== null ? String(count) : '0';
  });

  readonly guardian1Name = computed(() => this.fatherName() !== '—' ? this.fatherName() : this.activePatientService.activePatient()?.guardianInfo?.firstGuardianFullName || '—');
  readonly guardian1Phone = computed(() => this.activePatientService.activePatient()?.guardianInfo?.firstGuardianPhone || '—');
  readonly guardian1Dni = computed(() => this.activePatientService.activePatient()?.guardianInfo?.firstGuardianNationalId || '—');
  readonly guardian2Name = computed(() => this.motherName() !== '—' ? this.motherName() : this.activePatientService.activePatient()?.guardianInfo?.secondGuardianFullName || '—');
  readonly guardian2Phone = computed(() => this.activePatientService.activePatient()?.guardianInfo?.secondGuardianPhone || '—');
  readonly guardian2Dni = computed(() => this.activePatientService.activePatient()?.guardianInfo?.secondGuardianNationalId || '—');

  readonly primaryGuardian = computed(() => {
    const g = this.activePatientService.activePatient()?.guardianInfo;
    return g?.primaryGuardian || null;
  });

  readonly primaryContactPhone = computed(() => {
    const g = this.activePatientService.activePatient()?.guardianInfo;
    return g?.primaryContactPhone || (this.guardian1Phone() !== '—' ? this.guardian1Phone() : null);
  });

  readonly hasSiblings = computed<boolean | null>(() => {
    const g = this.activePatientService.activePatient()?.guardianInfo;
    if (g?.hasSiblings != null) return g.hasSiblings;
    if (this.siblingsCount() !== null && (this.siblingsCount() ?? 0) > 0) return true;
    return null;
  });

  readonly siblingOrder = computed(() => {
    const g = this.activePatientService.activePatient()?.guardianInfo;
    if (g?.siblingOrder != null) return g.siblingOrder;
    return null;
  });

  readonly livingArrangement = computed(() => {
    const g = this.activePatientService.activePatient()?.guardianInfo;
    return g?.livingArrangement || null;
  });

  // Emergency Contact
  readonly emergencyContactInfo = computed(() => {
    const p = this.activePatientService.activePatient();
    if (!p) return null;
    return p.emergencyContact || null;
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
      (fh?.geneticDiseases && fh.geneticDiseases.length > 0) ||
      (fh?.paternalDiseases && fh.paternalDiseases.length > 0) ||
      (fh?.maternalDiseases && fh.maternalDiseases.length > 0) ||
      (fh?.siblingDiseases && fh.siblingDiseases.length > 0) ||
      this.paternalDiseases().length > 0 ||
      this.maternalDiseases().length > 0 ||
      this.siblingDiseases().length > 0
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

  readonly paternalDiseases = computed<string[]>(() => {
    const fh = this.activePatientService.activePatient()?.familyHistory;
    if (fh?.paternalDiseases && fh.paternalDiseases.length > 0) return fh.paternalDiseases;
    return [];
  });

  readonly maternalDiseases = computed<string[]>(() => {
    const fh = this.activePatientService.activePatient()?.familyHistory;
    if (fh?.maternalDiseases && fh.maternalDiseases.length > 0) return fh.maternalDiseases;
    return [];
  });

  readonly siblingDiseases = computed<string[]>(() => {
    const fh = this.activePatientService.activePatient()?.familyHistory;
    if (fh?.siblingDiseases && fh.siblingDiseases.length > 0) return fh.siblingDiseases;
    return [];
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
