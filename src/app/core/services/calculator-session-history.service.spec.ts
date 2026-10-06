import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { CalculatorSessionHistoryService } from './calculator-session-history.service';
import { SessionCalculationItem } from '../models/medical-calculators.model';

describe('Temporary calculator history', () => {
  const user = signal<{id: string} | null>({ id: 'doctor-a' });
  const item: Omit<SessionCalculationItem, 'id'> = {
    calculatorId: 'holliday_segar', calculatorName: 'Holliday', resultHeadline: '1250 mL/día',
    interpretationLabel: 'Normal', severity: 'normal', calculatedAt: '2026-10-06T12:00:00Z',
    plainTextEvolution: 'Resultado del servidor', inputsSummary: { weightKg: 15 },
  };
  let history: CalculatorSessionHistoryService;
  beforeEach(() => {
    user.set({ id: 'doctor-a' });
    TestBed.configureTestingModule({ providers: [{ provide: AuthService, useValue: { currentUser: user } }] });
    history = TestBed.inject(CalculatorSessionHistoryService);
  });
  afterEach(() => vi.restoreAllMocks());

  it('never reads or writes either browser store, and does not recover results in a fresh app instance', () => {
    const read = vi.spyOn(Storage.prototype, 'getItem'); const write = vi.spyOn(Storage.prototype, 'setItem');
    history.save(item); expect(history.items()).toHaveLength(1);
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [{ provide: AuthService, useValue: { currentUser: user } }] });
    expect(TestBed.inject(CalculatorSessionHistoryService).items()).toEqual([]);
    expect(read).not.toHaveBeenCalled(); expect(write).not.toHaveBeenCalled();
  });

  it('hides a previous account immediately, destroys its results, and blocks saving after logout', () => {
    history.save(item); user.set({ id: 'doctor-b' });
    expect(history.items()).toEqual([]);
    history.save({ ...item, resultHeadline: 'B' });
    expect(history.items().map(result => result.resultHeadline)).toEqual(['B']);
    user.set({ id: 'doctor-a' }); TestBed.tick(); expect(history.items()).toEqual([]);
    history.save(item); user.set(null);
    expect(history.items()).toEqual([]); expect(history.save(item)).toBeNull();
    user.set({ id: 'doctor-a' }); TestBed.tick(); expect(history.items()).toEqual([]);
  });

  it('preserves the same-account session, copies inputs and limits recent results to 50', () => {
    const inputs = { weightKg: 15 };
    history.save({ ...item, inputsSummary: inputs }); inputs.weightKg = 99;
    user.set({ id: 'doctor-a' }); TestBed.tick();
    expect(history.items()[0].inputsSummary).toEqual({ weightKg: 15 });
    for (let index = 0; index < 51; index++) history.save({ ...item, resultHeadline: String(index) });
    expect(history.items()).toHaveLength(50); expect(history.items()[0].resultHeadline).toBe('50');
    expect(new Set(history.items().map(result => result.id)).size).toBe(50);
    history.clear(); expect(history.items()).toEqual([]);
  });

  it('does not retain patient identifiers or names even when extra fields are supplied at runtime', () => {
    history.save({ ...item, patientId: 10, patientName: 'Paciente' } as Omit<SessionCalculationItem, 'id'>);
    expect(history.items()[0]).not.toHaveProperty('patientId');
    expect(history.items()[0]).not.toHaveProperty('patientName');
  });
});
