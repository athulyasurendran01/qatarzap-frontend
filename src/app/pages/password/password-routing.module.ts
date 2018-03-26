import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordComponent } from './password.component';
import { ChangePasswordComponent } from './change/change-password.component';
import { FormLayoutsComponent } from './reset/form-layouts.component';

const routes: Routes = [{
  path: '',
  component: PasswordComponent,
  children: [{
    path: 'change',
    component: ChangePasswordComponent,
  }, {
    path: 'reset',
    component: FormLayoutsComponent,
  }],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class PasswordRoutingModule {

}

export const routedComponents = [
  PasswordComponent,
  ChangePasswordComponent,
  FormLayoutsComponent,
];
