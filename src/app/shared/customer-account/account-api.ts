import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CUSTOMER_ACCOUNT } from './account-context';

export interface AccountProfile {
  fullName: string;
  phone: string;
  email: string;
  dni: string;
  hasAvatar: boolean;
  revision: number;
}

export interface SupportTicket {
  id: number;
  reference: string;
  subject: string;
  description: string;
  status: string;
  resolution: string;
  createdAt: string;
}

export interface SupportAttachment { id: string; name: string; state: string }
export interface SupportDetail {
  ticket: SupportTicket;
  attachments: SupportAttachment[];
  events: { id: number; status: string; resolution: string; createdAt: string }[];
}

@Injectable()
export class CustomerAccountApi {
  private readonly http = inject(HttpClient);
  private readonly context = inject(CUSTOMER_ACCOUNT);
  private readonly owner = this.context.owner();
  private get base(): string { return new URL('/api/billing/', this.context.api).href; }
  private async headers(): Promise<HttpHeaders> {
    const token = await this.context.token();
    if (!token || !this.owner || this.context.owner() !== this.owner) throw new Error('Tu sesión cambió. Volvé a iniciar sesión.');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  async profile() {
    return firstValueFrom(this.http.get<AccountProfile>(this.base + 'account/profile', { headers: await this.headers(), transferCache: false }));
  }
  async saveProfile(fullName: string, phone: string) {
    return firstValueFrom(this.http.patch<AccountProfile>(this.base + 'account/profile',
      { firstName: fullName, lastName: '', phone }, { headers: await this.headers() }));
  }
  async image(path: string) {
    return firstValueFrom(this.http.get(this.base + path, { headers: await this.headers(), responseType: 'blob', transferCache: false }));
  }
  async uploadAvatar(file: File, revision: number) {
    const body = new FormData();
    body.set('file', file, file.name);
    return firstValueFrom(this.http.post(this.base + 'account/avatar', body, { headers: (await this.headers()).set('If-Match', String(revision)) }));
  }
  async removeAvatar(revision: number) {
    return firstValueFrom(this.http.delete(this.base + 'account/avatar', { headers: (await this.headers()).set('If-Match', String(revision)) }));
  }
  async authorizeEmail(email: string, password: string) {
    return firstValueFrom(this.http.post(this.base + 'account/security/email-authorization',
      { email, password }, { headers: await this.headers() }));
  }
  async tickets(search: string, status: string, beforeId?: number) {
    const params = new URLSearchParams({ applicationId: this.context.product, limit: '20' });
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    if (beforeId) params.set('beforeId', String(beforeId));
    return firstValueFrom(this.http.get<{ items: SupportTicket[]; nextBeforeId: number | null }>(this.base + 'support/tickets', {
      headers: await this.headers(), transferCache: false,
      params: Object.fromEntries(params),
    }));
  }
  async ticket(id: number) {
    return firstValueFrom(this.http.get<SupportDetail>(this.base + 'support/tickets/' + id, { headers: await this.headers(), transferCache: false }));
  }
  async uploadAttachment(file: File) {
    const body = new FormData();
    body.set('file', file, file.name);
    return firstValueFrom(this.http.post<SupportAttachment>(this.base + 'support/attachments', body, { headers: await this.headers() }));
  }
  attachment(id: string) { return this.image('support/attachments/' + encodeURIComponent(id)); }
  async removeAttachment(id: string) {
    return firstValueFrom(this.http.delete(this.base + 'support/attachments/' + encodeURIComponent(id), { headers: await this.headers() }));
  }
  async createTicket(subject: string, description: string, attachmentIds: string[], key: string) {
    return firstValueFrom(this.http.post<SupportTicket>(this.base + 'support/tickets', {
      applicationId: this.context.product, subject, description, attachmentIds,
    }, { headers: (await this.headers()).set('Idempotency-Key', key) }));
  }
}
