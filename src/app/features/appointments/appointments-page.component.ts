import { httpErrorMessage } from '../../core/utils/user-error';
import { PhoneInputComponent } from '../../shared/phone-input/phone-input.component';
import {afterNextRender,Component,DestroyRef,ElementRef,Injector,PLATFORM_ID,computed,inject,signal,viewChildren} from '@angular/core';
import {CommonModule,DOCUMENT,isPlatformBrowser} from '@angular/common';import {FormsModule} from '@angular/forms';import {ActivatedRoute,Router,RouterLink,convertToParamMap} from '@angular/router';import {takeUntilDestroyed} from '@angular/core/rxjs-interop';import {firstValueFrom,combineLatest,of} from 'rxjs';
import { PublicBookingShellComponent } from './public-booking-shell.component';
import {userTimeZone} from '../../core/date/user-time-zone';
import {modalityLabel, type AppointmentModality} from '../clinics/clinics.models';
import {FEATURE_FLAGS} from '../../core/config/feature-flags';
import { environment } from '../../../environments/environment';
import {ARGENTINA,BOOKING_COUNTRIES,BookingCountry,bookingCountry,localitiesFor} from '../../core/location/booking-locations';
import {DatePickerComponent} from '../../shared/date-picker/date-picker.component';
import {AppointmentsService,PublicSpecialty} from './appointments.service';import {PublicDoctor,PublicClinic,PublicBookingDraft,PublicConfirmation} from './appointments.models';import {civilDate,localTime,displayDay,slotOffsetLabel,addDays} from '../calendar/bookings.models';import {solveProof} from './proof-of-work';
function isFutureSlot(start:string,now:number){return Date.parse(start)>now;}

