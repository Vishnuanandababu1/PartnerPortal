import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, FormControl, ReactiveFormsModule, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { createPopper, Instance as PopperInstance } from '@popperjs/core';

@Component({
  selector: 'autocomplete-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './autocomplete-control.component.html',
  styleUrls: ['./autocomplete-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AutocompleteControlComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: AutocompleteControlComponent,
      multi: true,
    },
  ],
})
export class AutocompleteControlComponent
  implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit, Validator {
  @Input() title!: string;
  @Input() validation!: string;
  @Input() placeholder: string = '';
  @Input() customClass!: string;
  @Input() noLabel: boolean = false;
  @Input() clearVal: boolean = true;
  @Input() disabled: boolean = false;
  @Input() suggestions: any[] = [];
  @Input() field: string = '';
  @Input() forceSelection: boolean = false;
  @Input() error: boolean = false;
  @Input() errorMessage: string = '';
  @Output() select = new EventEmitter<any>();
  @Output() search = new EventEmitter<string>();

  @ViewChild('inputElement') inputElement!: ElementRef;
  @ViewChild('dropdownElement') dropdownElement!: ElementRef;

  inputControl = new FormControl('');
  filteredSuggestions: any[] = [];
  selectedItems: any[] = [];
  isDropdownOpen = false;
  private subscription: Subscription = new Subscription();
  private popperInstance!: PopperInstance;
  highlightedIndex: number | null = null;

  private onChange: any = () => { };
  private onTouched: any = () => { };

  constructor() {
    this.inputControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        const filterValue = value ?? '';
        this.filterSuggestions(filterValue);
        this.search.emit(filterValue);
        this.onChange(filterValue);
      });
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.createPopper();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.popperInstance) {
      this.popperInstance.destroy();
    }
  }

  writeValue(value: any): void {
    this.inputControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.inputControl.disable();
    } else {
      this.inputControl.enable();
    }
  }

  filterSuggestions(value: string) {
    if (value === '') {
      this.filteredSuggestions = [];
      this.isDropdownOpen = false;
      return;
    }
    const filterValue = value.toLowerCase();
    this.filteredSuggestions = this.suggestions.filter((suggestion) =>
      suggestion[this.field]?.toLowerCase().includes(filterValue)
    );
    this.highlightedIndex = this.filteredSuggestions.length > 0 ? 0 : null;
    this.isDropdownOpen = true;
    this.createPopper();
  }

  selectSuggestion(suggestion: any) {
    this.inputControl.setValue(suggestion[this.field], { emitEvent: false });
    this.onChange(suggestion);
    this.isDropdownOpen = false;
    this.select.emit(suggestion);
  }

  resetInput() {
    this.inputControl.setValue('');
  }

  onBlur() {
    if (
      this.forceSelection &&
      !this.filteredSuggestions.find(
        (s) => s[this.field] === this.inputControl.value
      )
    ) {
      this.resetInput();
    }
    this.onTouched();
    setTimeout(() => {
      this.isDropdownOpen = false;
    }, 200);
  }

  removeItem(item: any) {
    this.selectedItems = this.selectedItems.filter((i) => i !== item);
    this.onChange(this.selectedItems);
    this.select.emit(this.selectedItems);
  }

  onKeyDown(event: KeyboardEvent) {
    if (!this.isDropdownOpen) {
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        this.highlightedIndex =
          this.highlightedIndex === null ||
            this.highlightedIndex === this.filteredSuggestions.length - 1
            ? 0
            : this.highlightedIndex + 1;
        event.preventDefault();
        break;
      case 'ArrowUp':
        this.highlightedIndex =
          this.highlightedIndex === null || this.highlightedIndex === 0
            ? this.filteredSuggestions.length - 1
            : this.highlightedIndex - 1;
        event.preventDefault();
        break;
      case 'Enter':
        if (
          this.highlightedIndex !== null &&
          this.filteredSuggestions.length > 0
        ) {
          this.selectSuggestion(
            this.filteredSuggestions[this.highlightedIndex]
          );
        } else {
          this.isDropdownOpen = false;
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

  private createPopper() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
    }
    if (this.inputElement && this.dropdownElement) {
      this.popperInstance = createPopper(
        this.inputElement.nativeElement,
        this.dropdownElement.nativeElement,
        {
          placement: 'bottom-start',
        }
      );
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.inputControl.invalid
      ? {
        invalidForm: {
          valid: false,
          message: 'Autocomplete control is invalid',
        },
      }
      : null;
  }
}
