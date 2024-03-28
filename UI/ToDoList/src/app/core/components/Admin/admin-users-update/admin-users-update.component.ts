import { Component, OnInit } from '@angular/core';
import { UserUpdate } from '../../Authentication/models/user-update.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Authentication/services/user.service';
import { TokenContent } from '../../Authentication/models/tokenContent';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-admin-users-update',
  templateUrl: './admin-users-update.component.html',
  styleUrls: ['./admin-users-update.component.css'],
})
export class AdminUsersUpdateComponent implements OnInit {
  model: UserUpdate;
  TokenContent: TokenContent;
  TokenControl: boolean = false;
  userId: string = '';
  fromParameter: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.model = {
      currentPassword: '',
      email: '',
      userName: '',
      newPassword: '',
    };
    this.TokenContent = {
      unique_name: '',
      email: '',
      nameid: '',
      role: '',
      nbf: 0,
      exp: 0,
      iat: 0,
    };
  }
  ngOnInit(): void {
    this.TokenControl = this.cookieService.check('Authorization');
    if (this.TokenControl) {
      this.TokenContent = this.userService.tokenDecode();
      if (!this.TokenContent.role.includes('adminRole')) {
        this.router.navigateByUrl('/main');
      }
    }

    this.route.paramMap.subscribe({
      next: (params) => {
        const idParam = params.get('UserId');
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
      .UpdateUser(this.userId, this.model, true)
      .subscribe((response) => {
        this.router.navigateByUrl('/main/admin/users');
        console.log(response);
      });
  }
}
