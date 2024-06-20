import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieAdminService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get('http://localhost:9192/api/v1/admin/films');
  }

  getAllGenres(): Observable<any> {
    return this.http.get('http://localhost:9192/api/v1/genre');
  }

  getAllCountries(): Observable<any> {
    return this.http.get('http://localhost:9192/api/v1/country');
  }
}
