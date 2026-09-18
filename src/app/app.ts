import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { PatientQuickBannerComponent } from './layout/patient-quick-banner/patient-quick-banner.component';
import { MainNavComponent } from './layout/main-nav/main-nav.component';
import { ActivePatientService } from './core/services/active-patient.service';
import { AuthService } from './core/services/auth.service';
import { DoctorProfileService } from './core/services/doctor-profile.service';
import { NewPatientDialogComponent } from './features/patient-dialog/new-patient-dialog.component';
import { NewCheckupDialogComponent } from './features/checkup-dialog/new-checkup-dialog.component';
import { NewEncounterDialogComponent } from './features/encounter-dialog/new-encounter-dialog.component';
import { EncounterDetailDialogComponent } from './features/encounter-detail-dialog/encounter-detail-dialog.component';
import { LoginPageComponent } from './features/auth/login-page.component';
import { UserProfileDialogComponent } from './features/auth/user-profile-dialog.component';
import { AiAssistantWidgetComponent } from './features/ai-assistant/ai-assistant-widget.component';
import { SpecialtySelectionComponent } from './features/onboarding/specialty-selection/specialty-selection.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    PatientQuickBannerComponent,
    MainNavComponent,
    NewPatientDialogComponent,
    NewCheckupDialogComponent,
    NewEncounterDialogComponent,
    EncounterDetailDialogComponent,
    LoginPageComponent,
    UserProfileDialogComponent,
    AiAssistantWidgetComponent,
    SpecialtySelectionComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly authService = inject(AuthService);
  readonly doctorProfileService = inject(DoctorProfileService);

  constructor() {
    effect(() => {
      if (this.authService.isLoggedIn()) {
        this.doctorProfileService.loadProfile();
      }
    });
  }
}
