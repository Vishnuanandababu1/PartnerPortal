import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, FormsModule, FormControl } from '@angular/forms';
import { SelectControlComponent } from '../../../shared/controls/select-control/select-control.component';
import { InputControlComponent } from '../../../shared/controls/input-control/input-control.component';
import { AutocompleteControlComponent } from "../../../shared/controls/autocomplete-control/autocomplete-control.component";
import { MultiselectControlComponent } from '../../../shared/controls/multiselect-control/multiselect-control.component';
import { CalendarControlComponent } from "../../../shared/controls/calendar-control/calendar-control.component";
import { TextareaControlComponent } from '../../../shared/controls/textarea-control/textarea-control.component';
import { CheckboxControlComponent } from '../../../shared/controls/checkbox-control/checkbox-control.component';
import { AccordionComponent } from '../../../shared/components/accordion/accordion.component';
import { SectionContentDirective } from '../../../shared/directives/section-content.directive';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';


@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, SelectControlComponent, InputControlComponent, AutocompleteControlComponent, MultiselectControlComponent, CalendarControlComponent, TextareaControlComponent, CheckboxControlComponent, AccordionComponent, SectionContentDirective, DialogComponent],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss'
})
export class UserRegistrationComponent implements OnInit {

  //prefix
  prefixOptions = [
    { id: '0', prefix: 'Dr' },
    { id: '1', prefix: 'Mr' },
    { id: '2', prefix: 'Mrs' },
    { id: '3', prefix: 'Miss' },
  ];
  selectPrefix(event: any) { }

  // gender
  genderOptions = [
    { id: '1', genderName: 'Male' },
    { id: '2', genderName: 'Female' },
    { id: '3', genderName: 'Others' },
  ];
  selectGender(event: any) { }

  // languages known
  userLanguageItem: any[] = [];
  userLanguageOptions = [
    { id: '1', language: 'English' },
    { id: '2', language: 'Hindi' },
    { id: '3', language: 'Malayalam' }
  ];
  selectLanguageType(event: any) { }

  // marital status
  maritalStatusOptions = [
    { id: '1', maritalStatus: 'Single' },
    { id: '2', maritalStatus: 'Married' },
    { id: '3', maritalStatus: 'Widowed' },
    { id: '4', maritalStatus: 'Separated' },
    { id: '5', maritalStatus: 'Others' },
  ];
  selectMaritalStatus(event: any) { }

  // nationality
  countryOptions = [
    { id: '1', countrycode: 'in', countryName: 'India', telCode: '+91', nationality: 'Indian' },
    { id: '3', countrycode: 'ca', countryName: 'Canada', telCode: '+1', nationality: 'Canadian' },
    { id: '4', countrycode: 'de', countryName: 'Germany', telCode: '+49', nationality: 'German' },
    { id: '2', countrycode: 'us', countryName: 'United States', telCode: '+1', nationality: 'American' },
    { id: '5', countrycode: 'au', countryName: 'Australia', telCode: '+61', nationality: 'Australian' },
  ];
  selectNationality(event: any) { }
  selectCountryCode(event: any) { }
  selectAltCountryCode(event: any) { }

  // user type
  userTypeOptions = [
    { id: '1', userTypeName: 'Doctor' },
    { id: '2', userTypeName: 'Non MD' },
    { id: '3', userTypeName: 'Nurse' },
    { id: '4', userTypeName: 'Staff' }
  ];
  selectUserType(event: any) { }

  // department
  departmentOptions = [
    { id: 1, department: 'Trichology' },
    { id: 2, department: 'Dermatology ' }
  ];
  selectDepartment(event: any) { }

  // speciality
  specialityOptions = [
    // hair clinic speciality
    { id: 1, speciality: 'Hair Transplant', type: 'hair' },
    { id: 2, speciality: 'Hair Restoration', type: 'hair' },
    { id: 3, speciality: 'Hair Loss Treatment', type: 'hair' },
    { id: 4, speciality: 'Scalp Micro Pigmentation', type: 'hair' },

    // skin clinic speciality
    { id: 5, speciality: 'Acne Treatment', type: 'skin' },
    { id: 6, speciality: 'Anti-Aging', type: 'skin' },
    { id: 7, speciality: 'Skin Rejuvenation', type: 'skin' },
    { id: 8, speciality: 'Laser Therapy', type: 'skin' },
    { id: 9, speciality: 'Pigmentation Treatment', type: 'skin' },
    { id: 10, speciality: 'Dermatology Consultations', type: 'skin' }
  ];
  selectSpecilaity(event: any) { }

