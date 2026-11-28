import { CdkTrapFocus } from '@angular/cdk/a11y';
import { ClinicalContextService } from '../../core/services/clinical-context.service';
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
  afterEveryRender,
  afterNextRender,
  Injector,
  ElementRef,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PatientService } from '../../core/services/patient.service';
import { ClinicalAccessComponent } from './clinical-access.component';
import { ClinicalRevisionsComponent } from './clinical-revisions.component';
import { ClinicalDocumentToolsComponent } from './clinical-document-tools.component';
import { AnnulmentPromptComponent } from './annulment-prompt.component';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUser, lucideUsers, lucidePlus, lucideEllipsis, lucideChevronRight, lucideArrowLeft, lucideHistory, lucideShieldCheck, lucideFiles } from '@ng-icons/lucide';
import { AuthService } from '../../core/services/auth.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { PatientDetailDTO } from '../../core/models/patient.model';
import { PatientBannerComponent } from './patient-banner/patient-banner.component';
import { PatientEncountersStore } from './patient-encounters/patient-encounters.store';
import { PatientGrowthStore } from './patient-growth/patient-growth.store';
import { PatientPrescriptionEditorStore } from './patient-prescriptions/patient-prescription-editor.store';
import { PatientPrescriptionStore } from './patient-prescriptions/patient-prescription.store';
import { PatientStudiesStore } from './patient-studies/patient-studies.store';
import { PatientWhatsappConsultationsStore } from './patient-whatsapp-consultations/patient-whatsapp-consultations.store';
import { PatientRecordActionsService } from '../../core/experience/patient-record-actions.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { PatientRecordModuleDirective } from './patient-record-module.directive';
import {
  PATIENT_RECORD_MODULES,
  WHATSAPP_CONSULTATIONS_MODULE,
  PatientRecordTab,
  PatientRecordModule,
} from './patient-record-modules';
type ManagementSection = 'access' | 'revisions' | 'documents' | 'annul';

export interface RecordTabItem {
  id: PatientRecordTab;
  label: string;
  badge?: number | string;
  module: PatientRecordModule;
}

/** Composes the record; each clinical module owns its state and operations. */
@Component({
  selector: 'app-patient-record',
  imports: [CdkTrapFocus,
    NgIcon,
    PatientBannerComponent,
    PatientRecordModuleDirective,
    ClinicalAccessComponent,
    ClinicalRevisionsComponent,
    ClinicalDocumentToolsComponent,
    AnnulmentPromptComponent,
  ],
  providers: [
    PatientEncountersStore,
    PatientGrowthStore,
    PatientPrescriptionStore,
    PatientPrescriptionEditorStore,
    PatientStudiesStore,
    PatientWhatsappConsultationsStore,
    provideIcons({ lucideUser, lucideUsers, lucidePlus, lucideEllipsis, lucideChevronRight, lucideArrowLeft, lucideHistory, lucideShieldCheck, lucideFiles }),
  ],
  templateUrl: './patient-record.component.html',
  styleUrl: './patient-record.component.css',
})
export class PatientRecordComponent implements OnInit {
  private readonly clinicalScope = inject(ClinicalContextService);
  private requestedPatientId: number | null = null;
  readonly recordActions = inject(PatientRecordActionsService);
  readonly history = inject(PatientEncountersStore);
  readonly growth = inject(PatientGrowthStore);
  readonly prescriptions = inject(PatientPrescriptionEditorStore);
  readonly whatsapp = inject(PatientWhatsappConsultationsStore);
  readonly activePatientService = inject(ActivePatientService);
  private readonly patientApi = inject(PatientService);
  private readonly workspace = inject(WorkspaceStore);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private scrolledSource = '';
  private recordContext = JSON.stringify([
    this.authService.currentUser()?.id ?? null,
      this.clinicalScope.id(),
    this.activePatientService.patientId(),
  ]);
  readonly selectedTab = signal<PatientRecordTab>('resumen');

  readonly isEncounterFormOpen = signal<boolean>(false);

