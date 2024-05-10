import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { UserService } from '../components/Authentication/services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenContent } from '../components/Authentication/models/tokenContent';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  IsLoggedIn: boolean = false;
  TokenContent: TokenContent;

  constructor(
    public layoutService: LayoutService,
    private userService: UserService,
    private router: Router,
    // private messageService: MessageService,
    private cookieService: CookieService
  ) {
    {
      this.TokenContent = {
        unique_name: '',
        email: '',
        nameid: '',
        role: '',
        nbf: 0,
        exp: 0,
        iat: 0,
      };
    }
  }

  ngOnInit() {
    this.TokenContent = this.userService.tokenDecode();
    //   const currentTime = new Date().getTime();
    //   console.log(this.TokenContent.exp * 1000);
    //   console.log(currentTime);
    //   if (this.TokenContent.exp * 1000 < currentTime) {
    //     console.log(this.TokenContent.exp);
    //     console.log(currentTime);
    //     this.logout();
    //     return;
    //
  }
  //   // // Check local storage to initialize authentication status
  //   // // this.userService.updateAuthenticationStatus(
  //   // //   this.userService.getStoredAuthenticationStatus()

  //   // // Subscribe to changes in authentication status
  //   // this.userService.isAuthenticated$.subscribe((isAuthenticated) => {
  //   //   if (isAuthenticated) {
  //   //     this.TokenContent = this.userService.tokenDecode();
  //   //     // console.log('APP MENU TOKEN ' + this.TokenContent?.role);
  //   //   }
  //   // });
  // }

  logout(): void {
    // this.IsLoggedIn = this.cookieService.check('Authorization');
    // if (this.IsLoggedIn == false) {
    //   return;
    // }

    this.TokenContent = {
      unique_name: '',
      email: '',
      nameid: '',
      role: '',
      nbf: 0,
      exp: 0,
      iat: 0,
    };
    // console.log(this.user); // Add a console log to check the user value
    this.router.navigateByUrl('');
    this.userService.logout();
    alert('Çıkış yapıldı');
  }

  onConfigButtonClick() {
    this.layoutService.showConfigSidebar();
  }
}
