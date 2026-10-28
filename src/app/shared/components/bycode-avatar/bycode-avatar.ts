import { Component, ChangeDetectionStrategy, effect, inject, signal } from '@angular/core';
import { BycodeAccountService } from '../../../core/services/bycode-account.service';
@Component({
  selector: 'app-bycode-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="bycode-avatar">
    @if (account.image() && !failed()) {
      <img [src]="account.image()" alt="" (error)="failed.set(true)" />
    } @else {
      <span>{{ account.initials() }}</span>
    }
  </span>`,
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
      width: var(--avatar-size, 38px);
      height: var(--avatar-size, 38px);
    }
    .bycode-avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      display: grid;
      place-items: center;
      background: var(--accent, #e5efff);
      color: var(--primary, #2358a3);
      font-weight: 650;
      font-size: 14px;
      border: 1px solid var(--border, #d7dce4);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
})
export class BycodeAvatarComponent {
  readonly account = inject(BycodeAccountService);
  readonly failed = signal(false);
  constructor() {
    effect(() => {
      this.account.image();
      this.failed.set(false);
    });
  }
}
