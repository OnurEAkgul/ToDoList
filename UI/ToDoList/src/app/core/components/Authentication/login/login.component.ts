import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { userLogin } from '../models/login.model';
import { Checkbox } from 'primeng/checkbox';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  valCheck: string[] = ['remember'];

  TokenControl: boolean = false;
  Token: any;
  userRole: string = '';
  model: userLogin;
  password!: string;

  EmailOrUsername: string = '';
  RememberCheckValue: boolean = false;

  loginSubscription?: Subscription;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      Email: this.EmailOrUsername,
      Password: '',
      RememberMe: this.RememberCheckValue,
      UserName: this.EmailOrUsername,
    };
  }
  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.TokenControl = this.cookieService.check('Authorization');
    if (this.TokenControl) {
      this.router.navigateByUrl('/main');
    }
  }
  OnLogin() {
    this.model.UserName = this.EmailOrUsername;
    this.model.Email = this.EmailOrUsername;
    this.model.RememberMe = this.RememberCheckValue;
    // console.log(this.EmailOrUsername);
    // console.log(this.RememberCheckValue);
    // console.log(this.model);

    this.loginSubscription = this.userService.userLogin(this.model).subscribe({
      next: (response) => {
        this.cookieService.set('Authorization', `Bearer ${response.token}`);
        this.Token = jwtDecode(response.token);
        this.userRole = this.Token.role;
        if (this.userRole.includes('adminRole')) {
          this.router.navigateByUrl('/main/admin/tablo');
          return;
        }
        //console.log(this.cookieService.get('Authorization'));
        // this.userService.updateAuthenticationStatus(true);
        this.router.navigateByUrl('main');
      },
      error: (error) => {
        if (error.status === 400) {
          alert('Hatalı Şifre veya kullanıcı adı');
        }
      },
    });
  }
}
