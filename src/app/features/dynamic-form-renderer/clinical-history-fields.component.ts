import { Component, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideShieldAlert,
  lucideHeartPulse,
  lucidePill,
  lucideLockKeyhole,
} from '@ng-icons/lucide';
import {
  CLINICAL_HISTORY_GROUPS,
  createClinicalHistoryCategory,
  WizardFormValues,
} from '../../core/models/wizard-definition.model';

@Component({
  selector: 'app-clinical-history-fields',
  imports: [FormsModule, NgIcon],
  providers: [provideIcons({ lucideShieldAlert, lucideHeartPulse, lucidePill, lucideLockKeyhole })],
  templateUrl: './clinical-history-fields.component.html',
  styleUrl: './clinical-history-fields.component.css',
})
export class ClinicalHistoryFieldsComponent {
  readonly values = input<WizardFormValues>({});
  readonly readonly = input(false);
  readonly showErrors = input(false);
  readonly encounter = input(false);
  readonly valuesChange = output<WizardFormValues>();
  readonly groups = CLINICAL_HISTORY_GROUPS;
  readonly fields = createClinicalHistoryCategory().fields;
  readonly reviewed = computed(() =>
    this.groups.some((g) => ['PRESENT', 'NONE'].includes(String(this.values()[g.status]))),
  );
  readonly states = [
    { value: 'UNKNOWN', label: 'Sin información' },
    { value: 'NONE', label: 'No refiere' },
    { value: 'PRESENT', label: 'Sí, registrar' },
  ];
  choose(status: string, details: string, value: string): void {
    if (this.readonly()) return;
    this.valuesChange.emit({
      ...this.values(),
      [status]: value,
      ...(value !== 'PRESENT' ? { [details]: null } : {}),
    });
  }
  update(key: string, value: string): void {
    if (!this.readonly()) this.valuesChange.emit({ ...this.values(), [key]: value || null });
  }
  placeholder(key: string): string {
    return this.fields.find((f) => f.key === key)?.placeholder ?? '';
  }
}
