import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserService } from '../../../@core/data/users.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'ngx-tabs',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
	selected :any;	
  approval_status: number = 0;
  admin_approval: number = 0;
  constructor( private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef ){}

  ngOnInit() {
    this.profileChecking();
  }
  
  profileChecking(){
    this.userService.apiTokenRequestGet('professional/profile/status')
    .subscribe((res: any) => {
      if(res.response == 1){
        if( res.status == 1 ){
          this.approval_status = 1;
          this.admin_approval = res.approved;
        }
      }else{
        if(res.errcode == 753){
          this.userService.errorChecking(res);
        }else{
          this.toastr.error(res.message, 'Oops!');
        }
      }
    }, error => {
        this.userService.errorRouting();      
    });
  }

  submitApproval(){
    this.userService.apiTokenRequest('professional/profile/submitApproval', '')
    .subscribe((res: any) => {
      if(res.response == 1){
        this.toastr.success("Submitted for Approval Successfully ", 'Success!');
        this.admin_approval = 2;
      }else{
        if(res.errcode == 753){
          this.userService.errorChecking(res);
        }else{
          this.toastr.error(res.message, 'Oops!');
        }
      }
    }, error => {
        this.userService.errorRouting();      
    });
  }

	select(item) {
    this.activeTab = item; 
  };
  isActive(item) {
    return this.activeTab === item;
  };
  activeTab: number = 1;

}
