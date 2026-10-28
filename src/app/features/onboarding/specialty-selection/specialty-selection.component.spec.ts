import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SpecialtySelectionComponent } from './specialty-selection.component';
import { SpecialtyService } from '../../../core/services/specialty.service';
import { DoctorProfileService } from '../../../core/services/doctor-profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { WorkspaceStore } from '../../../core/services/workspace.store';
import { customSpecialtyFixture } from '../testing/custom-specialty.fixture';

describe('SpecialtySelectionComponent', () => {
  let component: SpecialtySelectionComponent;
  let fixture: ComponentFixture<SpecialtySelectionComponent>;
  let specialties: { getSpecialties: ReturnType<typeof vi.fn> };
  let workspace: { loadSetup: ReturnType<typeof vi.fn>; selectSpecialty: ReturnType<typeof vi.fn>; clearSetup: ReturnType<typeof vi.fn> };
  let navigate: ReturnType<typeof vi.fn>;
  const unfamiliar = { id: 81, code: customSpecialtyFixture.code, name: customSpecialtyFixture.name, description: customSpecialtyFixture.description };

  beforeEach(async () => {
    specialties = { getSpecialties: vi.fn().mockReturnValue(of([unfamiliar])) };
    workspace = {
      loadSetup: vi.fn().mockResolvedValue(null),
      selectSpecialty: vi.fn().mockResolvedValue({}),
      clearSetup: vi.fn(),
    };
    navigate = vi.fn().mockResolvedValue(true);
    await TestBed.configureTestingModule({
      imports: [SpecialtySelectionComponent],
      providers: [
        { provide: Router, useValue: { navigate } },
        { provide: SpecialtyService, useValue: specialties },
        { provide: WorkspaceStore, useValue: workspace },
        { provide: DoctorProfileService, useValue: { clearProfile: vi.fn() } },
        { provide: AuthService, useValue: { signOut: vi.fn().mockResolvedValue({ error: null }) } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SpecialtySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await vi.waitFor(() => expect(component.isLoading()).toBe(false));
    await fixture.whenStable();
    fixture.detectChanges();
  });
  it('retains the configuration and releases logout when Auth returns an error', async () => {
    vi.mocked(TestBed.inject(AuthService).signOut).mockResolvedValue({error:new Error('offline')});
    fixture.nativeElement.querySelector('.btn-signout-onboarding').click(); await fixture.whenStable(); fixture.detectChanges();
    expect(workspace.clearSetup).not.toHaveBeenCalled();
    expect(TestBed.inject(DoctorProfileService).clearProfile).not.toHaveBeenCalled();
    expect(component.errorMessage()).toContain('No pudimos cerrar');
    expect(component.isSubmitting()).toBe(false);
  });

  it('preselects the only backend option by count even with an unfamiliar identity', () => {
    expect(component.selectedSpecialty()).toBe(81);
    expect(fixture.nativeElement.textContent).toContain(unfamiliar.name);
    expect(fixture.nativeElement.textContent).not.toContain('Personalizada');
    expect(fixture.nativeElement.querySelectorAll('.specialty-card')).toHaveLength(1);
  });

  it('confirms selection through the backend copy operation without sending definitions', async () => {
    await component.confirmSpecialty();
    expect(workspace.selectSpecialty).toHaveBeenCalledWith(81, null);
    expect(navigate).toHaveBeenCalledWith(['/onboarding/setup']);
  });

  it('requires a choice when the catalog contains multiple options', async () => {
    specialties.getSpecialties.mockReturnValue(of([unfamiliar, { ...unfamiliar, id: 82, code: 'another', name: 'Otro nombre' }]));
    await component.loadSpecialties(true);
    expect(component.selectedSpecialty()).toBeNull();
    await component.confirmSpecialty();
    expect(workspace.selectSpecialty).not.toHaveBeenCalled();
    component.select(82);
    await component.confirmSpecialty();
    expect(workspace.selectSpecialty).toHaveBeenCalledWith(82, null);
  });

  it('keeps the choice and blocks retries after a conflict until an explicit reload', async () => {
    workspace.selectSpecialty.mockRejectedValue({ status: 409, error: { code: 'VERSION_CONFLICT' } });
    await component.confirmSpecialty();
    expect(component.hasConflict()).toBe(true);
    expect(component.selectedSpecialty()).toBe(81);
    expect(navigate).not.toHaveBeenCalled();
    await component.confirmSpecialty();
    expect(workspace.selectSpecialty).toHaveBeenCalledTimes(1);
    await component.loadSpecialties(true);
    expect(workspace.loadSetup).toHaveBeenLastCalledWith(true);
    expect(component.hasConflict()).toBe(false);
  });

  it('reports catalog failures without inventing a default option', async () => {
    specialties.getSpecialties.mockReturnValue(of([]));
    await component.loadSpecialties(true);
    expect(component.specialties()).toEqual([]);
    expect(component.selectedSpecialty()).toBeNull();
    expect(component.errorMessage()).toContain('No hay especialidades');
  });

  it('reports an unavailable specialty without mislabeling it as a version conflict', async () => {
    workspace.selectSpecialty.mockRejectedValue({ status: 409, error: { code: 'SPECIALTY_NOT_AVAILABLE', message: 'La especialidad no está disponible.' } });
    await component.confirmSpecialty();
    expect(component.hasConflict()).toBe(false);
    expect(component.errorMessage()).toBe('La especialidad no está disponible.');
    expect(navigate).not.toHaveBeenCalled();
  });
});
