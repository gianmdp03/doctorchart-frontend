import { formatInstant } from '../../../core/date/user-time-zone';
import {
  computed,
  DestroyRef,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
  untracked,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ActivePatientService } from '../../../core/services/active-patient.service';
import { PatientRecordActionsService } from '../../../core/experience/patient-record-actions.service';
import { WorkspaceStore } from '../../../core/services/workspace.store';
import { PatientPrescriptionStore } from './patient-prescription.store';
import {
  SavedPrescriptionRecord,
  PrescriptionDocumentType,
} from '../../../core/models/prescription.model';
import {
  ClinicalEncounterList,
  PrescriptionItem,
} from '../../../core/models/clinical-encounter.model';
import { ClinicalDocumentPrintService } from '../../../core/services/clinical-document-print.service';
import { PrintDocumentReference } from '../../../core/models/clinical-print-document.model';
import { parseNumberInput, textError } from '../../../core/models/form-validation';
export type PrescriptionOrderFormMode = 'MEDICATION' | 'STUDY';

/** Record-scoped editor, independent of the consultation and growth modules. */
@Injectable()
export class PatientPrescriptionEditorStore {
  private readonly workspace = inject(WorkspaceStore);
  readonly prescriptionsEnabled = computed(() => this.workspace.hasRecordTab('PRESCRIPTIONS'));
  readonly recordActions = inject(PatientRecordActionsService);
  readonly prescriptionStore = inject(PatientPrescriptionStore);
  readonly activePatientService = inject(ActivePatientService);
  readonly authService = inject(AuthService);
  private readonly printService = inject(ClinicalDocumentPrintService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private recordContext = '';

  readonly rxFormMode = signal<PrescriptionOrderFormMode>('MEDICATION');

  readonly rxMedicationName = signal<string>('');

  readonly rxDosage = signal<string>('');

  readonly rxFrequency = signal<string>('Cada 8 horas');

  readonly rxAdministrationRoute = signal<string>('Vía Oral');

  readonly rxDurationDays = signal<number | string | null>(null);

  readonly rxMedInstructions = signal<string>('');

  readonly rxStudyName = signal<string>('');

  readonly rxStudySpecification = signal<string>('');

  readonly rxDiagnosis = signal<string>('');

  readonly rxGeneralInstructions = signal<string>('');

  readonly draftPrescriptions = signal<PrescriptionItem[]>([]);

  readonly draftStudies = signal<string[]>([]);

  readonly medicationAttempted = signal(false);
  readonly studyAttempted = signal(false);
  readonly documentAttempted = signal(false);
  readonly medicationErrors = computed(() => ({
    name: textError(this.rxMedicationName(), 200, true),
    dosage: textError(this.rxDosage(), 500),
    frequency: textError(this.rxFrequency(), 200, true),
    route: textError(this.rxAdministrationRoute(), 200, true),
    duration: this.rxDurationDays() == null ? null : typeof this.rxDurationDays() !== 'number' || !Number.isInteger(this.rxDurationDays()) || Number(this.rxDurationDays()) < 1 || Number(this.rxDurationDays()) > 2147483647 ? 'Ingresá una duración en días enteros mayor que cero.' : null,
    instructions: textError(this.rxMedInstructions(), 4000),
  }));
  readonly studyErrors = computed(() => ({
    name: textError(this.rxStudyName(), 2000, true),
    specification: textError(this.rxStudySpecification(), 2000) || (this.formattedStudy().length > 2000 ? 'El estudio y su especificación admiten hasta 2000 caracteres en total.' : null),
  }));
  readonly diagnosisError = computed(() => textError(this.rxDiagnosis(), 4000));
  readonly generalInstructionsError = computed(() => textError(this.rxGeneralInstructions(), 4000));
  readonly medicationValid = computed(() => !Object.values(this.medicationErrors()).some(Boolean));
  readonly studyValid = computed(() => !Object.values(this.studyErrors()).some(Boolean));
  setDuration(raw: string): void { this.rxDurationDays.set(parseNumberInput(raw)); }
  private formattedStudy(): string { const name = this.rxStudyName().trim(), spec = this.rxStudySpecification().trim(); return spec ? `${name} — ${spec}` : name; }

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
  readonly patientNationalId = computed(() => {
    const p = this.activePatientService.activePatient();
    return p?.nationalId || '—';
  });

  readonly habitualMedication = computed(() => {
    return this.activePatientService.activePatient()?.personalHistory?.habitualMedication || [];
  });
  constructor() {
    effect(() => {
      const patient = this.activePatientService.activePatient();
      this.authService.currentUser();
      const enabled = this.prescriptionsEnabled();
      untracked(() => {
        const context = this.contextKey();
        if (context !== this.recordContext) {
          this.recordContext = context;
          this.clearRxForm();
        }
        if (!enabled) this.clearRxForm();
        this.prescriptionStore.setPatient(enabled ? patient?.id ?? null : null);
      });
    });
  }
  private contextKey(): string {
    return JSON.stringify([
      this.authService.currentUser()?.id ?? null,
      this.activePatientService.patientId(),
    ]);
  }
  private currentRecordContext(): boolean {
    return this.recordContext === this.contextKey() && !this.destroyRef.destroyed;
  }
  setRxFormMode(mode: PrescriptionOrderFormMode): void {
    this.rxFormMode.set(mode);
    this.rxErrorMessage.set(null);
    this.rxSuccessMessage.set(null);
  }

  addMedicationToDraft(): void {
    this.medicationAttempted.set(true);
    const name = this.rxMedicationName().trim();
    if (!this.medicationValid() || this.draftPrescriptions().length >= 100) {
      this.rxErrorMessage.set(Object.values(this.medicationErrors()).find(Boolean) || 'Podés agregar hasta 100 medicamentos.');
      return;
    }

    const newItem: PrescriptionItem = {
      medicationName: name,
      dosage: this.rxDosage().trim() || 'Según indicación',
      frequency: this.rxFrequency().trim() || 'Cada 24 horas',
      administrationRoute: this.rxAdministrationRoute().trim() || 'Vía Oral',
      durationDays:
        this.rxDurationDays() && Number(this.rxDurationDays()) > 0
          ? Number(this.rxDurationDays())
          : null,
      instructions: this.rxMedInstructions().trim() || undefined,
    };

    this.draftPrescriptions.update((list) => [...list, newItem]);
    this.medicationAttempted.set(false);
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
    this.studyAttempted.set(true);
    const name = this.rxStudyName().trim();
    if (!this.studyValid() || this.draftStudies().length >= 100) {
      this.rxErrorMessage.set(Object.values(this.studyErrors()).find(Boolean) || 'Podés agregar hasta 100 estudios.');
      return;
    }

    const spec = this.rxStudySpecification().trim();
    const formattedStudy = spec ? `${name} — ${spec}` : name;

    this.draftStudies.update((list) => [...list, formattedStudy]);
    this.studyAttempted.set(false);
    this.rxStudyName.set('');
    this.rxStudySpecification.set('');
    this.rxErrorMessage.set(null);
    this.rxSuccessMessage.set(null);
  }

  removeStudyFromDraft(index: number): void {
    this.draftStudies.update((list) => list.filter((_, i) => i !== index));
  }

  prescribeHabitualMedication(medName: string): void {
    if (textError(medName, 200, true) || this.draftPrescriptions().length >= 100) { this.rxErrorMessage.set('Revisá el medicamento y el límite de 100 elementos por receta.'); return; }
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
    this.medicationAttempted.set(false); this.studyAttempted.set(false); this.documentAttempted.set(false);
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

  private commitPendingRxInputs(): boolean {
    this.documentAttempted.set(true);
    const medicationPending = !!(this.rxMedicationName() || this.rxDosage() || this.rxDurationDays() != null || this.rxMedInstructions());
    const studyPending = !!(this.rxStudyName() || this.rxStudySpecification());
    if (medicationPending) this.medicationAttempted.set(true);
    if (studyPending) this.studyAttempted.set(true);
    const error = this.diagnosisError() || this.generalInstructionsError()
      || (medicationPending && Object.values(this.medicationErrors()).find(Boolean))
      || (studyPending && Object.values(this.studyErrors()).find(Boolean));
    if (error) { this.rxErrorMessage.set(error); return false; }
    if ((medicationPending && this.draftPrescriptions().length >= 100) || (studyPending && this.draftStudies().length >= 100)) { this.rxErrorMessage.set('Podés agregar hasta 100 elementos por lista.'); return false; }
    if (medicationPending) {
      this.addMedicationToDraft();
    }
    if (studyPending) {
      this.addStudyToDraft();
    }
    return true;
  }

  saveCurrentRxToHistory(onSaved?: (record: SavedPrescriptionRecord) => void): void {
    if (!this.prescriptionsEnabled()) return;
    if (!this.currentRecordContext()) {
      this.clearRxForm();
      return;
    }
    if (this.rxBusy()) return;
    if (!this.commitPendingRxInputs()) return;
    const meds = this.draftPrescriptions();
    const studies = this.draftStudies();
    if (meds.length === 0 && studies.length === 0) {
      this.rxErrorMessage.set(
        'Agregá al menos un medicamento o estudio médico (ej. Tomografía) para guardar o imprimir.',
      );
      return;
    }
    const type: PrescriptionDocumentType =
      this.rxFormMode() === 'STUDY' && studies.length > 0
        ? 'STUDY_ORDERS'
        : meds.length > 0
          ? 'PRESCRIPTION'
          : 'STUDY_ORDERS';
    this.prescriptionStore.save(
      {
        type,
        diagnosisDescription: this.rxDiagnosis().trim(),
        generalInstructions: this.rxGeneralInstructions().trim(),
        prescriptions: meds.map((item) => ({ ...item })),
        diagnosticOrders: [...studies],
      },
      onSaved,
    );
  }

  reprintSavedRecord(record: SavedPrescriptionRecord): void {
    this.openSavedPrescription(record);
  }

  private openSavedPrescription(
    record: SavedPrescriptionRecord,
    forcedType?: PrescriptionDocumentType,
  ): void {
    if (!this.prescriptionsEnabled() || !this.recordActions.has('PRINT_DOCUMENT') || !this.currentRecordContext() || record.patientId !== this.activePatientService.patientId())
      return;
    const ref: PrintDocumentReference = {
      source: 'PRESCRIPTION_RECORD',
      id: record.id,
      patientId: record.patientId,
      type: forcedType || record.type,
    };
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('document-print-requested', {
          detail: ref,
        }),
      );
      this.printService.openPdfInNewTab(ref);
    }
  }

