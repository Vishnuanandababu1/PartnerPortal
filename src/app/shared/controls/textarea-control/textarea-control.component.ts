import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'textarea-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaControlComponent),
      multi: true,
    },
  ],
  templateUrl: './textarea-control.component.html',
  styleUrl: './textarea-control.component.scss'
})
export class TextareaControlComponent {
  @Input() title!: string;
  @Input() placeholder: string = '';
  @Input() customClass!: string;
  @Input() noLabel: boolean = false;
  @Input() clearVal: boolean = true;
  @Input() disabled: boolean = false;
  @Input() validation!: string;
  @Input() validationClass: boolean = false;
  @Input() error: boolean = false; // New input for error state
  @Input() errorMessage: string = ''; // New input for error message
  @Output() textareaChange = new EventEmitter<string>();

  textareaControl = new FormControl('');

  private onChange: any = () => { };
  private onTouched: any = () => { };

  constructor() {
    this.textareaControl.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
      this.textareaChange.emit(value ?? '');
    });
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.textareaControl.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.textareaControl.disable();
    } else {
      this.textareaControl.enable();
    }
  }

  onBlur() {
    this.onTouched();
  }

  resetTextarea() {
    this.textareaControl.setValue('');
  }

}
