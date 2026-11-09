import {Component,inject,signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute,Router,RouterLink} from '@angular/router';
import {StaffService,staffError} from './staff.service';
import {FEATURE_FLAGS} from '../../core/config/feature-flags';

@Component({selector:'app-staff-auth',imports:[FormsModule,RouterLink],styleUrl:'./staff.css',template:`
<main class="staff-page auth-page"><a routerLink="/">Doctor Chart</a><header class="page-heading"><p class="eyebrow">Acceso administrativo</p>
<h1>{{mode==='activate'?'Activar cuenta de secretaría':mode==='recover'?'Recuperar acceso':'Ingresar como secretaria'}}</h1>
<p>Tu cuenta es independiente del acceso médico. Solo permite gestionar los consultorios asignados.</p></header>
@if(recovery()){<section class="notice" role="status"><h2>Guardá tu código de recuperación</h2><p>Es personal y se muestra una sola vez. Guardalo en un lugar seguro; no lo compartas con los médicos.</p><code class="recovery">{{recovery()}}</code><button type="button" (click)="continue()">Ya lo guardé · Continuar</button></section>}
@else{<form class="panel" (ngSubmit)="submit()" #form="ngForm"><fieldset [disabled]="busy()"><legend class="sr-only">Datos de acceso</legend>
@if(mode==='recover'&&emailRecoveryEnabled){<label>Método de recuperación<select name="recoveryMode" [(ngModel)]="recoveryMode"><option value="personal">Tengo mi código personal</option><option value="email">Recibir un código por email</option></select></label>}
<label>Correo electrónico<input type="email" name="email" [(ngModel)]="email" required autocomplete="username" maxlength="254" /></label>
@if(mode==='recover'&&recoveryMode==='email'){<button type="button" (click)="requestEmail()" [disabled]="busy()||!email.trim()">Enviar código por email</button>@if(emailNotice()){<p role="status">{{emailNotice()}}</p>}}
@if(mode!=='login'){<label>{{mode==='activate'?'Código de invitación':recoveryMode==='email'?'Código recibido por email':'Código de recuperación'}}<input name="code" [(ngModel)]="code" required autocomplete="off" spellcheck="false" maxlength="43" /></label>}
<label>{{mode==='recover'?'Contraseña nueva':'Contraseña'}}<input type="password" name="password" [(ngModel)]="password" required [attr.autocomplete]="mode==='login'?'current-password':'new-password'" minlength="12" maxlength="72" /></label>
@if(mode==='activate'){<p>Si ya trabajás con otro médico, utilizá tu contraseña actual para vincular esta invitación.</p>}
@if(error()){<p role="alert" class="error">{{error()}}</p>}
<button type="submit" [disabled]="busy()||form.invalid">{{busy()?'Verificando…':mode==='activate'?'Activar cuenta':mode==='recover'?'Recuperar acceso':'Ingresar'}}</button>
</fieldset></form>}
<nav aria-label="Ayuda de acceso"><a routerLink="/staff/login">Iniciar sesión</a><a routerLink="/staff/activate">Tengo una invitación</a><a routerLink="/staff/recover">Recuperar acceso</a></nav>
</main>`})
export class StaffAuthComponent {
 private readonly api=inject(StaffService);private readonly router=inject(Router);
 readonly mode=(inject(ActivatedRoute).snapshot.data['mode']??'login') as 'login'|'activate'|'recover';
 readonly emailRecoveryEnabled=FEATURE_FLAGS.NOTIFICATIONS_ENABLED;recoveryMode:'personal'|'email'='personal';readonly emailNotice=signal('');
 email='';password='';code='';readonly busy=signal(false);readonly error=signal('');readonly recovery=signal('');
 async submit(){if(this.busy())return;this.busy.set(true);this.error.set('');try{
  if(this.mode==='recover'){const result=this.recoveryMode==='email'?await this.api.recoverEmail({email:this.email,password:this.password,emailCode:this.code}):await this.api.recover({email:this.email,password:this.password,recoveryCode:this.code});this.api.session.set(null);this.recovery.set(result.recoveryCode);}
  else{const result=await this.api.authenticate(this.mode,{email:this.email,password:this.password,...(this.mode==='activate'?{invitationCode:this.code}:{})});if(result.recoveryCode)this.recovery.set(result.recoveryCode);else await this.router.navigateByUrl('/staff/calendar');}
  this.password='';this.code='';
 }catch(e){this.error.set(staffError(e));}finally{this.busy.set(false);}}
 async requestEmail(){if(this.busy())return;this.busy.set(true);this.error.set('');try{const result=await this.api.requestRecoveryEmail(this.email);this.emailNotice.set(result.message);}catch(e){this.error.set(staffError(e));}finally{this.busy.set(false);}}
 async continue(){this.recovery.set('');await this.router.navigateByUrl(this.mode==='recover'?'/staff/login':'/staff/calendar');}
}
