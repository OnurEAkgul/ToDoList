import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { signupRequest } from '../models/user-signup-request.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  password!: string;
  model: signupRequest;

  SignUpSubscription?: Subscription;
  TokenControl: boolean = false;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      UserName: '',
      Password: '',
      Email: '',
      // userId: '',
    };
  }
  ngOnDestroy(): void {
    this.SignUpSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.TokenControl = this.cookieService.check('Authorization');
    if (this.TokenControl) {
      this.router.navigateByUrl('/main');
    }
  }
  OnSignUp() {
    this.SignUpSubscription = this.userService.userEkle(this.model).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
    console.log(this.model);
  }
}
