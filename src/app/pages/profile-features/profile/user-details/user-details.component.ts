import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../../../@core/data/users.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { ModalComponent } from '../../modals/profileModal/modal.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HeaderComponent } from '../../../../@theme/components/header/header.component';

@Component({
  selector: 'ngx-user-details',
  styleUrls: ['./user-details.component.scss'],
  templateUrl: './user-details.component.html',
})

export class UserDetailsComponent implements OnInit, OnDestroy{
  
  profile_pics = [];
  videos = [];
  url: string;
  WorkVideoForm: FormGroup;
  video_url: FormControl;

  @ViewChild(HeaderComponent)
  private headerComponent: HeaderComponent;

  constructor(private userService: UserService, private sanitizer: DomSanitizer, private modalService: NgbModal, public toastr: ToastsManager, 
  vcr: ViewContainerRef){
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getProfilePics();
    this.getWorkVideos();
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.video_url = new FormControl('', Validators.required);
  }

  createForm() {
    this.WorkVideoForm = new FormGroup({
      video_url: this.video_url,
    });
  }

  getProfilePics(){
    this.userService.apiTokenRequestGet('professional/profile/profileImages')
    .subscribe((res: any) => {
      if(res.response == 1){
        this.profile_pics = res;
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

  saveVideos() {
    let data = {
      url: this.WorkVideoForm.value.video_url
    };
    this.userService.apiTokenRequest('professional/profile/saveVideo', data)
      .subscribe((res: any) => {
        if(res.response == 1){
            this.toastr.success("Work video added Successfully ", 'Success!');
          this.WorkVideoForm.reset();
          this.getWorkVideos();
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

  cropProfileImg() {
    const activeModal = this.modalService.open(
      ModalComponent, { size: 'lg', container: 'nb-layout', backdrop: 'static' });
      activeModal.componentInstance.modalHeader = 'photo';
      activeModal.result.then((result) => {
        this.getProfilePics();
        this.headerComponent.getUser();
      }, (reason) => {
        console.log(reason);
      });
  }

  getDefaultCoverPics(){
    const activeModal = this.modalService.open(
      ModalComponent, { size: 'lg', container: 'nb-layout', backdrop: 'static' });
      activeModal.componentInstance.modalHeader = 'cover';
      activeModal.result.then((result) => {
        console.log(result)
        this.getProfilePics();
      }, (reason) => {
        console.log(reason);
      });
  }

  getWorkVideos() {
     this.userService.apiTokenRequestGet('professional/profile/videos')
      .subscribe((res: any) => {
        if(res.response == 1){
          console.log(res)
          this.videos = res.videos;
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

  deleteVideo(video_id: string){
    var data = {
      id: video_id
    };
    this.userService.apiTokenRequest('professional/profile/deleteVideo', data)
      .subscribe((res: any) => {
        if(res.response == 1){
        this.toastr.success("Work video removed Successfully ", 'Success!');
          this.getWorkVideos();
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

  safeURL(video_id: string){
    this.url = 'https://www.youtube.com/embed/'+video_id;
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  ngOnDestroy() {
  }
}
