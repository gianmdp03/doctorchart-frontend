import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideColumns,
  lucideCheck,
  lucideX,
  lucideCheckCircle2,
  lucideSlidersHorizontal,
} from '@ng-icons/lucide';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { PatientColumnsConfig } from '../../core/models/workspace.model';

export interface ColumnDefinitionItem {
  key: string;
  label: string;
  description: string;
  defaultVisible: boolean;
}

export const AVAILABLE_PATIENT_COLUMNS: ColumnDefinitionItem[] = [
  {
    key: 'nationalId',
    label: 'DNI / Documento de Identidad',
    description: 'Muestra el número de documento identificatorio del paciente.',
    defaultVisible: true,
  },
  {
    key: 'birthDate',
    label: 'Fecha de Nacimiento y Edad',
    description: 'Visualiza la fecha de nacimiento y el cálculo automático de edad.',
    defaultVisible: true,
  },
  {
    key: 'phone',
    label: 'Teléfono / Contacto Directo',
    description: 'Número telefónico de contacto registrado en la ficha del paciente.',
    defaultVisible: true,
  },
  {
    key: 'email',
    label: 'Correo Electrónico',
    description: 'Dirección de correo electrónico para notificaciones y seguimiento.',
    defaultVisible: true,
  },
  {
    key: 'lastCheckup',
    label: 'Última Consulta / Control',
    description: 'Muestra la fecha y estado del último encuentro clínico realizado.',
    defaultVisible: true,
  },
  {
    key: 'healthInsurance',
    label: 'Obra Social / Seguro Médico',
    description: 'Cobertura médica registrada para el paciente.',
    defaultVisible: true,
  },
];

@Component({
  selector: 'app-patient-columns-config',
  imports: [CommonModule, FormsModule, NgIcon],
  providers: [
    provideIcons({
      lucideColumns,
      lucideCheck,
      lucideX,
      lucideCheckCircle2,
      lucideSlidersHorizontal,
    }),
  ],
  templateUrl: './patient-columns-config.component.html',
  styleUrl: './patient-columns-config.component.css',
})
export class PatientColumnsConfigComponent {
  readonly workspaceStore = inject(WorkspaceStore);

  // Inputs & Outputs
  readonly isOpen = input<boolean>(false);
  readonly closeDialog = output<void>();
  readonly columnsSaved = output<PatientColumnsConfig>();

  readonly availableColumns = AVAILABLE_PATIENT_COLUMNS;
  readonly localColumns = signal<PatientColumnsConfig>({});
  readonly isSaving = signal<boolean>(false);
  readonly saveSuccess = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly isLoading = signal(false);
  private expectedVersion: number | null = null;
  private openGeneration = 0;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      ++this.openGeneration;
      if (this.closeTimer) clearTimeout(this.closeTimer);
    });
    effect(() => {
      const open = this.isOpen();
      untracked(() => {
        ++this.openGeneration;
        if (this.closeTimer) clearTimeout(this.closeTimer);
        this.expectedVersion = null;
        this.isSaving.set(false);
        if (open) {
          this.saveSuccess.set(false);
          this.errorMessage.set(null);
          void this.loadColumns(this.openGeneration);
        } else this.isLoading.set(false);
      });
    });
  }

  private async loadColumns(generation: number): Promise<void> {
    this.isLoading.set(true);
    try {
      const preferences = await this.workspaceStore.loadPreferences(true);
      if (generation !== this.openGeneration) return;
      const config: PatientColumnsConfig = {};
      for (const column of this.availableColumns) config[column.key] = preferences.patientColumnsConfig[column.key] !== false;
      this.localColumns.set(config);
      this.expectedVersion = preferences.version;
    } catch (error) {
      if (generation === this.openGeneration) {
        this.errorMessage.set(error instanceof Error ? error.message : 'No se pudieron cargar las preferencias.');
      }
    } finally {
      if (generation === this.openGeneration) this.isLoading.set(false);
    }
  }

  isColumnChecked(key: string): boolean {
    return this.localColumns()[key] !== false;
  }

  toggleColumn(key: string): void {
    if (this.expectedVersion === null || this.isSaving()) return;
    this.localColumns.update((current) => ({
      ...current,
      [key]: !this.isColumnChecked(key),
    }));
  }

  selectAll(): void {
    if (this.expectedVersion === null || this.isSaving()) return;
    const allTrue: PatientColumnsConfig = {};
    for (const col of this.availableColumns) {
      allTrue[col.key] = true;
    }
    this.localColumns.set(allTrue);
  }

  resetDefaults(): void {
    if (this.expectedVersion === null || this.isSaving()) return;
    const defaults: PatientColumnsConfig = {};
    for (const col of this.availableColumns) {
      defaults[col.key] = col.defaultVisible;
    }
    this.localColumns.set(defaults);
  }

  async saveConfiguration(): Promise<void> {
    if (this.isSaving() || this.expectedVersion === null) return;
    const generation = this.openGeneration;
    this.isSaving.set(true);
    this.errorMessage.set(null);

    try {
      const updated = { ...this.localColumns() };
      const result = await this.workspaceStore.updateWorkspace({
        expectedVersion: this.expectedVersion,
        patientColumnsConfig: updated,
      });
      if (generation !== this.openGeneration) return;
      this.expectedVersion = result.version;
      this.saveSuccess.set(true);
      this.columnsSaved.emit(updated);
      this.closeTimer = setTimeout(() => {
        if (generation === this.openGeneration) this.close();
      }, 500);
    } catch (err: unknown) {
      if (generation !== this.openGeneration) return;
      const msg = err instanceof Error ? err.message : 'Error al guardar la configuración de columnas.';
      this.errorMessage.set(msg);
    } finally {
      if (generation === this.openGeneration) this.isSaving.set(false);
    }
  }

  close(): void {
    ++this.openGeneration;
    this.isSaving.set(false);
    this.isLoading.set(false);
    if (this.closeTimer) clearTimeout(this.closeTimer);
    this.closeDialog.emit();
  }
}
