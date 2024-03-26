import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableGetResponse } from '../models/table-get-response.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Authentication/services/user.service';
import { TodolistService } from '../services/todolist.service';
import { AddModelRequest } from '../models/table-add-request.model';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-to-table',
  templateUrl: './add-to-table.component.html',
  styleUrls: ['./add-to-table.component.css'],
})
export class AddToTableComponent implements OnInit, OnDestroy {
  TodoModel: AddModelRequest;
  TokenControl: boolean = false;
  TokenContent: any;
  userId: string = '';

  addSub?: Subscription;

  constructor(
    private todoService: TodolistService,
    private cookieService: CookieService,
    private userService: UserService,
    private router: Router
  ) {
    this.TodoModel = {
      description: '',
      title: '',
    };
  }
  ngOnDestroy(): void {
    this.addSub?.unsubscribe();
  }
  ngOnInit(): void {
    this.TokenControl = this.cookieService.check('Authorization');
    if (this.TokenControl) {
      this.TokenContent = this.userService.tokenDecode();
      this.userId = this.TokenContent.nameid;
      console.log(this.userId);
    }
  }

  AddToTable() {
    this.addSub = this.todoService
      .AddItem(this.userId, this.TodoModel)
      .subscribe((response) => {
        this.router.navigateByUrl('/main');
      });
  }
}
