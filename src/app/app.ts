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
import { PrescriptionPrintLayoutComponent } from './features/prescription-print-layout/prescription-print-layout.component';
import { WorkspaceStore } from './core/services/workspace.store';

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
    PrescriptionPrintLayoutComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly authService = inject(AuthService);
  readonly doctorProfileService = inject(DoctorProfileService);
  readonly workspaceStore = inject(WorkspaceStore);

  constructor() {
    effect(() => {
      if (this.authService.isLoggedIn()) {
        this.doctorProfileService.loadProfile();
        this.workspaceStore.loadSetup();
      } else {
        this.doctorProfileService.clearProfile();
        this.workspaceStore.clearSetup();
      }
    });
  }
}
