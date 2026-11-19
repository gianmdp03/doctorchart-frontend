import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <button type="button" class="scroll-to-top" [style.top.px]="top()"
        aria-label="Volver al inicio de la página" title="Volver al inicio"
        (click)="scrollToTop()">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" aria-hidden="true">
          <path d="m5 12 7-7 7 7M12 5v14" />
        </svg>
      </button>
    }
  `,
  styleUrl: './scroll-to-top.component.css',
})
export class ScrollToTopComponent {
  readonly visible = signal(false);
  readonly top = signal(80);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const update = () => {
        this.visible.set(window.scrollY > 240);
        const header = document.querySelector('app-header header, app-navbar header');
        this.top.set(Math.max(16, (header?.getBoundingClientRect().bottom ?? 64) + 16));
      };
      update();
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', update);
        window.removeEventListener('resize', update);
      });
    });
  }

  scrollToTop(): void {
    const main = document.querySelector<HTMLElement>('main');
    const heading = main?.querySelector<HTMLElement>('h1') ?? main;
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }
}
