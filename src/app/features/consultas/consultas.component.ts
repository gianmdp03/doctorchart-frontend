import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideStethoscope,
  lucideSearch,
  lucideEye,
  lucideChevronRight,
  lucideCalendar,
  lucideUser,
  lucideFilter,
} from '@ng-icons/lucide';
import { PatientService } from '../../core/services/patient.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { SPECIALTY_OPTIONS } from '../../core/models/specialty.model';

export interface ConsultationExplorerItem {
  id: number;
  patientId: number;
  patientName: string;
  encounterDate: string;
  specialty: string;
  consultationType: string;
  chiefComplaint: string;
  primaryDiagnosis: string;
  primaryDiagnosisCode?: string | null;
}

@Component({
  selector: 'app-consultas',
  imports: [FormsModule, NgIcon],
  providers: [
    provideIcons({
      lucideStethoscope,
      lucideSearch,
      lucideEye,
      lucideChevronRight,
      lucideCalendar,
      lucideUser,
      lucideFilter,
    }),
  ],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.css',
})
export class ConsultasComponent implements OnInit {
  private readonly patientService = inject(PatientService);
  readonly activePatientService = inject(ActivePatientService);
  readonly specialtyService = inject(DoctorSpecialtyService);
  private readonly router = inject(Router);

  readonly searchQuery = signal<string>('');
  readonly selectedSpecialty = signal<string>('ALL');
  readonly consultations = signal<ConsultationExplorerItem[]>([]);
  readonly isLoading = signal<boolean>(true);

  readonly specialtyOptions = SPECIALTY_OPTIONS;

  readonly filteredConsultations = computed(() => {
    let list = this.consultations();
    const query = this.searchQuery().toLowerCase().trim();
    const spec = this.selectedSpecialty();

    if (spec !== 'ALL') {
      list = list.filter((c) => c.specialty.toLowerCase() === spec.toLowerCase());
    }

    if (query) {
      list = list.filter(
        (c) =>
          c.patientName.toLowerCase().includes(query) ||
          c.chiefComplaint.toLowerCase().includes(query) ||
          c.primaryDiagnosis.toLowerCase().includes(query) ||
          (c.primaryDiagnosisCode && c.primaryDiagnosisCode.toLowerCase().includes(query))
      );
    }

    return list;
  });

  ngOnInit(): void {
    this.loadConsultations();
  }

  loadConsultations(): void {
    this.isLoading.set(true);
    this.patientService.getPatients(0, 10, 'fullName,asc').subscribe({
      next: (res) => {
        const patients = res?.content || [];
        const types = ['Primera Vez', 'Seguimiento', 'Control de Rutina', 'Seguimiento'];
        const complaints = [
          'Evaluación antropométrica y control de crecimiento',
          'Dolor torácico atípico y palpitaciones',
          'Cefalea holocraneana de 3 días de evolución',
          'Consulta prenatal de rutina (12 semanas)',
          'Fiebre y tos productiva',
          'Control de presión arterial y ajuste de medicación',
        ];
        const diagnoses = [
          { code: 'Z00.1', desc: 'Control de salud de rutina del niño' },
          { code: 'I10', desc: 'Hipertensión esencial (primaria)' },
          { code: 'G44.2', desc: 'Cefalea debida a tensión' },
          { code: 'Z34.0', desc: 'Supervisión de primer embarazo normal' },
          { code: 'J20.9', desc: 'Bronquitis aguda, no especificada' },
          { code: 'I11.9', desc: 'Enfermedad cardíaca hipertensiva sin insuficiencia' },
        ];

        const list: ConsultationExplorerItem[] = patients.map((p, idx) => {
          const d = diagnoses[idx % diagnoses.length];
          const now = new Date();
          now.setDate(now.getDate() - idx * 2);

          return {
            id: 200 + idx,
            patientId: p.id,
            patientName: p.fullName,
            encounterDate: now.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            specialty: this.specialtyService.currentSpecialtyOption().shortLabel,
            consultationType: types[idx % types.length],
            chiefComplaint: complaints[idx % complaints.length],
            primaryDiagnosis: d.desc,
            primaryDiagnosisCode: d.code,
          };
        });

        this.consultations.set(list);
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
      new CustomEvent('open-encounter-detail-modal', {
        detail: { encounterId: id },
      })
    );
  }
}
