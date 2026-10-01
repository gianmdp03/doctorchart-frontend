import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideStethoscope,
  lucideCalendar,
  lucideFileText,
  lucideCheck,
  lucideX,
  lucideAlertCircle,
} from '@ng-icons/lucide';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import {
  ClinicalEncounterDetail,
  ClinicalEncounterRequest,
  ConsultationType,
} from '../../core/models/clinical-encounter.model';
import { MedicalSpecialty } from '../../core/models/specialty.model';
import { DynamicFormRendererComponent } from '../dynamic-form-renderer/dynamic-form-renderer.component';

@Component({
  selector: 'app-new-encounter-dialog',
  imports: [CommonModule, NgIcon, DynamicFormRendererComponent],
  providers: [
    provideIcons({
      lucideStethoscope,
      lucideCalendar,
      lucideFileText,
      lucideCheck,
      lucideX,
      lucideAlertCircle,
    }),
  ],
  templateUrl: './new-encounter-dialog.component.html',
  styleUrl: './new-encounter-dialog.component.css',
})
export class NewEncounterDialogComponent {
  private readonly encounterService = inject(ClinicalEncounterService);
  readonly workspaceStore = inject(WorkspaceStore);
  readonly specialtyService = inject(DoctorSpecialtyService);

  // Inputs & Outputs
  readonly isOpen = input<boolean>(false);
  readonly patientId = input<number | null>(null);
  readonly patientName = input<string>('');
  readonly previousEncountersCount = input<number>(0);
  readonly closeDialog = output<void>();
  readonly encounterCreated = output<ClinicalEncounterDetail>();

  // Consultation metadata. Clinical fields are defined exclusively by the workspace template.
  readonly consultationType = signal<ConsultationType>('FIRST_VISIT');

  // Dynamic Data & Status
  readonly dynamicFormData = signal<Record<string, unknown>>({});
  readonly isDynamicFormValid = signal<boolean>(true);
  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  // Active clinical template for this doctor
  readonly activeTemplate = computed(() => {
    return this.workspaceStore.defaultTemplate();
  });

  readonly consultationTypes = computed<{ value: ConsultationType; label: string }[]>(() => {
    if (this.previousEncountersCount() === 0) {
      return [{ value: 'FIRST_VISIT', label: 'Primera Consulta' }];
    }
    return [
      { value: 'FOLLOW_UP', label: 'Control / Seguimiento' },
      { value: 'ROUTINE_CHECKUP', label: 'Chequeo de Rutina' },
      { value: 'EMERGENCY', label: 'Urgencia' },
      { value: 'INTERCONSULTATION', label: 'Interconsulta' },
    ];
  });

  constructor() {
    effect(() => {
      const count = this.previousEncountersCount();
      const current = this.consultationType();
      if (count === 0) {
        if (current !== 'FIRST_VISIT') {
          this.consultationType.set('FIRST_VISIT');
        }
      } else {
        if (current === 'FIRST_VISIT') {
          this.consultationType.set('FOLLOW_UP');
        }
      }
    });
  }

  onDynamicDataChange(values: Record<string, unknown>): void {
    this.dynamicFormData.set(values);
  }

  onDynamicFormValidityChange(valid: boolean): void {
    this.isDynamicFormValid.set(valid);
  }

  async submitEncounter(): Promise<void> {
    const pid = this.patientId();
    if (!pid) {
      this.errorMessage.set('No hay paciente activo seleccionado.');
      return;
    }

    const tmpl = this.activeTemplate();
    if (!tmpl) {
      this.errorMessage.set('No hay un formulario de consulta configurado para esta cuenta.');
      return;
    }

    if (!this.isDynamicFormValid()) {
      this.errorMessage.set('Por favor complete todos los campos obligatorios del formulario clínico.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    // Build historical label snapshot from active template
    const snapshot: Record<string, string> = {};
    if (tmpl?.schemaDefinition?.categories) {
      for (const cat of tmpl.schemaDefinition.categories) {
        if (cat.enabled !== false && cat.fields) {
          for (const f of cat.fields) {
            snapshot[f.key] = f.label;
          }
        }
      }
    }

    const wsCode =
      typeof this.workspaceStore.specialtyCode === 'function'
        ? this.workspaceStore.specialtyCode()
        : null;
    const rawSpec =
      wsCode ||
      this.specialtyService.activeSpecialty() ||
      'GENERAL_MEDICINE';
    const currentSpec = rawSpec
      .trim()
      .toUpperCase()
      .replace(/-/g, '_')
      .replace(/\s+/g, '_') as MedicalSpecialty;

    const { chiefComplaint, diagnosis } = this.extractClinicalSummary(
      this.dynamicFormData(),
      snapshot
    );

    const { peso, talla, perimetroEncefalico } = this.extractSomatometrics(this.dynamicFormData());

    const payload: ClinicalEncounterRequest = {
      patientId: pid,
      encounterDate: new Date().toISOString(),
      specialty: currentSpec,
      consultationType: this.consultationType(),
      chiefComplaint,
      primaryDiagnosisDescription: diagnosis,
      primaryDiagnosisCode: null,
      peso,
      talla,
      perimetroEncefalico,
      vitalSigns:
        peso !== null || talla !== null || perimetroEncefalico !== null
          ? {
              weightKg: peso,
              heightCm: talla,
              headCircumferenceCm: perimetroEncefalico,
            }
          : undefined,
      templateId: tmpl?.id || null,
      dynamicData: this.dynamicFormData(),
      snapshotFieldLabels: snapshot,
    };

    this.encounterService.create(payload).subscribe({
      next: (created) => {
        this.isSubmitting.set(false);
        this.resetForm();
        this.encounterCreated.emit(created);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('encounter-created', { detail: created }));
        }
        this.close();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(
          err?.error?.message || 'Error al guardar la consulta clínica. Reintente.'
        );
      },
    });
  }

