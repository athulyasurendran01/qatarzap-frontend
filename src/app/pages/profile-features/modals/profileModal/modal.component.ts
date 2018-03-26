import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../@core/data/users.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'ngx-modal',
  styleUrls: ['./modal.component.scss'],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {

  modalHeader: string;
  modalContent = ``;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedCover: any = '';
  coverpics: any = [];

  constructor(private activeModal: NgbActiveModal, private userService: UserService, private modalService: NgbModal, 
    public toastr: ToastsManager, vcr: ViewContainerRef){
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getCoverPics();
  }

  closeModal() {
    this.activeModal.close()
  }

  imageLoaded(){
    console.log('Image loaded.')
  }
  loadImageFailed(){
    console.log('Image failed.')
  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
      this.croppedImage = image.split('base64,')[1];
  }
  
  updateProfile(){
    let data = {
      image: this.croppedImage
    };
    this.userService.apiTokenRequest('professional/profile/uploadAvatar', data)
    .subscribe((res: any) => {
      if(res.response == 1){
        this.toastr.success("Profile Picture Updated Successfully ", 'Success!');
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
  getCoverPics(){
    this.userService.apiTokenRequestGet('professional/profile/defCoverImages')
      .subscribe((res: any) => {
      if(res.response == 1){
        this.coverpics = res.cover;
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

  setDefaultCover(id){
    let imgData = this.getBase64Image(document.getElementById(id));
    console.log(imgData)
    let data = {
      image: imgData
    };
    this.userService.apiTokenRequest('professional/profile/uploadCover', data)
    .subscribe((res: any) => {
      if(res.response == 1){
        this.toastr.success("Cover Picture Updated Successfully ", 'Success!');
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

  getBase64Image(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  cropCoverImg(modal) {
    this.closeModal();
    this.modalService.open(modal, { size: 'lg', container: 'nb-layout', backdrop: 'static' });
  }
  coverChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  coverCropped(image: string) {
      this.croppedCover = image.split('base64,')[1];
  }

  updateCover(){
    let data = {
      image: this.croppedCover
    };
    this.userService.apiTokenRequest('professional/profile/uploadCover', data)
    .subscribe((res: any) => {
      if(res.response == 1){
        this.toastr.success("Cover Picture Updated Successfully ", 'Success!');
        document.getElementById("closBtn").click();
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
