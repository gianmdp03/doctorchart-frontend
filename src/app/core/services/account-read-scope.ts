import { DestroyRef, effect, inject, untracked } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

/** Cancels superseded reads and rejects replies from another account, even before effects run. */
export class AccountReadScope {
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private owner = this.auth.currentUser()?.id ?? null;
  private generation = 0;
  readonly canceled = new Subject<void>();

  constructor(onAccountChange: () => void) {
    effect(() => {
      const owner = this.auth.currentUser()?.id ?? null;
      untracked(() => {
        if (owner === this.owner) return;
        this.owner = owner;
        this.cancel();
        onAccountChange();
      });
    });
    this.destroyRef.onDestroy(() => {
      this.cancel();
      this.canceled.complete();
    });
  }

  authenticated() {
    return !!this.auth.currentUser()?.id;
  }
  cancel() {
    this.generation++;
    this.canceled.next();
  }
  begin(): () => boolean {
    this.cancel();
    const generation = this.generation,
      owner = this.auth.currentUser()?.id;
    return () =>
      !this.destroyRef.destroyed &&
      generation === this.generation &&
      owner === this.auth.currentUser()?.id;
  }
}
