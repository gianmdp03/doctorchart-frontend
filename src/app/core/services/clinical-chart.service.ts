import { Injectable } from '@angular/core';
import {
  ChartDefinition,
  DoctorChartConfig,
} from '../models/workspace.model';
import {
  ClinicalChartData,
  ClinicalChartDataset,
} from '../models/clinical-chart.model';
import { ClinicalEncounterList } from '../models/clinical-encounter.model';

@Injectable({
  providedIn: 'root',
})
export class ClinicalChartService {
  /**
   * Genera datos de previsualización realistas para el Wizard / Catálogo
   */
  getMockDataForChart(chartCode: string, chartTitle = ''): ClinicalChartData {
    const mockDates = [
      '10 Ene 2026',
      '14 Feb 2026',
      '20 Mar 2026',
      '25 Abr 2026',
      '30 May 2026',
    ];

    const code = (chartCode || '').toUpperCase();
    const title = (chartTitle || '').toLowerCase();

    // 1. Peso
    if (code.includes('WEIGHT') || code.includes('PESO') || title.includes('peso')) {
      return {
        chartCode,
        title: chartTitle || 'Evolución Somatométrica de Peso',
        description: 'Curva temporal de variación de peso corporal del paciente.',
        labels: mockDates,
        datasets: [
          {
            label: 'Peso Corporal (kg)',
            data: [74.5, 75.2, 74.0, 73.6, 73.1],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.12)',
            unit: 'kg',
            fill: true,
            tension: 0.3,
          },
        ],
        hasData: true,
      };
    }

