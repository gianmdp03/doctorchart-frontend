import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';

@Component({
  selector: 'app-main-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css',
})
export class MainNavComponent {
  private readonly specialtyService = inject(DoctorSpecialtyService);

  readonly isPediatrics = computed(() => this.specialtyService.activeSpecialty() === 'PEDIATRICS');
  readonly isCardiology = computed(() => this.specialtyService.activeSpecialty() === 'CARDIOLOGY');
}
