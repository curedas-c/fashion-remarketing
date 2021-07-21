import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateTransPipe } from '../pipes/date.pipe';

const IMPORTS = [
 DateTransPipe
];
@NgModule({
  declarations: [DateTransPipe],
  imports: [CommonModule],
  exports: [...IMPORTS],
  providers: [],
})
export class CustomPipesModule {}
