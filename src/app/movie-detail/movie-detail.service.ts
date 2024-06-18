import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ReviewRequest } from './reviewRequest';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailService {
  constructor(private http: HttpClient) {}

  getMovieDetailPage(id: number, slug: string, accessType: string): Observable<any> {
    let params = new HttpParams();
    if (accessType) {
      params = params.set('type', accessType.toString());
    } else {
      params = params.set('type', "FREE");
    }
    return this.http.get(`http://localhost:9192/api/v1/film/${id}/${slug}`, { params });
  }

  createReview(reviewRequest: ReviewRequest): Observable<any>{
    return this.http.post("http://localhost:9192/api/v1/review/create", reviewRequest);
  }

  updateReview(reviewRequest: ReviewRequest, id: number): Observable<any> {
    return this.http.put(
      `http://localhost:9192/api/v1/review/${id}`,
      reviewRequest
    );
  }

  deleteReview(id: number): Observable<any> {
    return this.http.delete(`http://localhost:9192/api/v1/review/${id}`);
  }
}
