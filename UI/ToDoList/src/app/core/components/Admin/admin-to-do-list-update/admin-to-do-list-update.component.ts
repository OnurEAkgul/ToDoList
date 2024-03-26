import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodolistService } from '../../features/services/todolist.service';
import { TableGetResponse } from '../../features/models/table-get-response.model';
import { TableUpdateModelRequest } from '../../features/models/table-update-request.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-to-do-list-update',
  templateUrl: './admin-to-do-list-update.component.html',
  styleUrls: ['./admin-to-do-list-update.component.css'],
})
export class AdminToDoListUpdateComponent implements OnInit, OnDestroy {
  TodoModel: TableGetResponse;
  updateModel: TableUpdateModelRequest;
  id: string | null = null;

  routeSub?: Subscription;
  tableSub?: Subscription;
  updateSub?: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodolistService
  ) {
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
    this.routeSub = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('Id');
        if (this.id) {
          this.getModel(this.id);
        }
      },
    });
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
