import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {StaffCalendarComponent} from './staff-calendar.component';
import {Assignment,StaffService} from './staff.service';

const assignment:Assignment={ownerId:'owner',accessId:'access',clinicId:'1',clinicName:'Consultorio',timezone:'UTC',permissions:['view','create','cancel','status','reschedule'],validUntil:'2099-01-01T00:00:00Z'};
const deferred=<T>()=>{let resolve!:(value:T)=>void;let reject!:(error:unknown)=>void;const promise=new Promise<T>((yes,no)=>{resolve=yes;reject=no;});return {promise,resolve,reject};};
describe('M7 administrative calendar isolation and draft safety',()=>{
 let api:{assignments:ReturnType<typeof vi.fn>;availability:ReturnType<typeof vi.fn>;bookings:ReturnType<typeof vi.fn>;create:ReturnType<typeof vi.fn>};
 beforeEach(()=>{api={assignments:vi.fn().mockResolvedValue({items:[assignment]}),availability:vi.fn().mockResolvedValue({days:[]}),bookings:vi.fn().mockResolvedValue({items:[],hasMore:false}),create:vi.fn()};TestBed.configureTestingModule({providers:[{provide:StaffService,useValue:api},{provide:Router,useValue:{navigateByUrl:vi.fn()}}]});});
 afterEach(()=>TestBed.resetTestingModule());
 const make=()=>TestBed.runInInjectionContext(()=>new StaffCalendarComponent());
 it('expires actions locally even if a cached permission still exists',()=>{const c=make();c.selectedAssignment.set({...assignment,validUntil:new Date(c.now()-1).toISOString()});expect(c.can('create')).toBe(false);c.selectedAssignment.set(assignment);expect(c.can('create')).toBe(true);});
 it('ignores a late previous-clinic availability response',async()=>{const c=make();await Promise.resolve();const old=deferred<{days:{date:string;slots:[]}[]}>();api.availability.mockReturnValueOnce(old.promise).mockResolvedValueOnce({days:[{date:'2030-02-02',slots:[]}]});c.assignments.set([assignment,{...assignment,clinicId:'2'}]);c.changeAssignment('owner|1');c.changeAssignment('owner|2');await Promise.resolve();await Promise.resolve();old.resolve({days:[{date:'1999-01-01',slots:[]}]});await Promise.resolve();await Promise.resolve();expect(c.selectedAssignment()?.clinicId).toBe('2');expect(c.days().some(d=>d.date==='1999-01-01')).toBe(false);});
 it('retains entered fields after a slot conflict and prevents double click',async()=>{const c=make();await Promise.resolve();c.selectedAssignment.set(assignment);c.contactName='Madre';c.contactPhone='123';c.attendeeName='Hijo';c.start='2030-01-01T09:00:00Z';const pending=deferred<unknown>();api.create.mockReturnValue(pending.promise);const first=c.create();void c.create();expect(api.create).toHaveBeenCalledTimes(1);pending.reject({status:409,error:{code:'BOOKING_SLOT_UNAVAILABLE'}});await first;expect(c.contactName).toBe('Madre');expect(c.attendeeName).toBe('Hijo');expect(c.editorError()).toContain('conservamos');expect(c.writing()).toBe(false);});
});
