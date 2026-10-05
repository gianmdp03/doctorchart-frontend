import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { SpecialtyService } from './specialty.service';
import { environment } from '../../../environments/environment';

describe('SpecialtyService canonical catalog', () => {
  let service: SpecialtyService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(SpecialtyService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('keeps the exact dynamic catalog without code normalization or aliases', () => {
    const catalog = [{ id: 10, code: 'new_xyz', name: 'Especialidad nueva', description: null }];
    service.getSpecialties().subscribe(list => expect(list).toEqual(catalog));
    const request = http.expectOne(environment.apiUrl + '/specialties');
    expect(request.request.method).toBe('GET');
    request.flush(catalog);
  });

  it('loads the published wizard by numeric id without local defaults', () => {
    service.getPublishedWizard(10).subscribe(result => expect(result.publishedVersion).toBe(2));
    const request = http.expectOne(environment.apiUrl + '/specialties/10/wizard');
    expect(request.request.method).toBe('GET');
    request.flush({ specialty: { id: 10, code: 'new_xyz', name: 'Nueva', description: null }, publishedVersion: 2, definition: {} });
  });
});
