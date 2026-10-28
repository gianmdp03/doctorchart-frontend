import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { interactionInterceptor } from './interaction.interceptor';
import { InteractionStatusService } from '../services/interaction-status.service';

describe('Finite interaction feedback', () => {
  let http: HttpClient;
  let backend: HttpTestingController;
  let status: InteractionStatusService;
  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({ providers: [provideHttpClient(withInterceptors([interactionInterceptor])), provideHttpClientTesting()] });
    http = TestBed.inject(HttpClient); backend = TestBed.inject(HttpTestingController); status = TestBed.inject(InteractionStatusService);
  });
  afterEach(() => { backend.verify({ ignoreCancelled: true }); TestBed.resetTestingModule(); vi.useRealTimers(); });
  it('counts concurrent operations and clears feedback on completion and cancellation', () => {
    http.get('/one').subscribe();
    const second = http.get('/two').subscribe();
    expect(status.busy()).toBe(true);
    backend.expectOne('/one').flush({});
    expect(status.busy()).toBe(true);
    second.unsubscribe();
    expect(status.busy()).toBe(false);
  });
  it('terminates a stalled mutation, warns about uncertainty and never retries it', () => {
    const error = vi.fn();
    http.post('/save', { value: 'fixture' }).subscribe({ error });
    const request = backend.expectOne('/save');
    vi.advanceTimersByTime(20001);
    expect(error).toHaveBeenCalledOnce();
    expect(request.cancelled).toBe(true);
    expect(status.busy()).toBe(false);
    expect(status.error()).toContain('evitar duplicados');
    backend.expectNone('/save');
  });
  it('bounds an auth SDK promise that never settles', async () => {
    const result = status.wait(new Promise(() => undefined)).catch(error => error);
    expect(status.busy()).toBe(true);
    await vi.advanceTimersByTimeAsync(15001);
    expect(await result).toBeInstanceOf(Error);
    expect(status.busy()).toBe(false);
  });
});
