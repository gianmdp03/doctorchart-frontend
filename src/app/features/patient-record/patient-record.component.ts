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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUser, lucideUsers, lucidePlus } from '@ng-icons/lucide';
import { AuthService } from '../../core/services/auth.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { PatientDetailDTO } from '../../core/models/patient.model';
import { PatientBannerComponent } from './patient-banner/patient-banner.component';
import { PatientEncountersStore } from './patient-encounters/patient-encounters.store';
import { PatientGrowthStore } from './patient-growth/patient-growth.store';
import { PatientPrescriptionEditorStore } from './patient-prescriptions/patient-prescription-editor.store';
import { PatientPrescriptionStore } from './patient-prescriptions/patient-prescription.store';
import { PatientStudiesStore } from './patient-studies/patient-studies.store';
import { PatientRecordActionsService } from '../../core/experience/patient-record-actions.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { PatientRecordModuleDirective } from './patient-record-module.directive';
import {
  PATIENT_RECORD_MODULES,
  PatientRecordTab,
  PatientRecordModule,
} from './patient-record-modules';
export interface RecordTabItem {
  id: PatientRecordTab;
  label: string;
  badge?: number | string;
  module: PatientRecordModule;
}

/** Composes the record; each clinical module owns its state and operations. */
@Component({
  selector: 'app-patient-record',
  imports: [
    NgIcon,
    PatientBannerComponent,
    PatientRecordModuleDirective,
  ],
  providers: [
    PatientEncountersStore,
    PatientGrowthStore,
    PatientPrescriptionStore,
    PatientPrescriptionEditorStore,
    PatientStudiesStore,
    provideIcons({ lucideUser, lucideUsers, lucidePlus }),
  ],
  templateUrl: './patient-record.component.html',
  styleUrl: './patient-record.component.css',
})
export class PatientRecordComponent implements OnInit {
  readonly recordActions = inject(PatientRecordActionsService);
  readonly history = inject(PatientEncountersStore);
  readonly growth = inject(PatientGrowthStore);
  readonly prescriptions = inject(PatientPrescriptionEditorStore);
  readonly activePatientService = inject(ActivePatientService);
  private readonly workspace = inject(WorkspaceStore);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private recordContext = '';
  readonly selectedTab = signal<PatientRecordTab>('resumen');

  readonly isNewEncounterModalOpen = signal<boolean>(false);

  readonly isEditPatientModalOpen = signal<boolean>(false);
  readonly tabs = computed<RecordTabItem[]>(() =>
    this.workspace
      .patientRecordTabs()
      .map((id, index) => {
        const module = PATIENT_RECORD_MODULES[id];
        const badge =
          id === 'ENCOUNTERS'
            ? this.history.encounters().length
            : id === 'GROWTH'
              ? this.growth.totalMeasurementsCount() || undefined
              : undefined;
        return { id: module.tab, label: `${index + 1}. ${module.label}`, badge, module };
      })
      .filter((tab) => tab.module.id !== 'GROWTH' || this.growth.growthEnabled()),
  );
  readonly activeTab = computed(
    () =>
      this.tabs().find((tab) => tab.id === this.selectedTab()) ??
      this.tabs().find((tab) => tab.id === 'resumen'),
  );
  constructor() {
    effect(() => {
      const context = JSON.stringify([
        this.authService.currentUser()?.id ?? null,
        this.activePatientService.patientId(),
      ]);
      const tabs = this.tabs();
      const canEdit = this.recordActions.has('EDIT_PATIENT');
      const canCreate = this.recordActions.has('NEW_ENCOUNTER');
      untracked(() => {
        if (context !== this.recordContext) {
          this.recordContext = context;
          this.isNewEncounterModalOpen.set(false);
          this.isEditPatientModalOpen.set(false);
          this.history.cancelCreatingEncounter();
        }
        if (!canEdit) this.isEditPatientModalOpen.set(false);
        if (!canCreate) {
          this.isNewEncounterModalOpen.set(false);
          this.history.cancelCreatingEncounter();
        }
        if (!tabs.some((tab) => tab.id === this.selectedTab())) this.selectedTab.set('resumen');
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
      if (tabParam) {
        this.setTab(tabParam);
      }
      if (tabParam === 'historia' && queryParams.get('nueva') === 'true') {
        this.history.startCreatingEncounter();
        this.isNewEncounterModalOpen.set(true);
      }
    });
  }
  @HostListener('window:encounter-created', ['$event'])
  @HostListener('window:encounter-updated', ['$event'])
  @HostListener('window:encounter-deleted', ['$event'])
  onEncounterCreated(event?: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      const patientId = this.activePatientService.patientId();
      const eventPatientId = (event as CustomEvent | undefined)?.detail?.patientId;
      if (patientId && eventPatientId === patientId)
        this.activePatientService.loadPatient(patientId);
    }
  }
  setTab(tab: PatientRecordTab): void {
    if (!this.tabs().some((item) => item.id === tab)) return;
    this.selectedTab.set(tab);
  }

  navigateToPatients(): void {
    this.router.navigate(['/pacientes']);
  }

  openEditPatientModal(event?: Event): void {
    if (!this.recordActions.has('EDIT_PATIENT')) return;
    if (event) event.stopPropagation();
    this.isEditPatientModalOpen.set(true);
    const patientId = this.activePatientService.patientId();
    if (patientId) {
      void this.router.navigate(['/pacientes', patientId, 'editar']);
    } else {
      void this.router.navigate(['/pacientes/nuevo']);
    }
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

  openNewEncounterModal(event?: Event): void {
    if (!this.recordActions.has('NEW_ENCOUNTER')) return;
    if (event) event.stopPropagation();
    this.setTab('historia');
    this.history.startCreatingEncounter();
    this.isNewEncounterModalOpen.set(true);
  }

  closeNewEncounterModal(): void {
    this.history.cancelCreatingEncounter();
    this.isNewEncounterModalOpen.set(false);
  }

  printDocument(): void {
    if (this.recordActions.has('PRINT_DOCUMENT'))
      this.prescriptions.printRecord(this.history.encounters()[0]);
  }

  navigateToGrowthCurves(): void {
    if (!this.recordActions.has('VIEW_GROWTH')) return;
    this.setTab('curvas');
  }
}
