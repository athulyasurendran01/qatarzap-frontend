import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Profile',link: '/pages/ui-features/profile'}, { title: 'Log out'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.userService.apiTokenRequestGet('professional/profile/avatar')
      .subscribe((res: any) => {
        if(res. response == 1){
        return new Promise(resolve => {
          this.user = res;
          resolve(this.user);
        });
        }else{
          this.userService.errorChecking(res); 
        }
      }, error => {
        this.userService.errorRouting();      
    });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}
