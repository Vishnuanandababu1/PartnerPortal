import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { SelectControlComponent } from '../../../shared/controls/select-control/select-control.component';
import { InputControlComponent } from '../../../shared/controls/input-control/input-control.component';
import { CalendarModule } from 'primeng/calendar';
import { AccordionComponent } from '../../../shared/components/accordion/accordion.component';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { SectionContentDirective } from '../../../shared/directives/section-content.directive';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, SelectControlComponent, InputControlComponent, CalendarModule, AccordionComponent, SectionContentDirective, DialogComponent],
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
      this.genderItem = selectedPrefix.prefix;
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


  userRegistrationForm!: FormGroup;
  date: string | undefined;
  passwordHide = false;
  confirmPasswordHide = false;
  formChangeWarningDialog: boolean = false;

  constructor(private router: Router, private fb: FormBuilder) {
    this.prefixOptions = this.prefixList.map(option => option.prefix);
    this.genderOptions = this.genderList.map(option => option.genderName);
    this.maritalStatusOptions = this.maritalStatusList.map(option => option.maritalStatus);
    this.nationalityOptions = this.nationalityList.map(option => option.nationality);
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
      maritalStatusId: [''],
      maritalStatus: [''],
      nationalityId: [''],
      nationality: [''],
      
      phoneCode: ['+91', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      altPhoneCode: ['+91'],
      altPhoneNumber: ['', [Validators.pattern(/^[0-9]+$/)]],
      emailId: ['', [Validators.required, Validators.email]],


      jobTitle: [''],
      employeeNo: [''],
      roleId: [''],
      role: ['', [Validators.required]],

      allowedOutlets: [[], [Validators.required]],

      userStatusId: [''],
      userStatus: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]{6,}$/),],],
      confirmPassword: [''],

      date: [''],
      reason: [''],
      remarks: ['', [Validators.maxLength(500)]],
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
