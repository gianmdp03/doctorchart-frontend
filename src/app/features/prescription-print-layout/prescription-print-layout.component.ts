import {
  Component,
  computed,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucidePrinter,
  lucideX,
  lucidePill,
  lucideFileText,
  lucideQrCode,
  lucideUser,
  lucideCheckCircle,
} from '@ng-icons/lucide';
import { ClinicalEncounterDetail, ClinicalEncounterList, PrescriptionItem } from '../../core/models/clinical-encounter.model';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { AuthService } from '../../core/services/auth.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { DoctorProfileService } from '../../core/services/doctor-profile.service';

export type PrintPageFormat = 'A4_DUAL' | 'A5_SINGLE';
export type PrintDocumentType = 'PRESCRIPTION' | 'STUDY_ORDERS';

@Component({
  selector: 'app-prescription-print-layout',
  imports: [CommonModule, FormsModule, NgIcon],
  providers: [
    provideIcons({
      lucidePrinter,
      lucideX,
      lucidePill,
      lucideFileText,
      lucideQrCode,
      lucideUser,
      lucideCheckCircle,
    }),
  ],
  templateUrl: './prescription-print-layout.component.html',
  styleUrl: './prescription-print-layout.component.css',
})
export class PrescriptionPrintLayoutComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly activePatientService = inject(ActivePatientService);
  readonly authService = inject(AuthService);
  readonly doctorSpecialtyService = inject(DoctorSpecialtyService);
  readonly doctorProfileService = inject(DoctorProfileService);

  readonly isOpen = signal<boolean>(false);
  readonly printFormat = signal<PrintPageFormat>('A4_DUAL');
  readonly documentType = signal<PrintDocumentType>('PRESCRIPTION');

  // Encounter data for printing
  readonly encounterData = signal<{
    id?: number;
    encounterDate?: string;
    primaryDiagnosisCode?: string | null;
    primaryDiagnosisDescription?: string;
    prescriptions: PrescriptionItem[];
    diagnosticOrders: string[];
    patientInstructions?: string;
  } | null>(null);

  // Doctor credentials
  readonly doctorName = computed(() => {
    return this.authService.userName() || 'Dr. Médico Tratante';
  });

  readonly doctorSpecialty = computed(() => {
    return this.doctorSpecialtyService.currentSpecialtyOption().label;
  });

  readonly doctorLicense = computed(() => {
    const user = this.authService.currentUser();
    const license = (user?.user_metadata?.['license'] as string) || (user?.user_metadata?.['matricula'] as string);
    return license || 'M.N. 154.289 · M.P. 45.102';
  });

  readonly clinicInfo = computed(() => {
    return {
      name: 'Centro Médico DoctorChart · Consultorios Externos',
      address: 'Av. Corrientes 2450, Piso 3, Consultorio 12',
      phone: 'Tel: (011) 4820-9900 · info@doctorchart.med',
    };
  });

  // Patient Info
  readonly patientName = computed(() => {
    return this.activePatientService.activePatient()?.fullName || 'Paciente';
  });

  readonly patientDni = computed(() => {
    const p = this.activePatientService.activePatient();
    return p?.nationalId || p?.guardianInfo?.firstGuardianNationalId || '—';
  });

  readonly patientAge = computed(() => {
    return this.activePatientService.ageDisplay();
  });

  readonly patientCoverage = computed(() => {
    const p = this.activePatientService.activePatient();
    const ins = p?.insuranceInfo;
    if (!ins || !ins.providerName) {
      return 'Particular';
    }
    const plan = ins.planName ? ` ${ins.planName}` : '';
    const aff = ins.affiliateNumber ? ` · Afiliado N° ${ins.affiliateNumber}` : '';
    return `${ins.providerName}${plan}${aff}`;
  });

  readonly formattedDate = computed(() => {
    const raw = this.encounterData()?.encounterDate;
    if (raw) {
      try {
        const d = new Date(raw);
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' });
        }
      } catch {}
    }
    return new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' });
  });

  readonly electronicRecipeCode = computed(() => {
    const encId = this.encounterData()?.id || 1001;
    const patId = this.activePatientService.patientId() || 10;
    return `RX-2026-${encId.toString().padStart(6, '0')}-${patId}`;
  });

  @HostListener('window:open-prescription-print-modal', ['$event'])
  onOpenModal(event?: Event): void {
    const customEvent = event as CustomEvent | undefined;
    const detail = customEvent?.detail;
    if (detail) {
      this.documentType.set(detail.type || 'PRESCRIPTION');
      this.encounterData.set({
        id: detail.id,
        encounterDate: detail.encounterDate || new Date().toISOString(),
        primaryDiagnosisCode: detail.primaryDiagnosisCode || null,
        primaryDiagnosisDescription: detail.primaryDiagnosisDescription || '',
        prescriptions: detail.prescriptions || [],
        diagnosticOrders: detail.diagnosticOrders || [],
        patientInstructions: detail.followUpInstructions || detail.patientInstructions || '',
      });
      this.isOpen.set(true);
    }
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.isOpen()) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.isOpen.set(false);
  }

  setFormat(format: PrintPageFormat): void {
    this.printFormat.set(format);
  }

  setDocType(type: PrintDocumentType): void {
    this.documentType.set(type);
  }

  print(): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.print();
    }
  }
}
