import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import { FileUploaderModule } from '../fileuploader/file-uploader.module';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { ProfessionalDetailsComponent } from './professional-details/professional-details.component';
import { EducationExperienceDetailsComponent } from './education-experience-details/edu-exp-details.component';
import { WorkDetailsComponent } from './work-details/work-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ServiceLocationComponent } from './service-location/service-location.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

const components = [
  PersonalDetailsComponent,
  ProfessionalDetailsComponent,
  EducationExperienceDetailsComponent,
  WorkDetailsComponent,
  UserDetailsComponent,
  ServiceLocationComponent
];

@NgModule({
  imports: [
    ThemeModule,
    FileUploaderModule,
    AngularMultiSelectModule,
  ],
  exports: [
    ...components,
  ],
  declarations: [
    ...components,
  ],
  providers: [],
})
export class ProfileModule { }
