import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { routes } from '../../app.routes';
import { AuthService } from '../../core/services/auth.service';
import { BrowserUiStorageService } from '../../core/services/browser-ui-storage.service';
import { ClinicalContextService } from '../../core/services/clinical-context.service';
import { CUSTOMER_ACCOUNT } from '../../shared/customer-account/account-context';
import { PracticeExportPageComponent } from './practice-export-page.component';

const api = 'https://example.test/api/doctorchart/exports';

@Component({ template: '<p>Inicio de sesión</p>' })
class LoginProbe {}

describe('Copia de seguridad', () => {
  const owner = signal<string | null>('doctor-a');
  let fixture: ComponentFixture<PracticeExportPageComponent>;
  let http: HttpTestingController;

  const html = () => fixture.nativeElement as HTMLElement;
  const button = (label: string) => Array.from(html().querySelectorAll('button'))
    .find(item => item.textContent?.trim() === label)!;
  const noCurrentCopy = () => {
    http.expectOne({ method: 'GET', url: api }).flush(null, { status: 404, statusText: 'Not Found' });
    fixture.detectChanges();
  };

  beforeEach(async () => {
    owner.set('doctor-a');
    await TestBed.configureTestingModule({
      imports: [PracticeExportPageComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: CUSTOMER_ACCOUNT, useValue: { owner, api: api.slice(0, -'/exports'.length) } },
      ],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PracticeExportPageComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    http.verify();
    for (const clinic of ['17', '21', '32']) {
      sessionStorage.removeItem('doctorchart_schedule_draft:doctor-a:' + clinic);
      sessionStorage.removeItem('doctorchart_schedule_draft:doctor-b:' + clinic);
    }
    window.localStorage?.removeItem('doctorchart_theme');
    window.localStorage?.removeItem('doctorchart_font_size');
    vi.useRealTimers();
    TestBed.resetTestingModule();
  });

  it('prepares a ZIP with the current account’s browser preferences and shows its key and download details', async () => {
    vi.useFakeTimers();
    noCurrentCopy();
    const storage = TestBed.inject(BrowserUiStorageService);
    storage.writeTheme('dark');
    storage.writeFontSize('large');
    TestBed.inject(ClinicalContextService).bind(71);
    const draft = {
      minNoticeMinutes: null,
      maxAdvanceDays: 30,
      weekly: Array.from({ length: 7 }, (_, index) => ({
        weekday: index + 1,
        ranges: index === 0 ? [{ start: '09:00', end: '12:00', specialtyContextId: '71' }] : [],
      })),
      exceptions: [{ from: '', through: '', label: '', ranges: [] }],
    };
    const saved = JSON.stringify({ version: '0', draft: { ...draft, unexpected: 'remove this' } });
    storage.writeScheduleDraft('doctor-a', '17', saved);
    storage.writeScheduleDraft('doctor-b', '21', saved);
    storage.writeScheduleDraft('doctor-a', '32', '{invalid json');

    button('Preparar copia').click();
    const started = http.expectOne(request => request.method === 'POST' && request.url === api);
    expect(JSON.parse(JSON.stringify(started.request.body))).toEqual({
      browserPreferences: {
        theme: 'dark', fontSize: 'large', selectedContextId: '71',
        scheduleDrafts: [{ clinicId: '17', version: '0', draft }],
      },
    });
    started.flush({ id: 'export-1', status: 'preparing', password: 'synthetic-zip-key' });
    fixture.detectChanges();
    expect(html().textContent).toContain('Preparando copia…');
    expect(html().textContent).toContain('synthetic-zip-key');

    await vi.advanceTimersByTimeAsync(0);
    http.expectOne(api + '/export-1').flush({ id: 'export-1', status: 'preparing' });
    await vi.advanceTimersByTimeAsync(2500);
    http.expectOne(api + '/export-1').flush({
      id: 'export-1', status: 'ready', bytes: 12000,
      preparedAt: '2026-11-25T12:00:00Z', expiresAt: '2026-11-26T12:00:00Z',
    });
    fixture.detectChanges();
    expect(button('Descargar ZIP')).toBeTruthy();
    expect(html().textContent).toContain('25/11/2026');
    expect(html().textContent).toContain('26/11/2026');
    expect(html().textContent).toContain('synthetic-zip-key');
    await vi.advanceTimersByTimeAsync(5000);
    http.expectNone(api + '/export-1');

    owner.set('doctor-b');
    fixture.detectChanges();
    expect(html().textContent).not.toContain('synthetic-zip-key');
    expect(button('Descargar ZIP')).toBeUndefined();
  });

  it('allows excluding local data and restarting when the copy expires', async () => {
    vi.useFakeTimers();
    noCurrentCopy();
    html().querySelector<HTMLInputElement>('input[type="checkbox"]')!.click();
    button('Preparar copia').click();
    const started = http.expectOne(api);
    expect(started.request.body).toEqual({});
    started.flush({ id: 'export-1', status: 'preparing', password: 'synthetic-zip-key' });
    await vi.advanceTimersByTimeAsync(0);
    http.expectOne(api + '/export-1').flush(null, { status: 404, statusText: 'Not Found' });
    fixture.detectChanges();

    expect(html().querySelector('[role="alert"]')?.textContent).toContain('ya no está disponible');
    expect(html().textContent).not.toContain('synthetic-zip-key');
    expect(button('Preparar copia')).toBeTruthy();
  });

  it('finds a ready copy after opening the page again without disclosing its password', () => {
    expect(button('Preparar copia').disabled).toBe(true);
    http.expectOne({ method: 'GET', url: api }).flush({
      id: 'previous-copy', status: 'ready', bytes: 9000, password: 'never-read-from-discovery',
    });
    fixture.detectChanges();

    expect(button('Descargar ZIP')).toBeTruthy();
    expect(button('Preparar otra copia')).toBeTruthy();
    expect(html().textContent).toContain('la clave que se mostró al pedir la copia');
    expect(html().textContent).not.toContain('never-read-from-discovery');
  });

  it.each([0, 409])('finds a preparation after an ambiguous POST outcome (%s)', async (status) => {
    vi.useFakeTimers();
    noCurrentCopy();
    button('Preparar copia').click();
    const started = http.expectOne({ method: 'POST', url: api });
    if (status === 0) started.error(new ProgressEvent('error'));
    else started.flush(null, { status, statusText: 'Conflict' });

    http.expectOne({ method: 'GET', url: api }).flush({ id: 'active-copy', status: 'preparing' });
    await vi.advanceTimersByTimeAsync(0);
    http.expectOne({ method: 'GET', url: api + '/active-copy' }).flush({
      id: 'active-copy', status: 'ready', bytes: 9000,
    });
    fixture.detectChanges();
    expect(button('Descargar ZIP')).toBeTruthy();
    expect(button('Copiar clave')).toBeUndefined();
  });
});

describe('La ruta de copia de seguridad', () => {
  it('accepts an authenticated account with no active plan and redirects signed-out visitors', async () => {
    const user = signal<{ id: string } | null>({ id: 'doctor-no-plan' });
    const backup = routes.find(route => route.path === 'account/backup')!;
    TestBed.configureTestingModule({ providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      provideRouter([backup, { path: 'login', component: LoginProbe }]),
      { provide: AuthService, useValue: { authReady: Promise.resolve(), currentUser: user, hasDoctorchartPlan: () => false } },
    ] });
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/account/backup', PracticeExportPageComponent);
    TestBed.inject(HttpTestingController).expectOne(request => request.method === 'GET' && request.url.endsWith('/exports'))
      .flush(null, { status: 404, statusText: 'Not Found' });
    expect(harness.routeNativeElement?.textContent).toContain('Copia de seguridad');
    await harness.navigateByUrl('/login', LoginProbe);
    user.set(null);
    await harness.navigateByUrl('/account/backup', LoginProbe);
    expect(TestBed.inject(Router).url).toBe('/login?returnUrl=%2Faccount%2Fbackup');
  });
});
