import {
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { Router } from '@angular/router';
import { ActivePatientService } from '../../core/services/active-patient.service';

export type MilestoneStage =
  | '0-3'
  | '4-6'
  | '7-9'
  | '10-12'
  | '12-24'
  | '2-3a'
  | '3-5a'
  | '6-11a'
  | '12-15a';

export interface StageTab {
  id: MilestoneStage;
  label: string;
  isPatientStage: boolean;
}

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrl: './milestones.component.css',
})
export class MilestonesComponent {
  readonly activePatientService = inject(ActivePatientService);
  private readonly router = inject(Router);

  readonly selectedStage = signal<MilestoneStage>('4-6');

  readonly patientAgeInMonths = computed<number | null>(() => {
    const raw = this.activePatientService.activePatient()?.birthDate;
    if (!raw) return null;
    const birth = new Date(raw + 'T00:00:00');
    if (isNaN(birth.getTime())) return null;

    const now = new Date();
    let months =
      (now.getFullYear() - birth.getFullYear()) * 12 +
      (now.getMonth() - birth.getMonth());
    if (now.getDate() < birth.getDate()) {
      months--;
    }
    return Math.max(0, months);
  });

  readonly patientStage = computed<MilestoneStage | null>(() => {
    const months = this.patientAgeInMonths();
    if (months === null) return null;
    if (months <= 3) return '0-3';
    if (months <= 6) return '4-6';
    if (months <= 9) return '7-9';
    if (months <= 12) return '10-12';
    if (months <= 24) return '12-24';
    if (months <= 36) return '2-3a';
    if (months <= 60) return '3-5a';
    if (months <= 132) return '6-11a';
    if (months <= 180) return '12-15a';
    return null;
  });

  readonly patientStageLabel = computed<string>(() => {
    const stage = this.patientStage();
    if (!stage) return '';
    const map: Record<MilestoneStage, string> = {
      '0-3': '0 a 3 meses',
      '4-6': '4 a 6 meses',
      '7-9': '7 a 9 meses',
      '10-12': '10 a 12 meses',
      '12-24': '1 a 2 años',
      '2-3a': '2 a 3 años',
      '3-5a': '3 a 5 años',
      '6-11a': '6 a 11 años',
      '12-15a': '12 a 15 años',
    };
    return map[stage] || stage;
  });

  readonly stages = computed<StageTab[]>(() => {
    const currentPatientStage = this.patientStage();
    const stageDefinitions: { id: MilestoneStage; baseLabel: string }[] = [
      { id: '0-3', baseLabel: '0 a 3 Meses' },
      { id: '4-6', baseLabel: '4 a 6 Meses' },
      { id: '7-9', baseLabel: '7 a 9 Meses' },
      { id: '10-12', baseLabel: '10 a 12 Meses' },
      { id: '12-24', baseLabel: '1 a 2 Años' },
      { id: '2-3a', baseLabel: '2 a 3 Años' },
      { id: '3-5a', baseLabel: '3 a 5 Años' },
      { id: '6-11a', baseLabel: '6 a 11 Años' },
      { id: '12-15a', baseLabel: '12 a 15 Años' },
    ];

    return stageDefinitions.map((def) => {
      const isPatientStage = currentPatientStage === def.id;
      return {
        id: def.id,
        label: isPatientStage
          ? `${def.baseLabel} (Rango del Paciente)`
          : def.baseLabel,
        isPatientStage,
      };
    });
  });

  constructor() {
    effect(() => {
      const stage = this.patientStage();
      untracked(() => {
        if (stage) {
          this.selectedStage.set(stage);
        }
      });
    });
  }

  selectStage(stage: MilestoneStage): void {
    this.selectedStage.set(stage);
  }

  goToPatientRecord(): void {
    this.router.navigate(['/ficha']);
  }
}