    // 2. Presión Arterial
    if (
      code.includes('BP') ||
      code.includes('PRESSURE') ||
      code.includes('PRESION') ||
      title.includes('presión') ||
      title.includes('presion') ||
      title.includes('arterial')
    ) {
      return {
        chartCode,
        title: chartTitle || 'Registro y Tendencia de Presión Arterial',
        description: 'Monitoreo hemodinámico de tensión arterial sistólica y diastólica.',
        labels: mockDates,
        datasets: [
          {
            label: 'Presión Sistólica (PAS)',
            data: [138, 132, 128, 125, 120],
            borderColor: '#dc2626',
            backgroundColor: 'rgba(220, 38, 38, 0.05)',
            unit: 'mmHg',
            tension: 0.25,
          },
          {
            label: 'Presión Diastólica (PAD)',
            data: [88, 85, 82, 80, 78],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.05)',
            unit: 'mmHg',
            tension: 0.25,
          },
        ],
        hasData: true,
      };
    }

    // 3. IMC / BMI
    if (code.includes('BMI') || code.includes('IMC') || title.includes('imc') || title.includes('masa corporal')) {
      return {
        chartCode,
        title: chartTitle || 'Evolución del Índice de Masa Corporal (IMC)',
        description: 'Seguimiento nutricional y estado somatométrico longitudinal.',
        labels: mockDates,
        datasets: [
          {
            label: 'IMC (kg/m²)',
            data: [25.8, 26.0, 25.6, 25.4, 25.1],
            borderColor: '#d97706',
            backgroundColor: 'rgba(217, 119, 6, 0.12)',
            unit: 'kg/m²',
            fill: true,
            tension: 0.3,
          },
        ],
        hasData: true,
      };
    }

    // 4. Glucosa / HbA1c
    if (
      code.includes('GLUCOSE') ||
      code.includes('GLUC') ||
      code.includes('HBA1C') ||
      title.includes('gluc') ||
      title.includes('hba1c')
    ) {
      return {
        chartCode,
        title: chartTitle || 'Control Glucémico y HbA1c',
        description: 'Monitoreo metabólico de glucemia basal y hemoglobina glicosilada.',
        labels: mockDates,
        datasets: [
          {
            label: 'Glucemia Basal (mg/dL)',
            data: [118, 112, 105, 100, 96],
            borderColor: '#7c3aed',
            backgroundColor: 'rgba(124, 58, 237, 0.12)',
            unit: 'mg/dL',
            fill: true,
            tension: 0.3,
          },
        ],
        hasData: true,
      };
    }

    // 5. Talla / Altura
    if (code.includes('HEIGHT') || code.includes('TALLA') || title.includes('talla') || title.includes('altura')) {
      return {
        chartCode,
        title: chartTitle || 'Evolución Longitudinal de Talla / Altura',
        description: 'Crecimiento y altura en cada control médico.',
        labels: mockDates,
        datasets: [
          {
            label: 'Talla (cm)',
            data: [170.0, 170.2, 170.5, 170.6, 170.8],
            borderColor: '#059669',
            backgroundColor: 'rgba(5, 150, 105, 0.12)',
            unit: 'cm',
            fill: true,
            tension: 0.2,
          },
        ],
        hasData: true,
      };
    }

    // Default genérico
    return {
      chartCode,
      title: chartTitle || 'Gráfico Clínico',
      description: 'Valores longitudinales registrados en consulta.',
      labels: mockDates,
      datasets: [
        {
          label: 'Valor de Referencia',
          data: [12, 15, 18, 16, 21],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.12)',
          fill: true,
          tension: 0.3,
        },
      ],
      hasData: true,
    };
  }

  /**
   * Construye los datos reales de un gráfico a partir de las consultas del paciente
   */
  buildPatientChartData(
    chartDef: ChartDefinition,
    config: DoctorChartConfig,
    encounters: ClinicalEncounterList[]
  ): ClinicalChartData {
    if (!encounters || encounters.length === 0) {
      return {
        chartCode: chartDef.chartCode,
        title: chartDef.title,
        description: chartDef.description,
        labels: [],
        datasets: [],
        hasData: false,
      };
    }

    // Ordenar consultas cronológicamente ascendente
    const sorted = [...encounters].sort((a, b) => {
      const da = new Date(a.encounterDate).getTime();
      const db = new Date(b.encounterDate).getTime();
      return da - db;
    });

    const labels: string[] = sorted.map((e) => this.formatDateLabel(e.encounterDate));
    const datasets: ClinicalChartDataset[] = [];

    const colors = [
      { border: '#2563eb', bg: 'rgba(37, 99, 235, 0.1)' },
      { border: '#dc2626', bg: 'rgba(220, 38, 38, 0.05)' },
      { border: '#059669', bg: 'rgba(5, 150, 105, 0.1)' },
      { border: '#d97706', bg: 'rgba(217, 119, 6, 0.1)' },
    ];

    let hasAnyData = false;

    for (let i = 0; i < (chartDef.requiredSlots?.length || 0); i++) {
      const slot = chartDef.requiredSlots[i];
      if (slot.type === 'DATE' || slot.slot === 'x') {
        continue;
      }
      const mappedKey = config.fieldMappings?.[slot.slot];
      const color = colors[datasets.length % colors.length];

      const dataPoints: (number | null)[] = sorted.map((enc) => {
        let val: unknown = null;
        if (mappedKey && enc.dynamicData && mappedKey in enc.dynamicData) {
          val = enc.dynamicData[mappedKey];
        }

        // Fallbacks a vitalSigns si aplica
        if (val === null || val === undefined || val === '') {
          const sUpper = (slot.slot || '').toUpperCase();
          const mLower = (mappedKey || '').toLowerCase();
          const cUpper = (chartDef.chartCode || '').toUpperCase();
          if (sUpper.includes('WEIGHT') || mLower.includes('peso') || cUpper.includes('WEIGHT')) {
            val = enc.vitalSigns?.weightKg;
          } else if (sUpper.includes('HEIGHT') || mLower.includes('talla') || cUpper.includes('HEIGHT')) {
            val = enc.vitalSigns?.heightCm;
          } else if (sUpper.includes('SYSTOLIC') || mLower.includes('pas') || sUpper === 'SYSTOLIC') {
            val = enc.vitalSigns?.systolicBloodPressure;
          } else if (sUpper.includes('DIASTOLIC') || mLower.includes('pad') || sUpper === 'DIASTOLIC') {
            val = enc.vitalSigns?.diastolicBloodPressure;
          } else if (sUpper.includes('BMI') || mLower.includes('imc') || cUpper.includes('BMI')) {
            val = enc.vitalSigns?.bodyMassIndex;
          } else if (sUpper.includes('GLUCOSE') || mLower.includes('gluc') || cUpper.includes('GLYC')) {
            val = enc.dynamicData?.['glucemia'] ?? enc.dynamicData?.['glucose'];
          }
        }

        const num = val !== null && val !== undefined && val !== '' ? Number(val) : NaN;
        if (!isNaN(num)) {
          hasAnyData = true;
          return num;
        }
        return null;
      });

      datasets.push({
        label: slot.label,
        data: dataPoints,
        borderColor: color.border,
        backgroundColor: color.bg,
        fill: (chartDef.requiredSlots?.length || 0) === 1,
        tension: 0.25,
      });
    }

    return {
      chartCode: chartDef.chartCode,
      title: chartDef.title,
      description: chartDef.description,
      labels,
      datasets,
      hasData: hasAnyData,
    };
  }

  private formatDateLabel(isoString: string): string {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return isoString;
      return d.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
      });
    } catch {
      return isoString;
    }
  }
}
