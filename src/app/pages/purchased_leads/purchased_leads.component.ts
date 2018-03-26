import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { UserService } from '../../@core/data/users.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpamModalComponent } from '../profile-features/modals/spamModal/modal.component';

@Component({
  selector: 'ngx-buttons',
  styleUrls: ['./purchased_leads.component.scss'],
  templateUrl: './purchased_leads.component.html',
})
export class PurchasedLeadsComponent implements OnInit, OnDestroy{
	
	leads: any[];
	leadData: any[];
	active: string;

	constructor(private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef, private modalService: NgbModal){
		this.toastr.setRootViewContainerRef(vcr);
	}

	ngOnInit() {
    	this.active = null;
		this.userService.apiTokenRequestGet('professional/leads/purchased')
	    .subscribe((res: any) => {
	    	if(res.response == 1){
	    		this.leads = res.leads;
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
	
	viewLeadDetail = function (lead, index) {
		let data = {
			id: lead.gen_id
		};
		this.userService.apiTokenRequest('professional/leads/details', data)
	    .subscribe((res: any) => {
	    	if(res.response == 1){
                //this.toastr.success("Lead Purchased Successfully ", 'Success!');
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


	showWorkModal(){
	    const activeModal = this.modalService.open(
	      SpamModalComponent, { size: 'lg', container: 'nb-layout', backdrop: 'static' });
	      activeModal.componentInstance.modalHeader = 'photo';
	      activeModal.result.then((result) => {
	      }, (reason) => {
	        console.log(reason);
		});
	}


	ngOnDestroy() {
	}

}
