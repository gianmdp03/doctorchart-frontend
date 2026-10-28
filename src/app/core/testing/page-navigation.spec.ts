import { Location } from '@angular/common';
import { provideLocationMocks } from '@angular/common/testing';
import { computed, signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { routes } from '../../app.routes';
import { EncounterDetailPageComponent } from '../../features/encounter-detail/encounter-detail-page.component';
import { UserProfilePageComponent } from '../../features/auth/user-profile-page.component';
import { dialogEncounter, dialogPatient, dialogWorkspace } from '../../features/dynamic-form-renderer/clinical-dialog.fixture';
import { PatientRecordComponent } from '../../features/patient-record/patient-record.component';
import { PatientStudiesStore } from '../../features/patient-record/patient-studies/patient-studies.store';
import { PatientEncountersStore } from '../../features/patient-record/patient-encounters/patient-encounters.store';
import { PatientPrescriptionEditorStore } from '../../features/patient-record/patient-prescriptions/patient-prescription-editor.store';
import { PatientPrescriptionService } from '../services/patient-prescription.service';
import { PatientDetailDTO } from '../models/patient.model';
import { AuthService } from '../services/auth.service';
import { WorkspaceStore } from '../services/workspace.store';
import { ActivePatientService } from '../services/active-patient.service';
import { ClinicalEncounterService } from '../services/clinical-encounter.service';
import { DoctorSpecialtyService } from '../services/doctor-specialty.service';
import { DoctorProfileService } from '../services/doctor-profile.service';
import { PatientRecordActionsService } from '../experience/patient-record-actions.service';

describe('Routed consultation and professional profile', () => {
  const record = dialogEncounter();
  let getById: ReturnType<typeof vi.fn>;
  beforeEach(async () => {
    getById = vi.fn().mockReturnValue(of(record));
    await TestBed.configureTestingModule({ providers: [
      provideRouter(routes),
      provideLocationMocks(),
      { provide: AuthService, useValue: { authReady: Promise.resolve(), currentUser: signal({ id: 'doctor-a' }), isLoggedIn: () => true, isSuperAdmin: () => false, hasDoctorchartPlan: () => true, userName: () => 'Sofía Mendoza', userEmail: () => 'sofia@example.com' } },
      { provide: WorkspaceStore, useValue: { loadSetup: async () => dialogWorkspace() } },
      { provide: ClinicalEncounterService, useValue: { getById, getAll: () => of({ content: [record], totalElements: 1, totalPages: 1 }) } },
      { provide: ActivePatientService, useValue: { loadPatient: vi.fn(), activePatient: signal(null), patientId: signal(null) } },
      { provide: PatientRecordActionsService, useValue: { has: () => true } },
      { provide: DoctorSpecialtyService, useValue: { currentSpecialtyOption: () => ({ label: 'Pediatría' }) } },
      { provide: DoctorProfileService, useValue: { clearProfile: vi.fn() } },
    ] }).compileComponents();
  });
  it('opens a direct consultation URL through router-outlet and fetches the persisted record', async () => {
    const harness = await RouterTestingHarness.create();
    const page = await harness.navigateByUrl('/encounters/77', EncounterDetailPageComponent);
    await harness.fixture.whenStable(); harness.detectChanges();
    expect(page.encounter()?.id).toBe(77); expect(getById).toHaveBeenCalledWith(77);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Detalle de la consulta');
    expect(harness.routeNativeElement?.querySelector('[role="dialog"]')).toBeNull();
  });
  it('supports profile navigation and browser Back to the consultation page', async () => {
    const harness = await RouterTestingHarness.create('/encounters/77');
    TestBed.inject(Router).initialNavigation();
    await harness.navigateByUrl('/profile', UserProfilePageComponent);
    expect(harness.routeNativeElement?.textContent).toContain('Sofía Mendoza');
    TestBed.inject(Location).back();
    await vi.waitFor(() => expect(TestBed.inject(Router).url).toBe('/encounters/77'));
    await harness.fixture.whenStable(); harness.detectChanges();
    expect(getById).toHaveBeenCalledTimes(2);
  });
  it('clears the previous record when a different URL is forbidden by the API', async () => {
    const harness = await RouterTestingHarness.create('/encounters/77');
    getById.mockReturnValueOnce(throwError(() => ({ status: 403, error: { message: 'No tenés permiso para acceder a esta consulta.' } })));
    const page = await harness.navigateByUrl('/encounters/88', EncounterDetailPageComponent);
    await harness.fixture.whenStable(); harness.detectChanges();
    expect(page.encounter()).toBeNull();
    expect(harness.routeNativeElement?.querySelector('[role="alert"]')?.textContent).toContain('No tenés permiso');
    expect(harness.routeNativeElement?.textContent).not.toContain(record.patientFullName);
  });
});

describe('Patient drafts across routed clinical screens', () => {
  const patient = signal<PatientDetailDTO | null>(null);
  const owner = signal<{ id: string } | null>(null);
  beforeEach(async () => {
    patient.set(dialogPatient()); owner.set({ id: 'doctor-a' });
    TestBed.overrideComponent(PatientRecordComponent, { set: { template: '' } });
    await TestBed.configureTestingModule({ providers: [
      provideRouter(routes), provideLocationMocks(), provideHttpClient(), provideHttpClientTesting(),
      { provide: AuthService, useValue: { authReady: Promise.resolve(), currentUser: owner, isLoggedIn: () => !!owner(), isSuperAdmin: () => false, hasDoctorchartPlan: () => true } },
      { provide: WorkspaceStore, useValue: { loadSetup: async () => dialogWorkspace(), patientRecordTabs: () => ['SUMMARY', 'ENCOUNTERS', 'STUDIES', 'PRESCRIPTIONS'], hasRecordTab: (tab: string) => tab !== 'GROWTH', isModuleActive: () => false } },
      { provide: ActivePatientService, useValue: { loadPatient: vi.fn(), activePatient: patient, patientId: computed(() => patient()?.id ?? null) } },
      { provide: ClinicalEncounterService, useValue: { getById: () => of(dialogEncounter()), getByPatient: () => of([]) } },
      { provide: PatientPrescriptionService, useValue: { list: () => of([]) } },
      { provide: PatientRecordActionsService, useValue: { has: () => true } },
    ] }).compileComponents();
  });

  it('restores study, prescription and new-encounter drafts after opening a consultation and returning', async () => {
    const harness = await RouterTestingHarness.create();
    const first = await harness.navigateByUrl('/patients/22', PatientRecordComponent);
    const studies = harness.routeDebugElement!.injector.get(PatientStudiesStore);
    const file = new File(['fixture'], 'IMG_1234.pdf', { type: 'application/pdf' });
    studies.setDraftFile(file); studies.setDraftName('Informe "control"'); studies.setDraftDescription('Pendiente');
    first.prescriptions.rxMedicationName.set('Medicamento pendiente');
    first.prescriptions.rxFrequency.set('Cada 12 horas');
    first.prescriptions.rxStudyName.set('Orden pendiente');
    first.prescriptions.rxDiagnosis.set('Diagnóstico pendiente');
    first.history.startCreatingEncounter();
    first.history.setEncounterDraft({ notes: 'Examen pendiente' }, 'FOLLOW_UP', '2026-10-26T12:00:00Z');

    await harness.navigateByUrl('/encounters/77', EncounterDetailPageComponent);
    const returned = await harness.navigateByUrl('/patients/22?tab=history', PatientRecordComponent);
    await harness.fixture.whenStable(); harness.detectChanges();
    const restored = harness.routeDebugElement!.injector.get(PatientStudiesStore);
    expect(returned).not.toBe(first); expect(restored).not.toBe(studies);
    expect(restored.draftFile()).toBe(file); expect(restored.draftName()).toBe('Informe "control"');
    expect(restored.draftDescription()).toBe('Pendiente');
    expect(returned.prescriptions.rxMedicationName()).toBe('Medicamento pendiente');
    expect(returned.prescriptions.rxFrequency()).toBe('Cada 12 horas');
    expect(returned.prescriptions.rxStudyName()).toBe('Orden pendiente');
    expect(returned.prescriptions.rxDiagnosis()).toBe('Diagnóstico pendiente');
    expect(returned.history.isCreatingEncounter()).toBe(true);
    expect(returned.history.encounterDraftValues()).toEqual({ notes: 'Examen pendiente' });
    expect(returned.history.encounterDraftConsultationType()).toBe('FOLLOW_UP');
    expect(returned.history.encounterDraftInstant()).toBe('2026-10-26T12:00:00Z');
  });

  it('clears drafts when the patient changes and when the account changes while the record is closed', async () => {
    const harness = await RouterTestingHarness.create();
    let record = await harness.navigateByUrl('/patients/22', PatientRecordComponent);
    let studies = harness.routeDebugElement!.injector.get(PatientStudiesStore);
    studies.setDraftName('Paciente anterior'); record.prescriptions.rxMedicationName.set('Anterior');
    record.history.setEncounterDraft({ notes: 'Anterior' });
    await harness.navigateByUrl('/encounters/77', EncounterDetailPageComponent);
    patient.set({ ...dialogPatient(), id: 23 });
    record = await harness.navigateByUrl('/patients/23', PatientRecordComponent);
    studies = harness.routeDebugElement!.injector.get(PatientStudiesStore);
    expect(studies.draftName()).toBe(''); expect(record.prescriptions.rxMedicationName()).toBe('');
    expect(record.history.encounterDraftValues()).toEqual({});
    studies.setDraftName('Cuenta anterior'); record.prescriptions.rxStudyName.set('Anterior');
    await harness.navigateByUrl('/encounters/77', EncounterDetailPageComponent);
    owner.set({ id: 'doctor-b' });
    record = await harness.navigateByUrl('/patients/23', PatientRecordComponent);
    expect(harness.routeDebugElement!.injector.get(PatientStudiesStore).draftName()).toBe('');
    expect(record.prescriptions.rxStudyName()).toBe('');
  });
});
