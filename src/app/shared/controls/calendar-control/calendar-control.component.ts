import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'calendar-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CalendarModule],
  templateUrl: './calendar-control.component.html',
  styleUrl: './calendar-control.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarControlComponent),
      multi: true
    }
  ]
})
export class CalendarControlComponent implements ControlValueAccessor, OnInit {
  @Input() title!: string;
  @Input() validation!: string;
  @Input() customClass: string | object = '';
  @Input() showIcon: boolean = false;
  @Input() showButtonBar: boolean = false;
  @Input() timeOnly: boolean = false;
  @Input() validationClass: boolean = false;
  @Input() error: boolean = false;
  @Input() errorMessage: string = '';


  // @Input() hourFormat: string = '12';   // not working
  // @Input() selectionMode: any = [];    // not working
  // @Input() minDate: string = '';       // not working
  // @Input() maxDate: string = '';      // not working
  

  calendarControl = new FormControl(null);

  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  ngOnInit(): void { }

  writeValue(value: any): void {
    this.calendarControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.calendarControl.disable();
    } else {
      this.calendarControl.enable();
    }
  }

  onDateSelect(event: any): void {
    this.onChange(event.value);
  }

  onBlur(): void {
    this.onTouched();
  }

}
