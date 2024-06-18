import { Injectable } from '@angular/core';
import { UserRequest } from '../user-profile/user-request';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../user-profile/user-response';
import { ChangePasswordRequest } from '../user-profile/changePasswordRequest';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private httpClient: HttpClient) {}

  updateProfile(userRequest: UserRequest): Observable<UserResponse> {
    return this.httpClient.put<UserResponse>(
      'http://localhost:9192/api/v1/users/update-profile',
      userRequest
    );
  }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    // Http post call to upload the thumbnail
    return this.httpClient.post(
      'http://localhost:9192/api/v1/users/update-image',
      formData,
      { responseType: 'text' }
    );
  }

  changePassword(
    changePasswordRequest: ChangePasswordRequest
  ): Observable<any> {
    return this.httpClient.put(
      'http://localhost:9192/api/v1/users/change-password',
      changePasswordRequest
    );
  }
}
