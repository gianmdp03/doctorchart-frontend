import { ChangeDetectionStrategy, Component, DestroyRef, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountProfile, CustomerAccountApi } from './account-api';
import { CUSTOMER_ACCOUNT } from './account-context';
import { cropSquare } from './crop-square';

@Component({
  selector: 'app-customer-account-profile',
  imports: [FormsModule, RouterLink],
  providers: [CustomerAccountApi],
  templateUrl: './profile-page.html',
  styleUrls: ['./account.css', './profile-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerProfilePage {
  private readonly api = inject(CustomerAccountApi);
  private readonly context = inject(CUSTOMER_ACCOUNT);
  private readonly router = inject(Router);
  private readonly destroy = inject(DestroyRef);
  readonly profile = signal<AccountProfile | null>(null);
  readonly avatar = signal('');
  readonly busy = signal(false);
  readonly notice = signal('');
  readonly error = signal('');
  private readonly cropPreview = viewChild<ElementRef<HTMLCanvasElement>>('cropPreview');
  readonly photo = signal<ImageBitmap | null>(null);
  readonly zoom = signal(1);
  readonly horizontal = signal(50);
  readonly vertical = signal(50);
  readonly removePhoto = signal(false);
  fullName = '';
  phone = '';

  constructor() {
    this.destroy.onDestroy(() => {
      this.replaceImage('');
      this.photo()?.close();
    });
    effect(() => {
      const bitmap = this.photo();
      const canvas = this.cropPreview()?.nativeElement;
      if (bitmap && canvas) this.drawCrop(bitmap, canvas);
    });
    void this.load();
  }

  async load(): Promise<void> {
    await this.run(() => this.refresh(), 'No pudimos cargar tu perfil. Reintentá.');
  }

  async signOut(): Promise<void> {
    await this.run(async () => {
      await this.context.signOut();
      await this.router.navigate(['/login']);
    }, 'No pudimos cerrar la sesión. Reintentá.');
  }

  private async refresh(): Promise<void> {
    const owner = this.context.owner();
    const profile = await this.api.profile();
    if (this.destroy.destroyed || this.context.owner() !== owner) return;
    this.profile.set(profile);
    this.fullName = profile.fullName;
    this.phone = profile.phone;
    if (!profile.hasAvatar) { this.replaceImage(''); return; }
    const photo = await this.api.image('account/avatar');
    if (!this.destroy.destroyed && this.context.owner() === owner) this.replaceImage(URL.createObjectURL(photo));
  }

  private replaceImage(value: string): void {
    const previous = this.avatar();
    if (previous) URL.revokeObjectURL(previous);
    this.avatar.set(value);
  }

  async save(): Promise<void> {
    const name = this.fullName.trim();
    if (!name) { this.error.set('Ingresá tu nombre completo.'); return; }
    await this.run(async () => {
      const owner = this.context.owner();
      const profile = await this.api.saveProfile(name, this.phone.trim());
      if (this.destroy.destroyed || this.context.owner() !== owner) return;
      this.profile.set(profile);
      this.fullName = profile.fullName;
      this.phone = profile.phone;
      this.notice.set('Perfil guardado.');
    }, 'No pudimos guardar tu perfil.');
  }

  async choosePhoto(input: HTMLInputElement): Promise<void> {
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 10_000_000) {
      this.error.set('Elegí una foto JPEG, PNG o WebP de hasta 10 MB.');
      return;
    }
    await this.run(async () => {
      const bitmap = await createImageBitmap(file);
      if (this.destroy.destroyed || bitmap.width * bitmap.height > 32_000_000) {
        bitmap.close();
        if (!this.destroy.destroyed) throw new Error('La imagen es demasiado grande.');
        return;
      }
      this.cancelCrop();
      this.zoom.set(1);
      this.horizontal.set(50);
      this.vertical.set(50);
      this.photo.set(bitmap);
    }, 'No pudimos abrir la foto. Probá con otra imagen.');
  }

  private drawCrop(photo: ImageBitmap, canvas: HTMLCanvasElement): void {
    const area = cropSquare(photo.width, photo.height, this.zoom(), this.horizontal(), this.vertical());
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(photo, area.x, area.y, area.size, area.size, 0, 0, canvas.width, canvas.height);
  }

  cancelCrop(): void {
    this.photo()?.close();
    this.photo.set(null);
  }

  async savePhoto(): Promise<void> {
    const photo = this.photo();
    const revision = this.profile()?.revision;
    if (!photo || revision === undefined) return;
    await this.run(async () => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 512;
      this.drawCrop(photo, canvas);
      const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(result =>
        result ? resolve(result) : reject(new Error('No pudimos preparar el recorte.')), 'image/png'));
      if (this.destroy.destroyed) return;
      await this.api.uploadAvatar(new File([blob], 'avatar.png', { type: 'image/png' }), revision);
      this.cancelCrop();
      await this.refresh();
      this.notice.set('Foto actualizada.');
    }, 'No pudimos guardar la foto. Volvé a cargar el perfil antes de reintentar.');
  }

  async deletePhoto(): Promise<void> {
    const revision = this.profile()?.revision;
    if (!this.removePhoto() || revision === undefined) return;
    await this.run(async () => {
      await this.api.removeAvatar(revision);
      this.removePhoto.set(false);
      await this.refresh();
      this.notice.set('Foto eliminada.');
    }, 'No pudimos eliminar la foto. Volvé a cargar el perfil antes de reintentar.');
  }

  private async run(work: () => Promise<void>, failure: string): Promise<void> {
    if (this.busy()) return;
    this.busy.set(true);
    this.error.set('');
    this.notice.set('');
    try { await work(); }
    catch { this.error.set(failure); }
    finally { this.busy.set(false); }
  }
}
