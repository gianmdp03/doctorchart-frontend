import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideCalendar, lucideCheckCircle2, lucideClock } from '@ng-icons/lucide';
import { displayLocalDate } from '../../core/date/display-date';
import { UpcomingFollowUp } from '../../core/models/clinical-encounter.model';

export interface FollowUpDay {
  label: string;
  date: string;
  items: (UpcomingFollowUp & { initials: string })[];
}

@Component({
  selector: 'app-upcoming-follow-ups',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ lucideArrowRight, lucideCalendar, lucideCheckCircle2, lucideClock })],
  templateUrl: './upcoming-follow-ups.component.html',
  styleUrl: './upcoming-follow-ups.component.css',
})
export class UpcomingFollowUpsComponent {
  readonly groups = input.required<FollowUpDay[]>();
  readonly isLoading = input(false);
  readonly available = input(false);
  readonly retry = output<void>();
  readonly displayDate = displayLocalDate;
}
