import {DOCUMENT} from '@angular/common';
import {TestBed} from '@angular/core/testing';
import {ActivatedRoute,Router} from '@angular/router';
import {StaffAuthComponent} from './staff-auth.component';
import {StaffService} from './staff.service';

describe('Secretaria invitation links',()=>{
 const code='a'.repeat(43);
 let api:{inspectInvitation:ReturnType<typeof vi.fn>;authenticate:ReturnType<typeof vi.fn>};
 let router:{navigateByUrl:ReturnType<typeof vi.fn>};
 let history:{replaceState:ReturnType<typeof vi.fn>;state:object};
 beforeEach(()=>{
  api={inspectInvitation:vi.fn().mockResolvedValue({email:'ana@example.invalid',name:'Ana',existingAccount:false}),authenticate:vi.fn().mockResolvedValue({recoveryCode:'personal-backup'})};
  router={navigateByUrl:vi.fn().mockResolvedValue(true)};
  history={replaceState:vi.fn(),state:{navigationId:1}};
  TestBed.configureTestingModule({providers:[{provide:StaffService,useValue:api},{provide:Router,useValue:router},{provide:ActivatedRoute,useValue:{snapshot:{data:{mode:'activate'}}}},{provide:DOCUMENT,useValue:{defaultView:{location:{hash:'#invite='+code,pathname:'/staff/activate',search:''},history}}}]});
 });
 afterEach(()=>TestBed.resetTestingModule());
 const make=()=>TestBed.runInInjectionContext(()=>new StaffAuthComponent());
 it('removes the secret from browser history and prefills email without consuming the link',async()=>{
  const c=make();expect(c.loadingInvitation()).toBe(true);expect(history.replaceState).toHaveBeenCalledWith(history.state,'','/staff/activate');
  await Promise.resolve();expect(api.inspectInvitation).toHaveBeenCalledWith(code);expect(c.email).toBe('ana@example.invalid');expect(c.fromLink).toBe(true);expect(c.invitationName()).toBe('Ana');expect(c.existingAccount()).toBe(false);
 });
 it('enters the calendar immediately after activation, without a recovery-code gate',async()=>{
  const c=make();await Promise.resolve();c.password='a-password-long-enough';await c.submit();
  expect(api.authenticate).toHaveBeenCalledWith('activate',{email:'ana@example.invalid',password:'a-password-long-enough',invitationCode:code});
  expect(router.navigateByUrl).toHaveBeenCalledWith('/staff/calendar');expect(c.recovery()).toBe('');expect(c.password).toBe('');expect(c.code).toBe('');
 });
 it('prevents submission for expired or consumed links and explains how to renew',async()=>{
  api.inspectInvitation.mockRejectedValue({status:401});const c=make();await Promise.resolve();await c.submit();expect(c.invalidInvitation()).toBe(true);expect(c.error()).toContain('enlace nuevo');expect(api.authenticate).not.toHaveBeenCalled();
 });
 it('asks an existing secretary for her current password',async()=>{
  api.inspectInvitation.mockResolvedValue({email:'ana@example.invalid',name:'Ana',existingAccount:true});const c=make();await Promise.resolve();expect(c.existingAccount()).toBe(true);
 });
});
