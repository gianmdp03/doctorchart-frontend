import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCalendar,
  lucideClock,
  lucideUsers,
  lucidePlus,
  lucideCheckCircle2,
  lucideAlertCircle,
  lucideStethoscope,
  lucidePhone,
  lucideChevronLeft,
  lucideChevronRight,
} from '@ng-icons/lucide';
import { PatientService } from '../../core/services/patient.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';

export type AppointmentStatus = 'WAITING' | 'IN_CONSULTATION' | 'COMPLETED' | 'ABSENT';

export interface AppointmentItem {
  id: number;
  time: string;
  patientId: number;
  patientName: string;
  ageDisplay: string;
  phone: string;
  reason: string;
  status: AppointmentStatus;
}

@Component({
  selector: 'app-agenda',
  imports: [NgIcon],
  providers: [
    provideIcons({
      lucideCalendar,
      lucideClock,
      lucideUsers,
      lucidePlus,
      lucideCheckCircle2,
      lucideAlertCircle,
      lucideStethoscope,
      lucidePhone,
      lucideChevronLeft,
      lucideChevronRight,
    }),
  ],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css',
})
export class AgendaComponent implements OnInit {
  private readonly patientService = inject(PatientService);
  readonly activePatientService = inject(ActivePatientService);
  readonly specialtyService = inject(DoctorSpecialtyService);
  private readonly router = inject(Router);

  readonly filterStatus = signal<'ALL' | AppointmentStatus>('ALL');
  readonly appointments = signal<AppointmentItem[]>([]);
  readonly isLoading = signal<boolean>(true);

  readonly todayFormatted = computed(() => {
    return new Date().toLocaleDateString('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  });

  readonly filteredAppointments = computed(() => {
    const list = this.appointments();
    const filter = this.filterStatus();
    if (filter === 'ALL') return list;
    return list.filter((a) => a.status === filter);
  });

  readonly waitingCount = computed(() => this.appointments().filter((a) => a.status === 'WAITING').length);
  readonly completedCount = computed(() => this.appointments().filter((a) => a.status === 'COMPLETED').length);

  ngOnInit(): void {
    this.loadAgenda();
  }

  loadAgenda(): void {
    this.isLoading.set(true);
    this.patientService.getPatients(0, 8, 'fullName,asc').subscribe({
      next: (res) => {
        const patients = res?.content || [];
        const times = ['08:30', '09:00', '09:30', '10:15', '11:00', '11:45', '12:30'];
        const statuses: AppointmentStatus[] = ['COMPLETED', 'IN_CONSULTATION', 'WAITING', 'WAITING', 'WAITING', 'WAITING', 'WAITING'];
        const reasons = [
          'Control de rutina y evolución',
          'Dolor de garganta y fiebre de 48hs',
          'Revisión de estudios de laboratorio',
          'Control antropométrico semestral',
          'Certificado de aptitud física',
          'Alergias cutáneas recurrentes',
          'Consulta preventiva y vacunas',
        ];

        const list: AppointmentItem[] = patients.slice(0, 7).map((p, idx) => ({
          id: 500 + idx,
          time: times[idx] || '10:00',
          patientId: p.id,
          patientName: p.fullName,
          ageDisplay: p.birthDate ? `${new Date().getFullYear() - new Date(p.birthDate).getFullYear()} años` : '—',
          phone: p.phone || '—',
          reason: reasons[idx] || 'Consulta general',
          status: statuses[idx] || 'WAITING',
        }));

        this.appointments.set(list);
        this.isLoading.set(false);
      },
      error: () => {
        this.appointments.set([]);
        this.isLoading.set(false);
      },
    });
  }

  startConsultation(item: AppointmentItem): void {
    this.activePatientService.loadPatient(item.patientId);
    const specialty = this.specialtyService.activeSpecialty();
    window.dispatchEvent(
      new CustomEvent('open-new-encounter-modal', {
        detail: {
          patientId: item.patientId,
          specialty,
        },
      })
    );
  }

  openPatientRecord(patientId: number): void {
    this.activePatientService.loadPatient(patientId);
    this.router.navigate(['/pacientes', patientId]);
  }

  getStatusClass(status: AppointmentStatus): string {
    switch (status) {
      case 'WAITING':
        return 'status-waiting';
      case 'IN_CONSULTATION':
        return 'status-consulting';
      case 'COMPLETED':
        return 'status-completed';
      case 'ABSENT':
        return 'status-absent';
    }
  }

  getStatusLabel(status: AppointmentStatus): string {
    switch (status) {
      case 'WAITING':
        return 'En espera';
      case 'IN_CONSULTATION':
        return 'En atención';
      case 'COMPLETED':
        return 'Atendido';
      case 'ABSENT':
        return 'Ausente';
    }
  }
}
