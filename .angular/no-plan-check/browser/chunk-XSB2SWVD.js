import {
  AuthService
} from "./chunk-5XEBCQUW.js";
import {
  DestroyRef,
  Subject,
  effect,
  inject,
  untracked
} from "./chunk-3HO5VEWU.js";

// src/app/core/services/account-read-scope.ts
var AccountReadScope = class {
  auth = inject(AuthService);
  destroyRef = inject(DestroyRef);
  owner = this.auth.currentUser()?.id ?? null;
  generation = 0;
  canceled = new Subject();
  constructor(onAccountChange) {
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
  begin() {
    this.cancel();
    const generation = this.generation, owner = this.auth.currentUser()?.id;
    return () => !this.destroyRef.destroyed && generation === this.generation && owner === this.auth.currentUser()?.id;
  }
};

export {
  AccountReadScope
};
//# debugId=20959cc5-f872-59ec-af40-750b9aad5ad5
//# sourceMappingURL=chunk-XSB2SWVD.js.map
