import { Component, computed, effect, inject, OnDestroy, OnInit, signal, untracked, viewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AdminSpecialtyService } from '../../core/services/admin-specialty.service';
import { AuthService } from '../../core/services/auth.service';
import { SpecialtyDetail, WizardDefaultDetail } from '../../core/models/admin-specialty.model';
import { createDefaultWizardDefinition, WizardDefinition, WizardFormDefinition, WizardModulesConfig, WizardSection } from '../../core/models/wizard-definition.model';
import { FormFieldEditorComponent } from '../form-field-editor/form-field-editor.component';

type PendingSelection = { kind: 'create' } | { kind: 'select'; id: number };
interface RemoteCopy { specialty: SpecialtyDetail; wizard: WizardDefaultDetail; }
interface ValidationIssue { path: string; code: string; }
const defaultDefinition = (): WizardDefinition => createDefaultWizardDefinition();
const clone = <T>(value: T): T => structuredClone(value);

@Component({
  selector: 'app-admin-specialties', imports: [FormsModule, FormFieldEditorComponent],
  templateUrl: './admin-specialties.component.html', styleUrl: './admin-specialties.component.css',
})
export class AdminSpecialtiesComponent implements OnInit, OnDestroy {
  private readonly service = inject(AdminSpecialtyService);
  private readonly auth = inject(AuthService);
  private owner = this.identity();
  private epoch = 0;
  private destroyed = false;
  private readonly editors = viewChildren(FormFieldEditorComponent);
  readonly fieldEditorOpen = computed(() => this.editors().some(editor => !!editor.fieldDraft()));
  readonly activeFieldSection = computed(() => this.editors().find(editor => !!editor.fieldDraft())?.section());
  readonly pendingEditor = computed(() => this.editors().some(editor => editor.pendingChanges()));
  readonly specialties = signal<SpecialtyDetail[]>([]);
  readonly selectedSpecialty = signal<SpecialtyDetail | null>(null);
  readonly wizard = signal<WizardDefaultDetail | null>(null);
  readonly definition = signal<WizardDefinition | null>(null);
  readonly creating = signal(false);
  readonly name = signal('');
  readonly metadataAttempted = signal(false);
  readonly code = signal('');
  readonly description = signal('');
  readonly codeEdited = signal(false);
  readonly busy = signal(false);
  readonly accessDenied = signal(false);
  readonly hasConflict = signal(false);
  readonly remoteCopy = signal<RemoteCopy | null>(null);
  readonly pendingSelection = signal<PendingSelection | null>(null);
  readonly error = signal<string | null>(null);
  readonly success = signal<string | null>(null);
  readonly validationIssues = signal<ValidationIssue[]>([]);
  readonly editorGeneration = signal(0);
  readonly metadataStale = signal(false);
  readonly nameError = computed(() => !this.name().trim() ? 'Completá el nombre de la especialidad.' : this.name().length > 120 ? 'Ingresá hasta 120 caracteres.' : null);
  readonly codeError = computed(() => this.creating() && !/^[a-z][a-z0-9_-]{0,79}$/.test(this.code().trim()) ? 'Usá una letra minúscula inicial, letras, números y guiones; máximo 80 caracteres.' : null);
  readonly capabilities: { key: keyof WizardModulesConfig; label: string }[] = [
    { key: 'MEDICATION_CATALOG', label: 'Catálogo de medicamentos' },
    { key: 'AI_ASSISTANT', label: 'Asistente de IA' },
    { key: 'GROWTH_CHARTS', label: 'Gráficos de crecimiento' },
  ];
  readonly metadataDirty = computed(() => {
    const selected = this.selectedSpecialty();
    return selected !== null && (this.name() !== selected.name || this.description() !== (selected.description ?? ''));
  });
  readonly dirty = computed(() => this.pendingEditor() || (this.creating()
    ? Boolean(this.name() || this.code() || this.description()) || JSON.stringify(this.definition()) !== JSON.stringify(defaultDefinition())
    : this.metadataDirty() || Boolean(this.wizard() && JSON.stringify(this.definition()) !== JSON.stringify(this.wizard()!.draftDefinition))));
  readonly readonly = computed(() => this.busy() || this.accessDenied() || this.hasConflict() || !this.auth.isSuperAdmin() || this.identity() !== this.owner);
  readonly canEditExisting = computed(() => !this.readonly() && !!this.selectedSpecialty() && this.wizard()?.specialtyId === this.selectedSpecialty()?.id);

