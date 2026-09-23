import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { SpecialtySelectionComponent } from './specialty-selection.component';
import { SpecialtyService } from '../../../core/services/specialty.service';
import { DoctorProfileService } from '../../../core/services/doctor-profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { SpecialtySummary } from '../../../core/models/specialty.model';

describe('SpecialtySelectionComponent', () => {
  let component: SpecialtySelectionComponent;
  let fixture: ComponentFixture<SpecialtySelectionComponent>;
  let specialtyServiceMock: {
    getSpecialties: ReturnType<typeof vi.fn>;
  };
  let doctorProfileServiceMock: {
    hasSpecialty: ReturnType<typeof signal<boolean>>;
    assignSpecialty: ReturnType<typeof vi.fn>;
    clearProfile: ReturnType<typeof vi.fn>;
  };
  let authServiceMock: {
    signOut: ReturnType<typeof vi.fn>;
  };
  let router: Router;

  const mockSpecialties: SpecialtySummary[] = [
    { specialty: 'PEDIATRICS', displayName: 'Pediatría y Neonatología', description: 'Atención pediátrica' },
    { specialty: 'CARDIOLOGY', displayName: 'Cardiología', description: 'Salud cardiovascular' },
  ];

  beforeEach(async () => {
    specialtyServiceMock = {
      getSpecialties: vi.fn().mockReturnValue(of(mockSpecialties)),
    };
    doctorProfileServiceMock = {
      hasSpecialty: signal<boolean>(false),
      assignSpecialty: vi.fn(),
      clearProfile: vi.fn(),
    };
    authServiceMock = {
      signOut: vi.fn().mockResolvedValue({ error: null }),
    };

    await TestBed.configureTestingModule({
      imports: [SpecialtySelectionComponent],
      providers: [
        { provide: SpecialtyService, useValue: specialtyServiceMock },
        { provide: DoctorProfileService, useValue: doctorProfileServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture = TestBed.createComponent(SpecialtySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load specialties list', () => {
    expect(component).toBeTruthy();
    expect(component.specialties().length).toBe(2);
    expect(component.isLoading()).toBe(false);
  });

  it('should select a specialty on card click', () => {
    component.select('CARDIOLOGY');
    expect(component.selectedSpecialty()).toBe('CARDIOLOGY');
  });

  it('should assign specialty and navigate to /pacientes on confirm', async () => {
    component.select('CARDIOLOGY');
    doctorProfileServiceMock.assignSpecialty.mockResolvedValue({
      id: 1,
      userId: 'doc-1',
      specialty: 'CARDIOLOGY',
      isSpecialtyLocked: true,
      createdAt: '2026-09-18T12:00:00Z',
    });

    await component.confirmSpecialty();

    expect(doctorProfileServiceMock.assignSpecialty).toHaveBeenCalledWith('CARDIOLOGY');
    expect(router.navigate).toHaveBeenCalledWith(['/pacientes']);
  });

  it('should handle conflict (409) error if specialty was already chosen', async () => {
    component.select('PEDIATRICS');
    doctorProfileServiceMock.assignSpecialty.mockRejectedValue({ status: 409 });

    await component.confirmSpecialty();

    expect(component.errorMessage()).toContain('inmutable');
  });
});
