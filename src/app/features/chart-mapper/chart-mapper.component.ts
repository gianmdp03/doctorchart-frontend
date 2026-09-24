import {
  Component,
  computed,
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
  lucideBarChart3,
  lucideLineChart,
  lucidePieChart,
  lucideCheck,
  lucideX,
  lucideCheckCircle2,
  lucideAlertCircle,
  lucideInfo,
} from '@ng-icons/lucide';
import { WorkspaceService } from '../../core/services/workspace.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import {
  ChartDefinition,
  ChartSlotDefinition,
  DoctorChartConfig,
  FormFieldDefinition,
  FormTemplate,
} from '../../core/models/workspace.model';

@Component({
  selector: 'app-chart-mapper',
  imports: [CommonModule, FormsModule, NgIcon],
  providers: [
    provideIcons({
      lucideBarChart3,
      lucideLineChart,
      lucidePieChart,
      lucideCheck,
      lucideX,
      lucideCheckCircle2,
      lucideAlertCircle,
      lucideInfo,
    }),
  ],
  templateUrl: './chart-mapper.component.html',
  styleUrl: './chart-mapper.component.css',
})
export class ChartMapperComponent {
  private readonly workspaceService = inject(WorkspaceService);
  readonly workspaceStore = inject(WorkspaceStore);

  // Inputs & Outputs
  readonly isOpen = input<boolean>(false);
  readonly template = input<FormTemplate | null>(null);
  readonly closeDialog = output<void>();
  readonly configsSaved = output<DoctorChartConfig[]>();

  // State signals
  readonly catalog = signal<ChartDefinition[]>([]);
  readonly localConfigs = signal<Record<string, DoctorChartConfig>>({});
  readonly isLoading = signal<boolean>(false);
  readonly isSaving = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly saveSuccess = signal<boolean>(false);

  // Active template fields available for slot mapping
  readonly availableTemplateFields = computed<FormFieldDefinition[]>(() => {
    const tmpl = this.template() || this.workspaceStore.defaultTemplate();
    if (!tmpl?.schemaDefinition?.categories) return [];

    const fields: FormFieldDefinition[] = [];
    for (const cat of tmpl.schemaDefinition.categories) {
      if (cat.enabled !== false && cat.fields) {
        for (const f of cat.fields) {
          fields.push(f);
        }
      }
    }
    return fields;
  });

  constructor() {
    effect(() => {
      const open = this.isOpen();
      untracked(() => {
        if (open) {
          this.loadCatalogAndConfigs();
        }
      });
    });
  }

  loadCatalogAndConfigs(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.saveSuccess.set(false);

    this.workspaceService.getChartsCatalog().subscribe({
      next: (catalogList) => {
        this.catalog.set(catalogList || []);
        this.loadDoctorConfigs(catalogList || []);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err?.error?.message || 'Error al cargar catálogo de gráficos analíticos.'
        );
      },
    });
  }

  private loadDoctorConfigs(catalogList: ChartDefinition[]): void {
    this.workspaceService.getDoctorChartConfigs().subscribe({
      next: (existingConfigs) => {
        this.isLoading.set(false);
        const map: Record<string, DoctorChartConfig> = {};

        // Initialize with existing configs
        for (const cfg of existingConfigs || []) {
          map[cfg.chartCode] = {
            ...cfg,
            fieldMappings: { ...(cfg.fieldMappings || {}) },
          };
        }

        // Ensure every catalog item has an entry
        for (const item of catalogList) {
          if (!map[item.chartCode]) {
            map[item.chartCode] = {
              chartCode: item.chartCode,
              isActive: false,
              fieldMappings: {},
            };
          }
        }

        this.localConfigs.set(map);
      },
      error: () => {
        // Fallback: initialize empty configs for all catalog items
        this.isLoading.set(false);
        const map: Record<string, DoctorChartConfig> = {};
        for (const item of catalogList) {
          map[item.chartCode] = {
            chartCode: item.chartCode,
            isActive: false,
            fieldMappings: {},
          };
        }
        this.localConfigs.set(map);
      },
    });
  }

  isChartActive(chartCode: string): boolean {
    return this.localConfigs()[chartCode]?.isActive ?? false;
  }

  toggleChartActive(chartCode: string): void {
    this.localConfigs.update((configs) => {
      const current = configs[chartCode];
      if (!current) return configs;
      return {
        ...configs,
        [chartCode]: {
          ...current,
          isActive: !current.isActive,
        },
      };
    });
  }

  getSelectedMapping(chartCode: string, slotKey: string): string {
    return this.localConfigs()[chartCode]?.fieldMappings?.[slotKey] || '';
  }

  updateMapping(chartCode: string, slotKey: string, fieldKey: string): void {
    this.localConfigs.update((configs) => {
      const current = configs[chartCode];
      if (!current) return configs;
      return {
        ...configs,
        [chartCode]: {
          ...current,
          fieldMappings: {
            ...current.fieldMappings,
            [slotKey]: fieldKey,
          },
        },
      };
    });
  }

  async save(): Promise<void> {
    this.isSaving.set(true);
    this.errorMessage.set(null);

    const payload = Object.values(this.localConfigs());

    try {
      const saved = await this.workspaceStore.saveChartConfigs(payload);
      this.saveSuccess.set(true);
      this.configsSaved.emit(saved);
      setTimeout(() => {
        this.close();
      }, 500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al guardar configuración de gráficos.';
      this.errorMessage.set(msg);
    } finally {
      this.isSaving.set(false);
    }
  }

  close(): void {
    this.closeDialog.emit();
  }
}
