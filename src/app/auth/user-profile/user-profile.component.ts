import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRequest } from './user-request';
import { ToastrService } from 'ngx-toastr';
import { UserProfileService } from '../shared/user-profile.service';
import { AuthService } from '../shared/auth.service';
import { LocalStorageService } from 'ngx-webstorage';
import { ChangePasswordRequest } from './changePasswordRequest';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  profileImage: string =
    'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';
  profileForm!: FormGroup;
  pwdForm: FormGroup;
  userRequest: UserRequest;
  changePasswordRequest: ChangePasswordRequest;
  fullName!: string;
  email!: string;
  role!: string;
  phone!: string;

  x!: File;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private userService: UserProfileService,
    private localStorage: LocalStorageService
  ) {
    this.userRequest = {
      name: '',
      phone: '',
    };
    this.changePasswordRequest = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
    this.pwdForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      rePassword: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.email = this.authService.getUserName();
    this.fullName = this.authService.getFName();
    this.profileImage = this.authService.getImage()
      ? this.authService.getImage()
      : this.profileImage;
    this.phone = this.authService.getPhone();
    this.role = this.authService.getRole();

    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^\d{10}$/), // Kiểm tra số điện thoại có 10 chữ số
      ]),
    });
  }

  get Name(): FormControl {
    return this.profileForm.get('name') as FormControl;
  }

  get Phone(): FormControl {
    return this.profileForm.get('phone') as FormControl;
  }

  get Password(): FormControl {
    return this.pwdForm.get('password') as FormControl;
  }

  get NewPassword(): FormControl {
    return this.pwdForm.get('newPassword') as FormControl;
  }

  get RePassword(): FormControl {
    return this.pwdForm.get('rePassword') as FormControl;
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    this.x = event.target.files[0];
    console.log(this.x);
  }

  onUpload() {
    this.userService.uploadImage(this.x).subscribe((data) => {
      // Cập nhật lại img ở localStorage và user-profile
      const u = JSON.parse(this.localStorage.retrieve('data'));
      u['image'] = data;
      this.localStorage.store('data', JSON.stringify(u));
      this.profileImage = data;

      // Cập nhật lại img ở header
      const header = document.querySelector('app-header');
      if (header) {
        const imgElement = header.querySelector('img');
        if (imgElement) {
          imgElement.src = data;
        }
      }

      // Thông báo thành công
      this.toastr.success('Image upload successful');
    });
  }

  onSubmited() {
    this.userRequest.name = this.profileForm.get('name')?.value;
    this.userRequest.phone = this.profileForm.get('phone')?.value;

    this.userService.updateProfile(this.userRequest).subscribe({
      next: (data) => {
        const u = JSON.parse(this.localStorage.retrieve('data'));
        u['phone'] = data.phone;
        u['name'] = data.name;
        this.localStorage.store('data', JSON.stringify(u));
        this.fullName = data.name;
        this.phone = data.phone;
        this.toastr.success('Updated successfully');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Updated Failed! Please try again');
      },
    });
  }

  open() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  close() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }

  onSubmit() {
    this.changePasswordRequest.oldPassword =
      this.pwdForm.get('password')?.value;
    this.changePasswordRequest.newPassword =
      this.pwdForm.get('newPassword')?.value;
    this.changePasswordRequest.confirmPassword =
      this.pwdForm.get('rePassword')?.value;

    this.userService.changePassword(this.changePasswordRequest).subscribe({
      next: (_data) => {
        this.toastr.success('Cập nhật mật khẩu thành công');
        this.pwdForm.reset({ password: '', newPassword: '', rePassword: '' });
        this.close();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 400) {
          if (err.error.errors) {
            for (const e of err.error.errors) {
              this.toastr.error(e.defaultMessage);
            }
          }
          this.toastr.error(err.error.message);
        } else if (err.status == 401) {
          this.toastr.error(err.error.message);
        } else {
          this.toastr.error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
        }
      },
    });
  }
}
