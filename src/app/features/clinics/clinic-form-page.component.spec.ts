import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap, Router, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthService } from '../../core/services/auth.service';
import { MOCK_CLINIC_ERRORS, MockClinicsBackend } from './clinics.mocks';
import { CLINICS_TRANSPORT, ClinicsService } from './clinics.service';
import { ClinicFormPageComponent } from './clinic-form-page.component';

describe('ClinicFormPageComponent', () => {
  let fixture: ComponentFixture<ClinicFormPageComponent>;
  let component: ClinicFormPageComponent;
  let mockBackend: MockClinicsBackend;
  let paramMap$: BehaviorSubject<ParamMap>;
  const currentUser = signal<{ id: string } | null>({ id: 'doctor-1' });

  beforeEach(async () => {
    currentUser.set({ id: 'doctor-1' });
    mockBackend = new MockClinicsBackend('VERIFIED');
    paramMap$ = new BehaviorSubject<ParamMap>(convertToParamMap({}));

    await TestBed.configureTestingModule({
      imports: [ClinicFormPageComponent],
      providers: [
        provideRouter([]),
        ClinicsService,
        { provide: CLINICS_TRANSPORT, useValue: mockBackend },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: paramMap$.asObservable(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            currentUser,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicFormPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('validates required fields and IANA timezone in create mode before calling backend', async () => {
    const createSpy = vi.spyOn(mockBackend, 'createClinic');
    component.form.patchValue({
      name: '   ',
      country: 'Argentina',
      province: 'CABA',
      city: 'Buenos Aires',
      address: 'Av. Cabildo 100',
      timezone: 'GMT-3',
    });

    await component.submit();
    fixture.detectChanges();

    expect(createSpy).not.toHaveBeenCalled();
    expect(component.isFieldInvalid('name')).toBe(true);
    expect(component.isFieldInvalid('timezone')).toBe(true);

    const nameInput = fixture.nativeElement.querySelector('#clinic-name') as HTMLInputElement;
    const tzInput = fixture.nativeElement.querySelector('#clinic-timezone') as HTMLInputElement;
    expect(nameInput.getAttribute('aria-invalid')).toBe('true');
    expect(tzInput.getAttribute('aria-invalid')).toBe('true');
    expect(fixture.nativeElement.querySelector('#clinic-timezone-error')?.textContent).toContain(
      'IANA',
    );
  });

  it('creates a clinic and navigates to /clinics when form is valid and create is allowed', async () => {
    const router = TestBed.inject(Router);
    const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component.form.setValue({
      name: '  Consultorio Caballito ',
      country: ' Argentina ',
      province: ' Ciudad Autónoma de Buenos Aires ',
      city: ' Buenos Aires ',
      address: ' Av. Rivadavia 5100 ',
      timezone: 'America/Argentina/Buenos_Aires',
    });

    await component.submit();
    fixture.detectChanges();

    expect(navSpy).toHaveBeenCalledWith(['/clinics']);
    const created = mockBackend
      .snapshotClinics()
      .find((item) => item.name === 'Consultorio Caballito');
    expect(created).toBeDefined();
    expect(created?.status).toBe('ACTIVE');
    expect(created?.version).toBe('0');
  });

  it('maps 400 INVALID_REQUEST field errors onto controls while preserving user input', async () => {
    vi.spyOn(mockBackend, 'createClinic').mockReturnValueOnce(
      throwError(() =>
        MOCK_CLINIC_ERRORS.invalidRequest([
          { path: 'timezone', code: 'INVALID_TIMEZONE' },
          { path: 'address', code: 'TOO_LONG' },
        ]),
      ),
    );

    component.form.setValue({
      name: 'Consultorio Norte',
      country: 'Argentina',
      province: 'Buenos Aires',
      city: 'Olivos',
      address: 'Av. Maipú 2500',
      timezone: 'America/Argentina/Buenos_Aires',
    });

    await component.submit();
    fixture.detectChanges();

    expect(component.form.controls.name.value).toBe('Consultorio Norte');
    expect(component.isFieldInvalid('timezone')).toBe(true);
    expect(component.isFieldInvalid('address')).toBe(true);
    expect(fixture.nativeElement.querySelector('#clinic-address-error')?.textContent).toContain(
      '255',
    );
  });

  it('loads an archived clinic as read-only and unlocks editing once restored to INACTIVE', async () => {
    paramMap$.next(convertToParamMap({ id: '101' }));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.isEditMode()).toBe(true);
    expect(component.isArchived()).toBe(true);
    expect(component.isReadOnly()).toBe(true);
    expect(
      fixture.nativeElement.querySelector('[data-testid="archived-readonly-banner"]'),
    ).toBeTruthy();

    // Restore archived clinic ('101') to INACTIVE
    await component.changeStatus('INACTIVE');
    fixture.detectChanges();

    expect(component.clinic()?.status).toBe('INACTIVE');
    expect(component.isArchived()).toBe(false);
    expect(component.isReadOnly()).toBe(false);
  });

  it('preserves user edits on 409 VERSION_CONFLICT and allows adopting latest server version', async () => {
    paramMap$.next(convertToParamMap({ id: '103' }));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.clinic()?.version).toBe('1');

    // Simulate concurrent modification on the backend (version becomes '2')
    await mockBackend
      .updateClinic('103', {
        expectedVersion: '1',
        address: 'Av. Cabildo 2150 Piso 9 (Servidor)',
      })
      .toPromise();

    // User edits name locally while still holding version '1'
    component.form.patchValue({
      name: 'Consultorio Belgrano Editado por Médico',
    });

    await component.submit();
    fixture.detectChanges();

    expect(component.versionConflict()).toBe(true);
    // User input MUST be preserved!
    expect(component.form.controls.name.value).toBe('Consultorio Belgrano Editado por Médico');
    expect(
      fixture.nativeElement.querySelector('[data-testid="version-conflict-banner"]'),
    ).toBeTruthy();

    // Resolve conflict keeping local edits and adopting server version '2'
    await component.resolveConflictKeepLocalEdits();
    fixture.detectChanges();

    expect(component.versionConflict()).toBe(false);
    expect(component.clinic()?.version).toBe('2');
    expect(component.form.controls.name.value).toBe('Consultorio Belgrano Editado por Médico');

    // Saving now succeeds and advances version to '3'
    await component.submit();
    fixture.detectChanges();
    expect(component.clinic()?.version).toBe('3');
    expect(component.clinic()?.name).toBe('Consultorio Belgrano Editado por Médico');
  });

  it('handles invalid id parameter and 404 CLINIC_NOT_FOUND cleanly', async () => {
    paramMap$.next(convertToParamMap({ id: 'invalid-id' }));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.clinic()).toBeNull();
    expect(
      fixture.nativeElement.querySelector('[data-testid="form-load-error"]')?.textContent,
    ).toContain('formato válido');

    paramMap$.next(convertToParamMap({ id: '999999' }));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.clinic()).toBeNull();
    expect(
      fixture.nativeElement.querySelector('[data-testid="form-load-error"]')?.textContent,
    ).toContain('Consultorio no encontrado');
  });
});
