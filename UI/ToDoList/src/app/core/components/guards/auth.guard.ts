import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../Authentication/services/user.service';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const userService = inject(UserService);
  const router = inject(Router);
  //const user = userService.getUserFromLocalStorage();

  let token = cookieService.get('Authorization');

  // console.log(user); && user
  if (token) {
    token = token.replace('Bearer', '');
    const decodedToken: any = jwtDecode(token);

    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    console.log(expirationDate);
    console.log(currentTime);
    console.log(expirationDate < currentTime);
    if (expirationDate < currentTime) {
      //token expired
      alert(
        'İnaktiflikten dolayı çıkış yapılmıştır. Lütfen tekrar giriş yapın'
      );
      userService.logout();
      return router.createUrlTree(['/Login'], {
        queryParams: { returnUrl: state.url },
      });
    } else {
      if (decodedToken.role.includes('adminRole')) {
        return true;
      } else {
        //token still valid

        // console.log(expectedUserId);
        // console.log(user.userId);
        if (decodedToken.role.includes('userRole') && decodedToken.nameid) {
          return true;
        } else {
          alert('Geçersiz yetki');
          return false;
        }
      }
    }
  } else {
    userService.logout();
    alert('Lütfen Giriş yapın');
    return router.createUrlTree(['/Login'], {
      queryParams: { returnUrl: state.url },
    });
  }
};
