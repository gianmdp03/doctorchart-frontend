import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerAccountApi, SupportAttachment, SupportDetail, SupportTicket } from './account-api';
import { CUSTOMER_ACCOUNT } from './account-context';

interface PendingTicket {
  subject: string;
  description: string;
  attachmentIds: string[];
  key: string;
}

@Component({
  selector: 'app-customer-support',
  imports: [DatePipe, FormsModule, RouterLink],
  providers: [CustomerAccountApi],
  templateUrl: './support-page.html',
  styleUrls: ['./account.css', './support-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerSupportPage {
  private readonly api = inject(CustomerAccountApi);
  private readonly context = inject(CUSTOMER_ACCOUNT);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroy = inject(DestroyRef);
  private readonly owner = this.context.owner();
  private get storageKey(): string { return `bycode.support.pending:${this.context.product}:${this.owner}`; }
  private readonly images = new Map<string, string>();
  readonly mode = this.route.snapshot.data['customerMode'] as 'list' | 'new' | 'detail';
  readonly product = this.context.product === 'pointly' ? 'Pointly' : 'DoctorChart';
  readonly busy = signal(false);
  readonly error = signal('');
  readonly list = signal<SupportTicket[] | null>(null);
  readonly next = signal<number | null>(null);
  readonly detail = signal<SupportDetail | null>(null);
  readonly attachments = signal<SupportAttachment[]>([]);
  readonly pending = signal<PendingTicket | null>(null);
  readonly selectedImage = signal('');
  readonly selectedImageName = signal('');
  subject = '';
  description = '';
  search = '';
  statusFilter = '';
  private appliedFilters = { search: '', status: '' };

  constructor() {
    this.destroy.onDestroy(() => this.images.forEach(url => URL.revokeObjectURL(url)));
    if (this.mode === 'list') void this.loadList();
    if (this.mode === 'detail') void this.loadDetail();
    if (this.mode === 'new') {
      try {
        const saved = sessionStorage.getItem(this.storageKey);
        if (saved) {
          const pending = JSON.parse(saved) as PendingTicket;
          this.pending.set(pending);
          this.subject = pending.subject;
          this.description = pending.description;
        }
      } catch { this.error.set('No pudimos recuperar el intento guardado en esta pestaña.'); }
    }
  }

  status(value: string): string {
    return ({ open: 'Abierto', in_review: 'En revisión', resolved: 'Resuelto', closed: 'Cerrado' } as Record<string, string>)[value] ?? value;
  }

  async loadList(beforeId?: number): Promise<void> {
    await this.run(async () => {
      const filters = beforeId ? this.appliedFilters : { search: this.search.trim(), status: this.statusFilter };
      const response = await this.api.tickets(filters.search, filters.status, beforeId);
      if (!this.current()) return;
      this.appliedFilters = filters;
      this.list.set(beforeId ? [...(this.list() ?? []), ...response.items] : response.items);
      this.next.set(response.nextBeforeId);
    }, 'No pudimos cargar tus tickets. Reintentá.');
  }

  get filtered(): boolean { return !!(this.appliedFilters.search || this.appliedFilters.status); }

  async loadDetail(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isSafeInteger(id) || id < 1) { this.error.set('El número de ticket es inválido.'); return; }
    await this.run(async () => {
      const detail = await this.api.ticket(id);
      if (this.current()) this.detail.set(detail);
    }, 'No pudimos abrir el ticket. Revisá que esté asociado a tu cuenta.');
  }

  async upload(input: HTMLInputElement): Promise<void> {
    const file = input.files?.[0];
    input.value = '';
    if (!file || this.pending() || this.attachments().length >= 3) return;
    await this.run(async () => {
      const attachment = await this.api.uploadAttachment(file);
      if (this.current()) this.attachments.update(items => [...items, attachment]);
    }, 'No pudimos adjuntar la captura. Revisá su formato o tamaño.');
  }

  async remove(id: string): Promise<void> {
    if (this.pending()) return;
    await this.run(async () => {
      await this.api.removeAttachment(id);
      if (this.current()) this.attachments.update(items => items.filter(item => item.id !== id));
    }, 'No pudimos quitar el adjunto.');
  }

  async openAttachment(attachment: SupportAttachment): Promise<void> {
    await this.run(async () => {
      let url = this.images.get(attachment.id);
      if (!url) {
        const photo = await this.api.attachment(attachment.id);
        if (!this.current()) return;
        url = URL.createObjectURL(photo);
        this.images.set(attachment.id, url);
      }
      this.selectedImage.set(url);
      this.selectedImageName.set(attachment.name);
    }, 'No pudimos abrir la captura.');
  }

  async send(): Promise<void> {
    const subject = this.subject.trim();
    const description = this.description.trim();
    if (subject.length < 5 || subject.length > 160 || description.length < 20 || description.length > 20000) {
      this.error.set('Escribí un asunto de 5 a 160 caracteres y una descripción de 20 a 20.000 caracteres.');
      return;
    }
    await this.run(async () => {
      if (!this.current()) return;
      const pending = this.pending() ?? {
        subject, description, attachmentIds: this.attachments().map(item => item.id), key: crypto.randomUUID(),
      };
      sessionStorage.setItem(this.storageKey, JSON.stringify(pending));
      this.pending.set(pending);
      let ticket: SupportTicket;
      try { ticket = await this.api.createTicket(pending.subject, pending.description, pending.attachmentIds, pending.key); }
      catch (error) {
        if (error instanceof HttpErrorResponse && [400, 404, 413, 415, 422].includes(error.status)) {
          sessionStorage.removeItem(this.storageKey);
          this.pending.set(null);
        }
        throw error;
      }
      sessionStorage.removeItem(this.storageKey);
      this.pending.set(null);
      if (this.current()) await this.router.navigate(['/support/tickets', ticket.id]);
    }, 'No pudimos confirmar el envío. Si el intento quedó pendiente, reintentá el mismo ticket.');
  }

  private current() { return !!this.owner && this.owner === this.context.owner() && !this.destroy.destroyed; }

  private async run(work: () => Promise<void>, failure: string): Promise<void> {
    if (this.busy()) return;
    this.busy.set(true);
    this.error.set('');
    try { await work(); }
    catch { if (this.current()) this.error.set(failure); }
    finally { if (this.current()) this.busy.set(false); }
  }
}
