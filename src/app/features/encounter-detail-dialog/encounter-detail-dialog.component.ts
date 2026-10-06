import { PatientRecordActionsService } from '../../core/experience/patient-record-actions.service';
import { Component, computed, effect, HostListener, inject, OnDestroy, PLATFORM_ID, signal, untracked } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { AuthService } from '../../core/services/auth.service';
import { ClinicalEncounterDetail, ConsultationType } from '../../core/models/clinical-encounter.model';
import { WizardFormValues, WizardFormulaResults } from '../../core/models/wizard-definition.model';
import { DatePickerComponent } from '../../shared/date-picker/date-picker.component';
import { DynamicFormRendererComponent, inputValues } from '../dynamic-form-renderer/dynamic-form-renderer.component';
import { argentinaDateTime, conflictKind, encounterInstant, errorMessage } from '../dynamic-form-renderer/clinical-form-ui';

@Component({ selector: 'app-encounter-detail-dialog', imports: [FormsModule, DatePickerComponent, DynamicFormRendererComponent], templateUrl: './encounter-detail-dialog.component.html', styleUrl: './encounter-detail-dialog.component.css' })
export class EncounterDetailDialogComponent implements OnDestroy {
  readonly recordActions = inject(PatientRecordActionsService);
  private readonly service = inject(ClinicalEncounterService);
  private readonly auth = inject(AuthService);
  private readonly activePatient = inject(ActivePatientService);
  private patientContext: number | null = null;
  private currentPatientId(): number | null { return this.activePatient.activePatient()?.id ?? null; }
  private readonly platformId = inject(PLATFORM_ID);
  private epoch = 0; private destroyed = false; private owner = this.identity();
  private originalDay = ''; private originalTime = ''; private openedAt = 0; private backdropMouseDown = false;
  readonly isOpen = signal(false); readonly isLoading = signal(false); readonly isSubmitting = signal(false); readonly isEditing = signal(false);
  readonly encounter = signal<ClinicalEncounterDetail | null>(null);
  readonly values = signal<WizardFormValues>({}); readonly formulaResults = signal<WizardFormulaResults>({});
  readonly encounterDay = signal(''); readonly encounterTime = signal(''); readonly consultationType = signal<ConsultationType>('FIRST_VISIT');
  readonly formValid = signal(false); readonly hasConflict = signal(false); readonly remoteRecord = signal<ClinicalEncounterDetail | null>(null);
  readonly errorMessage = signal<string | null>(null);
  readonly readonly = computed(() => !this.isOpen() || !this.isEditing() || this.isLoading() || this.isSubmitting() || this.hasConflict() || this.identity() !== this.owner || this.patientContext !== this.currentPatientId());
  readonly dateValid = computed(() => { const instant = this.currentInstant(); return !!instant && new Date(instant).getTime() <= Date.now(); });
  readonly consultationTypes: { value: ConsultationType; label: string }[] = [
    { value: 'FIRST_VISIT', label: 'Primera consulta' }, { value: 'FOLLOW_UP', label: 'Control / seguimiento' }, { value: 'ROUTINE_CHECKUP', label: 'Chequeo de rutina' }, { value: 'EMERGENCY', label: 'Urgencia' }, { value: 'INTERCONSULTATION', label: 'Interconsulta' },
  ];
  constructor() { effect(() => { const owner = this.identity(); const patientId = this.currentPatientId(); untracked(() => { if (owner !== this.owner || (this.isOpen() && patientId !== this.patientContext)) { this.owner = owner; this.epoch++; this.isSubmitting.set(false); this.closeModal(); } }); }); }
  ngOnDestroy(): void { this.destroyed = true; this.epoch++; }
  @HostListener('window:open-encounter-detail-modal', ['$event'])
  openModal(event?: Event): void {
    if (this.isSubmitting() || this.identity() !== this.owner) return;
    this.patientContext = this.currentPatientId();
    this.epoch++; this.openedAt = Date.now(); this.isOpen.set(true); this.errorMessage.set(null); this.encounter.set(null); this.isEditing.set(false); this.hasConflict.set(false); this.remoteRecord.set(null);
    const detail = (event as CustomEvent | undefined)?.detail;
    if (detail?.encounter?.formDefinitionSnapshot) this.displayEncounter(detail.encounter);
    else if (detail?.encounterId || detail?.encounter?.id) void this.loadEncounter(detail.encounterId ?? detail.encounter.id);
  }
  @HostListener('window:keydown.escape') onEscape(): void { if (this.isOpen()) this.closeModal(); }
  closeModal(): void {
    if (this.isSubmitting()) return;
    this.epoch++; this.isOpen.set(false); this.encounter.set(null); this.values.set({}); this.formulaResults.set({}); this.errorMessage.set(null); this.isLoading.set(false); this.isEditing.set(false); this.hasConflict.set(false); this.remoteRecord.set(null);
  }
  onBackdropMouseDown(event: MouseEvent): void { this.backdropMouseDown = event.target === event.currentTarget; }
  onBackdropClick(event: MouseEvent): void { if (Date.now() - this.openedAt >= 300 && this.backdropMouseDown && event.target === event.currentTarget) this.closeModal(); this.backdropMouseDown = false; }
  async loadEncounter(id: number): Promise<void> {
    if (this.isSubmitting() || this.identity() !== this.owner) return;
    const epoch = ++this.epoch; this.isLoading.set(true);
    try { const record = await firstValueFrom(this.service.getById(id)); if (this.alive(epoch) && record.id === id) this.acceptRecord(record); }
    catch (error) { if (this.alive(epoch)) this.errorMessage.set(errorMessage(error, 'No pudimos cargar el detalle de la consulta.')); }
    finally { if (this.alive(epoch)) this.isLoading.set(false); }
  }
  displayEncounter(record: ClinicalEncounterDetail): void {
    this.epoch++; this.isLoading.set(false); this.isSubmitting.set(false); this.acceptRecord(record);
  }
  private acceptRecord(record: ClinicalEncounterDetail): void {
    this.encounter.set(structuredClone(record)); this.values.set(structuredClone(record.formValues)); this.formulaResults.set(structuredClone(record.formulaResults));
    const parts = argentinaDateTime(record.encounterDate); this.originalDay = parts.day; this.originalTime = parts.time; this.encounterDay.set(parts.day); this.encounterTime.set(parts.time); this.consultationType.set(record.consultationType); this.formValid.set(false); this.errorMessage.set(null); this.hasConflict.set(false); this.remoteRecord.set(null);
  }
  startEditing(): void { if (this.encounter() && !this.isLoading() && !this.isSubmitting() && this.identity() === this.owner) this.isEditing.set(true); }
  cancelEditing(): void { const record = this.encounter(); if (!record || this.isSubmitting() || this.isLoading()) return; this.acceptRecord(record); this.isEditing.set(false); }
  onValuesChange(values: WizardFormValues): void { if (!this.readonly()) { this.values.set(structuredClone(values)); this.formulaResults.set({}); } }
  currentInstant(): string | null { return this.encounterDay() === this.originalDay && this.encounterTime() === this.originalTime ? this.encounter()?.encounterDate ?? null : encounterInstant(this.encounterDay(), this.encounterTime()); }
  async save(): Promise<void> {
    const record = this.encounter(); const encounterDate = this.currentInstant();
    if (!record || !encounterDate || !this.formValid() || !this.dateValid() || this.readonly()) return;
    this.isSubmitting.set(true); this.errorMessage.set(null); const epoch = this.epoch;
    try {
      const saved = await firstValueFrom(this.service.update(record.id, { expectedVersion: record.version, encounterDate, consultationType: this.consultationType(), values: inputValues(record.formDefinitionSnapshot, this.values()) }));
      if (!this.alive(epoch)) return;
      if (saved.id !== record.id || saved.patientId !== record.patientId) throw new Error('La respuesta no corresponde a esta consulta.');
      this.acceptRecord(saved); this.isEditing.set(false);
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('encounter-updated', { detail: saved }));
    } catch (error) { if (this.alive(epoch)) { this.hasConflict.set(!!conflictKind(error)); this.errorMessage.set(errorMessage(error, 'No pudimos guardar los cambios. Tu edición se conserva.')); } }
    finally { if (this.alive(epoch)) this.isSubmitting.set(false); }
  }
  async reviewRemote(): Promise<void> {
    const record = this.encounter(); if (!record || !this.hasConflict() || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner) return;
    this.isLoading.set(true); this.remoteRecord.set(null); const epoch = this.epoch;
    try { const remote = await firstValueFrom(this.service.getById(record.id)); if (this.alive(epoch) && remote.id === record.id && remote.patientId === record.patientId) this.remoteRecord.set(structuredClone(remote)); }
    catch (error) { if (this.alive(epoch)) this.errorMessage.set(errorMessage(error, 'No pudimos consultar la copia guardada.')); }
    finally { if (this.alive(epoch)) this.isLoading.set(false); }
  }
  useRemoteRecord(): void { const remote = this.remoteRecord(); if (!remote || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner) return; this.acceptRecord(remote); this.isEditing.set(true); }
  formatDate(instant: string): string { const { day, time } = argentinaDateTime(instant); const [year, month, date] = day.split('-'); return `${date}/${month}/${year} ${time}`; }
  getConsultationTypeLabel(type: string): string { return this.consultationTypes.find(option => option.value === type)?.label ?? type; }
  printEncounter(): void { if (this.recordActions.has('PRINT_DOCUMENT') && this.alive(this.epoch) && isPlatformBrowser(this.platformId) && typeof window !== 'undefined') window.print(); }
  private identity(): string { return this.auth.currentUser()?.id ?? ''; }
  private alive(epoch: number): boolean { return !this.destroyed && this.isOpen() && epoch === this.epoch && this.identity() === this.owner && this.patientContext === this.currentPatientId(); }
}
