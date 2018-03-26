import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BuyCreditsComponent } from './buycredits/buycredits.component';
import { ErrorComponent } from './error/error.component';
import { LogoutComponent } from './logout/logout.component';
import { PurchasedLeadsComponent } from './purchased_leads/purchased_leads.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'buycredits',
    component: BuyCreditsComponent,
  }, {
    path: 'purchased_leads',
    component: PurchasedLeadsComponent,
  }, {
    path: 'profile-features',
    loadChildren: './profile-features/profile-features.module#ProfileFeaturesModule',
  }, {
    path: 'password',
    loadChildren: './password/forms.module#PasswordModule',
  }, {
    path: 'error',
    component: ErrorComponent,
  }, {
    path: 'logout',
    component: LogoutComponent,
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
