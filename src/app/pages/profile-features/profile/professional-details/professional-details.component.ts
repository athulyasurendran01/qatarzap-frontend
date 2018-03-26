import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../../../@core/data/users.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'ngx-professional-details',
  styleUrls: ['./professional-details.component.scss'],
  templateUrl: './professional-details.component.html',
})
export class ProfessionalDetailsComponent implements OnInit, OnDestroy{
  
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  professional: any[];
  scopeWorks = [];
  selectedScops = [];
  specializations = [];
  selectedSpecialization = [];
  projects = [];
  selectedProjects = [];
  residentialArray = [];
  selectedResidential = [];
  residentprojects = [];
  selectedResidentprojects = [];
  servicesArray = [];
  selectedServices = [];
  consulting_types = [];

  professionalForm: FormGroup;
  bussiness_name: FormControl;
  work_scope: FormControl;
  specialization: FormControl;
  types: FormControl;
  residential: FormControl;
  residentialprojects: FormControl;
  services: FormControl;
  price_architect: FormControl;
  consulting_price: FormControl;
  total_experience: FormControl;
  vastu_consulting: FormControl;
  introduction: FormControl;
  consulting_type: FormControl;

  constructor(private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef){
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {

    this.consulting_types = [{
      id: 1,
      title: "Per Visit"
    }, {
      id: 2,
      title: "Per Hour"
    }];

    this.dropdownSettings = { 
      singleSelection: false, 
      text:"Select",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: false,
      classes:"myclass custom-class"
    };

    this.getProfessional();
    this.createFormControls();
    this.createForm();
  }


  onItemSelect(item:any){
    //console.log(item);
    //console.log(this.selectedItems);
  }
  OnItemDeSelect(item:any){
    //console.log(item);
    //console.log(this.selectedItems);
  }
  onSelectAll(items: any){
    //console.log(items);
  }
  onDeSelectAll(items: any){
    //console.log(items);
  }



  getProfessional(){
      this.userService.apiTokenRequestGet('professional/profile/professionalDetails')
      .subscribe((res: any) => {
        if(res.response == 1){
          this.scopeWorks = res.info.scopes;
          let that_ = this;
          this.scopeWorks.forEach(function (value) {
            if( value.selected == 1 ){
              that_.selectedScops.push(value);
            }
          });
          this.specializations = res.info.specialization;
          this.specializations.forEach(function (value) {
            if( value.selected == 1 ){
              that_.selectedSpecialization.push(value);
            }
          });
          this.projects = res.info.types;
          this.projects.forEach(function (value) {
            if( value.selected == 1 ){
              that_.selectedProjects.push(value);
            }
          });
          this.residentialArray = res.info.residential;
          this.residentialArray.forEach(function (value) {
            if( value.selected == 1 ){
              that_.selectedResidential.push(value);
            }
          });
          this.residentprojects = res.info.residentialprojects;
          this.residentprojects.forEach(function (value) {
            if( value.selected == 1 ){
              that_.selectedResidentprojects.push(value);
            }
          });
          this.servicesArray = res.info.services;
          this.servicesArray.forEach(function (value) {
            if( value.selected == 1 ){
              that_.selectedServices.push(value);
            }
          });
          this.professional = res.info;
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


  createFormControls() {
    this.bussiness_name = new FormControl('', Validators.required);
    this.work_scope = new FormControl('');
    this.specialization = new FormControl('');
    this.types = new FormControl('');
    this.residential = new FormControl('');
    this.residentialprojects = new FormControl('');
    this.services = new FormControl('');
    this.price_architect = new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+')
    ]);
    this.consulting_price = new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+')
    ]);
    this.total_experience = new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+')
    ]);
    this.vastu_consulting = new FormControl('', Validators.required);
    this.introduction = new FormControl('', Validators.required);
    this.consulting_type = new FormControl('');
  }

  createForm() {
    this.professionalForm = new FormGroup({
      bussiness_name: this.bussiness_name,
      work_scope: this.work_scope,
      specialization: this.specialization,
      types: this.types,
      residential: this.residential,
      residentialprojects: this.residentialprojects,
      services: this.services,
      price_architect: this.price_architect,
      consulting_price: this.consulting_price,
      total_experience: this.total_experience,
      vastu_consulting: this.vastu_consulting,
      introduction: this.introduction,
      consulting_type: this.consulting_type,
    });
  }

  UpdateProfessionalData(){
    let data = this.professionalForm.value;
    this.userService.apiTokenRequest('professional/profile/updateProfessionalDetails', data)
      .subscribe((res: any) => {
        if(res.response == 1){
          this.toastr.success("Successfully Updated", 'Success!');
          this.getProfessional();
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
