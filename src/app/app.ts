import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AuthService } from './core/services/auth.service';
import { DoctorProfileService } from './core/services/doctor-profile.service';
import { EncounterDetailDialogComponent } from './features/encounter-detail-dialog/encounter-detail-dialog.component';
import { LoginPageComponent } from './features/auth/login-page.component';
import { UserProfileDialogComponent } from './features/auth/user-profile-dialog.component';
import { AiAssistantWidgetComponent } from './features/ai-assistant/ai-assistant-widget.component';
import { SpecialtySelectionComponent } from './features/onboarding/specialty-selection/specialty-selection.component';
import { PrescriptionPrintLayoutComponent } from './features/prescription-print-layout/prescription-print-layout.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    EncounterDetailDialogComponent,
    LoginPageComponent,
    UserProfileDialogComponent,
    AiAssistantWidgetComponent,
    SpecialtySelectionComponent,
    PrescriptionPrintLayoutComponent,
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