  constructor() {
    effect(() => {
      const identity = this.identity();
      untracked(() => {
        if (identity === this.owner) return;
        this.owner = identity; this.epoch++; this.busy.set(false);
        this.specialties.set([]); this.selectedSpecialty.set(null); this.wizard.set(null); this.definition.set(null);
        this.creating.set(false); this.name.set(''); this.code.set(''); this.description.set(''); this.pendingSelection.set(null); this.metadataStale.set(false);
        this.clearFeedback(); this.accessDenied.set(!this.auth.isSuperAdmin());
        if (this.auth.isSuperAdmin()) void this.refreshCatalog();
      });
    });
  }
  async ngOnInit(): Promise<void> {
    if (!this.auth.isSuperAdmin()) { this.accessDenied.set(true); return; }
    await this.refreshCatalog();
  }
  ngOnDestroy(): void { this.destroyed = true; this.epoch++; }

  async refreshCatalog(): Promise<void> {
    if (this.busy() || !this.auth.isSuperAdmin() || this.identity() !== this.owner) return;
    this.beginOperation(); this.busy.set(true); const epoch = this.epoch;
    try {
      const list = await firstValueFrom(this.service.getSpecialties());
      if (!this.alive(epoch)) return;
      this.specialties.set(clone(list)); this.accessDenied.set(false);
      if (this.metadataStale()) this.refreshSelectedMetadata(list);
    } catch (error) { if (this.alive(epoch)) this.handleError(error, 'No pudimos cargar las especialidades.'); }
    finally { if (this.alive(epoch)) this.busy.set(false); }
  }

  requestCreate(): void { this.requestSelection({ kind: 'create' }); }
  requestSelect(id: number): void { this.requestSelection({ kind: 'select', id }); }
  private requestSelection(selection: PendingSelection): void {
    if (this.busy() || this.accessDenied() || !this.auth.isSuperAdmin() || this.identity() !== this.owner) return;
    if (selection.kind === 'select' && !this.creating() && selection.id === this.selectedSpecialty()?.id && this.wizard()) return;
    if (this.dirty() || this.hasConflict()) this.pendingSelection.set(selection);
    else void this.openSelection(selection);
  }
  async confirmSelection(): Promise<void> {
    const selection = this.pendingSelection();
    if (!selection || this.busy()) return;
    this.pendingSelection.set(null); await this.openSelection(selection);
  }
  private async openSelection(selection: PendingSelection): Promise<void> {
    if (this.busy() || this.accessDenied() || !this.auth.isSuperAdmin() || this.identity() !== this.owner) return;
    const epoch = ++this.epoch;
    if (selection.kind === 'create') {
      this.selectedSpecialty.set(null); this.wizard.set(null); this.definition.set(defaultDefinition());
      this.metadataAttempted.set(false); this.creating.set(true); this.name.set(''); this.code.set(''); this.description.set(''); this.codeEdited.set(false);
      this.clearFeedback(); this.editorGeneration.update(n => n + 1); return;
    }
    const specialty = this.specialties().find(item => item.id === selection.id);
    if (!specialty) return;
    this.beginOperation(); this.busy.set(true);
    try {
      const wizard = await firstValueFrom(this.service.getWizard(selection.id));
      if (!this.alive(epoch)) return;
      if (wizard.specialtyId !== selection.id) throw new Error('La configuración recibida corresponde a otra especialidad.');
      this.acceptCopy({ specialty, wizard }); this.clearFeedback();
    } catch (error) { if (this.alive(epoch)) this.handleError(error, 'No pudimos abrir el wizard. La edición anterior se conserva.'); }
    finally { if (this.alive(epoch)) this.busy.set(false); }
  }

