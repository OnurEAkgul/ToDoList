import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { TokenContent } from '../components/Authentication/models/tokenContent';
import { UserService } from '../components/Authentication/services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];
  TokenContent: TokenContent;

  constructor(
    public layoutService: LayoutService,
    private userService: UserService
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
  }

  ngOnInit() {
    // // Check local storage to initialize authentication status
    // this.userService.updateAuthenticationStatus(
    //   this.userService.getStoredAuthenticationStatus()
    // );
    // if (localStorage.getItem('isAuthenticated') == null) {
    //   this.updateMenu(false);
    // }
    // // Subscribe to changes in authentication status
    // this.userService.isAuthenticated$.subscribe((isAuthenticated) => {
    //   if (isAuthenticated) {
    this.TokenContent = this.userService.tokenDecode();
    // console.log('APP MENU TOKEN ' + this.TokenContent.role);
    //   }this.TokenContent = this.userService.tokenDecode();
    const currentTime = new Date().getTime();
    if (this.TokenContent.exp * 1000 < currentTime) {
      this.updateMenu(false);
    } else {
      this.updateMenu(true);
    }
  }

  private updateMenu(Boolean: boolean) {
    if (!Boolean) {
      // User is not authenticated
      this.model = [
        {
          label: 'İşlemler',
          items: [
            {
              label: 'Kayıt ol',
              icon: 'pi pi-fw pi-user-plus',
              routerLink: ['SignUp'],
            },
            {
              label: 'Giriş Yap',
              icon: 'pi pi-fw pi pi-sign-in',
              routerLink: ['Login'],
            },
          ],
        },
      ];
    } else {
      // User is authenticated, update the menu based on roles
      if (this.TokenContent.role.includes('adminRole')) {
        this.model = [
          {
            label: 'Get Started',
            items: [
              {
                label: 'Listeler',
                icon: 'pi pi-fw pi-check-square',
                routerLink: ['admin/tablo'],
              },
              {
                label: 'Kullanıcılar',
                icon: 'pi pi-fw pi-id-card',
                routerLink: ['admin/users'],
              },
            ],
          },
        ];
      } else {
        this.model = [
          {
            label: 'UI Components',
            items: [
              {
                label: 'Yapılacak iş ekle',
                icon: 'pi pi-fw pi pi-plus',
                routerLink: ['tablo/ekle'],
              },
              {
                label: 'Listem',
                icon: 'pi pi-fw pi-check-square',
                routerLink: ['/main'],
              },
            ],
          },
        ];
      }
    }
  }
}
