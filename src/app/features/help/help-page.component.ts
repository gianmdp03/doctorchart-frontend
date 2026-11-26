import { afterRenderEffect, Component, computed, ElementRef, inject, signal, viewChildren } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideArrowRight, lucideBookOpen, lucideCalendarClock, lucideCircleHelp, lucideContact, lucideInfo, lucideMaximize2, lucideStethoscope } from '@ng-icons/lucide';
import { HELP_GUIDES, type HelpStep } from './help-guides';

@Component({
  selector: 'app-help-page',
  imports: [NgIconComponent, RouterLink],
  providers: [provideIcons({
    lucideArrowLeft, lucideArrowRight, lucideBookOpen, lucideCalendarClock,
    lucideCircleHelp, lucideContact, lucideInfo, lucideMaximize2, lucideStethoscope,
  })],
  templateUrl: './help-page.component.html',
  styleUrl: './help-page.component.css',
})
export class HelpPageComponent {
  readonly guides = HELP_GUIDES;
  private readonly route = inject(ActivatedRoute);
  private readonly data = toSignal(this.route.data, { requireSync: true });
  private readonly fragment = toSignal(this.route.fragment, { requireSync: true });
  private readonly headings = viewChildren<ElementRef<HTMLElement>>('stepHeading');
  private clickedStep: string | null = null;

  readonly activeStep = signal<string | null>(null);
  readonly expandedCapture = signal<HelpStep['figure']>(undefined);
  readonly guide = computed(() => this.guides.find(guide => guide.id === this.data()['helpGuide']));
  readonly otherGuides = computed(() => this.guides.filter(guide => guide !== this.guide()));

  constructor() {
    afterRenderEffect(() => {
      const id = this.fragment();
      const animate = id === this.clickedStep;
      this.clickedStep = null;
      if (id) this.scrollToStep(id, animate);
    });

    afterRenderEffect(onCleanup => {
      const headings = this.headings().map(heading => heading.nativeElement);
      if (!headings.length) return;

      let frame: number | null = null;
      const update = () => {
        frame = null;
        const readingLine = Math.max(112, window.innerHeight * 0.3);
        const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
        let active = headings[0];
        for (const heading of headings) {
          if (!atBottom && heading.getBoundingClientRect().top > readingLine) break;
          active = heading;
        }
        this.activeStep.set(active.id);
      };
      const scheduleUpdate = () => {
        frame ??= window.requestAnimationFrame(update);
      };

      window.addEventListener('scroll', scheduleUpdate, { passive: true });
      window.addEventListener('resize', scheduleUpdate);
      scheduleUpdate();
      onCleanup(() => {
        window.removeEventListener('scroll', scheduleUpdate);
        window.removeEventListener('resize', scheduleUpdate);
        if (frame !== null) window.cancelAnimationFrame(frame);
      });
    });
  }

  onStepClick(event: MouseEvent, id: string): void {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

    if (this.fragment() === id) {
      this.scrollToStep(id, true);
    } else {
      this.clickedStep = id;
    }
  }

  private scrollToStep(id: string, animate: boolean): void {
    const heading = this.headings().find(item => item.nativeElement.id === id)?.nativeElement;
    if (!heading) return;
    const smooth = animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    heading.focus({ preventScroll: true });
    heading.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant', block: 'start' });
  }
}
