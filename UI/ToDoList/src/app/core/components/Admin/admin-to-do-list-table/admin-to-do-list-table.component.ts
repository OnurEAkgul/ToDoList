import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../Authentication/services/user.service';
import { TokenContent } from '../../Authentication/models/tokenContent';
import { CookieService } from 'ngx-cookie-service';
import { TodolistService } from '../../features/services/todolist.service';
import { TableGetResponse } from '../../features/models/table-get-response.model';
import { UpdateStatusRequest } from '../../features/models/table-update-status-request.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-admin-to-do-list-table',
  templateUrl: './admin-to-do-list-table.component.html',
  styleUrls: ['./admin-to-do-list-table.component.css'],
})
export class AdminToDoListTableComponent implements OnInit, OnDestroy {
  TokenContent: TokenContent;
  TokenControl: boolean = false;
  TodoModel: TableGetResponse[] = [];
  updateStatus: UpdateStatusRequest;
  deleteInProgress: boolean = false;
  userNameMap: { [userId: string]: string } = {};

  usernameSub?: Subscription;
  deleteSub?: Subscription;
  getSub?: Subscription;
  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private listService: TodolistService,
    private router: Router
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
    this.getSub?.unsubscribe();
    this.usernameSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.TokenControl = this.cookieService.check('Authorization');
    console.log(this.TokenControl);
    if (this.TokenControl) {
      this.TokenContent = this.userService.tokenDecode();
      console.log(this.TokenContent.role);
      if (!this.TokenContent.role.includes('adminRole')) {
        this.router.navigateByUrl('/main');
      }
      // console.log(this.TokenContent.nameid);
      this.GetTableContent();
      this.getUserName();
    }
  }

  GetTableContent() {
    this.getSub = this.listService
      .GetAllTableContent()
      .subscribe((response) => {
        this.TodoModel = response;
      });
  }
  DeleteItem(id: string) {
    this.deleteSub = this.listService.DeleteItem(id).subscribe((response) => {
      this.GetTableContent();
    });
  }
  getUserName() {
    // Fetch all user names and populate userNameMap
    this.usernameSub = this.userService.GetAllUsers().subscribe((users) => {
      users.forEach((user) => {
        this.userNameMap[user.id] = user.userName;
        // console.log(this.userNameMap[user.id]);
      });
    });
  }
}
