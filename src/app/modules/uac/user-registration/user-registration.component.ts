import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { SelectControlComponent } from '../../../shared/controls/select-control/select-control.component';
import { InputControlComponent } from '../../../shared/controls/input-control/input-control.component';
import { AutocompleteControlComponent } from "../../../shared/controls/autocomplete-control/autocomplete-control.component";
import { MultiselectControlComponent } from '../../../shared/controls/multiselect-control/multiselect-control.component';
import { CalendarModule } from 'primeng/calendar';
import { TextareaControlComponent } from '../../../shared/controls/textarea-control/textarea-control.component';
import { CheckboxControlComponent } from '../../../shared/controls/checkbox-control/checkbox-control.component';
import { AccordionComponent } from '../../../shared/components/accordion/accordion.component';
import { SectionContentDirective } from '../../../shared/directives/section-content.directive';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';


@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, SelectControlComponent, InputControlComponent, AutocompleteControlComponent, MultiselectControlComponent, CalendarModule, TextareaControlComponent, CheckboxControlComponent, AccordionComponent, SectionContentDirective, DialogComponent],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss'
})
export class UserRegistrationComponent implements OnInit {

  // prefix
  selectedPrefixId: any;
  prefixItem: string = '';
  prefixOptions: any;
  prefixList: { id: string; prefix: string }[] = [
    { id: '0', prefix: 'Dr' },
    { id: '1', prefix: 'Mr' },
    { id: '2', prefix: 'Mrs' },
    { id: '3', prefix: 'Miss' },
  ];
  selectPrefix(event: any) {
    const selectedPrefixName = event as string;
    const selectedPrefix = this.prefixList!.find(item => item.prefix === selectedPrefixName);

    if (selectedPrefix) {
      this.selectedPrefixId = selectedPrefix.id;
      this.prefixItem = selectedPrefix.prefix;
    }
  }

  // gender
  selectedGenderId: any;
  genderItem: string = '';
  genderOptions: any;
  genderList: { id: string; genderName: string }[] = [
    { id: '1', genderName: 'Male' },
    { id: '2', genderName: 'Female' },
    { id: '3', genderName: 'Others' },
  ];
  selectGender(event: any) {
    const selectedGenderName = event as string;
    const selectedGender = this.genderList!.find(item => item.genderName === selectedGenderName);

    if (selectedGender) {
      this.selectedGenderId = selectedGender.id;
      this.genderItem = selectedGender.genderName;
    }
  }

  // languages known
  selectedLanguageId: string | undefined;
  userLanguageItem: string[] = [];
  userLanguageOptions: any;
  userLanguageList: { id: string; language: string; }[] = [
    { id: '1', language: 'English' },
    { id: '2', language: 'Hindi' },
    { id: '3', language: 'Malayalam' }
  ];
  selectLanguageType(event: any) {
    const selectedLanguageame = event as string;
    if (this.userLanguageList) {
      const selectedLanguageItem = this.userLanguageList.find(item => item.language === selectedLanguageame);

      if (selectedLanguageItem) {
        this.selectedLanguageId = selectedLanguageItem.id;
        this.userLanguageItem.push(selectedLanguageItem.language);
      }
    }
  }

  // marital status
  selectedMaritalStatusId: any;
  maritalStatusItem: string = '';
  maritalStatusOptions: any;
  maritalStatusList: { id: string; maritalStatus: string }[] = [
    { id: '1', maritalStatus: 'Single' },
    { id: '2', maritalStatus: 'Married' },
    { id: '3', maritalStatus: 'Widowed' },
    { id: '4', maritalStatus: 'Separated' },
    { id: '5', maritalStatus: 'Others' },
  ];
  selectMaritalStatus(event: any) {
    const selectedMaritalStatusName = event as string;
    const selectedMaritalStatus = this.maritalStatusList!.find(item => item.maritalStatus === selectedMaritalStatusName);

    if (selectedMaritalStatus) {
      this.selectedMaritalStatusId = selectedMaritalStatus.id;
      this.maritalStatusItem = selectedMaritalStatus.maritalStatus;
    }
  }

  // nationality
  selectedNationalityId: any;
  nationalityItem: string = '';
  nationalityOptions: any;
  nationalityList: { id: string; countryName: string; nationality: string; }[] = [
    { id: '1', countryName: 'India', nationality: 'Indian' },
    { id: '2', countryName: 'United States', nationality: 'American' },
    { id: '3', countryName: 'Canada', nationality: 'Canadian' },
    { id: '4', countryName: 'United Kingdom', nationality: 'British' },
    { id: '5', countryName: 'Australia', nationality: 'Australian' },
  ];
  selectNationality(event: any) {
    const selectedNationalityName = event as string;
    const selectedNationality = this.nationalityList!.find(item => item.nationality === selectedNationalityName);

    if (selectedNationality) {
      this.selectedNationalityId = selectedNationality.id;
      this.nationalityItem = selectedNationality.nationality;
    }
  }

