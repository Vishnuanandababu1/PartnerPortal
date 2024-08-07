import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, Validators, AbstractControl, FormsModule } from '@angular/forms';
import { CheckboxControlComponent } from "../../../shared/controls/checkbox-control/checkbox-control.component";
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-user-schedule',
  standalone: true,
  imports: [CommonModule, CheckboxControlComponent, FormsModule, ReactiveFormsModule, CalendarModule],
  templateUrl: './user-schedule.component.html',
  styleUrl: './user-schedule.component.scss'
})
export class UserScheduleComponent implements OnInit {

  userScheduleForm: FormGroup;
    daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    timeFrom: { [key: string]: Date } = {};
    timeTo: { [key: string]: Date } = {};

    constructor(private fb: FormBuilder) {
        this.userScheduleForm = this.fb.group({});
        this.initTimes();
    }

    ngOnInit(): void {
      
    }

    initTimes() {
        this.daysOfWeek.forEach(day => {
            this.timeFrom[day] = new Date();
            this.timeTo[day] = new Date();
        });
    }

    getTimeFromId(day: string): string {
        return `calendar-timefrom-${day.toLowerCase()}`;
    }

    getTimeToId(day: string): string {
        return `calendar-timeto-${day.toLowerCase()}`;
    }

    dayClass(day: string): string {
        return `clear-bottom-${day.toLowerCase()}`;
    }

    addSchedule(day: string) {
        // Implement logic to add a new schedule entry or update the form
        console.log(`Add schedule for ${day}`);
        // Example logic could include showing a modal or updating a list of schedules
    }

}
