import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequest } from './login-request';
import { AuthService } from '../shared/auth.service';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginRequest: LoginRequest;
  registerSuccessMessage!: string;
  isError!: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.loginRequest = {
      email: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pwd: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ]),
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      if (
        params['registered'] !== undefined &&
        params['registered'] === 'true'
      ) {
        this.toastr.success('Signup Successfull');
        this.registerSuccessMessage =
          'Please Check your inbox for activation email ' +
          'activate your account before you Login!';
      }
    });
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get Pwd(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }

  loginSubmited() {
    this.loginRequest.email = this.loginForm.get('email')?.value;
    this.loginRequest.password = this.loginForm.get('pwd')?.value;

    this.authService.login(this.loginRequest).subscribe({
      next: (_data) => {
        this.isError = false;
        // this.router.navigateByUrl('/');
        this.router.navigate(['']);
        this.toastr.success('Đăng nhập thành công');
      },
      error: (err: HttpErrorResponse) => {
        this.isError = true;
        if (err.status == 401) {
          this.toastr.error("Tài khoản hoặc mật khẩu chưa chính xác");
        } else if (err.status == 403) {
          this.toastr.error('Tài khoản chưa được xác thực');
        } else {
          this.toastr.error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
        }
      },
    });
  }
}
