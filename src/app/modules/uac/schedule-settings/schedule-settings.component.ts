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
  imports: [CommonModule,RouterModule, ReactiveFormsModule, FormsModule, SelectControlComponent, InputControlComponent, CheckboxControlComponent, TextareaControlComponent, MultiselectControlComponent, AutocompleteControlComponent, CalendarModule, DialogComponent],
  templateUrl: './schedule-settings.component.html',
  styleUrl: './schedule-settings.component.scss'
})
export class ScheduleSettingsComponent implements OnInit {

  // normal category select setup *******************
  selectedCategoryId: any;
  categoryItem: string = '';
  categoryOptions: any;
  categoryArray: { id: string; categoryName: string }[] = [
    { id: '1', categoryName: 'Doctor' },
    { id: '3', categoryName: 'Anesthetist' },
    { id: '2', categoryName: 'OR Room' },
  ];
  suggestions = [
    { name: 'Apple', code: 'APL' },
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
  submitted: boolean = false;
  date: Date | undefined;
  constructor(private router: Router, private fb: FormBuilder) {
    this.categoryOptions = this.categoryArray.map(option => option.categoryName);
    this.userSiteOptions = this.userSiteList!.map(option => option.siteName);
  }

  ngOnInit(): void {

    this.scheduleSettingForm = this.fb.group({
      category: ['', [Validators.required]],
      userName: ['', [Validators.required, Validators.maxLength(30)]],
      allowedSites: [[], [Validators.required]],
      fromDate: ['', [Validators.required]],
      isActive: [true],
      userType:['', [Validators.required]],
      remarks: ['', [Validators.maxLength(100)]],

    })
  }
  selectCategory(event: any) {
    const selectedCategoryName = event as string;
    const selectedCategory = this.categoryArray!.find(item => item.categoryName === selectedCategoryName);

    if (selectedCategory) {
      this.selectedCategoryId = selectedCategory.id;
      this.categoryItem = selectedCategory.categoryName;
    }
  }

  // category select setup via api *******************

  // selectedCategoryId: any;
  // categoryItem: string = '';
  // categoryOptions: any;
  // categoryList: { id: string; categoryName: string }[] | undefined;
  // getUserCategory() {
  //   this.apiService.getCategory().subscribe(
  //     (data) => {
  //       this.categoryList = data.results;
  //       this.categoryOptions = this.categoryList!.map(option => option.categoryName);
  //       console.log('Data from API:', data);
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }
  // selectCategory(event: any) {
  //   const selectedCategoryName = event as string;
  //   const selectedCategory = this.categoryList!.find(item => item.categoryName === selectedCategoryName);

  //   if (selectedCategory) {
  //     this.selectedCategoryId = selectedCategory.id;
  //     this.categoryItem = selectedCategory.categoryName;
  //   }
  // }







  // getAllUnits(categoryTypeId: any, unitFilter: boolean) {
  //   this.apiService.getUnitListData(categoryTypeId, unitFilter).subscribe(
  //     (data) => {
  //       this.userSiteList = data.results;
  //       this.userSiteOptions = this.userSiteList!.map(option => option.siteName);
  //       console.log('Data from API:', data);
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }
  selectSites(event: any) {
    const selectedsiteName = event as string;
    const selectedSiteItem = this.userSiteList!.find(item => item.siteName === selectedsiteName);

    if (selectedSiteItem) {
      this.selectedSiteId = selectedSiteItem.siteId;
      this.userSiteItem.push(selectedSiteItem.siteName);
    }
  }


  controlClass(controlName: string) {
    return { 'is-invalid': this.scheduleSettingForm?.get(controlName)?.invalid && this.scheduleSettingForm?.get(controlName)?.touched };
  }
  get scheduleInfo() {
    return this.scheduleSettingForm;
  }

  onRegisterUser() {
    this.submitted=true;
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
}
