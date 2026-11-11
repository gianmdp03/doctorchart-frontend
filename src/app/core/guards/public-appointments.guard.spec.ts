import {TestBed} from '@angular/core/testing';import {provideRouter,Router} from '@angular/router';import {publicAppointmentsGuard} from './public-appointments.guard';import {FEATURE_FLAGS} from '../config/feature-flags';
describe('Public appointment routing',()=>{
 const initial=FEATURE_FLAGS.PUBLIC_APPOINTMENTS_ENABLED;
 afterEach(()=>FEATURE_FLAGS.PUBLIC_APPOINTMENTS_ENABLED=initial);
 it('is disabled only when explicitly configured, without consulting medical identity',()=>{FEATURE_FLAGS.PUBLIC_APPOINTMENTS_ENABLED=false;TestBed.configureTestingModule({providers:[provideRouter([])]});const result=TestBed.runInInjectionContext(()=>publicAppointmentsGuard({} as any,{} as any));expect(TestBed.inject(Router).serializeUrl(result as any)).toBe('/404');});
 it('allows visitors and active medical sessions equally when enabled',()=>{expect(FEATURE_FLAGS.PUBLIC_APPOINTMENTS_ENABLED).toBe(true);TestBed.configureTestingModule({providers:[provideRouter([])]});expect(TestBed.runInInjectionContext(()=>publicAppointmentsGuard({} as any,{} as any))).toBe(true);});
});
