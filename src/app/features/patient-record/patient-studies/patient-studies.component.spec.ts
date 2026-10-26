import { signal } from '@angular/core';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { AuthService } from '../../../core/services/auth.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { PatientStudiesComponent } from './patient-studies.component';
import { PatientStudiesStore } from './patient-studies.store';
import { PatientMedicalStudyService } from '../../../core/services/patient-medical-study.service';
import { PatientMedicalStudy } from '../../../core/models/patient-medical-study.model';

describe('PatientStudiesComponent', () => {
  afterEach(() => vi.restoreAllMocks());
  let component: PatientStudiesComponent;
  let fixture: ComponentFixture<PatientStudiesComponent>;
  let draftStore: {
    draftFile: ReturnType<typeof signal<File | null>>;
    draftName: ReturnType<typeof signal<string>>;
    setDraftName: ReturnType<typeof vi.fn>;
    draftDescription: ReturnType<typeof signal<string>>;
    setDraftFile: ReturnType<typeof vi.fn>;
    setDraftDescription: ReturnType<typeof vi.fn>;
    clearDraft: ReturnType<typeof vi.fn>;
  };

  function fileWithSize(size: number): File {
    const file = new File(['content'], 'estudio.pdf', { type: 'application/pdf' });
    Object.defineProperty(file, 'size', { value: size });
    return file;
  }

  it('requests confirmation in the page before deleting a study', () => {
    studyServiceMock.deleteStudy.mockReturnValue(of(undefined));
    component.deleteStudy(mockStudies[0]); fixture.detectChanges();
    expect(studyServiceMock.deleteStudy).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('.inline-confirmation').textContent).toContain('radiografia_torax.pdf');
    component.confirmDeleteStudy(); fixture.detectChanges();
    expect(studyServiceMock.deleteStudy).toHaveBeenCalledWith(10, 1);
    expect(component.studies()).toEqual([]); expect(component.pendingDelete()).toBeNull();
  });

  it('discards a pending deletion on patient changes and allows cancel without a request', () => {
    component.deleteStudy(mockStudies[0]); component.pendingDelete.set(null); component.confirmDeleteStudy();
    expect(studyServiceMock.deleteStudy).not.toHaveBeenCalled();
    component.deleteStudy(mockStudies[0]); fixture.componentRef.setInput('patientId', 11);
    component.confirmDeleteStudy();
    expect(studyServiceMock.deleteStudy).not.toHaveBeenCalled(); expect(component.pendingDelete()).toBeNull();
  });

  const mockStudies: PatientMedicalStudy[] = [
    {
      id: 1,
      patientId: 10,
      originalFileName: 'radiografia_torax.pdf',
      contentType: 'application/pdf',
      fileSize: 1048576,
      description: 'Radiografía de control',
      uploadedAt: '2026-10-01T10:00:00Z',
    },
  ];

  let studyServiceMock: {
    getStudies: ReturnType<typeof vi.fn>;
    uploadStudy: ReturnType<typeof vi.fn>;
    getStudyFileBlob: ReturnType<typeof vi.fn>;
    deleteStudy: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    const draftFile = signal<File | null>(null);
    const draftDescription = signal('');
    const draftName = signal('Tomografía cerebral');
    draftStore = {
      draftFile,
      draftDescription,
      draftName,
      setDraftName: vi.fn((name: string) => draftName.set(name)),
      setDraftFile: vi.fn((file: File | null) => draftFile.set(file)),
      setDraftDescription: vi.fn((description: string) => draftDescription.set(description)),
      clearDraft: vi.fn(() => {
        draftFile.set(null);
        draftDescription.set('');
        draftName.set('');
      }),
    };
    studyServiceMock = {
      getStudies: vi.fn().mockReturnValue(of(mockStudies)),
      uploadStudy: vi.fn(),
      getStudyFileBlob: vi.fn(),
      deleteStudy: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [PatientStudiesComponent],
      providers: [
        {provide:AuthService,useValue:{currentUser:signal({id:'doctor-a'})}},
        { provide: PatientMedicalStudyService, useValue: studyServiceMock },
        { provide: PatientStudiesStore, useValue: draftStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientStudiesComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('patientId', 10);
    fixture.detectChanges();
  });

  it('should create and load patient studies', () => {
    expect(component).toBeTruthy();
    expect(studyServiceMock.getStudies).toHaveBeenCalledWith(10);
    expect(component.studies().length).toBe(1);
    expect(component.hasStudies()).toBe(true);
  });

  it('rejects files above 10,000,000 bytes and removes the previous draft file', () => {
    component.onFileChange({ target: { files: [fileWithSize(100)] } } as unknown as Event);
    component.onDescriptionChange('Descripción conservada');

    component.onFileChange({ target: { files: [fileWithSize(10_000_001)] } } as unknown as Event);

    expect(component.selectedFile()).toBeNull();
    expect(draftStore.draftFile()).toBeNull();
    expect(component.description()).toBe('Descripción conservada');
    expect(draftStore.draftDescription()).toBe('Descripción conservada');
    expect(component.errorMessage()).toContain('10 MB');
    component.submitUpload();
    expect(studyServiceMock.uploadStudy).not.toHaveBeenCalled();
  });

  it('validates an oversized restored draft reactively and blocks its upload', () => {
    component.selectedFile.set(fileWithSize(10_000_001));
    fixture.detectChanges();

    expect(component.fileError()).toContain('10 MB');
    expect(fixture.nativeElement.querySelector('button[type="submit"]').disabled).toBe(true);
    component.submitUpload();
    expect(component.errorMessage()).toContain('10 MB');
    expect(studyServiceMock.uploadStudy).not.toHaveBeenCalled();
  });

  it('uploads the exact 10,000,000-byte limit while preserving draft and pending-upload state', () => {
    const pending = new Subject<PatientMedicalStudy>();
    studyServiceMock.uploadStudy.mockReturnValue(pending);
    const file = fileWithSize(10_000_000);
    component.onFileChange({ target: { files: [file] } } as unknown as Event);
    component.onDescriptionChange('Control');
    expect(component.fileError()).toBeNull();
    expect(draftStore.draftFile()).toBe(file);

    component.submitUpload();
    fixture.detectChanges();
    expect(component.isUploading()).toBe(true);
    expect(fixture.nativeElement.querySelector('input[type="file"]').disabled).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Subiendo y procesando estudio');
    component.onFileChange({ target: { files: [fileWithSize(100)] } } as unknown as Event);
    component.submitUpload();
    expect(component.selectedFile()).toBe(file);
    expect(draftStore.draftFile()).toBe(file);
    expect(studyServiceMock.uploadStudy).toHaveBeenCalledExactlyOnceWith(10, file, 'Control', 'Tomografía cerebral');

    pending.next({ ...mockStudies[0], id: 2, fileSize: file.size, description: 'Control' });
    expect(component.isUploading()).toBe(false);
    expect(component.selectedFile()).toBeNull();
    expect(draftStore.draftFile()).toBeNull();
    expect(draftStore.draftDescription()).toBe('');
    expect(component.successMessage()).toContain('exitosamente');
    expect(component.studies()[0].id).toBe(2);
  });

  it('blocks empty or unsupported files and reacts to corrected descriptions before uploading', () => {
    component.selectedFile.set(new File([], 'vacio.pdf'));
    component.submitUpload(); expect(studyServiceMock.uploadStudy).not.toHaveBeenCalled();
    expect(component.fileError()).toContain('vacío');
    component.selectedFile.set(new File(['contenido'], 'archivo.exe'));
    expect(component.fileError()).toContain('PDF');
    component.selectedFile.set(new File(['contenido'], 'estudio.pdf'));
    component.onDescriptionChange('x'.repeat(4001)); component.submitUpload();
    expect(studyServiceMock.uploadStudy).not.toHaveBeenCalled();
    expect(component.descriptionError()).toContain('4000');
    component.onDescriptionChange('Control');
    expect(component.descriptionError()).toBeNull();
    expect(component.fileError()).toBeNull();
  });

  it('renders the canonical backend upload date in Argentine format', () => {
    expect(fixture.nativeElement.textContent).toContain('01/10/2026');
  });

  it('shows controlled backend rejection messages without echoing technical details', () => {
    const pending = new Subject<PatientMedicalStudy>();
    studyServiceMock.uploadStudy.mockReturnValue(pending);
    component.selectedFile.set(new File(['invalid'], 'estudio.pdf'));
    component.submitUpload();
    pending.error({ status: 415, error: { code: 'INVALID_STUDY_FILE', message: 'private-storage-path' } });
    expect(component.errorMessage()).toContain('PDF sin cifrar');
    expect(component.errorMessage()).not.toContain('private-storage-path');
    expect(component.isUploading()).toBe(false);
    expect(component.studies().length).toBe(1);
  });

  it('should format file size properly', () => {
    expect(component.formatFileSize(1024)).toBe('1 KB');
    expect(component.formatFileSize(1048576)).toBe('1 MB');
    expect(component.formatFileSize(0)).toBe('0 B');
  });

  it('requires a valid study name and saves its draft independently from the description', () => {
    component.selectedFile.set(fileWithSize(100));
    for (const name of ['', '   ', 'a'.repeat(241), 'TAC/cerebral', 'TAC: cerebral', 'TAC\u202e']) {
      component.onNameChange(name);
      component.submitUpload();
      expect(component.nameError()).toBeTruthy();
    }
    expect(studyServiceMock.uploadStudy).not.toHaveBeenCalled();
    component.onNameChange('Tomografía cerebral');
    component.onDescriptionChange('Con contraste\nControl anual');
    expect(component.nameError()).toBeNull();
    expect(draftStore.draftName()).toBe('Tomografía cerebral');
    expect(draftStore.draftDescription()).toBe('Con contraste\nControl anual');
    component.clearSelectedFile();
    expect(component.studyName()).toBe('');
    expect(draftStore.draftName()).toBe('');
  });

  it('shows the image beside its saved name and description and releases it on close', () => {
    const image = { ...mockStudies[0], originalFileName: 'Tomografía cerebral.webp', contentType: 'image/webp', description: 'Con contraste\nControl anual' };
    vi.spyOn(window.URL, 'createObjectURL').mockReturnValue('blob:image-preview');
    const revoke = vi.spyOn(window.URL, 'revokeObjectURL').mockImplementation(() => {});
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    studyServiceMock.getStudyFileBlob.mockReturnValue(of(new Blob(['image'], { type: 'image/webp' })));
    component.openStudyPreview(image);
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('#studyPreview');
    expect(panel.querySelector('img').getAttribute('src')).toBe('blob:image-preview');
    expect(panel.querySelector('h5').textContent).toBe('Tomografía cerebral');
    expect(panel.querySelector('.preview-description').textContent).toBe(image.description);
    expect(open).not.toHaveBeenCalled();
    const visualDirectory = process.env['STUDY_VISUAL_DIR'];
    if (visualDirectory) {
      mkdirSync(visualDirectory, { recursive: true });
      const styles = Array.from(document.querySelectorAll('style')).map(style => style.textContent).join('\n');
      const sample = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="700" height="520"><rect width="700" height="520" fill="#111b21"/><circle cx="350" cy="240" r="150" fill="#40525f"/><ellipse cx="350" cy="240" rx="110" ry="140" fill="#a6b3bb"/><text x="350" y="460" text-anchor="middle" fill="white" font-family="Arial" font-size="20">Imagen de prueba</text></svg>');
      const markup = fixture.nativeElement.outerHTML.replace('blob:image-preview', sample);
      writeFileSync(join(visualDirectory, 'study-preview.html'), `<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:24px;font-family:Arial,sans-serif;background:#f8fafc}${styles}</style>${markup}</html>`);
    }
    panel.querySelector('.preview-header button').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#studyPreview')).toBeNull();
    expect(revoke).toHaveBeenCalledWith('blob:image-preview');
  });

  it('cancels a pending preview when another image is selected or the patient changes', () => {
    const image = { ...mockStudies[0], contentType: 'image/png' };
    const first = new Subject<Blob>();
    const second = new Subject<Blob>();
    studyServiceMock.getStudyFileBlob.mockReturnValueOnce(first).mockReturnValueOnce(second);
    component.openStudyPreview(image);
    expect(component.previewLoading()).toBe(true);
    component.openStudyPreview({ ...image, id: 2 });
    expect(first.observed).toBe(false);
    expect(component.previewStudy()?.id).toBe(2);
    fixture.componentRef.setInput('patientId', 20);
    fixture.detectChanges();
    expect(second.observed).toBe(false);
    expect(component.previewStudy()).toBeNull();
  });

  it('keeps study details visible when the image request fails', () => {
    const pending = new Subject<Blob>();
    studyServiceMock.getStudyFileBlob.mockReturnValue(pending);
    component.openStudyPreview({ ...mockStudies[0], contentType: 'image/png' });
    pending.error(new Error('unavailable'));
    fixture.detectChanges();
    expect(component.previewLoading()).toBe(false);
    expect(fixture.nativeElement.querySelector('#studyPreview [role="alert"]').textContent).toContain('No se pudo cargar');
    expect(fixture.nativeElement.querySelector('.preview-description').textContent).toBe(mockStudies[0].description);
  });

  it('should identify images and pdfs correctly', () => {
    expect(component.isImage('image/png')).toBe(true);
    expect(component.isImage('application/pdf')).toBe(false);
    expect(component.isPdf('application/pdf')).toBe(true);
    expect(component.isPdf('image/jpeg')).toBe(false);
  });

  it('should handle upload of a new study', () => {
    const newFile = new File(['content'], 'eco.jpg', { type: 'image/jpeg' });
    component.selectedFile.set(newFile);
    component.description.set('Ecografía renal');

    const createdStudy: PatientMedicalStudy = {
      id: 2,
      patientId: 10,
      originalFileName: 'eco.jpg',
      contentType: 'image/jpeg',
      fileSize: 2048,
      description: 'Ecografía renal',
      uploadedAt: '2026-10-01T11:00:00Z',
    };
    studyServiceMock.uploadStudy.mockReturnValue(of(createdStudy));

    component.submitUpload();

    expect(studyServiceMock.uploadStudy).toHaveBeenCalledWith(10, newFile, 'Ecografía renal', 'Tomografía cerebral');
    expect(component.studies().length).toBe(2);
    expect(component.selectedFile()).toBeNull();
  });

  it('clears the upload draft and cancels the pending upload when patient input changes', () => {
    const pending=new Subject<PatientMedicalStudy>(); studyServiceMock.uploadStudy.mockReturnValue(pending);
    component.selectedFile.set(new File(['old'],'old.pdf')); component.description.set('Descripción A'); component.submitUpload();
    fixture.componentRef.setInput('patientId',20); fixture.detectChanges();
    expect(pending.observed).toBe(false); expect(component.selectedFile()).toBeNull(); expect(component.description()).toBe('');
    pending.next({...mockStudies[0],id:99}); expect(component.isUploading()).toBe(false); expect(component.successMessage()).toBeNull();
  });
  it('rejects a late upload success after account changes before the context effect runs', () => {
    const pending=new Subject<PatientMedicalStudy>(); studyServiceMock.uploadStudy.mockReturnValue(pending);
    component.selectedFile.set(new File(['old'],'old.pdf')); component.submitUpload();
    TestBed.inject(AuthService).currentUser.set({id:'doctor-b'} as any); pending.next({...mockStudies[0],id:99});
    expect(component.studies().some(study=>study.id===99)).toBe(false); fixture.detectChanges();
    expect(pending.observed).toBe(false); expect(component.selectedFile()).toBeNull();
  });
  it('keeps the latest refresh and cancels outstanding reads on destruction', () => {
    const first=new Subject<PatientMedicalStudy[]>(), second=new Subject<PatientMedicalStudy[]>();
    studyServiceMock.getStudies.mockReturnValueOnce(first).mockReturnValueOnce(second);
    component.loadStudies(10); component.loadStudies(10);
    second.next([{...mockStudies[0],id:2}]); first.next([{...mockStudies[0],id:1}]);
    expect(component.studies()[0].id).toBe(2); fixture.destroy();
    expect(first.observed).toBe(false); expect(second.observed).toBe(false);
  });
  it('cannot download, preview or delete a study belonging to the previously selected patient', () => {
    fixture.componentRef.setInput('patientId',20);
    component.downloadStudy(mockStudies[0]); component.openStudyPreview(mockStudies[0]); component.deleteStudy(mockStudies[0]);
    expect(studyServiceMock.getStudyFileBlob).not.toHaveBeenCalled(); expect(studyServiceMock.deleteStudy).not.toHaveBeenCalled();
  });
  it('releases preview URLs when the patient changes or the screen is destroyed', () => {
    const create=vi.spyOn(window.URL,'createObjectURL').mockReturnValue('blob:test');
    const revoke=vi.spyOn(window.URL,'revokeObjectURL').mockImplementation(()=>{});
    const open=vi.spyOn(window,'open').mockImplementation(()=>null);
    studyServiceMock.getStudyFileBlob.mockReturnValue(of(new Blob(['pdf'])));
    component.openStudyPreview(mockStudies[0]); expect(create).toHaveBeenCalledTimes(1);
    expect(open).toHaveBeenCalledWith('blob:test', '_blank', 'noopener,noreferrer');
    fixture.componentRef.setInput('patientId',20); fixture.detectChanges(); expect(revoke).toHaveBeenCalledWith('blob:test');
    fixture.destroy();
  });

  it('restores draft file and description from PatientStudiesStore across recreations', async () => {
    const testFile = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    const draftStore = {
      draftFile: signal<File | null>(testFile),
      draftName: signal('Nombre en borrador'),
      setDraftName: vi.fn(),
      draftDescription: signal('Descripción en borrador'),
      setDraftFile: vi.fn(),
      setDraftDescription: vi.fn(),
      clearDraft: vi.fn(),
    };

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [PatientStudiesComponent],
      providers: [
        { provide: AuthService, useValue: { currentUser: signal({ id: 'doctor-a' }) } },
        { provide: PatientMedicalStudyService, useValue: studyServiceMock },
        { provide: PatientStudiesStore, useValue: draftStore },
      ],
    }).compileComponents();

    const draftFixture = TestBed.createComponent(PatientStudiesComponent);
    draftFixture.componentRef.setInput('patientId', 10);
    draftFixture.detectChanges();

    expect(draftFixture.componentInstance.selectedFile()).toBe(testFile);
    expect(draftFixture.componentInstance.description()).toBe('Descripción en borrador');
    expect(draftFixture.componentInstance.studyName()).toBe('Nombre en borrador');

    draftFixture.componentInstance.onDescriptionChange('Nueva descripción');
    expect(draftStore.setDraftDescription).toHaveBeenCalledWith('Nueva descripción');

    draftFixture.componentInstance.clearSelectedFile();
    expect(draftStore.clearDraft).toHaveBeenCalled();
  });
});
