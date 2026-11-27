import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideAlertCircle,
  lucideCalendar,
  lucideClock,
  lucideMessageCircle,
  lucidePencil,
  lucidePlus,
  lucideTrash2,
} from '@ng-icons/lucide';
import { formatInstant, instantParts, todayDate } from '../../../core/date/user-time-zone';
import { textError } from '../../../core/models/form-validation';
import { WhatsAppConsultation } from '../../../core/models/whatsapp-consultation.model';
import { DatePickerComponent } from '../../../shared/date-picker/date-picker.component';
import { TimePickerComponent } from '../../../shared/time-picker/time-picker.component';
import { AnnulmentPromptComponent } from '../annulment-prompt.component';
import { PatientWhatsappConsultationsStore } from './patient-whatsapp-consultations.store';

const MAX_WHATSAPP_CONTENT = 20000;

@Component({
  selector: 'app-patient-whatsapp-consultations',
  imports: [
    FormsModule,
    NgIcon,
    DatePickerComponent,
    TimePickerComponent,
    AnnulmentPromptComponent,
  ],
  providers: [
    provideIcons({
      lucideMessageCircle,
      lucidePlus,
      lucideClock,
      lucideCalendar,
      lucidePencil,
      lucideTrash2,
      lucideAlertCircle,
    }),
  ],
  templateUrl: './patient-whatsapp-consultations.component.html',
  styleUrl: './patient-whatsapp-consultations.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientWhatsappConsultationsComponent {
  readonly store = inject(PatientWhatsappConsultationsStore);
  readonly patientId = input.required<number>();

  readonly todayIso = computed(() => todayDate());
  readonly hasConsultations = computed(() => this.store.consultations().length > 0);

  readonly dateError = computed(() => this.validateDate(this.store.draftDate()));
  readonly timeError = computed(() => this.validateTime(this.store.draftTime()));
  readonly instantResult = computed(() =>
    this.resolveConsultedAt(
      this.store.draftDate(),
      this.store.draftTime(),
      this.store.draftExactInstant(),
    ),
  );
  readonly contentError = computed(() =>
    textError(this.store.draftContent(), MAX_WHATSAPP_CONTENT, true),
  );
  readonly canSubmitCreate = computed(
    () =>
      !this.store.isSaving() &&
      !this.dateError() &&
      !this.timeError() &&
      !this.instantResult().error &&
      !this.contentError(),
  );

  // Inline correction state for an existing record
  readonly editDate = signal('');
  readonly editTime = signal('');
  readonly editExactInstant = signal<string | null>(null);
  readonly editContent = signal('');
  readonly editReason = signal('');

  readonly editDateError = computed(() => this.validateDate(this.editDate()));
  readonly editTimeError = computed(() => this.validateTime(this.editTime()));
  readonly editInstantResult = computed(() =>
    this.resolveConsultedAt(this.editDate(), this.editTime(), this.editExactInstant()),
  );
  readonly editContentError = computed(() =>
    textError(this.editContent(), MAX_WHATSAPP_CONTENT, true),
  );
  readonly editReasonError = computed(() => textError(this.editReason(), 1000, false));
  readonly canSubmitEdit = computed(
    () =>
      !this.store.isUpdating() &&
      !this.editDateError() &&
      !this.editTimeError() &&
      !this.editInstantResult().error &&
      !this.editContentError() &&
      !this.editReasonError(),
  );

  openCreateForm(): void {
    this.store.openForm();
  }

  cancelCreateForm(): void {
    this.store.cancelForm();
  }

  useCurrentDateTime(): void {
    const now = new Date();
    const parts = instantParts(now);
    this.store.draftDate.set(parts.day);
    this.store.draftTime.set(parts.time);
    this.store.draftExactInstant.set(now.toISOString());
    this.store.saveError.set(null);
  }

  onDateChange(value: string): void {
    this.store.draftDate.set(value);
    this.store.draftExactInstant.set(null);
    this.store.saveError.set(null);
  }

  onTimeChange(value: string): void {
    this.store.draftTime.set(value);
    this.store.draftExactInstant.set(null);
    this.store.saveError.set(null);
  }

  onContentChange(value: string): void {
    this.store.draftContent.set(value);
    this.store.saveError.set(null);
  }

  submitCreate(): void {
    if (!this.canSubmitCreate()) return;
    const instant = this.instantResult().iso;
    if (!instant) return;
    this.store.create(this.patientId(), {
      consultedAt: instant,
      content: this.store.draftContent(),
    });
  }

  startEdit(item: WhatsAppConsultation): void {
    const parts = instantParts(item.consultedAt);
    this.editDate.set(parts.day);
    this.editTime.set(parts.time);
    this.editExactInstant.set(item.consultedAt);
    this.editContent.set(item.content);
    this.editReason.set('');
    this.store.startEdit(item);
  }

  cancelEdit(): void {
    this.store.cancelEdit();
  }

  useCurrentForEdit(): void {
    const now = new Date();
    const parts = instantParts(now);
    this.editDate.set(parts.day);
    this.editTime.set(parts.time);
    this.editExactInstant.set(now.toISOString());
    this.store.updateError.set(null);
  }

  onEditDateChange(value: string): void {
    this.editDate.set(value);
    this.editExactInstant.set(null);
    this.store.updateError.set(null);
  }

  onEditTimeChange(value: string): void {
    this.editTime.set(value);
    this.editExactInstant.set(null);
    this.store.updateError.set(null);
  }

  submitEdit(item: WhatsAppConsultation): void {
    if (!this.canSubmitEdit()) return;
    const instant = this.editInstantResult().iso;
    if (!instant) return;
    const reason = this.editReason().trim();
    this.store.update(this.patientId(), item.id, {
      expectedVersion: item.version,
      consultedAt: instant,
      content: this.editContent(),
      ...(reason ? { reason } : {}),
    });
  }

  retryLoad(): void {
    this.store.load(this.patientId());
  }

  formatDate(instant: string): string {
    return instant ? formatInstant(instant, false) : '';
  }

  formatTime(instant: string): string {
    return instant ? instantParts(instant).time : '';
  }

  formatDateTime(instant: string): string {
    return instant ? formatInstant(instant, true) : '';
  }

  private validateDate(day: string): string | null {
    if (!day.trim()) return 'Seleccioná la fecha de la consulta.';
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day);
    if (!match) return 'Ingresá una fecha válida con formato dd/MM/aaaa.';
    const year = Number(match[1]);
    const month = Number(match[2]);
    const date = Number(match[3]);
    const parsed = new Date(year, month - 1, date);
    if (
      parsed.getFullYear() !== year ||
      parsed.getMonth() !== month - 1 ||
      parsed.getDate() !== date ||
      year < 1900
    ) {
      return 'Ingresá una fecha válida con formato dd/MM/aaaa.';
    }
    if (day > this.todayIso()) {
      return 'La fecha de la consulta no puede ser futura.';
    }
    return null;
  }

  private validateTime(time: string): string | null {
    if (!time.trim()) return 'Indicá la hora de la consulta.';
    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(time.trim())) {
      return 'Ingresá una hora válida en formato 24 horas (HH:mm).';
    }
    return null;
  }

  private resolveConsultedAt(
    day: string,
    time: string,
    exactInstant: string | null,
  ): { iso: string | null; error: string | null } {
    if (this.validateDate(day) || this.validateTime(time)) {
      return { iso: null, error: null };
    }
    if (exactInstant) {
      const parsedExact = new Date(exactInstant);
      if (Number.isFinite(parsedExact.getTime()) && parsedExact.getTime() <= Date.now() + 60_000) {
        return { iso: parsedExact.toISOString(), error: null };
      }
    }
    const [year, month, date] = day.split('-').map(Number);
    const [hour, minute] = time.trim().split(':').map(Number);
    const local = new Date(year, month - 1, date, hour, minute, 0, 0);
    if (
      !Number.isFinite(local.getTime()) ||
      local.getFullYear() !== year ||
      local.getMonth() !== month - 1 ||
      local.getDate() !== date ||
      local.getHours() !== hour ||
      local.getMinutes() !== minute
    ) {
      return { iso: null, error: 'La fecha y hora ingresadas no existen en la zona horaria actual.' };
    }
    if (local.getTime() > Date.now() + 60_000) {
      return { iso: null, error: 'La fecha y hora de la consulta no pueden ser futuras.' };
    }
    return { iso: local.toISOString(), error: null };
  }
}
