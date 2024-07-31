import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { SelectControlComponent } from '../../../shared/controls/select-control/select-control.component';
import { InputControlComponent } from '../../../shared/controls/input-control/input-control.component';
import { AccordionComponent } from '../../../shared/components/accordion/accordion.component';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { SectionContentDirective } from '../../../shared/directives/section-content.directive';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, SelectControlComponent, InputControlComponent, AccordionComponent, SectionContentDirective, DialogComponent],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss'
})
export class UserRegistrationComponent implements OnInit {



  // normal gender select setup *******************
  selectedGenderId: any;
  genderItem: string = '';
  genderOptions: any;
  genderArray: { id: string; genderName: string }[] = [
    { id: '1', genderName: 'Male' },
    { id: '2', genderName: 'Female' },
    { id: '3', genderName: 'Others' },
  ];
  selectGender(event: any) {
    const selectedGenderName = event as string;
    const selectedGender = this.genderArray!.find(item => item.genderName === selectedGenderName);

    if (selectedGender) {
      this.selectedGenderId = selectedGender.id;
      this.genderItem = selectedGender.genderName;
    }
  }



  userRegistrationForm!: FormGroup;
  maxDate: string | undefined;
  passwordHide = false;
  confirmPasswordHide = false;
  formChangeWarningDialog: boolean = false;

  constructor(private router: Router, private fb: FormBuilder) {
    this.genderOptions = this.genderArray.map(option => option.genderName);
  }

  ngOnInit(): void {

    // registration form
    this.userRegistrationForm = this.fb.group({
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
      jobTitle: [''],
      employeeNo: [''],

      phoneCode: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      altPhoneCode: [''],
      altPhoneNumber: ['', [Validators.pattern(/^[0-9]+$/)]],
      emailId: ['', [Validators.required, Validators.email]],

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
