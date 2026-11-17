import { Component, computed, inject } from '@angular/core';
import { GrowthChartComponent } from '../growth-chart/growth-chart.component';
import { PatientGrowthStore } from './patient-growth.store';
import { PatientEncountersStore } from '../patient-encounters/patient-encounters.store';
import { GrowthMetricType } from '../../../core/models/growth-chart.model';
@Component({
  selector: 'app-patient-growth',
  imports: [GrowthChartComponent],
  templateUrl: './patient-growth.component.html',
  styleUrl: './patient-growth.component.css',
})
export class PatientGrowthComponent {
  readonly growth = inject(PatientGrowthStore);
  private readonly history = inject(PatientEncountersStore);
  readonly encounters = computed(() => new Map(this.history.encounters().map((e) => [e.id, e])));
  readonly isDown = computed(() => this.growth.referenceFamily() === 'DOWN');
  readonly metricOptions = computed(() =>
    this.isDown() ? this.growth.downCategories() : this.growth.categories(),
  );
  readonly metric = computed(() => {
    if (!this.isDown()) return this.growth.effectiveMetric();
    const selected = this.growth.selectedDownMetric();
    return selected === 'ALL' ||
      this.metricOptions().some((option) => option.indicator === selected)
      ? selected
      : this.metricOptions()[0]?.indicator;
  });
  readonly visibleCharts = computed(() =>
    this.isDown()
      ? this.growth.downCharts().filter(
          (chart) => this.metric() === 'ALL' || this.metric() === chart.definition.indicator,
        )
      : this.growth.visibleCharts(),
  );

  selectMetric(metric: GrowthMetricType | 'ALL'): void {
    if (!this.isDown()) this.growth.selectedGrowthMetric.set(metric);
    else if (metric === 'HEIGHT' || metric === 'BMI' || metric === 'ALL')
      this.growth.selectedDownMetric.set(metric);
  }
}
