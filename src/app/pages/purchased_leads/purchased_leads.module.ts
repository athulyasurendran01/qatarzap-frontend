import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { PurchasedLeadsComponent } from './purchased_leads.component';

const components = [
  PurchasedLeadsComponent,
];

@NgModule({
  imports: [
    ThemeModule,
  ],
  exports: [
    ...components,
  ],
  declarations: [
    ...components,
  ],
  providers: [],
})
export class PurchasedLeadsModule { }