@Component({selector:'app-appointments-page',imports:[CommonModule,FormsModule,PhoneInputComponent,RouterLink,DatePickerComponent,PublicBookingShellComponent],templateUrl:'./appointments-page.component.html',styleUrls:['./appointments-page.component.css', './patient-entry.css']})
export class AppointmentsPageComponent{
 private readonly api=inject(AppointmentsService);private readonly route=inject(ActivatedRoute);private readonly destroy=inject(DestroyRef);private readonly pickers=viewChildren(DatePickerComponent);
 private readonly host=inject<ElementRef<HTMLElement>>(ElementRef);
 private readonly router=inject(Router);
 private readonly injector=inject(Injector);
 private readonly browserDocument=inject(DOCUMENT);
 private readonly browser=isPlatformBrowser(inject(PLATFORM_ID));
 readonly confirmationEnabled=FEATURE_FLAGS.NOTIFICATIONS_ENABLED;
 protected readonly apiUrl = environment.apiUrl;
 lookupDni = '';
 openMyBookings() {
  if (!/^[0-9]{5,8}$/.test(this.lookupDni)) return;
  const info = {bookingDni:this.lookupDni};
  this.lookupDni = '';
  return this.router.navigateByUrl('/appointments/confirmation', {info});
 }
 private generation=0;private slotsGeneration=0;private searchGeneration=0;private controller:AbortController|null=null;private attempt:{payload:string;key:string}|null=null;
 readonly specialtyContextId=signal('');
 readonly profile=signal<PublicDoctor|null>(null);readonly doctors=signal<PublicDoctor[]>([]);readonly busy=signal(false);readonly slotsBusy=signal(false);readonly sending=signal(false);readonly error=signal('');readonly slotError=signal('');readonly formError=signal('');readonly confirmation=signal<PublicConfirmation|null>(null);readonly confirmationDoctorId=signal('');private readonly returnedDays=signal<{date:string;slots:{start:string;end:string}[]}[]>([]);
 private readonly now=signal(Date.now());
 readonly days=computed(()=>{
  const now=this.now();
  return this.returnedDays().map(day=>({...day,slots:day.slots.filter(slot=>isFutureSlot(slot.start,now))}));
 });
 readonly chosenDay=signal('');
 readonly activeDay=computed(()=>{
  const days=this.days();
  return days.find(day=>day.date===this.chosenDay()) ?? days.find(day=>day.slots.length) ?? days[0];
 });
 readonly weekdayFormat=new Intl.DateTimeFormat('es-AR',{weekday:'short',timeZone:'UTC'});
 weekday(date:string){return this.weekdayFormat.format(new Date(date+'T12:00:00Z'));}
 private updateClock(){
  const now=Date.now();
  this.now.set(now);
  const selected=this.selectedStart();
  if(selected&&!this.sending()&&!this.confirmation()&&!isFutureSlot(selected,now)){
   this.selectedStart.set('');
   this.formError.set('Ese horario ya pasó. Elegí otro para continuar. Tus datos se conservaron.');
  }
 }
 readonly status=signal('');readonly conflict=signal(false);readonly id=signal('');readonly clinicId=signal('');readonly selectedStart=signal('');readonly formOpen=signal(false);readonly displayDay=displayDay;readonly localTime=localTime;readonly slotOffsetLabel=slotOffsetLabel;readonly civilDate=civilDate;
 readonly countries=BOOKING_COUNTRIES;
 readonly modalityLabel=modalityLabel;
 readonly patientZone=this.browser?userTimeZone():'UTC';
 country=ARGENTINA;
 readonly specialties=signal<PublicSpecialty[]>([]);
 readonly specialtiesLoading=signal(false);
 readonly specialtiesError=signal(false);
 readonly hasSearched=signal(false);
 private catalogGeneration=0;
 filters={province:'',city:'',specialty:'',modality:'' as AppointmentModality|''};
 page=0;hasMore=false;date=civilDate(new Date().toISOString(),this.country.timezone);
 contactName='';contactPhone:string|null=null;attendeeName='';different=false;document='';email='';answers:Record<string,string>={};consent=false;
 constructor(){
  if(this.browser){
   const refresh=()=>this.updateClock();
   const clock=setInterval(refresh,1000);
   this.browserDocument.addEventListener('visibilitychange',refresh);
   this.destroy.onDestroy(()=>{
    clearInterval(clock);
    this.browserDocument.removeEventListener('visibilitychange',refresh);
   });
  }
  combineLatest([this.route.paramMap,this.route.queryParamMap??of(this.route.snapshot?.queryParamMap??convertToParamMap({}))]).pipe(takeUntilDestroyed()).subscribe(([params,query])=>{
  this.id.set(params.get('publicId')??'');
  this.reset();
  this.clinicId.set(query.get('clinic')??'');
  this.clearSearch();
  if(this.id())void this.loadProfile();else if(this.browser)void this.loadSpecialties();
 });this.destroy.onDestroy(()=>{this.generation++;this.slotsGeneration++;this.searchGeneration++;this.catalogGeneration++;this.controller?.abort();});}
 private reset(){this.generation++;this.slotsGeneration++;this.searchGeneration++;this.sending.set(false);this.status.set('');this.controller?.abort();this.profile.set(null);this.specialtyContextId.set('');this.confirmation.set(null);this.returnedDays.set([]);this.selectedStart.set('');this.formOpen.set(false);this.error.set('');this.formError.set('');this.conflict.set(false);this.attempt=null;this.contactName='';this.contactPhone=null;this.attendeeName='';this.different=false;this.document='';this.email='';this.answers={};this.consent=false;}
 private message(err: unknown, fallback: string, write = false) {
  const status = (err as { status?: number } | null)?.status;
  if (status === 404) return 'Este profesional o consultorio ya no está disponible para reservar online.';
  if (status === 403) return 'Las reservas online o su verificación no están disponibles. Reintentá o contactá al consultorio.';
  return httpErrorMessage(err, fallback, { write });
 }
 changeCountry(country:BookingCountry){
  this.country=country;
  this.changeProvince('');
  this.date=civilDate(new Date().toISOString(),country.timezone);
 }
 changeProvince(province:string){this.filters['province']=province;this.filters['city']='';this.clearSearch();}
 changeModality(modality:AppointmentModality|''){
  this.filters.modality=modality;
  if(modality==='TELECONSULTATION')this.changeProvince('');
  else this.clearSearch();
 }
 clearSearch():void {
  this.searchGeneration++;
  this.hasSearched.set(false);
  this.doctors.set([]);
  this.busy.set(false);
  this.error.set('');
  this.page=0;
  this.hasMore=false;
 }
 async loadSpecialties():Promise<void> {
  if(this.specialtiesLoading())return;
  const generation=++this.catalogGeneration;
  this.specialtiesLoading.set(true);
  this.specialtiesError.set(false);
  try {
   const specialties=await firstValueFrom(this.api.specialties());
   if(generation===this.catalogGeneration){
    this.specialties.set(specialties);
    if(this.filters.specialty && !specialties.some(specialty=>specialty.code===this.filters.specialty)){
     this.filters.specialty='';
     this.clearSearch();
    }
   }
  }catch {
   if(generation===this.catalogGeneration)this.specialtiesError.set(true);
  }finally {
   if(generation===this.catalogGeneration)this.specialtiesLoading.set(false);
  }
 }
 supportsOffer(clinic:PublicClinic){return clinic.modality==='TELECONSULTATION'||!!bookingCountry(clinic.country);}
 readonly hasLocalTimeDifference = computed(() => {
  const clinic = this.clinic();
  return clinic?.modality === 'TELECONSULTATION' &&
    this.days().some(day => day.slots.some(slot => this.patientTime(slot.start, clinic.timezone)));
 });
 patientTime(instant: string, zone: string): string {
  if (!this.browser || zone === this.patientZone) return '';
  const userDay = civilDate(instant, this.patientZone);
  const agendaDay = civilDate(instant, zone);
  const time = localTime(instant, this.patientZone);
  if (userDay === agendaDay) return time === localTime(instant, zone) ? '' : time;
  return displayDay(userDay) + ' · ' + time;
 }
 localities(){return localitiesFor(this.country,this.filters['province']);}
 submitSearch(): void {
  void this.search(0);
  this.focusHeading('results-title');
 }
 async search(page=0){
  this.hasSearched.set(true);
  const generation=++this.searchGeneration,country=this.country;
  const filters={...this.filters,country:country.name};
  this.busy.set(true);
  this.error.set('');
  try {
   const result=await firstValueFrom(this.api.search(filters,page));
   if(generation!==this.searchGeneration)return;
   const province=filters.province.toLowerCase(),city=filters.city.toLowerCase();
   const doctors=result.items.map(doctor=>({
    ...doctor,
    clinics:doctor.clinics.filter(clinic=>(!filters.modality || (clinic.modality??'IN_PERSON')===filters.modality) &&
     (clinic.modality==='TELECONSULTATION'||(bookingCountry(clinic.country)===country &&
     clinic.province.toLowerCase().includes(province) && clinic.city.toLowerCase().includes(city)))),
   }));
   this.doctors.set(doctors.filter(doctor=>doctor.clinics.length));
   this.page=page;
   this.hasMore=result.hasMore;
  } catch(err) {
   if(generation===this.searchGeneration){
    this.doctors.set([]);
    this.error.set(this.message(err,'No pudimos buscar profesionales.'));
   }
  } finally {
   if(generation===this.searchGeneration)this.busy.set(false);
  }
 }
 async loadProfile(preserve=false){
  const generation=++this.generation,id=this.id();
  this.busy.set(true);
  this.error.set('');
  try {
   const result=await firstValueFrom(this.api.profile(id));
   if(generation!==this.generation||id!==this.id())return;
   const clinics=result.clinics.filter(clinic=>this.supportsOffer(clinic));
   if(!clinics.length){
    this.profile.set(null);
    this.error.set('Este profesional no ofrece turnos online en este momento.');
    return;
   }
   this.profile.set({...result,clinics});
   const offers=result.specialties??[];const requested=this.specialtyContextId()||this.route.snapshot?.queryParamMap.get('specialtyContextId')||'';
   if(requested&&!offers.some(c=>c.id===requested)){this.profile.set(null);this.error.set('La especialidad de este enlace ya no está disponible.');return;}
   this.specialtyContextId.set(requested||(offers.length===1?offers[0].id:''));
   const available=this.contextClinics();if(!available.some(c=>c.id===this.clinicId()))this.clinicId.set(available[0]?.id??'');
   if(preserve){
    const next:Record<string,string>={};
    for(const question of result.form.questions)next[question.key]=this.answers[question.key]??'';
    this.answers=next;
    this.conflict.set(false);
    this.formError.set('Revisá las preguntas vigentes y elegí un horario actualizado.');
   }
   const clinic=this.clinic();
   if(!preserve&&clinic)this.date=civilDate(new Date().toISOString(),clinic.timezone);
   await this.loadSlots();
  } catch(err) {
   if(generation===this.generation){
    this.profile.set(null);
    this.error.set(this.message(err,'No pudimos cargar el perfil.'));
   }
  } finally {
   if(generation===this.generation)this.busy.set(false);
  }
 }
 specialtyNames(doctor:PublicDoctor){return doctor.specialties?.map(c=>c.name).join(' · ')||doctor.specialty;}
 directContext(doctor:PublicDoctor){return doctor.specialties?.find(c=>c.code===this.filters.specialty)?.id;}
 contextClinics(){const profile=this.profile();return profile?.specialties?.length?profile.specialties.find(c=>c.id===this.specialtyContextId())?.clinics.filter(c=>this.supportsOffer(c))??[]:profile?.clinics??[];}
 changeSpecialty(id:string){if(this.sending()||!this.profile()?.specialties?.some(c=>c.id===id))return;this.specialtyContextId.set(id);this.selectedStart.set('');this.formOpen.set(false);this.consent=false;this.attempt=null;this.clinicId.set(this.contextClinics()[0]?.id??'');void this.loadSlots();}
 clinic():PublicClinic|undefined{return this.contextClinics().find(c=>c.id===this.clinicId());}
 changeClinic(id:string){if(this.sending())return;this.clinicId.set(id);this.selectedStart.set('');this.formOpen.set(false);this.consent=false;void this.loadSlots();}
 changeDate(date:string){if(this.sending()||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date+'T12:00:00Z'))||new Date(date+'T12:00:00Z').toISOString().slice(0,10)!==date)return;this.date=date;this.selectedStart.set('');void this.loadSlots();}
 navigate(delta:number){this.changeDate(addDays(this.date,delta*7));}
 async loadSlots(){const g=++this.slotsGeneration,id=this.id(),clinic=this.clinicId(),date=this.date;this.updateClock();this.chosenDay.set('');this.slotsBusy.set(true);this.returnedDays.set([]);this.slotError.set('');if(!clinic){this.slotsBusy.set(false);return;}try{const result=await firstValueFrom(this.api.availability(id,clinic,date,this.specialtyContextId()||undefined));if(g===this.slotsGeneration&&id===this.id()&&clinic===this.clinicId()&&date===this.date){this.updateClock();this.returnedDays.set(result.days);}}catch(err){if(g===this.slotsGeneration)this.slotError.set(this.message(err,'No pudimos consultar los horarios.'));}finally{if(g===this.slotsGeneration)this.slotsBusy.set(false);}}
 selectSlot(start:string){this.updateClock();if(!isFutureSlot(start,Date.now())||this.sending()||!this.days().some(d=>d.slots.some(s=>s.start===start)))return;this.selectedStart.set(start);this.formOpen.set(true);this.conflict.set(false);this.formError.set('');this.focusHeading('public-form-title');}
 canReviewBooking(){return !this.sending()&&!this.conflict()&&isFutureSlot(this.selectedStart(),this.now())&&this.days().some(d=>d.slots.some(s=>s.start===this.selectedStart()))&&!this.pickers().some(p=>p.error());}
 canSubmit(){return this.canReviewBooking()&&this.consent;}
 private focusHeading(id: string): void {
  afterNextRender(() => this.host.nativeElement.querySelector<HTMLElement>('#' + id)?.focus(), { injector: this.injector });
 }
 async submit(){
  this.updateClock();
  const profile=this.profile();if(!profile||!this.canSubmit()||!this.contactPhone)return;const id=this.id(),g=this.generation;
  const body:PublicBookingDraft={...(this.specialtyContextId()?{specialtyContextId:this.specialtyContextId()}:{}),clinicId:this.clinicId(),start:this.selectedStart(),formVersion:profile.form.version,contactName:this.contactName.trim(),attendeeName:this.different?this.attendeeName.trim():this.contactName.trim(),contactPhone:this.contactPhone ?? '',documentCountry:'AR',documentType:'DNI',document:this.document.trim(),email:this.email.trim(),answers:{...this.answers}};
  const payload=JSON.stringify(body);if(this.attempt?.payload!==payload)this.attempt={payload,key:crypto.randomUUID()};const key=this.attempt.key;this.sending.set(true);this.formError.set('');this.status.set('Verificando la solicitud…');this.controller=new AbortController();
  try{const challenge=await firstValueFrom(this.api.challenge());const solution=await solveProof(challenge.token,challenge.difficulty,this.controller.signal);if(g!==this.generation||id!==this.id())return;if(!isFutureSlot(body.start,Date.now())){this.sending.set(false);this.updateClock();return;}this.status.set('Confirmando tu turno…');const confirmation=await firstValueFrom(this.api.book(id,body,challenge.token,solution,key));if(g!==this.generation||id!==this.id())return;if(confirmation.verificationRequestId && confirmation.maskedEmail){
   this.api.setPortalDraft({requestId:confirmation.verificationRequestId,document:body.document,reference:confirmation.reference,maskedEmail:confirmation.maskedEmail});
  }else this.api.setPortalDraft(null);
  this.confirmation.set(confirmation);this.focusHeading('confirmation-title');this.confirmationDoctorId.set(id);this.formOpen.set(false);this.attempt=null;this.document='';this.email='';this.contactPhone=null;this.answers={};this.consent=false;}
  catch(err){if(g!==this.generation||id!==this.id())return;const e=err as {status?:number;error?:{code?:string}};this.formError.set(this.message(err,'No pudimos confirmar. Tus datos se conservaron; reintentá con el mismo formulario.',true));if(e.status===409){this.conflict.set(true);if(e.error?.code==='FORM_VERSION_CONFLICT'){this.sending.set(false);await this.loadProfile(true)}else await this.loadSlots();}}
  finally{if(g===this.generation){this.sending.set(false);this.status.set('');}}
 }
}
