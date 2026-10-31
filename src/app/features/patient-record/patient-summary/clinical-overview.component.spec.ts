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
import { ClinicalEntry, ClinicalSummary } from '../../../core/models/clinical-summary.model';
import { PatientDetailDTO } from '../../../core/models/patient.model';
import { PatientVaccinationDose } from '../../../core/models/vaccination.model';
import { clinicalFormFixture } from '../../../core/models/clinical-form.fixture';
import { mkdirSync, writeFileSync } from 'node:fs';

describe('ClinicalOverviewComponent', () => {
  let fixture: ComponentFixture<ClinicalOverviewComponent>;
  let component: ClinicalOverviewComponent;
  const patient = signal<PatientDetailDTO | null>(null);
  const user = signal<{ id: string } | null>({ id: 'doctor' });
  const allowed = signal(true);
  const api = { get: vi.fn(), save: vi.fn() };
  const active = {
    activePatient: patient,
    patientId: computed(() => patient()?.id ?? null),
    setActivePatient: vi.fn((p: PatientDetailDTO) => patient.set(p)),
    loadPatient: vi.fn(),
  };
  const entry = (overrides: Partial<ClinicalEntry> = {}): ClinicalEntry => ({
    id: 'allergy-1',
    kind: 'ALLERGY',
    text: 'Penicilina',
    details: 'Urticaria',
    date: '2020-03-02',
    certainty: 'REPORTED',
    status: 'ACTIVE',
    recordedAt: '2026-10-31T15:00:00Z',
    authorUserId: 'doctor',
    ...overrides,
  });
  const summary = (overrides: Partial<ClinicalSummary> = {}): ClinicalSummary => ({
    patientId: 10,
    patientVersion: 0,
    asOfDate: '2026-10-31',
    profile: { entries: [] },
    historical: [],
    lastEncounter: null,
    vaccinations: null,
    recentMedications: [],
    ...overrides,
  });
  const newPatient = (id = 10, version = 0): PatientDetailDTO => ({
    ...clinicalFormFixture(),
    id,
    version,
    fullName: 'Paciente sintético',
    birthDate: '2020-01-01',
  });
  const text = () => fixture.nativeElement.textContent as string;
  beforeEach(async () => {
    vi.clearAllMocks();
    allowed.set(true);
    user.set({ id: 'doctor' });
    patient.set(newPatient());
    api.get.mockReturnValue(of(summary()));
    await TestBed.configureTestingModule({
      imports: [ClinicalOverviewComponent],
      providers: [
        provideRouter([]),
        { provide: ClinicalSummaryService, useValue: api },
        { provide: ActivePatientService, useValue: active },
        { provide: AuthService, useValue: { currentUser: user } },
        { provide: UserClockService, useValue: { day: signal('2026-10-31') } },
        { provide: PatientRecordActionsService, useValue: { has: () => allowed() } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ClinicalOverviewComponent);
    component = fixture.componentInstance;
  });

  it('distinguishes missing allergy data from a dated confirmation of no known allergies', () => {
    fixture.detectChanges();
    expect(text()).toContain('Sin información de alergias');
    api.get.mockReturnValue(
      of(summary({ profile: { entries: [], noKnownAllergiesAt: '2026-10-31T15:00:00Z' } })),
    );
    component.reload();
    fixture.detectChanges();
    expect(text()).toContain('Sin alergias conocidas');
    expect(text()).toContain('31/10/2026');
    expect(text()).not.toContain('Sin información de alergias');
  });
  it('shows provenance, keeps resolved history and never invents dates for legacy data', () => {
    api.get.mockReturnValue(
      of(
        summary({
          profile: {
            entries: [entry(), entry({ id: 'resolved', text: 'Dato cerrado', status: 'RESOLVED' })],
          },
          historical: [
            entry({
              id: 'old',
              text: 'Antecedente antiguo',
              status: 'HISTORICAL',
              date: '',
              recordedAt: '',
            }),
          ],
        }),
      ),
    );
    fixture.detectChanges();
    expect(text()).toContain('Informado · a confirmar');
    expect(text()).toContain('02/03/2020');
    expect(text()).toContain('Antecedente antiguo');
    expect(text()).toContain('fecha no registrada');
    expect(component.entries('ALLERGY')).toHaveLength(1);
    component.recordsOpen.set(true);
    fixture.detectChanges();
    expect(text()).toContain('Dato cerrado');
  });
  it('lists missing and current vaccine doses, excluding future doses and showing last application', () => {
    const dose = (
      id: string,
      status: PatientVaccinationDose['status'],
    ): PatientVaccinationDose => ({
      id,
      status,
      calendarId: 'calendar',
      vaccineId: id,
      vaccineName: id,
      doseLabel: 'Primera dosis',
      dueFrom: 0,
      dueTo: 12,
      dueAgeLabel: '12 meses',
      appliedAt: status === 'APLICADA' ? '2026-10-01' : null,
    });
    api.get.mockReturnValue(
      of(
        summary({
          vaccinations: {
            patientId: 10,
            patientVersion: 0,
            calendarId: 'calendar',
            asOfDate: '2026-10-31',
            ageInMonths: 81,
            ageLabel: '6 años',
            doses: [
              dose('Faltante', 'PENDIENTE'),
              dose('Ahora', 'ACTUAL'),
              dose('Futura', 'FUTURA'),
              dose('Aplicada', 'APLICADA'),
            ],
          },
        }),
      ),
    );
    fixture.detectChanges();
    expect(component.pendingVaccines()).toHaveLength(2);
    expect(text()).toContain('Faltante');
    expect(text()).toContain('Corresponde ahora');
    expect(text()).not.toContain('Futura');
    expect(text()).toContain('Última aplicada: Aplicada');
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.recordLink('vaccinations', 'vaccine-Faltante');
    expect(navigate).toHaveBeenCalledWith(['/patients', 10], {
      queryParams: { tab: 'vaccinations' },
      fragment: 'vaccine-Faltante',
    });
  });
  it('does not treat a historic prescription as confirmed current medication', () => {
    api.get.mockReturnValue(
      of(
        summary({
          recentMedications: [
            {
              recordId: 4,
              date: '2020-01-01',
              name: 'Tratamiento antiguo',
              dosage: '5 mg',
              frequency: 'diario',
            },
          ],
        }),
      ),
    );
    fixture.detectChanges();
    expect(text()).toContain('Sin medicación vigente confirmada');
    expect(text()).toContain('uso actual a confirmar');
    expect(text()).toContain('Tratamiento antiguo');
  });
  it('cancels late reads and clears clinical drafts across patients or users', () => {
    const late = new Subject<ClinicalSummary>();
    api.get.mockReturnValueOnce(late);
    fixture.detectChanges();
    component.text = 'Dato privado';
    component.editorOpen.set(true);
    patient.set(newPatient(11));
    api.get.mockReturnValue(of(summary({ patientId: 11 })));
    fixture.detectChanges();
    late.next(summary({ profile: { entries: [entry({ text: 'Paciente anterior' })] } }));
    fixture.detectChanges();
    expect(component.data()?.patientId).toBe(11);
    expect(text()).not.toContain('Paciente anterior');
    expect(component.text).toBe('');
    component.text = 'Borrador de otro usuario';
    user.set(null);
    fixture.detectChanges();
    expect(component.data()).toBeNull();
    expect(component.text).toBe('');
  });
  it('preserves a draft on version conflicts and sends the expected version', () => {
    fixture.detectChanges();
    component.text = 'Penicilina';
    component.date = '2026-10-31';
    component.openEditor('ALLERGY');
    api.save.mockReturnValue(throwError(() => ({ status: 409 })));
    component.add();
    fixture.detectChanges();
    expect(api.save).toHaveBeenCalledWith(
      10,
      0,
      expect.objectContaining({ operation: 'ADD', text: 'Penicilina', certainty: 'REPORTED' }),
    );
    expect(component.text).toBe('Penicilina');
    expect(text()).toContain('La ficha cambió');
    api.get.mockReturnValue(of(summary({ patientVersion: 1 })));
    patient.set(newPatient(10, 1));
    fixture.detectChanges();
    expect(component.text).toBe('Penicilina');
    expect(component.editorOpen()).toBe(true);
  });
  it('blocks writes without edit permissions, and avoids displaying failed reads as empty clinical facts', () => {
    allowed.set(false);
    fixture.detectChanges();
    component.noKnownAllergies();
    expect(api.save).not.toHaveBeenCalled();
    api.get.mockReturnValue(throwError(() => new Error('offline')));
    component.reload();
    fixture.detectChanges();
    expect(text()).toContain('No se pudo cargar');
    expect(text()).not.toContain('Sin información de alergias');
  });
  it('rejects responses for another patient or a stale version', () => {
    api.get.mockReturnValue(of(summary({ patientId: 99 })));
    fixture.detectChanges();
    expect(component.data()).toBeNull();
    expect(text()).toContain('La ficha cambió');
  });

  it('blocks a write immediately when the patient changes, before the next render', () => {
    fixture.detectChanges();
    patient.set(newPatient(11));
    component.noKnownAllergies();
    expect(api.save).not.toHaveBeenCalled();
  });

  it('renders the six clinical sections with representative dated records', () => {
    api.get.mockReturnValue(
      of(
        summary({
          profile: {
            entries: [
              entry(),
              entry({
                id: 'problem',
                kind: 'PROBLEM',
                text: 'Asma',
                details: 'Sin crisis recientes',
                certainty: 'CONFIRMED',
                date: '2026-10-31',
              }),
              entry({
                id: 'med',
                kind: 'MEDICATION',
                text: 'Medicación habitual registrada',
                details: 'Dosis y frecuencia confirmadas en consulta',
                certainty: 'CONFIRMED',
                date: '2026-10-31',
              }),
              entry({
                id: 'pending',
                kind: 'PENDING',
                text: 'Revisar resultado de laboratorio',
                date: '2026-11-10',
              }),
            ],
          },
          lastEncounter: {
            id: 20,
            date: '2026-10-20',
            complaint: 'Control de salud',
            diagnosis: 'Seguimiento clínico',
            followUp: 'Revisar evolución',
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
    const styles = [...document.querySelectorAll('style')]
      .map((style) => style.textContent)
      .join('\n');
    mkdirSync('.angular/clinical-summary', { recursive: true });
    writeFileSync(
      '.angular/clinical-summary/overview.html',
      `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:24px;font-family:Arial,sans-serif;background:#f8fafc}*{box-sizing:border-box}${styles}</style></head><body>${fixture.nativeElement.outerHTML}</body></html>`,
    );
  });
});
