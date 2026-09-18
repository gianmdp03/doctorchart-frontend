import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';

@Component({
  selector: 'app-patient-quick-banner',
  imports: [RouterLink],
  templateUrl: './patient-quick-banner.component.html',
  styleUrl: './patient-quick-banner.component.css',
})
export class PatientQuickBannerComponent {
  readonly activePatientService = inject(ActivePatientService);
  readonly doctorSpecialtyService = inject(DoctorSpecialtyService);
}
