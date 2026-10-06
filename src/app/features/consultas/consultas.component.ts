import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef, Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideStethoscope } from '@ng-icons/lucide';
import { catchError, forkJoin, of, switchMap } from 'rxjs';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { PatientService } from '../../core/services/patient.service';
import { ClinicalEncounterList } from '../../core/models/clinical-encounter.model';

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
  private readonly patientService = inject(PatientService, { optional: true });
  readonly activePatientService = inject(ActivePatientService);
  readonly specialtyService = inject(DoctorSpecialtyService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

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
        consultation.primaryDiagnosisCode?.toLowerCase().includes(query)
    );
  });

  ngOnInit(): void {
    this.loadConsultations();
  }

  @HostListener('window:encounter-created')
  onEncounterCreated(): void {
    this.loadConsultations();
  }

  loadConsultations(): void {
    this.isLoading.set(true);
    const all$ = this.clinicalEncounterService.getAll(0, 100).pipe(catchError(() => of(null)));
    const patients$ =
      this.patientService && typeof this.clinicalEncounterService.getByPatient === 'function'
        ? this.patientService.getPatients(0, 50, 'id,desc').pipe(catchError(() => of(null)))
        : of(null);

    forkJoin({ allPage: all$, patientsPage: patients$ })
      .pipe(
        switchMap(({ allPage, patientsPage }) => {
          const baseList = allPage?.content ?? [];
          const patientList = patientsPage?.content ?? [];
          if (
            typeof this.clinicalEncounterService.getByPatient !== 'function' ||
            patientList.length === 0
          ) {
            return of({ baseList, perPatient: [] as ClinicalEncounterList[] });
          }
          const calls = patientList.slice(0, 20).map((p) =>
            this.clinicalEncounterService.getByPatient(p.id).pipe(
              catchError(() => of([] as ClinicalEncounterList[]))
            )
          );
          return forkJoin(calls).pipe(
            switchMap((lists) => {
              const flattened: ClinicalEncounterList[] = [];
              lists.forEach((list, idx) => {
                const owner = patientList[idx];
                for (const item of list || []) {
                  flattened.push({
                    ...item,
                    patientId: item.patientId ?? owner.id,
                    patientFullName: item.patientFullName || owner.fullName,
                  });
                }
              });
              return of({ baseList, perPatient: flattened });
            })
          );
        })
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ baseList, perPatient }) => {
          const map = new Map<number, ClinicalEncounterList>();
          for (const item of [...baseList, ...perPatient]) {
            if (!item || item.id == null) continue;
            const prev = map.get(item.id);
            map.set(item.id, {
              ...prev,
              ...item,
              patientFullName: item.patientFullName || prev?.patientFullName || null,
            });
          }

          const merged = Array.from(map.values()).sort((a, b) => {
            const tA = new Date(a.encounterDate).getTime() || 0;
            const tB = new Date(b.encounterDate).getTime() || 0;
            return tB !== tA ? tB - tA : (b.id || 0) - (a.id || 0);
          });

          this.consultations.set(
            merged.map((encounter) => ({
              id: encounter.id,
              patientId: encounter.patientId,
              patientName: encounter.patientFullName || 'Paciente sin nombre',
              encounterDate: this.formatEncounterDate(encounter.encounterDate),
              consultationType: this.getConsultationTypeLabel(encounter.consultationType),
              chiefComplaint: encounter.chiefComplaint || '—',
              primaryDiagnosis: encounter.primaryDiagnosisDescription || '—',
              primaryDiagnosisCode: encounter.primaryDiagnosisCode,
            }))
          );
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
      new CustomEvent('open-encounter-detail-modal', { detail: { encounterId: id } })
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

