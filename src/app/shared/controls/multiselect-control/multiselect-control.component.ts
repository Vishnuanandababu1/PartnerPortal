import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
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
  @Input() showSearch: boolean = false;
  @Input() optionDisplayProperty: string = 'displayname';  // New property
  @Output() optionsSelected = new EventEmitter<string[]>();
  selectAllChecked: boolean = false;
  selectedItemList: string = '';
  isDropdownOpen = false;
  filteredOptions: any[] = [];
  highlightedIndex: number | null = null;
  private onChange: any = () => { };
  private onTouched: any = () => { };
  private subscription: Subscription = new Subscription();

  constructor() {
    this.selectedItems = [];
  }

  ngOnInit() {
    this.subscription = this.onSearch.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this.filterOptions(searchText);
      this.areAllItemsSelected();
    });

    this.filteredOptions = [...this.options];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  writeValue(value: any): void {
    if (value && Array.isArray(value)) {
      this.selectedItems = value;
      this.selectedItemList = this.selectedItems.map(item => item[this.optionDisplayProperty]).join(', ');
    } else {
      this.selectedItems = [];
      this.selectedItemList = '';
      this.selectAllChecked = false;
    }
    this.areAllItemsSelected(); // Check if all items are selected
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
    if (this.isDropdownOpen) {
      this.filterOptions('');
    }
  }

  onCloseDropdown() {
    this.isDropdownOpen = false;
  }

  isSelected(option: any): boolean {
    return Array.isArray(this.selectedItems) && this.selectedItems.includes(option);
  }

  toggleCheckbox(option: any) {
    if (this.isSelected(option)) {
      this.selectedItems = this.selectedItems.filter(item => item !== option);
    } else {
      this.selectedItems = [...this.selectedItems, option];
    }
    this.selectedItemList = this.selectedItems.map(item => item[this.optionDisplayProperty]).join(', ');
    this.areAllItemsSelected();
    this.onChange(this.selectedItems);
    this.onTouched();
    this.optionsSelected.emit(this.selectedItems);
  }

  private areAllItemsSelected(): void {
    if (this.filteredOptions.length === 0) {
      this.selectAllChecked = false;
    } else {
      this.selectAllChecked = this.filteredOptions.every(option => this.selectedItems.includes(option));
    }
  }

  selectOption(option: any) {
    this.toggleCheckbox(option);
  }

  resetSelection() {
    this.selectedItems = [];
    this.selectedItemList = '';
    this.onChange([]);
    this.onTouched();
    this.isDropdownOpen = false;
    this.selectAllChecked = false;
  }

  selectListOutsideClick() {
    this.isDropdownOpen = false;
  }

  removeSelectedOption(option: any) {
    this.selectedItems = this.selectedItems.filter(item => item !== option);
    this.onChange(this.selectedItems);
    this.onTouched();
    this.optionsSelected.emit(this.selectedItems);
  }

  onKeyDown(event: KeyboardEvent) {
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
        case 'Tab':
          this.isDropdownOpen = false;
          break;
        default:
          break;
      }
    } else if (event.key === ' ') {
      this.toggleDropdown();
      event.preventDefault();
    }
  }

  filterOptions(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredOptions = this.options
      .filter((option: any) => option[this.optionDisplayProperty].toLowerCase().includes(filterValue))
      .sort((a: any, b: any) => {
        const aIndex = a[this.optionDisplayProperty].toLowerCase().indexOf(filterValue);
        const bIndex = b[this.optionDisplayProperty].toLowerCase().indexOf(filterValue);
        return aIndex - bIndex;
      });
    if (this.filteredOptions.length > 0) {
      this.highlightedIndex = this.options.indexOf(this.filteredOptions[0]);
    } else {
      this.highlightedIndex = null;
    }
  }

  highlightNext() {
    if (this.highlightedIndex === null || this.highlightedIndex === this.filteredOptions.length - 1) {
      this.highlightedIndex = 0;
    } else {
      this.highlightedIndex++;
    }
    this.scrollToHighlighted();
  }

  highlightPrevious() {
    if (this.highlightedIndex === null || this.highlightedIndex === 0) {
      this.highlightedIndex = this.filteredOptions.length - 1;
    } else {
      this.highlightedIndex--;
    }
    this.scrollToHighlighted();
  }

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.onSearch.next(input.value);
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

  toggleSelectAll() {
    if (this.selectAllChecked) {
      this.selectedItems = this.filteredOptions;
    } else {
      this.selectedItems = [];
    }
    this.selectedItemList = this.selectedItems.map(item => item[this.optionDisplayProperty]).join(', ');
    this.onChange(this.selectedItems);
    this.optionsSelected.emit(this.selectedItems);
  }

  onSelectAllChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectAllChecked = input.checked;
    this.toggleSelectAll();
  }

  onBlur(event: FocusEvent) {
    const target = event.relatedTarget as HTMLElement;
    if (target && (target.closest('.option-list') || target.closest('.list-filter'))) {
      return;
    }
    if (event instanceof KeyboardEvent && event.key === 'Tab') {
      this.onTouched();
      setTimeout(() => {
        this.isDropdownOpen = false;
      }, 300);
    }
  }
}