  // designation
  designationOptions = [
    { id: 1, designation: 'Hair Transplant Surgeon' },
    { id: 2, designation: 'Hair Restoration Specialist' },
    { id: 3, designation: 'Trichologist' },
    { id: 4, designation: 'Scalp Technician' },
    { id: 5, designation: 'Dermatologist' },
    { id: 6, designation: 'Anti-Aging Specialist' },
    { id: 7, designation: 'Skin Rejuvenation Expert' },
    { id: 8, designation: 'Laser Technician' },
    { id: 9, designation: 'Pigmentation Specialist' },
    { id: 10, designation: 'Consulting Dermatologist' }
  ];
  selectDesignation(event: any) { }

  // reporting manager
  reportingManagerOptions = [
    { id: 1, userName: 'Alice Johnson' },
    { id: 2, userName: 'Bob Smith' },
    { id: 3, userName: 'Charlie Brown' },
    { id: 4, userName: 'Diana Prince' },
    { id: 5, userName: 'Edward Stark' }
  ];
  selectReportingManager(event: any) { }

  // allowed sites
  userSiteItem: string[] = [];
  userSiteOptions = [
    { siteId: '1', siteName: 'Trivandrum' },
    { siteId: '2', siteName: 'Ernakulam' },
    { siteId: '3', siteName: 'Calicut' }
  ];
  selectSiteType(event: any) { }

  // user role
  userRoleItem: string[] = [];
  userRoleOptions = [
    { id: '1', roleName: 'Administrator' },
    { id: '2', roleName: 'Doctor' },
    { id: '3', roleName: 'Nurse' },
    { id: '4', roleName: 'Assistant' },
    { id: '5', roleName: 'Front Office' },
    { id: '6', roleName: 'Accountant' },
    { id: '7', roleName: 'Manager' },
  ];
  selectRoleType(event: any) { }

  // user status
  userStatusOptions = [
    { id: '1', statusVal: 'Active' },
    { id: '2', statusVal: 'Inactive' }
  ];
  selectUserStatus(event: any) { }


  userRegistrationForm!: FormGroup;
  dateOfBirth: string | undefined;
  dateOfJoin: string | undefined;
  formChangeWarningDialog: boolean = false;

  controlPoints: { [key: string]: number } = {};
  totalPoints: number = 0;
  currentPoints: number = 0;
  percentage: number = 0;
  pointValues: { [points: number]: string[] } = {
    5: ['firstName', 'gender', 'dateOfBirth', 'age', 'phoneCode', 'phoneNumber', 'emailId', 'userType', 'department', 'allowedSites', 'role'],
    4: ['lastName', 'languagesKnown', 'defaultSite', 'defaultRole', 'userID', 'password', 'userStatus'],
    3: ['nationality', 'altPhoneCode', 'altPhoneNumber', 'reportingManager'],
    2: ['middleName', 'houseName', 'qualification', 'designation', 'dateOfJoining'],
    1: ['prefix', 'maritalStatus', 'streetName', 'pinCode', 'city', 'state', 'country', 'regNumber', 'speciality'],
    0: ['remarks', 'isChangePassword', 'confirmPassword', 'windowsID']
  };

  constructor(private router: Router, private fb: FormBuilder) {

  }

