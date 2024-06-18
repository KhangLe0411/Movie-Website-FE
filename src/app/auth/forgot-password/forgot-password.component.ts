import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  email: string;

  constructor(private authService: AuthService, private toastr: ToastrService) {
    this.email = '';
    this.passwordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {}

  get Email(): FormControl {
    return this.passwordForm.get('email') as FormControl;
  }

  onSubmited() {
    this.email = this.passwordForm.get('email')?.value;

    this.authService.forgotPassword(this.email).subscribe({
      next: (_data) => {
        this.toastr.success(
          'Một email đã được gửi đến email của bạn. Vui lòng kiểm tra email để đặt lại mật khẩu'
        );
      }, 
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.toastr.error(err.error.message);
        } else {
          this.toastr.error('An error occurred. Please try again later.');
        }
      }
    })
  }
}
