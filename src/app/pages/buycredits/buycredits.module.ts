import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { BuyCreditsComponent } from './buycredits.component';
import { BuyCreditModalComponent } from '../profile-features/modals/buycreditModal/modal.component';

const components = [
  BuyCreditsComponent,
  BuyCreditModalComponent
];

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
    BuyCreditModalComponent,
  ],
})
export class BuyCreditsModule { }
