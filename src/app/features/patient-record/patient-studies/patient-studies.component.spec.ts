import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
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
});
