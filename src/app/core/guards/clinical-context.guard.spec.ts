import {TestBed} from '@angular/core/testing';
import {signal} from '@angular/core';
import {Router,provideRouter,convertToParamMap} from '@angular/router';
import {clinicalContextGuard,clinicalLeaveGuard} from './clinical-context.guard';
import {WorkspaceStore} from '../services/workspace.store';
import {AuthService} from '../services/auth.service';
import {ClinicalNavigationService} from '../services/clinical-navigation.service';

describe('M5 explicit clinical routes',()=>{
 let active=signal(101),store:any;
 beforeEach(()=>{active=signal(101);store={specialtyContextId:active,loadContexts:async()=>[{id:101,ready:true},{id:202,ready:false}],loadSetup:vi.fn(),activateContext:vi.fn(async(id:number)=>active.set(id)),isOnboardingCompleted:()=>active()===101};TestBed.configureTestingModule({providers:[provideRouter([]),{provide:WorkspaceStore,useValue:store},{provide:AuthService,useValue:{authReady:Promise.resolve(),isLoggedIn:()=>true,isSuperAdmin:()=>false}}]});});
 const run=(values:Record<string,string>,data:any={clinicalContext:true})=>TestBed.runInInjectionContext(()=>clinicalContextGuard({queryParamMap:convertToParamMap(values),data} as any,{url:'/patients'} as any));
 it('adds the chosen tab context to a clinical URL',async()=>{expect(String(await run({}))).toBe('/patients?specialtyContextId=101');expect(store.activateContext).not.toHaveBeenCalled();});
 it('honors the URL and sends only its pending context to the existing wizard',async()=>{expect(String(await run({specialtyContextId:'202'}))).toBe('/onboarding/setup?specialtyContextId=202');expect(store.activateContext).toHaveBeenCalledWith(202);});
 it('does not block global administration when the selected context is pending',async()=>{expect(await run({specialtyContextId:'202'},{})).toBe(true);});
 it('rejects foreign and malformed context URLs before loading a configuration',async()=>{for(const id of ['999','bad','0',''])expect(String(await run({specialtyContextId:id}))).toBe('/specialties');expect(store.activateContext).not.toHaveBeenCalled();});
 it('requires a decision for dirty edits and blocks switching during a write',async()=>{const nav=TestBed.inject(ClinicalNavigationService);nav.dirty.set(true);const decision=TestBed.runInInjectionContext(()=>clinicalLeaveGuard({},{} as any,{url:'/patients?specialtyContextId=101'} as any,{url:'/patients?specialtyContextId=202'} as any));expect(nav.dialog()).toBe(true);nav.answer('cancel');expect(await decision).toBe(false);const write=nav.beginWrite();expect(await nav.canLeaveEditing()).toBe(false);write.end();});
});
