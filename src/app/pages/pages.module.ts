import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ErrorModule } from './error/error.module';
import { LogoutModule } from './logout/logout.module';
import { BuyCreditsModule } from './buycredits/buycredits.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { PurchasedLeadsModule } from './purchased_leads/purchased_leads.module';
import { SpamModalComponent } from './profile-features/modals/spamModal/modal.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  SpamModalComponent,
];

@NgModule({

  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ErrorModule,
    BuyCreditsModule,
    PurchasedLeadsModule,
    LogoutModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  entryComponents: [
    SpamModalComponent,
  ],
})
export class PagesModule {
}
