import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from "./fileuploader.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FileUploaderComponent],
  exports: [FileUploaderComponent]
})
export class FileUploaderModule { }
