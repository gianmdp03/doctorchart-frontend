import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authServiceMock: { getAccessToken: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    authServiceMock = {
      getAccessToken: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceMock },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add Authorization Bearer header when access token is present', () => {
    authServiceMock.getAccessToken.mockReturnValue('mocked-supabase-jwt-token');

    httpClient.get('/api/doctorchart/patients').subscribe();

    const req = httpTestingController.expectOne('/api/doctorchart/patients');
    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe('Bearer mocked-supabase-jwt-token');
    req.flush([]);
  });

  it('should not add Authorization header when access token is null', () => {
    authServiceMock.getAccessToken.mockReturnValue(null);

    httpClient.get('/api/doctorchart/patients').subscribe();

    const req = httpTestingController.expectOne('/api/doctorchart/patients');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush([]);
  });

  it('should not add Authorization header for googleapis.com requests even if token exists', () => {
    authServiceMock.getAccessToken.mockReturnValue('mocked-supabase-jwt-token');

    httpClient.get('https://www.googleapis.com/drive/v3/files').subscribe();

    const req = httpTestingController.expectOne('https://www.googleapis.com/drive/v3/files');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('should not add Authorization header for google.com requests even if token exists', () => {
    authServiceMock.getAccessToken.mockReturnValue('mocked-supabase-jwt-token');

    httpClient.get('https://accounts.google.com/o/oauth2/v2/auth').subscribe();

    const req = httpTestingController.expectOne('https://accounts.google.com/o/oauth2/v2/auth');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });
});
