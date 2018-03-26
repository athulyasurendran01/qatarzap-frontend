import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../@core/data/users.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'ngx-modal',
  styleUrls: ['./modal.component.scss'],
  templateUrl: './modal.component.html',
})
export class WorkModalComponent implements OnInit{

  modalHeader: string;
  modalContent = ``;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  work_photo_tags: any = [];
  work_photo_ds: any = [];
  work_photo_type: any = [];
  searchText: any = '';

  WorkPhotoForm: FormGroup;
  title: FormControl;
  type: FormControl;
  tag: FormControl;
  style: FormControl;

  constructor(private activeModal: NgbActiveModal, private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef){
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getWorkTags();
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.title = new FormControl('', Validators.required);
    this.type = new FormControl('', Validators.required);
    this.tag = new FormControl('', Validators.required);
    this.style = new FormControl('', Validators.required);
  }

  createForm() {
    this.WorkPhotoForm = new FormGroup({
      title: this.title,
      type: this.type,
      tag: this.tag,
      style: this.style
    });
  }

  getWorkTags(){
    this.userService.apiTokenRequestGet('professional/profile/imageTag')
      .subscribe((res: any) => {
        if(res.response == 1){
          this.work_photo_tags = res.tag;
          this.work_photo_ds = res.ds;
          this.work_photo_type = res.type;
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

  closeModal() {
    this.activeModal.close()
  }

  AddWorkPhoto(){
    const formData = new FormData();
    formData.append('file', this.croppedImage);
    let data = this.WorkPhotoForm.value;
    for (let key in data) {
      formData.append(key, data[key]);
    }

    this.userService.apiTokenRequest('professional/profile/saveImage', formData)
    .subscribe((res: any) => {
      if(res.response == 1){
      this.toastr.success("Work Photo Updated Successfully ", 'Success!');
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

  fileuploaderFileChange(files: FileList){
    this.croppedImage = files[0];
  }
}
