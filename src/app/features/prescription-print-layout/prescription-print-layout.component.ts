import { PatientRecordActionsService } from '../../core/experience/patient-record-actions.service';
import { Component, computed, DestroyRef, effect, HostListener, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePrinter, lucideX, lucidePill, lucideFileText } from '@ng-icons/lucide';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { AuthService } from '../../core/services/auth.service';
import { ClinicalDocumentPrintService } from '../../core/services/clinical-document-print.service';
import { ClinicalPrintDocument, PrintDocumentReference } from '../../core/models/clinical-print-document.model';
import { doctorPrintIdentity } from '../../core/models/doctor-print-identity';

export type PrintPageFormat = 'A4_DUAL' | 'A5_SINGLE';
export type PrintDocumentType = 'PRESCRIPTION' | 'STUDY_ORDERS';

@Component({
  selector: 'app-prescription-print-layout',
  imports: [CommonModule, NgIcon],
  providers: [
    provideIcons({
      lucidePrinter,
      lucideX,
      lucidePill,
      lucideFileText,
    }),
  ],
  templateUrl: './prescription-print-layout.component.html',
  styleUrl: './prescription-print-layout.component.css',
})
export class PrescriptionPrintLayoutComponent {
  private readonly recordActions = inject(PatientRecordActionsService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly auth = inject(AuthService);
  private readonly activePatient = inject(ActivePatientService);
  private openingPatientId: number | null = null;
  private currentPatientId(): number | null { return this.activePatient.activePatient()?.id ?? null; }
  private sameContext(): boolean { return this.recordActions.has('PRINT_DOCUMENT') && this.openingUserId === (this.auth.currentUser()?.id ?? null) && this.openingPatientId === this.currentPatientId(); }
  private readonly api = inject(ClinicalDocumentPrintService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cancelled = new Subject<void>();
  private openingUserId: string | null = null;
  readonly isOpen = signal(false);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly printFormat = signal<PrintPageFormat>('A4_DUAL');
  readonly documentType = signal<PrintDocumentType>('PRESCRIPTION');
  readonly document = signal<ClinicalPrintDocument | null>(null);
  private readonly authorIdentity = signal<ReturnType<typeof doctorPrintIdentity> | null>(null);
  readonly doctorName = computed(() => this.authorIdentity()?.fullName || 'Nombre no informado');
  readonly doctorLicense = computed(() => this.authorIdentity()?.license || 'Matrícula no informada');
  readonly doctorSpecialty = computed(() => this.document()?.author.specialtyName || '');
  readonly clinicInfo = computed(() => this.authorIdentity()?.clinic ?? {name:'',address:'',phone:''});
  readonly patientName = computed(() => this.document()?.patient.fullName || '');
  readonly patientDni = computed(() => this.document()?.patient.nationalId || 'No informado');
  readonly patientAge = computed(() => this.document()?.patient.ageAtIssue || 'No informada');
  readonly patientCoverage = computed(() => {
    const coverage = this.document()?.patient.insuranceInfo;
    if (!coverage?.providerName) return 'No informada';
    const plan = coverage.planName ? ' ' + coverage.planName : '';
    const affiliate = coverage.affiliateNumber ? ' · Afiliado N° ' + coverage.affiliateNumber : '';
    return coverage.providerName + plan + affiliate;
  });
  readonly formattedDate = computed(() => {
    const date = this.document()?.issuedAt;
    if (!date || !Number.isFinite(Date.parse(date))) return 'Fecha no informada';
    return new Date(date).toLocaleDateString('es-AR', {day:'2-digit',month:'2-digit',year:'numeric',timeZone:'America/Argentina/Buenos_Aires'});
  });
  readonly documentCode = computed(() => this.document()?.code || '');
  readonly hasPrescriptions = computed(() => (this.document()?.prescriptions.length ?? 0) > 0);
  readonly hasStudies = computed(() => (this.document()?.diagnosticOrders.length ?? 0) > 0);
  readonly canPrint = computed(() => this.recordActions.has('PRINT_DOCUMENT') && this.isOpen() && !this.loading() && !this.error() && !!this.document()
    && this.sameContext() && this.auth.currentUser()?.id === this.document()?.author.userId
    && (this.documentType() === 'PRESCRIPTION' ? this.hasPrescriptions() : this.hasStudies()));

  constructor() {
    effect(() => {
      const userId = this.auth.currentUser()?.id ?? null;
      const patientId = this.currentPatientId();
      const printEnabled = this.recordActions.has('PRINT_DOCUMENT');
      if (this.isOpen() && (!printEnabled || userId !== this.openingUserId || patientId !== this.openingPatientId)) this.closeModal();
    });
  }
  @HostListener('window:open-prescription-print-modal', ['$event'])
  onOpenModal(event?: Event): void {
    this.closeModal();
    if (!this.recordActions.has('PRINT_DOCUMENT')) return;
    const reference = (event as CustomEvent | undefined)?.detail as PrintDocumentReference | undefined;
    const user = this.auth.currentUser();
    if (!user || !reference || !['PRESCRIPTION_RECORD','ENCOUNTER'].includes(reference.source)
        || !Number.isSafeInteger(reference.id) || reference.id <= 0
        || !Number.isSafeInteger(reference.patientId) || reference.patientId <= 0) return;
    this.openingUserId = user.id; this.openingPatientId = this.currentPatientId();
    const identity = doctorPrintIdentity(user.user_metadata);
    this.isOpen.set(true); this.loading.set(true);
    this.api.get(reference).pipe(takeUntil(this.cancelled),takeUntilDestroyed(this.destroyRef)).subscribe({
      next: document => {
        if (!this.sameContext()) { this.closeModal(); return; }
        this.loading.set(false);
        if (document.source !== reference.source || document.id !== reference.id || document.patient.id !== reference.patientId
            || document.author.userId !== this.openingUserId || !Number.isFinite(Date.parse(document.issuedAt))) {
          this.error.set('No se pudo verificar a qué paciente y profesional corresponde el documento.'); return;
        }
        this.document.set(structuredClone(document)); this.authorIdentity.set(identity);
        const type = reference.type ?? document.type;
        this.documentType.set(type === 'STUDY_ORDERS' && document.diagnosticOrders.length > 0 ? 'STUDY_ORDERS'
          : document.prescriptions.length > 0 ? 'PRESCRIPTION' : 'STUDY_ORDERS');
      },
      error: error => { if (!this.sameContext()) { this.closeModal(); return; } this.loading.set(false); this.error.set(error?.error?.message || 'No se pudo recuperar el documento para imprimir.'); },
    });
  }
  @HostListener('window:keydown.escape')
  onEscape(): void { if (this.isOpen()) this.closeModal(); }
  closeModal(): void {
    this.cancelled.next(); this.isOpen.set(false); this.loading.set(false); this.error.set(null);
    this.document.set(null); this.authorIdentity.set(null); this.openingUserId = null; this.openingPatientId = null;
  }
  setFormat(format: PrintPageFormat): void { this.printFormat.set(format); }
  setDocType(type: PrintDocumentType): void {
    if (type === 'PRESCRIPTION' ? this.hasPrescriptions() : this.hasStudies()) this.documentType.set(type);
  }
  print(): void {
    if (this.canPrint() && isPlatformBrowser(this.platformId) && typeof window !== 'undefined') window.print();
  }
}
