import {DOCUMENT} from '@angular/common';
import {TestBed} from '@angular/core/testing';
import {ActivatedRoute,provideRouter,Router} from '@angular/router';
import {signal} from '@angular/core';
import {StaffAuthComponent} from './staff-auth.component';
import {StaffService} from './staff.service';

describe('Secretaria invitation links',()=>{
 const code='a'.repeat(43);
 let api:{inspectInvitation:ReturnType<typeof vi.fn>;authenticate:ReturnType<typeof vi.fn>};
 let router:{navigateByUrl:ReturnType<typeof vi.fn>};
 let history:{replaceState:ReturnType<typeof vi.fn>;state:object};
 beforeEach(()=>{
  api={inspectInvitation:vi.fn().mockResolvedValue({email:'ana@example.invalid',name:'Ana',existingAccount:false,doctorName:'Profesional de prueba',agendas:['Consultorio de prueba']}),authenticate:vi.fn().mockResolvedValue({recoveryCode:'personal-backup'})};
  router={navigateByUrl:vi.fn().mockResolvedValue(true)};
  history={replaceState:vi.fn(),state:{navigationId:1}};
  TestBed.configureTestingModule({providers:[{provide:StaffService,useValue:api},{provide:Router,useValue:router},{provide:ActivatedRoute,useValue:{snapshot:{data:{mode:'activate'}}}},{provide:DOCUMENT,useValue:{defaultView:{location:{hash:'#invite='+code,pathname:'/staff/activate',search:''},history}}}]});
 });
 afterEach(()=>TestBed.resetTestingModule());
 const make=()=>TestBed.runInInjectionContext(()=>new StaffAuthComponent());
 it('removes the secret from browser history and prefills email without consuming the link',async()=>{
  const c=make();expect(c.loadingInvitation()).toBe(true);expect(history.replaceState).toHaveBeenCalledWith(history.state,'','/staff/activate');
  await Promise.resolve();expect(api.inspectInvitation).toHaveBeenCalledWith(code);expect(c.email).toBe('ana@example.invalid');expect(c.fromLink).toBe(true);expect(c.invitationName()).toBe('Ana');expect(c.existingAccount()).toBe(false);
  expect(c.invitingDoctor()).toBe('Profesional de prueba');expect(c.invitedAgendas()).toEqual(['Consultorio de prueba']);
 });
 it('enters the calendar immediately after activation, without a recovery-code gate',async()=>{
  const c=make();await Promise.resolve();c.password='a-password-long-enough';await c.submit();
  expect(api.authenticate).toHaveBeenCalledWith('activate',{email:'ana@example.invalid',password:'a-password-long-enough',invitationCode:code});
  expect(router.navigateByUrl).toHaveBeenCalledWith('/staff/calendar');expect(c.password).toBe('');expect(c.code).toBe('');
 });
 it('prevents submission for expired or consumed links and explains how to renew',async()=>{
  api.inspectInvitation.mockRejectedValue({status:401});const c=make();await Promise.resolve();await c.submit();expect(c.invalidInvitation()).toBe(true);expect(c.error()).toContain('enlace nuevo');expect(api.authenticate).not.toHaveBeenCalled();
 });
 it('asks an existing secretary for her current password',async()=>{
  api.inspectInvitation.mockResolvedValue({email:'ana@example.invalid',name:'Ana',existingAccount:true});const c=make();await Promise.resolve();expect(c.existingAccount()).toBe(true);
 });
 it('keeps a private invitation available to retry after a connection interruption',async()=>{
  api.inspectInvitation.mockRejectedValueOnce({status:0});
  const c=make();await Promise.resolve();await c.submit();
  expect(c.retryInvitation()).toBe(true);expect(c.invalidInvitation()).toBe(false);expect(api.authenticate).not.toHaveBeenCalled();
  await c.inspectInvitation();expect(api.inspectInvitation).toHaveBeenLastCalledWith(code);
  expect(c.retryInvitation()).toBe(false);expect(c.email).toBe('ana@example.invalid');
 });
});

describe('Secretaría email recovery', () => {
 it('moves through email, verified code and confirmed password without showing a personal code', async () => {
  const api = {
   requestRecoveryEmail: vi.fn().mockResolvedValue({}),
   verifyRecoveryEmail: vi.fn().mockRejectedValueOnce({status:401}).mockResolvedValueOnce({resetToken:'temporary-grant'}),
   recoverEmail: vi.fn().mockResolvedValue(undefined),
   session: signal(null),
  };
  TestBed.configureTestingModule({imports:[StaffAuthComponent],providers:[
   provideRouter([]), {provide:StaffService,useValue:api},
   {provide:ActivatedRoute,useValue:{snapshot:{data:{mode:'recover'}}}},
  ]});
  const fixture = TestBed.createComponent(StaffAuthComponent);
  const component = fixture.componentInstance;
  const host = fixture.nativeElement as HTMLElement;
  fixture.detectChanges();
  expect(host.querySelector('input[type=email]')).not.toBeNull();
  expect(host.querySelector('.room-photo, .otp-input, input[type=password]')).toBeNull();
  component.email = 'ana@example.invalid';
  await component.requestEmail();
  fixture.detectChanges();
  const code = host.querySelector<HTMLInputElement>('.otp-input')!;
  expect(code.inputMode).toBe('numeric');
  expect(code.autocomplete).toBe('one-time-code');
  code.value = '01 23a45';
  code.dispatchEvent(new Event('input'));
  expect(code.value).toBe('012345');
  await component.verifyRecoveryCode();
  expect(component.recoveryStep()).toBe('code');
  expect(component.error()).toContain('incorrecto o venció');
  await component.verifyRecoveryCode();
  fixture.detectChanges();
  expect(host.querySelector('.otp-input')).toBeNull();
  expect(host.querySelectorAll('input[type=password]')).toHaveLength(2);
  component.password = 'new-password';
  component.confirmPassword = 'different-password';
  await component.resetPassword();
  expect(api.recoverEmail).not.toHaveBeenCalled();
  component.confirmPassword = component.password;
  await component.resetPassword();
  fixture.detectChanges();
  expect(api.recoverEmail).toHaveBeenCalledWith('ana@example.invalid','temporary-grant','new-password');
  expect(host.querySelector('h1')?.textContent).toContain('Contraseña actualizada');
  expect(host.textContent).not.toContain('temporary-grant');
 });
});
