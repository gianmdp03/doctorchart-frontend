import { InteractionStatusService } from '../../core/services/interaction-status.service';
import {
  DOCUMENT,
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBuilding2,
  lucideCalendarDays,
  lucideRefreshCw,
  lucideUserRound,
  lucideCheck,
  lucideLogIn,
  lucideCircleCheck,
  lucideCircleMinus,
  lucideX,
  lucideCalendarX,
} from '@ng-icons/lucide';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  addDays,
  civilDate,
  displayDay,
  localTime,
  BOOKING_SUCCESS_MESSAGES,
  STATUS_LABELS,
  transitions,
  BookingStatus,
} from '../calendar/bookings.models';
import { modalityLabel } from '../clinics/clinics.models';
import {
  AdministrativeBooking,
  Assignment,
  SlotDay,
  StaffPermission,
  StaffService,
  staffError,
} from './staff.service';
import { monday } from '../calendar/agenda-timeline';
import { AgendaComponent } from '../calendar/agenda.component';

<<<<<<< Updated upstream
@Component({
  selector: 'app-staff-calendar',
  imports: [FormsModule, RouterLink, AgendaComponent, NgIcon],
  providers: [
    provideIcons({
      lucideBuilding2,
      lucideCalendarDays,
      lucideRefreshCw,
      lucideUserRound,
      lucideCheck,
      lucideLogIn,
      lucideCircleCheck,
      lucideCircleMinus,
      lucideX,
      lucideCalendarX,
    }),
  ],
  styleUrls: ['./staff.css', '../calendar/agenda-page.css', './staff-calendar.component.css'],
  templateUrl: './staff-calendar.component.html',
})
=======
@Component({selector:'app-staff-calendar',imports:[FormsModule,RouterLink,DatePickerComponent],styleUrl:'./staff.css',template:`
<main class="staff-page"><header class="actions"><a routerLink="/">Doctor Chart</a><span>Agenda de secretaría</span><button (click)="logout()" [disabled]="writing()">Cerrar sesión</button></header>
<div class="page-heading"><h1>Agenda de consultorios</h1><p>Gestioná turnos únicamente dentro de tus asignaciones. Este acceso no incluye historias clínicas.</p></div>
@if(activationRecovery()){<details><summary>Guardar un código de recuperación (opcional)</summary><p>Podés guardarlo ahora para recuperar tu cuenta si no tenés acceso al correo. Es personal: no lo compartas.</p><code class="recovery">{{activationRecovery()}}</code><button (click)="activationRecovery.set('')">Cerrar</button></details>}
@if(error()){<p class="error" role="alert">{{error()}}</p>}@if(feedback()){<p class="success" role="status">{{feedback()}}</p>}
<div class="toolbar"><div class="assignment-control">
 <label>Consultorio asignado<select aria-label="Consultorio asignado" [attr.aria-describedby]="selectedAssignment() ? 'staff-assignment-summary' : null" [ngModel]="assignmentKey" (ngModelChange)="changeAssignment($event)" [disabled]="writing()">
  <option value="">Seleccioná un consultorio</option>
  @for(a of assignments();track key(a)){<option [value]="key(a)">{{a.doctorName||'Profesional asignado'}} · {{a.clinicName}} · {{modalityLabel(a.modality)}}</option>}
 </select></label>
 @if(selectedAssignment();as assignment){
  <p id="staff-assignment-summary" class="assignment-summary"><span>{{assignment.doctorName||'Profesional asignado'}}</span><span>{{assignment.clinicName}} · {{modalityLabel(assignment.modality)}}</span></p>
 }
</div>
<label>Fecha<app-date-picker inputId="staff-date" [value]="date" (valueChange)="changeDate($event)" /></label><label>Vista<select [(ngModel)]="view" (ngModelChange)="load()"><option value="1">Día</option><option value="7">Semana</option></select></label>
<button (click)="refresh()" [disabled]="loading()||writing()">Actualizar permisos y agenda</button></div>
@if(loading()){<p role="status">Consultando agenda…</p>}@else if(!assignments().length){<p>No tenés agendas habilitadas. Consultá con el médico que te invitó.</p>}
@if(selectedAssignment();as a){<p class="muted">Hora local del consultorio. @if(!can('view')){Actualizá la agenda para renovar los permisos.}</p>
<div class="grid" [class.has-editor]="editor()"><section class="panel" aria-label="Agenda administrativa">@for(day of days();track day.date){<section class="day"><h2>{{displayDay(day.date)}}</h2>
@for(b of dayBookings(day.date);track b.id){<button class="booking" [class.cancelled]="b.status==='CANCELLED'" [attr.data-status]="b.status" (click)="selectBooking(b)" [disabled]="writing()||!can('view')"><strong>{{bookingTime(b)}} · {{b.attendeeName||b.contactName}}</strong><span>{{b.specialty?.name||'Especialidad sin registro histórico'}} · {{b.clinicSnapshot?.name||a.clinicName}} @if((b.clinicSnapshot?.modality||a.modality)==='TELECONSULTATION'){· Teleconsulta}</span><small>{{labels[b.status]}} · {{b.contactName}}</small></button>}
<div class="slot-list">@for(slot of day.slots;track slot.start){<button [attr.aria-pressed]="start===slot.start" (click)="chooseSlot(slot.start)" [disabled]="writing()||!can(editor()==='move'?'reschedule':'create')">{{time(slot.start)}} · Disponible</button>}</div>
@if(!day.slots.length&&!dayBookings(day.date).length){<p class="muted">Sin turnos ni horarios disponibles.</p>}</section>}</section>
@if(editor()){<aside class="panel editor">@if(editor()==='create'){<h2>Nuevo turno</h2><p>{{time(start)}} · {{a.clinicName}}</p><form (ngSubmit)="create()" #form="ngForm"><fieldset [disabled]="writing()"><legend class="sr-only">Datos administrativos</legend>
<label>Nombre del solicitante<input name="contact" [(ngModel)]="contactName" required maxlength="160" autocomplete="name" /></label><label>Teléfono<input name="phone" [(ngModel)]="contactPhone" type="tel" maxlength="80" autocomplete="tel" /></label><label>Nombre de quien será atendido<input name="attendee" [(ngModel)]="attendeeName" required maxlength="160" /></label>
<p>Este turno no crea un paciente ni una historia clínica.</p>@if(editorError()){<p class="error" role="alert">{{editorError()}}</p>}<button type="submit" [disabled]="writing()||form.invalid||!can('create')">{{writing()?'Guardando…':'Confirmar turno'}}</button><button type="button" (click)="closeEditor()">Cerrar</button></fieldset></form>}
@if(selected();as b){<h2>{{b.attendeeName||b.contactName}}</h2><p>{{displayDay(civilDate(b.start,b.clinicSnapshot?.timezone||a.timezone))}} · {{bookingTime(b)}} · {{labels[b.status]}}</p><p>{{b.specialty?.name||'Especialidad sin registro histórico'}} · {{b.clinicSnapshot?.name||a.clinicName}}</p><p>Solicitante: {{b.contactName}}<br />Teléfono: {{b.contactPhone||'Sin teléfono'}}</p>
@if(editorError()){<p class="error" role="alert">{{editorError()}}</p>}
<div class="actions">@for(state of transitions(b.status);track state){<button [disabled]="writing()||!can(state==='CANCELLED'?'cancel':'status')" (click)="status(state)">{{labels[state]}}</button>}@if(b.status==='CONFIRMED'){<button [disabled]="writing()||!can('reschedule')" (click)="beginMove()">Reprogramar</button>}<button (click)="closeEditor()" [disabled]="writing()">Cerrar</button></div>
@if(editor()==='move'){<p>Seleccioná un horario disponible en la agenda para reprogramar. Podés cambiar la fecha.</p>@if(start){<p>Nuevo horario: {{time(start)}}</p><button class="dc-button dc-button--primary primary" (click)="move()" [disabled]="writing()||!can('reschedule')">Confirmar reprogramación</button>}}
}</aside>}</div>}
<details><summary>Cambiar contraseña</summary><form (ngSubmit)="password()"><label>Contraseña actual<input type="password" name="currentPassword" [(ngModel)]="currentPassword" autocomplete="current-password" required /></label><label>Contraseña nueva<input type="password" name="newPassword" [(ngModel)]="newPassword" autocomplete="new-password" required minlength="12" maxlength="72" /></label><button type="submit" [disabled]="writing()">Actualizar contraseña</button></form></details>
</main>`})
>>>>>>> Stashed changes
export class StaffCalendarComponent {
  private readonly interaction = inject(InteractionStatusService);
  protected readonly api = inject(StaffService);
  private readonly router = inject(Router);
  private readonly destroy = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private readonly agenda = viewChild(AgendaComponent);
  private readonly editorHeading = viewChild<ElementRef<HTMLElement>>('editorHeading');
  private editorTrigger: HTMLElement | null = null;
  readonly activationRecovery = this.api.activationRecovery ?? signal('');
  readonly assignments = signal<Assignment[]>([]);
  readonly days = signal<SlotDay[]>([]);
  readonly bookings = signal<AdministrativeBooking[]>([]);
  readonly selectedAssignment = signal<Assignment | null>(null);
  readonly selected = signal<AdministrativeBooking | null>(null);
  readonly editor = signal<'create' | 'detail' | 'move' | null>(null);
  readonly loading = signal(false);
  readonly writing = signal(false);
  readonly error = signal('');
  readonly editorError = signal('');
  readonly now = signal(Date.now());
  readonly passwordOpen = signal(false);
  readonly date = signal(civilDate(new Date().toISOString(), 'America/Argentina/Buenos_Aires'));
  readonly view = signal<'1' | '7'>(
    this.document.defaultView?.matchMedia?.('(max-width: 640px)').matches ? '1' : '7',
  );
  readonly rangeStart = computed(() => (this.view() === '7' ? monday(this.date()) : this.date()));
  readonly rangeEnd = computed(() => addDays(this.rangeStart(), Number(this.view()) - 1));
  readonly calendarKey = computed(() => {
    const assignment = this.selectedAssignment();
    return assignment ? [this.key(assignment), this.rangeStart(), this.view()].join('|') : '';
  });
  readonly loadedRange = signal('');
  readonly zone = computed(
    () => this.selectedAssignment()?.timezone ?? 'America/Argentina/Buenos_Aires',
  );
  readonly today = computed(() => civilDate(new Date(this.now()).toISOString(), this.zone()));
  readonly statusIcons: Record<BookingStatus, string> = {
    CONFIRMED: 'lucideCheck',
    CHECKED_IN: 'lucideLogIn',
    COMPLETED: 'lucideCircleCheck',
    NO_SHOW: 'lucideCircleMinus',
    CANCELLED: 'lucideX',
  };
  readonly actionLabels: Partial<Record<BookingStatus, string>> = {
    CHECKED_IN: 'Registrar llegada',
    COMPLETED: 'Marcar como atendido',
    NO_SHOW: 'Marcar como ausente',
    CANCELLED: 'Cancelar turno',
  };
  readonly labels = STATUS_LABELS;
  readonly transitions = transitions;
  readonly displayDay = displayDay;
  readonly civilDate = civilDate;
  assignmentKey = '';
  start = '';
  contactName = '';
  attendeeName = '';
  contactPhone = '';
  currentPassword = '';
  newPassword = '';
  private firstAssignments = true;
  private epoch = 0;
  private receipt: { signature: string; key: string } | null = null;
  private refreshEpoch = 0;
  constructor() {
    void this.refresh();
    let ticks = 0;
    const timer = setInterval(() => {
      this.now.set(Date.now());
      if (++ticks % 30 === 0 && !this.writing() && !this.loading()) void this.refresh(true);
    }, 1000);
    this.destroy.onDestroy(() => {
      clearInterval(timer);
      this.epoch++;
      this.refreshEpoch++;
    });
  }
  key(a: Assignment) {
    return a.ownerId + '|' + a.clinicId;
  }
  readonly modalityLabel = modalityLabel;
  readonly allowSlot = () => this.can(this.editor() === 'move' ? 'reschedule' : 'create');
  readonly isMoveSlot = (slot: SlotDay['slots'][number]) =>
    this.editor() === 'move' ? this.start === slot.start : null;
  can(p: StaffPermission) {
    const a = this.selectedAssignment();
    return !!a && a.permissions.includes(p) && Date.parse(a.validUntil) > this.now();
  }
  bookingTime(b: AdministrativeBooking) {
    return localTime(
      b.start,
      b.clinicSnapshot?.timezone || this.selectedAssignment()?.timezone || 'UTC',
    );
  }
  time(instant: string) {
    return localTime(instant, this.selectedAssignment()?.timezone ?? 'UTC');
  }
  async refresh(background = false) {
    const generation = ++this.refreshEpoch;
    if (!background) this.loading.set(true);
    try {
      const result = await this.api.assignments();
      if (generation !== this.refreshEpoch) return;
      this.assignments.set(result.items);
      if (this.firstAssignments) {
        this.firstAssignments = false;
        const first =
          result.items.find((item) => item.permissions.includes('view')) ?? result.items[0];
        if (first && !this.assignmentKey) {
          this.assignmentKey = this.key(first);
          this.date.set(civilDate(new Date(this.now()).toISOString(), first.timezone));
        }
      }
      const assignment = result.items.find((item) => this.key(item) === this.assignmentKey);
      this.selectedAssignment.set(assignment ?? null);
      if (!assignment || !this.can('view')) this.clearCalendar();
      else if (!this.writing() && (!background || !this.loading())) await this.load(background);
      else if (!background) this.loading.set(false);
    } catch (error) {
      if (generation === this.refreshEpoch) this.invalidate(error);
    }
  }
  private clearCalendar() {
    this.epoch++;
    this.loadedRange.set('');
    this.days.set([]);
    this.bookings.set([]);
    this.loading.set(false);
    this.resetEditor();
    this.clearCreateDraft();
  }
  changeAssignment(key: string) {
    if (this.writing()) return;
    this.assignmentKey = key;
    this.selectedAssignment.set(this.assignments().find((a) => this.key(a) === key) ?? null);
    this.clearCalendar();
    void this.load();
  }
  changeView(view: '1' | '7', date = this.date()) {
    if (this.writing() || view === this.view()) return;
    this.view.set(view);
    this.date.set(date);
    void this.load();
  }
  changeDate(value: string) {
    const parsed = new Date(value + 'T12:00:00Z');
    if (
      this.writing() ||
      value === this.date() ||
      !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
      value.startsWith('0000-') ||
      Number.isNaN(+parsed) ||
      parsed.toISOString().slice(0, 10) !== value
    )
      return;
    const previous = this.rangeStart();
    this.date.set(value);
    if (previous !== this.rangeStart()) void this.load();
  }
  async load(background = false) {
    const a = this.selectedAssignment();
    if (!a || !this.can('view')) return;
    const generation = ++this.epoch;
    const requestedRange = this.calendarKey();
    if (!background) this.loading.set(true);
    this.error.set('');
    try {
      const rangeStart = this.rangeStart(),
        length = Number(this.view());
      const from = new Date(rangeStart + 'T00:00:00Z');
      from.setUTCHours(from.getUTCHours() - 26);
      const to = new Date(addDays(rangeStart, length) + 'T00:00:00Z');
      to.setUTCHours(to.getUTCHours() + 26);
      const [availability, first] = await Promise.all([
        this.api.availability(a, rangeStart, length),
        this.api.bookings(a, from.toISOString(), to.toISOString()),
      ]);
      let items = first.items;
      let more = first.hasMore;
      let page = 0;
      while (more) {
        const next = await this.api.bookings(a, from.toISOString(), to.toISOString(), ++page);
        items = [...items, ...next.items];
        more = next.hasMore;
        if (generation !== this.epoch) return;
      }
      if (generation !== this.epoch) return;
      this.days.set(availability.days);
      this.bookings.set(items);
      this.loadedRange.set(requestedRange);
    } catch (e) {
      if (generation !== this.epoch) return;
      this.days.set([]);
      this.bookings.set([]);
      this.invalidate(e);
    } finally {
      if (generation === this.epoch) this.loading.set(false);
    }
  }
  chooseSlot(start: string, trigger?: EventTarget | null) {
    if (this.writing() || !this.can(this.editor() === 'move' ? 'reschedule' : 'create')) return;
    this.start = start;
    if (this.editor() !== 'move') {
      this.selected.set(null);
      this.editor.set('create');
      this.focusEditor(trigger);
    }
    this.editorError.set('');
  }
  selectBooking(b: AdministrativeBooking, trigger?: EventTarget | null) {
    if (this.writing() || !this.can('view')) return;
    this.selected.set(b);
    this.editor.set('detail');
    this.editorError.set('');
    this.start = '';
    this.focusEditor(trigger);
  }
  private focusEditor(trigger?: EventTarget | null) {
    this.editorTrigger = (trigger as HTMLElement | null) ?? null;
    afterNextRender(() => this.editorHeading()?.nativeElement.focus(), { injector: this.injector });
  }
  beginMove() {
    this.editor.set('move');
    this.start = '';
    this.editorError.set('');
  }
  closeEditor() {
    if (!this.writing()) this.resetEditor();
  }
  private resetEditor() {
    this.selected.set(null);
    this.editor.set(null);
    this.start = '';
    this.editorError.set('');
    this.receipt = null;
  }
  private clearCreateDraft() {
    this.contactName = '';
    this.attendeeName = '';
    this.contactPhone = '';
  }
  dismissEditor() {
    this.closeEditor();
    if (this.editorTrigger?.isConnected) this.editorTrigger.focus();
      else this.agenda()?.focusBoard();
    this.editorTrigger = null;
  }
  private async write(
    permission: keyof typeof BOOKING_SUCCESS_MESSAGES,
    body: unknown,
    fn: (key: string) => Promise<unknown>,
  ) {
    if (this.writing() || this.loading() || !this.can(permission)) return;
    const a = this.selectedAssignment()!;
    const generation = this.epoch;
    const signature = JSON.stringify([this.key(a), permission, body]);
    if (this.receipt?.signature !== signature)
      this.receipt = { signature, key: crypto.randomUUID() };
    this.writing.set(true);
    this.editorError.set('');
    try {
      await fn(this.receipt.key);
      this.receipt = null;
      this.writing.set(false);
      if (generation === this.epoch) {
        if (permission === 'create') this.clearCreateDraft();
        this.interaction.notifySuccess(BOOKING_SUCCESS_MESSAGES[permission]);
        this.dismissEditor();
        await this.load();
      }
    } catch (e) {
      if (generation === this.epoch) {
        this.editorError.set(staffError(e));
        if ((e as { status?: number }).status === 409) {
          this.receipt = null;
          await this.load();
        }
        if ([401, 403].includes((e as { status: number }).status)) this.invalidate(e);
      }
    } finally {
      this.writing.set(false);
    }
  }
  create() {
    const a = this.selectedAssignment();
    if (!a || !this.start) return;
    const body = {
      clinicId: a.clinicId,
      start: this.start,
      contactName: this.contactName.trim(),
      contactPhone: this.contactPhone.trim(),
      attendeeName: this.attendeeName.trim(),
    };
    return this.write('create', body, (key) => this.api.create(a, body, key));
  }
  status(state: BookingStatus) {
    const a = this.selectedAssignment(),
      b = this.selected();
    if (!a || !b) return;
    return this.write(
      state === 'CANCELLED' ? 'cancel' : 'status',
      [b.id, b.version, state],
      (key) => this.api.status(a, b, state, key),
    );
  }
  move() {
    const a = this.selectedAssignment(),
      b = this.selected();
    if (!a || !b || !this.start) return;
    return this.write('reschedule', [b.id, b.version, this.start], (key) =>
      this.api.reschedule(a, b, a.clinicId, this.start, key),
    );
  }
  private invalidate(e: unknown) {
    this.error.set(staffError(e));
    this.assignments.set([]);
    this.selectedAssignment.set(null);
    this.clearCalendar();
    if ((e as { status: number }).status === 401) {
      this.api.session.set(null);
      void this.router.navigateByUrl('/staff/login');
    }
  }
  async logout() {
    if (this.writing()) return;
    try {
      await this.api.logout();
      await this.router.navigateByUrl('/staff/login');
    } catch (e) {
      this.error.set(staffError(e));
    }
  }
  async password() {
    if (this.writing()) return;
    this.writing.set(true);
    try {
      await this.api.changePassword(this.currentPassword, this.newPassword);
      this.currentPassword = '';
      this.newPassword = '';
      this.passwordOpen.set(false);
      this.interaction.notifySuccess(
        'Contraseña actualizada. Las otras sesiones fueron revocadas.',
      );
    } catch (e) {
      this.error.set(staffError(e));
    } finally {
      this.writing.set(false);
    }
  }
}
