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
  styles: `
    .scroll-to-top {
      position: fixed;
      right: max(1rem, env(safe-area-inset-right));
      z-index: 40;
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      padding: 0;
      border: 1px solid var(--dc-outline, #e2e8f0);
      border-radius: 16px;
      background: var(--dc-surface, #fff);
      color: var(--md-sys-color-primary, #006874);
      box-shadow: 0 4px 14px rgb(0 0 0 / 12%);
      cursor: pointer;
      transition: transform 150ms ease, box-shadow 150ms ease;
    }
    .scroll-to-top:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgb(0 0 0 / 18%);
    }
    .scroll-to-top:focus-visible {
      outline: 2px solid var(--md-sys-color-primary, #006874);
      outline-offset: 3px;
    }
    @media (min-width: 640px) {
      .scroll-to-top { right: max(2rem, env(safe-area-inset-right)); }
    }
    @media (prefers-reduced-motion: reduce) {
      .scroll-to-top { transition: none; }
      .scroll-to-top:hover { transform: none; }
    }
    @media print { .scroll-to-top { display: none; } }
  `,
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
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }
}
