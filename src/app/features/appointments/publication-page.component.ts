import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, ElementRef, Injector, afterNextRender, effect, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideIdCard, lucideLockKeyhole, lucideMail, lucidePhone, lucideUserRound } from '@ng-icons/lucide';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { Clinic, TeleconsultationSetting, modalityLabel, parseClinicHttpError } from '../clinics/clinics.models';
import { ClinicsService } from '../clinics/clinics.service';
import { Publication } from './appointments.models';
import { AppointmentsService } from './appointments.service';
import { SchedulesService } from '../schedules/schedules.service';
import { ClinicSchedule } from '../schedules/schedules.models';
import { civilDate } from '../calendar/bookings.models';

const emptyPublication = (): Publication => ({
  version: '0', name: '', description: '', published: false, clinics: [], questions: [],
});

@Component({
  selector: 'app-publication-page',
  imports: [FormsModule, RouterLink, NgTemplateOutlet, NgIcon],
  providers: [provideIcons({ lucideIdCard, lucideLockKeyhole, lucideMail, lucidePhone, lucideUserRound })],
  templateUrl: './publication-page.component.html',
  styleUrl: './publication-page.component.css',
})
export class PublicationPageComponent {
  readonly workspace = inject(WorkspaceStore);
  private readonly api = inject(AppointmentsService);
  private readonly clinicsApi = inject(ClinicsService);
  private readonly auth = inject(AuthService);
  private readonly schedules = inject(SchedulesService);
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private readonly editorTitle = viewChild<ElementRef<HTMLElement>>('editorTitle');
  private readonly pageTitle = viewChild<ElementRef<HTMLElement>>('pageTitle');
  private generation = 0;
  private owner: string | null = null;
  private saved = emptyPublication();
  private teleconsultations: TeleconsultationSetting[] | null = null;
  private hours = new Map<string, ClinicSchedule>();
  clinics: Clinic[] = [];

  readonly publicLinkId = signal<string | null>(null);
  readonly published = signal(false);
  readonly hasPublication = signal(false);
  readonly stage = signal<'overview' | 'offer' | 'profile' | 'questions' | 'review' | 'pause'>('overview');
  readonly loaded = signal(false);
  readonly busy = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly feedback = signal('');
  readonly conflict = signal(false);
  draft = emptyPublication();

  constructor() {
    effect(() => {
      const user = this.auth.currentUser()?.id ?? null;
      if (user === this.owner) return;
      this.owner = user;
      this.generation++;
      this.loaded.set(false);
      this.busy.set(false);
      this.saving.set(false);
      this.error.set('');
      this.feedback.set('');
      this.conflict.set(false);
      this.publicLinkId.set(null);
      this.published.set(false);
      this.hasPublication.set(false);
      this.stage.set('overview');
      this.saved = emptyPublication();
      this.clinics = [];
      this.hours = new Map();
      this.teleconsultations = null;
      this.draft = emptyPublication();
      if (user) void this.load();
    });
    inject(DestroyRef).onDestroy(() => this.generation++);
  }

  async load() {
    const generation = ++this.generation;
    const isCurrent = () => this.isCurrent(generation);
    this.busy.set(true);
    this.error.set('');
    this.feedback.set('');
    try {
      const [publication, , teleconsultations] = await Promise.all([
        firstValueFrom(this.api.publication()),
        this.workspace.loadContexts(),
        firstValueFrom(this.clinicsApi.listTeleconsultations()).catch(() => null),
      ]);
      const clinics: Clinic[] = [];
      const size = 100;
      for (let page = 0; isCurrent(); page++) {
        const result = await firstValueFrom(this.clinicsApi.listClinics({ page, size }));
        clinics.push(...result.items);
        if (clinics.length >= result.totalElements || result.items.length === 0) break;
      }
      const schedules = await Promise.all(clinics.filter(clinic => clinic.status === 'ACTIVE').map(async clinic => {
        try { return [clinic.id, await firstValueFrom(this.schedules.get(clinic.id))] as const; }
        catch { return null; }
      }));
      if (!isCurrent()) return;
      this.clinics = clinics;
      this.teleconsultations = teleconsultations;
      this.hours = new Map(schedules.filter(item => item !== null));
      this.setSavedPublication(publication);
      this.stage.set('overview');
      this.conflict.set(false);
      this.loaded.set(true);
    } catch (err) {
      if (isCurrent()) {
        this.error.set(parseClinicHttpError(err, 'No pudimos cargar la configuración de reservas.').userMessage);
      }
    } finally {
      if (isCurrent()) this.busy.set(false);
    }
  }

  toggleContext(id: string, enabled: boolean) {
    const ids = this.draft.specialtyContextIds ?? [];
    this.draft.specialtyContextIds = enabled ? [...new Set([...ids, id])] : ids.filter(value => value !== id);
  }

  addQuestion() {
    if (this.draft.questions.length < 8) {
      this.draft.questions.push({
        key: 'q_' + crypto.randomUUID().replaceAll('-', ''),
        label: '',
        required: false,
      });
    }
  }

  setStage(stage: ReturnType<typeof this.stage>) {
    this.stage.set(stage);
    this.error.set('');
    afterNextRender(() => (stage === 'overview' ? this.pageTitle() : this.editorTitle())?.nativeElement.focus(), { injector: this.injector });
  }

  cancelEdit() {
    this.draft = structuredClone(this.saved);
    this.setStage('overview');
  }

