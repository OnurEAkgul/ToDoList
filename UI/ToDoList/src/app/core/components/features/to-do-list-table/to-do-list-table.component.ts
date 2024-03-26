import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../Authentication/services/user.service';
import { TokenContent } from '../../Authentication/models/tokenContent';
import { CookieService } from 'ngx-cookie-service';
import { TodolistService } from '../services/todolist.service';
import { TableGetResponse } from '../models/table-get-response.model';
import { UpdateStatusRequest } from '../models/table-update-status-request.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-to-do-list-table',
  templateUrl: './to-do-list-table.component.html',
  styleUrls: ['./to-do-list-table.component.css'],
})
export class ToDoListTableComponent implements OnInit, OnDestroy {
  TokenContent: TokenContent;
  TokenControl: boolean = false;
  TodoModel: TableGetResponse[] = [];
  updateStatus: UpdateStatusRequest;
  deleteInProgress: boolean = false;

  tableSub?: Subscription;
  statusSub?: Subscription;
  deleteSub?: Subscription;
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
    this.tableSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
    this.statusSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.TokenControl = this.cookieService.check('Authorization');
    if (this.TokenControl) {
      this.TokenContent = this.userService.tokenDecode();
      if (this.TokenContent.role.includes('adminRole')) {
        this.router.navigateByUrl('/main/admin/tablo');
      }
      // console.log(this.TokenContent.nameid);
      this.GetTableContent(this.TokenContent.nameid);
    }
  }

  GetTableContent(userId: string) {
    this.tableSub = this.listService.GetTable(userId).subscribe((response) => {
      this.TodoModel = response;
    });
  }
  UpdateStatus(todo: TableGetResponse): void {
    this.updateStatus.isCompleted = todo.isCompleted;
    this.statusSub = this.listService
      .UpdateTableStatus(todo.id, this.updateStatus)
      .subscribe(
        (response) => {
          // console.log('Status updated successfully:', response);
          // Update the TodoModel or perform any other action if needed
        },
        (error) => {
          // console.error('Error updating status:', error);
        }
      );
  }
  DeleteItem(id: string) {
    this.deleteSub = this.listService.DeleteItem(id).subscribe((response) => {
      this.GetTableContent(this.TokenContent.nameid);
    });
  }
}
