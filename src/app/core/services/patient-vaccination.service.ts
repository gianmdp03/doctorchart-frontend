import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  PatientVaccinationSchedule,
  SavedPatientVaccination,
  VaccinationUpdateRequest,
} from '../models/vaccination.model';
@Injectable({ providedIn: 'root' })
export class PatientVaccinationService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl + '/patients';
  schedule(patientId: number) {
    return this.http.get<PatientVaccinationSchedule>(this.base + '/' + patientId + '/vaccinations');
  }
  save(patientId: number, doseId: string, request: VaccinationUpdateRequest) {
    return this.http.put<SavedPatientVaccination>(
      this.base + '/' + patientId + '/vaccinations/' + encodeURIComponent(doseId),
      request,
    );
  }
}
