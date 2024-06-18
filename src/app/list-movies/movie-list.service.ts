import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  constructor(private http: HttpClient) {}
  getSingleMovie(page: number): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    return this.http.get('http://localhost:9192/api/v1/film/single-movie', {
      params,
    });
  }
  getSeriesMovie(page: number): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    return this.http.get('http://localhost:9192/api/v1/film/series-movie', {
      params,
    });
  }
  getTheaterMovie(page: number): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    return this.http.get('http://localhost:9192/api/v1/film/theater-movie', {
      params,
    });
  }
  getStoreMovie(page: number): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    return this.http.get('http://localhost:9192/api/v1/home/store', {
      params,
    });
  }
  getGenreSlugMovie(page: number, slug: string | null): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    return this.http.get(`http://localhost:9192/api/v1/genre/${slug}`, {
      params,
    });
  }

  getCountrySlugMovie(page: number, slug: string | null): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    return this.http.get(`http://localhost:9192/api/v1/country/${slug}`, {
      params,
    });
  }
}
