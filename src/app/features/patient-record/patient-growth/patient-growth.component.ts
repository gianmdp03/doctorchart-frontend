import { Component, inject } from '@angular/core';
import { GrowthChartComponent } from '../growth-chart/growth-chart.component';
import { PatientGrowthStore } from './patient-growth.store';
@Component({
  selector: 'app-patient-growth',
  imports: [GrowthChartComponent],
  templateUrl: './patient-growth.component.html',
  styleUrl: './patient-growth.component.css',
})
export class PatientGrowthComponent {
  readonly growth = inject(PatientGrowthStore);
}
