import { DatePipe, DOCUMENT, JsonPipe } from '@angular/common';
import { Component, effect, inject, input, signal, untracked } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ArchivedCalculation, ArchivedPatient, ClinicalRevision } from '../../core/models/clinical-revision.model';
import { WizardFormDefinition, WizardFormValues, WizardFormulaResults } from '../../core/models/wizard-definition.model';
import { wizardRecordEntries } from '../../core/models/wizard-record-display';
import { ClinicalAccessComponent } from './clinical-access.component';
import { ClinicalDocumentToolsComponent } from './clinical-document-tools.component';
import { AccountReadScope } from '../../core/services/account-read-scope';
import { PatientService } from '../../core/services/patient.service';

const labels: Record<string, string> = {
  full_name: 'Nombre completo',
  birth_date: 'Fecha de nacimiento',
  national_id: 'Documento',
  guardian_info: 'Datos del responsable',
  family_history: 'Antecedentes familiares',
  personal_history: 'Antecedentes personales',
  chronic_conditions: 'Problemas crónicos',
  allergies: 'Alergias',
  chief_complaint: 'Motivo de consulta',
  history_of_present_illness: 'Evolución',
  physical_examination: 'Examen físico',
  primary_diagnosis_description: 'Diagnóstico',
  treatment_plan: 'Tratamiento',
  follow_up_instructions: 'Indicaciones de seguimiento',
  follow_up_date: 'Fecha de seguimiento',
  study_name: 'Estudio',
  original_file_name: 'Nombre del archivo',
  diagnosis_description: 'Diagnóstico',
  general_instructions: 'Indicaciones',
  medications: 'Medicamentos',
  orders: 'Órdenes',
  dose_id: 'Dosis',
  applied_at: 'Fecha de aplicación',
};

const sexLabels: Readonly<Record<string, string>> = {
  FEMALE: 'Femenino', MALE: 'Masculino', OTHER: 'Otro', UNKNOWN: 'Sin información',
};

const projectionLabels: Record<string, string> = {
  'patient.fullName': 'Nombre completo',
  'patient.firstName': 'Nombre',
  'patient.lastName': 'Apellido',
  'patient.nationalId': 'Documento',
  'patient.birthDate': 'Fecha de nacimiento',
  'patient.gender': 'Sexo',
  'patient.phone': 'Teléfono',
  'patient.email': 'Email',
  'patient.address': 'Domicilio',
  'patient.bloodType': 'Grupo sanguíneo',
  'patient.insurance': 'Cobertura',
  'patient.insurance.plan': 'Plan de cobertura',
  'patient.insurance.affiliate': 'Número de afiliado',
  'patient.guardianInfo.primaryGuardian': 'Responsable',
  'patient.guardianInfo.motherFullName': 'Nombre de la madre',
  'patient.guardianInfo.fatherFullName': 'Nombre del padre',
  'patient.guardianInfo.primaryContactPhone': 'Teléfono de contacto',
  'patient.guardianInfo.hasSiblings': 'Tiene hermanos',
  'patient.guardianInfo.livingArrangement': 'Convivencia',
  'patient.guardianInfo.siblingsCount': 'Cantidad de hermanos',
  'patient.guardianInfo.siblingOrder': 'Orden entre hermanos',
  'patient.familyHistory.paternalDiseases': 'Antecedentes paternos',
  'patient.familyHistory.maternalDiseases': 'Antecedentes maternos',
  'patient.familyHistory.siblingDiseases': 'Antecedentes de hermanos',
  'encounter.chiefComplaint': 'Motivo de consulta',
  'encounter.historyOfPresentIllness': 'Evolución',
  'encounter.physicalExamination': 'Examen físico',
  'encounter.primaryDiagnosisDescription': 'Diagnóstico',
  'encounter.treatmentPlan': 'Tratamiento',
  'encounter.followUpInstructions': 'Indicaciones de seguimiento',
  'encounter.followUpDate': 'Fecha de seguimiento',
  'encounter.weightKg': 'Peso (kg)',
  'encounter.heightCm': 'Talla (cm)',
  'encounter.headCircumferenceCm': 'Perímetro cefálico (cm)',
};

