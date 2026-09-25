import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideLayoutDashboard,
  lucideUsers,
  lucideStethoscope,
  lucideChevronLeft,
  lucideChevronRight,
  lucideShield,
  lucideSliders,
  lucideCalculator,
} from '@ng-icons/lucide';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { DoctorProfileService } from '../../core/services/doctor-profile.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgIcon],
  providers: [
    provideIcons({
      lucideLayoutDashboard,
      lucideUsers,
      lucideStethoscope,
      lucideChevronLeft,
      lucideChevronRight,
      lucideShield,
      lucideSliders,
      lucideCalculator,
    }),
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  readonly specialtyService = inject(DoctorSpecialtyService);
  readonly profileService = inject(DoctorProfileService);
  readonly authService = inject(AuthService);

  readonly isCollapsed = signal<boolean>(false);

  readonly clinicianInitials = computed(() => {
    const name = this.authService.userName();
    if (!name) return 'DC';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  });

  toggleCollapse(): void {
    this.isCollapsed.update((val) => !val);
  }
}
