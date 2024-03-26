import { Component, OnInit } from '@angular/core';
import { UserUpdate } from '../../Authentication/models/user-update.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Authentication/services/user.service';
import { userRequest } from '../../Authentication/models/user.model';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css'],
})
export class UserInformationComponent implements OnInit {
  model: UserUpdate;

  userId: string = '';
  fromParameter: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.model = {
      currentPassword: '',
      email: '',
      userName: '',
      newPassword: '',
    };
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const idParam = params.get('id');
        if (idParam !== null) {
          this.userId = idParam;
          console.log(this.userId);
          this.getUserInfo(this.userId);
          this.fromParameter = true;
        } else {
          this.fromParameter = false;
          // Handle the case when 'id' parameter is null
          // You can throw an error or set a default value for this.userId
          // Example: this.userId = 0; // Assuming 0 is a valid default value
        }
      },
    });
  }

  getUserInfo(id: string) {
    this.userService.GetUser(id).subscribe((response) => {
      this.model.email = response.email;
      this.model.userName = response.userName;
      // this.model.adress = response.adress;
      // this.model.customer_id = response.customer_id;
      // this.model.email = response.email;
      // this.model.gsm = response.gsm;
      // this.model.name = response.name;
      // this.model.opened_password = response.opened_password;
      // this.model.surname = response.surname;
      // this.model.user_id = response.user_id;
      // this.model.user_type_id = response.user_type_id;
      // this.model.user_type_name = response.user_type_name;

      console.log(this.model);
    });
  }
  // update() {
  //   console.log(this.model);
  //   this.userService.UserStatusChange(this.model).subscribe((response) => {
  //     console.log(response);
  //   });
  // }
  update() {
    console.log(this.model);
    this.userService
      .UpdateUser(this.userId, this.model, false)
      .subscribe((response) => {
        this.router.navigateByUrl('/main');
        console.log(response);
      });
  }
}
