import { InteractionStatusService } from '../../core/services/interaction-status.service';
import {afterNextRender, Component, ElementRef, inject, Injector, signal, viewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute,Router,RouterLink} from '@angular/router';
import {StaffService,staffError} from './staff.service';
import {FEATURE_FLAGS} from '../../core/config/feature-flags';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideCalendarDays, lucideEye, lucideEyeOff, lucideStethoscope } from '@ng-icons/lucide';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-staff-auth',
  imports: [FormsModule, RouterLink, NgIcon, ThemeToggleComponent],
  providers: [provideIcons({ lucideArrowRight, lucideCalendarDays, lucideEye, lucideEyeOff, lucideStethoscope })],
  templateUrl: './staff-auth.component.html',
  styleUrl: './staff-auth.component.css',
})
export class StaffAuthComponent {
 readonly passwordVisible = signal(false);
  private readonly interaction = inject(InteractionStatusService);
 private readonly api=inject(StaffService);private readonly router=inject(Router);
 private readonly document=inject(DOCUMENT);
 readonly mode=(inject(ActivatedRoute).snapshot.data['mode']??'login') as 'login'|'activate'|'recover';
 readonly emailRecoveryEnabled=FEATURE_FLAGS.NOTIFICATIONS_ENABLED;
 readonly recoveryStep = signal<'email' | 'code' | 'password' | 'done'>('email');
 readonly recoverySteps = ['Correo', 'Código', 'Contraseña'];
 readonly busy = signal(false);
 readonly error = signal('');
 email = '';
 password = '';
 confirmPassword = '';
 code = '';
 private resetToken = '';
 private readonly injector = inject(Injector);
 private readonly recoveryHeading = viewChild<ElementRef<HTMLElement>>('recoveryHeading');
 readonly loadingInvitation=signal(false);readonly invalidInvitation=signal(false);readonly retryInvitation=signal(false);readonly invitationName=signal('');readonly existingAccount=signal(false);fromLink=false;
 readonly invitingDoctor = signal('');
 readonly invitedAgendas = signal<string[]>([]);
 constructor(){
  const win=this.document.defaultView;
  if(this.mode!=='activate'||!win)return;
  const params=new URLSearchParams(win.location.hash.slice(1));
  if(!params.has('invite'))return;
  this.fromLink=true;this.code=params.get('invite')??'';
  win.history.replaceState(win.history.state,'',win.location.pathname+win.location.search);
  void this.inspectInvitation();
 }
 async inspectInvitation(): Promise<void> {
   if (!this.fromLink || this.loadingInvitation() || this.invalidInvitation()) return;
   this.loadingInvitation.set(true);
   this.retryInvitation.set(false);
   this.error.set('');
   try {
     const invitation = await this.api.inspectInvitation(this.code);
     this.email = invitation.email;
     this.invitationName.set(invitation.name);
     this.existingAccount.set(invitation.existingAccount);
     this.invitingDoctor.set(invitation.doctorName ?? '');
     this.invitedAgendas.set(invitation.agendas ?? []);
   } catch (error) {
     const status = (error as {status?:number})?.status;
     if (status === 401) {
       this.invalidInvitation.set(true);
       this.error.set('La invitación venció o ya fue utilizada. Pedile al médico un enlace nuevo.');
     } else {
       this.retryInvitation.set(true);
       this.error.set(status === 429 ? staffError(error) : 'No pudimos verificar la invitación. Podés volver a intentarlo desde acá.');
     }
   } finally {
     this.loadingInvitation.set(false);
   }
 }
 async submit(){if(this.busy()||this.loadingInvitation()||this.invalidInvitation()||this.retryInvitation())return;this.busy.set(true);this.error.set('');try{
  if (this.mode === 'recover') return;
  await this.api.authenticate(this.mode,{email:this.email,password:this.password,...(this.mode==='activate'?{invitationCode:this.code}:{})});if(this.mode==='activate')this.interaction.notifySuccess('Tu acceso de secretaría se activó correctamente.');await this.router.navigateByUrl('/staff/calendar');
  this.password='';this.passwordVisible.set(false);this.code='';
 }catch(e){this.error.set(staffError(e));}finally{this.busy.set(false);}}
 private showRecoveryStep(step: 'email' | 'code' | 'password' | 'done'): void {
   this.recoveryStep.set(step);
   afterNextRender(() => this.recoveryHeading()?.nativeElement.focus(), {injector:this.injector});
 }

 changeRecoveryEmail(): void {
   if (this.busy()) return;
   this.code = this.password = this.confirmPassword = this.resetToken = '';
   this.passwordVisible.set(false);
   this.error.set('');
   this.showRecoveryStep('email');
 }

 async requestEmail(): Promise<void> {
   if (!this.emailRecoveryEnabled || !this.email.trim() || this.busy()) return;
   const resend = this.recoveryStep() === 'code';
   await this.runRecovery(async () => {
     this.email = this.email.trim();
     await this.api.requestRecoveryEmail(this.email);
     this.code = '';
     this.showRecoveryStep('code');
   }, resend ? 'No pudimos enviar otro código. Volvé a intentarlo.' : 'No pudimos solicitar el código. Volvé a intentarlo.');
 }

 updateRecoveryCode(input: HTMLInputElement): void {
   this.code = input.value.replace(/[^0-9]/g, '').slice(0, 6);
   input.value = this.code;
 }

 async verifyRecoveryCode(): Promise<void> {
   if (this.recoveryStep() !== 'code' || !/^[0-9]{6}$/.test(this.code)) return;
   await this.runRecovery(async () => {
     const result = await this.api.verifyRecoveryEmail(this.email, this.code);
     if (!result.resetToken) throw new Error('Missing reset token');
     this.resetToken = result.resetToken;
     this.code = '';
     this.showRecoveryStep('password');
   }, 'No pudimos verificar el código. Volvé a intentarlo.', 'El código es incorrecto o venció. Revisalo o pedí uno nuevo.');
 }

 async resetPassword(): Promise<void> {
   if (this.recoveryStep() !== 'password' || !this.resetToken || this.busy()) return;
   if (this.password !== this.confirmPassword) {
     this.error.set('Las contraseñas no coinciden.');
     return;
   }
   await this.runRecovery(async () => {
     await this.api.recoverEmail(this.email, this.resetToken, this.password);
     this.api.session.set(null);
     this.resetToken = this.password = this.confirmPassword = '';
     this.passwordVisible.set(false);
     this.showRecoveryStep('done');
   }, 'No pudimos guardar la contraseña. Volvé a intentarlo.', 'El acceso para cambiar la contraseña venció. Volvé al paso del correo y pedí un nuevo código.');
 }

 private async runRecovery(action: () => Promise<void>, fallback: string, invalid?: string): Promise<void> {
   if (this.busy()) return;
   this.busy.set(true);
   this.error.set('');
   try {
     await action();
   } catch (error) {
     const status = (error as {status?:number})?.status;
     this.error.set(status === 401 && invalid ? invalid : status === 400 || status === 429 ? staffError(error) : fallback);
   } finally {
     this.busy.set(false);
   }
 }
}
