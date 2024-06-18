import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginRequest } from '../login/login-request';
import { LoginResponse } from '../login/login-response';
import { LocalStorageService } from 'ngx-webstorage';
import { SignupRequest } from '../signup/singup-request';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  @Output() img: EventEmitter<string> = new EventEmitter();

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) { }
  
  getCurrentUser() {
    const usr = JSON.parse(this.localStorage.retrieve('data'));
    return usr ? usr['user'] : null;
  }

  getJwtToken() {
    const usr = JSON.parse(this.localStorage.retrieve('data'));
    return usr ? usr['accessToken'] : null; // Hoặc return một giá trị mặc định
  }

  getUserName() {
    const usr = JSON.parse(this.localStorage.retrieve('data'));
    return usr ? usr['user'].email : null; // Hoặc return một giá trị mặc định
  }

  getFName() {
    const usr = JSON.parse(this.localStorage.retrieve('data'));
    return usr ? usr['user'].name : null; // Hoặc return một giá trị mặc định
  }

  getImage() {
    const usr = JSON.parse(this.localStorage.retrieve('data'));
    return usr ? usr['user'].avatar : null; // Hoặc return một giá trị mặc định
  }

  getPhone() {
    const usr = JSON.parse(this.localStorage.retrieve('data'));
    return usr ? usr['user'].phone : null; // Hoặc return một giá trị mặc định
  }

  getRole() {
    const usr = JSON.parse(this.localStorage.retrieve('data'));
    return usr ? usr['roles'] : null; // Hoặc return một giá trị mặc định
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  checkExp(): boolean {
    const helper = new JwtHelperService();
    return Boolean(helper.isTokenExpired(this.getJwtToken()));
  }

  clear() {
    this.localStorage.clear('data');
  }

  signup(signupRequest: SignupRequest): Observable<any> {
    return this.httpClient.post(
      'http://localhost:9192/api/v1/auth/register',
      signupRequest
    );
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.httpClient
      .post<LoginResponse>(
        'http://localhost:9192/api/v1/auth/login',
        loginRequest
      )
      .pipe(
        map((data) => {
          // this.localStorage.store('accessToken', data.accessToken);
          // this.localStorage.store('username', data.email);
          this.localStorage.store('data', JSON.stringify(data));

          this.loggedIn.emit(true);
          this.username.emit(data.user.email);
          this.img.emit(data.user.avatar);
          return true;
        })
      );
  }

  forgotPassword(email: string): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    return this.httpClient.post(
      'http://localhost:9192/api/v1/auth/forgot-password',
      formData
    );
  }

  logout() {
    this.httpClient
      .post(
        'http://localhost:9192/api/v1/auth/logout',{}
      )
      .subscribe((data) => {
        console.log(data);
      });
    this.clear();
  }
}
