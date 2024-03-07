import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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


@NgModule({
  declarations: [AppComponent, LoginComponent, SignUpComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    CommonModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    FormsModule,
    CheckboxModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
