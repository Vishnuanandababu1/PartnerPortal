import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputControlComponent } from '../../shared/controls/input-control/input-control.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, InputControlComponent],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('oldPasswordInput') oldPasswordInputRef!: ElementRef;

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
