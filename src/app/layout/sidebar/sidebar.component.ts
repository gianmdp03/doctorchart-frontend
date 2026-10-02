import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCalendarDays,
  lucideLayoutDashboard,
  lucideUsers,
  lucideChevronLeft,
  lucideChevronRight,
  lucideSliders,
  lucideCalculator,
} from '@ng-icons/lucide';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgIcon],
  providers: [
    provideIcons({
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

  readonly isCollapsed = signal<boolean>(false);

  toggleCollapse(): void {
    this.isCollapsed.update((val) => !val);
  }
}
