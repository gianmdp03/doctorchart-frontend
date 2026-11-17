import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject, of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { PatientRevisions } from '../../core/models/clinical-revision.model';
import { AuthService } from '../../core/services/auth.service';
import { ClinicalContextService } from '../../core/services/clinical-context.service';
import { PatientService } from '../../core/services/patient.service';
import { ClinicalRevisionsComponent } from './clinical-revisions.component';

const history: PatientRevisions = {
  patient: { id: 42, fullName: 'Paciente de prueba', annulledAt: null },
  items: [{
    id: 3, entity: 'ENCOUNTER', entityId: 8, actorUserId: 'medico-prueba',
    occurredAt: '2026-11-16T12:30:00Z', operation: 'CORRECT', previousVersion: 1, newVersion: 2,
    reason: 'Error de transcripción', previous: { chief_complaint: 'Motivo inicial' },
    derivedProjections: { 'encounter.chiefComplaint': 'Motivo inicial' }, firstRecorded: true,
  }],
  nextBefore: null,
};

function setup(api: ReturnType<typeof vi.fn>, calculations = vi.fn()) {
  const context = signal(7);
  TestBed.configureTestingModule({
    imports: [ClinicalRevisionsComponent],
    providers: [
      { provide: PatientService, useValue: { getRevisions: api, getArchivedCalculations: calculations } },
      { provide: AuthService, useValue: { currentUser: signal({ id: 'medico-prueba' }) } },
      { provide: ClinicalContextService, useValue: { id: context } },
    ],
  });
  const fixture = TestBed.createComponent(ClinicalRevisionsComponent);
  fixture.componentRef.setInput('patientId', 42);
  fixture.componentRef.setInput('encounterId', 8);
  fixture.detectChanges();
  return { context, fixture };
}

