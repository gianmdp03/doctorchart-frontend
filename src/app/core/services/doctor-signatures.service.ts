import { HttpClient } from '@angular/common/http';
import { computed, DestroyRef, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreateDoctorSignatureRequest,
  DoctorSignature,
  SignatureChoice,
  UpdateDoctorSignatureRequest,
} from '../models/doctor-signature.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class DoctorSignaturesService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  readonly signatures = signal<DoctorSignature[]>([]);
  readonly loading = signal(false);
  readonly loaded = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedChoice = signal<SignatureChoice>({ mode: 'DEFAULT' });
  readonly thumbnailUrls = signal<Record<string, string>>({});
  readonly failedThumbnails = signal<Record<string, boolean>>({});

  readonly favoriteSignature = computed<DoctorSignature | null>(
    () => this.signatures().find((item) => item.isFavorite) ?? null,
  );

  readonly effectiveSignature = computed<DoctorSignature | null>(() => {
    const choice = this.selectedChoice();
    const list = this.signatures();
    if (choice.mode === 'NONE') return null;
    if (choice.mode === 'SELECTED') {
      return list.find((item) => item.id === choice.signatureId) ?? this.favoriteSignature();
    }
    return this.favoriteSignature();
  });

  private owner = this.currentOwner();
  private inFlightThumbnails = new Set<string>();
  private loadPromise: Promise<DoctorSignature[]> | null = null;

  constructor() {
    effect(() => {
      const owner = this.currentOwner();
      untracked(() => {
        if (owner !== this.owner) {
          this.owner = owner;
          this.resetState();
        }
      });
    });
    this.destroyRef.onDestroy(() => this.revokeAllThumbnails());
  }

  private currentOwner(): string | null {
    return this.auth.currentUser()?.id ?? null;
  }

  private revokeAllThumbnails(): void {
    const map = this.thumbnailUrls();
    for (const url of Object.values(map)) {
      try {
        URL.revokeObjectURL(url);
      } catch {}
    }
    this.thumbnailUrls.set({});
    this.failedThumbnails.set({});
    this.inFlightThumbnails.clear();
  }

  private resetState(): void {
    this.loadPromise = null;
    this.signatures.set([]);
    this.loading.set(false);
    this.loaded.set(false);
    this.error.set(null);
    this.selectedChoice.set({ mode: 'DEFAULT' });
    this.revokeAllThumbnails();
  }

  private syncSelectionWithList(list: DoctorSignature[]): void {
    const choice = this.selectedChoice();
    if (choice.mode === 'SELECTED' && !list.some((item) => item.id === choice.signatureId)) {
      this.selectedChoice.set({ mode: 'DEFAULT' });
    }
  }

  async load(force = false): Promise<DoctorSignature[]> {
    const owner = this.currentOwner();
    if (!owner) {
      this.resetState();
      return [];
    }
    if (this.loaded() && !force) {
      return this.signatures();
    }
    if (this.loadPromise && !force) {
      return this.loadPromise;
    }

    this.loading.set(true);
    this.error.set(null);
    const requestOwner = owner;
    const promise = firstValueFrom(
      this.http.get<{ items: DoctorSignature[] }>(`${environment.apiUrl}/workspace/signatures`),
    )
      .then((res) => {
        if (requestOwner !== this.currentOwner()) return [];
        const items = res.items ?? [];
        this.signatures.set(items);
        this.syncSelectionWithList(items);
        this.loaded.set(true);
        return items;
      })
      .catch((err) => {
        if (requestOwner === this.currentOwner()) {
          this.error.set(err?.error?.message || 'No pudimos cargar tus firmas.');
        }
        return this.signatures();
      })
      .finally(() => {
        if (this.loadPromise === promise) {
          this.loadPromise = null;
        }
        if (requestOwner === this.currentOwner()) {
          this.loading.set(false);
        }
      });

    this.loadPromise = promise;
    return promise;
  }

  async create(payload: CreateDoctorSignatureRequest): Promise<DoctorSignature> {
    const created = await firstValueFrom(
      this.http.post<DoctorSignature>(`${environment.apiUrl}/workspace/signatures`, payload),
    );
    await this.load(true);
    return created;
  }

  async update(id: number, payload: UpdateDoctorSignatureRequest): Promise<DoctorSignature> {
    const updated = await firstValueFrom(
      this.http.patch<DoctorSignature>(`${environment.apiUrl}/workspace/signatures/${id}`, payload),
    );
    await this.load(true);
    return updated;
  }

  async setFavorite(id: number): Promise<DoctorSignature> {
    return this.update(id, { isFavorite: true });
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`${environment.apiUrl}/workspace/signatures/${id}`));
    await this.load(true);
  }

  setChoice(choice: SignatureChoice): void {
    this.selectedChoice.set(choice);
  }

  thumbnailFailed(sig: DoctorSignature): boolean {
    return !!this.failedThumbnails()[`${sig.id}:${sig.sha256}`];
  }

  thumbnailUrl(sig: DoctorSignature): string | null {
    const cacheKey = `${sig.id}:${sig.sha256}`;
    const existing = this.thumbnailUrls()[cacheKey];
    if (existing) return existing;
    if (
      typeof window === 'undefined' ||
      this.inFlightThumbnails.has(cacheKey) ||
      this.failedThumbnails()[cacheKey]
    ) {
      return null;
    }

    const requestOwner = this.currentOwner();
    this.inFlightThumbnails.add(cacheKey);
    // Defer the HTTP subscription out of Angular's template/reactive evaluation context
    // so interceptors that update signals (e.g. InteractionStatusService) do not trigger NG0600.
    setTimeout(() => {
      if (requestOwner !== this.currentOwner() || this.thumbnailUrls()[cacheKey]) {
        this.inFlightThumbnails.delete(cacheKey);
        return;
      }
      void firstValueFrom(
        this.http.get(`${environment.apiUrl}/workspace/signatures/${sig.id}/image`, {
          responseType: 'blob',
        }),
      )
        .then((blob) => {
          if (requestOwner !== this.currentOwner()) return;
          const objectUrl = URL.createObjectURL(blob);
          this.thumbnailUrls.update((current) => ({ ...current, [cacheKey]: objectUrl }));
        })
        .catch(() => {
          if (requestOwner !== this.currentOwner()) return;
          this.failedThumbnails.update((current) => ({ ...current, [cacheKey]: true }));
        })
        .finally(() => {
          this.inFlightThumbnails.delete(cacheKey);
        });
    }, 0);
    return null;
  }
}
