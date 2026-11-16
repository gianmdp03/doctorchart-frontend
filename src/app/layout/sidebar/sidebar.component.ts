import { WorkspaceStore } from '../../core/services/workspace.store';
import { afterNextRender, Component, computed, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ClinicalNavigationService } from '../../core/services/clinical-navigation.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBuilding2,
  lucideCalendarDays,
  lucideLayoutDashboard,
  lucideUsers,
  lucideChevronLeft,
  lucideChevronRight,
  lucideSliders,
  lucideCalculator,
  lucideStethoscope,
  lucideContact,
  lucideGlobe,
  lucideCalendarClock,
} from '@ng-icons/lucide';
import { FEATURE_FLAGS } from '../../core/config/feature-flags';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgIcon, MatSelectModule],
  providers: [
    provideIcons({
      lucideBuilding2,
      lucideCalendarDays,
      lucideLayoutDashboard,
      lucideUsers,
      lucideChevronLeft,
      lucideChevronRight,
      lucideSliders,
      lucideCalculator,
      lucideStethoscope,
      lucideContact,
      lucideGlobe,
      lucideCalendarClock,
    }),
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  readonly specialtyService = inject(DoctorSpecialtyService);
  readonly authService = inject(AuthService);
  readonly workspace = inject(WorkspaceStore);
  private readonly router = inject(Router);
  private readonly clinicalNavigation = inject(ClinicalNavigationService);

  async changeSpecialty({ source, value: id }: MatSelectChange): Promise<void> {
    const previous = this.workspace.specialtyContextId();
    const context = this.workspace.contexts().find(c => c.id === id);
    source.value = previous;
    if (!context || id === previous) return;
    const tree = this.router.parseUrl(this.router.url);
    const clinical = /^\/(dashboard|patients|records|encounters|assistant|calculators|vaccination-calendar|onboarding)(\/|$)/.test(this.router.url.split(/[?#]/)[0]);
    const target = !context.ready ? this.router.createUrlTree(['/onboarding/setup']) : clinical ? this.router.createUrlTree(['/dashboard']) : tree;
    target.queryParams = { ...target.queryParams, specialtyContextId: id };
    if (!clinical && !await this.clinicalNavigation.canLeaveEditing()) return;
    await this.router.navigateByUrl(target);
  }

  readonly staffEnabled=FEATURE_FLAGS.STAFF_ENABLED;
 readonly publicAppointmentsEnabled=FEATURE_FLAGS.PUBLIC_APPOINTMENTS_ENABLED;
 readonly calendarEnabled = computed(()=>FEATURE_FLAGS.CALENDAR_ENABLED&&FEATURE_FLAGS.SCHEDULES_ENABLED&&this.clinicsEnabled());
  readonly clinicsEnabled = computed(
    () => this.workspace.clinicsEnabled?.() ?? FEATURE_FLAGS.CLINICS_ENABLED,
  );

  readonly isCollapsed = signal<boolean>(false);
  narrowViewport = false;
  private desktopCollapsed = false;

  constructor() {
    afterNextRender(() => this.syncViewport());
  }

  @HostListener('window:resize')
  syncViewport(): void {
    const narrow = window.innerWidth <= 768;
    if (narrow === this.narrowViewport) return;
    if (narrow) {
      this.desktopCollapsed = this.isCollapsed();
      this.isCollapsed.set(true);
    } else this.isCollapsed.set(this.desktopCollapsed);
    this.narrowViewport = narrow;
  }

  collapseAfterNavigation(): void {
    if (this.narrowViewport) this.isCollapsed.set(true);
  }

  toggleCollapse(): void {
    this.isCollapsed.update((val) => !val);
  }
}
