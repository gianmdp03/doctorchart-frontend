import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthService } from '../../core/services/auth.service';
import { MOCK_CLINIC_ERRORS, MockClinicsBackend } from './clinics.mocks';
import { CLINICS_TRANSPORT, ClinicsService } from './clinics.service';
import { ClinicsPageComponent } from './clinics-page.component';

describe('ClinicsPageComponent', () => {
  let fixture: ComponentFixture<ClinicsPageComponent>;
  let component: ClinicsPageComponent;
  let mockBackend: MockClinicsBackend;
  const currentUser = signal<{ id: string } | null>({ id: 'doctor-1' });

  beforeEach(async () => {
    currentUser.set({ id: 'doctor-1' });
    mockBackend = new MockClinicsBackend('VERIFIED');

    await TestBed.configureTestingModule({
      imports: [ClinicsPageComponent],
      providers: [
        provideRouter([]),
        ClinicsService,
        { provide: CLINICS_TRANSPORT, useValue: mockBackend },
        {
          provide: AuthService,
          useValue: {
            currentUser,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicsPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders the clinics list with Argentine dates and quota summary when VERIFIED', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('2 de 3 consultorios utilizados (activos + inactivos)');
    expect(el.textContent).toContain('Consultorio Belgrano');
    expect(el.textContent).toContain('Centro Médico Recoleta');
    expect(el.textContent).toContain('Anexo San Isidro (Histórico)');
    expect(el.textContent).toContain('18/04/2026');

    const createBtn = el.querySelector('[data-testid="create-clinic-btn"]') as HTMLButtonElement;
    expect(createBtn.disabled).toBe(false);
  });

  it('filters clinics by status and resets page to 0', async () => {
    component.selectStatusFilter('INACTIVE');
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.clinics()).toHaveLength(1);
    expect(component.clinics()[0].id).toBe('102');
    expect(component.clinics()[0].status).toBe('INACTIVE');
  });

  it('renders empty state when no clinics exist', async () => {
    mockBackend.setScenario('EMPTY');
    await component.reloadAll();
    fixture.detectChanges();

    const empty = fixture.nativeElement.querySelector('[data-testid="empty-clinics-state"]');
    expect(empty).toBeTruthy();
    expect(empty.textContent).toContain('Todavía no registraste consultorios');
  });

  it('handles ZERO_QUOTA, LIMIT_REACHED, OVER_QUOTA_DOWNGRADE, UNLIMITED, DENIED, and UNAVAILABLE capabilities', async () => {
    const el = fixture.nativeElement as HTMLElement;
    const createBtn = () =>
      el.querySelector('[data-testid="create-clinic-btn"]') as HTMLButtonElement;

    // 1. ZERO_QUOTA
    mockBackend.setScenario('ZERO_QUOTA');
    await component.reloadAll();
    fixture.detectChanges();
    expect(createBtn().disabled).toBe(true);
    expect(el.querySelector('[data-testid="capability-banner"]')?.textContent).toContain(
      'cupo de 0 consultorios',
    );

    // 2. LIMIT_REACHED (2 of 2 used; 1 ARCHIVED)
    mockBackend.setScenario('LIMIT_REACHED');
    await component.reloadAll();
    fixture.detectChanges();
    expect(createBtn().disabled).toBe(true);
    const restoreBtnLimit = el.querySelector('[data-testid="restore-btn-101"]') as HTMLButtonElement;
    expect(restoreBtnLimit.disabled).toBe(true);
    const deactivateBtnLimit = el.querySelector(
      '[data-testid="deactivate-btn-103"]',
    ) as HTMLButtonElement;
    expect(deactivateBtnLimit.disabled).toBe(false);

    // 3. OVER_QUOTA_DOWNGRADE (2 counted vs max 1)
    mockBackend.setScenario('OVER_QUOTA_DOWNGRADE');
    await component.reloadAll();
    fixture.detectChanges();
    expect(createBtn().disabled).toBe(true);
    expect(el.querySelector('[data-testid="capability-banner"]')?.textContent).toContain(
      'Superaste el cupo de tu plan actual (2 de 1 consultorios)',
    );
    const activateBtnDowngrade = el.querySelector(
      '[data-testid="activate-btn-102"]',
    ) as HTMLButtonElement;
    expect(activateBtnDowngrade.disabled).toBe(true);
    const archiveBtnDowngrade = el.querySelector(
      '[data-testid="archive-btn-103"]',
    ) as HTMLButtonElement;
    expect(archiveBtnDowngrade.disabled).toBe(false);

    // 4. UNLIMITED (-1)
    mockBackend.setScenario('UNLIMITED');
    await component.reloadAll();
    fixture.detectChanges();
    expect(createBtn().disabled).toBe(false);
    expect(el.textContent).toContain('Sin tope numérico');
    expect(el.querySelector('[data-testid="capability-banner"]')).toBeNull();

    // 5. DENIED
    mockBackend.setScenario('DENIED');
    await component.reloadAll();
    fixture.detectChanges();
    expect(createBtn().disabled).toBe(true);
    expect(el.querySelector('[data-testid="capability-banner"]')?.textContent).toContain(
      'Administración de consultorios deshabilitada en tu plan',
    );
    expect(
      (el.querySelector('[data-testid="deactivate-btn-103"]') as HTMLButtonElement).disabled,
    ).toBe(true);

    // 6. UNAVAILABLE (503 fail-closed)
    mockBackend.setScenario('UNAVAILABLE');
    await component.reloadAll();
    fixture.detectChanges();
    expect(createBtn().disabled).toBe(true);
    expect(el.querySelector('[data-testid="capability-banner"]')?.textContent).toContain(
      'Verificación comercial temporalmente no disponible',
    );
  });

  it('transitions clinic status and updates quota usage', async () => {
    const activeClinic = component.clinics().find((c) => c.id === '103')!;
    await component.changeStatus(activeClinic, 'ARCHIVED');
    fixture.detectChanges();

    const updated = component.clinics().find((c) => c.id === '103')!;
    expect(updated.status).toBe('ARCHIVED');
    expect(updated.version).toBe('2');
    // Archiving frees 1 counted slot (from 2 down to 1)
    expect(component.capabilities()?.usage.counted).toBe(1);
    expect(
      fixture.nativeElement.querySelector('[data-testid="action-feedback-alert"]')?.textContent,
    ).toContain('Archivado');
  });

  it('surfaces error and refreshes capabilities when status change fails with 409', async () => {
    const spy = vi
      .spyOn(mockBackend, 'updateClinicStatus')
      .mockReturnValueOnce(throwError(() => MOCK_CLINIC_ERRORS.limitReached()));

    const archivedClinic = component.clinics().find((c) => c.id === '101')!;
    await component.changeStatus(archivedClinic, 'INACTIVE');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(
      fixture.nativeElement.querySelector('[data-testid="action-error-alert"]')?.textContent,
    ).toContain('límite de consultorios');
    expect(component.clinics().find((c) => c.id === '101')?.status).toBe('ARCHIVED');
  });
});
