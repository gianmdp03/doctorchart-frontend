import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';
import { NoPlanComponent } from './no-plan.component';
import { AuthService } from '../../core/services/auth.service';

describe('No plan account screen', () => {
 const auth = {refreshPlan: vi.fn(), hasDoctorchartPlan: vi.fn(), signOut: vi.fn()};
 let component: NoPlanComponent;
 let navigate: ReturnType<typeof vi.spyOn>;
 beforeEach(() => {
  vi.clearAllMocks(); auth.refreshPlan.mockResolvedValue(undefined); auth.hasDoctorchartPlan.mockReturnValue(false);
  TestBed.configureTestingModule({imports:[NoPlanComponent],providers:[provideRouter([]),{provide:AuthService,useValue:auth},
   {provide:ActivatedRoute,useValue:{snapshot:{queryParamMap:convertToParamMap({returnUrl:'/pacientes/42'})}}}]});
  navigate=vi.spyOn(TestBed.inject(Router),'navigateByUrl').mockResolvedValue(true);
  component=TestBed.createComponent(NoPlanComponent).componentInstance;
 });
 it('explains the missing plan without automatically leaving DoctorChart', () => {
  const fixture=TestBed.createComponent(NoPlanComponent); fixture.detectChanges();
  expect(fixture.nativeElement.textContent).toContain('Iniciaste sesión correctamente');
  expect(fixture.nativeElement.querySelector('a').textContent).toContain('Ver planes en Bycode');
  expect(navigate).not.toHaveBeenCalled();
  expect(auth.refreshPlan).not.toHaveBeenCalled();
 });
 it('keeps the session and explains that the plan is still inactive', async () => {
  await component.checkPlan();
  expect(component.message()).toContain('Todavía no tenés un plan activo');
  expect(auth.signOut).not.toHaveBeenCalled(); expect(navigate).not.toHaveBeenCalled();
 });
 it('continues the requested clinical route after refreshing an active plan', async () => {
  auth.hasDoctorchartPlan.mockReturnValue(true); await component.checkPlan();
  expect(navigate).toHaveBeenCalledWith('/pacientes/42',{onSameUrlNavigation:'reload'});
 });
 it('uses dashboard rather than an external return URL', async () => {
  Object.defineProperty(TestBed.inject(ActivatedRoute).snapshot, 'queryParamMap', {value:convertToParamMap({returnUrl:'//external.test'})});
  auth.hasDoctorchartPlan.mockReturnValue(true); await component.checkPlan();
  expect(navigate).toHaveBeenCalledWith('/dashboard',{onSameUrlNavigation:'reload'});
 });
 it('shows a retry message on a network failure without losing the session', async () => {
  auth.refreshPlan.mockRejectedValue(new Error('offline')); await component.checkPlan();
  expect(component.message()).toContain('No pudimos verificar'); expect(component.busy()).toBe(false);
  expect(auth.signOut).not.toHaveBeenCalled();
 });
 it('prevents duplicate refresh requests', async () => {
  let finish!:()=>void; auth.refreshPlan.mockImplementation(()=>new Promise<void>(resolve=>finish=resolve));
  const request=component.checkPlan(); await component.checkPlan();
  expect(auth.refreshPlan).toHaveBeenCalledOnce(); finish(); await request;
 });
 it('allows signing out and returning to login', async () => {
  await component.signOut(); expect(auth.signOut).toHaveBeenCalledOnce(); expect(navigate).toHaveBeenCalledWith('/login');
 });
});