  updateName(value: string): void {
    if (this.readonly()) return; this.name.set(value);
    if (this.creating() && !this.codeEdited()) this.code.set(this.slug(value));
  }
  updateCode(value: string): void { if (!this.readonly() && this.creating()) { this.codeEdited.set(true); this.code.set(value); } }
  onDefinitionChange(section: WizardSection, form: WizardFormDefinition): void {
    if (this.readonly()) return;
    this.definition.update(definition => definition ? { ...definition, [section]: clone(form) } : definition);
    this.success.set(null);
  }
  setCapability(key: keyof WizardModulesConfig, enabled: boolean): void {
    if (this.readonly()) return;
    this.definition.update(definition => definition ? { ...definition, modulesConfig: { ...definition.modulesConfig, [key]: enabled } } : definition);
    this.success.set(null);
  }

  async createSpecialty(): Promise<void> {
    const definition = this.definition();
    if (!this.creating() || !definition || this.readonly() || this.pendingEditor() || !this.validMetadata(true)) return;
    this.beginOperation(); this.busy.set(true); const epoch = this.epoch;
    try {
      const specialty = await firstValueFrom(this.service.createSpecialty({ code: this.code().trim(), name: this.name().trim(), description: this.description().trim() || null, definition: clone(definition) }));
      if (!this.alive(epoch)) return;
      this.upsertSpecialty(specialty); this.selectedSpecialty.set(clone(specialty)); this.creating.set(false); this.code.set(specialty.code);
      this.name.set(specialty.name); this.description.set(specialty.description ?? ''); this.wizard.set(null);
      // The POST succeeded: never offer to create the same resource again if this GET fails.
      const wizard = await firstValueFrom(this.service.getWizard(specialty.id));
      if (!this.alive(epoch)) return;
      this.acceptCopy({ specialty, wizard }); this.clearFeedback(); this.success.set('Especialidad creada como borrador inactivo. Completá el wizard y publicalo cuando esté listo.');
    } catch (error) { if (this.alive(epoch)) this.handleError(error, 'No pudimos completar la operación. Si la especialidad fue creada, volvé a abrirla desde la lista para cargar su wizard.'); }
    finally { if (this.alive(epoch)) this.busy.set(false); }
  }

  async saveMetadata(): Promise<void> {
    const selected = this.selectedSpecialty();
    if (!selected || !this.canEditExisting() || this.metadataStale() || !this.validMetadata(false)) return;
    await this.patchSpecialty({ name: this.name().trim(), description: this.description().trim() || null });
  }
  async toggleActive(): Promise<void> {
    const selected = this.selectedSpecialty();
    if (!selected || !this.canEditExisting() || this.metadataStale()) return;
    await this.patchSpecialty({ active: !selected.active });
  }
  private async patchSpecialty(patch: { name?: string; description?: string | null; active?: boolean }): Promise<void> {
    const selected = this.selectedSpecialty(); if (!selected) return;
    this.beginOperation(); this.busy.set(true); const epoch = this.epoch; const metadataWasDirty = this.metadataDirty();
    try {
      const updated = await firstValueFrom(this.service.updateSpecialty(selected.id, { expectedVersion: selected.version, ...patch }));
      if (!this.alive(epoch)) return;
      this.upsertSpecialty(updated); this.selectedSpecialty.set(clone(updated));
      if (patch.name !== undefined || !metadataWasDirty) { this.name.set(updated.name); this.description.set(updated.description ?? ''); }
      this.clearFeedback(); this.success.set(patch.active !== undefined ? 'Disponibilidad actualizada.' : 'Datos de la especialidad guardados.');
    } catch (error) { if (this.alive(epoch)) this.handleError(error, 'No pudimos guardar los datos de la especialidad.'); }
    finally { if (this.alive(epoch)) this.busy.set(false); }
  }

