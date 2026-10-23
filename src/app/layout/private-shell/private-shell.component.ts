import { NoPlanComponent } from '../../features/auth/no-plan.component';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ClinicalDocumentPrintService } from '../../core/services/clinical-document-print.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoginPageComponent } from '../../features/auth/login-page.component';
import { AuthService } from '../../core/services/auth.service';
import { SessionCoordinatorService } from '../../core/services/session-coordinator.service';
import { FEATURE_FLAGS } from '../../core/config/feature-flags';

@Component({ selector: 'app-private-shell', imports: [NoPlanComponent, RouterOutlet, RouterLink, HeaderComponent, SidebarComponent, LoginPageComponent], templateUrl: './private-shell.component.html', styleUrls: ['../../app.css', './material.css', '../../../styles-m3-private.css'], encapsulation: ViewEncapsulation.None })
export class PrivateShellComponent {
  readonly documents = inject(ClinicalDocumentPrintService);
  readonly authService = inject(AuthService);
  readonly coordinator = inject(SessionCoordinatorService);
  readonly doctorProfileService = this.coordinator.doctorProfileService;
  readonly workspaceStore = this.coordinator.workspaceStore;
  readonly featureFlags = FEATURE_FLAGS;
  retrySetup(): void { this.coordinator.retrySetup(); }
}
