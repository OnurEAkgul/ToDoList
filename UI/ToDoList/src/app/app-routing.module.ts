import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './core/layout/app.layout.component';
import { LoginComponent } from './core/features/Authentication/login/login.component';
import { SignUpComponent } from './core/features/Authentication/sign-up/sign-up.component';

const routes: Routes = [
  {
    //LAYOUT COMPONENT
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'SignUp',
        component: SignUpComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
