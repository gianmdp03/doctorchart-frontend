import {Component,computed,inject,OnInit,signal} from '@angular/core';
import {Router,RouterLink} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {WorkspaceStore} from '../../core/services/workspace.store';
import {SpecialtyService} from '../../core/services/specialty.service';
import {SpecialtySummary} from '../../core/models/specialty.model';

@Component({selector:'app-my-specialties',imports:[RouterLink],template:`
 <section class="specialties-page"><header><div><h1>Mis especialidades</h1><p>Elegí dónde trabajar o continuá una configuración pendiente.</p></div><button type="button" [disabled]="loading()||store.isMutating()||!available().length" (click)="adding.set(!adding())">Agregar especialidad</button></header>
 @if(error()){<p role="alert">{{error()}} <button (click)="load()">Reintentar</button></p>}
 @if(loading()){<p role="status">Cargando especialidades…</p>}
 @if(adding()){<section class="add-panel" aria-label="Agregar especialidad"><h2>Elegí una especialidad</h2>@for(specialty of available();track specialty.id){<button type="button" [disabled]="store.isMutating()" (click)="add(specialty.id)">{{specialty.name}}</button>}<button type="button" (click)="adding.set(false)">Cancelar</button></section>}
 <div class="specialty-list">@for(context of store.contexts();track context.id){<article><h2>{{context.specialty.name}}</h2><p><span class="status" [class.ready]="context.ready">{{context.ready?'Configurada':'Configuración pendiente'}}</span>@if(context.ready&&context.hasDraft){<span> · Personalización en borrador</span>}</p><div class="actions">@if(context.ready){<a [routerLink]="['/dashboard']" [queryParams]="{specialtyContextId:context.id}">Entrar a la especialidad</a><a [routerLink]="['/onboarding/setup']" [queryParams]="{specialtyContextId:context.id}">Personalizar wizard</a>}@else{<a [routerLink]="['/onboarding/setup']" [queryParams]="{specialtyContextId:context.id}">Continuar configuración</a>}</div></article>}@empty{ @if(!loading()){<p>Todavía no configuraste una especialidad. <a routerLink="/onboarding/select-specialty">Empezar configuración</a></p>} }</div>
 @if(!available().length&&!loading()){<p>Ya agregaste todas las especialidades disponibles.</p>}
 </section>`,styles:[`.specialties-page{max-width:1050px;margin:auto;padding:24px}header{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}h1{font-size:1.8rem;margin:0}h2{font-size:1.2rem}p{line-height:1.6;color:var(--dc-on-surface-variant)}.specialty-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));gap:20px;margin-top:24px}article,.add-panel{border:1px solid var(--border-color,#dce3ed);border-radius:14px;padding:24px;background:var(--dc-surface,#fff)}.add-panel{margin-top:20px}button,a{font:inherit;border-radius:8px;padding:10px 14px}button{cursor:pointer;border:1px solid var(--border-color,#cbd5e1);color:var(--dc-on-surface);background:var(--dc-surface,#fff)}button:disabled{opacity:.5;cursor:default}.actions{display:flex;flex-wrap:wrap;gap:10px}.actions a{color:var(--primary,#1666ac);border:1px solid var(--border-color,#cbd5e1);text-decoration:none}.status{font-size:.85rem;background:#fff1c8;color:#795400;padding:5px 9px;border-radius:6px}.status.ready{background:#d8f5e8;color:#126242}.add-panel button{margin:5px}@media(max-width:600px){.specialties-page{padding:16px}header button{width:100%}}`]})
export class MySpecialtiesComponent implements OnInit{
 readonly store=inject(WorkspaceStore);private readonly catalog=inject(SpecialtyService);private readonly router=inject(Router);
 readonly loading=signal(true);readonly error=signal('');readonly adding=signal(false);readonly specialties=signal<SpecialtySummary[]>([]);
 readonly available=computed(()=>this.specialties().filter(s=>!this.store.contexts().some(c=>c.specialty.id===s.id)));
 ngOnInit(){void this.load();}
 async load(){this.loading.set(true);this.error.set('');try{const [,catalog]=await Promise.all([this.store.loadContexts(true),firstValueFrom(this.catalog.getSpecialties())]);this.specialties.set(catalog);}catch{this.error.set('No pudimos cargar las especialidades.');}finally{this.loading.set(false);}}
 async add(id:number){this.error.set('');try{const context=await this.store.addContext(id);await this.router.navigate(['/onboarding/setup'],{queryParams:{specialtyContextId:context.specialtyContextId}});}catch(error){this.error.set((error as {error?:{message?:string}})?.error?.message??'No se pudo agregar la especialidad. Volvé a intentarlo.');}}
}
