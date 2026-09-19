import {
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideSearch,
  lucidePill,
  lucideCheck,
  lucideSparkles,
  lucideClock,
} from '@ng-icons/lucide';
import { Medication } from '../../../core/models/medication.model';
import { MedicationCatalogService } from '../../../core/services/medication-catalog.service';

@Component({
  selector: 'app-medication-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon],
  providers: [
    provideIcons({
      lucideSearch,
      lucidePill,
      lucideCheck,
      lucideSparkles,
      lucideClock,
    }),
  ],
  templateUrl: './medication-autocomplete.component.html',
  styleUrl: './medication-autocomplete.component.css',
})
export class MedicationAutocompleteComponent implements OnInit {
  private readonly catalogService = inject(MedicationCatalogService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly el = inject(ElementRef);

  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() medicationSelected = new EventEmitter<Medication>();

  @ViewChild('inputRef') inputRef?: ElementRef<HTMLInputElement>;

  readonly query = signal<string>('');
  readonly isOpen = signal<boolean>(false);
  readonly results = signal<Medication[]>([]);
  readonly isSearching = signal<boolean>(false);
  readonly selectedIndex = signal<number>(-1);

  private readonly searchSubject = new Subject<string>();

  ngOnInit(): void {
    if (this.value) {
      this.query.set(this.value);
    }

    this.searchSubject
      .pipe(debounceTime(200), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((term) => {
        if (!term || term.trim().length === 0) {
          this.results.set([]);
          this.isOpen.set(false);
          return;
        }

        this.isSearching.set(true);
        this.catalogService.search(term, 8).subscribe({
          next: (meds) => {
            this.results.set(meds || []);
            this.isOpen.set((meds && meds.length > 0) || false);
            this.isSearching.set(false);
            this.selectedIndex.set(-1);
          },
          error: () => {
            this.results.set([]);
            this.isOpen.set(false);
            this.isSearching.set(false);
          },
        });
      });
  }

  onInput(event: Event): void {
    const inputVal = (event.target as HTMLInputElement).value;
    this.query.set(inputVal);
    this.valueChange.emit(inputVal);
    this.searchSubject.next(inputVal);
  }

  onFocus(): void {
    if (this.query().trim().length > 0) {
      this.searchSubject.next(this.query());
    }
  }

  selectMedication(med: Medication): void {
    this.query.set(med.name);
    this.valueChange.emit(med.name);
    this.medicationSelected.emit(med);
    this.isOpen.set(false);
    this.results.set([]);
    this.selectedIndex.set(-1);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen() || this.results().length === 0) {
      if (event.key === 'ArrowDown' && this.query().trim().length > 0) {
        this.searchSubject.next(this.query());
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex.update((i) => (i < this.results().length - 1 ? i + 1 : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex.update((i) => (i > 0 ? i - 1 : this.results().length - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const idx = this.selectedIndex();
      if (idx >= 0 && idx < this.results().length) {
        this.selectMedication(this.results()[idx]);
      }
    } else if (event.key === 'Escape') {
      this.isOpen.set(false);
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
