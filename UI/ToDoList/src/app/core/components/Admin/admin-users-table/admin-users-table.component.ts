import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../Authentication/services/user.service';
import { TokenContent } from '../../Authentication/models/tokenContent';
import { CookieService } from 'ngx-cookie-service';
import { TodolistService } from '../../features/services/todolist.service';
import { TableGetResponse } from '../../features/models/table-get-response.model';
import { UpdateStatusRequest } from '../../features/models/table-update-status-request.model';
import { userRequest } from '../../Authentication/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-users-table',
  templateUrl: './admin-users-table.component.html',
  styleUrls: ['./admin-users-table.component.css'],
})
export class AdminUsersTableComponent implements OnInit, OnDestroy {
  TokenContent: TokenContent;
  TokenControl: boolean = false;
  userModel: userRequest[] = [];
  updateStatus: UpdateStatusRequest;
  deleteInProgress: boolean = false;

  deleteSubscription?: Subscription;
  getSubscription?: Subscription;
  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) {
    this.TokenContent = {
      unique_name: '',
      email: '',
      nameid: '',
      role: '',
      nbf: 0,
      exp: 0,
      iat: 0,
    };
    this.updateStatus = {
      isCompleted: false,
    };
  }
  ngOnDestroy(): void {
    this.deleteSubscription?.unsubscribe();
    this.getSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.TokenControl = this.cookieService.check('Authorization');
    if (this.TokenControl) {
      this.TokenContent = this.userService.tokenDecode();
      // console.log(this.TokenContent.nameid);
      this.GetTableContent(this.TokenContent.nameid);
    }
  }

  GetTableContent(userId: string) {
    this.getSubscription = this.userService
      .GetAllUsers()
      .subscribe((response) => {
        this.userModel = response;
      });
  }
  DeleteItem(id: string) {
    this.deleteSubscription = this.userService
      .DeleteUser(id)
      .subscribe((response) => {
        this.GetTableContent(this.TokenContent.nameid);
      });
  }
}