@Component({
  selector: 'app-clinical-revisions',
  host: { '[attr.data-embedded]': 'embedded() ? "" : null' },
  imports: [DatePipe, JsonPipe, ClinicalAccessComponent, ClinicalDocumentToolsComponent],
  templateUrl: './clinical-revisions.component.html',
  styles: [`
    :host { display: block; }
    :host:not([data-embedded]) { margin-block: .75rem; }
    section { display: grid; gap: .75rem; }
    h3, h4, p { margin: 0; }
    h3 { color: var(--dc-text); font-size: 1rem; font-weight: 650; }
    section > button { justify-self: start; }
    details { padding: .75rem; border: 1px solid var(--dc-line); border-radius: var(--dc-radius-control); background: var(--dc-subtle); }
    summary { cursor: pointer; color: var(--dc-text); font-weight: 600; }
    details[open] > summary { margin-bottom: .65rem; }
    details > * + * { margin-block-start: .5rem; }
    .revision-entry { background: var(--dc-paper); padding: .85rem; }
    .revision-entry > summary { line-height: 1.5; }
    .revision-type { font-size: .75rem; color: var(--dc-brand-ink); margin-right: .35rem; }
    .revision-type.annulled { color: var(--dc-danger); }
    .revision-date, .revision-note { display: block; color: var(--dc-text-secondary); font-size: .8125rem; font-weight: 400; }
    .revision-date { margin-left: 1rem; font-variant-numeric: tabular-nums; }
    .revision-fields { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr)); gap: .65rem 1rem; padding: .8rem; margin-bottom: .75rem; border-radius: var(--dc-radius-control); background: var(--dc-subtle); }
    .revision-field { min-width: 0; }
    .revision-field dd { margin: .15rem 0 0; }
    .revision-technical { font-size: .8125rem; color: var(--dc-text-secondary); overflow-wrap: anywhere; }
    .revision-technical pre { max-height: 14rem; overflow: auto; }
    dt { color: var(--dc-text-secondary); font-weight: 600; }
    dd, pre { white-space: pre-wrap; overflow-wrap: anywhere; margin: 0 0 .5rem; }
  `],
})
export class ClinicalRevisionsComponent {
  readonly embedded = input(false);
  readonly standalonePage = input(false);
  readonly patientId = input<number>();
  readonly encounterId = input<number>();
  readonly version = input<number>();
  readonly opened = signal(false);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly archived = signal<ArchivedPatient[]>([]);
  readonly selected = signal<ArchivedPatient | null>(null);
  readonly revisions = signal<ClinicalRevision[]>([]);
  readonly nextBefore = signal<number | null>(null);
  readonly calculationsEnabled = signal(false);
  readonly calculations = signal<ArchivedCalculation[] | null>(null);
  readonly nextCalculation = signal<number | null>(null);
  readonly entityLabels = {
    PATIENT: 'Ficha clínica', ENCOUNTER: 'Consulta', PRESCRIPTION: 'Receta u orden',
    STUDY: 'Estudio', VACCINATION: 'Vacunación',
  };
  private readonly patients = inject(PatientService);
  private readonly document = inject(DOCUMENT);
  private readonly scope = new AccountReadScope(() => this.close());

  constructor() {
    effect(() => {
      this.patientId();
      this.encounterId();
      this.version();
      const openOnLoad = this.embedded() || this.standalonePage();
      untracked(() => {
        this.close();
        if (openOnLoad) this.show();
      });
    });
  }

  show(): void {
    this.opened.set(true);
    const id = this.patientId();
    if (id) this.loadRevisions(id);
    else this.loadArchived();
  }

  close(): void {
    this.scope.cancel();
    this.opened.set(false);
    this.loading.set(false);
    this.error.set('');
    this.selected.set(null);
    this.revisions.set([]);
    this.archived.set([]);
    this.nextBefore.set(null);
    this.clearCalculations();
  }

  loadArchived(before?: number): void {
    const current = this.scope.begin();
    this.selected.set(null);
    this.revisions.set([]);
    this.clearCalculations();
    if (!before) {
      this.archived.set([]);
      this.nextBefore.set(null);
    }
    this.loading.set(true);
    this.error.set('');
    this.patients.getArchivedPatients(before).pipe(takeUntil(this.scope.canceled)).subscribe({
      next: (page) => {
        if (!current()) return;
        this.archived.update((items) => [...items, ...page.items]);
        this.nextBefore.set(page.nextBefore);
        this.loading.set(false);
      },
      error: () => this.fail(current, 'No se pudieron consultar las fichas anuladas.'),
    });
  }

  loadRevisions(patientId: number, before?: number): void {
    const current = this.scope.begin();
    if (!before) {
      this.revisions.set([]);
      this.nextBefore.set(null);
      this.clearCalculations();
    }
    this.loading.set(true);
    this.error.set('');
    this.patients.getRevisions(patientId, before, this.encounterId()).pipe(takeUntil(this.scope.canceled)).subscribe({
      next: (page) => {
        if (!current()) return;
        this.selected.set(page.patient);
        this.calculationsEnabled.set(page.calculationsEnabled === true && !this.encounterId());
        this.revisions.update((items) => [...items, ...page.items]);
        this.nextBefore.set(page.nextBefore);
        this.loading.set(false);
      },
      error: () => this.fail(current, 'No se pudo consultar el historial.'),
    });
  }

