import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideBaby, lucidePlus, lucideScanFace, lucideStethoscope } from '@ng-icons/lucide';
import { firstValueFrom } from 'rxjs';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { SpecialtyService } from '../../core/services/specialty.service';
import { SpecialtySummary } from '../../core/models/specialty.model';

@Component({
  selector: 'app-my-specialties',
  imports: [NgIcon, RouterLink],
  providers: [provideIcons({ lucideArrowRight, lucideBaby, lucidePlus, lucideScanFace, lucideStethoscope })],
  templateUrl: './my-specialties.component.html',
  styleUrl: './my-specialties.component.css',
})
export class MySpecialtiesComponent implements OnInit {
  readonly store = inject(WorkspaceStore);
  private readonly catalog = inject(SpecialtyService);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly error = signal('');
  readonly adding = signal(false);
  readonly specialties = signal<SpecialtySummary[]>([]);
  readonly available = computed(() =>
    this.specialties().filter((specialty) =>
      !this.store.contexts().some((context) => context.specialty.id === specialty.id),
    ),
  );

  ngOnInit(): void {
    void this.load();
  }

  iconFor(code: string): string {
    switch (code) {
      case 'pediatrics':
        return 'lucideBaby';
      case 'dermatology':
        return 'lucideScanFace';
      default:
        return 'lucideStethoscope';
    }
  }

  async load(): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    try {
      const [, catalog] = await Promise.all([
        this.store.loadContexts(true),
        firstValueFrom(this.catalog.getSpecialties()),
      ]);
      this.specialties.set(catalog);
    } catch {
      this.error.set('No pudimos cargar las especialidades.');
    } finally {
      this.loading.set(false);
    }
  }

  async add(id: number): Promise<void> {
    this.error.set('');
    try {
      const context = await this.store.addContext(id);
      await this.router.navigate(['/onboarding/setup'], {
        queryParams: { specialtyContextId: context.specialtyContextId },
      });
    } catch (error) {
      this.error.set(
        (error as { error?: { message?: string } })?.error?.message ??
          'No se pudo agregar la especialidad. Volvé a intentarlo.',
      );
    }
  }
}