  clinic(id: string) { return this.clinics.find(clinic => clinic.id === id); }
  activeClinics() {
    return this.draft.clinics.filter(entry => this.clinic(entry.clinicId)?.status === 'ACTIVE');
  }
  publicAddress(id: string) { return this.draft.clinics.find(entry => entry.clinicId === id)?.address; }
  isVirtual(id: string) { return this.clinic(id)?.modality === 'TELECONSULTATION'; }
  clinicName(id: string) { return this.isVirtual(id) ? 'Teleconsulta' : this.clinic(id)?.name ?? 'Consultorio'; }
  readonly modalityLabel = modalityLabel;

  offer(publication = this.saved) {
    const chosen = this.clinics.filter(clinic => clinic.status === 'ACTIVE' && publication.clinics.some(entry => entry.clinicId === clinic.id && entry.enabled));
    return this.workspace.contexts().filter(context => publication.specialtyContextIds?.includes(String(context.id))).map(context => {
      const id = String(context.id);
      const assigned = chosen.filter(clinic => this.assignedTo(clinic, id));
      const ready = context.ready ? assigned.filter(clinic => this.hasHours(clinic, id)) : [];
      const missing = context.ready ? assigned.filter(clinic => this.hours.has(clinic.id) && !this.hasHours(clinic, id)) : [];
      const unverified = context.ready && (assigned.some(clinic => !this.hours.has(clinic.id)) ||
        (this.teleconsultations === null && chosen.some(clinic => this.isVirtual(clinic.id))));
      return { id, name: context.specialty.name, ready, missing, unverified, configured: context.ready };
    });
  }

  private assignedTo(clinic: Clinic, id: string) {
    if (this.isVirtual(clinic.id)) {
      return this.teleconsultations?.some(item => item.enabled && item.clinicId === clinic.id && item.specialtyContextId === id) ?? false;
    }
    return clinic.specialtyContextIds?.some(context => String(context) === id) ?? true;
  }

  private hasHours(clinic: Clinic, id: string) {
    const schedule = this.hours.get(clinic.id);
    if (!schedule) return false;
    const today = civilDate(new Date().toISOString(), clinic.timezone);
    const matches = (range: {specialtyContextId?: string}) => String(range.specialtyContextId) === id;
    return schedule.weekly.some(day => day.ranges.some(matches)) ||
      schedule.exceptions.some(exception => exception.through >= today && exception.ranges.some(matches));
  }

  async copyLink(id: string, specialtyId?: string) {
    const browser = this.document.defaultView;
    if (!browser) return;
    const url = new URL('/appointments/' + encodeURIComponent(id), browser.location.origin);
    if (specialtyId) url.searchParams.set('specialtyContextId', specialtyId);
    try {
      await browser.navigator.clipboard.writeText(url.href);
      this.feedback.set('Enlace copiado.');
    } catch {
      this.feedback.set('Abrí la página de reservas para copiar su dirección.');
    }
  }

  async save(publish: boolean = this.published()) {
    if (!this.loaded() || this.saving() || this.busy() || this.conflict()) return;
    if (publish && !this.draft.specialtyContextIds?.length) {
      this.error.set('Elegí al menos una especialidad para habilitar reservas online.');
      return;
    }
    if (publish && !this.offer(this.draft).some(row => row.ready.length || row.unverified)) {
      this.error.set('Elegí una agenda activa que tenga horarios para alguna de las especialidades seleccionadas.');
      return;
    }
    if (!this.draft.name.trim()) {
      this.setStage('profile');
      this.error.set('Ingresá el nombre que verán tus pacientes.');
      return;
    }
    if (this.draft.questions.some(question => !question.label.trim())) {
      this.setStage('questions');
      this.error.set('Completá el texto de las preguntas adicionales.');
      return;
    }
    if (this.draft.clinics.some(entry => entry.enabled && !this.isVirtual(entry.clinicId) && !entry.address.trim())) {
      this.setStage('profile');
      this.error.set('Completá las direcciones públicas de los consultorios seleccionados.');
      return;
    }
    const generation = this.generation;
    this.saving.set(true);
    this.error.set('');
    this.feedback.set('');
    try {
      const publication = await firstValueFrom(this.api.savePublication({ ...structuredClone(this.draft), published: publish }));
      if (!this.isCurrent(generation)) return;
      this.setSavedPublication(publication);
      this.setStage('overview');
      this.feedback.set(publication.published ? 'Reservas online activas.' : 'Cambios guardados. Las reservas online están pausadas.');
    } catch (err) {
      if (this.isCurrent(generation)) {
        const parsed = parseClinicHttpError(err, 'No se pudo guardar. Los campos ingresados se conservaron.');
        this.error.set(parsed.userMessage);
        if (parsed.isVersionConflict) this.conflict.set(true);
      }
    } finally {
      if (this.isCurrent(generation)) this.saving.set(false);
    }
  }

  private isCurrent(generation: number): boolean {
    return generation === this.generation && this.owner === this.auth.currentUser()?.id;
  }

  private setSavedPublication(publication: Publication) {
    this.publicLinkId.set(publication.published ? publication.publicId ?? null : null);
    this.published.set(publication.published);
    const metadata = this.auth.currentUser()?.user_metadata;
    const accountName = metadata?.['full_name'] ?? metadata?.['name'];
    this.hasPublication.set(publication.version !== '0');
    this.saved = {
      ...publication,
      name: publication.name || (typeof accountName === 'string' && !accountName.includes('@') ? accountName.trim().slice(0, 160) : ''),
      clinics: this.clinics.map(clinic =>
        publication.clinics.find(entry => entry.clinicId === clinic.id)
        ?? { clinicId: clinic.id, enabled: false, address: clinic.modality === 'TELECONSULTATION' ? '' : clinic.address },
      ),
    };
    this.draft = structuredClone(this.saved);
  }
}
