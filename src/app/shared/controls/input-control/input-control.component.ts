import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'input-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputControlComponent),
      multi: true,
    },
  ],
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss']
})
export class InputControlComponent implements ControlValueAccessor {
  @Input() title!: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() customClass!: string;
  @Input() noLabel: boolean = false;
  @Input() disabled: boolean = false;
  @Input() validation!: string;
  @Input() validationClass: boolean = false;
  @Input() error: boolean = false;
  @Input() errorMessage: string = '';
  @Output() inputChange = new EventEmitter<string>();

  showPassword = false;

  inputControl = new FormControl('');

  private onChange: any = () => { };
  private onTouched: any = () => { };

  constructor() {
    this.inputControl.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
      this.inputChange.emit(value ?? '');
    });
  }

  getInputType() {
    if (this.type === 'password') {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.inputControl.setValue(value, { emitEvent: false });
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
      this.inputControl.disable();
    } else {
      this.inputControl.enable();
    }
  }

  onBlur() {
    this.onTouched();
  }

  resetInput() {
    this.inputControl.setValue('');
  }

  passwordVisible() {
    this.showPassword = !this.showPassword;
  }
}
