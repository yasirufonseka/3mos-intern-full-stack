import { CanActivateFn, Router,UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


export const authGuard: CanActivateFn = (route, state) => {
const cookieService = inject(CookieService);
  const router = inject(Router);

  const isLoggedIn = cookieService.check('userId') && cookieService.check('role');
  
  return isLoggedIn ? true : router.createUrlTree(['/login']);
};


