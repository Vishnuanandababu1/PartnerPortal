import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';


@Component({
  selector: 'select-control',
  standalone: true,
  imports: [CommonModule, ClickOutsideModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectControlComponent),
      multi: true,
    },
  ],
  templateUrl: './select-control.component.html',
  styleUrl: './select-control.component.scss'
})
export class SelectControlComponent implements ControlValueAccessor {

  @Input() title!: string;
  @Input() options: any = [];
  @Input() selectedItem: any;
  @Input() validation!: string;
  @Input() placeholder!: string;
  @Input() customClass!: string;
  @Input() noLabel: boolean = false;
  @Input() disabled: boolean = false;
  @Input() validationClass: boolean = false;
  @Output() optionSelected = new EventEmitter<string>();
filteredOptions: any[] = [];
  isDropdownOpen = false;
  highlightedIndex: number | null = null;
  private onChange: any = () => { };
  private onTouched: any = () => { };
  writeValue(value: any): void {
    if (value !== undefined) {
      this.selectedItem = value;
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
  hideDropdown() {
    setTimeout(() => {
      this.isDropdownOpen = false;
    }, 200);
  }

  selectOption(option: string) {
    this.selectedItem = option;
    this.isDropdownOpen = false;
    this.onChange(this.selectedItem);
    this.onTouched();
    this.optionSelected.emit(this.selectedItem);
  }

  resetSelection() {
    this.selectedItem = null;
    this.onChange(null);
    this.onTouched();
    this.isDropdownOpen = false;
  }

  selectListOutsideClick(e: Event) {
    this.isDropdownOpen = false;
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
          if (this.highlightedIndex !== null) {
            this.selectOption(this.options[this.highlightedIndex]);
          }
          event.preventDefault();
          break;
        case 'Escape':
          this.isDropdownOpen = false;
          break;
        default:
          break;
      }
    }
  }
  highlightNext() {
    if (this.highlightedIndex === null || this.highlightedIndex === this.options.length - 1) {
      this.highlightedIndex = 0;
    } else {
      this.highlightedIndex++;
    }
  }

  highlightPrevious() {
    if (this.highlightedIndex === null || this.highlightedIndex === 0) {
      this.highlightedIndex = this.options.length - 1;
    } else {
      this.highlightedIndex--;
    }
  }
  // onKeyDown(event: KeyboardEvent) {
  //   switch (event.key) {
  //     case 'ArrowDown':
  //       this.moveSelection(1); // Move selection down
  //       event.preventDefault(); // Prevent default scroll behavior
  //       break;
  //     case 'ArrowUp':
  //       this.moveSelection(-1); // Move selection up
  //       event.preventDefault(); // Prevent default scroll behavior
  //       break;
  //     case 'Enter':
  //       // Handle selection when Enter is pressed
  //       event.preventDefault(); // Prevent form submission if needed
  //       break;
  //     // case 'Escape':
  //     //   this.hideDropdown(); // Hide dropdown when Escape is pressed
  //     //   break;
  //     default:
  //       break;
  //   }
  // }

  // moveSelection(step: number) {
  //   const currentIndex = this.options.indexOf(this.selectedItem);
  //   let newIndex = currentIndex + step;

  //   // Ensure the newIndex stays within bounds
  //   if (newIndex < 0) {
  //     newIndex = this.options.length - 1;
  //   } else if (newIndex >= this.options.length) {
  //     newIndex = 0;
  //   }

  //   // Update the selectedItem
  //   this.selectedItem = this.options[newIndex];
  // }

}
