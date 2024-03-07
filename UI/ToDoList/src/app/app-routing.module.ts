import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './core/layout/app.layout.component';
import { LoginComponent } from './core/components/Authentication/login/login.component';
import { SignUpComponent } from './core/components/Authentication/sign-up/sign-up.component';

const routes: Routes = [
  {
    //LAYOUT COMPONENT
    path: '',
    component: AppLayoutComponent,
    children: [
      
    ],
  },{
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'SignUp',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
