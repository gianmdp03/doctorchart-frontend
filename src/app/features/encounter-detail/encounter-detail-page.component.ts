import { UserClockService } from '../../core/services/user-clock.service';
import { Component, computed, DestroyRef, effect, inject, OnDestroy, OnInit, signal, viewChild, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { AuthService } from '../../core/services/auth.service';
import { ClinicalEncounterDetail, ConsultationType } from '../../core/models/clinical-encounter.model';
import { WizardFormValues, WizardFormulaResults } from '../../core/models/wizard-definition.model';
import { DynamicFormRendererComponent, inputValues } from '../dynamic-form-renderer/dynamic-form-renderer.component';
import { userDateTime, conflictKind, errorMessage } from '../dynamic-form-renderer/clinical-form-ui';

@Component({
  selector: 'app-encounter-detail-page',
  imports: [FormsModule, RouterLink, DynamicFormRendererComponent],
  templateUrl: './encounter-detail-page.component.html',
  styleUrl: './encounter-detail-page.component.css',
})
export class EncounterDetailPageComponent implements OnInit, OnDestroy {
  private readonly service = inject(ClinicalEncounterService);
  private readonly auth = inject(AuthService);
  private readonly activePatient = inject(ActivePatientService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly clock = inject(UserClockService);
  private epoch = 0;
  private destroyed = false;
  private owner = this.identity();
  readonly requestedId = signal<number | null>(null);
  readonly isLoading = signal(false);
  readonly isSubmitting = signal(false);
  readonly isEditing = signal(false);
  readonly encounter = signal<ClinicalEncounterDetail | null>(null);
  readonly values = signal<WizardFormValues>({});
  readonly formulaResults = signal<WizardFormulaResults>({});
  readonly consultationType = signal<ConsultationType>('FIRST_VISIT');
  readonly formValid = signal(false);
  readonly submissionAttempted = signal(false);
  private readonly formRenderer = viewChild(DynamicFormRendererComponent);
  readonly hasConflict = signal(false);
  readonly remoteRecord = signal<ClinicalEncounterDetail | null>(null);
  readonly errorMessage = signal<string | null>(null);
  readonly readonly = computed(() => !this.isEditing() || this.isLoading() || this.isSubmitting() || this.hasConflict() || this.identity() !== this.owner);
  get timeZone(): string { return this.clock.timeZone(); }
  readonly consultationTypes: { value: ConsultationType; label: string }[] = [
    { value: 'FIRST_VISIT', label: 'Primera consulta' }, { value: 'FOLLOW_UP', label: 'Control / seguimiento' },
    { value: 'ROUTINE_CHECKUP', label: 'Chequeo de rutina' }, { value: 'EMERGENCY', label: 'Urgencia' },
    { value: 'INTERCONSULTATION', label: 'Interconsulta' },
  ];

  constructor() {
    effect(() => {
      const owner = this.identity();
      untracked(() => {
        if (owner === this.owner) return;
        this.owner = owner;
        this.reset();
        this.errorMessage.set('La sesión cambió. Volvé a abrir la consulta desde el historial.');
      });
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.reset();
      const raw = params.get('id') ?? '';
      const id = Number(raw);
      this.requestedId.set(/^\d+$/.test(raw) && Number.isSafeInteger(id) && id > 0 ? id : null);
      if (this.requestedId()) void this.loadEncounter(id);
      else this.errorMessage.set('No se encontró la consulta solicitada.');
    });
  }
  ngOnDestroy(): void { this.destroyed = true; this.epoch++; }
  private reset(): void {
    this.epoch++;
    this.submissionAttempted.set(false);
    this.encounter.set(null); this.values.set({}); this.formulaResults.set({});
    this.isLoading.set(false); this.isSubmitting.set(false); this.isEditing.set(false);
    this.hasConflict.set(false); this.remoteRecord.set(null); this.errorMessage.set(null);
  }
  async loadEncounter(id: number): Promise<void> {
    if (this.isSubmitting() || this.identity() !== this.owner) return;
    const epoch = ++this.epoch;
    this.isLoading.set(true); this.errorMessage.set(null); this.encounter.set(null);
    try {
      const record = await firstValueFrom(this.service.getById(id).pipe(takeUntilDestroyed(this.destroyRef)));
      if (!this.alive(epoch)) return;
      if (record.id !== id) throw new Error('La respuesta no corresponde a esta consulta.');
      this.acceptRecord(record);
      this.activePatient.loadPatient(record.patientId);
    } catch (error) {
      if (this.alive(epoch)) this.errorMessage.set(errorMessage(error, 'No pudimos cargar el detalle de la consulta.'));
    } finally {
      if (this.alive(epoch)) this.isLoading.set(false);
    }
  }
  private acceptRecord(record: ClinicalEncounterDetail): void {
    this.encounter.set(structuredClone(record)); this.values.set(structuredClone(record.formValues));
    this.formulaResults.set(structuredClone(record.formulaResults)); this.consultationType.set(record.consultationType);
    this.submissionAttempted.set(false); this.formValid.set(false); this.errorMessage.set(null); this.hasConflict.set(false); this.remoteRecord.set(null);
  }
  startEditing(): void { this.submissionAttempted.set(false); if (this.encounter() && !this.isLoading() && !this.isSubmitting() && this.identity() === this.owner) this.isEditing.set(true); }
  cancelEditing(): void { const record = this.encounter(); if (!record || this.isSubmitting() || this.isLoading()) return; this.acceptRecord(record); this.isEditing.set(false); }
  onValuesChange(values: WizardFormValues): void { if (!this.readonly()) { this.values.set(structuredClone(values)); this.formulaResults.set({}); } }
  currentInstant(): string | null { return this.encounter()?.encounterDate ?? null; }
  async save(): Promise<void> {
    if (this.readonly()) return;
    this.submissionAttempted.set(true);
    if (!this.formValid()) { this.formRenderer()?.focusFirstInvalidField(); return; }
    const record = this.encounter(); const encounterDate = this.currentInstant();
    if (!record || !encounterDate || !this.formValid() || this.readonly()) return;
    this.isSubmitting.set(true); this.errorMessage.set(null); const epoch = this.epoch;
    try {
      const saved = await firstValueFrom(this.service.update(record.id, {
        expectedVersion: record.version, encounterDate, consultationType: this.consultationType(),
        values: inputValues(record.formDefinitionSnapshot, this.values()),
      }).pipe(takeUntilDestroyed(this.destroyRef)));
      if (!this.alive(epoch)) return;
      if (saved.id !== record.id || saved.patientId !== record.patientId) throw new Error('La respuesta no corresponde a esta consulta.');
      this.acceptRecord(saved); this.isEditing.set(false);
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('encounter-updated', { detail: saved }));
    } catch (error) {
      if (this.alive(epoch)) { this.hasConflict.set(!!conflictKind(error)); this.errorMessage.set(errorMessage(error, 'No pudimos guardar los cambios. Tu edición se conserva.')); }
    } finally { if (this.alive(epoch)) this.isSubmitting.set(false); }
  }
  async reviewRemote(): Promise<void> {
    const record = this.encounter(); if (!record || !this.hasConflict() || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner) return;
    this.isLoading.set(true); this.remoteRecord.set(null); const epoch = this.epoch;
    try {
      const remote = await firstValueFrom(this.service.getById(record.id).pipe(takeUntilDestroyed(this.destroyRef)));
      if (this.alive(epoch) && remote.id === record.id && remote.patientId === record.patientId) this.remoteRecord.set(structuredClone(remote));
    } catch (error) { if (this.alive(epoch)) this.errorMessage.set(errorMessage(error, 'No pudimos consultar la copia guardada.')); }
    finally { if (this.alive(epoch)) this.isLoading.set(false); }
  }
  useRemoteRecord(): void { const remote = this.remoteRecord(); if (!remote || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner) return; this.acceptRecord(remote); this.isEditing.set(true); }
  formatDate(instant: string): string { const { day, time } = userDateTime(instant); const [year, month, date] = day.split('-'); return `${date}/${month}/${year} ${time}`; }
  getConsultationTypeLabel(type: string): string { return this.consultationTypes.find(option => option.value === type)?.label ?? type; }
  private identity(): string { return this.auth.currentUser()?.id ?? ''; }
  private alive(epoch: number): boolean { return !this.destroyed && epoch === this.epoch && this.identity() === this.owner; }
}