  resetForm(): void {
    this.consultationType.set(this.previousEncountersCount() === 0 ? 'FIRST_VISIT' : 'FOLLOW_UP');
    this.dynamicFormData.set({});
    this.errorMessage.set(null);
  }

  close(): void {
    this.closeDialog.emit();
  }

  private extractClinicalSummary(
    values: Record<string, unknown>,
    labels: Record<string, string>
  ): { chiefComplaint: string; diagnosis: string } {
    const entries = Object.entries(values)
      .filter(([, val]) => val !== null && val !== undefined && String(val).trim() !== '')
      .map(([key, val]) => ({
        key,
        label: labels[key] || key,
        text: typeof val === 'boolean' ? (val ? 'Sí' : 'No') : String(val).trim(),
      }));

    if (entries.length === 0) {
      return { chiefComplaint: 'Consulta registrada', diagnosis: 'Evaluación clínica' };
    }

    const complaintEntry = entries.find((e) =>
      /motivo|consulta|sintoma|síntoma|evolucion|evolución|razon|razón/i.test(`${e.key} ${e.label}`)
    );
    const diagnosisEntry = entries.find((e) =>
      /diagnostico|diagnóstico|conclusion|conclusión|impresion|impresión|evaluacion|evaluación|hallazgo|indicacion|indicación|plan/i.test(
        `${e.key} ${e.label}`
      )
    );

    const first = complaintEntry ?? entries[0];
    const second =
      diagnosisEntry && diagnosisEntry.key !== first.key
        ? diagnosisEntry
        : entries.find((e) => e.key !== first.key);

    const chiefComplaint = first.text;
    const diagnosis = second ? second.text : chiefComplaint;

    return { chiefComplaint, diagnosis };
  }

  private extractSomatometrics(values: Record<string, unknown>): {
    peso: number | null;
    talla: number | null;
    perimetroEncefalico: number | null;
  } {
    const parseNum = (val: unknown): number | null => {
      if (val === null || val === undefined || val === '') return null;
      if (typeof val === 'number') return isNaN(val) ? null : val;
      if (typeof val === 'string') {
        const clean = val.replace(/,/g, '.').replace(/[^\d.-]/g, '').trim();
        const n = parseFloat(clean);
        return isNaN(n) ? null : n;
      }
      return null;
    };

    const findVal = (keys: string[]): number | null => {
      for (const k of keys) {
        if (k in values) {
          const v = parseNum(values[k]);
          if (v !== null) return v;
        }
      }
      const lowerKeys = Object.keys(values).reduce<Record<string, unknown>>((acc, k) => {
        acc[k.toLowerCase()] = values[k];
        return acc;
      }, {});
      for (const k of keys) {
        const v = parseNum(lowerKeys[k.toLowerCase()]);
        if (v !== null) return v;
      }
      return null;
    };

    return {
      peso: findVal(['peso', 'weight', 'weightKg', 'pesoKg', 'peso_kg']),
      talla: findVal([
        'talla',
        'height',
        'heightCm',
        'tallaCm',
        'talla_cm',
        'estatura',
        'longitud',
      ]),
      perimetroEncefalico: findVal([
        'perimetroEncefalico',
        'perimetro_encefalico',
        'perimetroCefalico',
        'perimetro_cefalico',
        'perimetroCraneal',
        'perimetro_craneal',
        'headCircumference',
        'head_circumference',
        'pc',
      ]),
    };
  }
}


