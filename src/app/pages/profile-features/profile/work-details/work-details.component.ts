import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { UserService } from '../../../../@core/data/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkModalComponent } from '../../modals/workModal/modal.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'ngx-work-details',
  styleUrls: ['./work-details.component.scss'],
  templateUrl: './work-details.component.html',
})
export class WorkDetailsComponent implements OnInit, OnDestroy{
  
  images:any[];
  
  constructor(private userService: UserService, private modalService: NgbModal, public toastr: ToastsManager, vcr: ViewContainerRef){
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getWorkPhotos();
  }

  getWorkPhotos(){
    this.userService.apiTokenRequestGet('professional/profile/gallery')
    .subscribe((res: any) => {
      if(res.response == 1){
        this.images = res.gallery;
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
  
  deleteWorkPhoto(image){
    let data = {
      image_id: image.id
    };

    this.userService.apiTokenRequest('professional/profile/deleteImage', data)
    .subscribe((res: any) => {
      if(res.response == 1){
      this.toastr.success("Work Photo deleted Successfully ", 'Success!');
        this.getWorkPhotos();
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

  showWorkModal(){
    const activeModal = this.modalService.open(
      WorkModalComponent, { size: 'lg', container: 'nb-layout', backdrop: 'static' });
      activeModal.componentInstance.modalHeader = 'photo';
      activeModal.result.then((result) => {
        this.getWorkPhotos();
      }, (reason) => {
        console.log(reason);
      });
  }


  ngOnDestroy() {
  }
}
