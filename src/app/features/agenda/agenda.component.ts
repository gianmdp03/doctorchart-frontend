import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  lucideX,
  lucideUser,
  lucideCheck,
} from '@ng-icons/lucide';
import { PatientService } from '../../core/services/patient.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { AppointmentService } from '../../core/services/appointment.service';
import { PatientListDTO } from '../../core/models/patient.model';
import { AppointmentStatus as BackendAppointmentStatus, AppointmentRequest } from '../../core/models/appointment.model';

export type AgendaAppointmentStatus =
  | 'WAITING'
  | 'WAITING_ROOM'
  | 'IN_CONSULTATION'
  | 'COMPLETED'
  | 'SCHEDULED'
  | 'ABSENT'
  | 'CANCELLED'
  | 'NO_SHOW';

export interface AppointmentItem {
  id: number;
  time: string;
  patientId: number;
  patientName: string;
  ageDisplay: string;
  phone: string;
  reason: string;
  status: AgendaAppointmentStatus;
  scheduledAt?: string;
  durationMinutes?: number;
  specialty?: string;
}

export interface WeekDayItem {
  date: Date;
  dateStr: string;
  dayName: string;
  dayNumber: number;
  monthName: string;
  isToday: boolean;
  isSelected: boolean;
  count: number;
}

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon],
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
      lucideX,
      lucideUser,
      lucideCheck,
    }),
  ],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css',
})
export class AgendaComponent implements OnInit {
  private readonly patientService = inject(PatientService);
  readonly activePatientService = inject(ActivePatientService);
  readonly specialtyService = inject(DoctorSpecialtyService);
  readonly appointmentService = inject(AppointmentService, { optional: true });
  private readonly router = inject(Router);

  // View state: DAY or WEEK
  readonly viewMode = signal<'DAY' | 'WEEK'>('DAY');
  readonly selectedDate = signal<Date>(new Date());
  readonly filterStatus = signal<'ALL' | AgendaAppointmentStatus>('ALL');

  readonly appointments = signal<AppointmentItem[]>([]);
  readonly isLoading = signal<boolean>(true);

  // New Appointment Modal State
  readonly isNewModalOpen = signal<boolean>(false);
  readonly isSavingAppointment = signal<boolean>(false);
  readonly availablePatients = signal<PatientListDTO[]>([]);
  readonly selectedPatientId = signal<number | null>(null);
  readonly newAppointmentTime = signal<string>('10:00');
  readonly newAppointmentDuration = signal<number>(30);
  readonly newAppointmentReason = signal<string>('Control y evolución clínica');