  loadCalculations(before?: number): void {
    const patient = this.selected();
    if (!patient || !this.calculationsEnabled() || this.loading()) return;
    const current = this.scope.begin();
    this.loading.set(true);
    this.error.set('');
    this.patients.getArchivedCalculations(patient.id, before).pipe(takeUntil(this.scope.canceled)).subscribe({
      next: (page) => {
        if (!current()) return;
        this.calculations.update(items => before ? [...(items ?? []), ...page.items] : page.items);
        this.nextCalculation.set(page.nextBefore);
        this.loading.set(false);
      },
      error: () => this.fail(current, 'No se pudieron consultar los cálculos archivados.'),
    });
  }

  private clearCalculations(): void {
    this.calculationsEnabled.set(false);
    this.calculations.set(null);
    this.nextCalculation.set(null);
  }

  fields(revision: ClinicalRevision): { label: string; value: unknown }[] {
    const previous = revision.previous;
    if (revision.entity === 'PATIENT' || revision.entity === 'ENCOUNTER') {
      if (revision.derivedProjections !== undefined) {
        return Object.entries(revision.derivedProjections)
          .sort(([left], [right]) => left.localeCompare(right))
          .filter(([, value]) => value !== null && value !== undefined && value !== '')
          .filter(([key]) => !this.embedded() || Object.hasOwn(projectionLabels, key))
          .filter(([key]) => !this.embedded() ||
            (key !== 'patient.firstName' && key !== 'patient.lastName') || !revision.derivedProjections?.['patient.fullName'])
          .map(([key, value]) => ({
            label: projectionLabels[key] ?? key,
            value: this.formatField(key, value),
          }));
      }
      const snapshot = previous['form_definition_snapshot'] as WizardFormDefinition | undefined;
      if (!snapshot?.categories) return [];
      return wizardRecordEntries({
        formDefinitionSnapshot: snapshot,
        formValues: (previous['form_values'] ?? {}) as WizardFormValues,
        formulaResults: (previous['formula_results'] ?? {}) as WizardFormulaResults,
        version: revision.previousVersion,
        workspaceVersion: 0,
        formulaContext: {},
      });
    }
    const rows = Object.entries(labels).map(([key, label]) => ({ label, value: previous[key] }));
    const snapshot = previous['form_definition_snapshot'] as { categories?: Array<{ fields?: Array<{ key: string; label: string }> }> } | undefined;
    const values = previous['form_values'] as Record<string, unknown> | undefined;
    const fieldLabels = new Map(snapshot?.categories?.flatMap(
      (category) => (category.fields ?? []).map((field) => [field.key, field.label] as const),
    ));
    for (const [key, value] of Object.entries(values ?? {})) {
      rows.push({ label: fieldLabels.get(key) ?? key, value });
    }
    return rows.filter(({ value }) => value !== null && value !== undefined && value !== '');
  }

  private formatField(key: string, value: unknown): unknown {
    if (typeof value === 'boolean') return value ? 'Sí' : 'No';
    if (typeof value !== 'string') return value;
    if (key === 'patient.gender') return Object.hasOwn(sexLabels, value) ? sexLabels[value] : value;
    if ((key === 'patient.birthDate' || key === 'encounter.followUpDate') && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split('-');
      return day + '/' + month + '/' + year;
    }
    return value;
  }

  isText(value: unknown): boolean {
    return typeof value === 'string' || typeof value === 'number';
  }

  download(revision: ClinicalRevision): void {
    const patient = this.selected();
    if (!patient || this.loading()) return;
    const current = this.scope.begin();
    this.loading.set(true);
    this.error.set('');
    this.patients.getArchivedStudy(patient.id, revision.entityId).pipe(takeUntil(this.scope.canceled)).subscribe({
      next: (blob) => {
        if (!current()) return;
        this.loading.set(false);
        const url = URL.createObjectURL(blob);
        const link = this.document.createElement('a');
        link.href = url;
        const name = revision.previous['original_file_name'];
        link.download = typeof name === 'string' ? name : 'estudio-anulado';
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      },
      error: () => this.fail(current, 'No se pudo descargar el adjunto histórico.'),
    });
  }

  retry(): void {
    const id = this.selected()?.id ?? this.patientId();
    if (id) this.loadRevisions(id);
    else this.loadArchived();
  }

  private fail(current: () => boolean, message: string): void {
    if (!current()) return;
    this.loading.set(false);
    this.error.set(message);
  }
}
