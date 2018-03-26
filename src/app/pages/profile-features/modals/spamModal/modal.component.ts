import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../@core/data/users.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngx-modal',
  styleUrls: ['./modal.component.scss'],
  templateUrl: './modal.component.html',
})
export class SpamModalComponent implements OnInit, OnDestroy{

	constructor(private activeModal: NgbActiveModal, private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef){
		this.toastr.setRootViewContainerRef(vcr);
	}

	ngOnInit() {

	}

	closeModal() {
    	this.activeModal.close()
  	}

	reportSpam(){
		let data = {
			
		};
		this.userService.apiTokenRequest('professional/leads/details', data)
	    .subscribe((res: any) => {
	    	if(res.response == 1){
                //this.toastr.success("Successfully updated", 'Success!');
                this.closeModal();
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
}
