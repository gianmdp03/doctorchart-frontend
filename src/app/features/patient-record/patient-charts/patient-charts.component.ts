import { Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideActivity,
  lucideLineChart,
  lucideInfo,
  lucidePlus,
} from '@ng-icons/lucide';
import { WorkspaceStore } from '../../../core/services/workspace.store';
import { ClinicalChartService } from '../../../core/services/clinical-chart.service';
import { ClinicalChartComponent } from '../../clinical-chart/clinical-chart.component';
import { ClinicalChartData } from '../../../core/models/clinical-chart.model';
import { ClinicalEncounterList } from '../../../core/models/clinical-encounter.model';
import { GrowthCurvesComponent } from '../../growth-curves/growth-curves.component';
import { DoctorSpecialtyService } from '../../../core/services/doctor-specialty.service';
import { ChartDefinition } from '../../../core/models/workspace.model';

@Component({
  selector: 'app-patient-charts',
  imports: [CommonModule, NgIcon, ClinicalChartComponent, GrowthCurvesComponent],
  providers: [
    provideIcons({
      lucideActivity,
      lucideLineChart,
      lucideInfo,
      lucidePlus,
    }),
  ],
  templateUrl: './patient-charts.component.html',
  styleUrl: './patient-charts.component.css',
})
export class PatientChartsComponent {
  private readonly workspaceStore = inject(WorkspaceStore);
  private readonly clinicalChartService = inject(ClinicalChartService);
  readonly doctorSpecialtyService = inject(DoctorSpecialtyService);

  readonly encounters = input<ClinicalEncounterList[]>([]);
  readonly isChild = input<boolean>(false);

  // Sub-view: 'clinical' (curvas de consultas) | 'oms' (curvas de crecimiento OMS)
  readonly activeSubTab = signal<'clinical' | 'oms'>('clinical');

  readonly hasOmsSupport = computed(() => {
    return this.doctorSpecialtyService.isPediatricMode() || this.isChild();
  });

  readonly patientChartsData = computed<ClinicalChartData[]>(() => {
    const rawConfigs = this.workspaceStore.chartConfigs();
    const encountersList = this.encounters();

    // Gráficos estándar por defecto si aún no configuró
    const defaultCharts: ChartDefinition[] = [
      {
        id: 1,
        chartCode: 'WEIGHT_EVOLUTION',
        title: 'Evolución Somatométrica de Peso',
        chartType: 'LINE' as const,
        description: 'Variación de peso corporal del paciente en el tiempo.',
        requiredSlots: [{ slot: 'y', label: 'Peso Corporal (kg)', type: 'NUMBER' as const }],
        isSystem: true,
      },
      {
        id: 2,
        chartCode: 'BLOOD_PRESSURE_EVOLUTION',
        title: 'Registro y Tendencia de Presión Arterial',
        chartType: 'LINE' as const,
        description: 'Monitoreo de tensión arterial sistólica y diastólica.',
        requiredSlots: [
          { slot: 'systolic', label: 'Presión Sistólica (PAS)', type: 'NUMBER' as const },
          { slot: 'diastolic', label: 'Presión Diastólica (PAD)', type: 'NUMBER' as const },
        ],
        isSystem: true,
      },
      {
        id: 3,
        chartCode: 'BMI_TRACKING',
        title: 'Evolución del Índice de Masa Corporal (IMC)',
        chartType: 'LINE' as const,
        description: 'Seguimiento nutricional y estado somatométrico longitudinal.',
        requiredSlots: [{ slot: 'y', label: 'IMC (kg/m²)', type: 'NUMBER' as const }],
        isSystem: true,
      },
      {
        id: 4,
        chartCode: 'GLYCEMIA_HBA1C',
        title: 'Control Glucémico y HbA1c',
        chartType: 'LINE' as const,
        description: 'Monitoreo metabólico de glucemia basal y hemoglobina glicosilada.',
        requiredSlots: [{ slot: 'y', label: 'Glucemia (mg/dL)', type: 'NUMBER' as const }],
        isSystem: true,
      },
    ];

    const activeConfigs = rawConfigs.filter((c) => c.isActive);
    const result: ClinicalChartData[] = [];

    // Si tiene configuraciones activas del workspace, usarlas
    if (activeConfigs.length > 0) {
      for (const config of activeConfigs) {
        let def: ChartDefinition | undefined = defaultCharts.find((c) => c.chartCode === config.chartCode);
        if (!def) {
          def = {
            id: 0,
            chartCode: config.chartCode,
            title: config.chartCode,
            chartType: 'LINE',
            description: '',
            requiredSlots: Object.keys(config.fieldMappings || {}).map((k) => ({
              slot: k,
              label: k,
              type: 'NUMBER' as const,
            })),
            isSystem: false,
          };
        }

        const chartData = this.clinicalChartService.buildPatientChartData(
          def,
          config,
          encountersList
        );
        result.push(chartData);
      }
    } else {
      // Si no hay configs guardadas aún, generar para los gráficos clínicos estándar
      for (const def of defaultCharts) {
        const dummyConfig = {
          chartCode: def.chartCode,
          isActive: true,
          fieldMappings: {},
        };
        const chartData = this.clinicalChartService.buildPatientChartData(
          def,
          dummyConfig,
          encountersList
        );
        result.push(chartData);
      }
    }

    return result;
  });

  readonly chartsWithData = computed(() => {
    return this.patientChartsData().filter((c) => c.hasData);
  });

  readonly chartsWithoutData = computed(() => {
    return this.patientChartsData().filter((c) => !c.hasData);
  });
}
