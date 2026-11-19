import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AdministrativeBooking, Assignment, StaffPermission, StaffService } from './staff.service';
import type { Booking } from '../calendar/bookings.models';
import type { Clinic } from '../clinics/clinics.models';

export type CalendarClinic = Pick<Clinic, 'id' | 'name' | 'status' | 'timezone' | 'modality'>;

@Injectable()
export class StaffAgenda {
  private readonly router = inject(Router);
  readonly api = inject(StaffService);
  readonly assignments = signal<Assignment[]>([]);
  readonly selectedKey = signal('');
  readonly doctorId = signal('');
  readonly doctors = computed(() => {
    const groups = new Map<string, Assignment[]>();
    for (const item of this.assignments()) {
      const clinics = groups.get(item.ownerId);
      if (clinics) clinics.push(item);
      else groups.set(item.ownerId, [item]);
    }
    const names = [...groups].map(([id, clinics]) => ({
      id, clinics, name: clinics.find(item => item.doctorName && item.doctorName !== 'Profesional asignado')?.doctorName,
    }));
    return names.map(({ id, clinics, name }, index) => ({
      id,
      label: name && names.filter(other => other.name === name).length === 1
        ? name
        : `${name ?? 'Profesional'} ${index + 1} · ${clinics[0].clinicName}`,
    }));
  });
  readonly doctorAssignments = computed(() => this.assignments().filter(item => item.ownerId === this.doctorId()));
  readonly assignment = computed(() => this.doctorAssignments().find(item => this.key(item) === this.selectedKey()));
  readonly activationRecovery = this.api.activationRecovery;

  key(item: Assignment): string {
    return item.ownerId + '|' + item.clinicId;
  }

  setAssignments(items: Assignment[], initialLoad: boolean): void {
    this.assignments.set(items);
    const doctors = this.doctors();
    if (!doctors.some(doctor => doctor.id === this.doctorId())) {
      this.selectDoctor(initialLoad && doctors.length === 1 ? doctors[0].id : '');
      return;
    }
    if (!this.assignment()) this.selectedKey.set('');
  }

  selectDoctor(id: string): void {
    this.doctorId.set(this.doctors().some(doctor => doctor.id === id) ? id : '');
    const clinics = this.doctorAssignments();
    this.selectedKey.set(clinics.length === 1 ? this.key(clinics[0]) : '');
  }

  select(key: string): void {
    this.selectedKey.set(this.doctorAssignments().some(item => this.key(item) === key) ? key : '');
  }

  can(permission: StaffPermission, now: number): boolean {
    const item = this.assignment();
    return !!item && item.permissions.includes(permission) && Date.parse(item.validUntil) > now;
  }

  clinic(item: Assignment): CalendarClinic {
    return { id: item.clinicId, name: item.clinicName, timezone: item.timezone, modality: item.modality, status: 'ACTIVE' };
  }

  booking(booking: AdministrativeBooking): Booking {
    return {
      ...booking,
      clinicSnapshot: booking.clinicSnapshot && { ...booking.clinicSnapshot, address: '', publicAddress: '' },
    };
  }

  async bookings(item: Assignment, from: string, to: string, current: () => boolean): Promise<Booking[]> {
    const results: Booking[] = [];
    let page = 0;
    while (current()) {
      const response = await this.api.bookings(item, from, to, page++);
      if (!current()) break;
      results.push(...response.items.filter(booking => booking.clinicId === item.clinicId).map(booking => this.booking(booking)));
      if (!response.hasMore) break;
    }
    return results;
  }

  invalidateSession(): void {
    this.api.session.set(null);
    void this.router.navigateByUrl('/staff/login');
  }

}
