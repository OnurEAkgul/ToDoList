import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AddModelRequest } from '../models/table-add-request.model';
import { TableGetResponse } from '../models/table-get-response.model';
import { TableUpdateModelRequest } from '../models/table-update-request.model';
import { UpdateStatusRequest } from '../models/table-update-status-request.model';

@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  ApiBaseUrl = environment.apiBaseUrl + '/api';
  constructor(private http: HttpClient) {}

  /*   POST
  // /api/ToDoList/add/{UserId}*/
  AddItem(UserId: string, model: AddModelRequest): Observable<void> {
    return this.http.post<void>(
      `${this.ApiBaseUrl}/ToDoList/add/${UserId}`,
      model
    );
  }
  /* DELETE
  // /api/ToDoList/delete/{id}*/
  DeleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.ApiBaseUrl}/ToDoList/delete/${id}`);
  }
  /* GET
  // /api/ToDoList/userId/{userId}*/
  GetTable(userId: string): Observable<TableGetResponse[]> {
    return this.http.get<TableGetResponse[]>(
      `${this.ApiBaseUrl}/ToDoList/userId/${userId}`
    );
  }
  /* GET
  // /api/ToDoList/get/{id}*/
  GetTableId(id: string): Observable<TableGetResponse> {
    return this.http.get<TableGetResponse>(
      `${this.ApiBaseUrl}/ToDoList/get/${id}`
    );
  }
  /*  PUT
  // /api/ToDoList/update/content/{Id}*/
  UpdateTableContent(
    Id: string,
    tableModel: TableUpdateModelRequest
  ): Observable<string> {
    return this.http.put<string>(
      `${this.ApiBaseUrl}/ToDoList/update/content/${Id}`,
      tableModel
    );
  }
  /*  PUT
  // /api/ToDoList/update/status/{Id}*/
  UpdateTableStatus(
    id: string,
    isCompleted: UpdateStatusRequest
  ): Observable<TableGetResponse> {
    return this.http.put<TableGetResponse>(
      `${this.ApiBaseUrl}/ToDoList/update/status/${id}`,
      isCompleted
    );
  }
  /*  GET
  // /api/ToDoList/getAll*/
  GetAllTableContent(): Observable<TableGetResponse[]> {
    return this.http.get<TableGetResponse[]>(
      `${this.ApiBaseUrl}/ToDoList/getAll`
    );
  }
  /*   GET
  // /api/ToDoList/Completed*/
  GetCompletedTableContent(): Observable<TableGetResponse[]> {
    return this.http.get<TableGetResponse[]>(
      `${this.ApiBaseUrl}/ToDoList/Completed`
    );
  }
  /* GET
  // /api/ToDoList/NotCompleted*/
  GetNotCompletedTableContent(): Observable<TableGetResponse[]> {
    return this.http.get<TableGetResponse[]>(
      `${this.ApiBaseUrl}/ToDoList/NotCompleted`
    );
  }
  /* GET
  // /api/ToDoList/Completed/{userId}*/
  GetCompletedTableContentById(userId: string): Observable<TableGetResponse[]> {
    return this.http.get<TableGetResponse[]>(
      `${this.ApiBaseUrl}/ToDoList/Completed/${userId}`
    );
  }
  /* GET
  // /api/ToDoList/NotCompleted/{userId}*/
  GetNotCompletedTableContentById(
    userId: string
  ): Observable<TableGetResponse[]> {
    return this.http.get<TableGetResponse[]>(
      `${this.ApiBaseUrl}/ToDoList/NotCompleted/${userId}`
    );
  }
}
