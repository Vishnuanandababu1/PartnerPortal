import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef, Renderer2, ElementRef } from '@angular/core';
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
})
export class CheckboxControlComponent implements ControlValueAccessor {

  @Input() title!: string;
  @Input() customClass!: string;
  @Input() set disabled(value: boolean) {
    this._disabled = value;
    this.setDisabledState(value);
  }
  @Output() checkboxChange = new EventEmitter<boolean>();

  private _disabled = false;
  checkboxControl = new FormControl({ value: false, disabled: this._disabled });

  private onChange: any = () => { };
  private onTouched: any = () => { };

  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
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

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
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
