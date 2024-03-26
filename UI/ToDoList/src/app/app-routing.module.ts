import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './core/layout/app.layout.component';
import { LoginComponent } from './core/components/Authentication/login/login.component';
import { SignUpComponent } from './core/components/Authentication/sign-up/sign-up.component';
import { ToDoListTableComponent } from './core/components/features/to-do-list-table/to-do-list-table.component';
import { UpdateTableComponent } from './core/components/features/update-table/update-table.component';
import { AddToTableComponent } from './core/components/features/add-to-table/add-to-table.component';
import { AdminToDoListTableComponent } from './core/components/Admin/admin-to-do-list-table/admin-to-do-list-table.component';
import { AdminToDoListUpdateComponent } from './core/components/Admin/admin-to-do-list-update/admin-to-do-list-update.component';
import { AdminUsersTableComponent } from './core/components/Admin/admin-users-table/admin-users-table.component';
import { AdminUsersUpdateComponent } from './core/components/Admin/admin-users-update/admin-users-update.component';
import { LandingComponent } from './core/landing/landing.component';
import { LandingRoutingModule } from './core/landing/landing-routing.module';
import { authGuard } from './core/components/guards/auth.guard';
import { UserInformationComponent } from './core/components/features/user-information/user-information.component';

const routes: Routes = [
  {
    //LAYOUT COMPONENT
    path: 'main',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: ToDoListTableComponent,
      },
      {
        path: 'tablo/guncelle/:id',
        component: UpdateTableComponent,
      },
      {
        path: 'tablo/ekle',
        component: AddToTableComponent,
      },
      {
        path: 'admin/tablo',
        component: AdminToDoListTableComponent,
      },
      {
        path: 'admin/tablo/guncelle/:Id',
        component: AdminToDoListUpdateComponent,
      },
      {
        path: 'admin/users',
        component: AdminUsersTableComponent,
      },
      {
        path: 'user/info/:id',
        component: UserInformationComponent,
      },
      {
        path: 'admin/users/guncelle/:UserId',
        component: AdminUsersUpdateComponent,
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'SignUp',
    component: SignUpComponent,
  },
  {
    path: '',
    component: LandingComponent,
    canActivateChild: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
