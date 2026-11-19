import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-public-booking-shell',
  imports: [RouterLink, ThemeToggleComponent],
  templateUrl: './public-booking-shell.component.html',
  styleUrl: './public-booking-shell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicBookingShellComponent {
  readonly showMyBookings = input(false);
  readonly inMyBookings = input(false);
}