  ngOnInit(): void {

    // registration form
    this.userRegistrationForm = this.fb.group({
      prefixId: [''],
      prefix: [''],
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      middleName: ['', [Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],

      genderId: [''],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required, this.validateDateOfBirth]],
      age: ['', [Validators.required, this.validateAge]],
      languagesKnown: [[], [Validators.required]],
      maritalStatusId: [''],
      maritalStatus: [''],
      nationalityId: [''],
      nationality: [''],

      phoneCode: ['+91', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      altPhoneCode: ['+91'],
      altPhoneNumber: ['', [Validators.pattern(/^[0-9]+$/)]],
      emailId: ['', [Validators.required, Validators.email]],

      houseName: ['', [Validators.maxLength(100)]],
      streetName: ['', [Validators.maxLength(75)]],
      pinCode: ['', [Validators.maxLength(6)]],
      city: ['', [Validators.maxLength(50)]],
      state: ['', [Validators.maxLength(50)]],
      country: ['', [Validators.maxLength(50)]],

      userTypeId: [''],
      userType: ['', [Validators.required]],
      qualification: ['', [Validators.maxLength(100)]],
      regNumber: [''],
      departmentId: [''],
      department: ['', [Validators.required]],
      specialityId: [''],
      speciality: [''],
      designationId: [''],
      designation: ['', [Validators.required]],
      dateOfJoining: ['', [Validators.required]],
      reportingManager: [''],
      remarks: ['', [Validators.maxLength(500)]],

      allowedSites: [[], [Validators.required]],
      defaultSite: ['', [Validators.required]],
      role: [[], [Validators.required]],
      defaultRole: ['', [Validators.required]],

      isChangePassword: [false],
      userID: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]{6,}$/),],],
      confirmPassword: [''],
      userStatusId: [''],
      userStatus: ['', [Validators.required]],
      windowsID: ['', [Validators.maxLength(75)]],
    })


    // weightage calculation
    this.initializeControlPoints();
    this.userRegistrationForm.valueChanges.subscribe(() => {
      this.updateProfilePercentage();
    });
  }

  controlClass(controlName: string) {
    return { 'is-invalid': this.userRegistrationForm?.get(controlName)?.invalid && this.userRegistrationForm?.get(controlName)?.touched };
  }
  get employeeInfo() {
    return this.userRegistrationForm;
  }


  validateDateOfBirth(control: { value: string | number | Date; }) {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    const age = currentDate.getFullYear() - selectedDate.getFullYear() -
      ((currentDate.getMonth() > selectedDate.getMonth() ||
        (currentDate.getMonth() === selectedDate.getMonth() &&
          currentDate.getDate() >= selectedDate.getDate())) ? 0 : 1);
    if (age < 18) {
      return { invalidAge: true };
    }
    return null;
  }
  calculateAge() {
    const birthdateValue = this.userRegistrationForm.controls['dateOfBirth'].value;
    if (birthdateValue !== null) {
      const birthdate = new Date(birthdateValue);
      if (isNaN(birthdate.getTime())) {
        this.userRegistrationForm.controls['age'].setValue('');
      } else {
        const timeDiff = Math.abs(Date.now() - birthdate.getTime());
        const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
        this.userRegistrationForm.controls['age'].setValue(age.toString());
      }
    } else {
      this.userRegistrationForm.controls['age'].setValue('');
    }
  }
  validateAge(control: AbstractControl) {
    const age = control.value;
    if (age >= 18 && age < 100) {
      return null;
    } else {
      return { invalidAge: true };
    }
  }

  onRegisterUser() {
    if (this.userRegistrationForm.valid) {

    }
    else {
      this.userRegistrationForm.markAllAsTouched();
    }
  }

  onCancelClick() {
    if (this.userRegistrationForm.dirty) {
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
    this.userRegistrationForm.reset();
    this.formChangeWarningDialog = false;
    this.router.navigate(['/app/uac/usermanagement']);
  }


  // calculate profile completion percentage
  initializeControlPoints(): void {
    Object.keys(this.pointValues).forEach(points => {
      const pointValue = Number(points);
      this.pointValues[pointValue].forEach(field => {
        this.controlPoints[field] = pointValue;
      });
    });
    this.totalPoints = Object.values(this.controlPoints).reduce((acc, points) => acc + points, 0);
  }

  isFieldCompleted(control: any): boolean {
    if (control instanceof FormControl) {
      const value = control.value;
      if (value instanceof Date) {
        return !isNaN(value.getTime());
      } else if (typeof value === 'string') {
        return value.trim().length > 0;
      } else if (Array.isArray(value)) {
        return value.length > 0;
      } else {
        return !!value;
      }
    }
    return false;
  }

  updateProfilePercentage(): void {
    this.currentPoints = 0;

    Object.keys(this.userRegistrationForm.controls).forEach(field => {
      const control = this.userRegistrationForm.get(field);
      if (control) {
        if (control.valid && (control.touched || control.dirty)) {
          if (this.isFieldCompleted(control)) {
            this.currentPoints += this.controlPoints[field] || 0;
          }
        }
      }
    });
    this.percentage = (this.currentPoints / this.totalPoints) * 100;
    this.percentage = parseFloat(this.percentage.toFixed(2));
  }


}
