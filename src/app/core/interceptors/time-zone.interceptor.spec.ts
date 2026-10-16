import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { timeZoneInterceptor } from './time-zone.interceptor';
import { environment } from '../../../environments/environment';
import { userTimeZone } from '../date/user-time-zone';

describe('Time zone request context', () => {
  afterEach(() => { TestBed.inject(HttpTestingController).verify(); });
  beforeEach(() => { TestBed.configureTestingModule({ providers: [provideHttpClient(withInterceptors([timeZoneInterceptor])), provideHttpClientTesting()] }); });
  it('sends the device zone without altering payloads or authentication', () => {
    const body = {patientId: 1, values: {birthDate: '2020-01-01'}};
    TestBed.inject(HttpClient).post(environment.apiUrl + '/encounters', body, {params: {search: 'test'}}).subscribe();
    const req = TestBed.inject(HttpTestingController).expectOne(r => r.url === environment.apiUrl + '/encounters');
    expect(req.request.params.get('timeZone')).toBe(userTimeZone());
    expect(req.request.params.get('search')).toBe('test');
    expect(req.request.body).toBe(body);
    expect(req.request.headers.has('X-Gateway-Secret')).toBe(false);
    req.flush({});
  });
  it('does not disclose context to third-party URLs', () => {
    TestBed.inject(HttpClient).get('https://example.test/image').subscribe();
    const req = TestBed.inject(HttpTestingController).expectOne('https://example.test/image');
    expect(req.request.params.has('timeZone')).toBe(false); req.flush({});
  });
});
