import {
  Component,
  computed,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideAlertTriangle,
  lucideShieldAlert,
  lucideCheckCircle2,
  lucidePlus,
  lucideMoreHorizontal,
  lucideChevronLeft,
  lucideUser,
  lucideTrendingUp,
  lucidePrinter,
  lucideCreditCard,
} from '@ng-icons/lucide';
import { PatientDetailDTO } from '../../../core/models/patient.model';
import { ActivePatientService } from '../../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../../core/services/doctor-specialty.service';

@Component({
  selector: 'app-patient-banner',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [
    provideIcons({
      lucideAlertTriangle,
      lucideShieldAlert,
      lucideCheckCircle2,
      lucidePlus,
      lucideMoreHorizontal,
      lucideChevronLeft,
      lucideUser,
      lucideTrendingUp,
      lucidePrinter,
      lucideCreditCard,
    }),
  ],
  templateUrl: './patient-banner.component.html',
  styleUrl: './patient-banner.component.css',
})
export class PatientBannerComponent {
  private readonly router = inject(Router);
  readonly activePatientService = inject(ActivePatientService);
  readonly doctorSpecialtyService = inject(DoctorSpecialtyService);

  @Input() patient: PatientDetailDTO | null = null;
  @Output() newEncounter = new EventEmitter<void>();
  @Output() editPatient = new EventEmitter<void>();
  @Output() printSummary = new EventEmitter<void>();
  @Output() viewCurves = new EventEmitter<void>();

  readonly isMenuOpen = signal<boolean>(false);

  readonly initials = computed(() => {
    const p = this.patient || this.activePatientService.activePatient();
    if (!p?.fullName) return 'DP';
    const parts = p.fullName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return p.fullName.slice(0, 2).toUpperCase();
  });

  readonly nationalId = computed(() => {
    const p = this.patient || this.activePatientService.activePatient();
    return p?.nationalId || p?.guardianInfo?.firstGuardianNationalId || '—';
  });

  readonly isChild = computed(() => {
    const p = this.patient || this.activePatientService.activePatient();
    if (!p?.birthDate) return false;
    const birth = new Date(p.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age < 18;
  });

  readonly dynamicAge = computed(() => {
    const p = this.patient || this.activePatientService.activePatient();
    if (!p?.birthDate) return 'Edad desconocida';

    const birth = new Date(p.birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years === 0) {
      if (months === 0) {
        return `${days} ${days === 1 ? 'día' : 'días'}`;
      }
      return `${months} ${months === 1 ? 'mes' : 'meses'}${days > 0 ? ` y ${days} d` : ''}`;
    }

    if (years < 5) {
      return `${years}a ${months}m`;
    }

    return `${years} años`;
  });

  readonly sexLabel = computed(() => {
    const p = this.patient || this.activePatientService.activePatient();
    const g = p?.gender;
    if (g === 'MALE' || g === 'M') return 'Masculino';
    if (g === 'FEMALE' || g === 'F') return 'Femenino';
    return g || 'No especificado';
  });

  readonly coverageInfo = computed(() => {
    const p = this.patient || this.activePatientService.activePatient();
    const ins = p?.insuranceInfo;
    const provider = ins?.providerName || '';
    const plan = ins?.planName || '';
    const label = [provider, plan].filter(Boolean).join(' ').trim();
    if (!label || label.toLowerCase() === 'particular') {
      return { isParticular: true, label: 'Particular', affiliate: null };
    }
    return {
      isParticular: false,
      label,
      affiliate: ins?.affiliateNumber || null,
    };
  });

  readonly allergyList = computed<string[]>(() => {
    const p = this.patient || this.activePatientService.activePatient();
    const allergies: string[] = [];
    if (p?.allergies && p.allergies.length > 0) {
      allergies.push(...p.allergies);
    }
    if (p?.personalHistory?.allergies && p.personalHistory.allergies.length > 0) {
      allergies.push(...p.personalHistory.allergies);
    }
    return [...new Set(allergies.filter(Boolean))];
  });

  readonly chronicConditionList = computed<string[]>(() => {
    const p = this.patient || this.activePatientService.activePatient();
    const list: string[] = [];
    if (p?.chronicConditions && p.chronicConditions.length > 0) {
      list.push(...p.chronicConditions);
    }
    if (p?.personalHistory?.chronicOrPreviousDiseases && p.personalHistory.chronicOrPreviousDiseases.length > 0) {
      list.push(...p.personalHistory.chronicOrPreviousDiseases);
    }
    return [...new Set(list.filter(Boolean))];
  });

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.isMenuOpen.update((v) => !v);
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.isMenuOpen()) {
      this.isMenuOpen.set(false);
    }
  }

  goBack(): void {
    this.router.navigate(['/pacientes']);
  }

  onNewEncounter(): void {
    this.newEncounter.emit();
  }

  onEditPatient(): void {
    this.isMenuOpen.set(false);
    this.editPatient.emit();
  }

  onPrintSummary(): void {
    this.isMenuOpen.set(false);
    this.printSummary.emit();
  }

  goToCurves(): void {
    this.isMenuOpen.set(false);
    if (this.viewCurves.observed) {
      this.viewCurves.emit();
    } else {
      this.router.navigate(['/curvas']);
    }
  }
}
