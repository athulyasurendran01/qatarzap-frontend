import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { FileUploaderModule } from './fileuploader/file-uploader.module';
import { FilterPipe} from '../../@theme/pipes/filter.pipe';
import { ProfileModule } from './profile/profile.module';
import { ProfileFeaturesRoutingModule } from './profile-features-routing.module';
import { ProfileFeaturesComponent } from './profile-features.component';
import { ModalComponent } from './modals/profileModal/modal.component';
import { WorkModalComponent } from './modals/workModal/modal.component';
import { ProfileComponent } from './profile/profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';

const components = [
  ProfileFeaturesComponent,
  ModalComponent,
  WorkModalComponent,
  ProfileComponent,
  FilterPipe
];

@NgModule({
  imports: [
    ThemeModule,
    ProfileFeaturesRoutingModule,
    ProfileModule,
    ImageCropperModule,
    FileUploaderModule,
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
    ModalComponent,
    WorkModalComponent,
  ],
})
export class ProfileFeaturesModule { }
