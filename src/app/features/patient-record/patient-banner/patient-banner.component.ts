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
  lucideBaby,
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
      lucideBaby,
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
  @Output() newCheckup = new EventEmitter<void>();
  @Output() printSummary = new EventEmitter<void>();

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

  readonly sexLabel = computed(() => {
    const p = this.patient || this.activePatientService.activePatient();
    if (p?.gender === 'FEMALE') return 'Femenino';
    if (p?.gender === 'MALE') return 'Masculino';
    if (p?.gender === 'OTHER') return 'Otro';
    return 'No especificado';
  });

  readonly dynamicAge = computed(() => {
    const p = this.patient || this.activePatientService.activePatient();
    if (!p?.birthDate) return '—';
    const birth = new Date(p.birthDate + 'T00:00:00');
    if (isNaN(birth.getTime())) return '—';

    const now = new Date();
    let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    if (now.getDate() < birth.getDate()) {
      months--;
    }

    if (months < 0) return 'Recién nacido';
    if (months === 0) {
      const diffTime = Math.abs(now.getTime() - birth.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} días`;
    }
    if (months < 24) {
      return `${months} meses`;
    }
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    return remMonths > 0 ? `${years} años (${remMonths}m)` : `${years} años`;
  });

  readonly isChild = computed(() => {
    const p = this.patient || this.activePatientService.activePatient();
    if (!p?.birthDate) return false;
    const birth = new Date(p.birthDate + 'T00:00:00');
    if (isNaN(birth.getTime())) return false;
    const now = new Date();
    const ageYears = now.getFullYear() - birth.getFullYear();
    return ageYears < 16;
  });

  // Insurance / Cobertura
  readonly coverageInfo = computed<{ isParticular: boolean; label: string; affiliate?: string | null }>(() => {
    const p = this.patient || this.activePatientService.activePatient();
    const ins = p?.insuranceInfo;
    if (!ins || !ins.providerName || ins.providerName.trim() === '') {
      return { isParticular: true, label: 'Particular' };
    }
    const plan = ins.planName ? ` ${ins.planName}` : '';
    const label = `${ins.providerName}${plan}`;
    return {
      isParticular: false,
      label,
      affiliate: ins.affiliateNumber || null,
    };
  });

  // Critical Safety Alerts: Allergies (Red)
  readonly allergyList = computed<string[]>(() => {
    const p = this.patient || this.activePatientService.activePatient();
    const directAllergies = p?.allergies || [];
    const historyAllergies = p?.personalHistory?.allergies || [];
    const combined = Array.from(new Set([...directAllergies, ...historyAllergies]))
      .map((a) => a.trim())
      .filter((a) => a.length > 0);
    return combined;
  });

  // Chronic Conditions (Amber)
  readonly chronicConditionList = computed<string[]>(() => {
    const p = this.patient || this.activePatientService.activePatient();
    const directChronic = p?.chronicConditions || [];
    const historyChronic = p?.personalHistory?.chronicOrPreviousDiseases || [];
    const combined = Array.from(new Set([...directChronic, ...historyChronic]))
      .map((c) => c.trim())
      .filter((c) => c.length > 0);
    return combined;
  });

  toggleMenu(event?: Event): void {
    if (event) event.stopPropagation();
    this.isMenuOpen.update((v) => !v);
  }

  @HostListener('document:click')
  closeMenu(): void {
    this.isMenuOpen.set(false);
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

  onNewCheckup(): void {
    this.isMenuOpen.set(false);
    this.newCheckup.emit();
  }

  onPrintSummary(): void {
    this.isMenuOpen.set(false);
    this.printSummary.emit();
  }

  goToCurves(): void {
    this.isMenuOpen.set(false);
    this.router.navigate(['/curvas']);
  }
}
