import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../../@core/data/users.service';
import { PasswordValidation } from './password-validation';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./change-password.component.scss'],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit{
		
	/*ChangePasswordForm: FormGroup;
	pw: FormControl;
	pw1: FormControl;
	pw2: FormControl;*/
	ChangePasswordForm: FormGroup;
	
	constructor(fb: FormBuilder, private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef){
		this.toastr.setRootViewContainerRef(vcr);
	    this.ChangePasswordForm = fb.group({
			current: ['', Validators.required],	
			password: ['', Validators.required],
			confirmPassword: ['', Validators.required]
	    }, {
	      validator: PasswordValidation.MatchPassword
	    })
	}


	ngOnInit() {
		//this.createFormControls();
	    //this.createForm();
	}

	/*createFormControls() {
	    this.pw = new FormControl('', Validators.required);
	    this.pw1= new FormControl('');
	    this.pw2 = new FormControl('', [
	    	Validators.required,
	    	PasswordValidation.MatchPassword,
	    ]);
    }

	createForm() {
    	this.ChangePasswordForm = new FormGroup({
	      pw: this.pw,
	      pw1: this.pw1,
	      pw2: this.pw2,
	    });
	}*/

	changePassword(){
		let data = this.ChangePasswordForm.value;
		if( data.confirmPassword && data.current && data.password){
			if( data.confirmPassword == data.password ){
                        let data1={
                                pw:data.current,
                                pw1:data.password,
                                pw2:data.confirmPassword
                            }
			 	this.userService.apiTokenRequest('professional/profile/changePass', data1)
			      .subscribe((res: any) => {
			      	if(res.response == 1){
			      		this.toastr.success("Successfully Updated your password", 'Success!');
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
	    
	}

}
