import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/shared/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const stringsToCheck = [
      'home-page',
      'single-movie',
      'series-movie',
      'theater-movie',
      'genre/' + req.url.substring(35),
      'country/' + req.url.substring(37),
      'film/' + req.url.substring(34, 35) + '/' + req.url.substring(36),
      'film/watch/' + req.url.substring(40, 41) + '/' + req.url.substring(42),
      'store',
      'login',
      'forgot-password',
    ];
    if (
      stringsToCheck.some(str => req.url.indexOf(str) !== -1)
    ) {
      console.log('Okela');
      return next.handle(req);
    }

    const v = this.authService.checkExp();

    const authToken = this.authService.getJwtToken();

    if (authToken && v == false) {
      console.log('Adding Authorization header:', authToken);
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });
      console.log(authReq.headers);
      return next.handle(authReq);
    } else {
      this.authService.clear();
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
      return next.handle(req);
    }
  }
}
