import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'select-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ClickOutsideModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectControlComponent),
      multi: true,
    },
  ],
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.scss']
})
export class SelectControlComponent implements ControlValueAccessor, OnInit, OnDestroy {
  onSearch = new Subject<string>();
  keySearch: string = '';

  @Input() title!: string;
  @Input() options: any[] = [];
  @Input() optionDisplayProperty: string = 'displayname';
  @Input() validation!: string;
  @Input() placeholder!: string;
  @Input() customClass!: string;
  @Input() noLabel: boolean = false;
  @Input() clearVal: boolean = true;
  @Input() error: boolean = false;
  @Input() errorMessage: string = '';
  @Input() validationClass: boolean = false;
  @Output() optionSelected = new EventEmitter<any>();

  inputControl: FormControl = new FormControl({ value: '', disabled: false });
  filteredOptions: any[] = [];
  isDropdownOpen = false;
  highlightedIndex: number | null = null;
  selectedItem: any = null;
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };
  private subscription: Subscription = new Subscription();

  private _disabled: boolean = false;
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
    if (this.inputControl) {
      if (value) {
        this.inputControl.disable();
      } else {
        this.inputControl.enable();
      }
    }
  }

  ngOnInit() {
    this.subscription = this.onSearch
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(searchText => {
        this.focusOption(searchText);
        this.keySearch = '';
      });

    this.filteredOptions = this.options;

    // Sync the input control value with the selected item
    this.inputControl.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  writeValue(value: any): void {
    this.selectedItem = value || null;
    const displayValue = this.selectedItem && this.selectedItem[this.optionDisplayProperty] ? this.selectedItem[this.optionDisplayProperty] : ' ';
    this.inputControl.setValue(displayValue, { emitEvent: false });
    this.filteredOptions = this.options;
    console.log('selectedItem set to:', this.selectedItem);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDropdown() {
    if (!this.inputControl.disabled) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }

  openDropdown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.toggleDropdown();
    }
  }

  hideDropdown() {
    setTimeout(() => {
      this.isDropdownOpen = false;
    }, 200);
  }

  selectOption(option: any) {
    console.log('selectOption called with:', option);
    this.selectedItem = option;
    this.isDropdownOpen = false;
    const displayValue = this.selectedItem[this.optionDisplayProperty];
    console.log('Setting inputControl value to:', displayValue);
    this.inputControl.setValue(displayValue, { emitEvent: false });
    this.onChange(this.selectedItem);
    this.onTouched();
    this.optionSelected.emit(this.selectedItem);
    console.log('selectedItem after selection:', this.selectedItem);
  }

  resetSelection() {
    this.selectedItem = null;
    this.inputControl.setValue(' ', { emitEvent: false });
    this.onChange(null);
    this.onTouched();
    this.isDropdownOpen = false;
  }

  selectListOutsideClick(e: Event) {
    this.isDropdownOpen = false;
  }

  onKeyDown(event: KeyboardEvent) {
    const isAlphabetOrNumberKey = /^[a-zA-Z0-9]$/.test(event.key);
    if (this.isDropdownOpen) {
      switch (event.key) {
        case 'ArrowDown':
          this.highlightNext();
          event.preventDefault();
          break;
        case 'ArrowUp':
          this.highlightPrevious();
          event.preventDefault();
          break;
        case 'Enter':
          if (this.highlightedIndex !== null) {
            this.selectOption(this.filteredOptions[this.highlightedIndex]);
          }
          event.preventDefault();
          break;
        case 'Escape':
          this.isDropdownOpen = false;
          break;
        default:
          if (isAlphabetOrNumberKey) {
            this.keySearch += event.key.toString();
            if (this.keySearch !== '') {
              this.onSearch.next(this.keySearch);
            }
          }
          break;
      }
    } else if (event.key === ' ') {
      this.toggleDropdown();
      event.preventDefault();
    }
  }
  highlightNext() {
    if (this.highlightedIndex === null || this.highlightedIndex === this.filteredOptions.length - 1) {
      this.highlightedIndex = 0;
    } else {
      this.highlightedIndex++;
    }
  }

  highlightPrevious() {
    if (this.highlightedIndex === null || this.highlightedIndex === 0) {
      this.highlightedIndex = this.filteredOptions.length - 1;
    } else {
      this.highlightedIndex--;
    }
  }
  focusOption(value: string) {
    const filterValue = value.toLowerCase();
    let foundIndex = this.options.findIndex(option => option[this.optionDisplayProperty]?.toLowerCase() === filterValue);
    if (foundIndex === -1) {
      foundIndex = this.options.findIndex(option => option[this.optionDisplayProperty]?.toLowerCase().startsWith(filterValue));
    }
    if (foundIndex === -1) {
      foundIndex = this.options.findIndex(option => option[this.optionDisplayProperty]?.toLowerCase().includes(filterValue));
    }

    if (foundIndex !== -1) {
      this.highlightedIndex = foundIndex;
      this.scrollToHighlighted();
    } else {
      this.highlightedIndex = null;
    }
  }
  scrollToHighlighted() {
    setTimeout(() => {
      const container = document.querySelector('.option-list');
      if (container) {
        const highlighted = container.querySelector('.highlighted');
        if (highlighted) {
          highlighted.scrollIntoView({ block: 'nearest' });
        }
      }
    }, 0);
  }
  onBlur() {
    this.onTouched();
    setTimeout(() => {
      this.isDropdownOpen = false;
    }, 200);
  }
}
