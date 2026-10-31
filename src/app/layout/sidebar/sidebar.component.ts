import { WorkspaceStore } from '../../core/services/workspace.store';
import { afterNextRender, Component, computed, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
} from '@ng-icons/lucide';
import { FEATURE_FLAGS } from '../../core/config/feature-flags';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgIcon],
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
    }),
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  readonly specialtyService = inject(DoctorSpecialtyService);
  readonly authService = inject(AuthService);
  readonly workspace = inject(WorkspaceStore);

  readonly calendarEnabled = computed(()=>FEATURE_FLAGS.CALENDAR_ENABLED&&FEATURE_FLAGS.SCHEDULES_ENABLED&&this.clinicsEnabled());
  readonly clinicsEnabled = computed(
    () => this.workspace.clinicsEnabled?.() ?? FEATURE_FLAGS.CLINICS_ENABLED,
  );

  readonly isCollapsed = signal<boolean>(false);
  private narrowViewport = false;
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
