import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { WhatsAppConsultation } from '../../../core/models/whatsapp-consultation.model';
import { ActivePatientService } from '../../../core/services/active-patient.service';
import { AuthService } from '../../../core/services/auth.service';
import { ClinicalContextService } from '../../../core/services/clinical-context.service';
import { InteractionStatusService } from '../../../core/services/interaction-status.service';
import { WhatsAppConsultationService } from '../../../core/services/whatsapp-consultation.service';
import { PatientWhatsappConsultationsComponent } from './patient-whatsapp-consultations.component';
import { PatientWhatsappConsultationsStore } from './patient-whatsapp-consultations.store';

describe('PatientWhatsappConsultationsComponent', () => {
  let fixture: ComponentFixture<PatientWhatsappConsultationsComponent>;
  let component: PatientWhatsappConsultationsComponent;
  let apiSpy: {
    list: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    annul: ReturnType<typeof vi.fn>;
  };

  const newerRecord: WhatsAppConsultation = {
    id: 2,
    patientId: 101,
    specialtyContextId: 11,
    authorUserId: 'doc-1',
    consultedAt: '2026-11-26T15:30:00.000Z',
    content: 'Segunda consulta\n\nCon salto de línea',
    createdAt: '2026-11-26T15:35:00.000Z',
    updatedAt: '2026-11-26T15:35:00.000Z',
    version: 0,
  };

  const olderRecord: WhatsAppConsultation = {
    id: 1,
    patientId: 101,
    specialtyContextId: 11,
    authorUserId: 'doc-1',
    consultedAt: '2026-11-24T12:00:00.000Z',
    content: 'Primera consulta previa',
    createdAt: '2026-11-27T09:00:00.000Z',
    updatedAt: '2026-11-27T09:00:00.000Z',
    version: 0,
  };

  function setup(initialItems: WhatsAppConsultation[] = []): void {
    apiSpy = {
      list: vi.fn().mockReturnValue(of(initialItems)),
      create: vi.fn(),
      update: vi.fn(),
      annul: vi.fn().mockReturnValue(of(undefined)),
    };

    TestBed.configureTestingModule({
      imports: [PatientWhatsappConsultationsComponent],
      providers: [
        PatientWhatsappConsultationsStore,
        { provide: WhatsAppConsultationService, useValue: apiSpy },
        { provide: AuthService, useValue: { currentUser: signal({ id: 'doc-1' }) } },
        { provide: ClinicalContextService, useValue: { id: signal(11) } },
        {
          provide: ActivePatientService,
          useValue: {
            activePatient: signal({ id: 101 }),
            patientId: signal(101),
          },
        },
        { provide: InteractionStatusService, useValue: { notifySuccess: vi.fn() } },
      ],
    });

    fixture = TestBed.createComponent(PatientWhatsappConsultationsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('patientId', 101);
    fixture.detectChanges();
  }

  beforeEach(() => {
    TestBed.resetTestingModule();
  });

  it('shows empty state when no WhatsApp consultations exist', () => {
    setup([]);
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Consultas por WhatsApp');
    expect(text).toContain('No hay consultas por WhatsApp registradas');
    expect(fixture.nativeElement.querySelectorAll('.new-whatsapp-btn').length).toBe(1);
  });

  it('fills current date and time with "Usar actual" and prevents empty/duplicate submits', () => {
    setup([]);
    component.openCreateForm();
    fixture.detectChanges();

    expect(component.canSubmitCreate()).toBe(false);

    const useNowBtn = fixture.nativeElement.querySelector('.use-now-btn') as HTMLButtonElement;
    useNowBtn.click();
    fixture.detectChanges();

    expect(component.store.draftDate()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(component.store.draftTime()).toMatch(/^\d{2}:\d{2}$/);
    expect(component.canSubmitCreate()).toBe(false);

    component.onContentChange('   \n  ');
    fixture.detectChanges();
    expect(component.canSubmitCreate()).toBe(false);

    const pending = new Subject<WhatsAppConsultation>();
    apiSpy.create.mockReturnValueOnce(pending);

    component.onContentChange('Paciente refiere tos seca.\nSe indica hidratación.');
    fixture.detectChanges();
    expect(component.canSubmitCreate()).toBe(true);

    component.submitCreate();
    component.submitCreate();
    expect(apiSpy.create).toHaveBeenCalledTimes(1);

    pending.next(newerRecord);
    fixture.detectChanges();
    expect(component.store.consultations()).toHaveLength(1);
    expect(component.store.isFormOpen()).toBe(false);
  });

  it('renders consultations in descending chronological order and preserves line breaks', () => {
    setup([olderRecord, newerRecord]);
    const cards = Array.from(
      fixture.nativeElement.querySelectorAll('.consultation-card'),
    ) as HTMLElement[];
    expect(cards).toHaveLength(2);
    expect(cards[0].textContent).toContain('Segunda consulta');
    expect(cards[1].textContent).toContain('Primera consulta previa');
    const contentEl = cards[0].querySelector('.card-content') as HTMLElement;
    expect(contentEl.textContent).toContain('Segunda consulta\n\nCon salto de línea');
  });

  it('supports inline correction and annulment with reason', () => {
    setup([newerRecord]);
    apiSpy.update.mockReturnValueOnce(
      of({ ...newerRecord, content: 'Contenido corregido', version: 1 }),
    );

    const editBtn = fixture.nativeElement.querySelector('.action-btn') as HTMLButtonElement;
    editBtn.click();
    fixture.detectChanges();

    component.editContent.set('Contenido corregido');
    component.editReason.set('Aclaración');
    fixture.detectChanges();
    component.submitEdit(newerRecord);
    fixture.detectChanges();

    expect(apiSpy.update).toHaveBeenCalledWith(101, 2, {
      expectedVersion: 0,
      consultedAt: newerRecord.consultedAt,
      content: 'Contenido corregido',
      reason: 'Aclaración',
    });
    expect(component.store.consultations()[0].version).toBe(1);

    const annulBtn = fixture.nativeElement.querySelector('.action-danger') as HTMLButtonElement;
    annulBtn.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-annulment-prompt')).not.toBeNull();

    component.store.confirmAnnul(101, 'Cargada por error');
    fixture.detectChanges();
    expect(apiSpy.annul).toHaveBeenCalledWith(101, 2, 'Cargada por error', 1);
    expect(component.store.consultations()).toHaveLength(0);
  });
});
