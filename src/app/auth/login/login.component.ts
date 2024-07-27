import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QrCodeModule } from 'ng-qrcode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, QrCodeModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  partnerLoginForm: FormGroup;
  showPassword = false;

  constructor(private router: Router, private fb: FormBuilder) {
    this.partnerLoginForm = this.fb.group({
      partnerID: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  togglePasswordVisibility(controlName: string) {
    if (controlName === 'password') {
      this.showPassword = !this.showPassword;
    }
  }

  controlClass(controlName: string) {
    return { 'is-invalid': this.partnerLoginForm?.get(controlName)?.invalid && this.partnerLoginForm?.get(controlName)?.touched };
  }

  get productInfo() {
    return this.partnerLoginForm;
  }

  onPartnerLogin() {
    console.log('partner Login Info', this.partnerLoginForm)
    if (this.partnerLoginForm.valid) {
    } else {
      this.partnerLoginForm.markAllAsTouched();
    }

    
    this.router.navigate(['/app/usermanagement']);
  }

}