describe('Historial de revisiones clínicas', () => {
  it('solicita la consulta seleccionada y muestra autor, motivo y dato anterior', () => {
    const api = vi.fn().mockReturnValue(of(history));
    const { fixture } = setup(api);
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(api).toHaveBeenCalledWith(42, undefined, 8);
    const content = fixture.nativeElement.querySelector('section').textContent;
    expect(content).toContain('Corrección');
    expect(content).toContain('medico-prueba');
    expect(content).toContain('Error de transcripción');
    expect(content).toContain('Motivo inicial');
    expect(content).toContain('Estado anterior a la primera revisión registrada');
  });

  it('distingue el seguimiento histórico derivado de los valores originales conservados', () => {
    const previous = {
      follow_up_instructions: 'Columna anterior inconsistente',
      form_definition_snapshot: { categories: [{ key: 'saved', title: 'Histórica', enabled: true, fields: [
        { key: 'followUp', label: 'Seguimiento original', type: 'TEXTAREA', required: false },
      ] }] },
      form_values: { followUp: 'Seguimiento histórico sintético', unknown: 'Dato original desconocido' },
    };
    const original = structuredClone(previous);
    const api = vi.fn().mockReturnValue(of({ ...history, items: [{ ...history.items[0], previous,
      derivedProjections: { 'encounter.followUpInstructions': 'Seguimiento histórico sintético' },
    }] }));
    const { fixture } = setup(api);
    fixture.componentInstance.show(); fixture.detectChanges();
    const fields = fixture.nativeElement.querySelector('dl').textContent;
    expect(fields).toContain('Indicaciones de seguimiento');
    expect(fields).toContain('Seguimiento histórico sintético');
    expect(fields).not.toContain('Columna anterior inconsistente');
    expect(fields).not.toContain('Dato original desconocido');
    const raw = fixture.nativeElement.querySelector('pre').textContent;
    expect(raw).toContain('"followUp"');
    expect(raw).toContain('Columna anterior inconsistente');
    expect(raw).toContain('Dato original desconocido');
    expect(previous).toEqual(original);
  });

  it.each(['', null])('respeta el seguimiento canónico vacío %s sin rescatar el alias histórico', (empty) => {
    const previous = { follow_up_instructions: 'Columna anterior',
      form_values: { followUpInstructions: empty, followUp: 'Alias que no debe reaparecer' } };
    const api = vi.fn().mockReturnValue(of({ ...history, items: [{ ...history.items[0], previous,
      derivedProjections: { 'encounter.followUpInstructions': empty },
    }] }));
    const { fixture } = setup(api);
    fixture.componentInstance.show(); fixture.detectChanges();
    const fields = fixture.nativeElement.querySelector('dl').textContent;
    expect(fields).not.toContain('Alias que no debe reaparecer');
    expect(fields).not.toContain('Columna anterior');
    expect(fixture.nativeElement.querySelector('pre').textContent).toContain('Alias que no debe reaparecer');
  });

  it('no reemplaza una proyección vacía del servidor por respuestas históricas ocultas', () => {
    const previous = {
      form_definition_snapshot: { categories: [{ key: 'off', title: 'Desactivada', enabled: false, fields: [
        { key: 'followUp', label: 'Seguimiento oculto', type: 'TEXTAREA', required: false },
      ] }] },
      form_values: { followUp: 'Respuesta oculta sintética' },
    };
    const api = vi.fn().mockReturnValue(of({ ...history, items: [{ ...history.items[0], previous,
      derivedProjections: {},
    }] }));
    const { fixture } = setup(api);
    fixture.componentInstance.show(); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('dl').textContent).not.toContain('Respuesta oculta sintética');
    expect(fixture.nativeElement.querySelector('pre').textContent).toContain('Respuesta oculta sintética');
  });

  it('usa sólo los campos visibles del snapshot si el servidor anterior carece de proyecciones', () => {
    const previous = {
      follow_up_instructions: 'Columna obsoleta',
      form_definition_snapshot: { categories: [
        { key: 'saved', title: 'Histórica', enabled: true, fields: [
          { key: 'show', label: 'Mostrar', type: 'BOOLEAN', required: false },
          { key: 'followUp', label: 'Indicación histórica', type: 'TEXTAREA', required: false },
          { key: 'hidden', label: 'Respuesta oculta', type: 'TEXT', required: false, visibleWhen: { fieldKey: 'show', equals: true } },
        ] },
      ] },
      form_values: { show: false, followUp: 'Control histórico sintético', hidden: 'Valor oculto', unknown: 'Desconocido conservado' },
    };
    const item = { ...history.items[0], previous };
    delete item.derivedProjections;
    const api = vi.fn().mockReturnValue(of({ ...history, items: [item] }));
    const { fixture } = setup(api);
    fixture.componentInstance.show(); fixture.detectChanges();
    const fields = fixture.nativeElement.querySelector('dl').textContent;
    expect(fields).toContain('Indicación histórica');
    expect(fields).toContain('Control histórico sintético');
    expect(fields).toContain('No');
    expect(fields).not.toContain('Columna obsoleta');
    expect(fields).not.toContain('Valor oculto');
    expect(fields).not.toContain('Desconocido conservado');
    expect(fixture.nativeElement.querySelector('pre').textContent).toContain('Desconocido conservado');
  });

  it('muestra la identidad interpretada por el servidor conservando las respuestas contradictorias', () => {
    const previous = { full_name: 'Columna antigua', form_values: {
      sys_firstName: 'Nombre de sistema', firstName: 'Nombre personalizado contradictorio',
    } };
    const { fixture } = setup(vi.fn());
    const rows = fixture.componentInstance.fields({ ...history.items[0], entity: 'PATIENT', previous,
      derivedProjections: { 'patient.firstName': 'Nombre de sistema' } });
    expect(rows).toEqual([{ label: 'Nombre', value: 'Nombre de sistema' }]);
    expect(previous.form_values.firstName).toBe('Nombre personalizado contradictorio');
    expect(fixture.componentInstance.fields({ ...history.items[0], entity: 'PRESCRIPTION', previous: {
      general_instructions: 'Indicación exclusiva de receta',
    } })).toEqual([{ label: 'Indicaciones', value: 'Indicación exclusiva de receta' }]);
  });

  it('cancela una lectura pendiente al cambiar el contexto clínico', () => {
    const pending = new Subject<PatientRevisions>();
    const { fixture, context } = setup(vi.fn().mockReturnValue(pending));
    fixture.componentInstance.show();
    expect(pending.observed).toBe(true);
    context.set(9);
    fixture.detectChanges();
    pending.next(history);
    expect(pending.observed).toBe(false);
    expect(fixture.componentInstance.opened()).toBe(false);
    expect(fixture.componentInstance.revisions()).toEqual([]);
  });

  it('carga cálculos solo bajo la autorización del historial de ficha', () => {
    const pending = new Subject<never>();
    const api = vi.fn().mockReturnValue(pending);
    const historyApi = vi.fn().mockReturnValue(of({ ...history, calculationsEnabled: false }));
    const { fixture, context } = setup(historyApi, api);
    fixture.componentRef.setInput('encounterId', undefined);
    fixture.detectChanges();
    fixture.componentInstance.show();
    fixture.componentInstance.loadCalculations();
    expect(api).not.toHaveBeenCalled();
    fixture.componentInstance.close();
    historyApi.mockReturnValue(of({ ...history, calculationsEnabled: true }));
    fixture.componentInstance.show();
    fixture.componentInstance.loadCalculations();
    expect(api).toHaveBeenCalledWith(42, undefined);
    context.set(9);
    fixture.detectChanges();
    expect(pending.observed).toBe(false);
    expect(fixture.componentInstance.calculations()).toBeNull();
  });
});
