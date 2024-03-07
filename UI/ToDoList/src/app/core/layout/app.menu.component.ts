import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'İşlemler',
                items: [
                  {
                    label: 'Kayıt ol',
                    icon: 'pi pi-fw pi-id-card',
                    routerLink: ['kayit'],
                  },
                  {
                    label: 'Giriş Yap',
                    icon: 'pi pi-fw pi-check-square',
                    routerLink: ['/'],
                  },
                ],
              },
            {
                label: 'UI Components',
                items: [
                    {
                      label: 'Kişi Ekle',
                      icon: 'pi pi-fw pi-id-card',
                      //routerLink: ['/islem/kaydet', this.user?.userId],
                    },
                    {
                      label: 'Kişileri Görüntüle',
                      icon: 'pi pi-fw pi-check-square',
                      //routerLink: ['/islem/goruntule', this.user?.userId],
                    },
                  ],
            },
           
            {
                label: 'Get Started',
                items: [
                    {
                      label: 'Rehber Tablosu',
                      icon: 'pi pi-fw pi-id-card',
                      routerLink: ['/admin/rehber'],
                    },{
                      label: 'Kullanıcı Tablosu',
                      icon: 'pi pi-fw pi-id-card',
                      routerLink: ['/admin/user'],
                    },
                  ]
            }
        ];
    }
}