  readonly todayFormatted = computed(() => {
    return this.selectedDate().toLocaleDateString('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  });

  readonly periodHeading = computed(() => {
    if (this.viewMode() === 'DAY') {
      return this.todayFormatted();
    }
    const days = this.weekDays();
    if (days.length === 0) return 'Semana';
    const first = days[0];
    const last = days[days.length - 1];
    return `Semana del ${first.dayNumber} de ${first.monthName} al ${last.dayNumber} de ${last.monthName}`;
  });

  readonly weekDays = computed<WeekDayItem[]>(() => {
    const current = new Date(this.selectedDate());
    const day = current.getDay();
    const diffToMonday = (day === 0 ? -6 : 1) - day;
    const monday = new Date(current);
    monday.setDate(current.getDate() + diffToMonday);

    const days: WeekDayItem[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const isToday = this.isSameDay(d, new Date());
      const isSelected = this.isSameDay(d, this.selectedDate());
      const dateStr = d.toISOString().split('T')[0];
      const count = this.appointments().filter((a) => {
        if (a.scheduledAt) {
          return a.scheduledAt.startsWith(dateStr);
        }
        return isSelected;
      }).length;

      days.push({
        date: d,
        dateStr,
        dayName: d.toLocaleDateString('es-AR', { weekday: 'short' }),
        dayNumber: d.getDate(),
        monthName: d.toLocaleDateString('es-AR', { month: 'short' }),
        isToday,
        isSelected,
        count,
      });
    }
    return days;
  });

  readonly filteredAppointments = computed(() => {
    const list = this.appointments();
    const filter = this.filterStatus();
    if (filter === 'ALL') return list;

    if (filter === 'WAITING' || filter === 'WAITING_ROOM') {
      return list.filter((a) => a.status === 'WAITING' || a.status === 'WAITING_ROOM');
    }
    if (filter === 'COMPLETED') {
      return list.filter((a) => a.status === 'COMPLETED');
    }
    if (filter === 'IN_CONSULTATION') {
      return list.filter((a) => a.status === 'IN_CONSULTATION');
    }
    return list.filter((a) => a.status === filter);
  });

  readonly waitingCount = computed(
    () =>
      this.appointments().filter((a) => a.status === 'WAITING' || a.status === 'WAITING_ROOM').length
  );
  readonly completedCount = computed(
    () => this.appointments().filter((a) => a.status === 'COMPLETED').length
  );
  readonly inConsultationCount = computed(
    () => this.appointments().filter((a) => a.status === 'IN_CONSULTATION').length
  );

  ngOnInit(): void {
    this.loadAgenda();
  }

  loadAgenda(): void {
    this.isLoading.set(true);

    this.patientService.getPatients(0, 20, 'fullName,asc').subscribe({
      next: (res) => {
        const patients = res?.content || [];
        this.availablePatients.set(patients);
        if (patients.length > 0 && !this.selectedPatientId()) {
          this.selectedPatientId.set(patients[0].id);
        }

        const times = ['08:30', '09:00', '09:30', '10:15', '11:00', '11:45', '12:30'];
        const statuses: AgendaAppointmentStatus[] = [
          'COMPLETED',
          'IN_CONSULTATION',
          'WAITING_ROOM',
          'WAITING_ROOM',
          'SCHEDULED',
          'SCHEDULED',
          'SCHEDULED',
        ];
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
          ageDisplay: p.birthDate
            ? `${new Date().getFullYear() - new Date(p.birthDate).getFullYear()} años`
            : '—',
          phone: p.phone || '—',
          reason: reasons[idx] || 'Consulta general',
          status: statuses[idx] || 'WAITING',
          scheduledAt: new Date().toISOString(),
          durationMinutes: 30,
        }));

        this.appointments.set(list);
        this.isLoading.set(false);

        // If appointmentService exists, query backend appointments for selected date
        if (this.appointmentService) {
          const start = new Date(this.selectedDate());
          start.setHours(0, 0, 0, 0);
          const end = new Date(this.selectedDate());
          end.setHours(23, 59, 59, 999);

          this.appointmentService.getAppointments(start.toISOString(), end.toISOString()).subscribe({
            next: (backendList) => {
              if (backendList && backendList.length > 0) {
                const mapped: AppointmentItem[] = backendList.map((a) => {
                  const d = new Date(a.scheduledAt);
                  const time = !isNaN(d.getTime())
                    ? d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
                    : '10:00';
                  return {
                    id: a.id,
                    time,
                    patientId: a.patientId,
                    patientName: a.patientFullName,
                    ageDisplay: '—',
                    phone: a.patientPhone || '—',
                    reason: a.reason || 'Consulta general',
                    status: a.status,
                    scheduledAt: a.scheduledAt,
                    durationMinutes: a.durationMinutes,
                    specialty: a.specialty,
                  };
                });
                this.appointments.set(mapped);
              }
            },
            error: () => {},
          });
        }
      },
      error: () => {
        this.appointments.set([]);
        this.isLoading.set(false);
      },
    });
  }

  setViewMode(mode: 'DAY' | 'WEEK'): void {
    this.viewMode.set(mode);
  }

  selectDay(d: Date): void {
    this.selectedDate.set(new Date(d));
    this.viewMode.set('DAY');
    this.loadAgenda();
  }

  prevPeriod(): void {
    const d = new Date(this.selectedDate());
    if (this.viewMode() === 'DAY') {
      d.setDate(d.getDate() - 1);
    } else {
      d.setDate(d.getDate() - 7);
    }
    this.selectedDate.set(d);
    this.loadAgenda();
  }

  nextPeriod(): void {
    const d = new Date(this.selectedDate());
    if (this.viewMode() === 'DAY') {
      d.setDate(d.getDate() + 1);
    } else {
      d.setDate(d.getDate() + 7);
    }
    this.selectedDate.set(d);
    this.loadAgenda();
  }

  goToToday(): void {
    this.selectedDate.set(new Date());
    this.loadAgenda();
  }

