import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../@core/data/users.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngx-modal',
  styleUrls: ['./modal.component.scss'],
  templateUrl: './modal.component.html',
})
export class BuyCreditModalComponent implements OnInit{

  modalHeader: string;
  modalContent = ``;
  personal: any[];
  private options = {
    "key": "rzp_test_glA246D8rCFOVc",
    "amount": 100,    
    "name": "Merchant Name",        
    "description": "Purchase Description",
    "prefill": {
      "name": "Harshil Mathur",
      "email": "harshil@razorpay.com"
    },
    "notes": {
      "address": "Hello World"
    },
    "theme": {
      "color": "green"
    },
    handler: function() {
      console.log(arguments)
    }
  };

  CreditForm: FormGroup;
  creditVal: FormControl;

  constructor(private activeModal: NgbActiveModal, private userService: UserService, private modalService: NgbModal) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.getPersonal();
  }
  getPersonal(){
      this.userService.apiTokenRequestGet('professional/profile/personalDetails')
      .subscribe((res: any) => {
        this.personal = res.info;
      });
  }
  createFormControls() {
    this.creditVal = new FormControl('', [
      Validators.required,
      Validators.min(25)
    ]);
  }

  createForm() {
    this.CreditForm = new FormGroup({
      creditVal: this.creditVal,
    });
  }

  closeModal() {
    this.activeModal.close()
  }

  CheckoutPay(modal){
    this.closeModal();
    this.modalService.open(modal, { size: 'lg', container: 'nb-layout', backdrop: 'static' });
  }

  proceedToPay(){
    //let rzp = new Razorpay(this.options);
    //rzp.open();
  }

}
