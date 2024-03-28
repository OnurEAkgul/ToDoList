import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodolistService } from '../../features/services/todolist.service';
import { TableGetResponse } from '../../features/models/table-get-response.model';
import { TableUpdateModelRequest } from '../../features/models/table-update-request.model';
import { Subscription } from 'rxjs';
import { TokenContent } from '../../Authentication/models/tokenContent';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../Authentication/services/user.service';

@Component({
  selector: 'app-admin-to-do-list-update',
  templateUrl: './admin-to-do-list-update.component.html',
  styleUrls: ['./admin-to-do-list-update.component.css'],
})
export class AdminToDoListUpdateComponent implements OnInit, OnDestroy {
  TokenContent: TokenContent;
  TokenControl: boolean = false;
  TodoModel: TableGetResponse;
  updateModel: TableUpdateModelRequest;
  id: string | null = null;

  routeSub?: Subscription;
  tableSub?: Subscription;
  updateSub?: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodolistService,
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

    this.TodoModel = {
      description: '',
      id: '',
      isCompleted: false,
      title: '',
      userId: '',
    };
    this.updateModel = {
      description: '',
      title: '',
    };
  }
  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.tableSub?.unsubscribe();
    this.updateSub?.unsubscribe();
  }
  ngOnInit(): void {
    this.TokenControl = this.cookieService.check('Authorization');

    if (this.TokenControl) {
      this.TokenContent = this.userService.tokenDecode();

      if (!this.TokenContent.role.includes('adminRole')) {
        this.router.navigateByUrl('/main');
      }
      this.routeSub = this.route.paramMap.subscribe({
        next: (params) => {
          this.id = params.get('Id');
          if (this.id) {
            this.getModel(this.id);
          }
        },
      });
    }
  }
  getModel(id: string) {
    this.tableSub = this.todoService.GetTableId(id).subscribe((response) => {
      this.TodoModel = response;
      // console.log(this.TodoModel);
    });
  }
  update() {
    this.updateModel.description = this.TodoModel.description;
    this.updateModel.title = this.TodoModel.title;

    this.updateSub = this.todoService
      .UpdateTableContent(this.TodoModel.id, this.updateModel)
      .subscribe((response: string) => {
        this.router.navigateByUrl('/main/admin/tablo');
      });
  }
}
