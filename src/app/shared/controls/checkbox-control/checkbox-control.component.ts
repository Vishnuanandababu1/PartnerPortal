import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'checkbox-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxControlComponent),
      multi: true,
    },
  ],
  templateUrl: './checkbox-control.component.html',
  styleUrls: ['./checkbox-control.component.scss']
})
export class CheckboxControlComponent implements ControlValueAccessor {

  @Input() placeholder!: string;
  @Input() customClass!: string;
  @Input() disabled: boolean = false;
  @Output() checkboxChange = new EventEmitter<boolean>();

  checkboxControl = new FormControl(false);

  private onChange: any = () => { };
  private onTouched: any = () => { };

  constructor() {
    this.checkboxControl.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
      this.checkboxChange.emit(value ?? false);
    });
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.checkboxControl.setValue(value, { emitEvent: false });
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
      this.checkboxControl.disable();
    } else {
      this.checkboxControl.enable();
    }
  }

  onBlur() {
    this.onTouched();
  }
}
