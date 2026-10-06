import { signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { PatientStudiesComponent } from './patient-studies.component';
import { PatientMedicalStudyService } from '../../../core/services/patient-medical-study.service';
import { PatientMedicalStudy } from '../../../core/models/patient-medical-study.model';

describe('PatientStudiesComponent', () => {
  let component: PatientStudiesComponent;
  let fixture: ComponentFixture<PatientStudiesComponent>;

  const mockStudies: PatientMedicalStudy[] = [
    {
      id: 1,
      patientId: 10,
      fileName: 'study_1.pdf',
      originalFileName: 'radiografia_torax.pdf',
      contentType: 'application/pdf',
      fileSize: 1048576,
      description: 'Radiografía de control',
      createdAt: '2026-10-01T10:00:00Z',
    },
  ];

  let studyServiceMock: {
    getStudies: ReturnType<typeof vi.fn>;
    uploadStudy: ReturnType<typeof vi.fn>;
    getStudyFileBlob: ReturnType<typeof vi.fn>;
    deleteStudy: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
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

  it('should format file size properly', () => {
    expect(component.formatFileSize(1024)).toBe('1 KB');
    expect(component.formatFileSize(1048576)).toBe('1 MB');
    expect(component.formatFileSize(0)).toBe('0 B');
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
      fileName: 'eco_renal.jpg',
      originalFileName: 'eco.jpg',
      contentType: 'image/jpeg',
      fileSize: 2048,
      description: 'Ecografía renal',
      createdAt: '2026-10-01T11:00:00Z',
    };
    studyServiceMock.uploadStudy.mockReturnValue(of(createdStudy));

    component.submitUpload();

    expect(studyServiceMock.uploadStudy).toHaveBeenCalledWith(10, newFile, 'Ecografía renal');
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
    vi.spyOn(window,'open').mockImplementation(()=>null);
    studyServiceMock.getStudyFileBlob.mockReturnValue(of(new Blob(['pdf'])));
    component.openStudyPreview(mockStudies[0]); expect(create).toHaveBeenCalledTimes(1);
    fixture.componentRef.setInput('patientId',20); fixture.detectChanges(); expect(revoke).toHaveBeenCalledWith('blob:test');
    fixture.destroy();
  });

});
