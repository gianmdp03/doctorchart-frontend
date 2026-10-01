import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatientDetailDTO, PatientRequestDTO } from '../../../core/models/patient.model';
import { VaccinationRecord } from '../../../core/models/clinical-records.model';
import { PatientService } from '../../../core/services/patient.service';
import { VaccinationCalendarService } from '../../vaccination-calendar/calendario.service';
import { AplicacionDosis, ColumnaEtaria, Vacuna } from '../../vaccination-calendar/calendario.types';
import { DatePickerComponent } from '../../../shared/date-picker/date-picker.component';

type ScheduleStatus = 'APLICADA' | 'PENDIENTE' | 'ACTUAL' | 'FUTURA';

interface PatientDose {
  key: string;
  vaccine: Vacuna;
  application: AplicacionDosis;
  dueFrom: number;
  dueTo: number;
  status: ScheduleStatus;
  record?: VaccinationRecord;
}

@Component({
  selector: 'app-patient-vaccinations',
  imports: [FormsModule, DatePickerComponent],
  templateUrl: './patient-vaccinations.component.html',
  styleUrl: './patient-vaccinations.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientVaccinationsComponent {
  readonly calendarService = inject(VaccinationCalendarService);
  private readonly patientService = inject(PatientService);

  readonly patient = input.required<PatientDetailDTO>();
  readonly isSaving = signal(false);
  readonly saveError = signal<string | null>(null);
  readonly records = signal<VaccinationRecord[]>([]);

  readonly ageInMonths = computed(() => this.monthsBetween(this.patient().birthDate));
  readonly doses = computed<PatientDose[]>(() => {
    const calendar = this.calendarService.data();
    if (!calendar) return [];
    const columns = new Map<string, ColumnaEtaria>(
      calendar.grupos_etarios_columnas.flatMap((group) => group.columnas).map((column) => [column.id, column]),
    );
    const records = new Map(this.currentRecords().map((record) => [record.applicationKey, record]));
    const age = this.ageInMonths();

    return calendar.vacunas.flatMap((vaccine) => vaccine.aplicaciones.flatMap((application) => {
      const months = application.columnas
        .map((id) => this.columnAgeInMonths(columns.get(id)))
        .filter((value): value is number => value !== null);
      if (!months.length) return [];
      const key = `${vaccine.id}:${application.columnas.join(',')}`;
      const record = records.get(key);
      const dueFrom = Math.min(...months);
      const dueTo = Math.max(...months);
      const status: ScheduleStatus = record?.applied
        ? 'APLICADA'
        : age < dueFrom ? 'FUTURA' : age > dueTo + 1 ? 'PENDIENTE' : 'ACTUAL';
      return [{ key, vaccine, application, dueFrom, dueTo, status, record }];
    }));
  });

  readonly overdueDoses = computed(() =>
    this.doses()
      .filter((dose) => dose.status === 'PENDIENTE')
      .sort((a, b) => a.dueFrom - b.dueFrom || a.dueTo - b.dueTo)
  );

  readonly currentDoses = computed(() =>
    this.doses()
      .filter((dose) => dose.status === 'ACTUAL')
      .sort((a, b) => a.dueFrom - b.dueFrom || a.dueTo - b.dueTo)
  );

  readonly futureDoses = computed(() =>
    this.doses()
      .filter((dose) => dose.status === 'FUTURA')
      .sort((a, b) => a.dueFrom - b.dueFrom || a.dueTo - b.dueTo)
  );

  readonly appliedDoses = computed(() => this.doses().filter((dose) => dose.status === 'APLICADA'));

  constructor() {
    this.calendarService.load();
  }

  markApplied(dose: PatientDose, applied: boolean): void {
    const current = this.currentRecords().filter((record) => record.applicationKey !== dose.key);
    const next = [...current, {
      vaccineId: dose.vaccine.id,
      applicationKey: dose.key,
      applied,
      appliedAt: applied ? (dose.record?.appliedAt || new Date().toISOString().slice(0, 10)) : null,
    }];
    this.records.set(next);
    this.persist(next);
  }

  updateDate(dose: PatientDose, appliedAt: string): void {
    const next = this.currentRecords().map((record) =>
      record.applicationKey === dose.key ? { ...record, appliedAt } : record,
    );
    this.records.set(next);
    this.persist(next);
  }

  statusLabel(status: ScheduleStatus): string {
    return { APLICADA: 'Aplicada', PENDIENTE: 'Pendiente', ACTUAL: 'Corresponde ahora', FUTURA: 'Futura' }[status];
  }

  ageLabel(months: number): string {
    return months < 24 ? `${months} meses` : `${Math.floor(months / 12)} años`;
  }

  private currentRecords(): VaccinationRecord[] {
    return this.records().length ? this.records() : (this.patient().immunizationAndNutrition?.vaccinationRecords ?? []);
  }

  private persist(records: VaccinationRecord[]): void {
    const patient = this.patient();
    const request: PatientRequestDTO = {
      fullName: patient.fullName,
      birthDate: patient.birthDate,
      nationalId: patient.nationalId,
      gender: patient.gender,
      bloodType: patient.bloodType,
      phone: patient.phone,
      email: patient.email,
      address: patient.address,
      emergencyContact: patient.emergencyContact,
      insuranceInfo: patient.insuranceInfo,
      allergies: patient.allergies,
      chronicConditions: patient.chronicConditions,
      patientExtraData: patient.patientExtraData,
      patientFormData: patient.patientFormData,
      patientTemplateSnapshot: patient.patientTemplateSnapshot,
      guardianInfo: patient.guardianInfo,
      perinatalHistory: patient.perinatalHistory,
      personalHistory: patient.personalHistory,
      familyHistory: patient.familyHistory,
      immunizationAndNutrition: { ...patient.immunizationAndNutrition, vaccinationRecords: records },
      latestMeasurements: patient.latestMeasurements,
    };
    this.isSaving.set(true);
    this.saveError.set(null);
    this.patientService.updatePatient(patient.id, request).subscribe({
      next: () => this.isSaving.set(false),
      error: () => {
        this.isSaving.set(false);
        this.saveError.set('No se pudo guardar la aplicación de la vacuna.');
      },
    });
  }

  private columnAgeInMonths(column?: ColumnaEtaria): number | null {
    if (!column) return null;
    if (column.id === 'recien_nacido') return 0;
    const month = /^(\d+)_meses$/.exec(column.id);
    if (month) return Number(month[1]);
    const years = /^(\d+)\s*años?$/.exec(column.subtitulo ?? '');
    if (years) return Number(years[1]) * 12;
    if (column.id === 'a_partir_15_anos') return 180;
    if (column.id === 'adultos') return 216;
    return null;
  }

  private monthsBetween(birthDate: string): number {
    const birth = new Date(`${birthDate}T00:00:00`);
    const now = new Date();
    return Math.max(0, (now.getFullYear() - birth.getFullYear()) * 12 + now.getMonth() - birth.getMonth() - (now.getDate() < birth.getDate() ? 1 : 0));
  }
}