  async saveDraft(): Promise<void> { await this.writeWizard(false); }
  async publishWizard(): Promise<void> { await this.writeWizard(true); }
  private async writeWizard(publish: boolean): Promise<void> {
    const selected = this.selectedSpecialty(); const wizard = this.wizard(); const definition = this.definition();
    if (!selected || !wizard || !definition || !this.canEditExisting() || this.metadataStale() || this.pendingEditor()) return;
    this.beginOperation(); this.busy.set(true); const epoch = this.epoch;
    try {
      const saved = await firstValueFrom(this.service.saveWizardDraft(selected.id, { expectedVersion: wizard.version, definition: clone(definition) }));
      if (!this.alive(epoch)) return;
      this.assertWizardIdentity(saved, selected.id);
      this.wizard.set(clone(saved)); this.definition.set(clone(saved.draftDefinition));
      if (publish) {
        const published = await firstValueFrom(this.service.publishWizard(selected.id, saved.version));
        if (!this.alive(epoch)) return;
        this.assertWizardIdentity(published, selected.id);
        this.wizard.set(clone(published)); this.definition.set(clone(published.draftDefinition));
        this.metadataStale.set(true);
        const list = await firstValueFrom(this.service.getSpecialties());
        if (!this.alive(epoch)) return;
        this.specialties.set(clone(list));
        this.refreshSelectedMetadata(list);
      }
      this.clearFeedback(); this.success.set(publish ? 'Wizard publicado. Las copias personales de los médicos se conservan.' : 'Borrador guardado. La publicación vigente se conserva.');
    } catch (error) { if (this.alive(epoch)) this.handleError(error, publish ? 'No pudimos completar la publicación. El borrador guardado se conserva.' : 'No pudimos guardar el borrador. Tus cambios locales se conservan.'); }
    finally { if (this.alive(epoch)) this.busy.set(false); }
  }

  async reviewRemote(): Promise<void> {
    const selected = this.selectedSpecialty(); if (!selected || this.busy() || this.accessDenied() || !this.auth.isSuperAdmin() || this.identity() !== this.owner) return;
    this.beginOperation(); this.remoteCopy.set(null); this.busy.set(true); const epoch = this.epoch;
    try {
      const [list, wizard] = await Promise.all([firstValueFrom(this.service.getSpecialties()), firstValueFrom(this.service.getWizard(selected.id))]);
      if (!this.alive(epoch)) return;
      const specialty = list.find(item => item.id === selected.id);
      if (!specialty) throw new Error('La especialidad ya no está disponible en la administración.');
      this.assertWizardIdentity(wizard, selected.id);
      this.remoteCopy.set(clone({ specialty, wizard }));
    } catch (error) { if (this.alive(epoch)) this.handleError(error, 'No pudimos consultar el estado del servidor. Tus cambios locales se conservan.'); }
    finally { if (this.alive(epoch)) this.busy.set(false); }
  }
  useRemote(): void {
    const remote = this.remoteCopy(); if (!remote || this.busy() || this.accessDenied() || !this.auth.isSuperAdmin() || this.identity() !== this.owner) return;
    this.acceptCopy(remote); this.upsertSpecialty(remote.specialty); this.clearFeedback();
    this.success.set('Copia del servidor cargada. Los cambios locales anteriores fueron descartados.');
  }

