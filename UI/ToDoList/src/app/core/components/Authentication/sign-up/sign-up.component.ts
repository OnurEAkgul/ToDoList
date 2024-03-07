import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { signupRequest } from '../models/user-signup-request.model';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  password!: string;
  model: signupRequest;

  SignUpSubscription?: Subscription;

  constructor(private userService: UserService) {
    this.model = {
      UserName: '',
      Password: '',
      Email: '',
      // userId: '',
    };
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
