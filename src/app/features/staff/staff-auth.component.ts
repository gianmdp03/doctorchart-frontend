import { InteractionStatusService } from '../../core/services/interaction-status.service';
import {Component,inject,signal} from '@angular/core';
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
 readonly emailRecoveryEnabled=FEATURE_FLAGS.NOTIFICATIONS_ENABLED;recoveryMode:'personal'|'email'=this.emailRecoveryEnabled?'email':'personal';readonly emailNotice=signal('');
 email='';password='';code='';readonly busy=signal(false);readonly error=signal('');readonly recovery=signal('');
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
  if(this.mode==='recover'){const result=this.recoveryMode==='email'?await this.api.recoverEmail({email:this.email,password:this.password,emailCode:this.code}):await this.api.recover({email:this.email,password:this.password,recoveryCode:this.code});this.api.session.set(null);this.recovery.set(result.recoveryCode);this.interaction.notifySuccess('Tu acceso se recuperó correctamente.');}
  else{await this.api.authenticate(this.mode,{email:this.email,password:this.password,...(this.mode==='activate'?{invitationCode:this.code}:{})});if(this.mode==='activate')this.interaction.notifySuccess('Tu acceso de secretaría se activó correctamente.');await this.router.navigateByUrl('/staff/calendar');}
  this.password='';this.passwordVisible.set(false);this.code='';
 }catch(e){this.error.set(staffError(e));}finally{this.busy.set(false);}}
 async requestEmail(){if(this.busy())return;this.busy.set(true);this.error.set('');try{const result=await this.api.requestRecoveryEmail(this.email);this.emailNotice.set(result.message);}catch(e){this.error.set(staffError(e));}finally{this.busy.set(false);}}
 async continue(){this.recovery.set('');await this.router.navigateByUrl(this.mode==='recover'?'/staff/login':'/staff/calendar');}
}
