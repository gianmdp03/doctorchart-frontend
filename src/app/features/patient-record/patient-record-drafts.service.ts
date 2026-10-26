import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { ConsultationType, PrescriptionItem } from '../../core/models/clinical-encounter.model';
import { WizardFormValues } from '../../core/models/wizard-definition.model';

/** Unsaved inputs only. Persisted clinical records always come from the API. */
@Injectable({ providedIn: 'root' })
export class PatientRecordDraftsService {
  private readonly auth = inject(AuthService);
  private readonly activePatient = inject(ActivePatientService);
  private context = '';

  readonly study = {
    file: signal<File | null>(null),
    name: signal(''),
    description: signal(''),
  };
  readonly encounter = {
    open: signal(false),
    values: signal<WizardFormValues>({}),
    type: signal<ConsultationType | null>(null),
    instant: signal<string | null>(null),
  };
  readonly prescription = {
    mode: signal<'MEDICATION' | 'STUDY'>('MEDICATION'),
    medicationName: signal(''),
    dosage: signal(''),
    frequency: signal('Cada 8 horas'),
    route: signal('Vía Oral'),
    duration: signal<number | string | null>(null),
    instructions: signal(''),
    studyName: signal(''),
    studySpecification: signal(''),
    diagnosis: signal(''),
    generalInstructions: signal(''),
    medications: signal<PrescriptionItem[]>([]),
    studies: signal<string[]>([]),
  };

  constructor() {
    effect(() => {
      this.auth.currentUser();
      this.activePatient.patientId();
      untracked(() => this.syncContext());
    });
  }

  /** Also synchronize before a routed component reads a draft, without waiting for effects. */
  syncContext(): this {
    const context = JSON.stringify([this.auth.currentUser()?.id ?? null, this.activePatient.patientId()]);
    if (context === this.context) return this;
    this.context = context;
    this.study.file.set(null); this.study.name.set(''); this.study.description.set('');
    this.encounter.open.set(false); this.encounter.values.set({});
    this.encounter.type.set(null); this.encounter.instant.set(null);
    const rx = this.prescription;
    rx.mode.set('MEDICATION'); rx.medicationName.set(''); rx.dosage.set('');
    rx.frequency.set('Cada 8 horas'); rx.route.set('Vía Oral'); rx.duration.set(null);
    rx.instructions.set(''); rx.studyName.set(''); rx.studySpecification.set('');
    rx.diagnosis.set(''); rx.generalInstructions.set(''); rx.medications.set([]); rx.studies.set([]);
    return this;
  }
}
