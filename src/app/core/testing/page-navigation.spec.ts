import { Location } from '@angular/common';
import { provideLocationMocks } from '@angular/common/testing';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { routes } from '../../app.routes';
import { EncounterDetailPageComponent } from '../../features/encounter-detail/encounter-detail-page.component';
import { UserProfilePageComponent } from '../../features/auth/user-profile-page.component';
import { dialogEncounter, dialogWorkspace } from '../../features/dynamic-form-renderer/clinical-dialog.fixture';
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
    const page = await harness.navigateByUrl('/consultas/77', EncounterDetailPageComponent);
    await harness.fixture.whenStable(); harness.detectChanges();
    expect(page.encounter()?.id).toBe(77); expect(getById).toHaveBeenCalledWith(77);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Detalle de la consulta');
    expect(harness.routeNativeElement?.querySelector('[role="dialog"]')).toBeNull();
  });
  it('supports profile navigation and browser Back to the consultation page', async () => {
    const harness = await RouterTestingHarness.create('/consultas/77');
    TestBed.inject(Router).initialNavigation();
    await harness.navigateByUrl('/perfil', UserProfilePageComponent);
    expect(harness.routeNativeElement?.textContent).toContain('Sofía Mendoza');
    TestBed.inject(Location).back();
    await vi.waitFor(() => expect(TestBed.inject(Router).url).toBe('/consultas/77'));
    await harness.fixture.whenStable(); harness.detectChanges();
    expect(getById).toHaveBeenCalledTimes(2);
  });
  it('clears the previous record when a different URL is forbidden by the API', async () => {
    const harness = await RouterTestingHarness.create('/consultas/77');
    getById.mockReturnValueOnce(throwError(() => ({ status: 403, error: { message: 'No tenés permiso para acceder a esta consulta.' } })));
    const page = await harness.navigateByUrl('/consultas/88', EncounterDetailPageComponent);
    await harness.fixture.whenStable(); harness.detectChanges();
    expect(page.encounter()).toBeNull();
    expect(harness.routeNativeElement?.querySelector('[role="alert"]')?.textContent).toContain('No tenés permiso');
    expect(harness.routeNativeElement?.textContent).not.toContain(record.patientFullName);
  });
});
