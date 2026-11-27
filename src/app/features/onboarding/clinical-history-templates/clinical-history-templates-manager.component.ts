import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import {
  DefaultEncounterTemplateInfo,
  EncounterTemplate,
} from '../../../core/models/encounter-template.model';
import { WizardFormDefinition } from '../../../core/models/wizard-definition.model';
import { EncounterTemplateService } from '../../../core/services/encounter-template.service';
import { FormFieldEditorComponent } from '../../form-field-editor/form-field-editor.component';

type ManagerViewMode = 'list' | 'create' | 'editor';

@Component({
  selector: 'app-clinical-history-templates-manager',
  imports: [CommonModule, FormsModule, FormFieldEditorComponent],
  templateUrl: './clinical-history-templates-manager.component.html',
  styleUrl: './clinical-history-templates-manager.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicalHistoryTemplatesManagerComponent implements OnInit {
  private readonly service = inject(EncounterTemplateService);

  readonly readonly = input(false);
  readonly templatesChanged = output<EncounterTemplate[]>();
  readonly editingStateChange = output<boolean>();

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly statusMessage = signal<string | null>(null);

  readonly templates = signal<EncounterTemplate[]>([]);
  readonly archivedTemplates = signal<EncounterTemplate[]>([]);
  readonly systemDefaults = signal<DefaultEncounterTemplateInfo[]>([]);

  readonly mode = signal<ManagerViewMode>('list');
  readonly showArchived = signal(false);

  // Create form state
  readonly newTemplateName = signal('');
  readonly selectedBaseTemplateId = signal<number | null>(null);

  // Inline archive confirmation
  readonly confirmingArchiveId = signal<number | null>(null);

  // Editor state
  readonly editingTemplate = signal<EncounterTemplate | null>(null);
  readonly editingName = signal('');
  readonly editingForm = signal<WizardFormDefinition | null>(null);

  readonly uninstallableDefaults = computed(() =>
    this.systemDefaults().filter((d) => !d.installed),
  );

  readonly canArchiveMore = computed(() => this.templates().length > 1);

  ngOnInit(): void {
    void this.loadTemplates();
  }

  async loadTemplates(): Promise<void> {
    this.loading.set(true);
    this.errorMessage.set(null);
    try {
      const res = await firstValueFrom(this.service.list());
      this.templates.set(res.templates);
      this.archivedTemplates.set(res.archivedTemplates);
      this.systemDefaults.set(res.systemDefaults);
      this.templatesChanged.emit(res.templates);
    } catch (err) {
      this.errorMessage.set(this.extractError(err, 'No pudimos cargar las plantillas de historia clínica.'));
    } finally {
      this.loading.set(false);
    }
  }

  openCreateFlow(): void {
    if (this.readonly()) return;
    const active = this.templates();
    this.errorMessage.set(null);
    this.statusMessage.set(null);
    this.newTemplateName.set('');
    this.selectedBaseTemplateId.set(active.length === 1 ? active[0].id : null);
    this.mode.set('create');
    this.editingStateChange.emit(true);
  }

  cancelCreate(): void {
    this.errorMessage.set(null);
    this.mode.set('list');
    this.editingStateChange.emit(false);
  }

  async submitCreate(): Promise<void> {
    if (this.readonly() || this.saving()) return;
    const name = this.newTemplateName().trim();
    if (!name) {
      this.errorMessage.set('Ingresá un nombre para la nueva plantilla.');
      return;
    }
    const active = this.templates();
    const baseId = active.length === 1 ? active[0].id : this.selectedBaseTemplateId();
    if (!baseId) {
      this.errorMessage.set('Seleccioná qué plantilla querés utilizar como base.');
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);
    try {
      const created = await firstValueFrom(
        this.service.create({ name, sourceTemplateId: baseId }),
      );
      await this.loadTemplates();
      this.openEditor(created);
      this.statusMessage.set(`Plantilla «${created.name}» creada. Ya podés personalizar sus campos.`);
    } catch (err) {
      this.errorMessage.set(this.extractError(err, 'No pudimos crear la plantilla.'));
    } finally {
      this.saving.set(false);
    }
  }

  openEditor(template: EncounterTemplate): void {
    this.errorMessage.set(null);
    this.statusMessage.set(null);
    this.confirmingArchiveId.set(null);
    this.editingTemplate.set(template);
    this.editingName.set(template.name);
    this.editingForm.set(structuredClone(template.formDefinition));
    this.mode.set('editor');
    this.editingStateChange.emit(true);
  }

  onEditorDefinitionChange(form: WizardFormDefinition): void {
    this.editingForm.set(structuredClone(form));
  }

  async saveEditor(): Promise<void> {
    const current = this.editingTemplate();
    const form = this.editingForm();
    if (!current || !form || this.readonly() || this.saving()) return;

    const name = this.editingName().trim();
    if (!name) {
      this.errorMessage.set('El nombre de la plantilla no puede estar vacío.');
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);
    try {
      const updated = await firstValueFrom(
        this.service.update(current.id, {
          expectedVersion: current.version,
          name,
          formDefinition: form,
        }),
      );
      this.editingTemplate.set(updated);
      this.editingName.set(updated.name);
      this.editingForm.set(structuredClone(updated.formDefinition));
      await this.loadTemplates();
      this.statusMessage.set(`Se guardaron los cambios en «${updated.name}».`);
    } catch (err) {
      this.errorMessage.set(this.extractError(err, 'No pudimos guardar los cambios de la plantilla.'));
    } finally {
      this.saving.set(false);
    }
  }

  closeEditor(): void {
    this.errorMessage.set(null);
    this.statusMessage.set(null);
    this.editingTemplate.set(null);
    this.editingForm.set(null);
    this.mode.set('list');
    this.editingStateChange.emit(false);
  }

  requestArchive(template: EncounterTemplate): void {
    if (this.readonly() || !this.canArchiveMore()) return;
    this.confirmingArchiveId.set(template.id);
    this.errorMessage.set(null);
  }

  cancelArchive(): void {
    this.confirmingArchiveId.set(null);
  }

  async confirmArchive(template: EncounterTemplate): Promise<void> {
    if (this.readonly() || this.saving()) return;
    this.saving.set(true);
    this.errorMessage.set(null);
    try {
      await firstValueFrom(this.service.archive(template.id, template.version));
      this.confirmingArchiveId.set(null);
      await this.loadTemplates();
      this.statusMessage.set(`La plantilla «${template.name}» fue archivada.`);
    } catch (err) {
      this.errorMessage.set(this.extractError(err, 'No pudimos archivar la plantilla.'));
    } finally {
      this.saving.set(false);
    }
  }

  async restoreTemplate(template: EncounterTemplate): Promise<void> {
    if (this.readonly() || this.saving()) return;
    this.saving.set(true);
    this.errorMessage.set(null);
    try {
      await firstValueFrom(this.service.restore(template.id, template.version));
      await this.loadTemplates();
      this.statusMessage.set(`La plantilla «${template.name}» volvió a estar activa.`);
    } catch (err) {
      this.errorMessage.set(this.extractError(err, 'No pudimos restaurar la plantilla.'));
    } finally {
      this.saving.set(false);
    }
  }

  async importSystemDefaults(): Promise<void> {
    if (this.readonly() || this.saving()) return;
    this.saving.set(true);
    this.errorMessage.set(null);
    try {
      const res = await firstValueFrom(this.service.importDefaults());
      this.templates.set(res.templates);
      this.archivedTemplates.set(res.archivedTemplates);
      this.systemDefaults.set(res.systemDefaults);
      this.templatesChanged.emit(res.templates);
      this.statusMessage.set('Se incorporaron las plantillas predeterminadas de la especialidad.');
    } catch (err) {
      this.errorMessage.set(this.extractError(err, 'No pudimos cargar las plantillas predeterminadas.'));
    } finally {
      this.saving.set(false);
    }
  }

  countEnabledCategories(template: EncounterTemplate): number {
    return template.formDefinition.categories.filter((c) => c.enabled).length;
  }

  countActiveFields(template: EncounterTemplate): number {
    return template.formDefinition.categories
      .filter((c) => c.enabled)
      .reduce((sum, c) => sum + c.fields.length, 0);
  }

  private extractError(err: unknown, fallback: string): string {
    const apiErr = err as { error?: { message?: string }; message?: string } | null;
    return apiErr?.error?.message || apiErr?.message || fallback;
  }
}
