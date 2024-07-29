import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';

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
})
export class MultiselectControlComponent implements ControlValueAccessor {

  @Input() title!: string;
  @Input() options: any = [];
  @Input() selectedItems: any[] = [];
  @Input() validation!: string;
  @Input() placeholder!: string;
  @Input() customClass!: string;
  @Input() noLabel: boolean = false;
  @Input() disabled: boolean = false;
  @Input() validationClass: boolean = false;
  @Output() optionsSelected = new EventEmitter<string[]>();

  selectedItemList: string = '';

  isDropdownOpen = false;
  openResCategoryModal = false;
  openResSubCategoryModal = false;

  private onChange: any = () => { };
  private onTouched: any = () => { };

  constructor() {
    this.selectedItems = [];
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
    this.openResCategoryModal = false;
    this.openResSubCategoryModal = false;
  }

  removeSelectedOption(option: string) {
    this.selectedItems = this.selectedItems.filter(item => item !== option);
    this.onChange(this.selectedItems);
    this.onTouched();
    this.optionsSelected.emit(this.selectedItems);
  }


}