  deleteSavedRecord(recordId: number): void {
    if (!this.prescriptionsEnabled()) return;
    this.prescriptionStore.delete(recordId);
  }

  formatRxDate(isoString: string): string { return formatInstant(isoString, false); }

  printRecord(
    latestEncounter?: ClinicalEncounterList,
    forcedType?: PrescriptionDocumentType,
  ): void {
    if (!this.recordActions.has('PRINT_DOCUMENT')) return;
    if (!this.prescriptionsEnabled()) {
      if (latestEncounter && (latestEncounter.prescriptions?.length ?? 0) > 0) this.onPrintPrescription(latestEncounter, forcedType);
      else this.rxErrorMessage.set('La consulta no tiene un documento registrado para imprimir.');
      return;
    }
    if (!isPlatformBrowser(this.platformId) || typeof window === 'undefined') {
      return;
    }

    if (this.rxBusy()) return;
    if (!this.commitPendingRxInputs()) return;
    const currentMeds = this.draftPrescriptions();
    const currentStudies = this.draftStudies();

    if (currentMeds.length > 0 || currentStudies.length > 0) {
      this.saveCurrentRxToHistory((saved) => this.openSavedPrescription(saved, forcedType));
      return;
    }

    if (this.prescriptionStore.loadError()) {
      this.rxErrorMessage.set(
        'Reintentá cargar el historial antes de imprimir un documento guardado.',
      );
      return;
    }

    const latestSaved = this.savedPrescriptionRecords()[0];
    if (latestSaved) {
      this.reprintSavedRecord(latestSaved);
      return;
    }

    const latestEnc = latestEncounter;
    if (latestEnc && (latestEnc.prescriptions?.length ?? 0) > 0) {
      this.onPrintPrescription(latestEnc, forcedType);
      return;
    }
    this.rxErrorMessage.set('Agregá al menos un medicamento o estudio para emitir el documento.');
  }

  onPrintPrescription(enc: ClinicalEncounterList, type?: PrescriptionDocumentType): void {
    if (!this.recordActions.has('PRINT_DOCUMENT')) return;
    const ref: PrintDocumentReference = {
      source: 'ENCOUNTER',
      id: enc.id,
      patientId: enc.patientId,
      ...(type ? { type } : {}),
    };
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('document-print-requested', {
          detail: ref,
        }),
      );
      this.printService.openPdfInNewTab(ref);
    }
  }
}
