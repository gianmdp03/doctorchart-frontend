import { Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { EncounterDetailDialogComponent } from '../../features/encounter-detail-dialog/encounter-detail-dialog.component';
import { UserProfileDialogComponent } from '../../features/auth/user-profile-dialog.component';
import { LoginPageComponent } from '../../features/auth/login-page.component';
import { AiAssistantWidgetComponent } from '../../features/ai-assistant/ai-assistant-widget.component';
import { AuthService } from '../../core/services/auth.service';
import { SessionCoordinatorService } from '../../core/services/session-coordinator.service';
import { FEATURE_FLAGS } from '../../core/config/feature-flags';

@Component({ selector: 'app-private-shell', imports: [RouterOutlet, HeaderComponent, SidebarComponent, EncounterDetailDialogComponent, UserProfileDialogComponent, LoginPageComponent, AiAssistantWidgetComponent], templateUrl: './private-shell.component.html', styleUrls: ['../../app.css', './material.css', '../../../styles-m3-private.css'], encapsulation: ViewEncapsulation.None })
export class PrivateShellComponent {
  readonly authService = inject(AuthService);
  readonly coordinator = inject(SessionCoordinatorService);
  readonly doctorProfileService = this.coordinator.doctorProfileService;
  readonly workspaceStore = this.coordinator.workspaceStore;
  readonly featureFlags = FEATURE_FLAGS;
  retrySetup(): void { this.coordinator.retrySetup(); }
}
