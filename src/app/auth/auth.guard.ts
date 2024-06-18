import { inject } from '@angular/core';
import { CanActivateFn, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './shared/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const toastr = inject(ToastrService);
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn() && auth.checkExp() == false) {
    return true;
  } else {
    return new Promise((resolve) => {
      router.navigate(['']);
      const x = toastr.error('Bạn phải đăng nhập để xem trang này');
      setTimeout(() => {
        toastr.remove(x.toastId);
        resolve(false);
      }, 2000);
    });
  }
};
