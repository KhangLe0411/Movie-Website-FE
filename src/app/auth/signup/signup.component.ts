import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SignupRequest } from './singup-request';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  signupRequest!: SignupRequest;
  signupForm!: FormGroup;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.signupRequest = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''      
    }
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      pwd: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)
      ]),
      rpwd: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)
      ])
    }, { validators: this.passwordMatchValidator });
  }

  // Validator tùy chỉnh để kiểm tra pwd và rpwd
  private passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const pwd = control.get('pwd');
    const rpwd = control.get('rpwd');

    if (pwd && rpwd && pwd.value !== rpwd.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  };
  
  get Email(): FormControl {
    return this.signupForm.get('email') as FormControl
  }

  get Name(): FormControl {
    return this.signupForm.get('name') as FormControl
  }

  get Pwd(): FormControl {
    return this.signupForm.get('pwd') as FormControl
  }

  registerSubmited() {
    this.signupRequest.name = this.signupForm.get("name")?.value;
    this.signupRequest.email = this.signupForm.get("email")?.value;
    this.signupRequest.password = this.signupForm.get("pwd")?.value;
    this.signupRequest.confirmPassword = this.signupForm.get("rpwd")?.value;

    this.authService.signup(this.signupRequest).subscribe({
      next: _data => {
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      },
      error: err => {
        console.log(err);
        this.toastr.error('Registration Failed! Please try again');
      }
    })
  }
}
