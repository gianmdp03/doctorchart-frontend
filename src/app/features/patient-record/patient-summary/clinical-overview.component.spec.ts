import { computed, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { ClinicalOverviewComponent } from './clinical-overview.component';
import { ClinicalSummaryService } from '../../../core/services/clinical-summary.service';
import { ActivePatientService } from '../../../core/services/active-patient.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserClockService } from '../../../core/services/user-clock.service';
import { PatientRecordActionsService } from '../../../core/experience/patient-record-actions.service';
import { ClinicalSummary } from '../../../core/models/clinical-summary.model';
import { PatientDetailDTO } from '../../../core/models/patient.model';
import { clinicalFormFixture } from '../../../core/models/clinical-form.fixture';
import { mkdirSync, writeFileSync } from 'node:fs';

describe('ClinicalOverviewComponent automatic history', () => {
  let fixture: ComponentFixture<ClinicalOverviewComponent>, component: ClinicalOverviewComponent;
  const patient = signal<PatientDetailDTO | null>(null),
    user = signal<{ id: string } | null>({ id: 'doctor' });
  const api = { get: vi.fn(), save: vi.fn() };
  const active = {
    activePatient: patient,
    patientId: computed(() => patient()?.id ?? null),
    loadPatient: vi.fn(),
  };
  const newPatient = (id = 10): PatientDetailDTO => ({
    ...clinicalFormFixture(),
    version: 0,
    id,
    fullName: 'Paciente sintético',
    birthDate: '2020-01-01',
  });
  const summary = (extra: Partial<ClinicalSummary> = {}): ClinicalSummary => ({
    patientId: 10,
    patientVersion: 0,
    asOfDate: '2026-10-31',
    history: {},
    profile: { entries: [] },
    historical: [],
    lastEncounter: null,
    vaccinations: null,
    recentMedications: [],
    ...extra,
  });
  const text = () => fixture.nativeElement.textContent as string;
  beforeEach(async () => {
    vi.clearAllMocks();
    patient.set(newPatient());
    user.set({ id: 'doctor' });
    api.get.mockReturnValue(of(summary()));
    await TestBed.configureTestingModule({
      imports: [ClinicalOverviewComponent],
      providers: [
        provideRouter([]),
        { provide: ClinicalSummaryService, useValue: api },
        { provide: ActivePatientService, useValue: active },
        { provide: AuthService, useValue: { currentUser: user } },
        { provide: UserClockService, useValue: { day: signal('2026-10-31') } },
        { provide: PatientRecordActionsService, useValue: { has: () => true } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ClinicalOverviewComponent);
    component = fixture.componentInstance;
  });
  it('is read-only and links to the patient form instead of duplicating clinical inputs', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('form,input,textarea,select')).toBeNull();
    expect(text()).toContain('Editar antecedentes');
    expect(text()).not.toContain('Registrar alergia');
    expect(api.save).not.toHaveBeenCalled();
  });
  it('distinguishes missing information from an explicit negative report', () => {
    fixture.detectChanges();
    expect(text()).toContain('Sin alergias relevadas');
    api.get.mockReturnValue(
      of(
        summary({
          history: {
            ALLERGY: {
              status: 'NONE',
              items: [],
              certainty: 'REPORTED',
              date: '2026-10-31T15:00:00Z',
              source: 'PATIENT',
              sourceId: 10,
            },
          },
        }),
      ),
    );
    component.reload();
    fixture.detectChanges();
    expect(text()).toContain('No refiere alergias conocidas');
    expect(text()).toContain('Informado');
    expect(text()).not.toContain('Sin alergias relevadas');
  });
  it('shows structured patient and encounter values with dates and exact sources', () => {
    api.get.mockReturnValue(
      of(
        summary({
          history: {
            ALLERGY: {
              status: 'PRESENT',
              items: ['Penicilina · urticaria'],
              certainty: 'REPORTED',
              date: '2020-03-02T15:00:00Z',
              source: 'PATIENT',
              sourceId: 10,
            },
            PROBLEM: {
              status: 'PRESENT',
              items: ['Asma en seguimiento'],
              certainty: 'CONFIRMED',
              date: '2026-10-31T15:00:00Z',
              source: 'ENCOUNTER',
              sourceId: 45,
            },
          },
        }),
      ),
    );
    fixture.detectChanges();
    expect(text()).toContain('02/03/2020');
    expect(text()).toContain('Asma en seguimiento');
    expect(text()).toContain('Corroborado');
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.openItem(component.items('PROBLEM')[0]);
    expect(navigate).toHaveBeenCalledWith(['/encounters', 45]);
    component.openItem(component.items('ALLERGY')[0]);
    expect(navigate).toHaveBeenCalledWith(['/patients', 10], {
      queryParams: { tab: 'summary' },
      fragment: 'clinical-history',
    });
  });
  it('does not revive legacy positives after a newer explicit negative review', () => {
    api.get.mockReturnValue(
      of(
        summary({
          history: {
            ALLERGY: {
              status: 'NONE',
              items: [],
              certainty: 'CONFIRMED',
              date: '2026-10-31T15:00:00Z',
              source: 'ENCOUNTER',
              sourceId: 4,
            },
          },
          historical: [
            {
              id: 'old',
              kind: 'ALLERGY',
              text: 'Antecedente antiguo',
              details: '',
              date: '',
              recordedAt: '',
              authorUserId: '',
              certainty: 'REPORTED',
              status: 'HISTORICAL',
            },
          ],
        }),
      ),
    );
    fixture.detectChanges();
    expect(component.items('ALLERGY')).toEqual([]);
    expect(text()).toContain('No refiere alergias conocidas');
    expect(text()).toContain('Antecedentes previos');
  });
  it('cancels stale reads across patients and users', () => {
    const late = new Subject<ClinicalSummary>();
    api.get.mockReturnValueOnce(late);
    fixture.detectChanges();
    patient.set(newPatient(11));
    api.get.mockReturnValue(of(summary({ patientId: 11 })));
    fixture.detectChanges();
    late.next(summary());
    expect(component.data()?.patientId).toBe(11);
    user.set(null);
    fixture.detectChanges();
    expect(component.data()).toBeNull();
  });
  it('keeps read failures distinct from absent health facts', () => {
    api.get.mockReturnValue(throwError(() => new Error('offline')));
    fixture.detectChanges();
    expect(text()).toContain('No se pudo cargar');
    expect(text()).not.toContain('Sin alergias relevadas');
  });
  it('shows prescriptions as unconfirmed use, never as current medication', () => {
    api.get.mockReturnValue(
      of(
        summary({
          recentMedications: [
            {
              recordId: 2,
              date: '2020-01-01',
              name: 'Tratamiento anterior',
              dosage: '5 mg',
              frequency: 'diario',
            },
          ],
        }),
      ),
    );
    fixture.detectChanges();
    expect(component.items('MEDICATION')).toEqual([]);
    expect(text()).toContain('Uso actual a confirmar');
    expect(text()).toContain('Tratamiento anterior');
  });
  it('renders representative sections and missing vaccines for visual review', () => {
    api.get.mockReturnValue(
      of(
        summary({
          history: {
            ALLERGY: {
              status: 'PRESENT',
              items: ['Penicilina · urticaria'],
              certainty: 'REPORTED',
              date: '2025-03-02T15:00:00Z',
              source: 'PATIENT',
              sourceId: 10,
            },
            PROBLEM: {
              status: 'PRESENT',
              items: ['Asma en seguimiento'],
              certainty: 'CONFIRMED',
              date: '2026-10-31T15:00:00Z',
              source: 'ENCOUNTER',
              sourceId: 45,
            },
            MEDICATION: {
              status: 'NONE',
              items: [],
              certainty: 'REPORTED',
              date: '2026-10-31T15:00:00Z',
              source: 'ENCOUNTER',
              sourceId: 45,
            },
          },
          lastEncounter: {
            id: 45,
            date: '2026-10-31',
            complaint: 'Control pediátrico',
            diagnosis: 'Seguimiento del crecimiento y la salud',
            followUp: 'Revisar evolución y resultados de laboratorio.',
            followUpDate: '2026-11-20',
          },
          vaccinations: {
            patientId: 10,
            patientVersion: 0,
            calendarId: 'calendar',
            asOfDate: '2026-10-31',
            ageInMonths: 81,
            ageLabel: '6 años',
            doses: [
              {
                id: 'dose',
                calendarId: 'calendar',
                vaccineId: 'vaccine',
                vaccineName: 'Triple viral',
                doseLabel: 'Segunda dosis',
                dueFrom: 60,
                dueTo: 72,
                dueAgeLabel: '5 años',
                status: 'PENDIENTE',
                appliedAt: null,
              },
            ],
          },
        }),
      ),
    );
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.overview-card')).toHaveLength(6);
    expect(component.pendingVaccines()).toHaveLength(1);
    expect(text()).toContain('sin aplicación registrada');
    const styles = [...document.querySelectorAll('style')].map((s) => s.textContent).join('\n');
    mkdirSync('.angular/clinical-summary', { recursive: true });
    writeFileSync(
      '.angular/clinical-summary/overview.html',
      `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:32px;font-family:Arial,sans-serif;background:#f6f8fa}*{box-sizing:border-box}${styles}</style></head><body>${fixture.nativeElement.outerHTML}</body></html>`,
    );
  });
});