  // user type
  selectedUserTypeId: any;
  userTypeItem: string = '';
  userTypeOptions: any;
  userTypeList: { id: string; typeName: string }[] = [
    { id: '1', typeName: 'Doctor' },
    { id: '2', typeName: 'Non MD' },
    { id: '3', typeName: 'Nurse' },
    { id: '4', typeName: 'Staff' }
  ];
  selectUserType(event: any) {
    const selectedUserTypeName = event as string;
    const selectedUserTypeItem = this.userRoleList!.find(item => item.roleName === selectedUserTypeName);
    if (selectedUserTypeItem) {
      this.selectedUserTypeId = selectedUserTypeItem.id;
      this.userTypeItem = selectedUserTypeItem.roleName;
    }
  }

  // sites
  selectedSiteId: string | undefined;
  userSiteItem: string[] = [];
  // userSiteOptions: string[] = []; 
  userSiteOptions: any;
  userSiteList: { siteId: string; siteName: string; }[] = [
    { siteId: '1', siteName: 'Trivandrum' },
    { siteId: '2', siteName: 'Ernakulam' },
    { siteId: '3', siteName: 'Calicut' }
  ];
  selectSiteType(event: any) {
    const selectedSiteName = event as string;
    if (this.userSiteList) {
      const selectedSiteItem = this.userSiteList.find(item => item.siteName === selectedSiteName);

      if (selectedSiteItem) {
        this.selectedSiteId = selectedSiteItem.siteId;
        this.userSiteItem.push(selectedSiteItem.siteName);
      }
    }
  }


  // role
  selectedRoleId: any;
  userRoleItem: string[] = [];
  userRoleOptions: any;
  userRoleList: { id: string; roleName: string }[] = [
    { id: '1', roleName: 'Administrator' },
    { id: '2', roleName: 'Doctor' },
    { id: '3', roleName: 'Nurse' },
    { id: '4', roleName: 'Technician' },
    { id: '5', roleName: 'Front Office' },
    { id: '6', roleName: 'Accountant' },
    { id: '7', roleName: 'Manager' },
  ];
  selectRoleType(event: any) {
    const selectedRoleName = event as string;
    if (this.userRoleList) {
      const selectedRoleItem = this.userRoleList.find(item => item.roleName === selectedRoleName);

      if (selectedRoleItem) {
        this.selectedRoleId = selectedRoleItem.id;
        this.userRoleItem.push(selectedRoleItem.roleName);
      }
    }
  }

  // user status
  selectedUserStatusId: any;
  userStatusItem: string = '';
  userStatusOptions: any;
  userStatusList: { id: string; statusVal: string }[] = [
    { id: '1', statusVal: 'Active' },
    { id: '2', statusVal: 'Inactive' }
  ];
  selectUserStatus(event: any) {
    const selectedUserStatusName = event as string;
    const selectedUserStatus = this.userStatusList!.find(item => item.statusVal === selectedUserStatusName);

    if (selectedUserStatus) {
      this.selectedUserStatusId = selectedUserStatus.id;
      this.userStatusItem = selectedUserStatus.statusVal;
    }
  }


  userRegistrationForm!: FormGroup;
  dateOfBirth: string | undefined;
  dateOfJoin: string | undefined;
  passwordHide = false;
  confirmPasswordHide = false;
  formChangeWarningDialog: boolean = false;

  constructor(private router: Router, private fb: FormBuilder) {
    this.prefixOptions = this.prefixList.map(option => option.prefix);
    this.genderOptions = this.genderList.map(option => option.genderName);
    this.userLanguageOptions = this.userLanguageList!.map(option => option.language);
    this.maritalStatusOptions = this.maritalStatusList.map(option => option.maritalStatus);
    this.nationalityOptions = this.nationalityList.map(option => option.nationality);
    this.userTypeOptions = this.userTypeList.map(option => option.typeName);
    this.userSiteOptions = this.userSiteList!.map(option => option.siteName);
    this.userRoleOptions = this.userRoleList.map(option => option.roleName);
    this.userStatusOptions = this.userStatusList.map(option => option.statusVal);
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
  togglePasswordVisibility(controlName: string) {
    if (controlName === 'password') {
      this.passwordHide = !this.passwordHide;
    } else if (controlName === 'confirmPassword') {
      this.confirmPasswordHide = !this.confirmPasswordHide;
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
}
