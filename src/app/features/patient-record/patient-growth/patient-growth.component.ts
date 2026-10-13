import { Component, computed, inject } from '@angular/core';
import { GrowthChartComponent } from '../growth-chart/growth-chart.component';
import { PatientGrowthStore } from './patient-growth.store';
import { PatientEncountersStore } from '../patient-encounters/patient-encounters.store';
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
}
