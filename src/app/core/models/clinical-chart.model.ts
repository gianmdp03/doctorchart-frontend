export interface ClinicalChartDataset {
  label: string;
  data: (number | null)[];
  borderColor?: string;
  backgroundColor?: string;
  unit?: string;
  yAxisID?: string;
  fill?: boolean;
  tension?: number;
  borderWidth?: number;
  pointRadius?: number;
  pointHoverRadius?: number;
}

export interface ClinicalChartData {
  chartCode: string;
  title: string;
  description?: string;
  labels: string[];
  datasets: ClinicalChartDataset[];
  hasData: boolean;
}
