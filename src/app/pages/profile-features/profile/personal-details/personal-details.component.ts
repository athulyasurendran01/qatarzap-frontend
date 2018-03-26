import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../../../@core/data/users.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-personal-details',
  styleUrls: ['./personal-details.component.scss'],
  templateUrl: './personal-details.component.html',
  providers: [NgbDatepickerConfig]
})
export class PersonalDetailsComponent implements OnInit, OnDestroy{
  
  
  personal: any[];
  primary_professions: string[];
  professional:any[];
  locations: string[];
  id_proof: string;
  IDproof: any;
  date2 : Date;
  yearback15: number;
  date_of_error: string;

  personalForm: FormGroup;
  fname: FormControl;
  lname: FormControl;
  username: FormControl;
  email: FormControl;
  phone_number: FormControl;
  alt_number: FormControl;
  date_of_birth: FormControl;
  primary_profession: FormControl;
  location: FormControl;
  type_of_profession: FormControl;
  previous_employment_details: FormControl;
  name_of_head_designer: FormControl;
  file: FormControl;


  constructor(private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef, config: NgbDatepickerConfig){
    this.toastr.setRootViewContainerRef(vcr);
    const now = new Date();
    // Current year - 15
    this.yearback15 = now.getFullYear() - 16 ;

    config.minDate = {year: 1980, month: 1, day: 1};
    config.maxDate = {year: this.yearback15, month: 12, day: 31};

    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';
  }

  ngOnInit() {
    this.getPersonal();
    this.createFormControls();
    this.createForm();
  }

  getPersonal(){

      this.userService.apiTokenRequestGet('professional/profile/personalDetails')
      .subscribe((res: any) => {
        if(res.response == 1){
          this.primary_professions = res.professions;
          this.locations = res.locations;
          this.professional = res.types_of_professional;
          res.info.date_of_birth = res.info.date_of_birth ? res.info.date_of_birth.split('-') : '';
          res.info.date_of_birth = {year: parseInt(res.info.date_of_birth[0]),
             month: parseInt(res.info.date_of_birth[1]),
             day: parseInt(res.info.date_of_birth[2])
          };
          this.personal = res.info;
          this.id_proof = res.info.id_proof ? res.info.id_proof.split('/')[1] : '';
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

  fileuploaderFileChange(files: FileList){
    this.IDproof = files[0];
  }

  createFormControls() {
    this.fname = new FormControl('', Validators.required);
    this.lname = new FormControl('');
    this.username = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.phone_number = new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+'),
      Validators.maxLength(10),
      Validators.minLength(10)
    ]);
    this.alt_number = new FormControl('',[
      Validators.pattern('[0-9]+'),
      Validators.maxLength(10),
      Validators.minLength(10)
    ]);
    this.date_of_birth = new FormControl('', Validators.required);
    this.primary_profession = new FormControl('');
    this.location = new FormControl('');
    this.type_of_profession = new FormControl('');
    this.previous_employment_details = new FormControl('');
    this.name_of_head_designer = new FormControl('');
    this.file = new FormControl('');
  }

  createForm() {
    this.personalForm = new FormGroup({
      fname: this.fname,
      lname: this.lname,
      username: this.username,
      email: this.email,
      phone_number: this.phone_number,
      alt_number: this.alt_number,
      date_of_birth: this.date_of_birth,
      primary_profession: this.primary_profession,
      location: this.location,
      type_of_profession: this.type_of_profession,
      previous_employment_details: this.previous_employment_details,
      name_of_head_designer: this.name_of_head_designer,
      file: this.file,
    });
  }

  UpdatePersonalData(){
    if( this.personalForm.value.date_of_birth.year > this.yearback15 ){
      // Error
      this.date_of_error = "Invalid Date, Age must be greater than 15."
    }else{
      this.date_of_error = '';
      const formData = new FormData();
      formData.append('file', this.IDproof);
      let date_string = (this.personalForm.value.date_of_birth.year + '-' + this.personalForm.value.date_of_birth.month + '-' + this.personalForm.value.date_of_birth.day);
      this.personalForm.value.date_of_birth = date_string;
      let data = this.personalForm.value;
      for (let key in data) {
        formData.append(key, data[key]);
      }

      this.userService.apiTokenRequest('professional/profile/updatePersonalDetails', formData)
        .subscribe((res: any) => {
          if(res.response == 1){
            this.toastr.success("Successfully Updated", 'Success!');
            this.getPersonal();
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

  ngOnDestroy() {
  }
}
