import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../../../@core/data/users.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'ngx-edu-exp-details',
    styleUrls: ['./edu-exp-details.component.scss'],
    templateUrl: './edu-exp-details.component.html',
})
export class EducationExperienceDetailsComponent implements OnInit, OnDestroy{
  
    
    educations: any[];
    id_proof: string;
    attachDoc: any;
    file_name: string;

    qualificationForm: FormGroup;
    qualification: FormControl;  
    year_of_passing: FormControl;
    attachment: FormControl;

    constructor(private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef){
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.getQual();
        this.createFormControls();
        this.createForm();
    }

    getQual(){
        this.userService.apiTokenRequestGet('professional/profile/qualifications')
        .subscribe((res: any) => {
            if(res.response == 1){
                this.educations = res.qualifications;
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
        this.attachDoc = files[0];
        this.file_name = this.attachDoc.name;
    }


    createFormControls() {
        this.qualification = new FormControl('', Validators.required);
        this.year_of_passing = new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]+')
        ]);
        this.attachment = new FormControl('');
    }

    createForm() {
        this.qualificationForm = new FormGroup({
            qualification: this.qualification,
            year_of_passing: this.year_of_passing,
            attachment: this.attachment,
        });
    }

    AddQualification(){
        const formData = new FormData();
        formData.append('file', this.attachDoc);
        let data = this.qualificationForm.value;
        for (let key in data) {
          formData.append(key, data[key]);
        }
        this.userService.apiTokenRequest('professional/profile/addQualification', formData)
        .subscribe((res: any) => {
            if(res.response == 1){
                this.toastr.success("Qualification added Successfully ", 'Success!');
                this.file_name = '';
                this.qualificationForm.reset();
                this.getQual()
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
    
    deleteEducation(education){
        let data = {
            id: education.id
        };

        this.userService.apiTokenRequest('professional/profile/deleteQualification', data)
            .subscribe((res: any) => {
            if(res.response == 1){
                this.toastr.success("Qualification removed Successfully ", 'Success!');
                this.getQual()
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
