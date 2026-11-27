import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { AnnulmentPromptComponent } from '../annulment-prompt.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucidePill,
  lucideFileText,
  lucidePrinter,
  lucidePlus,
  lucideClock,
  lucideTrash2,
  lucideAlertCircle,
  lucideCheckCircle2,
} from '@ng-icons/lucide';
import { ClinicalEncounterList } from '../../../core/models/clinical-encounter.model';
import { PatientPrescriptionEditorStore } from './patient-prescription-editor.store';
@Component({
  selector: 'app-patient-prescriptions',
  imports: [FormsModule, RouterLink, NgIcon, AnnulmentPromptComponent],
  providers: [
    provideIcons({
      lucidePill,
      lucideFileText,
      lucidePrinter,
      lucidePlus,
      lucideClock,
      lucideTrash2,
      lucideAlertCircle,
      lucideCheckCircle2,
    }),
  ],
  templateUrl: './patient-prescriptions.component.html',
  styleUrl: './patient-prescriptions.component.css',
})
export class PatientPrescriptionsComponent implements OnInit {
  readonly pendingAnnulment = signal<number | null>(null);
  readonly editor = inject(PatientPrescriptionEditorStore);
  readonly latestEncounter = input<ClinicalEncounterList>();

  readonly signatureSelectValue = computed(() => {
    const choice = this.editor.signaturesService.selectedChoice();
    if (choice.mode === 'NONE') return 'none';
    if (choice.mode === 'SELECTED') return String(choice.signatureId);
    const fav = this.editor.signaturesService.favoriteSignature();
    return fav ? String(fav.id) : 'default';
  });

  ngOnInit(): void {
    void this.editor.signaturesService.load();
  }

  onSignatureSelect(raw: string): void {
    if (raw === 'none') {
      this.editor.signaturesService.setChoice({ mode: 'NONE' });
      return;
    }
    if (raw === 'default') {
      this.editor.signaturesService.setChoice({ mode: 'DEFAULT' });
      return;
    }
    const id = Number(raw);
    if (Number.isInteger(id) && id > 0) {
      this.editor.signaturesService.setChoice({ mode: 'SELECTED', signatureId: id });
    }
  }
}
