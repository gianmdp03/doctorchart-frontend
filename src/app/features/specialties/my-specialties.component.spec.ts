import {TestBed} from '@angular/core/testing';import {signal} from '@angular/core';import {provideRouter,Router} from '@angular/router';import {of} from 'rxjs';
import {MySpecialtiesComponent} from './my-specialties.component';import {WorkspaceStore} from '../../core/services/workspace.store';import {SpecialtyService} from '../../core/services/specialty.service';
describe('M5 Mis especialidades',()=>{
 let store:any;
 beforeEach(()=>{store={contexts:signal([{id:101,specialty:{id:1,name:'Medicina General'},ready:true},{id:202,specialty:{id:2,name:'Dermatología'},ready:false}]),specialtyContextId:signal(101),loadContexts:vi.fn(async()=>[]),isMutating:()=>false,addContext:vi.fn(async()=>({specialtyContextId:303}))};TestBed.configureTestingModule({imports:[MySpecialtiesComponent],providers:[provideRouter([]),{provide:WorkspaceStore,useValue:store},{provide:SpecialtyService,useValue:{getSpecialties:()=>of([{id:1,name:'Medicina General'},{id:2,name:'Dermatología'},{id:3,name:'Pediatría'},{id:4,code:'sp01_fixture',name:'Especialidad de prueba'}])}}]});});
 it('highlights the current context and keeps distinct links for each specialty',async()=>{const f=TestBed.createComponent(MySpecialtiesComponent);f.detectChanges();await f.componentInstance.load();f.detectChanges();const el=f.nativeElement as HTMLElement;expect(el.querySelector('article.is-current')?.textContent).toContain('En uso');expect(el.textContent).toContain('Configuración pendiente');expect(el.querySelector('a[href="/dashboard?specialtyContextId=101"]')).not.toBeNull();expect(el.querySelector('a[href="/onboarding/setup?specialtyContextId=202"]')).not.toBeNull();expect(f.componentInstance.available().map(s=>s.id)).toEqual([3,4]);});
 it('creates only the available catalog selection and opens its independent wizard',async()=>{const f=TestBed.createComponent(MySpecialtiesComponent);const navigate=vi.spyOn(TestBed.inject(Router),'navigate').mockResolvedValue(true);f.detectChanges();await f.whenStable();await f.componentInstance.add(3);expect(store.addContext).toHaveBeenCalledWith(3);expect(navigate).toHaveBeenCalledWith(['/onboarding/setup'],{queryParams:{specialtyContextId:303}});});
 it('renders and selects a new code returned by the catalog', async () => {
   const fixture = TestBed.createComponent(MySpecialtiesComponent);
   const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
   fixture.detectChanges();
   await fixture.componentInstance.load();
   fixture.componentInstance.adding.set(true);
   fixture.detectChanges();
   const buttons = [...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('.picker-option')];
   const fourth = buttons.find(button => button.textContent?.includes('Especialidad de prueba'));
   expect(fourth).toBeDefined();
   fourth!.click();
   await fixture.whenStable();
   expect(store.addContext).toHaveBeenCalledWith(4);
   expect(navigate).toHaveBeenCalledWith(['/onboarding/setup'], {queryParams:{specialtyContextId:303}});
 });
});
