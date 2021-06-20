import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { PhoneOverviewComponent } from '@shared/components/phone-overview/phone-overview.component';

const IMPORTS = [MatCardModule];
@NgModule({
  declarations: [PhoneOverviewComponent],
  imports: [CommonModule, ...IMPORTS],
  exports: [...IMPORTS, PhoneOverviewComponent],
  providers: []
})
export class PhoneOverviewModule {}
