import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { UserService } from '../../@core/data/users.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

	leads: any[];
	leadData: any[];
	statusCard: any[];
	active : string;	
	constructor(private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef){
		this.toastr.setRootViewContainerRef(vcr);
	}

	ngOnInit() {
    	this.active = null;
	    this.userService.apiTokenRequestGet('professional/leads/viewAll')
	    .subscribe((res: any) => {
	    	if(res.response == 1){
		        this.leads = res.leads
		        this.statusCard = [{
						description: 'Credit Available',
						status: res.credit,
						icon: 'nc-icon-outline business_wallet-43 credit-icon',
					}, {
						description: 'Credit Used',
						status: res.used,
						icon: 'nc-icon-outline business_handout credit-icon1',
					}, {
						description: 'Leads Purchased',
						status: res.leadsPurchase,
						icon: 'nc-icon-outline shopping_cart-simple-in lead-icon',
					}, {
						description: 'Converted Leads',
						status: res.converted,
						icon: 'nc-icon-outline arrows-1_refresh-69 lead-icon1',
					}
				];
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

	ngOnDestroy() {
	}

	viewLeadDetail(lead, index){
		let data = {
			id: lead.gen_id
		};
		this.userService.apiTokenRequest('professional/leads/details', data)
	    .subscribe((res: any) => {
	    	if(res.response == 1){
	        	this.leadData = res.lead;
				this.active = index;
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

	closeLeadDetail(){
		this.active = null;
	}

	rejectLead (lead) {
		var data = {
			id: lead.gen_id
		};
        this.userService.apiTokenRequest('professional/leads/reject', data)
	    .subscribe((res: any) => {
	    	if(res.response == 1){
	    		console.log(res)
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
	purchaseLead (lead) {
		var data = {
			id: lead.gen_id
		};
		this.userService.apiTokenRequest('professional/leads/purchase', data)
	    .subscribe((res: any) => {
	    	if(res.response == 1){
	    		this.viewLeadDetail(lead, '')
            	lead.purchased = 1;
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

}