  startConsultation(item: AppointmentItem): void {
    if (!item) return;
    // 1. Update status to IN_CONSULTATION
    this.updateStatus(item, 'IN_CONSULTATION');

    // 2. Set active patient
    this.activePatientService.loadPatient(item.patientId);

    // 3. Navigate into patient record context
    this.router.navigate(['/pacientes', item.patientId]).catch(() => {});

    // 4. Preload and trigger SOAP modal
    const specialty = item.specialty || this.specialtyService.activeSpecialty();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-new-encounter-modal', {
          detail: {
            patientId: item.patientId,
            specialty,
            reason: item.reason,
            chiefComplaint: item.reason,
          },
        })
      );
    }
  }

  openPatientRecord(patientId: number): void {
    this.activePatientService.loadPatient(patientId);
    this.router.navigate(['/pacientes', patientId]);
  }

  updateStatus(item: AppointmentItem, newStatus: AgendaAppointmentStatus, event?: Event): void {
    if (event) event.stopPropagation();
    if (!item) return;
    item.status = newStatus;
    this.appointments.update((list) => [...list]);

    if (this.appointmentService && item.id) {
      const backendStatus: BackendAppointmentStatus =
        newStatus === 'WAITING' ? 'WAITING_ROOM' : newStatus === 'ABSENT' ? 'NO_SHOW' : (newStatus as BackendAppointmentStatus);

      this.appointmentService.updateStatus(item.id, backendStatus).subscribe({
        error: () => {},
      });
    }
  }

  openNewAppointmentModal(): void {
    this.isNewModalOpen.set(true);
  }

  closeNewAppointmentModal(): void {
    this.isNewModalOpen.set(false);
  }

  saveNewAppointment(): void {
    const pId = this.selectedPatientId();
    if (!pId) return;

    this.isSavingAppointment.set(true);

    const [hours, minutes] = this.newAppointmentTime().split(':').map(Number);
    const scheduled = new Date(this.selectedDate());
    scheduled.setHours(hours || 10, minutes || 0, 0, 0);

    const request: AppointmentRequest = {
      patientId: pId,
      scheduledAt: scheduled.toISOString(),
      durationMinutes: this.newAppointmentDuration(),
      specialty: this.specialtyService.activeSpecialty() || 'GENERAL_MEDICINE',
      reason: this.newAppointmentReason().trim() || 'Consulta clínica programada',
      status: 'SCHEDULED',
    };

    if (this.appointmentService) {
      this.appointmentService.createAppointment(request).subscribe({
        next: (created) => {
          const patient = this.availablePatients().find((p) => p.id === pId);
          const newItem: AppointmentItem = {
            id: created.id,
            time: this.newAppointmentTime(),
            patientId: pId,
            patientName: patient?.fullName || 'Paciente',
            ageDisplay: '—',
            phone: patient?.phone || '—',
            reason: request.reason || 'Consulta',
            status: 'SCHEDULED',
            scheduledAt: request.scheduledAt,
            durationMinutes: request.durationMinutes,
            specialty: request.specialty,
          };
          this.appointments.update((list) => [...list, newItem]);
          this.isSavingAppointment.set(false);
          this.closeNewAppointmentModal();
        },
        error: () => {
          this.isSavingAppointment.set(false);
        },
      });
    } else {
      const patient = this.availablePatients().find((p) => p.id === pId);
      const newItem: AppointmentItem = {
        id: Date.now(),
        time: this.newAppointmentTime(),
        patientId: pId,
        patientName: patient?.fullName || 'Paciente',
        ageDisplay: '—',
        phone: patient?.phone || '—',
        reason: request.reason || 'Consulta',
        status: 'SCHEDULED',
        scheduledAt: request.scheduledAt,
        durationMinutes: request.durationMinutes,
      };
      this.appointments.update((list) => [...list, newItem]);
      this.isSavingAppointment.set(false);
      this.closeNewAppointmentModal();
    }
  }

  getStatusClass(status: AgendaAppointmentStatus): string {
    switch (status) {
      case 'WAITING':
      case 'WAITING_ROOM':
        return 'status-waiting';
      case 'IN_CONSULTATION':
        return 'status-consulting';
      case 'COMPLETED':
        return 'status-completed';
      case 'SCHEDULED':
        return 'status-scheduled';
      case 'ABSENT':
      case 'NO_SHOW':
      case 'CANCELLED':
        return 'status-absent';
    }
  }

  getStatusLabel(status: AgendaAppointmentStatus): string {
    switch (status) {
      case 'WAITING':
      case 'WAITING_ROOM':
        return 'En espera';
      case 'IN_CONSULTATION':
        return 'En atención';
      case 'COMPLETED':
        return 'Atendido';
      case 'SCHEDULED':
        return 'Programado';
      case 'CANCELLED':
        return 'Cancelado';
      case 'ABSENT':
      case 'NO_SHOW':
        return 'Ausente';
    }
  }

  private isSameDay(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }
}
