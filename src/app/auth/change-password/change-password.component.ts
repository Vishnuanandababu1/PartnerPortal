import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('oldPasswordInput') oldPasswordInputRef!: ElementRef;

  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  changePasswordForm!: FormGroup;

  @Output() closeChangePasswordModal = new EventEmitter<void>();

  private translate = inject(TranslateService);
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.oldPasswordInputRef.nativeElement.focus();
    }, 600);

    this.changePasswordForm = this.fb.group({
      oldPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{5,}$/)]],
      confirmPassword: ["", [Validators.required]],
    });
  }

  togglePasswordVisibility(controlName: string) {
    if (controlName === 'oldPassword') {
      this.showOldPassword = !this.showOldPassword;
    } else if (controlName === 'newPassword') {
      this.showNewPassword = !this.showNewPassword;
    } else if (controlName === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  controlClass(controlName: string) {
    return { 'is-invalid': this.changePasswordForm?.get(controlName)?.invalid && this.changePasswordForm?.get(controlName)?.touched };
  }
  isPatternError(controlName: string): boolean {
    const control = this.changePasswordForm.get(controlName);
    return !!control && control.hasError('pattern') && (control.touched || control.dirty);
  }

  get passwordInfo() {
    return this.changePasswordForm;
  }

  onChangePassword() {
    if (this.changePasswordForm.valid) {

      this.changePasswordForm.reset();
      this.closeChangePasswordModal.emit();
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }

  onCancelChangePassword() {
    this.closeChangePasswordModal.emit();
  }

}
