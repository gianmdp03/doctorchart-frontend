import {
  Directive,
  OnChanges,
  SimpleChanges,
  ViewContainerRef,
  inject,
  input,
  inputBinding,
  output,
  outputBinding,
  Binding,
} from '@angular/core';
import { PatientDetailDTO } from '../../core/models/patient.model';
import { ClinicalEncounterList } from '../../core/models/clinical-encounter.model';
import { PatientRecordModule } from './patient-record-modules';

/** Mounts only the selected module, using the record's injector and scoped stores. */
@Directive({ selector: '[recordModule]' })
export class PatientRecordModuleDirective implements OnChanges {
  private readonly container = inject(ViewContainerRef);
  readonly recordModule = input.required<PatientRecordModule>();
  readonly patient = input.required<PatientDetailDTO>();
  readonly latestEncounter = input<ClinicalEncounterList>();
  readonly editPatient = output<void>();
  readonly newEncounter = output<void>();
  readonly patientUpdated = output<PatientDetailDTO>();

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['recordModule']) return;
    const module = this.recordModule();
    const bindings: Binding[] = [];
    if (module.patientInput) bindings.push(inputBinding(module.patientInput, this.patient));
    if (module.patientIdInput)
      bindings.push(inputBinding(module.patientIdInput, () => this.patient().id));
    if (module.encounterInput)
      bindings.push(inputBinding(module.encounterInput, this.latestEncounter));
    if (module.editOutput)
      bindings.push(outputBinding(module.editOutput, () => this.editPatient.emit()));
    if (module.encounterOutput)
      bindings.push(outputBinding(module.encounterOutput, () => this.newEncounter.emit()));
    if (module.patientUpdatedOutput)
      bindings.push(
        outputBinding<PatientDetailDTO>(module.patientUpdatedOutput, (patient) =>
          this.patientUpdated.emit(patient),
        ),
      );
    this.container.clear();
    this.container.createComponent(module.component, { bindings });
  }
}
