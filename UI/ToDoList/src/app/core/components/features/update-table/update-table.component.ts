import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodolistService } from '../services/todolist.service';
import { TableGetResponse } from '../models/table-get-response.model';
import { TableUpdateModelRequest } from '../models/table-update-request.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-table',
  templateUrl: './update-table.component.html',
  styleUrls: ['./update-table.component.css'],
})
export class UpdateTableComponent implements OnInit, OnDestroy {
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
        this.id = params.get('id');
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
        this.router.navigateByUrl('/main');
      });
  }
}
