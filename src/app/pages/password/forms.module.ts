import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { PasswordRoutingModule, routedComponents } from './password-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    PasswordRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class PasswordModule { }
