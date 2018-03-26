import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileFeaturesComponent } from './profile-features.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
  path: '',
  component: ProfileFeaturesComponent,
  children: [{
    path: 'profile',
    component: ProfileComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileFeaturesRoutingModule { }
