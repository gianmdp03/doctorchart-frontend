import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowLeft,
  lucideCheck,
  lucideCopy,
  lucideDownload,
  lucideFileArchive,
  lucideFolderOpen,
  lucideKeyRound,
  lucideRefreshCw,
  lucideShieldCheck,
} from '@ng-icons/lucide';
import { Subscription, exhaustMap, takeWhile, timer } from 'rxjs';
import { formatInstant } from '../../core/date/user-time-zone';
import { BrowserUiStorageService } from '../../core/services/browser-ui-storage.service';
import { ClinicalContextService } from '../../core/services/clinical-context.service';
import { CUSTOMER_ACCOUNT } from '../../shared/customer-account/account-context';
import { browserPreferences } from './browser-preferences';
import { downloadPracticeExport, ExportDownloadError } from './practice-export-download';

interface ExportStatus {
  id: string;
  status: 'preparing' | 'ready' | 'failed';
  preparedAt?: string;
  expiresAt?: string;
  bytes?: number;
  error?: string;
}

interface StartedExport extends ExportStatus {
  password: string;
}

const pollInterval = 2500;
const maxBrowserBytes = 128 * 1024;
const bytesLabel = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 });
const exportId = /^[A-Za-z0-9_-]{1,128}$/;

function validStatus(value: ExportStatus | null): value is ExportStatus {
  if (!value || typeof value.id !== 'string' || !exportId.test(value.id)) return false;
  if (value.status === 'ready') return typeof value.bytes === 'number' && Number.isSafeInteger(value.bytes) && value.bytes > 0;
  return value.status === 'preparing' || value.status === 'failed';
}

@Component({
  selector: 'app-practice-export-page',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({
    lucideArrowLeft,
    lucideCheck,
    lucideCopy,
    lucideDownload,
    lucideFileArchive,
    lucideFolderOpen,
    lucideKeyRound,
    lucideRefreshCw,
    lucideShieldCheck,
  })],
  templateUrl: './practice-export-page.component.html',
  styleUrls: ['../../shared/customer-account/account.css', './practice-export-page.component.css'],
})
export class PracticeExportPageComponent implements OnInit {
  private readonly account = inject(CUSTOMER_ACCOUNT);
  private readonly owner = this.account.owner();
  private readonly base = this.account.api.replace(/\/$/, '') + '/exports';
  private readonly http = inject(HttpClient);
  private readonly storage = inject(BrowserUiStorageService);
  private readonly context = inject(ClinicalContextService);
  private readonly document = inject(DOCUMENT);
  private readonly destroy = inject(DestroyRef);
  private polling?: Subscription;
  private downloadAbort?: AbortController;

  protected readonly sessionMatches = computed(() => Boolean(this.owner && this.account.owner() === this.owner));
  protected readonly job = signal<ExportStatus | null>(null);
  protected readonly password = signal<string | null>(null);
  protected readonly includeBrowser = signal(true);
  protected readonly discovering = signal(false);
  protected readonly starting = signal(false);
  protected readonly downloading = signal(false);
  protected readonly retryStatus = signal(false);
  protected readonly statusMessage = signal('');
  protected readonly error = signal('');

  constructor() {
    effect(() => {
      if (this.sessionMatches()) return;
      this.polling?.unsubscribe();
      this.downloadAbort?.abort();
      this.password.set(null);
      this.job.set(null);
    });
    this.destroy.onDestroy(() => this.downloadAbort?.abort());
  }

  ngOnInit(): void {
    this.discoverCurrent();
  }

  protected prepare(): void {
    const owner = this.owner;
    if (!owner || !this.sessionMatches() || this.discovering() || this.starting() || this.downloading() || this.job()?.status === 'preparing') return;
    const payload = this.includeBrowser()
      ? { browserPreferences: browserPreferences(this.storage, owner, this.context.id()) }
      : {};
    this.statusMessage.set('');
    if (new TextEncoder().encode(JSON.stringify(payload)).byteLength > maxBrowserBytes) {
      this.error.set('Los borradores de esta pestaña superan el tamaño admitido. Podés preparar la copia sin los datos del navegador.');
      return;
    }
    this.error.set('');
    this.retryStatus.set(false);
    this.starting.set(true);
    this.http.post<StartedExport>(this.base, payload, { transferCache: false })
      .pipe(takeUntilDestroyed(this.destroy)).subscribe({
        next: result => {
          if (!this.sessionMatches()) return;
          this.starting.set(false);
          if (!validStatus(result) || result.status !== 'preparing' || typeof result.password !== 'string' || !result.password) {
            this.discoverCurrent(() => this.error.set('No pudimos confirmar que se inició la copia.'));
            return;
          }
          this.job.set({ id: result.id, status: 'preparing' });
          this.password.set(result.password);
          this.checkStatus();
        },
        error: (error: unknown) => {
          if (!this.sessionMatches()) return;
          this.starting.set(false);
          const showError = () => this.handleError(error, 'No pudimos preparar la copia. Volvé a intentar.');
          if (error instanceof HttpErrorResponse && [0, 408, 409, 429, 500, 502, 503, 504].includes(error.status)) {
            this.discoverCurrent(showError);
          } else {
            showError();
          }
        },
      });
  }

