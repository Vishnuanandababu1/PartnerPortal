import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'multiselect-control',
  standalone: true,
  imports: [CommonModule, ClickOutsideModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectControlComponent),
      multi: true,
    },
  ],
  templateUrl: './multiselect-control.component.html',
  styleUrls: ['./multiselect-control.component.scss'],
})
export class MultiselectControlComponent implements ControlValueAccessor, OnInit, OnDestroy {

  onSearch = new Subject<string>();
  keySearch: string = '';
  @Input() title!: string;
  @Input() options: any = [];
  @Input() selectedItems: any[] = [];
  @Input() validation!: string;
  @Input() placeholder!: string;
  @Input() customClass!: string;
  @Input() noLabel: boolean = false;
  @Input() clearVal: boolean = true;
  @Input() disabled: boolean = false;
  @Input() validationClass: boolean = false;
  @Input() error: boolean = false;
  @Input() errorMessage: string = '';
  @Output() optionsSelected = new EventEmitter<string[]>();

  selectedItemList: string = '';
  isDropdownOpen = false;
  filteredOptions: any[] = []; // Add this property
  highlightedIndex: number | null = null;
  private onChange: any = () => { };
  private onTouched: any = () => { };
  private subscription: Subscription = new Subscription();

  constructor() {
    this.selectedItems = [];
  }

  ngOnInit() {
    this.subscription = this.onSearch.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this.filterOptions(searchText);
      this.keySearch = '';
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.selectedItems = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  openDropdown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.toggleDropdown();
    }
  }

  isSelected(option: string): boolean {
    return Array.isArray(this.selectedItems) && this.selectedItems.includes(option);
  }

  toggleCheckbox(option: string) {
    this.selectedItems = this.selectedItems || [];
    if (this.isSelected(option)) {
      this.selectedItems = this.selectedItems.filter(item => item !== option);
    } else {
      this.selectedItems = [...this.selectedItems, option];
    }
    const inputValue = this.selectedItems.join(', ');
    this.selectedItemList = inputValue;
    this.onChange(this.selectedItems);
    this.onTouched();
    this.optionsSelected.emit(this.selectedItems);
  }

  selectOption(option: string) {
    const isSelected = this.selectedItems.includes(option);
    if (isSelected) {
      this.selectedItems = this.selectedItems.filter(item => item !== option);
    } else {
      this.selectedItems = [...this.selectedItems, option];
    }
    this.isDropdownOpen = false;
    this.onChange(this.selectedItems);
    this.onTouched();
    this.optionsSelected.emit(this.selectedItems);
  }

  resetSelection() {
    this.selectedItems = [];
    this.selectedItemList = '';
    this.onChange([]);
    this.onTouched();
    this.isDropdownOpen = false;
  }

  selectListOutsideClick(e: Event) {
    this.isDropdownOpen = false;
  }

  onModalClosed() {
    this.isDropdownOpen = false;
  }

  removeSelectedOption(option: string) {
    this.selectedItems = this.selectedItems.filter(item => item !== option);
    this.onChange(this.selectedItems);
    this.onTouched();
    this.optionsSelected.emit(this.selectedItems);
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
          if (this.highlightedIndex !== null && this.highlightedIndex < this.filteredOptions.length) {
            this.selectOption(this.filteredOptions[this.highlightedIndex]);
          }
          event.preventDefault();
          break;
        case 'Escape':
          this.isDropdownOpen = false;
          break;
        case ' ':
          this.isDropdownOpen = !this.isDropdownOpen;
          event.preventDefault();
          break;
        default:
          if (isAlphabetOrNumberKey) {
            this.keySearch += event.key?.toString();
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

  filterOptions(value: string) {
    const filterValue = value?.toLowerCase();
    this.filteredOptions = this.options
      .filter((option: string) => option?.toLowerCase()?.includes(filterValue))
      .sort((a: string, b: string) => {
        const aIndex = a.toLowerCase().indexOf(filterValue);
        const bIndex = b.toLowerCase().indexOf(filterValue);
        return aIndex - bIndex;
      });
    if (this.filteredOptions.length > 0) {
      this.highlightedIndex = this.options.indexOf(this.filteredOptions[0]);
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
}
