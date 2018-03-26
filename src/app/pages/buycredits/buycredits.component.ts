import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { UserService } from '../../@core/data/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuyCreditModalComponent } from '../profile-features/modals/buycreditModal/modal.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'ngx-buycredits',
  styleUrls: ['./buycredits.component.scss'],
  templateUrl: './buycredits.component.html',
})
export class BuyCreditsComponent implements OnInit, OnDestroy {
        credit_plans: any[];
        plans: any[];
        basic_info: any;
        user_info: any;
        
	constructor(private userService: UserService, private modalService: NgbModal, public toastr: ToastsManager, vcr: ViewContainerRef){
		this.toastr.setRootViewContainerRef(vcr);
	}

	ngOnInit() {
		this.userService.apiTokenRequestGet('professional/profile/avatar')
	      .subscribe((res: any) => {
	      	if(res.response == 1){
		        this.user_info = res;
		        this.userService.apiTokenRequestGet('professional/credits/viewPlans')
				.subscribe((res: any) => {
					if(res.response == 1){
					    //this.credit_plans = res
						this.plans = res.getinfo;
						this.basic_info = [{
							title: this.user_info.name,
							description: "Interior Designers SkyGreen Interior Ahmedabad",
							icon: "nc-icon-outline users_single-01 buy-cre-icon"
						},{
							title: res.balancecredit+" Credits",
							description: "Account Balance",
							icon: "nc-icon-outline business_wallet-43 buy-cre-icon"
						},{
							title: res.usedcredit+" Credits",
							description: "Usage In Last 30 days",
							icon: "nc-icon-outline business_handout buy-cre-icon"
						}]
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

	AddCreditModal(){
		const activeModal = this.modalService.open(
	      BuyCreditModalComponent, { container: 'nb-layout', backdrop: 'static' });
	      activeModal.componentInstance.modalHeader = 'credit';
	      activeModal.result.then((result) => {
	      }, (reason) => {
	        console.log(reason);
	    });
	}
	BuyCreditModal(){
		const activeModal = this.modalService.open(
	      BuyCreditModalComponent, { size: 'lg', container: 'nb-layout', backdrop: 'static' });
	      activeModal.componentInstance.modalHeader = 'payment';
	      activeModal.result.then((result) => {
	      }, (reason) => {
	        console.log(reason);
	    });
	}

	ngOnDestroy() {
	}
}
