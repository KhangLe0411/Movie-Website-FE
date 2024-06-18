import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieWatchingService {
  constructor(private http: HttpClient) {}

  watchingMovieByMovieIdAndTap(
    id: number,
    slug: string,
    tap: string
  ): Observable<any> {
    let params = new HttpParams();
    if (tap) {
      params = params.set('tap', tap.toString());
    }
    return this.http.get(
      `http://localhost:9192/api/v1/film/watch/${id}/${slug}`,
      { params }
    );
  }
}
