import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, FormsModule } from '@angular/forms';
import { SelectControlComponent } from '../../../shared/controls/select-control/select-control.component';
import { InputControlComponent } from '../../../shared/controls/input-control/input-control.component';
import { CheckboxControlComponent } from '../../../shared/controls/checkbox-control/checkbox-control.component';
import { TextareaControlComponent } from '../../../shared/controls/textarea-control/textarea-control.component';
import { MultiselectControlComponent } from '../../../shared/controls/multiselect-control/multiselect-control.component';
import { AutocompleteControlComponent } from "../../../shared/controls/autocomplete-control/autocomplete-control.component";
import { CalendarModule } from 'primeng/calendar';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-schedule-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, SelectControlComponent, InputControlComponent, CheckboxControlComponent, TextareaControlComponent, MultiselectControlComponent, AutocompleteControlComponent, CalendarModule, DialogComponent],
  templateUrl: './schedule-settings.component.html',
  styleUrl: './schedule-settings.component.scss'
})
export class ScheduleSettingsComponent implements OnInit {

  // normal category select setup *******************
  selectedCategoryId: any;
  categoryItem: string = '';
  categoryArray: Array<any> = [
    { id: '1', displayname: 'Doctor' },
    { id: '3', displayname: 'Anesthetist' },
    { id: '2', displayname: 'OR Room' },
  ];
  options = [
    {
      displayname: 'United States',
      countrycode: 'us',
      countryname: 'United States'
    },
    {
      displayname: 'Canada',
      countrycode: 'ca',
      countryname: 'Canada'
    },
    {
      displayname: 'Germany',
      countrycode: 'de',
      countryname: 'Germany'
    },
    {
      displayname: 'Japan',
      countrycode: 'jp',
      countryname: 'Japan'
    },
    {
      displayname: 'India',
      countrycode: 'in',
      countryname: 'India'
    },
    {
      displayname: 'Australia',
      countrycode: 'au',
      countryname: 'Australia'
    }
  ];

  suggestions = [
    { name: 'Apple', code: 'APL' },
    { name: 'Avocado', code: 'APL' },
    { name: 'Banana', code: 'BAN' },
    { name: 'Cherry', code: 'CHR' },
    { name: 'Date', code: 'DAT' },
    { name: 'Elderberry', code: 'ELD' },
    { name: 'Fig', code: 'FIG' },
    { name: 'Grape', code: 'GRP' }
  ];
  
  selectedSiteId: any;
  userSiteItem: any[] = [];
  userSiteOptions: any;
  userSiteList: { siteId: string; siteName: string; }[] = [
    { siteId: '1', siteName: 'Trivandrum' },
    { siteId: '3', siteName: 'Kochi' },
    { siteId: '2', siteName: 'Calicut' },
  ];
  scheduleSettingForm!: FormGroup;
  formChangeWarningDialog: boolean = false;
  date: Date | undefined;
  constructor(private router: Router, private fb: FormBuilder) {
    this.userSiteOptions = this.userSiteList!.map(option => option.siteName);
  }

  ngOnInit(): void {

    this.scheduleSettingForm = this.fb.group({
      category: ['', [Validators.required]],
      userName: ['', [Validators.required, Validators.maxLength(30)]],
      allowedSites: [[], [Validators.required]],
      fromDate: ['', [Validators.required]],
      isActive: [true],
      userType: ['', [Validators.required]],
      remarks: ['', [Validators.maxLength(100)]],

    })
  }
  selectCategory(event: any) {

  }

  selectSites(event: any) {
    const selectedsiteName = event as string;
    const selectedSiteItem = this.userSiteList!.find(item => item.siteName === selectedsiteName);

    if (selectedSiteItem) {
      this.selectedSiteId = selectedSiteItem.siteId;
      this.userSiteItem.push(selectedSiteItem.siteName);
    }
  }

  get scheduleInfo() {
    return this.scheduleSettingForm;
  }

  onRegisterUser() {
    if (this.scheduleSettingForm.valid) {
      console.log('schedule info', this.scheduleInfo)
    }
    else {
      this.scheduleSettingForm.markAllAsTouched();
    }
  }

  onCancelClick() {
    if (this.scheduleSettingForm.dirty) {
      this.formChangeWarningDialog = true;
    }
    else {
      this.onBackConfirmClick();
    }
  }
  onCancelClearChanges() {
    this.formChangeWarningDialog = false;
  }
  onBackConfirmClick() {
    // this.alertSuccess = false;
    this.scheduleSettingForm.reset();
    this.formChangeWarningDialog = false;
  }
  onSelect(selected: any) {
    console.log('Selected:', selected);
    // Handle the selected suggestion
  }

  onSearch(query: string) {
    console.log('Search query:', query);
    // Handle the search query, possibly update suggestions based on the query
  }
  getErrorMessage(formControlName: string): string {
    const control = this.scheduleSettingForm.get(formControlName);

    if (control && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['minlength']) {
        return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['maxlength']) {
        return `Maximum length is ${control.errors['maxlength'].requiredLength} characters`;
      }
      if (control.errors['pattern']) {
        return 'Invalid format';
      }
      if (control.errors['email']) {
        return 'Invalid email address';
      }
      if (control.errors['min']) {
        return `Minimum value is ${control.errors['min'].min}`;
      }
      if (control.errors['max']) {
        return `Maximum value is ${control.errors['max'].max}`;
      }
      if (control.errors['customError']) {
        return control.errors['customError'];  // Assuming custom error message is provided as a string
      }
      // Add other custom error checks here as needed
    }

    return '';
  }

}