  issueText(issue: ValidationIssue): string {
    const [section, , categoryIndex, , fieldIndex] = issue.path.replace(/^\//, '').split('/');
    const form = section === 'patientForm' || section === 'encounterForm' ? this.definition()?.[section] : null;
    const category = form?.categories[Number(categoryIndex)]; const field = category?.fields[Number(fieldIndex)];
    const labels: Record<string, string> = { MISSING_PATIENT_CORE: 'Agregá nombre y fecha de nacimiento obligatorios, siempre visibles y en una categoría activa.', DUPLICATE_BINDING: 'El dato vinculado ya se usa en otro campo.', BINDING_TYPE_MISMATCH: 'El tipo no corresponde al dato vinculado.', BINDING_UNIT_MISMATCH: 'Revisá la unidad del dato vinculado.', INVALID_FORMULA_REFERENCE: 'El cálculo refiere a una entrada inexistente o de tipo incompatible.', INVALID_VISIBILITY_REFERENCE: 'La condición debe referir a un campo Sí / No existente.', VISIBILITY_CYCLE: 'Las condiciones de visibilidad forman un ciclo.', AMBIGUOUS_PATIENT_NAME: 'Usá nombre completo o nombre y apellido separados.', FIELD_IDENTITY_CHANGED: 'Cambiar tipo o vinculación requiere crear un campo nuevo.', INVALID_STRUCTURE: 'Revisá los datos y las opciones de este campo.' };
    const location = field ? `${category?.title} / ${field.label}` : category?.title ?? (section === 'patientForm' ? 'Ficha del paciente' : section === 'encounterForm' ? 'Historia Clínica' : 'Configuración');
    return `${location}: ${labels[issue.code] ?? 'Revisá la configuración indicada.'}`;
  }
  private validMetadata(requireCode: boolean): boolean {
    this.metadataAttempted.set(true);
    const error = this.nameError() || (requireCode && this.codeError());
    if (error) { this.error.set(error); return false; }
    return true;
  }
  private acceptCopy(copy: RemoteCopy): void {
    this.metadataAttempted.set(false);
    if (copy.wizard.specialtyId !== copy.specialty.id) throw new Error('La configuración recibida corresponde a otra especialidad.');
    this.selectedSpecialty.set(clone(copy.specialty)); this.wizard.set(clone(copy.wizard)); this.definition.set(clone(copy.wizard.draftDefinition));
    this.creating.set(false); this.metadataStale.set(false); this.name.set(copy.specialty.name); this.code.set(copy.specialty.code); this.description.set(copy.specialty.description ?? ''); this.editorGeneration.update(n => n + 1);
  }
  async reloadWizard(): Promise<void> {
    const selected = this.selectedSpecialty();
    if (!selected || this.wizard() || this.busy() || this.accessDenied() || !this.auth.isSuperAdmin() || this.identity() !== this.owner) return;
    await this.openSelection({ kind: 'select', id: selected.id });
  }
  private refreshSelectedMetadata(list: SpecialtyDetail[]): void {
    const updated = list.find(item => item.id === this.selectedSpecialty()?.id);
    if (!updated) throw new Error('No pudimos recuperar la revisión actual de la especialidad.');
    const dirty = this.metadataDirty(); const previous = this.selectedSpecialty()!;
    if (dirty && (updated.version !== previous.version + 1 || updated.name !== previous.name || updated.description !== previous.description || !updated.active)) {
      throw { status: 409, error: { code: 'VERSION_CONFLICT', message: 'Otro administrador modificó los datos de la especialidad. Tu edición local se conserva; revisá la copia del servidor antes de guardar.' } };
    }
    this.selectedSpecialty.set(clone(updated));
    if (!dirty) { this.name.set(updated.name); this.description.set(updated.description ?? ''); }
    this.metadataStale.set(false);
  }
  private upsertSpecialty(specialty: SpecialtyDetail): void { this.specialties.update(list => [...list.filter(item => item.id !== specialty.id), clone(specialty)].sort((a, b) => a.name.localeCompare(b.name))); }
  private clearFeedback(): void { this.error.set(null); this.success.set(null); this.validationIssues.set([]); this.hasConflict.set(false); this.remoteCopy.set(null); }
  private beginOperation(): void { this.error.set(null); this.success.set(null); this.validationIssues.set([]); }
  private handleError(error: unknown, fallback: string): void {
    const response = error as { status?: number; error?: { code?: string; message?: unknown; errors?: ValidationIssue[] } };
    if (response?.status === 403) { this.accessDenied.set(true); this.error.set('No tenés permiso de Superadmin para administrar especialidades.'); return; }
    if (response?.status === 409 && response.error?.code === 'VERSION_CONFLICT') { this.hasConflict.set(true); this.remoteCopy.set(null); }
    this.error.set(typeof response?.error?.message === 'string' ? response.error.message : fallback);
    this.validationIssues.set(Array.isArray(response?.error?.errors) ? response.error.errors : []);
  }
  private identity(): string { const user = this.auth.currentUser(); return `${user?.id ?? ''}:${user?.app_metadata?.['role'] ?? ''}`; }
  private assertWizardIdentity(wizard: WizardDefaultDetail, id: number): void { if (wizard.specialtyId !== id) throw new Error('La configuración recibida corresponde a otra especialidad.'); }
  private alive(epoch: number): boolean { return !this.destroyed && epoch === this.epoch && this.identity() === this.owner; }
  private slug(name: string): string { const slug = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80); return /^[a-z]/.test(slug) ? slug : slug ? 'especialidad-' + slug.slice(0, 67) : ''; }
}
