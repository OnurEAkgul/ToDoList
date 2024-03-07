import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { userLogin } from '../models/login.model';
import { Checkbox } from 'primeng/checkbox';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  valCheck: string[] = ['remember'];

  model: userLogin;
  password!: string;

  EmailOrUsername: string = '';
  RememberCheckValue: boolean = false;

  loginSubscription?: Subscription;

  constructor(private userService: UserService) {
    this.model = {
      Email: this.EmailOrUsername,
      Password: '',
      RememberMe: this.RememberCheckValue,
      UserName: this.EmailOrUsername,
    };
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
        console.log(response);
      },
    });
  }
}