  protected checkStatus(): void {
    const job = this.job();
    if (!this.sessionMatches() || this.starting() || this.downloading()) return;
    if (job?.status !== 'preparing') {
      this.discoverCurrent();
      return;
    }
    this.polling?.unsubscribe();
    this.retryStatus.set(false);
    this.error.set('');
    this.polling = timer(0, pollInterval).pipe(
      exhaustMap(() => this.http.get<ExportStatus>(this.base + '/' + job.id, { transferCache: false })),
      takeWhile(status => status?.status === 'preparing', true),
      takeUntilDestroyed(this.destroy),
    ).subscribe({
      next: status => {
        if (!this.sessionMatches()) return;
        if (!validStatus(status) || status.id !== job.id) {
          this.polling?.unsubscribe();
          this.retryStatus.set(true);
          this.error.set('No pudimos verificar el estado de la copia.');
          return;
        }
        this.updateJob(status);
      },
      error: (error: unknown) => {
        if (!this.sessionMatches()) return;
        this.retryStatus.set(true);
        this.handleError(error, 'No pudimos consultar el estado de la copia. Podés volver a consultar.');
      },
    });
  }

  private discoverCurrent(onMissing?: () => void): void {
    if (!this.sessionMatches() || this.discovering()) return;
    this.discovering.set(true);
    this.retryStatus.set(false);
    this.error.set('');
    this.http.get<ExportStatus>(this.base, { transferCache: false }).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next: status => {
        if (!this.sessionMatches()) return;
        this.discovering.set(false);
        if (!validStatus(status)) {
          this.retryStatus.set(true);
          this.error.set('No pudimos verificar el estado de tu última copia.');
          return;
        }
        this.updateJob(status);
        if (status.status === 'preparing') this.checkStatus();
      },
      error: (error: unknown) => {
        if (!this.sessionMatches()) return;
        this.discovering.set(false);
        if (error instanceof HttpErrorResponse && (error.status === 404 || error.status === 410)) {
          this.job.set(null);
          this.password.set(null);
          onMissing?.();
          return;
        }
        this.retryStatus.set(true);
        this.handleError(error, 'No pudimos consultar tu última copia. Podés volver a consultar.');
      },
    });
  }

  private updateJob(status: ExportStatus): void {
    if (this.job()?.id !== status.id || status.status === 'failed') this.password.set(null);
    this.job.set(status);
    if (status.status === 'failed') this.error.set(status.error || 'No pudimos completar la copia. Volvé a intentar.');
  }

  protected async copyPassword(): Promise<void> {
    const password = this.password();
    if (!password || !this.sessionMatches()) return;
    try {
      const clipboard = this.document.defaultView?.navigator.clipboard;
      if (!clipboard) throw new Error('Portapapeles no disponible');
      await clipboard.writeText(password);
      if (!this.destroy.destroyed && this.sessionMatches() && password === this.password()) this.statusMessage.set('Clave copiada.');
    } catch {
      if (!this.destroy.destroyed && this.sessionMatches() && password === this.password()) this.statusMessage.set('Seleccioná y copiá la clave manualmente.');
    }
  }

  protected async download(): Promise<void> {
    const job = this.job();
    const owner = this.owner;
    if (!owner || !this.sessionMatches() || job?.status !== 'ready' || !job.bytes || this.discovering() || this.starting() || this.downloading()) return;
    const abort = new AbortController();
    this.downloadAbort = abort;
    this.downloading.set(true);
    this.statusMessage.set('');
    this.error.set('');
    try {
      await downloadPracticeExport(this.document, this.account, owner, this.base + '/' + job.id + '/file', job.bytes, abort.signal);
      if (!this.destroy.destroyed && this.sessionMatches()) this.statusMessage.set('Descarga lista. Usá la clave que guardaste para abrir el ZIP.');
    } catch (error) {
      if (!this.destroy.destroyed && this.sessionMatches() && !(error instanceof DOMException && error.name === 'AbortError')) {
        this.handleError(error, 'No pudimos completar la descarga. Volvé a intentar.');
      }
    } finally {
      this.downloadAbort = undefined;
      if (!this.destroy.destroyed && this.sessionMatches()) this.downloading.set(false);
    }
  }

  protected dateTime(value: string): string {
    return formatInstant(value);
  }

  protected size(bytes: number): string {
    return bytes >= 1024 * 1024 ? bytesLabel.format(bytes / (1024 * 1024)) + ' MB' : bytesLabel.format(bytes / 1024) + ' KB';
  }

  private handleError(error: unknown, fallback: string): void {
    const status = error instanceof HttpErrorResponse || error instanceof ExportDownloadError ? error.status : null;
    if (status === 404 || status === 410) {
      this.job.set(null);
      this.password.set(null);
      this.retryStatus.set(false);
      this.error.set('Esta copia ya no está disponible. Podés preparar una nueva.');
    } else if (status === 401) {
      this.error.set('Tu sesión venció. Volvé a iniciar sesión para preparar o descargar una copia.');
    } else if (status === 403) {
      this.error.set('Tu cuenta no tiene acceso a esta copia.');
    } else if (status === 429) {
      this.error.set('Hay otra copia en preparación o alcanzaste el límite de solicitudes. Volvé a intentar en unos minutos.');
    } else {
      this.error.set(fallback);
    }
  }
}