  readonly isPatientEditorOpen = signal<boolean>(false);
  private readonly injector = inject(Injector);
  private readonly managementDialog = viewChild<ElementRef<HTMLDialogElement>>('managementDialog');
  readonly managementSection = signal<ManagementSection | null>(null);
  readonly managementTools = [
    { id: 'revisions', title: 'Revisiones de la ficha', icon: 'lucideHistory',
      description: 'Consultá cuándo se corrigió o anuló un registro, el motivo si se informó y cómo estaba antes.' },
    { id: 'documents', title: 'Documentos y exportación', icon: 'lucideFiles',
      description: 'Recuperá el PDF original de una receta u orden, o descargá una copia de la ficha de esta especialidad.' },
    { id: 'access', title: 'Accesos a la ficha', icon: 'lucideShieldCheck',
      description: 'Revisá cuándo se consultaron datos de esta ficha, qué se abrió y si el acceso fue autorizado.' },
  ] as const;
  readonly annulling = signal(false);
  readonly annulmentError = signal('');
  readonly tabs = computed<RecordTabItem[]>(() => {
    const configured = this.workspace.patientRecordTabs();
    const base = configured
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
      .filter((tab) => tab.module.id !== 'GROWTH' || this.growth.growthEnabled());
    if (configured.includes('ENCOUNTERS')) {
      const badge =
        this.whatsapp.loaded() && this.whatsapp.consultations().length > 0
          ? this.whatsapp.consultations().length
          : undefined;
      base.push({
        id: WHATSAPP_CONSULTATIONS_MODULE.tab,
        label: `${configured.length + 1}. ${WHATSAPP_CONSULTATIONS_MODULE.label}`,
        badge,
        module: WHATSAPP_CONSULTATIONS_MODULE,
      });
    }
    return base;
  });
  readonly activeTab = computed(
    () =>
      this.tabs().find((tab) => tab.id === this.selectedTab()) ??
      this.tabs().find((tab) => tab.id === 'resumen'),
  );
  constructor() {
    afterEveryRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      const fragment = this.route.snapshot?.fragment;
      if (!fragment) { this.scrolledSource = ''; return; }
      const key = `${this.activePatientService.patientId()}:${this.selectedTab()}:${fragment}`;
      if (this.scrolledSource === key) return;
      const source = this.document.getElementById(fragment);
      if (source) {
        source.scrollIntoView({ block: 'center' });
        source.focus({ preventScroll: true });
        this.scrolledSource = key;
      } else {
        this.scrolledSource = '';
      }
    });
    effect(() => {
      const context = JSON.stringify([
        this.authService.currentUser()?.id ?? null,
      this.clinicalScope.id(),
        this.activePatientService.patientId(),
      ]);
      const tabs = this.tabs();
      const managementSection = this.managementSection();
      const canEdit = this.recordActions.has('EDIT_PATIENT');
      const canCreate = this.recordActions.has('NEW_ENCOUNTER');
      untracked(() => {
        if (context !== this.recordContext) {
          this.recordContext = context;
          this.isEncounterFormOpen.set(false);
          this.isPatientEditorOpen.set(false);
          const dialog = this.managementDialog()?.nativeElement;
          if (dialog?.open) dialog.close();
          this.resetManagement();
          this.annulling.set(false);
          this.history.cancelCreatingEncounter();
        }
        if (!canEdit) {
          this.isPatientEditorOpen.set(false);
          if (managementSection === 'annul') this.resetManagement();
        }
        if (!canCreate) {
          this.isEncounterFormOpen.set(false);
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
          this.requestedPatientId = id;
          this.activePatientService.loadPatient(id);
        }
      }
    });

    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((queryParams) => {
      const urlTab = queryParams.get('tab');
      const englishTabs: Record<string, PatientRecordTab> = {
        summary: 'resumen', history: 'historia', vaccinations: 'vacunas',
        growth: 'curvas', prescriptions: 'recetas', studies: 'estudios', whatsapp: 'whatsapp',
      };
      const tabParam = (urlTab && (englishTabs[urlTab] ?? urlTab)) as PatientRecordTab | null;
      if (tabParam) {
        this.setTab(tabParam);
      }
      if (tabParam === 'historia' && (queryParams.get('new') ?? queryParams.get('nueva')) === 'true') {
        this.history.startCreatingEncounter();
        this.isEncounterFormOpen.set(true);
      }
    });
  }
  retryPatientLoad(): void {
    if (this.requestedPatientId !== null) this.activePatientService.loadPatient(this.requestedPatientId);
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
    this.router.navigate(['/patients']);
  }

  selectManagement(section: ManagementSection | null): void {
    this.managementSection.set(section);
    this.annulmentError.set('');
    afterNextRender(() => {
      const dialog = this.managementDialog()?.nativeElement;
      if (!dialog?.open) return;
      const body = dialog.querySelector<HTMLElement>('.management-body');
      if (!body) return;
      body.scrollTop = 0;
      body.querySelector<HTMLElement>(section ? '[data-tool-heading]' : '.management-option')?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }

  cancelManagement(event: Event): void {
    if (this.annulling()) event.preventDefault();
  }

  resetManagement(): void {
    this.managementSection.set(null);
    this.annulmentError.set('');
  }

  annulPatient(patient: PatientDetailDTO, reason: string): void {
    const owner = this.authService.currentUser()?.id;
    const context = this.clinicalScope.id();
    const current = () => owner === this.authService.currentUser()?.id &&
      context === this.clinicalScope.id() && patient.id === this.activePatientService.patientId();
    if (!owner || !current() || !this.recordActions.has('EDIT_PATIENT') || this.annulling()) return;
    this.annulling.set(true);
    this.annulmentError.set('');
    this.patientApi.deletePatient(patient.id, reason, patient.version)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          if (!current()) return;
          this.activePatientService.clear();
          this.navigateToPatients();
        },
        error: (error) => {
          if (!current()) return;
          this.annulling.set(false);
          this.annulmentError.set(error?.status === 409
            ? 'La ficha cambió. Actualizala antes de anularla.'
            : 'No se pudo anular la ficha clínica.');
        },
      });
  }

  editPatient(event?: Event): void {
    if (!this.recordActions.has('EDIT_PATIENT')) return;
    if (event) event.stopPropagation();
    this.isPatientEditorOpen.set(true);
    const patientId = this.activePatientService.patientId();
    if (patientId) {
      void this.router.navigate(['/patients', patientId, 'edit']);
    } else {
      void this.router.navigate(['/patients/new']);
    }
  }

  closePatientEditor(): void {
    this.isPatientEditorOpen.set(false);
  }

  onPatientUpdated(updatedPatient: PatientDetailDTO): void {
    this.isPatientEditorOpen.set(false);
    if (updatedPatient.id && updatedPatient.id === this.activePatientService.patientId()) {
      this.activePatientService.setActivePatient(updatedPatient);
      this.activePatientService.loadPatient(updatedPatient.id);
    }
  }

  createEncounter(event?: Event): void {
    if (!this.recordActions.has('NEW_ENCOUNTER')) return;
    if (event) event.stopPropagation();
    this.setTab('historia');
    this.history.startCreatingEncounter();
    this.isEncounterFormOpen.set(true);
  }

  closeEncounterForm(): void {
    this.history.cancelCreatingEncounter();
    this.isEncounterFormOpen.set(false);
  }

  navigateToGrowthCurves(): void {
    if (!this.recordActions.has('VIEW_GROWTH')) return;
    this.setTab('curvas');
  }
}
