import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'switch-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchControlComponent),
      multi: true,
    },
  ],
  templateUrl: './switch-control.component.html',
  styleUrl: './switch-control.component.scss'
})
export class SwitchControlComponent implements ControlValueAccessor {

  @Input() title!: string;
  @Input() customClass!: string;
  @Input() set disabled(value: boolean) {
    this._disabled = value;
    this.setDisabledState(value);
  }
  @Output() switchChange = new EventEmitter<boolean>();
  @ViewChild('switchContainer') switchContainer!: ElementRef;

  private _disabled = false;
  switchControl = new FormControl({ value: false, disabled: this._disabled });

  private onChange: any = () => { };
  private onTouched: any = () => { };

  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
    this.switchControl.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
      this.switchChange.emit(value ?? false);
    });
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.switchControl.setValue(value, { emitEvent: false });
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
      this.switchControl.disable();
    } else {
      this.switchControl.enable();
    }
  }

  onFocus() {
    this.switchContainer.nativeElement.classList.add('focused');
  }

  onBlur() {
    this.onTouched();
    this.switchContainer.nativeElement.classList.remove('focused');
  }
}
