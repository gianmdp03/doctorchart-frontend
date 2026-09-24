import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideStethoscope } from '@ng-icons/lucide';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';

export interface ConsultationExplorerItem {
  id: number;
  patientId: number;
  patientName: string;
  encounterDate: string;
  consultationType: string;
  chiefComplaint: string;
  primaryDiagnosis: string;
  primaryDiagnosisCode?: string | null;
}

@Component({
  selector: 'app-consultas',
  imports: [FormsModule, NgIcon],
  providers: [provideIcons({ lucideSearch, lucideStethoscope })],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.css',
})
export class ConsultasComponent implements OnInit {
  private readonly clinicalEncounterService = inject(ClinicalEncounterService);
  readonly activePatientService = inject(ActivePatientService);
  readonly specialtyService = inject(DoctorSpecialtyService);
  private readonly router = inject(Router);

  readonly searchQuery = signal<string>('');
  readonly consultations = signal<ConsultationExplorerItem[]>([]);
  readonly isLoading = signal<boolean>(true);

  readonly filteredConsultations = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.consultations();

    return this.consultations().filter(
      (consultation) =>
        consultation.patientName.toLowerCase().includes(query) ||
        consultation.chiefComplaint.toLowerCase().includes(query) ||
        consultation.primaryDiagnosis.toLowerCase().includes(query) ||
        consultation.primaryDiagnosisCode?.toLowerCase().includes(query),
    );
  });

  ngOnInit(): void {
    this.loadConsultations();
  }

  loadConsultations(): void {
    this.isLoading.set(true);
    this.clinicalEncounterService.getAll(0, 100).subscribe({
      next: (response) => {
        this.consultations.set((response.content || []).map((encounter) => ({
          id: encounter.id,
          patientId: encounter.patientId,
          patientName: encounter.patientFullName || 'Paciente sin nombre',
          encounterDate: this.formatEncounterDate(encounter.encounterDate),
          consultationType: this.getConsultationTypeLabel(encounter.consultationType),
          chiefComplaint: encounter.chiefComplaint || '—',
          primaryDiagnosis: encounter.primaryDiagnosisDescription || '—',
          primaryDiagnosisCode: encounter.primaryDiagnosisCode,
        })));
        this.isLoading.set(false);
      },
      error: () => {
        this.consultations.set([]);
        this.isLoading.set(false);
      },
    });
  }

  openPatientRecord(patientId: number): void {
    this.activePatientService.loadPatient(patientId);
    this.router.navigate(['/pacientes', patientId]);
  }

  openEncounterDetail(id: number): void {
    window.dispatchEvent(
      new CustomEvent('open-encounter-detail-modal', { detail: { encounterId: id } }),
    );
  }

  private formatEncounterDate(value: string): string {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? '—'
      : date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  private getConsultationTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      FIRST_VISIT: 'Primera consulta',
      FOLLOW_UP: 'Seguimiento',
      ROUTINE_CHECKUP: 'Control de rutina',
      EMERGENCY: 'Urgencia',
      INTERCONSULTATION: 'Interconsulta',
    };
    return labels[type] || type;
  }
}
