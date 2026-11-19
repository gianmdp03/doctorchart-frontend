import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideKeyRound, lucideLogOut, lucideUserRound } from '@ng-icons/lucide';
import { StaffService, staffError } from './staff.service';

@Component({
  selector: 'app-staff-account',
  imports: [CdkMenuModule, FormsModule, NgIconComponent],
  providers: [provideIcons({lucideKeyRound, lucideLogOut, lucideUserRound})],
  templateUrl: './staff-account.component.html',
  styleUrl: './staff-account.component.css',
})
export class StaffAccountComponent {
  private readonly api = inject(StaffService);
  private readonly router = inject(Router);
  readonly session = this.api.session;
  readonly locked = input(false);
  readonly busy = signal(false);
  readonly passwordError = signal('');
  readonly notice = signal('');
  readonly logoutError = signal('');
  currentPassword = '';
  newPassword = '';

  resetPassword(): void {
    this.currentPassword = '';
    this.newPassword = '';
    this.passwordError.set('');
  }

  async updatePassword(dialog: HTMLDialogElement): Promise<void> {
    if (this.busy() || this.locked()) return;
    this.busy.set(true);
    this.passwordError.set('');
    this.notice.set('');
    try {
      await this.api.changePassword(this.currentPassword, this.newPassword);
      this.notice.set('Contraseña actualizada.');
      dialog.close();
    } catch (error) {
      this.passwordError.set((error as {status?: number})?.status === 401
        ? 'Revisá la contraseña actual. Si tu sesión venció, volvé a ingresar.'
        : staffError(error));
    } finally {
      this.busy.set(false);
    }
  }

  async logout(): Promise<void> {
    if (this.busy() || this.locked()) return;
    this.busy.set(true);
    this.logoutError.set('');
    try {
      await this.api.logout();
      await this.router.navigateByUrl('/staff/login');
    } catch (error) {
      this.logoutError.set(staffError(error));
    } finally {
      this.busy.set(false);
    }
  }
}
