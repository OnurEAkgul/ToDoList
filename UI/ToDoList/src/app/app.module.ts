import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './core/layout/app.layout.module';
import { LoginComponent } from './core/components/Authentication/login/login.component';
import { SignUpComponent } from './core/components/Authentication/sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ToDoListTableComponent } from './core/components/features/to-do-list-table/to-do-list-table.component';
import { UpdateTableComponent } from './core/components/features/update-table/update-table.component';
import { AddToTableComponent } from './core/components/features/add-to-table/add-to-table.component';
import { AdminUsersTableComponent } from './core/components/Admin/admin-users-table/admin-users-table.component';
import { AdminToDoListTableComponent } from './core/components/Admin/admin-to-do-list-table/admin-to-do-list-table.component';
import { AdminToDoListUpdateComponent } from './core/components/Admin/admin-to-do-list-update/admin-to-do-list-update.component';
import { AdminUsersUpdateComponent } from './core/components/Admin/admin-users-update/admin-users-update.component';
import { LandingComponent } from './core/landing/landing.component';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { LandingRoutingModule } from './core/landing/landing-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { UserInformationComponent } from './core/components/features/user-information/user-information.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ToDoListTableComponent,
    UpdateTableComponent,
    AddToTableComponent,
    AdminUsersTableComponent,
    AdminToDoListTableComponent,
    AdminToDoListUpdateComponent,
    AdminUsersUpdateComponent,
    LandingComponent,
    UserInformationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    CommonModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    FormsModule,
    CommonModule,
    LandingRoutingModule,
    TableModule,
    DividerModule,
    StyleClassModule,
    ChartModule,
    PanelModule,
    ButtonModule,
    CheckboxModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
