import {Component,DestroyRef,inject,signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import {civilDate,displayDay,localTime} from '../calendar/bookings.models';

export interface RecoveredConfirmation {specialtyName?:string;reference:string;status:string;start:string;end:string;doctorName:string;clinicName:string;address:string;timezone:string;accessExpiresAt:string;}
@Component({selector:'app-confirmation-page',imports:[FormsModule,RouterLink],styleUrl:'./confirmation-page.component.css',template:`
<main class="recovery-page"><a routerLink="/appointments" class="brand">Doctor Chart · Turnos online</a><p class="eyebrow">TU CONSTANCIA PRIVADA</p><h1>Consultá tu turno</h1><p class="intro">Ingresá el código de tu confirmación o del correo que recibiste. No necesitás crear una cuenta.</p>
<form (ngSubmit)="consult()" #form="ngForm"><label for="confirmation-code">Código privado de consulta</label><div class="code-row"><input id="confirmation-code" name="accessCode" [(ngModel)]="accessCode" required minlength="43" maxlength="43" autocomplete="off" autocapitalize="off" spellcheck="false" [disabled]="busy()" /><button type="submit" [disabled]="busy()||form.invalid">{{busy()?'Consultando…':'Consultar turno'}}</button></div><p class="help">El código es personal. Nunca te pediremos DNI, contraseña ni información clínica para esta consulta.</p></form>
@if(error()){<p class="error" role="alert">{{error()}}</p>}
@if(confirmation();as c){<section class="constancia" aria-label="Constancia del turno"><p class="status">{{statusLabel(c.status)}}</p><h2>{{c.doctorName}}</h2>@if(c.specialtyName){<p>{{c.specialtyName}}</p>}<p class="when">{{displayDay(civilDate(c.start,c.timezone))}} · {{localTime(c.start,c.timezone)}} – {{localTime(c.end,c.timezone)}}</p><p>{{c.clinicName}}</p>@if(c.address){<p>{{c.address}}</p>}<p class="zone">Hora local del consultorio</p><div class="reference"><span>Referencia administrativa</span><code>{{c.reference}}</code></div><p class="help">Para cancelar o cambiar el turno, comunicate con el consultorio. Este acceso permite consultar la información administrativa.</p></section>}
<footer>No compartas tu código. Esta página no muestra historias clínicas ni guarda el código en tu navegador.</footer></main>`})
export class ConfirmationPageComponent {
 private readonly http=inject(HttpClient);private alive=true;
 readonly busy=signal(false);readonly error=signal('');readonly confirmation=signal<RecoveredConfirmation|null>(null);accessCode='';
 readonly civilDate=civilDate;readonly displayDay=displayDay;readonly localTime=localTime;
 constructor(){inject(DestroyRef).onDestroy(()=>{this.alive=false;this.accessCode='';this.confirmation.set(null);});}
 statusLabel(status:string){return ({CONFIRMED:'Turno confirmado',CANCELLED:'Turno cancelado',CHECKED_IN:'Llegada registrada',COMPLETED:'Turno atendido',NO_SHOW:'Ausencia registrada'} as Record<string,string>)[status]??'Estado del turno';}
 async consult(){if(this.busy())return;this.busy.set(true);this.error.set('');this.confirmation.set(null);try{
  const c=await firstValueFrom(this.http.post<RecoveredConfirmation>(environment.apiUrl.replace(/\/$/,'')+'/public/appointments/confirmation',{accessCode:this.accessCode.trim()},{transferCache:false}));if(this.alive)this.confirmation.set(c);
 }catch(e){if(!this.alive)return;const status=(e as HttpErrorResponse).status;this.error.set(status===404?'No encontramos una constancia vigente para ese código. Revisalo o contactá al consultorio.':status===429?'Demasiadas consultas. Esperá un minuto y reintentá.':'No pudimos consultar el turno. Conservamos tu código para que puedas reintentar.');}finally{if(this.alive)this.busy.set(false);}}
}
