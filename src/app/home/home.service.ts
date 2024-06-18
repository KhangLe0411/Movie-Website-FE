import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) { }

  getHomePage(): Observable<any> {
    return this.http.get('http://localhost:9192/api/v1/home/home-page')
  }
}
