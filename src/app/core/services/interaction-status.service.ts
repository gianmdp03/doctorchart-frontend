import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InteractionStatusService {
  private readonly requests = signal(0);
  readonly busy = computed(() => this.requests() > 0);
  readonly error = signal('');
  begin(): () => void {
    this.requests.update(value => value + 1);
    let finished = false;
    return () => {
      if (finished) return;
      finished = true;
      this.requests.update(value => Math.max(0, value - 1));
    };
  }
  async wait<T>(request: PromiseLike<T>, milliseconds = 15000): Promise<T> {
    const end = this.begin();
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      return await Promise.race([request, new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
          const message = 'La conexión demoró demasiado. No pudimos confirmar la operación. Revisá el estado antes de repetirla.';
          this.error.set(message);
          reject(new Error(message));
        }, milliseconds);
      })]);
    } finally { clearTimeout(timer); end(); }
  }
}
