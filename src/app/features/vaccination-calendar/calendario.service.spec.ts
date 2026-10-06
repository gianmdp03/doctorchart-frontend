import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { VaccinationCalendarService } from './calendario.service';
import { environment } from '../../../environments/environment';

describe('Vaccination calendar backend source', () => {
  let service: VaccinationCalendarService, http: HttpTestingController;
  const url = environment.apiUrl + '/vaccination-calendar';
  const calendar = {
    calendarId: 'v1',
    metadata: { titulo: 'Calendario' },
    vacunas: [],
    grupos_etarios_columnas: [],
    notas_aplicacion: {},
    referencias_patologias: {},
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(VaccinationCalendarService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  it('uses the backend and shares one request across readers', () => {
    service.load();
    service.load();
    expect(service.loading()).toBe(true);
    http.expectOne(url).flush(calendar);
    expect(service.data()?.calendarId).toBe('v1');
    expect(service.loading()).toBe(false);
    service.load();
    http.expectNone(url);
  });
  it('keeps errors visible and supports a later retry without a Gist fallback', () => {
    service.load();
    http.expectOne(url).flush({}, { status: 503, statusText: 'Unavailable' });
    expect(service.data()).toBeNull();
    expect(service.loading()).toBe(false);
    expect(service.error()).toContain('HTTP 503');
    service.load();
    http.expectOne(url).flush(calendar);
    expect(service.hasData()).toBe(true);
    expect(service.error()).toBeNull();
  });
  it('cancels a cleared request so its response cannot repopulate the calendar', () => {
    service.load();
    const request = http.expectOne(url);
    service.clear();
    expect(request.cancelled).toBe(true);
    expect(service.data()).toBeNull();
    expect(service.loading()).toBe(false);
    service.load();
    http.expectOne(url).flush(calendar);
    expect(service.hasData()).toBe(true);
  });
});
