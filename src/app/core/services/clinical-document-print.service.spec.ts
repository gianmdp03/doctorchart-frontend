import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ClinicalDocumentPrintService } from './clinical-document-print.service';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('ClinicalDocumentPrintService', () => {
  let service: ClinicalDocumentPrintService;
  let httpMock: HttpTestingController;

  const mockUser = {
    id: 'doc-123',
    email: 'doc@example.com',
    user_metadata: {
      full_name: 'Dra. María Gómez',
      license: 'MN 88412',
      clinic_name: 'Clínica Pediátrica Central',
      clinic_address: 'Av. Corrientes 1500',
      clinic_phone: '11-4567-8900',
    },
  };

  const authMock = {
    currentUser: vi.fn(() => mockUser),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClinicalDocumentPrintService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authMock },
      ],
    });

    service = TestBed.inject(ClinicalDocumentPrintService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    vi.restoreAllMocks();
  });

  it('should fetch prescription document JSON projection via get()', () => {
    const mockDoc = { id: 10, code: 'RX-10-1', source: 'PRESCRIPTION_RECORD' } as any;

    service.get({ source: 'PRESCRIPTION_RECORD', id: 10, patientId: 1 }).subscribe((doc) => {
      expect(doc).toEqual(mockDoc);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/patients/1/prescriptions/10/print`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDoc);
  });

  it('should fetch PDF blob without client identity query parameters via getPdfBlob()', () => {
    const mockBlob = new Blob(['%PDF-1.4 test content'], { type: 'application/pdf' });

    service.getPdfBlob({ source: 'PRESCRIPTION_RECORD', id: 15, patientId: 2, type: 'PRESCRIPTION' }).subscribe((blob) => {
      expect(blob).toEqual(mockBlob);
    });

    const req = httpMock.expectOne((request) => {
      return (
        request.url === `${environment.apiUrl}/patients/2/prescriptions/15/pdf` &&
        !request.params.has('doctorName') &&
        !request.params.has('license') &&
        !request.params.has('clinicName') &&
        request.params.get('type') === 'PRESCRIPTION'
      );
    });

    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    req.flush(mockBlob);
  });

  it('should fetch encounter study orders PDF blob via getPdfBlob()', () => {
    const mockBlob = new Blob(['%PDF-1.4 studies'], { type: 'application/pdf' });

    service.getPdfBlob({ source: 'ENCOUNTER', id: 44, patientId: 5, type: 'STUDY_ORDERS' }).subscribe((blob) => {
      expect(blob).toEqual(mockBlob);
    });

    const req = httpMock.expectOne((request) => {
      return (
        request.url === `${environment.apiUrl}/patients/5/encounters/44/pdf` &&
        request.params.get('type') === 'STUDY_ORDERS'
      );
    });

    expect(req.request.method).toBe('GET');
    req.flush(mockBlob);
  });

  it('handles a forbidden JSON-as-blob response and closes the empty preview', () => {
    const close = vi.fn();
    vi.spyOn(window, 'open').mockReturnValue({ closed: false, document: {}, close } as unknown as Window);
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {});
    service.openPdfInNewTab({ source: 'PRESCRIPTION_RECORD', id: 20, patientId: 3 });
    const req = httpMock.expectOne(request => request.url.endsWith('/patients/3/prescriptions/20/documents'));
    req.flush({ code: 'FORBIDDEN' }, { status: 403, statusText: 'Forbidden' });
    expect(close).toHaveBeenCalled();
    expect(service.errorMessage()).toContain('No tenés permiso');
    expect(alert).not.toHaveBeenCalled();
  });

  it('discards a PDF delivered after the session changes', () => {
    const close = vi.fn();
    vi.spyOn(window, 'open').mockReturnValue({ closed: false, document: {}, close } as unknown as Window);
    const create = vi.spyOn(URL, 'createObjectURL');
    service.openPdfInNewTab({ source: 'PRESCRIPTION_RECORD', id: 20, patientId: 3 });
    const req = httpMock.expectOne(request => request.url.endsWith('/patients/3/prescriptions/20/documents'));
    req.flush({ id: 8 });
    const pdf = httpMock.expectOne(request => request.url.endsWith('/patients/3/documents/8/pdf'));
    authMock.currentUser.mockReturnValueOnce({ ...mockUser, id: 'other-user' });
    pdf.flush(new Blob(['%PDF-synthetic'], { type: 'application/pdf' }));
    expect(create).not.toHaveBeenCalled();
    expect(close).toHaveBeenCalled();
  });

  it('reports an unsupported clinical PDF without suggesting a transient retry', () => {
    const close = vi.fn();
    vi.spyOn(window, 'open').mockReturnValue({ closed: false, document: {}, close } as unknown as Window);
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {});
    service.openPdfInNewTab({ source: 'PRESCRIPTION_RECORD', id: 20, patientId: 3 });
    httpMock.expectOne(request => request.url.endsWith('/patients/3/prescriptions/20/documents')).flush(
      { code: 'PDF_UNSUPPORTED_CHARACTER' },
      { status: 422, statusText: 'Unprocessable Content' });
    expect(close).toHaveBeenCalled();
    expect(service.errorMessage()).toContain('los datos guardados no se modificaron');
    expect(alert).not.toHaveBeenCalled();
  });

  it('should open new window and assign blob object URL on openPdfInNewTab()', () => {
    const mockWindow = {
      closed: false,
      location: { href: '' },
      document: { title: '' },
      close: vi.fn(),
    } as unknown as Window;

    const windowOpenSpy = vi.spyOn(window, 'open').mockReturnValue(mockWindow);
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:http://localhost/test-uuid');

    const mockBlob = new Blob(['%PDF-test'], { type: 'application/pdf' });

    service.openPdfInNewTab({ source: 'PRESCRIPTION_RECORD', id: 20, patientId: 3 });

    const issue = httpMock.expectOne(`${environment.apiUrl}/patients/3/prescriptions/20/documents`);
    expect(issue.request.method).toBe('POST');
    expect(issue.request.body).toEqual({});
    issue.flush({ id: 8 });
    const req = httpMock.expectOne(`${environment.apiUrl}/patients/3/documents/8/pdf`);
    req.flush(mockBlob);

    expect(windowOpenSpy).toHaveBeenCalledWith('about:blank', '_blank');
    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(mockWindow.location.href).toBe('blob:http://localhost/test-uuid');
  });

  it('sends signatureId or signatureMode=none on getPdfBlob() and issue()', () => {
    const mockBlob = new Blob(['%PDF-signed'], { type: 'application/pdf' });
    service.getPdfBlob({ source: 'PRESCRIPTION_RECORD', id: 15, patientId: 2 }, { mode: 'SELECTED', signatureId: 7 }).subscribe((b) => {
      expect(b).toEqual(mockBlob);
    });
    const pdfReq = httpMock.expectOne((r) => r.url.endsWith('/patients/2/prescriptions/15/pdf') && r.params.get('signatureId') === '7');
    pdfReq.flush(mockBlob);

    service.issue({ source: 'PRESCRIPTION_RECORD', id: 15, patientId: 2, type: 'PRESCRIPTION' }, { mode: 'NONE' }).subscribe((res) => {
      expect(res.id).toBe(99);
    });
    const issueReq = httpMock.expectOne(`${environment.apiUrl}/patients/2/prescriptions/15/documents`);
    expect(issueReq.request.body).toEqual({ type: 'PRESCRIPTION', signatureId: null });
    issueReq.flush({ id: 99 });
  });

  it('caches preview blobs per signature and fetches immediately when switching signature', () => {
    const blobPaula = new Blob(['%PDF-paula'], { type: 'application/pdf' });
    const blobJulieta = new Blob(['%PDF-julieta'], { type: 'application/pdf' });
    const ref = { source: 'PRESCRIPTION_RECORD' as const, id: 15, patientId: 2 };

    let got1: Blob | undefined;
    service.getPreviewPdfBlob(ref, { mode: 'SELECTED', signatureId: 1 }, 'sha-paula').subscribe((b) => (got1 = b));
    httpMock.expectOne((r) => r.params.get('signatureId') === '1').flush(blobPaula);
    expect(got1).toEqual(blobPaula);

    // Same signature hits cache with no HTTP request.
    let got2: Blob | undefined;
    service.getPreviewPdfBlob(ref, { mode: 'SELECTED', signatureId: 1 }, 'sha-paula').subscribe((b) => (got2 = b));
    httpMock.expectNone((r) => r.url.endsWith('/pdf'));
    expect(got2).toEqual(blobPaula);

    // Switching signature immediately triggers a fresh request.
    let got3: Blob | undefined;
    service.getPreviewPdfBlob(ref, { mode: 'SELECTED', signatureId: 2 }, 'sha-julieta').subscribe((b) => (got3 = b));
    httpMock.expectOne((r) => r.params.get('signatureId') === '2').flush(blobJulieta);
    expect(got3).toEqual(blobJulieta);
  });
});
